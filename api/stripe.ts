/**
 * Stripe group: webhook (raw body for Stripe-Signature).
 * /api/stripe/* → /api/stripe?__path=… (see vercel.json).
 * Static imports so Vercel bundles src/.
 */
import { postStripeWebhook } from '../src/server/routes/stripeWebhook.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  readRawBody,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../src/server/vercelAdapter.ts';
import { groupSubpath, sendJson } from '../src/server/vercelEntry.ts';

export const config = {
  runtime: 'nodejs',
  api: { bodyParser: false },
  maxDuration: 30,
};

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'stripe');
    await ensureSchemaOnce();

    if (path === 'webhook') {
      if (method !== 'POST') return methodNotAllowed(res, ['POST']);
      const rawBody = await readRawBody(req);
      const signatureHeader =
        typeof req.headers['stripe-signature'] === 'string'
          ? req.headers['stripe-signature']
          : Array.isArray(req.headers['stripe-signature'])
            ? req.headers['stripe-signature'][0]
            : undefined;
      return sendApiResult(
        res,
        await postStripeWebhook({
          rawBody,
          signatureHeader,
        })
      );
    }

    return sendJson(res, 404, { error: 'Not found', path, method });
  } catch (error) {
    console.error('api/stripe handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
