import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, type PoolConfig } from 'pg';
import * as schema from './schema.ts';

declare global {
  var _postgresPool: Pool | undefined;
  var _ennamoDb: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

function poolMax(): number {
  if (process.env.SQL_POOL_MAX) {
    return Number(process.env.SQL_POOL_MAX) || 1;
  }
  // Serverless (Vercel): keep the pool tiny to avoid exhausting DB connections.
  if (process.env.VERCEL) return 1;
  return 10;
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
    const connectionString = process.env.DATABASE_URL?.trim();
    const config: PoolConfig = {
      max: poolMax(),
      // Serverless: fail fast so ensureSchema / handlers return JSON 5xx
      // instead of burning maxDuration (FUNCTION_INVOCATION_FAILED).
      connectionTimeoutMillis: process.env.VERCEL ? 5_000 : 15_000,
      ssl: sslOption(),
    };

    if (connectionString) {
      config.connectionString = connectionString;
    } else {
      const host = process.env.SQL_HOST;
      // Cloud SQL Unix socket (`/cloudsql/...`) works on Cloud Run, not on Vercel.
      config.host = host;
      config.user = process.env.SQL_USER;
      config.password = process.env.SQL_PASSWORD;
      config.database = process.env.SQL_DB_NAME;
    }

    global._postgresPool = new Pool(config);

    global._postgresPool.on('error', (err) => {
      console.error('Unexpected error on idle SQL pool client:', err);
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
