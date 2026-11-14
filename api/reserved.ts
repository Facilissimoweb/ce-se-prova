/**
 * Reserved (“serve”) group: overview, enroll, confirm-stripe, dispensa progress.
 * Multi-segment paths via vercel.json → /api/reserved?__path=…
 * Static imports so Vercel bundles src/.
 */
import {
  getReservedOverview,
  postReservedConfirmStripe,
  postReservedEnroll,
  putDispensaProgress,
} from '../src/server/routes/reserved.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  readBodyObject,
  requestOrigin,
  requireUser,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../src/server/vercelAdapter.ts';
import { groupSubpath, sendJson } from '../src/server/vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'reserved');
    await ensureSchemaOnce();

    if (path === 'overview') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(res, await getReservedOverview(user));
    }

    if (path === 'enroll') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(
        res,
        await postReservedEnroll({
          user,
          body: readBodyObject(req),
          origin: requestOrigin(req),
        })
      );
    }

    if (path === 'confirm-stripe') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(
        res,
        await postReservedConfirmStripe({
          user,
          body: readBodyObject(req),
        })
      );
    }

    const dispensaProgress = path.match(/^dispense\/([^/]+)\/progress$/);
    if (dispensaProgress) {
      if (method !== 'PUT') return methodNotAllowed(res, ['PUT']);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(
        res,
        await putDispensaProgress({
          user,
          dispensaId: Number(dispensaProgress[1]),
          body: readBodyObject(req),
        })
      );
    }

    return sendJson(res, 404, { error: 'Not found', path, method });
  } catch (error) {
    console.error('api/reserved handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
