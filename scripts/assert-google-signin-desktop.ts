/**
 * Assert desktop Google sign-in prefers popup while authDomain is cross-origin
 * (firebaseapp.com or auth.tarotitalia.com vs www.tarotitalia.com).
 * Regression guard for ENN-238 / #203 + ENN-247 custom auth domain.
 *
 * Usage: npx tsx scripts/assert-google-signin-desktop.ts
 */
import {
  canUseGoogleRedirectSafely,
  preferGoogleRedirectSignIn,
  shouldFallbackGoogleRedirect,
} from '../src/lib/googleSignIn.ts';
import { comingSoonCookieDomain } from '../src/lib/comingSoon.ts';
import {
  DEFAULT_FIREBASE_AUTH_DOMAIN,
  resolveFirebaseAuthDomain,
} from '../src/lib/firebaseClientConfig.ts';

const failures: string[] = [];

function assert(cond: boolean, msg: string) {
  if (!cond) failures.push(msg);
}

assert(
  canUseGoogleRedirectSafely(
    'www.tarotitalia.com',
    'gen-lang-client-0853491667.firebaseapp.com'
  ) === false,
  'cross-origin authDomain must NOT be redirect-safe'
);

assert(
  canUseGoogleRedirectSafely('www.tarotitalia.com', 'auth.tarotitalia.com') ===
    false,
  'custom auth subdomain must NOT be redirect-safe vs www (still popup-first)'
);

assert(
  canUseGoogleRedirectSafely('www.tarotitalia.com', 'www.tarotitalia.com') ===
    true,
  'same-origin authDomain should be redirect-safe'
);

assert(
  resolveFirebaseAuthDomain(undefined) === DEFAULT_FIREBASE_AUTH_DOMAIN,
  'unset env must fall back to firebaseapp authDomain'
);

assert(
  resolveFirebaseAuthDomain('auth.tarotitalia.com') === 'auth.tarotitalia.com',
  'VITE_FIREBASE_AUTH_DOMAIN override must win'
);

assert(
  resolveFirebaseAuthDomain('https://auth.tarotitalia.com/') ===
    'auth.tarotitalia.com',
  'authDomain override must strip protocol/path'
);

assert(
  shouldFallbackGoogleRedirect('auth/popup-blocked') === false,
  'must not fallback to cross-origin redirect when unsafe'
);

// preferGoogleRedirectSignIn reads window — in Node it returns false.
assert(
  preferGoogleRedirectSignIn() === false,
  'Node/SSR must not prefer redirect'
);

assert(
  comingSoonCookieDomain('www.tarotitalia.com') === '.tarotitalia.com',
  'www unlock cookie should use Domain=.tarotitalia.com'
);
assert(
  comingSoonCookieDomain('tarotitalia.com') === '.tarotitalia.com',
  'apex unlock cookie should use Domain=.tarotitalia.com'
);
assert(
  comingSoonCookieDomain('ce-se-prova.vercel.app') === undefined,
  'preview hosts keep host-only cookie'
);

if (failures.length) {
  console.error('FAIL assert-google-signin-desktop:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log(
  'OK: Google desktop sign-in stays popup-first while authDomain is cross-origin (firebaseapp or auth.tarotitalia.com); Coming Soon cookie Domain hardened for www/apex.'
);
