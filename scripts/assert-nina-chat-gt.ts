/**
 * ENN-158 / ENN-165 — Nina chat chrome + welcome follow Google Translate.
 * Static source checks (no browser GT). Run: npx tsx scripts/assert-nina-chat-gt.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const chatFab = readFileSync(
  path.join(root, 'src/components/ChatFab.tsx'),
  'utf8'
);

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
  !chatFab.includes('greetingI18nLang'),
  'no greetingI18nLang EN fallback for JA'
);
assert(
  chatFab.includes("getFixedT('it', 'common')"),
  'seed greeting uses Italian getFixedT'
);
assert(
  !/getFixedT\(\s*greetingI18nLang/.test(chatFab),
  'getFixedT is not driven by GT→EN fallback'
);
assert(
  chatFab.includes("getFixedT('it', 'common')") &&
    /tIt\(['"]cta\.talkMaria['"]\)/.test(chatFab) &&
    /tIt\(['"]nina\.subtitleAvailable['"]\)/.test(chatFab) &&
    /tIt\(['"]nina\.modeStudio['"]\)/.test(chatFab),
  'visible Nina chrome uses Italian tIt / getFixedT (ENN-161 — no EN i18n fallback)'
);
assert(
  !/\bt\(\s*['"]nina\./.test(chatFab) && !/\bt\(\s*['"]cta\.talkMaria/.test(chatFab),
  'ChatFab does not call live-locale t() for Nina chrome keys'
);
assert(
  chatFab.includes('GtSafeBoundary') && chatFab.includes('panelEpoch'),
  'Studio mode remount + GtSafeBoundary prevent GT blank screen (ENN-161)'
);
assert(
  chatFab.includes('requestGoogleTranslateRefresh'),
  'opens panel with GT refresh'
);
assert(
  /panelKey\s*=\s*`nina-\$\{gtLang\}/.test(chatFab) ||
    chatFab.includes('nina-${gtLang}-'),
  'panelKey includes googtrans gtLang (ENN-165 remount)'
);
assert(
  chatFab.includes('GT_REFRESH_EVENT') && chatFab.includes('syncGtLang'),
  'syncs googtrans lang for chrome remount + Groq'
);
assert(
  chatFab.includes('turn.skipGt === true') &&
    chatFab.includes('.map(({ role, content })'),
  'Groq history omits Italian seed (skipGt-only) so replies track lang'
);
assert(
  chatFab.includes('Scrivi qui'),
  'placeholder chrome remains Italian source «Scrivi qui…»'
);
assert(
  !/placeholder\s*=\s*["']Scrivi qui/.test(chatFab),
  'Scrivi qui is not an HTML placeholder attr (GT cannot translate attrs)'
);
assert(
  chatFab.includes('skipGt'),
  'per-bubble skipGt for API replies'
);

// Thread container must NOT blanket-notranslate the seed welcome.
const threadOpen = chatFab.match(
  /ref=\{threadRef\}[\s\S]{0,280}?aria-live="polite"/
)?.[0];
assert(Boolean(threadOpen), 'threadRef container found');
assert(
  threadOpen !== undefined && !threadOpen.includes('notranslate'),
  'thread container itself is not notranslate'
);
assert(
  threadOpen !== undefined && !/translate\s*=/.test(threadOpen),
  'thread container has no translate=no'
);

assert(
  chatFab.includes('notranslate'),
  'API/user bubbles can still opt into notranslate via skipGt'
);

assert(
  chatFab.includes("Accoglienza") ||
    chatFab.includes("nina.modeWelcome") ||
    chatFab.includes("nina.subtitleAvailable"),
  'chrome still uses Italian i18n keys'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-158 Nina chat GT assertions passed.');
