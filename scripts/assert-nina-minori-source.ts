/**
 * ENN-200 — Minori Studio cards from luce/ombra pack + retrieval discipline.
 * Run: npx tsx scripts/assert-nina-minori-source.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildNinaSystemPrompt } from '../src/lib/groqChat.ts';
import { COURSE_PUBLIC_PRESENTED } from '../src/lib/coursePresentation.ts';
import {
  looksLikeDeepMinoriStudy,
  NINA_MINORI_CARDS,
  selectMinoriCardsForText,
  selectMinoriSuitFramesForText,
} from '../src/lib/ninaChatKnowledge.ts';

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

assert(NINA_MINORI_CARDS.length === 56, '56 Minori cards compiled');

const assoBastoni = NINA_MINORI_CARDS.find((c) => c.id === 'bastoni-asso');
assert(!!assoBastoni, 'Asso di Bastoni present');
assert(
  !!assoBastoni &&
    /Luce\/ombra/i.test(assoBastoni.body) &&
    /scintilla creativa/i.test(assoBastoni.body) &&
    /fuochi di paglia/i.test(assoBastoni.body),
  'Asso di Bastoni has luce + ombra from source pack'
);

const reginaSpade = NINA_MINORI_CARDS.find((c) => c.id === 'spade-regina');
assert(
  !!reginaSpade && /lucidit/i.test(reginaSpade.body) && /cinismo/i.test(reginaSpade.body),
  'Regina di Spade luce/ombra present'
);

assert(
  selectMinoriCardsForText('Parlami dell’Asso di Bastoni').some(
    (c) => c.id === 'bastoni-asso'
  ),
  'keyword match selects Asso di Bastoni'
);

assert(
  selectMinoriCardsForText('regina di spade luce e ombra').some(
    (c) => c.id === 'spade-regina'
  ),
  'regina di spade match'
);

const multi = selectMinoriCardsForText(
  'Asso di Bastoni, 3 di Coppe, Regina di Spade, Re di Denari e Fante di Bastoni'
);
assert(multi.length <= 3, 'Minori inject cap remains max 3');
assert(
  multi.some((c) => c.id === 'bastoni-asso') &&
    multi.some((c) => c.id === 'coppe-3'),
  'multi-match finds Asso Bastoni + 3 Coppe within cap'
);

const studioAsso = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Parlami dell’Asso di Bastoni',
  history: [],
});
assert(
  studioAsso.includes('### Asso di Bastoni') &&
    /scintilla creativa/i.test(studioAsso),
  'studio injects Asso di Bastoni body'
);
assert(
  /Arcani Minori/i.test(studioAsso),
  'studio prompt includes Minori frame'
);

const welcomeAsso = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'Parlami dell’Asso di Bastoni',
  history: [],
});
assert(
  !welcomeAsso.includes('### Asso di Bastoni'),
  'welcome mode does not inject Minori card bodies'
);
assert(
  looksLikeDeepMinoriStudy({ message: 'Parlami dell’Asso di Bastoni' }),
  'Asso di Bastoni ask triggers Minori soft-lock detector'
);

assert(
  !looksLikeDeepMinoriStudy({ message: 'Quanto costano i consulti?' }),
  'prices question is not deep Minori'
);

const suitOnly = selectMinoriSuitFramesForText(
  'Spiegami il seme dei Bastoni negli Arcani Minori'
);
assert(
  suitOnly.some((s) => s.id === 'bastoni'),
  'suit-only ask selects Bastoni frame'
);
assert(
  selectMinoriSuitFramesForText(
    'Il Bagatto dispone bastoni, coppe, spade e denari sul tavolo'
  ).length === 0,
  'Bagatto tool-list does not inject Minori suit frames'
);

assert(
  COURSE_PUBLIC_PRESENTED['arcani-minori'] === false,
  'public catalog keeps arcani-minori hidden'
);

const coursePresentationSrc = readFileSync(
  path.join(root, 'src/lib/coursePresentation.ts'),
  'utf8'
);
assert(
  /'arcani-minori':\s*false/.test(coursePresentationSrc),
  'coursePresentation source still flags arcani-minori false'
);

const sourceMd = readFileSync(
  path.join(root, 'content/nina/arcani-minori-luce-ombra.md'),
  'utf8'
);
assert(
  /Asso\b/.test(sourceMd) && /Denari/.test(sourceMd) && /Ombra/.test(sourceMd),
  'canonical Minori MD source present in repo'
);

assert(
  studioAsso.length < 28000,
  'studio single-Minori prompt stays under soft payload budget'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-200 Minori smoke assertions passed.');
