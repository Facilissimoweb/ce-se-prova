import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, type PoolConfig } from 'pg';
import {
  describeDatabaseUrl,
  normalizeDatabaseUrl,
} from './databaseUrl.ts';
import * as schema from './schema.ts';

export {
  describeDatabaseUrl,
  normalizeDatabaseUrl,
  type DatabaseUrlDescription,
} from './databaseUrl.ts';

declare global {
  var _postgresPool: Pool | undefined;
  var _ennamoDb: ReturnType<typeof drizzle<typeof schema>> | undefined;
  var _postgresPoolLogged: boolean | undefined;
  var _postgresPoolResetting: boolean | undefined;
}

/** True for TCP connect failures / pool acquire timeouts (not missing-table errors). */
export function isDbConnectionFailure(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const code = String((error as { code?: unknown }).code || '');
  if (
    code === 'ECONNREFUSED' ||
    code === 'ENOTFOUND' ||
    code === 'ETIMEDOUT' ||
    code === 'ECONNRESET' ||
    code === 'EAI_AGAIN' ||
    code === '57P01' || // admin_shutdown
    code === '57P03' // cannot_connect_now
  ) {
    return true;
  }
  // node-pg connectionTimeoutMillis often has no errno — match the message.
  const message = String(
    (error as { message?: unknown }).message || error
  ).toLowerCase();
  return (
    message.includes('timeout exceeded when trying to connect') ||
    message.includes('connection terminated due to connection timeout') ||
    message.includes('connect etimedout') ||
    message.includes('could not connect') ||
    message.includes('connection refused') ||
    message.includes('getaddrinfo')
  );
}

/** Drop the global pool so the next request opens a fresh short-lived client. */
export function resetDbPool(): void {
  if (global._postgresPoolResetting) return;
  global._postgresPoolResetting = true;
  const existing = global._postgresPool;
  global._postgresPool = undefined;
  global._ennamoDb = undefined;
  global._postgresPoolLogged = undefined;
  try {
    if (existing) {
      void existing.end().catch((err) => {
        console.error('SQL pool end after reset failed:', err);
      });
    }
  } finally {
    global._postgresPoolResetting = false;
  }
}

function poolMax(): number {
  if (process.env.SQL_POOL_MAX) {
    return Number(process.env.SQL_POOL_MAX) || 1;
  }
  // Serverless (Vercel): keep the pool tiny to avoid exhausting DB connections.
  if (process.env.VERCEL) return 1;
  return 10;
}

function connectionTimeoutMillis(): number {
  if (process.env.SQL_CONNECTION_TIMEOUT_MS) {
    const parsed = Number(process.env.SQL_CONNECTION_TIMEOUT_MS);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  // Vercel cold start + TLS to Supabase pooler can exceed 5s under load.
  // Stay well under reserved maxDuration (30s); soft-fail still kicks in.
  if (process.env.VERCEL) return 10_000;
  return 15_000;
}

function idleTimeoutMillis(): number {
  if (process.env.SQL_IDLE_TIMEOUT_MS) {
    const parsed = Number(process.env.SQL_IDLE_TIMEOUT_MS);
    if (Number.isFinite(parsed) && parsed >= 0) return parsed;
  }
  // Serverless: release idle clients quickly so isolates don't hold pooler slots.
  if (process.env.VERCEL) return 5_000;
  return 10_000;
}

function sslOption(): PoolConfig['ssl'] {
  if (process.env.SQL_SSL === 'false') return undefined;
  if (process.env.SQL_SSL === 'true' || process.env.DATABASE_URL) {
    return { rejectUnauthorized: false };
  }
  return undefined;
}

export const createPool = () => {
  if (!global._postgresPool) {
    const rawConnectionString = process.env.DATABASE_URL?.trim();
    const connectionString = rawConnectionString
      ? normalizeDatabaseUrl(rawConnectionString)
      : undefined;
    const config: PoolConfig = {
      max: poolMax(),
      connectionTimeoutMillis: connectionTimeoutMillis(),
      idleTimeoutMillis: idleTimeoutMillis(),
      // Let the Node event loop exit when the only clients are idle (Vercel).
      allowExitOnIdle: Boolean(process.env.VERCEL),
      keepAlive: true,
      ssl: sslOption(),
    };

    if (connectionString) {
      config.connectionString = connectionString;
      if (!global._postgresPoolLogged) {
        global._postgresPoolLogged = true;
        const desc = describeDatabaseUrl(connectionString);
        console.info('SQL pool init:', desc);
        if (desc.looksLikeSupabaseDirect) {
          console.warn(
            'DATABASE_URL looks like Supabase Direct (db.*.supabase.co). On Vercel prefer Transaction pooler host *.pooler.supabase.com:6543?pgbouncer=true (ENN-65 / ENN-89).'
          );
        } else if (
          desc.looksLikeSupabasePooler &&
          !desc.looksLikeTransactionPooler
        ) {
          console.warn(
            'DATABASE_URL looks like Supabase pooler but not Transaction mode (:6543 + pgbouncer). Session mode (:5432) can exhaust connections on Vercel.'
          );
        }
      }
    } else {
      const host = process.env.SQL_HOST;
      // Cloud SQL Unix socket (`/cloudsql/...`) works on Cloud Run, not on Vercel.
      config.host = host;
      config.user = process.env.SQL_USER;
      config.password = process.env.SQL_PASSWORD;
      config.database = process.env.SQL_DB_NAME;
    }

    const pool = new Pool(config);
    global._postgresPool = pool;

    pool.on('error', (err) => {
      console.error('Unexpected error on idle SQL pool client:', err);
      // Clear globals only — avoid pool.end() here (re-entrant with this handler).
      if (global._postgresPool === pool) {
        global._postgresPool = undefined;
        global._ennamoDb = undefined;
        global._postgresPoolLogged = undefined;
      }
    });
  }
  return global._postgresPool;
};

/** Lazy Drizzle client — avoid creating a Pool during module evaluation on cold start. */
export function getDb() {
  if (!global._ennamoDb) {
    global._ennamoDb = drizzle(createPool(), { schema });
  }
  return global._ennamoDb;
}

/** Back-compat: existing call sites use `db`. Proxy so first touch creates the pool. */
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop, receiver) {
    const real = getDb() as unknown as Record<PropertyKey, unknown>;
    const value = Reflect.get(real, prop, receiver);
    return typeof value === 'function' ? value.bind(real) : value;
  },
});
