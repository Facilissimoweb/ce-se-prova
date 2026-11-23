/**
 * ENN-239 — Maggiori purchase hold + Coming Soon launch defaults.
 * Run: npx tsx scripts/assert-maggiori-purchase-hold.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isMaggioriPurchaseEnabledFromEnv,
  MAGGIORI_PURCHASE_HOLD_MESSAGE,
  shouldBlockMaggioriPurchase,
} from '../src/lib/maggioriPurchaseMode.ts';

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
  !isMaggioriPurchaseEnabledFromEnv({}),
  'default env → Maggiori purchase disabled'
);
assert(
  !isMaggioriPurchaseEnabledFromEnv({
    MAGGIORI_PURCHASE_ENABLED: 'false',
    VITE_MAGGIORI_PURCHASE_ENABLED: 'false',
  }),
  'explicit false → Maggiori purchase disabled'
);
assert(
  isMaggioriPurchaseEnabledFromEnv({
    MAGGIORI_PURCHASE_ENABLED: 'true',
  }),
  'MAGGIORI_PURCHASE_ENABLED=true → enabled'
);
assert(
  isMaggioriPurchaseEnabledFromEnv({
    VITE_MAGGIORI_PURCHASE_ENABLED: 'true',
  }),
  'VITE_MAGGIORI_PURCHASE_ENABLED=true → enabled'
);
assert(
  shouldBlockMaggioriPurchase('arcani-maggiori', {}),
  'Maggiori blocked when flag unset'
);
assert(
  !shouldBlockMaggioriPurchase('arcani-maggiori', {
    MAGGIORI_PURCHASE_ENABLED: 'true',
  }),
  'Maggiori not blocked when flag true'
);
assert(
  !shouldBlockMaggioriPurchase('arcani-minori', {}),
  'Minori not affected by Maggiori hold'
);
assert(
  MAGGIORI_PURCHASE_HOLD_MESSAGE.includes('aggiornamento'),
  'hold message mentions aggiornamento'
);

const reserved = readFileSync(
  path.join(root, 'src/server/routes/reserved.ts'),
  'utf8'
);
assert(
  reserved.includes('shouldBlockMaggioriPurchase') &&
    reserved.includes('MAGGIORI_PURCHASE_HOLD'),
  'reserved enroll enforces Maggiori purchase hold'
);
assert(
  reserved.includes('stripeSessionId') &&
    /if\s*\(\s*!stripeSessionId\s*&&\s*shouldBlockMaggioriPurchase/.test(
      reserved
    ),
  'hold skips already-paid stripeSessionId activation'
);

const envExample = readFileSync(path.join(root, '.env.example'), 'utf8');
assert(
  envExample.includes('VITE_MAGGIORI_PURCHASE_ENABLED') &&
    envExample.includes('MAGGIORI_PURCHASE_ENABLED'),
  '.env.example documents Maggiori purchase flags'
);
assert(
  /COMING_SOON_ENABLED="false"/.test(envExample) &&
    envExample.includes('ENN-239 launch'),
  '.env.example documents Coming Soon off for launch'
);

const corsi = readFileSync(
  path.join(root, 'src/screens/CorsiScreen.tsx'),
  'utf8'
);
assert(
  corsi.includes('MAGGIORI_PURCHASE_HOLD_MESSAGE'),
  'CorsiScreen surfaces Maggiori purchase hold copy'
);
assert(
  !/inert|pointer-events-none.*overlay|oscurat/i.test(corsi) ||
    corsi.includes('ENN-47 obscure banner + dim overlay removed'),
  'CorsiScreen does not reintroduce content-covering obscure overlay'
);
assert(
  !corsi.includes('Payload Iscrizione Stripe Checkout Pronto') &&
    !corsi.includes('JSON.stringify(checkoutPayload'),
  'CorsiScreen does not expose Stripe handoff JSON to visitors'
);

const app = readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
assert(
  app.includes('canShowOwnerDebugUi') &&
    app.includes('ownerDebugUi') &&
    /ownerDebugUi\s*\?\s*\(/.test(app),
  'App gates Handoff/CMS footer + drawer behind ownerDebugUi'
);
assert(
  !/onOpenHandoff=\{\(\)\s*=>\s*setIsHandoffOpen\(true\)\}/.test(app) ||
    app.includes('ownerDebugUi ? () => setIsHandoffOpen(true)'),
  'FloatingSideRail handoff only wired when ownerDebugUi'
);

const ownerDebug = readFileSync(
  path.join(root, 'src/lib/ownerDebugUi.ts'),
  'utf8'
);
assert(
  ownerDebug.includes('mariateresarogani@gmail.com') &&
    ownerDebug.includes('VITE_OWNER_DEBUG_UI'),
  'ownerDebugUi allowlists Maria + env opt-in'
);

const consulti = readFileSync(
  path.join(root, 'src/screens/ConsultiScreen.tsx'),
  'utf8'
);
assert(
  !consulti.includes('Handoff Pagamenti'),
  'ConsultiScreen has no visitor-facing Handoff title'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-239 Maggiori purchase hold asserts passed.');
