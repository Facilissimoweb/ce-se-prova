/**
 * ENN-185 / ENN-203 — Google Translate / Traduci gate.
 *
 * `true` restores site-wide GT (nav selector, script inject,
 * cookie/hash switching, Nina/PDF lang follow). Code paths remain in place;
 * this flag only gates runtime + UI mounts.
 */
export const GT_ENABLED = true;
