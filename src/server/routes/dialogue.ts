import {
  DIALOGUE_PACK_CATALOG,
  getDialogueAccessStatus,
  recordDialogueInteraction,
  unlockDialogueTimePack,
} from '../../db/repository.ts';
import {
  allowDirectUnlock,
  checkoutLineItemFromCatalog,
  createCheckoutSession,
  isStripeConfigured,
} from '../../lib/stripe.ts';
import type { DialoguePackId } from '../../types/handoff.ts';
import { activateDialogueFromPaidSession } from '../activations.ts';
import {
  isValidEmail,
  json,
  mapSafeError,
  type ApiResult,
  type ApiUser,
} from '../http.ts';

export async function getDialogueStatus(params: {
  user: ApiUser | null;
  sessionKey: string;
}): Promise<ApiResult> {
  try {
    const sessionKey = params.sessionKey.trim();
    if (!sessionKey || sessionKey.length < 8) {
      return json(400, {
        error: 'Identificativo sessione dialogo mancante.',
      });
    }

    const status = await getDialogueAccessStatus({
      sessionKey,
      uid: params.user?.uid ?? null,
      authEmail: params.user?.email ?? null,
      authName: params.user?.name ?? null,
    });

    return json(200, { status });
  } catch (error) {
    return mapSafeError(
      error,
      'Impossibile verificare il tempo residuo del dialogo.'
    );
  }
}

export async function postDialogueInteract(params: {
  user: ApiUser | null;
  body: Record<string, unknown>;
}): Promise<ApiResult> {
  try {
    const sessionKey = String(params.body.sessionKey || '').trim();
    if (!sessionKey || sessionKey.length < 8) {
      return json(400, {
        error: 'Identificativo sessione dialogo mancante.',
      });
    }

    const result = await recordDialogueInteraction({
      sessionKey,
      uid: params.user?.uid ?? null,
      authEmail: params.user?.email ?? null,
      authName: params.user?.name ?? null,
    });

    if (!result.allowed) {
      return json(402, {
        error:
          'I 5 minuti gratuiti di prova sono terminati. Sblocca un pass a tempo per proseguire il dialogo.',
        status: result.status,
      });
    }

    return json(200, result);
  } catch (error) {
    return mapSafeError(
      error,
      'Errore durante la verifica della sessione dialogo.'
    );
  }
}

export async function postDialogueUnlock(params: {
  user: ApiUser | null;
  body: Record<string, unknown>;
}): Promise<ApiResult> {
  try {
    const sessionKey = String(params.body.sessionKey || '').trim();
    const packId = String(params.body.packId || '').trim() as DialoguePackId;
    const customerName = String(params.body.customerName || '').trim();
    const customerEmail = String(params.body.customerEmail || '').trim();
    const stripeSessionId = params.body.stripeSessionId
      ? String(params.body.stripeSessionId).trim()
      : '';

    if (
      !sessionKey ||
      sessionKey.length < 8 ||
      !(packId in DIALOGUE_PACK_CATALOG) ||
      customerName.length < 2 ||
      !isValidEmail(customerEmail)
    ) {
      return json(400, {
        error:
          'Inserisci nominativo, email valida e un pacchetto minuti valido.',
      });
    }

    if (stripeSessionId) {
      const result = await activateDialogueFromPaidSession({
        stripeSessionId,
        fallbackSessionKey: sessionKey,
        uid: params.user?.uid ?? null,
        authEmail: params.user?.email ?? null,
        authName: params.user?.name ?? null,
      });
      return json(201, result);
    }

    if (allowDirectUnlock()) {
      const result = await unlockDialogueTimePack({
        sessionKey,
        packId,
        customerName,
        customerEmail,
        stripeSessionId: `cs_dev_dialogue_${packId}_${Date.now()}`,
        uid: params.user?.uid ?? null,
        authEmail: params.user?.email ?? null,
        authName: params.user?.name ?? null,
      });
      return json(201, { mode: 'direct_unlock', ...result });
    }

    return json(402, {
      error:
        'Pagamento Stripe richiesto. Usa /api/dialogue/checkout oppure conferma una sessione pagata.',
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg === 'STRIPE_PAYMENT_NOT_PAID') {
      return json(402, { error: 'Pagamento Stripe non ancora confermato.' });
    }
    return mapSafeError(error, 'Impossibile attivare il pass temporale.');
  }
}

export async function postDialogueCheckout(params: {
  user: ApiUser | null;
  body: Record<string, unknown>;
  origin: string;
}): Promise<ApiResult> {
  try {
    const sessionKey = String(params.body.sessionKey || '').trim();
    const packId = String(params.body.packId || '').trim() as DialoguePackId;
    const customerName = String(params.body.customerName || '').trim();
    const customerEmail = String(params.body.customerEmail || '').trim();

    if (
      !sessionKey ||
      sessionKey.length < 8 ||
      !(packId in DIALOGUE_PACK_CATALOG) ||
      customerName.length < 2 ||
      !isValidEmail(customerEmail)
    ) {
      return json(400, {
        error:
          'Inserisci nominativo, email valida e un pacchetto minuti (5, 10 o 15 min).',
      });
    }

    const pack = DIALOGUE_PACK_CATALOG[packId];

    if (isStripeConfigured()) {
      const checkout = await createCheckoutSession({
        customerEmail,
        successUrl: `${params.origin}/dialogo?dialogue_stripe_session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${params.origin}/dialogo?checkout=cancel&item=dialogue`,
        lineItem: checkoutLineItemFromCatalog({
          stripePriceIdAnnotation: pack.stripePriceId,
          priceEur: pack.priceEur,
          productName: `Tarot Italia IA · ${pack.title}`,
          productDescription: `${pack.durationMinutes} minuti di dialogo guidato con Tarot Italia IA`,
        }),
        metadata: {
          itemType: 'dialogue',
          sessionKey,
          packId: pack.id,
          customerName,
          customerEmail,
          firebaseUserId: params.user?.uid || '',
        },
      });

      return json(200, {
        mode: 'stripe_redirect',
        checkoutUrl: checkout.url,
        stripeSessionId: checkout.id,
      });
    }

    if (allowDirectUnlock()) {
      const unlocked = await unlockDialogueTimePack({
        sessionKey,
        packId,
        customerName,
        customerEmail,
        stripeSessionId: `cs_dev_dialogue_${packId}_${Date.now()}`,
        uid: params.user?.uid ?? null,
        authEmail: params.user?.email ?? null,
        authName: params.user?.name ?? null,
      });

      return json(201, {
        mode: 'direct_unlock',
        ...unlocked,
      });
    }

    return json(503, {
      error:
        'Pagamenti Stripe non configurati. Imposta STRIPE_SECRET_KEY oppure, solo in sviluppo, ALLOW_DIRECT_UNLOCK=true.',
    });
  } catch (error) {
    return mapSafeError(error, 'Impossibile avviare il pagamento del pass.');
  }
}

export async function postDialogueConfirmStripe(params: {
  user: ApiUser | null;
  body: Record<string, unknown>;
}): Promise<ApiResult> {
  try {
    const stripeSessionId = String(params.body.stripeSessionId || '').trim();
    const fallbackSessionKey = String(params.body.sessionKey || '').trim();

    if (!stripeSessionId || !isStripeConfigured()) {
      return json(400, { error: 'Sessione Stripe non verificabile.' });
    }

    const result = await activateDialogueFromPaidSession({
      stripeSessionId,
      fallbackSessionKey,
      uid: params.user?.uid ?? null,
      authEmail: params.user?.email ?? null,
      authName: params.user?.name ?? null,
    });

    return json(200, result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg === 'STRIPE_PAYMENT_NOT_PAID') {
      return json(402, { error: 'Pagamento Stripe non ancora confermato.' });
    }
    if (
      msg === 'Metadati pagamento incompleti.' ||
      msg === 'STRIPE_WRONG_ITEM_TYPE'
    ) {
      return json(400, { error: 'Metadati pagamento incompleti.' });
    }
    return mapSafeError(error, 'Errore nella verifica del pagamento Stripe.');
  }
}
