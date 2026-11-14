import { and, asc, desc, eq, inArray } from 'drizzle-orm';
import { db } from './index.ts';
import {
  consultationBookings,
  coursePurchases,
  courses,
  dispensaProgress,
  dispense,
  users,
} from './schema.ts';
import { COURSE_SEED_CATALOG } from './seedData.ts';

let seedPromise: Promise<void> | null = null;

/**
 * Popola in modo idempotente il catalogo dei 3 corsi e le rispettive 12 dispense.
 * Viene invocato on-demand alla prima richiesta API (mai come probe allo startup).
 */
export async function ensureCatalogSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      try {
        for (const item of COURSE_SEED_CATALOG) {
          const inserted = await db
            .insert(courses)
            .values({
              slug: item.slug,
              title: item.title,
              subtitle: item.subtitle,
              description: item.description,
              priceEur: item.priceEur,
              stripePriceId: item.stripePriceId,
              lessonsCount: item.lessonsCount,
              totalHours: item.totalHours,
              levelLabel: item.levelLabel,
              sortOrder: item.sortOrder,
              isPublished: true,
            })
            .onConflictDoUpdate({
              target: courses.slug,
              set: {
                title: item.title,
                subtitle: item.subtitle,
                description: item.description,
                priceEur: item.priceEur,
                stripePriceId: item.stripePriceId,
                lessonsCount: item.lessonsCount,
                totalHours: item.totalHours,
                levelLabel: item.levelLabel,
                sortOrder: item.sortOrder,
              },
            })
            .returning();

          const courseRow = inserted[0];
          if (!courseRow) continue;

          for (let i = 0; i < item.dispense.length; i++) {
            const d = item.dispense[i];
            await db
              .insert(dispense)
              .values({
                courseId: courseRow.id,
                moduleNumber: d.moduleNumber,
                title: d.title,
                subtitle: d.subtitle,
                format: d.format,
                readingMinutes: d.readingMinutes,
                contentMarkdown: d.contentMarkdown,
                keyTakeaways: JSON.stringify(d.keyTakeaways),
                sortOrder: i + 1,
              })
              .onConflictDoUpdate({
                target: [dispense.courseId, dispense.moduleNumber],
                set: {
                  title: d.title,
                  subtitle: d.subtitle,
                  format: d.format,
                  readingMinutes: d.readingMinutes,
                  contentMarkdown: d.contentMarkdown,
                  keyTakeaways: JSON.stringify(d.keyTakeaways),
                  sortOrder: i + 1,
                },
              });
          }
        }
      } catch (error) {
        seedPromise = null;
        console.error('Catalog seeding failed:', error);
        throw new Error('Impossibile inizializzare il catalogo corsi e dispense.', {
          cause: error,
        });
      }
    })();
  }
  return seedPromise;
}

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
    console.error('Failed to upsert user:', error);
    throw new Error('Errore durante la sincronizzazione del profilo utente.', {
      cause: error,
    });
  }
}

export async function getPublicCourseCatalog() {
  await ensureCatalogSeeded();
  try {
    const courseRows = await db
      .select()
      .from(courses)
      .where(eq(courses.isPublished, true))
      .orderBy(asc(courses.sortOrder));

    const dispensaRows = await db
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

    return courseRows.map((course) => ({
      ...course,
      dispenseOutline: dispensaRows.filter((d) => d.courseId === course.id),
    }));
  } catch (error) {
    console.error('Failed to load public courses:', error);
    throw new Error('Impossibile caricare il catalogo dei percorsi formativi.', {
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
    };
  } catch (error) {
    console.error('Failed to load reserved area overview:', error);
    throw new Error('Impossibile recuperare i dati dell’Area Riservata.', {
      cause: error,
    });
  }
}

export async function enrollUserInCourse(params: {
  uid: string;
  email: string;
  displayName?: string | null;
  courseSlug: string;
  customerName: string;
  customerPhone?: string;
  stripeSessionId?: string;
}) {
  await ensureCatalogSeeded();
  try {
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

    const courseRows = await db
      .select()
      .from(courses)
      .where(eq(courses.slug, params.courseSlug))
      .limit(1);

    const targetCourse = courseRows[0];
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
        stripeSessionId:
          params.stripeSessionId ||
          `cs_reserved_${targetCourse.slug}_${Date.now()}`,
        amountPaidEur: targetCourse.priceEur,
        customerName: params.customerName,
        customerPhone: params.customerPhone ?? null,
      })
      .onConflictDoUpdate({
        target: [coursePurchases.userId, coursePurchases.courseId],
        set: {
          status: 'active',
          customerName: params.customerName,
          ...(params.customerPhone ? { customerPhone: params.customerPhone } : {}),
        },
      })
      .returning();

    return {
      purchase: purchaseResult[0],
      course: targetCourse,
    };
  } catch (error) {
    console.error('Failed to enroll user in course:', error);
    throw new Error(
      error instanceof Error && error.message === 'Percorso didattico non trovato.'
        ? error.message
        : 'Errore durante la registrazione dell’acquisto del percorso.',
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

export async function createConsultationBooking(params: {
  uid?: string | null;
  authEmail?: string | null;
  tariffId: '45m' | '60m' | '90m';
  durationMinutes: number;
  priceEur: number;
  scheduledDate: string;
  scheduledTime: string;
  fullName: string;
  email: string;
  phoneWhatsApp: string;
  sessionIntent: string;
  deontologyAccepted: boolean;
}) {
  try {
    let dbUserId: number | null = null;
    if (params.uid) {
      const dbUser = await getOrCreateUser(
        params.uid,
        params.authEmail || params.email,
        params.fullName
      );
      dbUserId = dbUser.id;
    }

    const result = await db
      .insert(consultationBookings)
      .values({
        userId: dbUserId,
        tariffId: params.tariffId,
        durationMinutes: params.durationMinutes,
        priceEur: params.priceEur,
        scheduledDate: params.scheduledDate,
        scheduledTime: params.scheduledTime,
        fullName: params.fullName,
        email: params.email,
        phoneWhatsapp: params.phoneWhatsApp,
        sessionIntent: params.sessionIntent,
        deontologyAccepted: params.deontologyAccepted,
        status: 'confirmed',
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Failed to create booking:', error);
    throw new Error('Impossibile registrare la prenotazione.', { cause: error });
  }
}
