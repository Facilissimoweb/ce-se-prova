import { postStripeWebhook } from '../../src/server/routes/stripeWebhook.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  readRawBody,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../../src/server/vercelAdapter.ts';

/** Same config shape as v2tarotitalia Node functions. Raw body via stream when needed. */
export const config = { runtime: 'nodejs', maxDuration: 30 };

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
