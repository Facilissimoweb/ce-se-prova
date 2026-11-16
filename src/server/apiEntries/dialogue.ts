/**
 * Dialogue group: status, checkout, confirm-stripe, unlock, interact.
 * Subpaths via vercel.json → /api/dialogue?__path=…
 * Bundled by scripts/bundle-api.mjs into api/*.js for Vercel.
 */
import {
  getDialogueStatus,
  postDialogueCheckout,
  postDialogueConfirmStripe,
  postDialogueInteract,
  postDialogueUnlock,
} from '../routes/dialogue.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  optionalUser,
  queryString,
  readBodyObject,
  requestOrigin,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../vercelAdapter.ts';
import { groupSubpath, sendJson } from '../vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'dialogue');
    // Non-fatal if Postgres is down — routes return JSON 5xx instead of hanging.
    await ensureSchemaOnce();

    if (path === 'status') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await getDialogueStatus({
          user,
          sessionKey: queryString(req.query?.sessionKey),
        })
      );
    }

    if (path === 'interact') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postDialogueInteract({
          user,
          body: readBodyObject(req),
        })
      );
    }

    if (path === 'unlock') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postDialogueUnlock({
          user,
          body: readBodyObject(req),
        })
      );
    }

    if (path === 'checkout') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postDialogueCheckout({
          user,
          body: readBodyObject(req),
          origin: requestOrigin(req),
        })
      );
    }

    if (path === 'confirm-stripe') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const user = await optionalUser(req);
      return sendApiResult(
        res,
        await postDialogueConfirmStripe({
          user,
          body: readBodyObject(req),
        })
      );
    }

    return sendJson(res, 404, { error: 'Not found', path, method });
  } catch (error) {
    console.error('api/dialogue handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
