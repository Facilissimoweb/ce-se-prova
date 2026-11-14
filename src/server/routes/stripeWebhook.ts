import { processStripeWebhook } from '../activations.ts';
import { json, type ApiResult } from '../http.ts';

export async function postStripeWebhook(params: {
  rawBody: Buffer | string;
  signatureHeader: string | undefined;
}): Promise<ApiResult> {
  try {
    await processStripeWebhook(params.rawBody, params.signatureHeader);
    return json(200, { received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    const msg = error instanceof Error ? error.message : '';
    if (msg.startsWith('STRIPE_WEBHOOK_')) {
      return json(400, { error: 'Webhook non valido.' });
    }
    return json(500, { error: 'Errore elaborazione webhook.' });
  }
}
