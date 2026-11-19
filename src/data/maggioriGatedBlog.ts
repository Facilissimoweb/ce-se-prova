/**
 * ENN-131 / ENN-132 / ENN-133 — Maggiori gated blog (Modulo 01).
 * Stable slug for deep-links from Corsi anteprima + Area Riservata.
 * ENN-132: Modulo 01 companion = Il Matto.
 * ENN-133: second gated piece = Il Bagatto (same Maggiori entitlement).
 */
export const MAGGIORI_MODULO_01_BLOG_SLUG =
  'il-coraggio-di-iniziare-il-matto' as const;

/** ENN-133 — Il Bagatto / Il Mago (I) gated companion. */
export const MAGGIORI_BAGATTO_BLOG_SLUG =
  'la-scintilla-del-talento-il-bagatto' as const;

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
