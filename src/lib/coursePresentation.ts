import type { CourseId, EducationalCourse } from '../types/handoff';

/**
 * ENN-174 / ENN-175 — Maggiori-only launch presentation.
 * Single source for `publicPresented: false` slugs. Kept as a tiny map so
 * server/API bundles do not import `siteContent`.
 * When un-hiding a course, remove it here and drop the flag on
 * `educationalCourses` (or set true).
 */
export const COURSE_PUBLIC_PRESENTED: Partial<Record<CourseId, boolean>> = {
  'arcani-minori': false,
  'metodi-stesura': false,
};

export function isCoursePubliclyPresented(
  course: Pick<EducationalCourse, 'publicPresented'>
): boolean {
  return course.publicPresented !== false;
}

/** Match reserved/API course rows (slug) to the presentation map. */
export function isCourseSlugPubliclyPresented(slug: string): boolean {
  const flagged = COURSE_PUBLIC_PRESENTED[slug as CourseId];
  return flagged !== false;
}

export function filterPublicPresentedBySlug<T extends { slug: string }>(
  courses: T[]
): T[] {
  return courses.filter((c) => isCourseSlugPubliclyPresented(c.slug));
}
