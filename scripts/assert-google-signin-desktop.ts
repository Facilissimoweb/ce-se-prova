/**
 * Assert desktop Google sign-in prefers popup while authDomain is cross-origin
 * (firebaseapp.com vs www.tarotitalia.com). Regression guard for ENN-238 / #203.
 *
 * Usage: npx tsx scripts/assert-google-signin-desktop.ts
 */
import {
  canUseGoogleRedirectSafely,
  preferGoogleRedirectSignIn,
  shouldFallbackGoogleRedirect,
} from '../src/lib/googleSignIn.ts';
import { comingSoonCookieDomain } from '../src/lib/comingSoon.ts';

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
  canUseGoogleRedirectSafely('www.tarotitalia.com', 'www.tarotitalia.com') ===
    true,
  'same-origin authDomain should be redirect-safe'
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
  'OK: Google desktop sign-in stays popup-first while authDomain is cross-origin; Coming Soon cookie Domain hardened for www/apex.'
);
