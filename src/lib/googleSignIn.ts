/**
 * Google sign-in helpers for Firebase Auth (Area personale + Coming Soon).
 *
 * Exact desktop failure after ENN-238 / PR #203
 * ---------------------------------------------
 * PR #203 preferred `signInWithRedirect` on fine-pointer (desktop). The app is
 * hosted on Vercel (`www.tarotitalia.com`) while `authDomain` remains
 * cross-origin (`*.firebaseapp.com`, or later `auth.tarotitalia.com` via
 * ENN-247 / `VITE_FIREBASE_AUTH_DOMAIN`). Chrome M115+ (and Safari /
 * Firefox) partition third-party storage, so the Firebase Auth helper iframe
 * cannot hand the redirect session back → `getRedirectResult()` is null and
 * the user appears still logged out. Firebase documents this as requiring
 * Option 1–5 in “redirect best practices”; Option 2 is `signInWithPopup`.
 *
 * Immediate fix: prefer **popup** (Option 2). Redirect only when auth helper
 * is same-origin (Vercel `/__/auth` proxy + `authDomain` = site host) — see
 * `canUseGoogleRedirectSafely`. Custom auth host `auth.tarotitalia.com` is
 * still cross-origin vs www → keep popup-first. Do **not** force redirect
 * on desktop while authDomain ≠ location.hostname.
 */

import { getFirebaseAuthDomain } from './firebaseClientConfig';

const FIREBASE_AUTH_DOMAIN = getFirebaseAuthDomain();

/** Hosts where Vercel rewrites `/__/auth` → firebaseapp.com (Option 3 prep). */
export function isProductionSiteHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase();
  return host === 'tarotitalia.com' || host === 'www.tarotitalia.com';
}

/**
 * Redirect is safe only when the Auth helper is same-origin as the app.
 * Cross-origin `*.firebaseapp.com` + redirect is broken under storage partitioning.
 */
export function canUseGoogleRedirectSafely(
  hostname: string = typeof window !== 'undefined' ? window.location.hostname : '',
  authDomain: string = FIREBASE_AUTH_DOMAIN
): boolean {
  const host = hostname.trim().toLowerCase();
  const domain = authDomain.trim().toLowerCase();
  if (!host || !domain) return false;
  return host === domain;
}

/**
 * Prefer redirect only when same-origin authDomain is configured.
 * Default (current prod config): **false** → popup first.
 */
export function preferGoogleRedirectSignIn(): boolean {
  if (typeof window === 'undefined') return false;
  return canUseGoogleRedirectSafely(window.location.hostname);
}

/** Popup failures where a redirect retry is appropriate (only if redirect is safe). */
export function shouldFallbackGoogleRedirect(code: string): boolean {
  // Cross-origin redirect fails under storage partitioning (ENN-238) — do not retry it.
  if (!canUseGoogleRedirectSafely()) return false;
  return (
    code === 'auth/popup-blocked' ||
    code === 'auth/cancelled-popup-request' ||
    code === 'auth/operation-not-supported-in-this-environment' ||
    code === 'auth/internal-error'
  );
}

const REDIRECT_PENDING_KEY = 'ti.googleRedirectPending';

export function markGoogleRedirectPending(): void {
  try {
    sessionStorage.setItem(REDIRECT_PENDING_KEY, '1');
  } catch {
    /* private mode */
  }
}

export function consumeGoogleRedirectPending(): boolean {
  try {
    const pending = sessionStorage.getItem(REDIRECT_PENDING_KEY) === '1';
    sessionStorage.removeItem(REDIRECT_PENDING_KEY);
    return pending;
  } catch {
    return false;
  }
}

/** Italian user-facing message for Firebase Auth error codes. */
export function googleSignInErrorMessage(code: string): string {
  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Accesso annullato prima del completamento.';
    case 'auth/popup-blocked':
      return 'Il browser ha bloccato la finestra di accesso Google. Consenti i popup per tarotitalia.com e riprova.';
    case 'auth/unauthorized-domain':
      return 'Questo dominio non è autorizzato in Firebase Authentication. Aggiungi tarotitalia.com e www.tarotitalia.com (e l’host Vercel se serve) in Authorized domains.';
    case 'auth/network-request-failed':
      return 'Rete non disponibile durante l’accesso Google. Controlla la connessione e riprova.';
    case 'auth/account-exists-with-different-credential':
      return 'Esiste già un account con questa email ma con un altro metodo di accesso.';
    case 'auth/redirect-storage-blocked':
      return 'Il browser ha bloccato la sessione di reindirizzamento Google (cookie di terze parti). Riprova con la finestra popup, oppure consenti i popup per questo sito.';
    default:
      return 'Impossibile completare l’accesso con Google. Riprova tra qualche istante.';
  }
}
