/**
 * ENN-148 / ENN-180 / ENN-184 — googtrans hash helpers + SPA switch harden.
 * Run: npx tsx scripts/assert-gt-spa-runtime.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GT_ENABLED } from '../src/lib/googleTranslateEnabled.ts';
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
// ENN-185 freeze vs ENN-203/204 live: when enabled, googtrans must be readable.
withGoogtransDom('googtrans=/it/it', '#googtrans(it|ja)', () => {
  assert(
    readGoogTransLang() === (GT_ENABLED ? 'ja' : 'it'),
    GT_ENABLED
      ? 'live: stale cookie + ja hash → ja (ENN-180/204)'
      : 'freeze: stale cookie + ja hash → it (ENN-185)'
  );
});
withGoogtransDom('googtrans=/it/en', '', () => {
  assert(
    readGoogTransLang() === (GT_ENABLED ? 'en' : 'it'),
    GT_ENABLED
      ? 'live: cookie-only en → en (ENN-204)'
      : 'freeze: cookie-only en → it (ENN-185)'
  );
});
withGoogtransDom('', '#googtrans(it|zh-CN)', () => {
  assert(
    readGoogTransLang() === (GT_ENABLED ? 'zh-CN' : 'it'),
    GT_ENABLED
      ? 'live: hash-only zh-CN → zh-CN (ENN-204)'
      : 'freeze: hash-only zh-CN → it (ENN-185)'
  );
});

// ENN-184 / ENN-205 — SPA lang switch (no location.reload for any target).
assert(
  runtime.includes('applyGoogleTranslateSpaSwitch') &&
    runtime.includes('applyGoogleTranslateSpaRestore') &&
    runtime.includes('registerGoogleTranslateHostRemount') &&
    runtime.includes('dispatchComboChange') &&
    runtime.includes('InputEvent'),
  'runtime exports SPA switch + IT restore + remount + InputEvent combo fire'
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
  !/export async function applyGoogleTranslateSpaRestore[\s\S]{0,1200}location\.reload/.test(
    runtime
  ),
  'applyGoogleTranslateSpaRestore never calls location.reload'
);
assert(
  widget.includes('applyGoogleTranslateSpaSwitch') &&
    widget.includes('applyGoogleTranslateSpaRestore') &&
    widget.includes('registerGoogleTranslateHostRemount'),
  'widget wires SPA switch + IT restore + host remount'
);
assert(
  !/\blocation\.reload\s*\(/.test(widget),
  'applyGoogTransLang never calls location.reload (ENN-205)'
);
assert(
  /if\s*\(\s*target\s*===\s*GT_PAGE_LANG\s*\)[\s\S]{0,480}applyGoogleTranslateSpaRestore/.test(
    widget
  ),
  'IT restore uses SPA restore path'
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
