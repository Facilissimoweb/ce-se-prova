/**
 * Dialogue group: status, checkout, confirm-stripe, unlock, interact.
 * Subpaths via vercel.json → /api/dialogue?__path=…
 * Bundled by scripts/bundle-api.mjs into api/dialogue.js.
 *
 * Keep free of vercelAdapter / firebase-admin static imports — those crash the
 * Vercel function as FUNCTION_INVOCATION_FAILED (plain text). Guest sessionKey
 * dialogue works without Firebase Auth.
 */
import { ensureSchemaOnce } from '../../db/ensureBookingSchema.ts';
import {
  getDialogueStatus,
  postDialogueCheckout,
  postDialogueConfirmStripe,
  postDialogueInteract,
  postDialogueUnlock,
} from '../routes/dialogue.ts';
import {
  queryString,
  readBodyObject,
  requestOrigin,
  sendJson,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../nodeHttp.ts';
import { groupSubpath } from '../vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

function methodNotAllowed(res: NodeLikeRes, allowed: string[]): void {
  res.setHeader('Allow', allowed.join(', '));
  sendJson(res, 405, { error: 'Metodo non consentito.', allow: allowed });
}

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'dialogue');

    // Guest sessionKey path — no firebase-admin on this function.
    const user = null;

    // ENN-186 — Checkout Session needs Stripe only (no DB write until paid).
    // Skip ensureSchemaOnce so cold start + DDL cannot delay the payment page.
    if (path === 'checkout') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const result = await postDialogueCheckout({
        user,
        body: readBodyObject(req),
        origin: requestOrigin(req),
      });
      return sendJson(res, result.status, result.body);
    }

    // Non-fatal if Postgres is down — routes return JSON 5xx instead of hanging.
    await ensureSchemaOnce();

    if (path === 'status') {
      if (method !== 'GET') return methodNotAllowed(res, ['GET']);
      const result = await getDialogueStatus({
        user,
        sessionKey: queryString(req.query?.sessionKey),
      });
      return sendJson(res, result.status, result.body);
    }

    if (path === 'interact') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const result = await postDialogueInteract({
        user,
        body: readBodyObject(req),
      });
      return sendJson(res, result.status, result.body);
    }

    if (path === 'unlock') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const result = await postDialogueUnlock({
        user,
        body: readBodyObject(req),
      });
      return sendJson(res, result.status, result.body);
    }

    if (path === 'confirm-stripe') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const result = await postDialogueConfirmStripe({
        user,
        body: readBodyObject(req),
      });
      return sendJson(res, result.status, result.body);
    }

    return sendJson(res, 404, {
      error: 'Endpoint dialogo non trovato.',
      path,
      method,
    });
  } catch (error) {
    console.error('api/dialogue handler failed:', error);
    return sendJson(res, 500, {
      error: 'Errore interno del server dialogo.',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
