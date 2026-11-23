/**
 * ENN-250 — signup admin notify helpers + wiring smoke.
 * Run: npx tsx scripts/assert-signup-notify.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_ADMIN_NOTIFY_EMAIL,
  resolveAdminNotifyEmail,
  shouldNotifySignup,
} from '../src/lib/signupNotify.ts';

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
  DEFAULT_ADMIN_NOTIFY_EMAIL === 'mariateresarogani@gmail.com',
  'default admin notify is Maria Gmail'
);

assert(
  resolveAdminNotifyEmail({}) === 'mariateresarogani@gmail.com',
  'empty env falls back to Maria Gmail'
);

assert(
  resolveAdminNotifyEmail({
    ZOHO_STUDIO_EMAIL: 'studio@tarotitalia.com',
  }) === 'studio@tarotitalia.com',
  'ZOHO_STUDIO_EMAIL used when ADMIN_NOTIFY_EMAIL unset'
);

assert(
  resolveAdminNotifyEmail({
    ADMIN_NOTIFY_EMAIL: 'ops@tarotitalia.com',
    ZOHO_STUDIO_EMAIL: 'studio@tarotitalia.com',
  }) === 'ops@tarotitalia.com',
  'ADMIN_NOTIFY_EMAIL wins over ZOHO_STUDIO_EMAIL'
);

assert(
  shouldNotifySignup({
    uid: 'firebase-uid-abc',
    email: 'visitor@example.com',
  }),
  'real Firebase uid is notifiable'
);

assert(
  !shouldNotifySignup({
    uid: 'demo-reserved-enn103',
    email: 'demo@example.com',
  }),
  'demo reserved uid is skipped'
);

assert(
  !shouldNotifySignup(
    { uid: 'firebase-uid-abc', email: 'visitor@example.com' },
    { ADMIN_SIGNUP_NOTIFY: 'false' }
  ),
  'ADMIN_SIGNUP_NOTIFY=false disables notify'
);

const repo = readFileSync(path.join(root, 'src/db/repository.ts'), 'utf8');
assert(
  repo.includes('notifyAdminOfNewSignup') &&
    repo.includes('onConflictDoNothing'),
  'getOrCreateUser wires insert-first + signup notify'
);

const notifyLib = readFileSync(
  path.join(root, 'src/lib/signupNotify.ts'),
  'utf8'
);
assert(
  notifyLib.includes('sendZohoMail') && notifyLib.includes('isZohoMailConfigured'),
  'signup notify uses existing Zoho mailer'
);

const envExample = readFileSync(path.join(root, '.env.example'), 'utf8');
assert(
  envExample.includes('ADMIN_NOTIFY_EMAIL') &&
    envExample.includes('ADMIN_SIGNUP_NOTIFY'),
  '.env.example documents ADMIN_NOTIFY_EMAIL / ADMIN_SIGNUP_NOTIFY'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll signup-notify assertions passed.');
