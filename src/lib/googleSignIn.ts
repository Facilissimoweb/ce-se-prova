/**
 * Google sign-in helpers for Firebase Auth (Area personale + Coming Soon).
 *
 * Desktop browsers often break `signInWithPopup` (popup blockers, third-party
 * cookie partitioning against `*.firebaseapp.com`). Prefer full-page redirect
 * on fine-pointer (desktop); keep popup on coarse/touch with redirect fallback.
 */

/** True when we should use `signInWithRedirect` instead of a popup. */
export function preferGoogleRedirectSignIn(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return !window.matchMedia('(pointer: coarse)').matches;
  } catch {
    return true;
  }
}

/** Popup failures where a redirect retry is appropriate (mobile path). */
export function shouldFallbackGoogleRedirect(code: string): boolean {
  return (
    code === 'auth/popup-blocked' ||
    code === 'auth/cancelled-popup-request' ||
    code === 'auth/operation-not-supported-in-this-environment' ||
    code === 'auth/internal-error'
  );
}

/** Italian user-facing message for Firebase Auth error codes. */
export function googleSignInErrorMessage(code: string): string {
  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Accesso annullato prima del completamento.';
    case 'auth/popup-blocked':
      return 'Il browser ha bloccato la finestra di accesso. Consenti i popup oppure riprova: useremo il reindirizzamento Google.';
    case 'auth/unauthorized-domain':
      return 'Questo dominio non è autorizzato in Firebase Authentication. Aggiungi tarotitalia.com e www.tarotitalia.com (e l’host Vercel se serve) in Authorized domains.';
    case 'auth/network-request-failed':
      return 'Rete non disponibile durante l’accesso Google. Controlla la connessione e riprova.';
    case 'auth/account-exists-with-different-credential':
      return 'Esiste già un account con questa email ma con un altro metodo di accesso.';
    default:
      return 'Impossibile completare l’accesso con Google. Riprova tra qualche istante.';
  }
}
