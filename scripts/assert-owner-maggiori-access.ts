/**
 * ENN-240 — owner complimentary Maggiori access (no Stripe while purchase held).
 * Run: npx tsx scripts/assert-owner-maggiori-access.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isOwnerCourseAccessEmail,
  ownerHasComplimentaryCourseAccess,
  OWNER_COURSE_ACCESS_EMAILS,
} from '../src/lib/ownerCourseAccess.ts';

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

assert(
  OWNER_COURSE_ACCESS_EMAILS.includes('mariateresarogani@gmail.com'),
  'Maria owner email in allowlist'
);
assert(
  isOwnerCourseAccessEmail('mariateresarogani@gmail.com'),
  'isOwnerCourseAccessEmail(Maria) true'
);
assert(
  isOwnerCourseAccessEmail('  MariaTeresaRogani@gmail.com  '),
  'owner email match is case-insensitive / trimmed'
);
assert(
  !isOwnerCourseAccessEmail('visitor@example.com'),
  'random visitor is not owner'
);
assert(
  ownerHasComplimentaryCourseAccess(
    'mariateresarogani@gmail.com',
    'arcani-maggiori'
  ),
  'Maria gets complimentary Maggiori'
);
assert(
  !ownerHasComplimentaryCourseAccess(
    'mariateresarogani@gmail.com',
    'arcani-minori'
  ),
  'Maria does not get complimentary Minori'
);
assert(
  !ownerHasComplimentaryCourseAccess('visitor@example.com', 'arcani-maggiori'),
  'visitor does not get complimentary Maggiori'
);
assert(
  isOwnerCourseAccessEmail('extra@tarotitalia.com', {
    COMING_SOON_OWNER_EMAILS: 'extra@tarotitalia.com',
  }),
  'COMING_SOON_OWNER_EMAILS extras unlock owner access'
);

const repo = readFileSync(path.join(root, 'src/db/repository.ts'), 'utf8');
assert(
  repo.includes('ownerHasComplimentaryCourseAccess') &&
    repo.includes('userOwnsCourse'),
  'repository wires owner complimentary access into overview / userOwnsCourse'
);
assert(
  repo.includes('ownerBypass') ||
    /ownerHasComplimentaryCourseAccess\(\s*params\.email/.test(repo),
  'dispensa progress allows owner Maggiori without purchase row'
);

const reserved = readFileSync(
  path.join(root, 'src/server/routes/reserved.ts'),
  'utf8'
);
assert(
  reserved.includes('ownerHasComplimentaryCourseAccess'),
  'reserved routes import owner complimentary access'
);
assert(
  /ownerUnlocked|ownerHasComplimentaryCourseAccess/.test(reserved) &&
    reserved.includes('degradedOverviewFromSeed'),
  'degraded overview still unlocks Maggiori for owner'
);

const chat = readFileSync(path.join(root, 'src/server/routes/chat.ts'), 'utf8');
assert(
  chat.includes('userOwnsCourse'),
  'Nina Studio still gates via userOwnsCourse (owner path included)'
);

const hold = readFileSync(
  path.join(root, 'src/lib/maggioriPurchaseMode.ts'),
  'utf8'
);
assert(
  hold.includes('shouldBlockMaggioriPurchase') &&
    !hold.includes('ownerHasComplimentaryCourseAccess'),
  'purchase hold stays public-only (owner bypass is separate entitlement)'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-240 owner Maggiori access asserts passed.');
