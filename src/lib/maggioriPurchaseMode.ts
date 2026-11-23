/**
 * Maggiori course purchase hold (ENN-239).
 *
 * Content / anteprima / Area Riservata for existing buyers stay available.
 * Only new Stripe checkout / enroll purchase is blocked while the flag is off.
 *
 * Re-enable (Vercel Production → Redeploy):
 *   VITE_MAGGIORI_PURCHASE_ENABLED=true
 *   MAGGIORI_PURCHASE_ENABLED=true
 *
 * Default (unset / false) = in aggiornamento → checkout blocked.
 */

export const MAGGIORI_PURCHASE_COURSE_SLUG = 'arcani-maggiori' as const;

/** Short CTA / badge copy (Italian). */
export const MAGGIORI_PURCHASE_HOLD_MESSAGE =
  'Corso in aggiornamento — presto di nuovo disponibile';

/** Slightly longer note under CTAs / checkout panel. */
export const MAGGIORI_PURCHASE_HOLD_DETAIL =
  'Il percorso Arcani Maggiori è in aggiornamento. Puoi esplorare anteprima e contenuti pubblici; acquisto e checkout Stripe riprendono a breve.';

export function isMaggioriPurchaseCourseSlug(slug: string): boolean {
  return slug === MAGGIORI_PURCHASE_COURSE_SLUG;
}

/**
 * Server / API: purchases enabled only when explicitly `true`.
 * Accepts `MAGGIORI_PURCHASE_ENABLED` or the Vite mirror for local single-env.
 */
export function isMaggioriPurchaseEnabledFromEnv(
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env
): boolean {
  return (
    env.MAGGIORI_PURCHASE_ENABLED === 'true' ||
    env.VITE_MAGGIORI_PURCHASE_ENABLED === 'true'
  );
}

/** Client SPA: build-time Vite flag (must Redeploy after change). */
export function isMaggioriPurchaseEnabledClient(): boolean {
  return import.meta.env.VITE_MAGGIORI_PURCHASE_ENABLED === 'true';
}

/** True when this slug’s new checkout must be refused. */
export function shouldBlockMaggioriPurchase(
  slug: string,
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env
): boolean {
  return (
    isMaggioriPurchaseCourseSlug(slug) && !isMaggioriPurchaseEnabledFromEnv(env)
  );
}
