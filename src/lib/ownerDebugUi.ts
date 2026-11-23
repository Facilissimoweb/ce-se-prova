/**
 * ENN-243 — Handoff / CMS debug UI is local Vite DEV only.
 *
 * Production builds must never expose Handoff Tecnico, Ispeziona Chiavi,
 * env dumps, Stripe Checkout Handoff docs, or WhatsApp webhook specs in the SPA.
 * Owner-email gates are intentionally unused: they still showed those surfaces
 * to Maria when signed in on www.
 *
 * Call sites should prefer a literal `import.meta.env.DEV` branch so Vite can
 * dead-code-eliminate the drawer and related strings from production bundles.
 */

/** True only in `vite` / `npm run dev` — always false after `vite build`. */
export function canShowDevDebugUi(): boolean {
  return import.meta.env.DEV;
}

/** @deprecated Use canShowDevDebugUi / import.meta.env.DEV (ENN-243). */
export function canShowOwnerDebugUi(
  _email?: string | null
): boolean {
  return canShowDevDebugUi();
}
