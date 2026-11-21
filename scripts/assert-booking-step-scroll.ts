/**
 * ENN-196 — Prenota wizard scrolls to top on every step change (incl. pills).
 * Run: npx tsx scripts/assert-booking-step-scroll.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

let failed = 0;
function assert(cond: boolean, label: string) {
  if (!cond) {
    console.error('FAIL:', label);
    failed += 1;
  } else {
    console.log('PASS:', label);
  }
}

const booking = readFileSync(
  path.join(root, 'src/screens/BookingScreen.tsx'),
  'utf8'
);
const scrollNav = readFileSync(
  path.join(root, 'src/lib/scrollNavigation.ts'),
  'utf8'
);

assert(
  scrollNav.includes('export function scrollAllPortsToTop'),
  'scrollAllPortsToTop exported'
);
assert(
  scrollNav.includes('export function scrollStepToTopAfterPaint'),
  'scrollStepToTopAfterPaint exported'
);
assert(
  scrollNav.includes("scrollIntoView({ block: 'start'"),
  'step scroll uses scrollIntoView block start'
);
assert(scrollNav.includes('active.blur()'), 'step scroll blurs focused control');
assert(
  scrollNav.includes('document.documentElement.scrollTop = 0'),
  'resets documentElement.scrollTop'
);
assert(scrollNav.includes('document.body.scrollTop = 0'), 'resets body.scrollTop');

assert(
  booking.includes('scrollStepToTopAfterPaint'),
  'BookingScreen uses scrollStepToTopAfterPaint'
);
assert(
  booking.includes('id="booking-step-heading"'),
  'step headings share booking-step-heading id'
);
assert(booking.includes('goToStep'), 'BookingScreen has goToStep');
assert(
  booking.includes('onClick={() => goToStep(s.num)}'),
  'step pills call goToStep'
);
assert(
  booking.includes('}, [step]);') && booking.includes('scrollWizardStepToTop'),
  'useEffect depends on step and scrolls'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll booking step-scroll assertions passed.');
