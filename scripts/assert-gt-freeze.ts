/**
 * ENN-185 / ENN-203 / ENN-204 — Google Translate enablement guards.
 * While live testing (ENN-203+), GT_ENABLED must be true and googtrans readable.
 * Freeze path (flag false + Italian-forced reads) remains coded for re-freeze.
 * Run: npx tsx scripts/assert-gt-freeze.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GT_ENABLED } from '../src/lib/googleTranslateEnabled.ts';
import { readGoogTransLang } from '../src/lib/googleTranslateRuntime.ts';

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

assert(GT_ENABLED === true, 'GT_ENABLED is true for live Traduci testing');

const flag = readFileSync(
  path.join(root, 'src/lib/googleTranslateEnabled.ts'),
  'utf8'
);
assert(
  /export const GT_ENABLED\s*=\s*true/.test(flag),
  'flag source exports GT_ENABLED = true'
);

const widget = readFileSync(
  path.join(root, 'src/components/GoogleTranslateWidget.tsx'),
  'utf8'
);
assert(widget.includes('GT_ENABLED'), 'widget imports/uses GT_ENABLED');
assert(
  /if\s*\(\s*!GT_ENABLED\s*\)\s*return\s*null/.test(widget),
  'widget returns null when GT disabled (hides Traduci UI)'
);
assert(
  /function injectGoogleTranslate\(\)[\s\S]{0,120}if\s*\(\s*!GT_ENABLED\s*\)\s*return/.test(
    widget
  ),
  'injectGoogleTranslate no-ops when GT disabled'
);
assert(
  widget.includes('translate.google.com/translate_a/element.js'),
  'GT script URL kept in source (not deleted)'
);
assert(
  widget.includes('BrandedLanguageMenu') && widget.includes('Traduci'),
  'Traduci menu code retained'
);

const runtime = readFileSync(
  path.join(root, 'src/lib/googleTranslateRuntime.ts'),
  'utf8'
);
assert(
  runtime.includes('if (!GT_ENABLED) return GT_PAGE_LANG') ||
    /if\s*\(\s*!GT_ENABLED\s*\)\s*return\s*GT_PAGE_LANG/.test(runtime),
  'readGoogTransLang forces Italian when freeze on'
);
assert(
  /writeGoogtransCookie[\s\S]{0,80}if\s*\(\s*!GT_ENABLED\s*\)\s*return/.test(
    runtime
  ),
  'writeGoogtransCookie blocked when freeze on'
);
assert(
  /preservedGoogtransHash[\s\S]{0,120}if\s*\(\s*!GT_ENABLED\s*\)\s*return\s*''/.test(
    runtime
  ),
  'preservedGoogtransHash empty when freeze on'
);
assert(
  /startGoogleTranslateSpaBridge[\s\S]{0,160}!GT_ENABLED/.test(runtime),
  'SPA bridge does not start when freeze on'
);

const picker = readFileSync(
  path.join(root, 'src/components/MaterialsLanguagePicker.tsx'),
  'utf8'
);
assert(
  picker.includes('GT_ENABLED') &&
    /if\s*\(\s*!GT_ENABLED\s*\)\s*return\s*null/.test(picker),
  'MaterialsLanguagePicker hidden when GT off'
);

const nav = readFileSync(
  path.join(root, 'src/components/NavigationChrome.tsx'),
  'utf8'
);
assert(
  nav.includes('GoogleTranslateWidget'),
  'nav still mounts widget (gated internally)'
);

const i18nIndex = readFileSync(path.join(root, 'src/i18n/index.ts'), 'utf8');
assert(
  i18nIndex.includes('GT_ENABLED') &&
    /GT_ENABLED\s*\?\s*DEFAULT_LANG/.test(i18nIndex),
  'initI18n forces Italian when GT is the public language system (ENN-204)'
);

// Live read with cookie/hash must report the browsing language while enabled.
const prevDoc = (globalThis as { document?: unknown }).document;
const prevWin = (globalThis as { window?: unknown }).window;
(globalThis as { document: unknown }).document = {
  cookie: 'googtrans=/it/en',
  documentElement: { lang: 'it', dir: 'ltr', classList: { toggle() {} } },
  body: { dir: 'ltr' },
};
(globalThis as { window: unknown }).window = {
  location: {
    hash: '#googtrans(it|ja)',
    hostname: 'localhost',
    pathname: '/',
    search: '',
  },
  history: { replaceState() {} },
};
try {
  assert(
    readGoogTransLang() === 'ja',
    'googtrans hash preferred over cookie while GT enabled (ENN-180/204)'
  );
} finally {
  if (prevDoc === undefined) {
    delete (globalThis as { document?: unknown }).document;
  } else {
    (globalThis as { document: unknown }).document = prevDoc;
  }
  if (prevWin === undefined) {
    delete (globalThis as { window?: unknown }).window;
  } else {
    (globalThis as { window: unknown }).window = prevWin;
  }
}

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-204 GT enablement asserts passed.');
