/**
 * ENN-159 — canonical GT codes + critical UI overrides (no browser GT).
 * Run: npx tsx scripts/assert-gt-codes-ui.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  GT_CRITICAL_IT,
  GT_CRITICAL_OVERRIDES,
  resolveGtCriticalLabel,
} from '../src/lib/gtCriticalUi.ts';
import {
  applyGtDocumentChrome,
  isGtRtlLang,
  normalizeGoogTransLang,
} from '../src/lib/gtLangCodes.ts';
import { normalizeNinaLang } from '../src/lib/ninaReplyLang.ts';

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

// --- Menu codes (static source — avoid importing React widget in Node) ---
const widget = readFileSync(
  path.join(root, 'src/components/GoogleTranslateWidget.tsx'),
  'utf8'
);
assert(widget.includes("code: 'zh-CN'"), 'menu has zh-CN');
assert(!/code:\s*'zh-TW'/.test(widget), 'menu has no zh-TW');
assert(widget.includes("code: 'ja'"), 'menu has ja');
assert(widget.includes("code: 'ar'"), 'menu has ar');
assert(widget.includes("code: 'hi'"), 'menu has hi');

// --- Canonical normalize ---
assert(normalizeGoogTransLang('zh-CN') === 'zh-CN', 'norm zh-CN');
assert(normalizeGoogTransLang('zh-TW') === 'zh-CN', 'norm zh-TW → zh-CN');
assert(normalizeGoogTransLang('zh-HK') === 'zh-CN', 'norm zh-HK → zh-CN');
assert(normalizeGoogTransLang('zh') === 'zh-CN', 'norm zh → zh-CN');
assert(normalizeGoogTransLang('ZH_CN') === 'zh-CN', 'norm ZH_CN → zh-CN');
assert(normalizeGoogTransLang('ja') === 'ja', 'norm ja');
assert(normalizeGoogTransLang('ar') === 'ar', 'norm ar');
assert(normalizeGoogTransLang('hi') === 'hi', 'norm hi');
assert(normalizeGoogTransLang('it') === 'it', 'norm it');

assert(normalizeNinaLang('zh-TW') === 'zh-cn', 'Nina zh-TW → zh-cn');
assert(normalizeNinaLang('zh-CN') === 'zh-cn', 'Nina zh-CN → zh-cn');
assert(normalizeNinaLang('ja') === 'ja', 'Nina ja');
assert(normalizeNinaLang('ar') === 'ar', 'Nina ar');
assert(normalizeNinaLang('hi') === 'hi', 'Nina hi');

assert(isGtRtlLang('ar'), 'ar is RTL');
assert(!isGtRtlLang('zh-CN'), 'zh-CN is not RTL');
assert(!isGtRtlLang('ja'), 'ja is not RTL');

// --- Critical UI map ---
const zhBook = resolveGtCriticalLabel('zh-CN', 'bookConsult');
assert(zhBook.useCurated, 'zh-CN Prenota uses curated override');
assert(zhBook.text.includes('预订'), 'zh-CN Prenota → 预订 (not 书)');
assert(!zhBook.text.includes('书'), 'zh-CN Prenota must not be bare 书');

const jaBook = resolveGtCriticalLabel('ja', 'bookSession');
assert(jaBook.useCurated && jaBook.text.includes('予約'), 'ja bookSession curated');

const arWelcome = resolveGtCriticalLabel('ar', 'welcomeMode');
assert(arWelcome.useCurated, 'ar Accoglienza curated');

const hiSend = resolveGtCriticalLabel('hi', 'sendBooking');
assert(hiSend.useCurated, 'hi Invia prenotazione curated');

const itBook = resolveGtCriticalLabel('it', 'bookConsult');
assert(!itBook.useCurated && itBook.text === GT_CRITICAL_IT.bookConsult, 'IT uses contextual source');

const enBook = resolveGtCriticalLabel('en', 'bookConsult');
assert(!enBook.useCurated && enBook.text === 'Prenota consulto', 'EN keeps longer IT for GT');

assert(
  GT_CRITICAL_OVERRIDES['zh-CN']?.bookConsult === '预订咨询',
  'zh-CN map bookConsult'
);

// --- Source wiring (static) ---
assert(widget.includes('normalizeGoogTransLang'), 'widget normalizes on apply');
assert(widget.includes('applyGtDocumentChrome'), 'widget applies dir/lang chrome');

const nav = readFileSync(
  path.join(root, 'src/components/NavigationChrome.tsx'),
  'utf8'
);
assert(nav.includes('GtCriticalLabel'), 'nav uses GtCriticalLabel');
assert(nav.includes('bookConsult'), 'nav desktop bookConsult');
assert(nav.includes('hidden md:inline-flex'), 'nav Prenota hidden below md (ENN-160)');

const bookFab = readFileSync(
  path.join(root, 'src/components/BookSessionFab.tsx'),
  'utf8'
);
assert(bookFab.includes('bookSession'), 'mobile shopper FAB uses bookSession (ENN-160)');
assert(bookFab.includes('ShoppingBag'), 'mobile shopper FAB is icon-only bag');
assert(bookFab.includes('md:hidden'), 'shopper FAB is mobile-only');

const chat = readFileSync(path.join(root, 'src/components/ChatFab.tsx'), 'utf8');
assert(chat.includes('welcomeMode'), 'Nina Accoglienza uses critical label');
assert(chat.includes('bookConsult'), 'Nina Prenota uses critical label');
assert(
  !chat.includes(
    'className="mb-2 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain rounded-xl border border-[#D4AF37]/12 bg-[#0F0D0B]/70 p-2.5 notranslate"'
  ),
  'Nina thread is not blanket-notranslate (ENN-158 preserved)'
);

assert(typeof applyGtDocumentChrome === 'function', 'applyGtDocumentChrome export');

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-159 GT codes / UI override assertions passed.');
