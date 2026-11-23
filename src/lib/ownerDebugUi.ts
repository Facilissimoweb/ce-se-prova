/**
 * ENN-239 — Owner-only CMS / Handoff debug UI.
 * Public visitors must never see Handoff Tecnico, Ispeziona Chiavi, env lists, etc.
 *
 * Enabled when:
 * - signed-in email is in the owner allowlist, or
 * - `VITE_OWNER_DEBUG_UI=true` (local / Maria preview builds only).
 */

/** Same default owner as Coming Soon (ENN-95). Keep in sync. */
export const OWNER_DEBUG_EMAILS = [
  'mariateresarogani@gmail.com',
] as const;

export function isOwnerDebugEmail(
  email: string | null | undefined
): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return (OWNER_DEBUG_EMAILS as readonly string[]).includes(normalized);
}

/** Build-time opt-in for local owner tools without Google sign-in. */
export function isOwnerDebugUiEnvEnabled(): boolean {
  return import.meta.env.VITE_OWNER_DEBUG_UI === 'true';
}

export function canShowOwnerDebugUi(
  email: string | null | undefined
): boolean {
  return isOwnerDebugUiEnvEnabled() || isOwnerDebugEmail(email);
}
