/**
 * Lightweight public catalog access — no booking/firebase/mail imports.
 * Used by /api/courses so the Vercel function stays small and cold-start safe.
 */
import { asc, eq } from 'drizzle-orm';
import { db } from './index.ts';
import { courses, dispense } from './schema.ts';
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
