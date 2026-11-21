/**
 * ENN-148 / ENN-180 — googtrans hash helpers + readGoogTransLang priority.
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

// ENN-180 — non-IT hash must win over a stale /it/it cookie (combo blank-nudge).
assert(
  runtime.includes('fromHash') &&
    runtime.includes('fromCookie') &&
    /fromHash\s*&&\s*fromHash\s*!==\s*GT_PAGE_LANG/.test(runtime),
  'readGoogTransLang prefers non-IT hash over cookie'
);
withGoogtransDom('googtrans=/it/it', '#googtrans(it|ja)', () => {
  assert(
    readGoogTransLang() === 'ja',
    'stale /it/it cookie + ja hash → ja (ENN-180)'
  );
});
withGoogtransDom('googtrans=/it/en', '', () => {
  assert(readGoogTransLang() === 'en', 'cookie-only en still works');
});
withGoogtransDom('', '#googtrans(it|zh-CN)', () => {
  assert(readGoogTransLang() === 'zh-CN', 'hash-only zh-CN');
});

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-148 GT runtime assertions passed.');
