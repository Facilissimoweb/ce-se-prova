/**
 * ENN-143 / ENN-188 — Nina Italian-only (no googtrans reply-lang path).
 * Run: npx tsx scripts/assert-nina-gt-lang.ts
 */
import { buildNinaSystemPrompt } from '../src/lib/groqChat.ts';
import { ninaStudioSoftLockReply } from '../src/lib/ninaChatKnowledge.ts';
import {
  normalizeNinaLang,
  ninaReplyLangLabel,
  ninaStudioGateCopy,
} from '../src/lib/ninaReplyLang.ts';
import { postChatMessage } from '../src/server/routes/chat.ts';

let failed = 0;
function assert(cond: boolean, label: string) {
  if (!cond) {
    console.error('FAIL:', label);
    failed += 1;
  } else {
    console.log('PASS:', label);
  }
}

assert(normalizeNinaLang('zh-CN') === 'zh-cn', 'normalize zh-CN → zh-cn');
assert(normalizeNinaLang('ZH_CN') === 'zh-cn', 'normalize ZH_CN → zh-cn');
assert(normalizeNinaLang('zh-TW') === 'zh-cn', 'ENN-159 zh-TW → zh-cn (Simplified only)');
assert(normalizeNinaLang('en') === 'en', 'normalize en');
assert(normalizeNinaLang('hi') === 'hi', 'normalize hi');
assert(normalizeNinaLang(undefined) === 'it', 'normalize default it');
assert(ninaReplyLangLabel('zh-CN').includes('中文'), 'label zh-CN (PDF path)');
assert(ninaReplyLangLabel('ja') === '日本語', 'label ja (PDF path)');
assert(ninaReplyLangLabel('ar') === 'العربية', 'label ar (PDF path)');

const itPrompt = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'ciao',
  lang: 'it',
});
assert(
  /Rispondi sempre in italiano/i.test(itPrompt),
  'italian prompt forces Rispondi sempre in italiano'
);
assert(
  !itPrompt.includes('Lingua di risposta (ENN-143'),
  'no googtrans reply-lang suffix'
);

const zhPrompt = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'ciao',
  lang: 'zh-CN',
});
assert(
  /Rispondi sempre in italiano/i.test(zhPrompt),
  'zh-CN client lang still forces Italian (ENN-188)'
);
assert(
  !zhPrompt.includes('中文') || zhPrompt.includes('Rispondi sempre in italiano'),
  'no Chinese reply instruction in Nina prompt'
);
assert(
  !/Rispondi SEMPRE e SOLO in/.test(zhPrompt),
  'no ENN-143 target-language suffix'
);

const enPrompt = buildNinaSystemPrompt({
  mode: 'studio',
  message: 'ciao',
  lang: 'en',
});
assert(
  /Rispondi sempre in italiano/i.test(enPrompt) &&
    !enPrompt.includes('## Lingua di risposta (ENN-143'),
  'en client lang still Italian-only (ENN-188)'
);

assert(
  ninaStudioSoftLockReply('zh-CN').includes('accoglienza'),
  'soft-lock always IT (zh ignored)'
);
assert(
  ninaStudioSoftLockReply('en').includes('accoglienza'),
  'soft-lock always IT (en ignored)'
);
assert(
  ninaStudioGateCopy('en').studioAuth.includes('Area Riservata'),
  'gate copy always IT'
);

const soft = await postChatMessage({
  body: {
    message: 'Simbologia del Matto Waite',
    mode: 'welcome',
    lang: 'ja',
  },
});
const softBody = soft.body as Record<string, unknown>;
assert(soft.status === 200, 'ja soft-lock 200');
assert(
  typeof softBody.reply === 'string' &&
    String(softBody.reply).includes('accoglienza'),
  'soft-lock Italian even when client sends ja'
);
assert(
  typeof softBody.reply === 'string' &&
    !String(softBody.reply).includes('ウェルカム'),
  'no Japanese soft-lock copy'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-188 Nina IT-only lang assertions passed.');
