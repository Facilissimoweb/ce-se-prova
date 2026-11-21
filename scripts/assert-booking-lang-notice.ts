/**
 * ENN-199 — WhatsApp consult / GT translation advice banner must stay removed.
 * Stripe consult checkout must remain enabled.
 * Run: npx tsx scripts/assert-booking-lang-notice.ts
 */
import { existsSync, readFileSync } from 'node:fs';
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

const noticePath = path.join(
  root,
  'src/components/booking/BookingLangNotice.tsx'
);
const booking = readFileSync(
  path.join(root, 'src/screens/BookingScreen.tsx'),
  'utf8'
);
const content = readFileSync(
  path.join(root, 'src/data/siteContent.ts'),
  'utf8'
);
const checkout = readFileSync(
  path.join(root, 'src/lib/bookingCheckoutMode.ts'),
  'utf8'
);

assert(!existsSync(noticePath), 'BookingLangNotice.tsx deleted');
assert(
  !booking.includes('BookingLangNotice'),
  'BookingScreen does not mount BookingLangNotice'
);
assert(
  !content.includes('waConsultNoteIt') &&
    !content.includes('waConsultNoticeNonIt'),
  'siteContent has no ENN-166 WA consult notice copy keys'
);
assert(
  !content.includes('traduzione automatica') &&
    !content.includes('traduzione integrata di WhatsApp'),
  'siteContent has no GT/translation-advice banner copy'
);
assert(
  /CONSULTATION_STRIPE_ENABLED\s*=\s*true/.test(checkout),
  'Stripe consult checkout enabled (do not regress)'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-199 booking lang notice removal asserts passed.');
