import {
  attachStripeSessionToBooking,
  cancelPendingBooking,
  confirmConsultationBooking,
  createConsultationBooking,
  listOccupiedSlots,
} from '../../db/repository.ts';
import {
  isSlotAllowedForMode,
  resolveBookingMode,
  sessionModeLabel,
  type BookingMode,
} from '../../lib/bookingRules.ts';
import {
  HOUR_SLOTS,
  isValidDateIso,
  isValidSlotFormat,
  slotsForDate,
} from '../../lib/bookingSlots.ts';
import { resolveBookingTariff } from '../../lib/paymentCatalog.ts';
import { CONSULTATION_STRIPE_ENABLED } from '../../lib/bookingCheckoutMode.ts';
import {
  allowDirectUnlock,
  assertCheckoutPaid,
  checkoutLineItemFromCatalog,
  createCheckoutSession,
  isStripeConfigured,
} from '../../lib/stripe.ts';
import {
  isValidEmail,
  json,
  mapSafeError,
  type ApiResult,
  type ApiUser,
} from '../http.ts';

export async function getBookingsAvailability(params: {
  from: string;
  to: string;
}): Promise<ApiResult> {
  try {
    const { from, to } = params;
    if (!isValidDateIso(from) || !isValidDateIso(to) || from > to) {
      return json(400, {
        error: 'Intervallo date non valido (from/to YYYY-MM-DD).',
      });
    }
    const occupied = await listOccupiedSlots(from, to);
    return json(200, {
      from,
      to,
      hourSlots: HOUR_SLOTS,
      occupied,
    });
  } catch (error) {
    return mapSafeError(
      error,
      'Errore nel caricamento della disponibilità.'
    );
  }
}

export async function postBooking(params: {
  user: ApiUser | null;
  body: Record<string, unknown>;
  origin: string;
}): Promise<ApiResult> {
  try {
    const { user, body, origin } = params;
    const tariffId = String(body.tariffId || '').trim();
    const tariff = resolveBookingTariff(tariffId);
    const scheduledDate = String(body.scheduledDate || '').trim();
    const scheduledTime = String(body.scheduledTime || '').trim();
    const fullName = String(body.fullName || '').trim();
    const email = String(body.email || user?.email || '').trim();
    const phoneWhatsApp = String(body.phoneWhatsApp || '').trim();
    const sessionIntent = String(body.sessionIntent || '').trim();
    const deontologyAccepted = Boolean(body.deontologyAccepted);
    const privacyTermsAccepted = Boolean(body.privacyTermsAccepted);
    const requestedMode: BookingMode =
      String(body.mode || '').trim() === 'studio' ? 'studio' : 'remote';

    if (
      !tariff ||
      !isValidDateIso(scheduledDate) ||
      !isValidSlotFormat(scheduledTime) ||
      !fullName ||
      !email ||
      !isValidEmail(email) ||
      !phoneWhatsApp ||
      !deontologyAccepted ||
      !privacyTermsAccepted
    ) {
      return json(400, {
        error: 'Completa tutti i campi obbligatori della prenotazione.',
      });
    }

    if (tariff.onlineOnly && requestedMode === 'studio') {
      return json(400, {
        error:
          'Il Consulto Breve è disponibile solo online in chiamata vocale.',
      });
    }

    if (!isSlotAllowedForMode(requestedMode, scheduledTime)) {
      return json(400, {
        error:
          'Di persona a Macerata è disponibile fino alle 18:00. Scegli un orario diurno o la modalità online.',
      });
    }

    const mode = tariff.onlineOnly
      ? 'remote'
      : resolveBookingMode(requestedMode, scheduledTime);

    if (!slotsForDate(scheduledDate).includes(scheduledTime)) {
      return json(400, {
        error: 'Seleziona una fascia oraria ancora disponibile.',
      });
    }

    const stripeSessionIdConfirm = String(body.stripeSessionId || '').trim();
    if (stripeSessionIdConfirm) {
      if (!isStripeConfigured()) {
        return json(400, { error: 'Sessione Stripe non verificabile.' });
      }
      const paid = await assertCheckoutPaid(stripeSessionIdConfirm);
      const meta = paid.metadata || {};
      if (meta.itemType && meta.itemType !== 'consultation') {
        return json(400, { error: 'Metadati pagamento incompleti.' });
      }
      const result = await confirmConsultationBooking({
        bookingId: meta.bookingId ? Number(meta.bookingId) : undefined,
        stripeSessionId: stripeSessionIdConfirm,
        transactionId: paid.id,
        amountCents:
          typeof paid.amount_total === 'number' ? paid.amount_total : null,
        customerEmail:
          meta.customerEmail || paid.customer_email || email || null,
      });
      return json(200, { mode: 'confirmed', booking: result.booking });
    }

    // Soft-freeze: consulti booking UI uses WhatsApp handoff; keep Stripe path
    // compiled for later re-enable via CONSULTATION_STRIPE_ENABLED.
    if (!CONSULTATION_STRIPE_ENABLED) {
      return json(200, {
        mode: 'whatsapp_handoff',
        message:
          'Prenotazione consulti via WhatsApp: apri il messaggio precompilato e invialo a Maria Teresa. Il pagamento online riprenderà in un secondo momento.',
      });
    }

    if (isStripeConfigured()) {
      const booking = await createConsultationBooking({
        uid: user?.uid ?? null,
        authEmail: user?.email ?? null,
        tariffId: tariff.id,
        scheduledDate,
        scheduledTime,
        fullName,
        email,
        phoneWhatsApp,
        sessionIntent,
        deontologyAccepted,
        mode,
        status: 'pending_payment',
      });

      try {
        const checkout = await createCheckoutSession({
          customerEmail: email,
          successUrl: `${origin}/prenota?booking_stripe_session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${origin}/prenota?checkout=cancel&item=consultation&booking=${booking.id}`,
          lineItem: checkoutLineItemFromCatalog({
            stripePriceIdAnnotation: tariff.stripePriceIdAnnotation,
            priceEur: tariff.priceEur,
            productName: `Tarot Italia · ${tariff.title}`,
            productDescription: `${scheduledDate} · ${scheduledTime} · ${sessionModeLabel(mode, scheduledTime)}`,
          }),
          metadata: {
            itemType: 'consultation',
            bookingId: String(booking.id),
            tariffId: tariff.id,
            scheduledDate,
            scheduledTime,
            customerName: fullName,
            customerEmail: email,
            customerPhone: phoneWhatsApp,
            firebaseUserId: user?.uid || '',
            mode,
          },
        });

        await attachStripeSessionToBooking(booking.id, checkout.id);

        return json(200, {
          mode: 'stripe_redirect',
          checkoutUrl: checkout.url,
          stripeSessionId: checkout.id,
          bookingId: booking.id,
        });
      } catch (error) {
        await cancelPendingBooking(booking.id);
        throw error;
      }
    }

    if (allowDirectUnlock()) {
      const booking = await createConsultationBooking({
        uid: user?.uid ?? null,
        authEmail: user?.email ?? null,
        tariffId: tariff.id,
        scheduledDate,
        scheduledTime,
        fullName,
        email,
        phoneWhatsApp,
        sessionIntent,
        deontologyAccepted,
        mode,
        status: 'pending_payment',
        stripeSessionId: `cs_dev_consult_${Date.now()}`,
      });
      const result = await confirmConsultationBooking({
        bookingId: booking.id,
        stripeSessionId: booking.stripeSessionId || undefined,
        transactionId: booking.stripeSessionId,
        customerEmail: email,
        amountCents: tariff.priceEur * 100,
      });
      return json(201, {
        mode: 'direct_unlock',
        booking: result.booking,
      });
    }

    return json(503, {
      error:
        'Pagamenti Stripe non configurati. Imposta STRIPE_SECRET_KEY oppure, solo in sviluppo, ALLOW_DIRECT_UNLOCK=true.',
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg === 'SLOT_TAKEN') {
      return json(409, {
        error:
          'Questo orario è appena stato riservato. Scegline un altro.',
      });
    }
    if (msg === 'STRIPE_PAYMENT_NOT_PAID') {
      return json(402, { error: 'Pagamento Stripe non ancora confermato.' });
    }
    return mapSafeError(
      error,
      'Errore durante la registrazione della prenotazione.'
    );
  }
}

export async function postBookingConfirmStripe(params: {
  user: ApiUser | null;
  body: Record<string, unknown>;
}): Promise<ApiResult> {
  try {
    const { user, body } = params;
    const stripeSessionId = String(body.stripeSessionId || '').trim();
    if (!stripeSessionId || !isStripeConfigured()) {
      return json(400, { error: 'Sessione Stripe non verificabile.' });
    }
    const paid = await assertCheckoutPaid(stripeSessionId);
    const meta = paid.metadata || {};
    if (meta.itemType && meta.itemType !== 'consultation') {
      return json(400, { error: 'Metadati pagamento incompleti.' });
    }
    const result = await confirmConsultationBooking({
      bookingId: meta.bookingId ? Number(meta.bookingId) : undefined,
      stripeSessionId,
      transactionId: paid.id,
      amountCents:
        typeof paid.amount_total === 'number' ? paid.amount_total : null,
      customerEmail:
        meta.customerEmail || paid.customer_email || user?.email || null,
    });
    return json(200, { mode: 'confirmed', booking: result.booking });
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg === 'STRIPE_PAYMENT_NOT_PAID') {
      return json(402, { error: 'Pagamento Stripe non ancora confermato.' });
    }
    return mapSafeError(error, 'Errore nella conferma della prenotazione.', {
      notFound: 'non trovata',
    });
  }
}
