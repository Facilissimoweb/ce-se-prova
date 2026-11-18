export type DatabaseUrlDescription = {
  host: string;
  port: string;
  database: string;
  pgbouncer: boolean;
  looksLikeSupabaseDirect: boolean;
  looksLikeSupabasePooler: boolean;
  looksLikeTransactionPooler: boolean;
};

/**
 * Describe DATABASE_URL for logs — host/port/flags only, never password.
 */
export function describeDatabaseUrl(raw: string): DatabaseUrlDescription {
  try {
    const url = new URL(raw);
    const host = url.hostname || '';
    const port = url.port || (url.protocol === 'postgresql:' ? '5432' : '');
    const pgbouncer =
      url.searchParams.get('pgbouncer') === 'true' ||
      url.searchParams.get('pgbouncer') === '1';
    const looksLikeSupabaseDirect = /^db\.[a-z0-9]+\.supabase\.co$/i.test(host);
    const looksLikeSupabasePooler = /\.pooler\.supabase\.com$/i.test(host);
    return {
      host,
      port,
      database: url.pathname.replace(/^\//, '') || 'postgres',
      pgbouncer,
      looksLikeSupabaseDirect,
      looksLikeSupabasePooler,
      looksLikeTransactionPooler:
        looksLikeSupabasePooler && (port === '6543' || pgbouncer),
    };
  } catch {
    return {
      host: '(unparseable)',
      port: '',
      database: '',
      pgbouncer: false,
      looksLikeSupabaseDirect: false,
      looksLikeSupabasePooler: false,
      looksLikeTransactionPooler: false,
    };
  }
}

/**
 * Pooler-friendly URL tweaks for Vercel + Supabase Transaction mode.
 * Does not rewrite Direct → Pooler (Maria must paste the Transaction string).
 */
export function normalizeDatabaseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  try {
    const url = new URL(trimmed);
    const host = url.hostname || '';
    const port = url.port || '';
    const isPooler = /\.pooler\.supabase\.com$/i.test(host);
    // Transaction pooler is :6543 — node-pg ignores pgbouncer=true, but other
    // tooling / future drivers expect it; keep the URL self-describing.
    if (isPooler && (port === '6543' || !port)) {
      if (!url.port) url.port = '6543';
      if (
        url.searchParams.get('pgbouncer') !== 'true' &&
        url.searchParams.get('pgbouncer') !== '1'
      ) {
        url.searchParams.set('pgbouncer', 'true');
      }
    }
    return url.toString();
  } catch {
    return trimmed;
  }
}
