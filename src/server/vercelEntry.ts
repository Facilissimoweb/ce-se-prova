/**
 * Lightweight helpers for Vercel api/*.ts entrypoints.
 * Keep this free of firebase/pg/route imports so static import cannot crash the function.
 */

export type EntryReq = {
  method?: string;
  url?: string;
  query?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | string[] | undefined>;
};

export type EntryRes = {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
  status?: (code: number) => EntryRes;
  json?: (body: unknown) => void;
};

export function sendJson(res: EntryRes, status: number, body: unknown): void {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    const withStatus = res.status(status);
    if (typeof withStatus.json === 'function') {
      withStatus.json(body);
      return;
    }
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

/** Subpath under `/api/<prefix>` from vercel.json `?__path=` rewrite, else URL. */
export function groupSubpath(req: EntryReq, prefix: string): string {
  const fromQuery = req.query?.__path;
  if (typeof fromQuery === 'string' && fromQuery.trim()) {
    return fromQuery.replace(/^\/+|\/+$/g, '');
  }
  if (Array.isArray(fromQuery) && fromQuery[0]) {
    return String(fromQuery[0]).replace(/^\/+|\/+$/g, '');
  }

  const headerPath =
    (typeof req.headers?.['x-forwarded-uri'] === 'string'
      ? req.headers['x-forwarded-uri']
      : undefined) ||
    (typeof req.headers?.['x-invoke-path'] === 'string'
      ? req.headers['x-invoke-path']
      : undefined) ||
    (typeof req.headers?.['x-matched-path'] === 'string'
      ? req.headers['x-matched-path']
      : undefined);

  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const raw of [headerPath, req.url, '']) {
    if (!raw) continue;
    const pathname = String(raw).split('?')[0] || '';
    const cleaned = pathname
      .replace(new RegExp(`^/?api/${escaped}/?`, 'i'), '')
      .replace(new RegExp(`^/?api/${escaped}$`, 'i'), '')
      .replace(/^\/+|\/+$/g, '');
    if (cleaned && cleaned !== prefix) return cleaned;
  }
  return '';
}
