/**
 * ENN-131 / ENN-132 — Maggiori gated blog (Modulo 01).
 * Stable slug for deep-links from Corsi anteprima + Area Riservata.
 * ENN-132 replaced the Settenario promo with Maria’s Il Matto article.
 */
export const MAGGIORI_MODULO_01_BLOG_SLUG =
  'il-coraggio-di-iniziare-il-matto' as const;

/** Former ENN-131 promo slug — redirect to the Matto article. */
export const MAGGIORI_MODULO_01_BLOG_LEGACY_SLUGS = [
  'primo-settenario-mappa-identita',
] as const;

export const MAGGIORI_COURSE_SLUG = 'arcani-maggiori' as const;

export function resolveMaggioriModulo01BlogSlug(slug: string): string {
  const normalized = slug.trim().toLowerCase();
  if (
    (MAGGIORI_MODULO_01_BLOG_LEGACY_SLUGS as readonly string[]).includes(
      normalized
    )
  ) {
    return MAGGIORI_MODULO_01_BLOG_SLUG;
  }
  return normalized;
}
