/**
 * ENN-149 — scroll landmark hash helpers + settle constants.
 * Run: npx tsx scripts/assert-scroll-landings.ts
 */
import {
  LANDING_TOLERANCE_PX,
  SCROLL_LANDMARKS,
  normalizeHash,
  screenFromHash,
  sectionIdFromHash,
} from '../src/lib/scrollNavigation.ts';

let failed = 0;
function assert(cond: boolean, label: string) {
  if (!cond) {
    console.error('FAIL:', label);
    failed += 1;
  } else {
    console.log('PASS:', label);
  }
}

assert(LANDING_TOLERANCE_PX >= 8 && LANDING_TOLERANCE_PX <= 24, 'tolerance band');
assert(SCROLL_LANDMARKS.corsi === 'corsi', 'landmark corsi');
assert(SCROLL_LANDMARKS.dialogo === 'dialogo', 'landmark dialogo');
assert(SCROLL_LANDMARKS.homeDidattica === 'home-didattica', 'landmark didattica');
assert(SCROLL_LANDMARKS.reservedPercorsi === 'reserved-percorsi', 'landmark reserved');

assert(screenFromHash('#corsi') === 'corsi', 'hash → corsi screen');
assert(screenFromHash('#dialogo') === 'chat', 'hash → chat screen');
assert(sectionIdFromHash('#didattica') === 'home-didattica', 'hash → didattica');
assert(sectionIdFromHash('#googtrans(it|en)') === null, 'googtrans not a section');
assert(screenFromHash('#googtrans(it|en)') === null, 'googtrans not a screen');
assert(normalizeHash('#Home-Consulti') === 'home-consulti', 'normalize');

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-149 scroll landing assertions passed.');
