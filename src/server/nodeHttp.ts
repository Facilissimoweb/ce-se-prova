/** Minimal Node req/res types for Vercel serverless (same pattern as v2tarotitalia). */

export type NodeLikeReq = {
  method?: string;
  url?: string;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  on?(event: string, cb: (...args: unknown[]) => void): void;
};

export type NodeLikeRes = {
  statusCode: number;
  setHeader(name: string, value: string | string[]): void;
  status(code: number): NodeLikeRes;
  json(body: unknown): void;
  end(body?: string): void;
};

export function sendJson(res: NodeLikeRes, status: number, body: unknown): void {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(status).json(body);
    return;
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

export function readHeader(req: NodeLikeReq, name: string): string {
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (key.toLowerCase() !== target) continue;
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? '';
  }
  return '';
}

export function readBodyObject(req: NodeLikeReq): Record<string, unknown> {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    try {
      return JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return {};
}

export function queryString(
  value: string | string[] | undefined
): string {
  if (Array.isArray(value)) return String(value[0] || '');
  return String(value || '');
}

export function requestOrigin(req: NodeLikeReq): string {
  const proto = readHeader(req, 'x-forwarded-proto') || 'https';
  const host =
    readHeader(req, 'x-forwarded-host') || readHeader(req, 'host');
  if (host) {
    return `${proto}://${host}`.replace(/\/$/, '');
  }
  const origin = readHeader(req, 'origin');
  if (origin) return origin.replace(/\/$/, '');
  return (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');
}

/** Read raw body for Stripe webhook signature verification. */
export async function readRawBody(req: NodeLikeReq): Promise<Buffer> {
  if (Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === 'string') {
    return Buffer.from(req.body, 'utf8');
  }
  if (req.body && typeof req.body === 'object') {
    return Buffer.from(JSON.stringify(req.body), 'utf8');
  }

  if (typeof req.on !== 'function') {
    return Buffer.alloc(0);
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on!('data', (chunk) => {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : (chunk as Buffer));
    });
    req.on!('end', () => resolve(Buffer.concat(chunks)));
    req.on!('error', (error) => reject(error));
  });
}
