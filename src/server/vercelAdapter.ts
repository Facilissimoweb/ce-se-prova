import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ensureBookingSchema } from '../db/ensureBookingSchema.ts';
import { verifyBearerToken } from './authToken.ts';
import {
  resolveRequestOrigin,
  type ApiResult,
  type ApiUser,
} from './http.ts';

declare global {
  // eslint-disable-next-line no-var
  var _ennamoSchemaReady: Promise<void> | undefined;
}

export async function ensureSchemaOnce(): Promise<void> {
  if (!globalThis._ennamoSchemaReady) {
    globalThis._ennamoSchemaReady = ensureBookingSchema().catch((error) => {
      console.error('ensureBookingSchema failed (non-fatal):', error);
    });
  }
  await globalThis._ennamoSchemaReady;
}

export function sendApiResult(res: VercelResponse, result: ApiResult): void {
  res.status(result.status).json(result.body);
}

export function readBodyObject(req: VercelRequest): Record<string, unknown> {
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

export function requestOrigin(req: VercelRequest): string {
  const proto = String(req.headers['x-forwarded-proto'] || 'https');
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '');
  if (host) {
    return `${proto}://${host}`.replace(/\/$/, '');
  }
  const origin =
    typeof req.headers.origin === 'string' ? req.headers.origin : undefined;
  return resolveRequestOrigin(origin);
}

export async function requireUser(
  req: VercelRequest,
  res: VercelResponse
): Promise<ApiUser | null> {
  const auth = await verifyBearerToken(
    typeof req.headers.authorization === 'string'
      ? req.headers.authorization
      : undefined,
    'required'
  );
  if (!auth.ok) {
    res.status(auth.status).json({ error: auth.error });
    return null;
  }
  return auth.user;
}

export async function optionalUser(req: VercelRequest): Promise<ApiUser | null> {
  const auth = await verifyBearerToken(
    typeof req.headers.authorization === 'string'
      ? req.headers.authorization
      : undefined,
    'optional'
  );
  return auth.ok ? auth.user : null;
}

export function methodNotAllowed(
  res: VercelResponse,
  allowed: string[]
): void {
  res.setHeader('Allow', allowed.join(', '));
  res.status(405).json({ error: 'Metodo non consentito.' });
}

/** Read raw body for Stripe webhook signature verification. */
export async function readRawBody(req: VercelRequest): Promise<Buffer> {
  if (Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === 'string') {
    return Buffer.from(req.body, 'utf8');
  }
  if (req.body && typeof req.body === 'object') {
    // Fallback if a platform layer already parsed JSON — re-serialize is unsafe
    // for Stripe signatures; prefer bodyParser:false + stream below.
    return Buffer.from(JSON.stringify(req.body), 'utf8');
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}
