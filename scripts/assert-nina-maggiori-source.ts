/**
 * ENN-147 — Maggiori Studio cards compiled from didactic sources + 413 discipline.
 * Run: npx tsx scripts/assert-nina-maggiori-source.ts
 */
import { buildNinaSystemPrompt } from '../src/lib/groqChat.ts';
import {
  looksLikeDeepMaggioriStudy,
  NINA_MAGGIORI_CARDS,
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

assert(NINA_MAGGIORI_CARDS.length === 22, '22 Trionfi compiled');

const diavolo = NINA_MAGGIORI_CARDS.find((c) => c.id === 15);
assert(!!diavolo, 'Il Diavolo card present');
assert(
  !!diavolo &&
    /Ombra/i.test(diavolo.body) &&
    /dipenden|materi|denaro|falsi poteri|manipol/i.test(diavolo.body) &&
    /Previsione/i.test(diavolo.body),
  'Diavolo body has dispensa-depth senso + previsione'
);
assert(
  !!diavolo &&
    (/Pratica corso/i.test(diavolo.body) || /consenzient/i.test(diavolo.body)),
  'Diavolo enriched from Area Personale approfondimenti/pratica'
);
assert(
  !!diavolo && !/\*\*Waite\*\*/i.test(diavolo.body),
  'Diavolo has no invented Waite block'
);

const matto = NINA_MAGGIORI_CARDS.find((c) => c.id === 0);
assert(
  !!matto && /\*\*Waite\*\*/i.test(matto.body) && /Luce\/ombra/i.test(matto.body),
  'Matto keeps Waite + luce/ombra from scheda visiva'
);

assert(
  selectMaggioriCardsForText('Parlami del Diavolo').some((c) => c.id === 15),
  'keyword match selects Diavolo'
);

const studioDiavolo = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Parlami del Diavolo',
  history: [],
});
assert(
  studioDiavolo.includes('### XV. Il Diavolo') ||
    studioDiavolo.includes('Il Diavolo'),
  'studio injects Diavolo for smoke prompt'
);
assert(
  /dipenden|falsi poteri|manipol|denaro|catene|Ombra/i.test(studioDiavolo),
  'studio Diavolo prompt carries substantive didactic cues'
);
assert(
  !studioDiavolo.includes('### 0. Il Matto') ||
    selectMaggioriCardsForText('Parlami del Diavolo').length === 1,
  'Diavolo-only ask does not inject unrelated Trionfi'
);

const welcomeDiavolo = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'Parlami del Diavolo',
  history: [],
});
assert(
  !welcomeDiavolo.includes('### XV. Il Diavolo'),
  'welcome mode does not inject Maggiori Diavolo card'
);
assert(
  looksLikeDeepMaggioriStudy({ message: 'Parlami del Diavolo' }),
  'Diavolo ask still triggers soft-lock detector for non-entitled'
);

const multi = selectMaggioriCardsForText(
  'Parlami del Diavolo, della Torre e delle Stelle e anche del Sole'
);
assert(multi.length <= 3, 'inject cap remains max 3');
assert(
  multi.some((c) => c.id === 15) && multi.some((c) => c.id === 16),
  'multi-match still finds Diavolo + Torre within cap'
);

// Payload discipline: studio single-card should stay well under prior full dump (~28k).
assert(
  studioDiavolo.length < 22000,
  `studio Diavolo prompt under 22k chars (got ${studioDiavolo.length})`
);

const studioEn = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Parlami del Diavolo',
  history: [],
  lang: 'en',
});
assert(
  /Rispondi sempre in italiano/i.test(studioEn) && /Diavolo/i.test(studioEn),
  'studio EN keeps Diavolo inject + Italian-only (ENN-188)'
);

console.log('\n--- sizes ---');
console.log('Diavolo body chars:', diavolo?.body.length ?? 0);
console.log('studio Diavolo prompt chars:', studioDiavolo.length);
console.log('welcome Diavolo prompt chars:', welcomeDiavolo.length);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-147 Maggiori-source assertions passed.');
