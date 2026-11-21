/**
 * ENN-148 / ENN-180 / ENN-184 — googtrans hash helpers + SPA switch harden.
 * Run: npx tsx scripts/assert-gt-spa-runtime.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  isGoogtransHash,
  readGoogTransLang,
} from '../src/lib/googleTranslateRuntime.ts';
import {
  normalizeHash,
  screenFromHash,
  sectionIdFromHash,
} from '../src/lib/scrollNavigation.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const runtime = readFileSync(
  path.join(root, 'src/lib/googleTranslateRuntime.ts'),
  'utf8'
);
const widget = readFileSync(
  path.join(root, 'src/components/GoogleTranslateWidget.tsx'),
  'utf8'
);

/** Minimal document/window stub for readGoogTransLang (no browser). */
function withGoogtransDom(
  cookie: string,
  hash: string,
  run: () => void
): void {
  const prevDoc = (globalThis as { document?: unknown }).document;
  const prevWin = (globalThis as { window?: unknown }).window;
  const stub = {
    cookie,
    documentElement: { lang: 'it', dir: 'ltr', classList: { toggle() {} } },
    body: { dir: 'ltr' },
  };
  (globalThis as { document: unknown }).document = stub;
  (globalThis as { window: unknown }).window = {
    location: { hash, hostname: 'localhost', pathname: '/', search: '' },
    history: { replaceState() {} },
  };
  try {
    run();
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
}

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

// ENN-180 — non-IT hash preference kept in source (active when GT_ENABLED).
assert(
  runtime.includes('fromHash') &&
    runtime.includes('fromCookie') &&
    /fromHash\s*&&\s*fromHash\s*!==\s*GT_PAGE_LANG/.test(runtime),
  'readGoogTransLang prefers non-IT hash over cookie'
);
// ENN-185 launch freeze: live reads stay Italian even with leftover googtrans.
withGoogtransDom('googtrans=/it/it', '#googtrans(it|ja)', () => {
  assert(
    readGoogTransLang() === 'it',
    'freeze: stale cookie + ja hash → it (ENN-185)'
  );
});
withGoogtransDom('googtrans=/it/en', '', () => {
  assert(readGoogTransLang() === 'it', 'freeze: cookie-only en → it (ENN-185)');
});
withGoogtransDom('', '#googtrans(it|zh-CN)', () => {
  assert(readGoogTransLang() === 'it', 'freeze: hash-only zh-CN → it (ENN-185)');
});

// ENN-184 — SPA lang switch harden (no non-IT location.reload).
assert(
  runtime.includes('applyGoogleTranslateSpaSwitch') &&
    runtime.includes('registerGoogleTranslateHostRemount') &&
    runtime.includes('dispatchComboChange') &&
    runtime.includes('InputEvent'),
  'runtime exports SPA switch + remount + InputEvent combo fire'
);
assert(
  runtime.includes('comboMissStreak') &&
    /requestGoogleTranslateRefresh\(120\)/.test(runtime),
  'reapply retries when .goog-te-combo is missing'
);
assert(
  !/export async function applyGoogleTranslateSpaSwitch[\s\S]{0,1200}location\.reload/.test(
    runtime
  ),
  'applyGoogleTranslateSpaSwitch never calls location.reload'
);
assert(
  widget.includes('applyGoogleTranslateSpaSwitch') &&
    widget.includes('registerGoogleTranslateHostRemount'),
  'widget wires SPA switch + host remount'
);
assert(
  /if\s*\(\s*target\s*===\s*GT_PAGE_LANG\s*\)[\s\S]{0,280}location\.reload\(\)/.test(
    widget
  ),
  'IT restore still reloads'
);
assert(
  !/writeGoogtransCookie\(target\);[\s\S]{0,400}window\.location\.reload\(\)/.test(
    widget
  ),
  'non-IT applyGoogTransLang does not reload'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-148 / ENN-184 GT runtime assertions passed.');
