/**
 * ENN-243 — Production SPA must have zero path to Handoff / CMS debug UI.
 * Run after `npm run build`: npx tsx scripts/assert-handoff-purged-from-prod.ts
 *
 * Also asserts source gates (safe to run without dist).
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
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

const FORBIDDEN_UI_STRINGS = [
  'Handoff Tecnico',
  'Ispeziona Chiavi',
  'Specifiche Handoff',
  'Mostra Chiavi [COPY]',
  'Stripe Checkout Handoff',
  'Architettura CMS & Integrazioni',
  'Architettura CMS &amp; Integrazioni',
  'Variabili d\'ambiente runtime',
  'WhatsApp Cloud Webhook',
  'Modalità Placeholder CMS',
  'Apri specifiche CMS e Handoff',
  'Handoff & CMS',
  'Handoff y CMS',
] as const;

const app = readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
assert(
  /import\.meta\.env\.DEV\s*\?\s*\([\s\S]*HandoffDrawer/.test(app) ||
    (app.includes('import.meta.env.DEV') && app.includes('<HandoffDrawer')),
  'src: HandoffDrawer behind import.meta.env.DEV'
);
assert(
  app.includes('Ispeziona Chiavi') && app.includes('import.meta.env.DEV'),
  'src: Ispeziona Chiavi only inside DEV branch'
);
assert(
  !app.includes('canShowOwnerDebugUi(user'),
  'src: no owner-email gate for handoff UI'
);

const rail = readFileSync(
  path.join(root, 'src/components/NavigationChrome.tsx'),
  'utf8'
);
assert(
  rail.includes('import.meta.env.DEV') && rail.includes('onOpenHandoff'),
  'src: rail Code/handoff button gated by import.meta.env.DEV'
);

const ownerDebug = readFileSync(
  path.join(root, 'src/lib/ownerDebugUi.ts'),
  'utf8'
);
assert(
  ownerDebug.includes('import.meta.env.DEV') &&
    !ownerDebug.includes('OWNER_DEBUG_EMAILS') &&
    !ownerDebug.includes('VITE_OWNER_DEBUG_UI'),
  'src: ownerDebugUi DEV-only, no email allowlist'
);

const commonI18n = readFileSync(
  path.join(root, 'src/i18n/locales/common.ts'),
  'utf8'
);
assert(
  !commonI18n.includes("'nav.handoff'") &&
    !commonI18n.includes("'rail.handoff'"),
  'src: i18n handoff keys removed'
);

const envExample = readFileSync(path.join(root, '.env.example'), 'utf8');
assert(
  !/VITE_OWNER_DEBUG_UI\s*=/.test(envExample) &&
    envExample.includes('ENN-243'),
  '.env.example documents ENN-243 DEV-only (no VITE_OWNER_DEBUG_UI=)'
);

const distDir = path.join(root, 'dist');
if (!existsSync(distDir)) {
  console.log(
    '\nSKIP dist grep: no dist/ — run `npm run build` then re-run this script.'
  );
} else {
  function collectFiles(dir: string, out: string[] = []): string[] {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = statSync(full);
      if (st.isDirectory()) collectFiles(full, out);
      else if (/\.(js|css|html|json|map)$/i.test(name)) out.push(full);
    }
    return out;
  }

  const files = collectFiles(distDir);
  const haystack = files
    .map((f) => {
      try {
        return readFileSync(f, 'utf8');
      } catch {
        return '';
      }
    })
    .join('\n');

  for (const needle of FORBIDDEN_UI_STRINGS) {
    assert(
      !haystack.includes(needle),
      `dist: no user-facing string "${needle}"`
    );
  }

  assert(
    !haystack.includes('WHATSAPP_VERIFY_TOKEN') ||
      !haystack.includes('Stripe Checkout Handoff'),
    'dist: no WhatsApp webhook / Stripe handoff dump pairing'
  );

  assert(
    files.some((f) => f.endsWith('.js')),
    'dist: production JS assets present'
  );
}

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-243 handoff purge asserts passed.');
