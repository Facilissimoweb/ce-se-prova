import { ensureBookingSchema } from '../db/ensureBookingSchema.ts';
import { verifyBearerToken } from './authToken.ts';
import type { ApiResult, ApiUser } from './http.ts';
import {
  queryString,
  readBodyObject,
  readRawBody,
  requestOrigin,
  sendJson,
  type NodeLikeReq,
  type NodeLikeRes,
} from './nodeHttp.ts';

export {
  queryString,
  readBodyObject,
  readRawBody,
  requestOrigin,
  sendJson,
};
export type { NodeLikeReq, NodeLikeRes };

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

export function sendApiResult(res: NodeLikeRes, result: ApiResult): void {
  sendJson(res, result.status, result.body);
}

export async function requireUser(
  req: NodeLikeReq,
  res: NodeLikeRes
): Promise<ApiUser | null> {
  const auth = await verifyBearerToken(
    readHeaderSafe(req, 'authorization') || undefined,
    'required'
  );
  if (!auth.ok) {
    sendJson(res, auth.status, { error: auth.error });
    return null;
  }
  return auth.user;
}

export async function optionalUser(req: NodeLikeReq): Promise<ApiUser | null> {
  const auth = await verifyBearerToken(
    readHeaderSafe(req, 'authorization') || undefined,
    'optional'
  );
  return auth.ok ? auth.user : null;
}

export function methodNotAllowed(
  res: NodeLikeRes,
  allowed: string[]
): void {
  res.setHeader('Allow', allowed.join(', '));
  sendJson(res, 405, { error: 'Metodo non consentito.' });
}

function readHeaderSafe(req: NodeLikeReq, name: string): string {
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (key.toLowerCase() !== target) continue;
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? '';
  }
  return '';
}
