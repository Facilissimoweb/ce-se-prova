import {
  enrollUserInCourse,
  findCourseBySlug,
  getReservedAreaOverview,
  updateDispensaProgress,
} from '../../db/repository.ts';
import { COURSE_SEED_CATALOG } from '../../db/seedData.ts';
import {
  allowDirectUnlock,
  checkoutLineItemFromCatalog,
  createCheckoutSession,
  isStripeConfigured,
} from '../../lib/stripe.ts';
import { courseStripePriceAnnotation } from '../../lib/paymentCatalog.ts';
import { activateCourseFromPaidSession } from '../activations.ts';
import {
  json,
  mapSafeError,
  type ApiResult,
  type ApiUser,
} from '../http.ts';

const OVERVIEW_DEGRADED_NOTICE =
  'Area Riservata in modalità ridotta: non riusciamo a sincronizzare corsi e prenotazioni con il database in questo momento. Puoi restare autenticata; riprova tra poco.';

/** Locked catalog from in-repo seed — used when Postgres is unreachable. */
function degradedOverviewFromSeed(user: ApiUser) {
  return {
    user: {
      id: 0,
      uid: user.uid,
      email: user.email || '',
      displayName: user.name ?? null,
      phoneWhatsapp: null,
    },
    courses: COURSE_SEED_CATALOG.map((course, index) => ({
      id: -(index + 1),
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      priceEur: course.priceEur,
      stripePriceId: course.stripePriceId,
      lessonsCount: course.lessonsCount,
      totalHours: course.totalHours,
      levelLabel: course.levelLabel,
      sortOrder: course.sortOrder,
      isUnlocked: false,
      purchasedAt: null,
      amountPaidEur: null,
      dispenseCount: course.dispense.length,
      dispenseOutline: course.dispense.map((d, i) => ({
        id: -(index * 100 + i + 1),
        courseId: -(index + 1),
        moduleNumber: d.moduleNumber,
        title: d.title,
        subtitle: d.subtitle,
        format: d.format,
        readingMinutes: d.readingMinutes,
        sortOrder: i + 1,
      })),
      unlockedDispense: [],
    })),
    bookings: [],
    dialoguePasses: [],
    degraded: true,
    notice: OVERVIEW_DEGRADED_NOTICE,
  };
}

export async function getReservedOverview(user: ApiUser): Promise<ApiResult> {
  try {
    if (!user.uid) {
      return json(401, { error: 'Identità utente non valida.', code: 'AUTH_INVALID' });
    }
    try {
      const overview = await getReservedAreaOverview(
        user.uid,
        user.email || '',
        user.name ?? null
      );
      return json(200, overview);
    } catch (error) {
      // Soft-fail like bookings availability: never bare 500 / plain-text crash.
      console.error('getReservedOverview soft-fail (seed catalog):', error);
      return json(200, {
        ...degradedOverviewFromSeed(user),
        detail: error instanceof Error ? error.message : String(error),
        code: 'OVERVIEW_DEGRADED',
      });
    }
  } catch (error) {
    return mapSafeError(error, 'Impossibile aprire l’Area Riservata.');
  }
}

export async function postReservedEnroll(params: {
  user: ApiUser;
  body: Record<string, unknown>;
  origin: string;
}): Promise<ApiResult> {
  try {
    const { user, body, origin } = params;
    const email = user.email || String(body.email || '');
    const displayName = user.name ?? null;

    if (!user.uid || !email) {
      return json(401, { error: 'Autenticazione richiesta.' });
    }

    const courseSlug = String(body.courseSlug || '').trim();
    const customerName = String(
      body.customerName || displayName || ''
    ).trim();
    const customerPhone = body.customerPhone
      ? String(body.customerPhone).trim()
      : undefined;
    const stripeSessionId = body.stripeSessionId
      ? String(body.stripeSessionId).trim()
      : '';

    if (!courseSlug || !customerName) {
      return json(400, {
        error: 'Dati del percorso o nominativo mancanti.',
      });
    }

    const course = await findCourseBySlug(courseSlug);
    if (!course) {
      return json(404, { error: 'Percorso didattico non trovato.' });
    }

    if (stripeSessionId) {
      const result = await activateCourseFromPaidSession({
        uid: user.uid,
        email,
        displayName,
        stripeSessionId,
        fallbackCourseSlug: courseSlug,
        fallbackCustomerName: customerName,
        fallbackCustomerPhone: customerPhone,
      });
      return json(201, { mode: 'enrolled', ...result });
    }

    if (isStripeConfigured()) {
      const priceAnnotation =
        course.stripePriceId || courseStripePriceAnnotation(course.slug);
      const checkout = await createCheckoutSession({
        customerEmail: email,
        successUrl: `${origin}/area-riservata?course_stripe_session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/area-riservata?checkout=cancel&item=course`,
        lineItem: checkoutLineItemFromCatalog({
          stripePriceIdAnnotation: priceAnnotation,
          priceEur: course.priceEur,
          productName: `Tarot Italia · ${course.title}`,
          productDescription: course.subtitle,
        }),
        metadata: {
          itemType: 'course',
          courseSlug: course.slug,
          customerName,
          customerEmail: email,
          customerPhone: customerPhone || '',
          firebaseUserId: user.uid,
        },
      });

      return json(200, {
        mode: 'stripe_redirect',
        checkoutUrl: checkout.url,
        stripeSessionId: checkout.id,
      });
    }

    if (allowDirectUnlock()) {
      const result = await enrollUserInCourse({
        uid: user.uid,
        email,
        displayName,
        courseSlug,
        customerName,
        customerPhone,
        stripeSessionId: `cs_dev_course_${course.slug}_${Date.now()}`,
      });
      return json(201, { mode: 'direct_unlock', ...result });
    }

    return json(503, {
      error:
        'Pagamenti Stripe non configurati. Imposta STRIPE_SECRET_KEY (e i Price ID) oppure, solo in sviluppo, ALLOW_DIRECT_UNLOCK=true.',
    });
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
    return mapSafeError(error, 'Errore nella registrazione del percorso.', {
      notFound: 'non trovato',
    });
  }
}

export async function postReservedConfirmStripe(params: {
  user: ApiUser;
  body: Record<string, unknown>;
}): Promise<ApiResult> {
  try {
    const { user, body } = params;
    const email = user.email || '';
    const stripeSessionId = String(body.stripeSessionId || '').trim();

    if (!user.uid || !email) {
      return json(401, { error: 'Autenticazione richiesta.' });
    }
    if (!stripeSessionId || !isStripeConfigured()) {
      return json(400, { error: 'Sessione Stripe non verificabile.' });
    }

    const result = await activateCourseFromPaidSession({
      uid: user.uid,
      email,
      displayName: user.name ?? null,
      stripeSessionId,
    });
    return json(200, { mode: 'enrolled', ...result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg === 'STRIPE_PAYMENT_NOT_PAID') {
      return json(402, { error: 'Pagamento Stripe non ancora confermato.' });
    }
    return mapSafeError(error, 'Errore nella verifica del pagamento corso.');
  }
}

export async function putDispensaProgress(params: {
  user: ApiUser;
  dispensaId: number;
  body: Record<string, unknown>;
}): Promise<ApiResult> {
  try {
    const { user, dispensaId, body } = params;
    if (!user.uid) {
      return json(401, { error: 'Autenticazione richiesta.' });
    }
    if (!Number.isInteger(dispensaId) || dispensaId <= 0) {
      return json(400, { error: 'Identificativo dispensa non valido.' });
    }

    const completed =
      typeof body.completed === 'boolean' ? body.completed : undefined;
    const personalNotes =
      typeof body.personalNotes === 'string' ? body.personalNotes : undefined;

    const updated = await updateDispensaProgress({
      uid: user.uid,
      email: user.email || '',
      dispensaId,
      completed,
      personalNotes,
    });

    return json(200, { progress: updated });
  } catch (error) {
    return mapSafeError(error, 'Errore nel salvataggio del progresso.', {
      notFound: 'non trovata',
      forbidden: 'Acquisto richiesto',
    });
  }
}
