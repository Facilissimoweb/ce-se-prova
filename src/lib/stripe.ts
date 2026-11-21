import { createHmac, timingSafeEqual } from 'crypto';

export type StripeCheckoutSession = {
  id: string;
  url?: string | null;
  payment_status?: string;
  customer_email?: string | null;
  metadata?: Record<string, string> | null;
  amount_total?: number | null;
  currency?: string | null;
  error?: { message?: string; code?: string; type?: string };
};

export type StripeLineItem =
  | { priceId: string; quantity?: number }
  | {
      priceData: {
        currency: string;
        unitAmountCents: number;
        productName: string;
        productDescription?: string;
      };
      quantity?: number;
    };

/** Why STRIPE_SECRET_KEY cannot create Checkout Sessions (null = usable). */
export type StripeSecretKeyIssue = 'missing' | 'publishable' | 'invalid';

/**
 * Client-safe copy when Production has pk_… (or Stripe returns secret_key_required).
 * No secret values — only what Maria must fix in Vercel.
 */
export const STRIPE_SECRET_KEY_CLIENT_ERROR =
  'Configurazione Stripe non valida: STRIPE_SECRET_KEY in Vercel Production deve essere una Secret key (sk_live_… / sk_test_…) o Restricted key (rk_live_…), non una Publishable key (pk_…). Aggiorna la variabile e fai Redeploy.';

export const STRIPE_KEY_PERMISSION_CLIENT_ERROR =
  'Chiave Stripe Restricted senza permesso Checkout Sessions (write). Usa sk_live_… oppure amplia i permessi della rk_live_…, poi Redeploy.';

export function diagnoseStripeSecretKey(): StripeSecretKeyIssue | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key || key.startsWith('MY_') || key.length < 10) {
    return 'missing';
  }
  if (key.startsWith('pk_')) {
    return 'publishable';
  }
  if (key.startsWith('sk_') || key.startsWith('rk_')) {
    return null;
  }
  return 'invalid';
}

function stripeSecretKey(): string | null {
  if (diagnoseStripeSecretKey() !== null) {
    return null;
  }
  return process.env.STRIPE_SECRET_KEY!.trim();
}

/** True when a real Stripe secret/restricted key is configured (not pk_…). */
export function isStripeConfigured(): boolean {
  return Boolean(stripeSecretKey());
}

/**
 * Map Stripe config / API auth failures to a client JSON response.
 * Returns null for unrelated errors (caller keeps using mapSafeError).
 */
export function stripeCheckoutClientError(
  error: unknown
): { status: number; error: string } | null {
  const msg = error instanceof Error ? error.message : '';
  if (
    msg === 'STRIPE_SECRET_KEY_PUBLISHABLE' ||
    msg === 'STRIPE_SECRET_KEY_REQUIRED' ||
    msg === 'STRIPE_SECRET_KEY_INVALID'
  ) {
    return { status: 400, error: STRIPE_SECRET_KEY_CLIENT_ERROR };
  }
  if (msg === 'STRIPE_KEY_PERMISSION') {
    return { status: 403, error: STRIPE_KEY_PERMISSION_CLIENT_ERROR };
  }
  return null;
}

function throwFromStripeCheckoutError(
  error: StripeCheckoutSession['error'] | undefined
): never {
  const code = (error?.code || '').toLowerCase();
  const message = (error?.message || '').toLowerCase();
  if (
    code === 'secret_key_required' ||
    message.includes('secret_key_required') ||
    (message.includes('secret key') && message.includes('required'))
  ) {
    throw new Error('STRIPE_SECRET_KEY_REQUIRED');
  }
  if (
    code === 'api_key_expired' ||
    message.includes('invalid api key') ||
    message.includes('invalid api_key')
  ) {
    throw new Error('STRIPE_SECRET_KEY_INVALID');
  }
  if (
    message.includes('restricted') &&
    (message.includes('permission') || message.includes('does not have'))
  ) {
    throw new Error('STRIPE_KEY_PERMISSION');
  }
  throw new Error('STRIPE_CHECKOUT_CREATE_FAILED');
}

/**
 * Explicit non-prod bypass for local preview without Stripe.
 * Production never unlocks without verified payment, even if this flag is set.
 */
export function allowDirectUnlock(): boolean {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }
  return process.env.ALLOW_DIRECT_UNLOCK === 'true';
}

export function resolveStripePriceId(
  envOrAnnotation: string | null | undefined
): string | null {
  if (!envOrAnnotation) return null;
  const trimmed = envOrAnnotation.trim();
  if (trimmed.startsWith('price_')) return trimmed;
  const fromEnv = process.env[trimmed]?.trim();
  if (fromEnv && fromEnv.startsWith('price_')) return fromEnv;
  return null;
}

export async function createCheckoutSession(params: {
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  lineItem: StripeLineItem;
  metadata: Record<string, string>;
}): Promise<{ id: string; url: string }> {
  const keyIssue = diagnoseStripeSecretKey();
  if (keyIssue === 'publishable') {
    throw new Error('STRIPE_SECRET_KEY_PUBLISHABLE');
  }
  if (keyIssue === 'invalid') {
    throw new Error('STRIPE_SECRET_KEY_INVALID');
  }
  const stripeKey = stripeSecretKey();
  if (!stripeKey) {
    throw new Error('STRIPE_NOT_CONFIGURED');
  }

  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('customer_email', params.customerEmail);
  form.set('success_url', params.successUrl);
  form.set('cancel_url', params.cancelUrl);
  form.set('line_items[0][quantity]', String(params.lineItem.quantity ?? 1));

  if ('priceId' in params.lineItem) {
    form.set('line_items[0][price]', params.lineItem.priceId);
  } else {
    const { priceData } = params.lineItem;
    form.set('line_items[0][price_data][currency]', priceData.currency);
    form.set(
      'line_items[0][price_data][unit_amount]',
      String(priceData.unitAmountCents)
    );
    form.set(
      'line_items[0][price_data][product_data][name]',
      priceData.productName
    );
    if (priceData.productDescription) {
      form.set(
        'line_items[0][price_data][product_data][description]',
        priceData.productDescription
      );
    }
  }

  for (const [key, value] of Object.entries(params.metadata)) {
    if (value != null && value !== '') {
      form.set(`metadata[${key}]`, value);
    }
  }

  const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });

  const stripeData = (await stripeRes.json()) as StripeCheckoutSession;
  if (!stripeRes.ok || !stripeData.id || !stripeData.url) {
    console.error('Stripe checkout session create failed:', stripeData.error);
    throwFromStripeCheckoutError(stripeData.error);
  }

  return { id: stripeData.id, url: stripeData.url };
}

export async function retrieveCheckoutSession(
  sessionId: string
): Promise<StripeCheckoutSession> {
  const keyIssue = diagnoseStripeSecretKey();
  if (keyIssue === 'publishable') {
    throw new Error('STRIPE_SECRET_KEY_PUBLISHABLE');
  }
  if (keyIssue === 'invalid') {
    throw new Error('STRIPE_SECRET_KEY_INVALID');
  }
  const stripeKey = stripeSecretKey();
  if (!stripeKey) {
    throw new Error('STRIPE_NOT_CONFIGURED');
  }

  const verifyRes = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: { Authorization: `Bearer ${stripeKey}` },
    }
  );
  const sessionObj = (await verifyRes.json()) as StripeCheckoutSession;
  if (!verifyRes.ok) {
    console.error('Stripe session retrieve failed:', sessionObj.error);
    throw new Error('STRIPE_SESSION_RETRIEVE_FAILED');
  }
  return sessionObj;
}

/** Throws if the Checkout Session is not paid. */
export async function assertCheckoutPaid(
  sessionId: string
): Promise<StripeCheckoutSession> {
  const session = await retrieveCheckoutSession(sessionId);
  if (session.payment_status !== 'paid') {
    throw new Error('STRIPE_PAYMENT_NOT_PAID');
  }
  return session;
}

type StripeWebhookEvent = {
  id: string;
  type: string;
  data: {
    object: StripeCheckoutSession & {
      object?: string;
      metadata?: Record<string, string> | null;
    };
  };
};

/**
 * Verifies Stripe-Signature header (t=,v1=) without the Stripe SDK.
 */
export function constructWebhookEvent(
  rawBody: Buffer | string,
  signatureHeader: string | undefined
): StripeWebhookEvent {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret || secret.startsWith('MY_')) {
    throw new Error('STRIPE_WEBHOOK_NOT_CONFIGURED');
  }
  if (!signatureHeader) {
    throw new Error('STRIPE_WEBHOOK_SIGNATURE_MISSING');
  }

  const parts = signatureHeader.split(',').map((p) => p.trim());
  const timestampPart = parts.find((p) => p.startsWith('t='));
  const signatures = parts
    .filter((p) => p.startsWith('v1='))
    .map((p) => p.slice(3));

  if (!timestampPart || signatures.length === 0) {
    throw new Error('STRIPE_WEBHOOK_SIGNATURE_INVALID');
  }

  const timestamp = timestampPart.slice(2);
  const payload =
    typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8');
  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');

  const expectedBuf = Buffer.from(expected, 'utf8');
  const valid = signatures.some((sig) => {
    const sigBuf = Buffer.from(sig, 'utf8');
    return (
      sigBuf.length === expectedBuf.length &&
      timingSafeEqual(sigBuf, expectedBuf)
    );
  });

  if (!valid) {
    throw new Error('STRIPE_WEBHOOK_SIGNATURE_MISMATCH');
  }

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) {
    throw new Error('STRIPE_WEBHOOK_TIMESTAMP_STALE');
  }

  return JSON.parse(payload) as StripeWebhookEvent;
}

export function checkoutLineItemFromCatalog(params: {
  stripePriceIdAnnotation: string;
  priceEur: number;
  productName: string;
  productDescription?: string;
}): StripeLineItem {
  const priceId = resolveStripePriceId(params.stripePriceIdAnnotation);
  if (priceId) {
    return { priceId, quantity: 1 };
  }
  return {
    priceData: {
      currency: 'eur',
      unitAmountCents: Math.round(params.priceEur * 100),
      productName: params.productName,
      productDescription: params.productDescription,
    },
    quantity: 1,
  };
}
