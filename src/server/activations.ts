import {
  cancelPendingBooking,
  confirmConsultationBooking,
  DIALOGUE_PACK_CATALOG,
  enrollUserInCourse,
  unlockDialogueTimePack,
} from '../db/repository.ts';
import {
  assertCheckoutPaid,
  constructWebhookEvent,
  type StripeCheckoutSession,
} from '../lib/stripe.ts';
import type { DialoguePackId } from '../types/handoff.ts';

export async function activateCourseFromPaidSession(params: {
  uid: string;
  email: string;
  displayName?: string | null;
  stripeSessionId: string;
  fallbackCourseSlug?: string;
  fallbackCustomerName?: string;
  fallbackCustomerPhone?: string;
}) {
  const session = await assertCheckoutPaid(params.stripeSessionId);
  const meta = session.metadata || {};
  if (meta.itemType && meta.itemType !== 'course') {
    throw new Error('STRIPE_WRONG_ITEM_TYPE');
  }
  const courseSlug = String(
    meta.courseSlug || params.fallbackCourseSlug || ''
  ).trim();
  const customerName = String(
    meta.customerName ||
      params.fallbackCustomerName ||
      params.displayName ||
      'Corsista'
  ).trim();
  const customerPhone = meta.customerPhone
    ? String(meta.customerPhone).trim()
    : params.fallbackCustomerPhone;

  if (!courseSlug) {
    throw new Error('Metadati pagamento incompleti.');
  }

  return enrollUserInCourse({
    uid: params.uid,
    email: params.email,
    displayName: params.displayName,
    courseSlug,
    customerName,
    customerPhone,
    stripeSessionId: params.stripeSessionId,
  });
}

export async function activateDialogueFromPaidSession(params: {
  stripeSessionId: string;
  fallbackSessionKey?: string;
  uid?: string | null;
  authEmail?: string | null;
  authName?: string | null;
}) {
  const session = await assertCheckoutPaid(params.stripeSessionId);
  const meta = session.metadata || {};
  if (meta.itemType && meta.itemType !== 'dialogue') {
    throw new Error('STRIPE_WRONG_ITEM_TYPE');
  }
  const packId = (meta.packId || '') as DialoguePackId;
  const sessionKey = String(
    meta.sessionKey || params.fallbackSessionKey || ''
  ).trim();
  const customerName = String(
    meta.customerName || 'Ospite Tarot Italia'
  ).trim();
  const customerEmail = String(
    meta.customerEmail || session.customer_email || ''
  ).trim();

  if (!sessionKey || !(packId in DIALOGUE_PACK_CATALOG)) {
    throw new Error('Metadati pagamento incompleti.');
  }

  return unlockDialogueTimePack({
    sessionKey,
    packId,
    customerName,
    customerEmail,
    stripeSessionId: params.stripeSessionId,
    uid: params.uid,
    authEmail: params.authEmail,
    authName: params.authName,
  });
}

async function fulfillPaidCheckoutSession(sessionObj: StripeCheckoutSession) {
  if (sessionObj.payment_status !== 'paid' || !sessionObj.id) return;
  const meta = sessionObj.metadata || {};
  const itemType = meta.itemType;

  if (itemType === 'dialogue') {
    const packId = meta.packId as DialoguePackId;
    const sessionKey = String(meta.sessionKey || '').trim();
    if (sessionKey && packId in DIALOGUE_PACK_CATALOG) {
      await unlockDialogueTimePack({
        sessionKey,
        packId,
        customerName: String(meta.customerName || 'Ospite Tarot Italia'),
        customerEmail: String(
          meta.customerEmail || sessionObj.customer_email || ''
        ),
        stripeSessionId: sessionObj.id,
        uid: meta.firebaseUserId || null,
        authEmail: meta.customerEmail || sessionObj.customer_email || null,
        authName: meta.customerName || null,
      });
    } else {
      console.error('Webhook dialogue: metadata incompleti', meta);
    }
    return;
  }

  if (itemType === 'course' && meta.firebaseUserId && meta.courseSlug) {
    await enrollUserInCourse({
      uid: String(meta.firebaseUserId),
      email: String(meta.customerEmail || sessionObj.customer_email || ''),
      displayName: meta.customerName || null,
      courseSlug: String(meta.courseSlug || ''),
      customerName: String(meta.customerName || 'Corsista'),
      customerPhone: meta.customerPhone
        ? String(meta.customerPhone)
        : undefined,
      stripeSessionId: sessionObj.id,
    });
    return;
  }

  if (itemType === 'consultation') {
    const bookingId = Number(meta.bookingId || 0);
    if (bookingId || sessionObj.id) {
      await confirmConsultationBooking({
        bookingId: bookingId || undefined,
        stripeSessionId: sessionObj.id,
        transactionId: sessionObj.id,
        amountCents:
          typeof sessionObj.amount_total === 'number'
            ? sessionObj.amount_total
            : null,
        customerEmail: meta.customerEmail || sessionObj.customer_email || null,
      });
    } else {
      console.error('Webhook consultation: metadata incompleti', meta);
    }
  }
}

/** Process a verified Stripe webhook payload (shared by Express + Vercel). */
export async function processStripeWebhook(
  rawBody: Buffer | string,
  signatureHeader: string | undefined
): Promise<void> {
  const event = constructWebhookEvent(rawBody, signatureHeader);

  if (event.type === 'checkout.session.completed') {
    await fulfillPaidCheckoutSession(event.data.object);
  }

  if (event.type === 'checkout.session.expired') {
    const sessionObj = event.data.object;
    const meta = sessionObj.metadata || {};
    if (meta.itemType === 'consultation') {
      const bookingId = Number(meta.bookingId || 0);
      if (bookingId) {
        await cancelPendingBooking(bookingId);
      }
    }
  }
}
