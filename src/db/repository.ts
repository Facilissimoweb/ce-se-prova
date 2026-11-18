import { and, asc, desc, eq, gte, inArray, lte, ne, or } from 'drizzle-orm';
import { db, isDbConnectionFailure, resetDbPool } from './index.ts';
import {
  consultationBookings,
  coursePurchases,
  courses,
  dialoguePurchases,
  dialogueSessions,
  dispensaProgress,
  dispense,
  users,
} from './schema.ts';
import type {
  DialogueAccessMode,
  DialogueAccessStatus,
  DialoguePackId,
} from '../types/handoff.ts';
export {
  ensureCatalogSeeded,
  getPublicCourseCatalog,
} from './courseCatalog.ts';
import { resolveBookingTariff } from '../lib/paymentCatalog.ts';
import {
  resolveBookingMode,
  type BookingMode,
} from '../lib/bookingRules.ts';
import { occupiedKey, type OccupiedSlot } from '../lib/bookingSlots.ts';
import { fulfillConfirmedBooking } from '../lib/bookingFulfillment.ts';
import { fetchGoogleBusySlotKeys } from '../lib/googleCalendar.ts';
import { ensureCatalogSeeded } from './courseCatalog.ts';

export async function getOrCreateUser(
  uid: string,
  email: string,
  displayName?: string | null
) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName ?? null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(displayName ? { displayName } : {}),
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    if (isDbConnectionFailure(error)) {
      // Spotty Vercel↔Supabase connects: drop the poisoned pool so the next
      // warm request can reconnect (reserved overview soft-fails to seed).
      resetDbPool();
      console.error('Failed to upsert user (DB connect timeout/unreachable):', error);
    } else {
      console.error('Failed to upsert user:', error);
    }
    throw new Error('Errore durante la sincronizzazione del profilo utente.', {
      cause: error,
    });
  }
}

export async function getReservedAreaOverview(
  uid: string,
  email: string,
  displayName?: string | null
) {
  await ensureCatalogSeeded();
  try {
    const dbUser = await getOrCreateUser(uid, email, displayName);

    const allCourses = await db
      .select()
      .from(courses)
      .where(eq(courses.isPublished, true))
      .orderBy(asc(courses.sortOrder));

    const userPurchases = await db
      .select()
      .from(coursePurchases)
      .where(
        and(
          eq(coursePurchases.userId, dbUser.id),
          eq(coursePurchases.status, 'active')
        )
      );

    const unlockedCourseIds = userPurchases.map((p) => p.courseId);

    const allOutlineDispense = await db
      .select({
        id: dispense.id,
        courseId: dispense.courseId,
        moduleNumber: dispense.moduleNumber,
        title: dispense.title,
        subtitle: dispense.subtitle,
        format: dispense.format,
        readingMinutes: dispense.readingMinutes,
        sortOrder: dispense.sortOrder,
      })
      .from(dispense)
      .orderBy(asc(dispense.sortOrder));

    const unlockedDispenseRows =
      unlockedCourseIds.length > 0
        ? await db
            .select()
            .from(dispense)
            .where(inArray(dispense.courseId, unlockedCourseIds))
            .orderBy(asc(dispense.sortOrder))
        : [];

    const progressRows =
      unlockedDispenseRows.length > 0
        ? await db
            .select()
            .from(dispensaProgress)
            .where(eq(dispensaProgress.userId, dbUser.id))
        : [];

    const progressByDispensaId = new Map(
      progressRows.map((row) => [row.dispensaId, row])
    );

    const userBookings = await db
      .select()
      .from(consultationBookings)
      .where(eq(consultationBookings.userId, dbUser.id))
      .orderBy(desc(consultationBookings.createdAt));

    const userDialoguePasses = await db
      .select()
      .from(dialoguePurchases)
      .where(eq(dialoguePurchases.userId, dbUser.id))
      .orderBy(desc(dialoguePurchases.createdAt));

    return {
      user: {
        id: dbUser.id,
        uid: dbUser.uid,
        email: dbUser.email,
        displayName: dbUser.displayName,
        phoneWhatsapp: dbUser.phoneWhatsapp,
      },
      courses: allCourses.map((course) => {
        const purchase = userPurchases.find((p) => p.courseId === course.id);
        const isUnlocked = Boolean(purchase);
        const outline = allOutlineDispense.filter((d) => d.courseId === course.id);
        const fullDispense = unlockedDispenseRows
          .filter((d) => d.courseId === course.id)
          .map((d) => {
            const prog = progressByDispensaId.get(d.id);
            let parsedTakeaways: string[] = [];
            try {
              parsedTakeaways = JSON.parse(d.keyTakeaways) as string[];
            } catch {
              parsedTakeaways = [];
            }
            return {
              ...d,
              keyTakeaways: parsedTakeaways,
              completed: prog?.completed ?? false,
              personalNotes: prog?.personalNotes ?? '',
            };
          });

        return {
          ...course,
          isUnlocked,
          purchasedAt: purchase?.purchasedAt ?? null,
          amountPaidEur: purchase?.amountPaidEur ?? null,
          dispenseCount: outline.length,
          dispenseOutline: outline,
          unlockedDispense: fullDispense,
        };
      }),
      bookings: userBookings,
      dialoguePasses: userDialoguePasses.map((p) => ({
        id: p.id,
        packId: p.packId as DialoguePackId,
        durationMinutes: p.durationMinutes,
        priceEur: p.priceEur,
        expiresAt: p.expiresAt.toISOString(),
        createdAt: p.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error('Failed to load reserved area overview:', error);
    throw new Error('Impossibile recuperare i dati dell’Area Riservata.', {
      cause: error,
    });
  }
}

export async function findCourseBySlug(courseSlug: string) {
  await ensureCatalogSeeded();
  const courseRows = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, courseSlug))
    .limit(1);
  return courseRows[0] ?? null;
}

export async function findCoursePurchaseByStripeSession(stripeSessionId: string) {
  const rows = await db
    .select()
    .from(coursePurchases)
    .where(eq(coursePurchases.stripeSessionId, stripeSessionId))
    .limit(1);
  return rows[0] ?? null;
}

/**
 * Attiva un acquisto corso solo con stripeSessionId già verificato come paid
 * (webhook / confirm-session) oppure con id esplicito di bypass non-prod (`cs_dev_…`).
 * Non inventa mai `cs_reserved_…` per sblocchi reali.
 */
export async function enrollUserInCourse(params: {
  uid: string;
  email: string;
  displayName?: string | null;
  courseSlug: string;
  customerName: string;
  customerPhone?: string;
  stripeSessionId: string;
}) {
  await ensureCatalogSeeded();
  try {
    const stripeSessionId = params.stripeSessionId.trim();
    if (!stripeSessionId) {
      throw new Error('Pagamento Stripe richiesto per attivare il percorso.');
    }

    const existingBySession =
      await findCoursePurchaseByStripeSession(stripeSessionId);
    if (existingBySession && existingBySession.status === 'active') {
      const courseRows = await db
        .select()
        .from(courses)
        .where(eq(courses.id, existingBySession.courseId))
        .limit(1);
      return {
        purchase: existingBySession,
        course: courseRows[0] ?? null,
        alreadyActive: true as const,
      };
    }

    const dbUser = await getOrCreateUser(
      params.uid,
      params.email,
      params.displayName || params.customerName
    );

    if (params.customerPhone) {
      await db
        .update(users)
        .set({
          phoneWhatsapp: params.customerPhone,
          displayName: params.customerName || dbUser.displayName,
          updatedAt: new Date(),
        })
        .where(eq(users.id, dbUser.id));
    }

    const targetCourse = await findCourseBySlug(params.courseSlug);
    if (!targetCourse) {
      throw new Error('Percorso didattico non trovato.');
    }

    const purchaseResult = await db
      .insert(coursePurchases)
      .values({
        userId: dbUser.id,
        courseId: targetCourse.id,
        status: 'active',
        paymentProvider: 'stripe_checkout',
        stripeSessionId,
        amountPaidEur: targetCourse.priceEur,
        customerName: params.customerName,
        customerPhone: params.customerPhone ?? null,
      })
      .onConflictDoUpdate({
        target: [coursePurchases.userId, coursePurchases.courseId],
        set: {
          status: 'active',
          stripeSessionId,
          paymentProvider: 'stripe_checkout',
          amountPaidEur: targetCourse.priceEur,
          customerName: params.customerName,
          purchasedAt: new Date(),
          ...(params.customerPhone ? { customerPhone: params.customerPhone } : {}),
        },
      })
      .returning();

    return {
      purchase: purchaseResult[0],
      course: targetCourse,
      alreadyActive: false as const,
    };
  } catch (error) {
    console.error('Failed to enroll user in course:', error);
    if (
      error instanceof Error &&
      (error.message === 'Percorso didattico non trovato.' ||
        error.message === 'Pagamento Stripe richiesto per attivare il percorso.')
    ) {
      throw error;
    }
    throw new Error(
      'Errore durante la registrazione dell’acquisto del percorso.',
      { cause: error }
    );
  }
}

export async function updateDispensaProgress(params: {
  uid: string;
  email: string;
  dispensaId: number;
  completed?: boolean;
  personalNotes?: string;
}) {
  await ensureCatalogSeeded();
  try {
    const dbUser = await getOrCreateUser(params.uid, params.email);

    const dispensaRows = await db
      .select()
      .from(dispense)
      .where(eq(dispense.id, params.dispensaId))
      .limit(1);

    const targetDispensa = dispensaRows[0];
    if (!targetDispensa) {
      throw new Error('Dispensa non trovata.');
    }

    // Verifica possesso attivo del corso collegato
    const purchaseRows = await db
      .select()
      .from(coursePurchases)
      .where(
        and(
          eq(coursePurchases.userId, dbUser.id),
          eq(coursePurchases.courseId, targetDispensa.courseId),
          eq(coursePurchases.status, 'active')
        )
      )
      .limit(1);

    if (!purchaseRows[0]) {
      throw new Error('Acquisto richiesto per accedere a questa dispensa.');
    }

    const existingRows = await db
      .select()
      .from(dispensaProgress)
      .where(
        and(
          eq(dispensaProgress.userId, dbUser.id),
          eq(dispensaProgress.dispensaId, targetDispensa.id)
        )
      )
      .limit(1);

    const existing = existingRows[0];
    const nextCompleted =
      typeof params.completed === 'boolean'
        ? params.completed
        : (existing?.completed ?? false);
    const nextNotes =
      typeof params.personalNotes === 'string'
        ? params.personalNotes
        : (existing?.personalNotes ?? '');

    const saved = await db
      .insert(dispensaProgress)
      .values({
        userId: dbUser.id,
        dispensaId: targetDispensa.id,
        completed: nextCompleted,
        personalNotes: nextNotes,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [dispensaProgress.userId, dispensaProgress.dispensaId],
        set: {
          completed: nextCompleted,
          personalNotes: nextNotes,
          updatedAt: new Date(),
        },
      })
      .returning();

    return saved[0];
  } catch (error) {
    console.error('Failed to update dispensa progress:', error);
    if (
      error instanceof Error &&
      (error.message === 'Dispensa non trovata.' ||
        error.message === 'Acquisto richiesto per accedere a questa dispensa.')
    ) {
      throw error;
    }
    throw new Error('Errore durante il salvataggio degli appunti di studio.', {
      cause: error,
    });
  }
}

export type { OccupiedSlot };

export async function listOccupiedSlots(
  fromIso: string,
  toIso: string
): Promise<OccupiedSlot[]> {
  try {
    const rows = await db
      .select({
        scheduledDate: consultationBookings.scheduledDate,
        scheduledTime: consultationBookings.scheduledTime,
      })
      .from(consultationBookings)
      .where(
        and(
          gte(consultationBookings.scheduledDate, fromIso),
          lte(consultationBookings.scheduledDate, toIso),
          inArray(consultationBookings.status, [
            'pending_payment',
            'confirmed',
          ])
        )
      );

    const fromDb = rows.map((row) => ({
      dateIso: row.scheduledDate,
      slot: row.scheduledTime,
    }));

    let fromCalendar: OccupiedSlot[] = [];
    try {
      const busyKeys = await fetchGoogleBusySlotKeys(fromIso, toIso);
      fromCalendar = busyKeys.map((key) => {
        const [dateIso, slot] = key.split('|');
        return { dateIso, slot };
      });
    } catch (error) {
      console.error('Google FreeBusy merge skipped:', error);
    }

    const seen = new Set<string>();
    const merged: OccupiedSlot[] = [];
    for (const item of [...fromDb, ...fromCalendar]) {
      const key = occupiedKey(item.dateIso, item.slot);
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(item);
    }
    return merged;
  } catch (error) {
    console.error('Failed to list occupied slots:', error);
    throw new Error('Impossibile caricare la disponibilità.', { cause: error });
  }
}

export async function isSlotTaken(
  scheduledDate: string,
  scheduledTime: string,
  excludeBookingId?: number
): Promise<boolean> {
  const conditions = [
    eq(consultationBookings.scheduledDate, scheduledDate),
    eq(consultationBookings.scheduledTime, scheduledTime),
    inArray(consultationBookings.status, ['pending_payment', 'confirmed']),
  ];
  if (excludeBookingId != null) {
    conditions.push(ne(consultationBookings.id, excludeBookingId));
  }
  const rows = await db
    .select({ id: consultationBookings.id })
    .from(consultationBookings)
    .where(and(...conditions))
    .limit(1);
  return rows.length > 0;
}

export async function createConsultationBooking(params: {
  uid?: string | null;
  authEmail?: string | null;
  tariffId: '20m' | '45m' | '60m' | '90m';
  scheduledDate: string;
  scheduledTime: string;
  fullName: string;
  email: string;
  phoneWhatsApp: string;
  sessionIntent: string;
  deontologyAccepted: boolean;
  mode?: BookingMode | string;
  status?: 'pending_payment' | 'confirmed';
  stripeSessionId?: string | null;
}) {
  try {
    const tariff = resolveBookingTariff(params.tariffId);
    if (!tariff) {
      throw new Error('Tariffa consulto non valida.');
    }

    if (await isSlotTaken(params.scheduledDate, params.scheduledTime)) {
      throw new Error('SLOT_TAKEN');
    }

    let dbUserId: number | null = null;
    if (params.uid) {
      const dbUser = await getOrCreateUser(
        params.uid,
        params.authEmail || params.email,
        params.fullName
      );
      dbUserId = dbUser.id;
    }

    const mode = resolveBookingMode(
      params.mode || 'remote',
      params.scheduledTime
    );
    const status = params.status || 'pending_payment';

    const result = await db
      .insert(consultationBookings)
      .values({
        userId: dbUserId,
        tariffId: tariff.id,
        durationMinutes: tariff.durationMinutes,
        priceEur: tariff.priceEur,
        scheduledDate: params.scheduledDate,
        scheduledTime: params.scheduledTime,
        fullName: params.fullName,
        email: params.email,
        phoneWhatsapp: params.phoneWhatsApp,
        sessionIntent: params.sessionIntent,
        deontologyAccepted: params.deontologyAccepted,
        mode,
        status,
        stripeSessionId: params.stripeSessionId ?? null,
        paidAt: status === 'confirmed' ? new Date() : null,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Failed to create booking:', error);
    if (
      error instanceof Error &&
      (error.message === 'Tariffa consulto non valida.' ||
        error.message === 'SLOT_TAKEN')
    ) {
      throw error;
    }
    const pgCode =
      error && typeof error === 'object' && 'code' in error
        ? String((error as { code?: string }).code)
        : '';
    if (pgCode === '23505') {
      throw new Error('SLOT_TAKEN');
    }
    throw new Error('Impossibile registrare la prenotazione.', { cause: error });
  }
}

export async function attachStripeSessionToBooking(
  bookingId: number,
  stripeSessionId: string
) {
  const result = await db
    .update(consultationBookings)
    .set({
      stripeSessionId,
      updatedAt: new Date(),
    })
    .where(eq(consultationBookings.id, bookingId))
    .returning();
  return result[0] ?? null;
}

export async function cancelPendingBooking(bookingId: number) {
  const result = await db
    .update(consultationBookings)
    .set({ status: 'cancelled', updatedAt: new Date() })
    .where(
      and(
        eq(consultationBookings.id, bookingId),
        eq(consultationBookings.status, 'pending_payment')
      )
    )
    .returning();
  return result[0] ?? null;
}

export async function getBookingById(bookingId: number) {
  const rows = await db
    .select()
    .from(consultationBookings)
    .where(eq(consultationBookings.id, bookingId))
    .limit(1);
  return rows[0] ?? null;
}

export async function getBookingByStripeSessionId(stripeSessionId: string) {
  const rows = await db
    .select()
    .from(consultationBookings)
    .where(eq(consultationBookings.stripeSessionId, stripeSessionId))
    .limit(1);
  return rows[0] ?? null;
}

/**
 * Conferma prenotazione dopo pagamento Stripe (o unlock diretto).
 * Idempotente se già `confirmed`. Trigger Zoho mail + Google Calendar.
 */
export async function confirmConsultationBooking(params: {
  bookingId?: number;
  stripeSessionId?: string;
  transactionId?: string | null;
  amountCents?: number | null;
  customerEmail?: string | null;
}) {
  let booking =
    params.stripeSessionId != null
      ? await getBookingByStripeSessionId(params.stripeSessionId)
      : null;
  if (!booking && params.bookingId != null) {
    booking = await getBookingById(params.bookingId);
  }
  if (!booking) {
    throw new Error('Prenotazione non trovata.');
  }

  if (booking.status === 'confirmed') {
    return { booking, fulfilled: false as const };
  }

  if (booking.status === 'cancelled' && !params.stripeSessionId) {
    throw new Error('Prenotazione annullata.');
  }

  const updated = await db
    .update(consultationBookings)
    .set({
      status: 'confirmed',
      stripeSessionId: params.stripeSessionId || booking.stripeSessionId,
      stripePaymentIntentId:
        params.transactionId || booking.stripePaymentIntentId,
      paidAt: new Date(),
      updatedAt: new Date(),
      mode: resolveBookingMode(booking.mode || 'remote', booking.scheduledTime),
    })
    .where(
      and(
        eq(consultationBookings.id, booking.id),
        or(
          eq(consultationBookings.status, 'pending_payment'),
          eq(consultationBookings.status, 'cancelled')
        )
      )
    )
    .returning();

  const confirmed = updated[0];
  if (!confirmed) {
    const again = await getBookingById(booking.id);
    if (again?.status === 'confirmed') {
      return { booking: again, fulfilled: false as const };
    }
    throw new Error('Impossibile confermare la prenotazione.');
  }

  const { calendarEventId } = await fulfillConfirmedBooking(confirmed, {
    customerEmail: params.customerEmail || confirmed.email,
    transactionId:
      params.transactionId ||
      params.stripeSessionId ||
      confirmed.stripeSessionId ||
      String(confirmed.id),
    amountCents: params.amountCents,
  });

  if (calendarEventId) {
    const withEvent = await db
      .update(consultationBookings)
      .set({
        googleCalendarEventId: calendarEventId,
        updatedAt: new Date(),
      })
      .where(eq(consultationBookings.id, confirmed.id))
      .returning();
    return { booking: withEvent[0] ?? confirmed, fulfilled: true as const };
  }

  return { booking: confirmed, fulfilled: true as const };
}

export const FREE_TRIAL_SECONDS = 300; // 5 minuti gratuiti

export const DIALOGUE_PACK_CATALOG: Record<
  DialoguePackId,
  {
    id: DialoguePackId;
    title: string;
    durationMinutes: number;
    priceEur: number;
    stripePriceId: string;
  }
> = {
  '5m': {
    id: '5m',
    title: 'Pass Rapido · 5 Minuti',
    durationMinutes: 5,
    priceEur: 3,
    stripePriceId: process.env.STRIPE_PRICE_ID_DIALOGO_5M || 'STRIPE_PRICE_ID_DIALOGO_5M',
  },
  '10m': {
    id: '10m',
    title: 'Pass Luce · 10 Minuti',
    durationMinutes: 10,
    priceEur: 5,
    stripePriceId: process.env.STRIPE_PRICE_ID_DIALOGO_10M || 'STRIPE_PRICE_ID_DIALOGO_10M',
  },
  '15m': {
    id: '15m',
    title: 'Pass Cosmos · 15 Minuti',
    durationMinutes: 15,
    priceEur: 7,
    stripePriceId: process.env.STRIPE_PRICE_ID_DIALOGO_15M || 'STRIPE_PRICE_ID_DIALOGO_15M',
  },
};

function computeDialogueStatus(
  row: typeof dialogueSessions.$inferSelect,
  now: Date
): DialogueAccessStatus {
  const nowMs = now.getTime();
  const paidExpiryMs = row.activePassExpiresAt
    ? row.activePassExpiresAt.getTime()
    : 0;
  const freeExpiryMs = row.freeTrialExpiresAt
    ? row.freeTrialExpiresAt.getTime()
    : 0;

  let mode: DialogueAccessMode = 'ready';
  let remainingSeconds = FREE_TRIAL_SECONDS;
  let expiresAtIso: string | null = null;

  if (paidExpiryMs > nowMs) {
    mode = 'paid_pass';
    remainingSeconds = Math.max(0, Math.ceil((paidExpiryMs - nowMs) / 1000));
    expiresAtIso = row.activePassExpiresAt!.toISOString();
  } else if (row.freeTrialStartedAt && row.freeTrialExpiresAt) {
    if (freeExpiryMs > nowMs) {
      mode = 'free_trial';
      remainingSeconds = Math.max(0, Math.ceil((freeExpiryMs - nowMs) / 1000));
      expiresAtIso = row.freeTrialExpiresAt.toISOString();
    } else {
      mode = 'expired';
      remainingSeconds = 0;
      expiresAtIso = row.freeTrialExpiresAt.toISOString();
    }
  }

  return {
    sessionKey: row.sessionKey,
    mode,
    remainingSeconds,
    freeTrialSecondsTotal: FREE_TRIAL_SECONDS,
    freeTrialUsed: Boolean(row.freeTrialStartedAt),
    activePackId:
      mode === 'paid_pass' ? ((row.activePackId as DialoguePackId) ?? null) : null,
    expiresAtIso,
    interactionsCount: row.interactionsCount,
    serverTimeIso: now.toISOString(),
  };
}

async function resolveOrCreateDialogueSession(params: {
  sessionKey: string;
  uid?: string | null;
  authEmail?: string | null;
  authName?: string | null;
}) {
  let dbUserId: number | null = null;
  if (params.uid) {
    const dbUser = await getOrCreateUser(
      params.uid,
      params.authEmail || '',
      params.authName ?? null
    );
    dbUserId = dbUser.id;
  }

  // Se l'utente è autenticato, controlla prima se ha già una sessione legata al profilo
  if (dbUserId) {
    const userSessionRows = await db
      .select()
      .from(dialogueSessions)
      .where(eq(dialogueSessions.userId, dbUserId))
      .orderBy(desc(dialogueSessions.updatedAt))
      .limit(1);

    if (userSessionRows[0]) {
      return { session: userSessionRows[0], dbUserId };
    }
  }

  // Altrimenti cerca per sessionKey del browser
  const existingByKey = await db
    .select()
    .from(dialogueSessions)
    .where(eq(dialogueSessions.sessionKey, params.sessionKey))
    .limit(1);

  if (existingByKey[0]) {
    if (dbUserId && !existingByKey[0].userId) {
      const updated = await db
        .update(dialogueSessions)
        .set({ userId: dbUserId, updatedAt: new Date() })
        .where(eq(dialogueSessions.id, existingByKey[0].id))
        .returning();
      return { session: updated[0], dbUserId };
    }
    return { session: existingByKey[0], dbUserId };
  }

  const created = await db
    .insert(dialogueSessions)
    .values({
      sessionKey: params.sessionKey,
      userId: dbUserId,
      interactionsCount: 0,
    })
    .returning();

  return { session: created[0], dbUserId };
}

export async function getDialogueAccessStatus(params: {
  sessionKey: string;
  uid?: string | null;
  authEmail?: string | null;
  authName?: string | null;
}): Promise<DialogueAccessStatus> {
  const { session } = await resolveOrCreateDialogueSession(params);
  return computeDialogueStatus(session, new Date());
}

export async function recordDialogueInteraction(params: {
  sessionKey: string;
  uid?: string | null;
  authEmail?: string | null;
  authName?: string | null;
}): Promise<{ allowed: boolean; status: DialogueAccessStatus }> {
  const { session } = await resolveOrCreateDialogueSession(params);
  const now = new Date();
  const current = computeDialogueStatus(session, now);

  if (current.mode === 'expired') {
    return { allowed: false, status: current };
  }

  if (current.mode === 'ready') {
    const trialExpires = new Date(now.getTime() + FREE_TRIAL_SECONDS * 1000);
    const updatedRows = await db
      .update(dialogueSessions)
      .set({
        freeTrialStartedAt: now,
        freeTrialExpiresAt: trialExpires,
        interactionsCount: session.interactionsCount + 1,
        updatedAt: now,
      })
      .where(eq(dialogueSessions.id, session.id))
      .returning();

    const updated = updatedRows[0] ?? session;
    return {
      allowed: true,
      status: computeDialogueStatus(updated, now),
    };
  }

  const updatedRows = await db
    .update(dialogueSessions)
    .set({
      interactionsCount: session.interactionsCount + 1,
      updatedAt: now,
    })
    .where(eq(dialogueSessions.id, session.id))
    .returning();

  const updated = updatedRows[0] ?? session;
  return {
    allowed: true,
    status: computeDialogueStatus(updated, now),
  };
}

/**
 * Sblocca un pass dialogo. `stripeSessionId` obbligatorio: sessione Stripe paid
 * oppure id esplicito di bypass non-prod (`cs_dev_…`). Non inventa sessioni fittizie.
 */
export async function unlockDialogueTimePack(params: {
  sessionKey: string;
  packId: DialoguePackId;
  customerName: string;
  customerEmail: string;
  stripeSessionId: string;
  uid?: string | null;
  authEmail?: string | null;
  authName?: string | null;
}): Promise<{
  status: DialogueAccessStatus;
  purchase: typeof dialoguePurchases.$inferSelect;
}> {
  const pack = DIALOGUE_PACK_CATALOG[params.packId];
  if (!pack) {
    throw new Error('Pacchetto temporale non valido.');
  }

  const stripeSessionId = params.stripeSessionId.trim();
  if (!stripeSessionId) {
    throw new Error('Pagamento Stripe richiesto per attivare il pass.');
  }

  const { session, dbUserId } = await resolveOrCreateDialogueSession({
    sessionKey: params.sessionKey,
    uid: params.uid,
    authEmail: params.authEmail,
    authName: params.authName || params.customerName,
  });

  const existingPurchase = await db
    .select()
    .from(dialoguePurchases)
    .where(eq(dialoguePurchases.stripeSessionId, stripeSessionId))
    .limit(1);

  if (existingPurchase[0]) {
    // Idempotent: refresh session expiry from stored purchase if needed
    const now = new Date();
    if (
      existingPurchase[0].expiresAt.getTime() > now.getTime() &&
      (!session.activePassExpiresAt ||
        session.activePassExpiresAt.getTime() < existingPurchase[0].expiresAt.getTime())
    ) {
      const refreshed = await db
        .update(dialogueSessions)
        .set({
          activePassExpiresAt: existingPurchase[0].expiresAt,
          activePackId: existingPurchase[0].packId,
          updatedAt: now,
        })
        .where(eq(dialogueSessions.id, session.id))
        .returning();
      return {
        status: computeDialogueStatus(refreshed[0] ?? session, now),
        purchase: existingPurchase[0],
      };
    }
    return {
      status: computeDialogueStatus(session, new Date()),
      purchase: existingPurchase[0],
    };
  }

  const now = new Date();
  const baseMs =
    session.activePassExpiresAt && session.activePassExpiresAt.getTime() > now.getTime()
      ? session.activePassExpiresAt.getTime()
      : now.getTime();
  const newExpiresAt = new Date(baseMs + pack.durationMinutes * 60 * 1000);

  const updatedSessionRows = await db
    .update(dialogueSessions)
    .set({
      activePassExpiresAt: newExpiresAt,
      activePackId: pack.id,
      updatedAt: now,
    })
    .where(eq(dialogueSessions.id, session.id))
    .returning();

  const purchaseRows = await db
    .insert(dialoguePurchases)
    .values({
      dialogueSessionId: session.id,
      userId: dbUserId,
      packId: pack.id,
      durationMinutes: pack.durationMinutes,
      priceEur: pack.priceEur,
      stripePriceId: pack.stripePriceId,
      stripeSessionId,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      expiresAt: newExpiresAt,
    })
    .returning();

  const updatedSession = updatedSessionRows[0] ?? session;
  return {
    status: computeDialogueStatus(updatedSession, now),
    purchase: purchaseRows[0],
  };
}
