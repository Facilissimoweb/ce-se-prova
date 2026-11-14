import { postStripeWebhook } from '../../src/server/routes/stripeWebhook.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  readRawBody,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../../src/server/vercelAdapter.ts';

/**
 * bodyParser:false keeps the raw payload for Stripe-Signature.
 * maxDuration 30 matches v2 Hobby-friendly Node functions.
 */
export const config = {
  runtime: 'nodejs',
  api: { bodyParser: false },
  maxDuration: 30,
};

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  await ensureSchemaOnce();
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

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
