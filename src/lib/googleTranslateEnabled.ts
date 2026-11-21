/**
 * ENN-185 — Google Translate / Traduci launch freeze.
 *
 * Flip to `true` to restore site-wide GT (nav selector, script inject,
 * cookie/hash switching, Nina/PDF lang follow). Code paths remain in place;
 * this flag only gates runtime + UI mounts.
 */
export const GT_ENABLED = false;
