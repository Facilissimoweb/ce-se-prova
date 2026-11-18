/**
 * Reserved (“serve”) group: overview, enroll, confirm-stripe, dispensa progress.
 * Multi-segment paths via vercel.json → /api/reserved?__path=…
 * Bundled by scripts/bundle-api.mjs into api/reserved.js.
 *
 * Do NOT static-import vercelAdapter / firebase-admin here. Top-level
 * firebase-admin loads crash Vercel as FUNCTION_INVOCATION_FAILED (plain text)
 * before the handler returns JSON — same pattern as ENN-64 / ENN-76 on bookings.
 * Auth is loaded lazily inside requireUser → verifyBearerToken → getAdminAuth().
 */
import { ensureSchemaOnce } from '../../db/ensureBookingSchema.ts';
import {
  getReservedOverview,
  postReservedConfirmStripe,
  postReservedEnroll,
  putDispensaProgress,
} from '../routes/reserved.ts';
import { verifyBearerToken } from '../authToken.ts';
import {
  readBodyObject,
  requestOrigin,
  sendJson,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../nodeHttp.ts';
import type { ApiUser } from '../http.ts';
import { groupSubpath } from '../vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

function methodNotAllowed(res: NodeLikeRes, allowed: string[]): void {
  res.setHeader('Allow', allowed.join(', '));
  sendJson(res, 405, { error: 'Metodo non consentito.', allow: allowed });
}

async function requireUser(
  req: NodeLikeReq,
  res: NodeLikeRes
): Promise<ApiUser | null> {
  const authHeader = (() => {
    for (const [key, value] of Object.entries(req.headers || {})) {
      if (key.toLowerCase() !== 'authorization') continue;
      return (Array.isArray(value) ? value[0] : value)?.trim() ?? '';
    }
    return '';
  })();

  const auth = await verifyBearerToken(authHeader || undefined, 'required');
  if (!auth.ok) {
    sendJson(res, auth.status, {
      error: auth.error,
      code: 'AUTH_REQUIRED',
    });
    return null;
  }
  return auth.user;
}

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'reserved');
    // Non-fatal if Postgres is down — overview soft-degrades to JSON 200.
    await ensureSchemaOnce();

    if (path === 'overview') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      const user = await requireUser(req, res);
      if (!user) return;
      const result = await getReservedOverview(user);
      return sendJson(res, result.status, result.body);
    }

    if (path === 'enroll') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await requireUser(req, res);
      if (!user) return;
      const result = await postReservedEnroll({
        user,
        body: readBodyObject(req),
        origin: requestOrigin(req),
      });
      return sendJson(res, result.status, result.body);
    }

    if (path === 'confirm-stripe') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await requireUser(req, res);
      if (!user) return;
      const result = await postReservedConfirmStripe({
        user,
        body: readBodyObject(req),
      });
      return sendJson(res, result.status, result.body);
    }

    const dispensaProgress = path.match(/^dispense\/([^/]+)\/progress$/);
    if (dispensaProgress) {
      if (method !== 'PUT') return methodNotAllowed(res, ['PUT']);
      const user = await requireUser(req, res);
      if (!user) return;
      const result = await putDispensaProgress({
        user,
        dispensaId: Number(dispensaProgress[1]),
        body: readBodyObject(req),
      });
      return sendJson(res, result.status, result.body);
    }

    return sendJson(res, 404, { error: 'Not found', path, method });
  } catch (error) {
    console.error('api/reserved handler failed:', error);
    // Always JSON — never leave Vercel to replace an uncaught throw with plain text.
    return sendJson(res, 500, {
      error: 'Impossibile aprire l’Area Riservata.',
      code: 'RESERVED_HANDLER_FAILED',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
