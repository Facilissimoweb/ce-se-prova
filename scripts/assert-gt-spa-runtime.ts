/**
 * ENN-148 — googtrans hash helpers + landmark ignore (no browser GT).
 * Run: npx tsx scripts/assert-gt-spa-runtime.ts
 */
import { isGoogtransHash } from '../src/lib/googleTranslateRuntime.ts';
import {
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

assert(isGoogtransHash('#googtrans(it|en)'), 'hash googtrans(it|en)');
assert(isGoogtransHash('googtrans(it|zh-CN)'), 'hash without #');
assert(!isGoogtransHash('#corsi'), 'corsi is not googtrans');
assert(!isGoogtransHash(''), 'empty hash');

assert(screenFromHash('#googtrans(it|en)') === null, 'screen ignores googtrans');
assert(sectionIdFromHash('#googtrans(it|en)') === null, 'section ignores googtrans');
assert(screenFromHash('#corsi') === 'corsi', 'screen corsi');
assert(sectionIdFromHash('#didattica') === 'home-didattica', 'section didattica');
assert(normalizeHash('#Corsi') === 'corsi', 'normalize');

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-148 GT runtime assertions passed.');
