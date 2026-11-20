/**
 * ENN-166 — booking WhatsApp language notice wiring (no browser GT).
 * Run: npx tsx scripts/assert-booking-lang-notice.ts
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

const notice = readFileSync(
  path.join(root, 'src/components/booking/BookingLangNotice.tsx'),
  'utf8'
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

assert(notice.includes('readGoogTransLang'), 'notice reads googtrans lang');
assert(notice.includes('GT_PAGE_LANG'), 'notice uses GT_PAGE_LANG');
assert(notice.includes('GT_REFRESH_EVENT'), 'notice listens for GT refresh');
assert(
  notice.includes('waConsultNoticeNonIt') && notice.includes('waConsultNoteIt'),
  'notice branches IT vs non-IT copy keys'
);
assert(
  booking.includes('BookingLangNotice'),
  'BookingScreen mounts BookingLangNotice'
);
assert(
  content.includes('waConsultNoteIt') &&
    content.includes('waConsultNoticeNonIt'),
  'siteContent has ENN-166 booking copy keys'
);
assert(
  /CONSULTATION_STRIPE_ENABLED\s*=\s*false/.test(checkout),
  'Stripe consult flag stays false (ENN-167 separate)'
);
assert(
  !notice.toLowerCase().includes('whatsapp cloud') &&
    !notice.includes('/api/webhooks/whatsapp'),
  'notice has no WA Business API / webhook wiring'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-166 booking lang notice asserts passed.');
