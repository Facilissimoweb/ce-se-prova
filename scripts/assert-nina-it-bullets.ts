/**
 * ENN-188 — Nina Italian-only prompt + markdown list parsing.
 * Run: npx tsx scripts/assert-nina-it-bullets.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildNinaSystemPrompt } from '../src/lib/groqChat.ts';
import { parseNinaMessageBlocks } from '../src/lib/ninaMessageBlocks.ts';
import { NINA_CHAT_SITE_KNOWLEDGE } from '../src/lib/ninaChatKnowledge.ts';

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

const prompt = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'prezzi',
  lang: 'en',
});
assert(
  /Rispondi sempre in italiano/i.test(prompt),
  'system prompt forces Italian even when lang=en'
);
assert(
  !prompt.includes('Google Traduttore') &&
    !prompt.includes('ENN-143 · Google Translate'),
  'no googtrans / ENN-143 reply-lang suffix'
);
assert(
  prompt.includes('€22') &&
    prompt.includes('€49') &&
    prompt.includes('€79') &&
    prompt.includes('€99'),
  'keeps consult prices €22/49/79/99'
);
assert(
  /solo online/i.test(prompt) && /Breve/.test(prompt),
  'keeps Consulto Breve solo online'
);
assert(
  /Maggiori/.test(prompt) && /Minori/.test(prompt),
  'keeps Maggiori + Minori'
);
assert(
  prompt.includes('Parla con Maria Teresa'),
  'keeps CTA Parla con Maria Teresa'
);
assert(
  /una voce per riga|elenco markdown/i.test(prompt),
  'instructs markdown bullet lists for prices'
);
assert(
  NINA_CHAT_SITE_KNOWLEDGE.includes('- **Consulto Breve**'),
  'knowledge emits Breve as markdown bullet'
);

const newlineList = parseNinaMessageBlocks(`Ecco i prezzi:

- **Consulto Breve** · 20 min · **€22** (solo online)
- **Consulto Essenziale** · 45 min · **€49**
- **Consulto Evolutivo Completo** · 60 min · **€79**
- **Sessione Integrata** · 90 min · **€99**

In ogni sessione Maggiori e Minori.`);
assert(newlineList.length === 3, 'newline list → intro + ul + outro');
assert(
  newlineList[0]?.type === 'paragraph' &&
    newlineList[1]?.type === 'list' &&
    newlineList[1].ordered === false &&
    newlineList[1].items.length === 4 &&
    newlineList[2]?.type === 'paragraph',
  'newline bullets become a 4-item unordered list'
);
assert(
  newlineList[1]?.type === 'list' &&
    newlineList[1].items[0].includes('€22') &&
    newlineList[1].items[3].includes('€99'),
  'list items preserve prices'
);

const starList = parseNinaMessageBlocks(`* uno
* due`);
assert(
  starList.length === 1 &&
    starList[0]?.type === 'list' &&
    starList[0].items.length === 2,
  'supports * bullets'
);

const numbered = parseNinaMessageBlocks(`1. primo
2. secondo`);
assert(
  numbered.length === 1 &&
    numbered[0]?.type === 'list' &&
    numbered[0].ordered === true &&
    numbered[0].items.length === 2,
  'supports numbered lists'
);

const dense = parseNinaMessageBlocks(
  'consult prices with Maria Teresa: - **Consulto Breve** - 20 min, **€22** (solo online) - **Consulto Essenziale** - 45 min, **€49** (online o di persona) - **Consulto Evolutivo Completo** - 60 min, **€79** (online o di persona) - **Sessione Integrata** - 90 min, **€99** (online o di persona)'
);
assert(
  dense.some((b) => b.type === 'list' && b.items.length === 4),
  'dense hyphen paragraph splits into 4 list items'
);

const bodySrc = readFileSync(
  path.join(root, 'src/components/chat/NinaMessageBody.tsx'),
  'utf8'
);
assert(
  bodySrc.includes('parseNinaMessageBlocks') && bodySrc.includes('ListTag'),
  'NinaMessageBody uses block parser + list tags'
);
assert(
  bodySrc.includes('list-disc') && bodySrc.includes('list-decimal'),
  'list styles for bullets and numbers'
);
const blocksSrc = readFileSync(
  path.join(root, 'src/lib/ninaMessageBlocks.ts'),
  'utf8'
);
assert(
  blocksSrc.includes('expandDenseHyphenParagraph') &&
    blocksSrc.includes('UL_ITEM'),
  'block parser handles dense hyphens + ul markers'
);

const fab = readFileSync(
  path.join(root, 'src/components/ChatFab.tsx'),
  'utf8'
);
assert(/lang:\s*'it'/.test(fab), 'ChatFab posts lang it');

const chatRoute = readFileSync(
  path.join(root, 'src/server/routes/chat.ts'),
  'utf8'
);
assert(
  chatRoute.includes("const lang = 'it'") &&
    !chatRoute.includes('normalizeNinaLang'),
  'chat route forces lang it'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-188 Nina IT + bullets assertions passed.');
