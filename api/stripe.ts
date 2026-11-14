/**
 * Stripe group: webhook (raw body for Stripe-Signature).
 * /api/stripe/* → /api/stripe?__path=… (see vercel.json).
 */
import {
  groupSubpath,
  sendJson,
  type EntryReq,
  type EntryRes,
} from '../src/server/vercelEntry.ts';

export const config = {
  runtime: 'nodejs',
  api: { bodyParser: false },
  maxDuration: 30,
};

export default async function handler(req: EntryReq, res: EntryRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = groupSubpath(req, 'stripe');

    const adapter = await import('../src/server/vercelAdapter.ts');
    await adapter.ensureSchemaOnce();

    if (path === 'webhook') {
      if (method !== 'POST') return adapter.methodNotAllowed(res as never, ['POST']);
      const { postStripeWebhook } = await import(
        '../src/server/routes/stripeWebhook.ts'
      );
      const rawBody = await adapter.readRawBody(req as never);
      const signatureHeader =
        typeof req.headers?.['stripe-signature'] === 'string'
          ? req.headers['stripe-signature']
          : Array.isArray(req.headers?.['stripe-signature'])
            ? req.headers['stripe-signature'][0]
            : undefined;
      return adapter.sendApiResult(
        res as never,
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
