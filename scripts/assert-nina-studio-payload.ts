/**
 * ENN-235 / ENN-236 — Studio Groq payload hard-caps (system + JSON ceiling).
 * Run: npx tsx scripts/assert-nina-studio-payload.ts
 */
import {
  buildNinaSystemPrompt,
  estimateGroqChatPayloadBytes,
  GROQ_CHAT_PAYLOAD_JSON_CEILING,
  STUDIO_SYSTEM_CHAR_CEILING,
  trimMessagesToPayloadCeiling,
  type GroqChatMessage,
} from '../src/lib/groqChat.ts';
import {
  NINA_CHAT_SITE_KNOWLEDGE,
  NINA_CHAT_SITE_KNOWLEDGE_STUDIO_SLIM,
  selectBlogPostsForText,
  selectMaggioriCardsForText,
} from '../src/lib/ninaChatKnowledge.ts';
import { ninaSoftOutageCopy } from '../src/lib/ninaReplyLang.ts';

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
  NINA_CHAT_SITE_KNOWLEDGE_STUDIO_SLIM.length < 2_500,
  `studio slim site under 2.5k (got ${NINA_CHAT_SITE_KNOWLEDGE_STUDIO_SLIM.length})`
);
assert(
  NINA_CHAT_SITE_KNOWLEDGE_STUDIO_SLIM.length <
    NINA_CHAT_SITE_KNOWLEDGE.length / 3,
  'studio slim site is much smaller than full FAQ'
);

const studioCiao = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Ciao Nina',
  history: [],
});
assert(
  studioCiao.length < STUDIO_SYSTEM_CHAR_CEILING,
  `studio greeting under system ceiling (got ${studioCiao.length})`
);
assert(
  !studioCiao.includes('## FAQ Home') &&
    !studioCiao.includes('## FAQ Consulti'),
  'studio greeting does not dump full FAQ'
);
assert(
  studioCiao.includes('Materiale Studio') ||
    studioCiao.includes('on-demand'),
  'studio greeting keeps on-demand hint'
);

const studioDiavolo = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Parlami del Diavolo: simbologia, senso, luce/ombra e previsione',
  history: [],
});
assert(
  studioDiavolo.includes('Il Diavolo') &&
    /Simbologia|senso|Ombra|Previsione/i.test(studioDiavolo),
  'studio fuller Maggiori ask still injects didactic Diavolo card'
);
assert(
  studioDiavolo.length < STUDIO_SYSTEM_CHAR_CEILING,
  `studio Diavolo under system ceiling (got ${studioDiavolo.length})`
);
assert(
  /strutturato e completo/i.test(studioDiavolo) &&
    /NON\*\* chiedere di fare una domanda più breve/i.test(studioDiavolo),
  'studio persona prefers composed answers over shorter-question nudge'
);

const studioPamela = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Parlami di Pamela Colman Smith Pixie nel blog',
  history: [],
});
assert(
  studioPamela.includes('/news/pamela-colman-smith-artista'),
  'studio Pamela still cites /news/…'
);
assert(
  !studioPamela.includes('### XV. Il Diavolo') &&
    !studioPamela.includes('### 0. Il Matto —'),
  'studio Pamela blog ask does not dump Maggiori card bodies'
);

const multiHay =
  'Approfondimento blog del Matto e del Bagatto, più Asso di Bastoni e Pamela Colman Smith';
assert(
  selectBlogPostsForText(multiHay, 1).length <= 1,
  'budgeted blog select caps at 1'
);
assert(
  selectMaggioriCardsForText(multiHay, 2).length <= 2,
  'budgeted Maggiori select caps at 2'
);

const studioMulti = buildNinaSystemPrompt({
  mode: 'studio',
  message: multiHay,
  history: [],
});
assert(
  studioMulti.length < STUDIO_SYSTEM_CHAR_CEILING,
  `studio multi-topic under system ceiling (got ${studioMulti.length})`
);

const fatHistory = Array.from({ length: 12 }, (_, i) => ({
  role: (i % 2 === 0 ? 'user' : 'assistant') as 'user' | 'assistant',
  content: `turno ${i} ${'x'.repeat(2000)}`,
}));
const studioFat = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Spiegami il Matto in modo completo e strutturato',
  history: fatHistory,
});
assert(
  studioFat.length <= STUDIO_SYSTEM_CHAR_CEILING,
  `studio with fat history still ≤ system ceiling (got ${studioFat.length})`
);

const messages: GroqChatMessage[] = [
  { role: 'system', content: studioFat },
  ...fatHistory.map((t) => ({
    role: t.role,
    content: t.content.slice(0, 900),
  })),
  { role: 'user', content: 'Spiegami il Matto in modo completo e strutturato' },
];
const trimmed = trimMessagesToPayloadCeiling(messages);
const bytes = estimateGroqChatPayloadBytes({ messages: trimmed });
assert(
  bytes <= GROQ_CHAT_PAYLOAD_JSON_CEILING,
  `trimmed Groq JSON ≤ ${GROQ_CHAT_PAYLOAD_JSON_CEILING} (got ${bytes})`
);
assert(
  trimmed[0]?.role === 'system' &&
    trimmed[trimmed.length - 1]?.role === 'user',
  'trim keeps system + latest user'
);

const studioPrices = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'Quanto costano i consulti e quali sono le FAQ etiche?',
  history: [],
});
assert(
  studioPrices.includes('## FAQ Home') ||
    studioPrices.includes('Domande Frequenti'),
  'studio prezzi/FAQ ask loads full site knowledge'
);

const welcome = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'Ciao',
  history: [],
});
assert(
  welcome.includes('## FAQ Home') || welcome.includes('Accoglienza'),
  'welcome Accoglienza stays on full light FAQ path'
);
assert(
  !welcome.includes('### Schede iniettate') &&
    !welcome.includes('Sintesi pack'),
  'welcome never gets Studio pack dumps'
);

const tooBroad = ninaSoftOutageCopy('it').tooBroad;
assert(
  !/più breve|piu breve|troppo ampia/i.test(tooBroad),
  'payload fallback does not tell user to ask a shorter question'
);
assert(
  /Riprova|WhatsApp/i.test(tooBroad),
  'payload fallback offers retry / contact'
);

console.log('\n--- sizes ---');
console.log('slim site:', NINA_CHAT_SITE_KNOWLEDGE_STUDIO_SLIM.length);
console.log('full site:', NINA_CHAT_SITE_KNOWLEDGE.length);
console.log('studio ciao:', studioCiao.length);
console.log('studio Diavolo:', studioDiavolo.length);
console.log('studio Pamela:', studioPamela.length);
console.log('studio multi:', studioMulti.length);
console.log('trimmed JSON bytes:', bytes);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-235/ENN-236 Studio payload assertions passed.');
