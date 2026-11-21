/**
 * ENN-137 — smoke: welcome vs studio prompt split + soft-lock detector.
 * Run: npx tsx scripts/assert-nina-studio-split.ts
 */
import { buildNinaSystemPrompt } from '../src/lib/groqChat.ts';
import {
  looksLikeDeepMaggioriStudy,
  NINA_STUDIO_SOFT_LOCK_REPLY,
  selectMaggioriCardsForText,
} from '../src/lib/ninaChatKnowledge.ts';

let failed = 0;

function assert(cond: boolean, label: string) {
  if (!cond) {
    console.error('FAIL:', label);
    failed += 1;
  } else {
    console.log('PASS:', label);
  }
}

const welcomePrices = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'Quanto costano i consulti?',
  history: [],
});
assert(
  welcomePrices.includes('Accoglienza') || welcomePrices.includes('accoglienza'),
  'welcome persona mentions accoglienza'
);
assert(
  !welcomePrices.includes('### 0. Il Matto'),
  'welcome prices prompt has no Matto card body'
);
assert(
  welcomePrices.includes('€19') && welcomePrices.includes('WhatsApp'),
  'welcome keeps prices + WhatsApp'
);
assert(
  welcomePrices.includes('Chi sono') || welcomePrices.includes('Mappa del sito'),
  'welcome includes Chi sono / site map knowledge'
);
assert(
  !looksLikeDeepMaggioriStudy({ message: 'Quanto costano i consulti?' }),
  'prices question is not deep Maggiori'
);

const welcomeMatto = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'Com’è visivamente l’arcano del Matto?',
  history: [],
});
assert(
  !welcomeMatto.includes('### 0. Il Matto —'),
  'welcome Matto ask still has no injected card (mode=welcome)'
);
assert(
  looksLikeDeepMaggioriStudy({
    message: 'Com’è visivamente l’arcano del Matto?',
  }),
  'Matto visual ask triggers deep-study detector'
);
assert(
  selectMaggioriCardsForText('Com’è visivamente l’arcano del Matto?').some(
    (c) => c.id === 0
  ),
  'Matto keyword selects card 0'
);

const studioMatto = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Com’è visivamente l’arcano del Matto?',
  history: [],
});
assert(
  studioMatto.includes('Nina Studio') || studioMatto.includes('studio'),
  'studio persona present'
);
assert(
  studioMatto.includes('### 0. Il Matto'),
  'studio injects Matto card'
);
assert(
  studioMatto.includes('Waite') || studioMatto.includes('rosa bianca'),
  'studio Matto has Waite cues'
);
assert(
  studioMatto.includes('Dialogo Tarot'),
  'studio keeps Dialogo separation note'
);

assert(
  NINA_STUDIO_SOFT_LOCK_REPLY.includes('Nina Studio') &&
    NINA_STUDIO_SOFT_LOCK_REPLY.includes('Arcani Maggiori'),
  'soft-lock copy names Studio + Maggiori course'
);

const welcomeZh = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'Quanto costano i consulti?',
  history: [],
  lang: 'zh-CN',
});
assert(
  /Rispondi sempre in italiano/i.test(welcomeZh),
  'welcome zh-CN still forces Italian (ENN-188)'
);
assert(
  !welcomeZh.includes('### 0. Il Matto'),
  'welcome zh still has no Maggiori card inject'
);

const studioEn = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Com’è visivamente l’arcano del Matto?',
  history: [],
  lang: 'en',
});
assert(
  /Rispondi sempre in italiano/i.test(studioEn) &&
    studioEn.includes('### 0. Il Matto'),
  'studio EN injects Maggiori + Italian-only (ENN-188)'
);
assert(
  welcomePrices.includes('una voce per riga') ||
    welcomePrices.includes('elenco markdown'),
  'welcome instructs markdown bullet lists for prices'
);

assert(
  !looksLikeDeepMaggioriStudy({
    message: 'Come prenoto su WhatsApp?',
  }),
  'WhatsApp booking is not deep Maggiori'
);

console.log('\n--- sizes ---');
console.log('welcome prices chars:', welcomePrices.length);
console.log('studio Matto chars:', studioMatto.length);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-137 smoke assertions passed.');
