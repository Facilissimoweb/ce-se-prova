/**
 * Owner complimentary Maggiori access (ENN-240).
 *
 * Public Maggiori purchase may be held (ENN-239), but Maria must keep free
 * full access when signed in as the owner Google account: Area Riservata,
 * dispense, gated blog, Nina Studio — no Stripe paywall.
 *
 * Allowlist matches Coming Soon / owner debug (mariateresarogani@gmail.com).
 * Server may add COMING_SOON_OWNER_EMAILS extras.
 */

import { MAGGIORI_PURCHASE_COURSE_SLUG } from './maggioriPurchaseMode';

/** Hardcoded owner emails — keep in sync with Coming Soon / ownerDebugUi. */
export const OWNER_COURSE_ACCESS_EMAILS = [
  'mariateresarogani@gmail.com',
] as const;

function parseOwnerEmailExtras(
  raw: string | undefined
): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** True when email is on the owner allowlist (defaults + optional env extras). */
export function isOwnerCourseAccessEmail(
  email: string | null | undefined,
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env
): boolean {
  const normalized = (email || '').trim().toLowerCase();
  if (!normalized) return false;
  if (
    (OWNER_COURSE_ACCESS_EMAILS as readonly string[]).includes(normalized)
  ) {
    return true;
  }
  return parseOwnerEmailExtras(env.COMING_SOON_OWNER_EMAILS).includes(
    normalized
  );
}

/**
 * Complimentary unlock for Maggiori only (not Minori / other frozen courses).
 * Purchase hold does not apply — owner never needs Stripe for Maggiori.
 */
export function ownerHasComplimentaryCourseAccess(
  email: string | null | undefined,
  courseSlug: string,
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env
): boolean {
  return (
    isOwnerCourseAccessEmail(email, env) &&
    courseSlug === MAGGIORI_PURCHASE_COURSE_SLUG
  );
}
