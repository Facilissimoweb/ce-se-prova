import { and, eq } from 'drizzle-orm';
import {
  createUserNote,
  deleteUserNote,
  enrollUserInCourse,
  findCourseBySlug,
  getOrCreateUser,
  getReservedAreaOverview,
  listUserNotes,
  updateDispensaProgress,
  updateUserNote,
} from '../../db/repository.ts';
import { db } from '../../db/index.ts';
import { coursePurchases, courses, dispense } from '../../db/schema.ts';
import { COURSE_SEED_CATALOG } from '../../db/seedData.ts';
import {
  buildBrandedDispensaHtml,
  dispensaPdfFilename,
} from '../../lib/dispensaBrandedHtml.ts';
import {
  isDispensaTranslateConfigured,
  translateDispensaMarkdown,
} from '../../lib/dispensaTranslate.ts';
import {
  isNinaDefaultLang,
  normalizeNinaLang,
} from '../../lib/ninaReplyLang.ts';
import { stripDispensaEmbedMarkers } from '../../lib/stripDispensaEmbeds.ts';
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

const MAGGIORI_SLUG = 'arcani-maggiori';
const MAGGIORI_MODULES = new Set(['01', '02', '03', '04']);

/** Local Area Riservata demo — DEV / ALLOW_DIRECT_UNLOCK only (mirrors chat). */
const DEMO_RESERVED_UID = 'demo-reserved-enn103';
const DEMO_RESERVED_TOKEN = 'demo-reserved-token';

export function isDevDemoReservedAuth(
  authorization: string | undefined
): boolean {
  if (!authorization || !authorization.startsWith('Bearer ')) return false;
  const token = authorization.slice('Bearer '.length).trim();
  if (token !== DEMO_RESERVED_TOKEN) return false;
  return (
    process.env.NODE_ENV !== 'production' ||
    process.env.ALLOW_DIRECT_UNLOCK === 'true'
  );
}

async function loadItalianMaggioriMarkdown(params: {
  moduleNumber: string;
  origin: string;
  fallbackMarkdown?: string;
}): Promise<string> {
  const nn = params.moduleNumber.padStart(2, '0');
  if (MAGGIORI_MODULES.has(nn)) {
    const url = `${params.origin.replace(/\/$/, '')}/dispense/arcani-maggiori/it/modulo-${nn}.md`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = (await res.text()).trim();
        if (text) return text;
      }
    } catch (error) {
      console.warn('Maggiori IT markdown fetch failed:', nn, error);
    }
  }
  const fallback = (params.fallbackMarkdown || '').trim();
  if (fallback) return stripDispensaEmbedMarkers(fallback);
  throw new Error('Dispensa non trovata.');
}

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

/**
 * GET /api/reserved/dispense/:dispensaId/pdf?lang=
 * Entitled users only. Returns branded printable HTML (client print → Save as PDF).
 * Lang from googtrans; IT skips Groq; other langs auto-translate from IT source.
 */
export async function getDispensaPdf(params: {
  user: ApiUser | null;
  dispensaId: number;
  lang?: string | null;
  origin: string;
  /** When true (dev demo token), skip purchase gate. */
  demoBypass?: boolean;
}): Promise<ApiResult> {
  try {
    const { dispensaId, origin } = params;
    if (!Number.isInteger(dispensaId) || dispensaId <= 0) {
      return json(400, { error: 'Identificativo dispensa non valido.' });
    }

    const rows = await db
      .select({
        id: dispense.id,
        courseId: dispense.courseId,
        moduleNumber: dispense.moduleNumber,
        title: dispense.title,
        subtitle: dispense.subtitle,
        contentMarkdown: dispense.contentMarkdown,
        courseSlug: courses.slug,
        courseTitle: courses.title,
      })
      .from(dispense)
      .innerJoin(courses, eq(courses.id, dispense.courseId))
      .where(eq(dispense.id, dispensaId))
      .limit(1);

    const row = rows[0];
    if (!row) {
      return json(404, { error: 'Dispensa non trovata.' });
    }

    if (!params.demoBypass) {
      const user = params.user;
      if (!user?.uid) {
        return json(401, { error: 'Autenticazione richiesta.' });
      }
      // Demo uid must not unlock production entitlements via a forged Firebase token.
      if (user.uid === DEMO_RESERVED_UID) {
        return json(403, {
          error: 'Acquisto richiesto per accedere a questa dispensa.',
        });
      }
      const dbUser = await getOrCreateUser(
        user.uid,
        user.email || '',
        user.name ?? null
      );
      const purchaseRows = await db
        .select({ id: coursePurchases.id })
        .from(coursePurchases)
        .where(
          and(
            eq(coursePurchases.userId, dbUser.id),
            eq(coursePurchases.courseId, row.courseId),
            eq(coursePurchases.status, 'active')
          )
        )
        .limit(1);
      if (!purchaseRows[0]) {
        return json(403, {
          error: 'Acquisto richiesto per accedere a questa dispensa.',
        });
      }
    }

    const lang = normalizeNinaLang(params.lang);
    if (!isNinaDefaultLang(lang) && !isDispensaTranslateConfigured()) {
      return json(503, {
        error:
          'Traduzione PDF non disponibile: manca TAROTITALIACHATGENERICAGROQ_API_KEY.',
        code: 'DISPENSA_PDF_TRANSLATE_UNAVAILABLE',
      });
    }

    // Prefer curated IT files for Maggiori; other courses use DB markdown.
    let italianMarkdown: string;
    if (row.courseSlug === MAGGIORI_SLUG) {
      italianMarkdown = await loadItalianMaggioriMarkdown({
        moduleNumber: row.moduleNumber,
        origin,
        fallbackMarkdown: row.contentMarkdown,
      });
    } else {
      italianMarkdown = stripDispensaEmbedMarkers(row.contentMarkdown);
    }

    let markdown = italianMarkdown;
    let outLang = 'it';
    let translated = false;
    try {
      const result = await translateDispensaMarkdown(italianMarkdown, lang);
      markdown = result.markdown;
      outLang = result.lang;
      translated = result.translated;
    } catch (error) {
      const code =
        error instanceof Error ? error.message : 'GROQ_CHAT_UPSTREAM';
      console.error('Dispensa PDF translate failed:', code);
      return json(503, {
        error: 'Traduzione della dispensa non riuscita. Riprova tra poco.',
        code: 'DISPENSA_PDF_TRANSLATE_FAILED',
        detail: code,
      });
    }

    const html = buildBrandedDispensaHtml({
      markdown,
      lang: outLang,
      moduleNumber: row.moduleNumber,
      title: row.title,
      subtitle: row.subtitle,
      courseTitle: row.courseTitle,
      origin,
      autoPrint: true,
    });

    return json(200, {
      html,
      lang: outLang,
      translated,
      filename: dispensaPdfFilename(row.moduleNumber, outLang),
      moduleNumber: row.moduleNumber,
      title: row.title,
      courseSlug: row.courseSlug,
    });
  } catch (error) {
    return mapSafeError(error, 'Impossibile generare il PDF della dispensa.', {
      notFound: 'non trovata',
      forbidden: 'Acquisto richiesto',
    });
  }
}

/** GET /api/reserved/notes — elenco appunti liberi (nessun corso richiesto). */
export async function getUserNotes(user: ApiUser): Promise<ApiResult> {
  try {
    if (!user.uid) {
      return json(401, { error: 'Autenticazione richiesta.' });
    }
    const notes = await listUserNotes({
      uid: user.uid,
      email: user.email || '',
      displayName: user.name ?? null,
    });
    return json(200, { notes });
  } catch (error) {
    return mapSafeError(error, 'Impossibile caricare gli appunti.');
  }
}

/** POST /api/reserved/notes */
export async function postUserNote(params: {
  user: ApiUser;
  body: Record<string, unknown>;
}): Promise<ApiResult> {
  try {
    const { user, body } = params;
    if (!user.uid) {
      return json(401, { error: 'Autenticazione richiesta.' });
    }
    const note = await createUserNote({
      uid: user.uid,
      email: user.email || '',
      displayName: user.name ?? null,
      title: typeof body.title === 'string' ? body.title : undefined,
      body: typeof body.body === 'string' ? body.body : undefined,
    });
    return json(201, { note });
  } catch (error) {
    return mapSafeError(error, 'Impossibile creare l’appunto.');
  }
}

/** PUT /api/reserved/notes/:noteId */
export async function putUserNote(params: {
  user: ApiUser;
  noteId: number;
  body: Record<string, unknown>;
}): Promise<ApiResult> {
  try {
    const { user, noteId, body } = params;
    if (!user.uid) {
      return json(401, { error: 'Autenticazione richiesta.' });
    }
    if (!Number.isInteger(noteId) || noteId <= 0) {
      return json(400, { error: 'Identificativo appunto non valido.' });
    }
    const note = await updateUserNote({
      uid: user.uid,
      email: user.email || '',
      noteId,
      title: typeof body.title === 'string' ? body.title : undefined,
      body: typeof body.body === 'string' ? body.body : undefined,
    });
    return json(200, { note });
  } catch (error) {
    return mapSafeError(error, 'Impossibile salvare l’appunto.', {
      notFound: 'non trovato',
    });
  }
}

/** DELETE /api/reserved/notes/:noteId */
export async function deleteUserNoteRoute(params: {
  user: ApiUser;
  noteId: number;
}): Promise<ApiResult> {
  try {
    const { user, noteId } = params;
    if (!user.uid) {
      return json(401, { error: 'Autenticazione richiesta.' });
    }
    if (!Number.isInteger(noteId) || noteId <= 0) {
      return json(400, { error: 'Identificativo appunto non valido.' });
    }
    const result = await deleteUserNote({
      uid: user.uid,
      email: user.email || '',
      noteId,
    });
    return json(200, result);
  } catch (error) {
    return mapSafeError(error, 'Impossibile eliminare l’appunto.', {
      notFound: 'non trovato',
    });
  }
}
