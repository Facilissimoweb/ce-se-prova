import type { VercelRequest, VercelResponse } from '@vercel/node';
import { postStripeWebhook } from '../../src/server/routes/stripeWebhook.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  readRawBody,
  sendApiResult,
} from '../_lib/vercelHandler.ts';

/** Disable Vercel body parsing so Stripe signature verification sees the raw payload. */
export const config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 60,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchemaOnce();
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  const rawBody = await readRawBody(req);
  const signature =
    typeof req.headers['stripe-signature'] === 'string'
      ? req.headers['stripe-signature']
      : Array.isArray(req.headers['stripe-signature'])
        ? req.headers['stripe-signature'][0]
        : undefined;

  return sendApiResult(
    res,
    await postStripeWebhook({
      rawBody,
      signatureHeader: signature,
    })
  );
}
