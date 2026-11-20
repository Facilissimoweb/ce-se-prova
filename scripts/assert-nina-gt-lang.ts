/**
 * ENN-143 — googtrans lang → prompt suffix + soft-lock localization.
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
assert(normalizeNinaLang('en') === 'en', 'normalize en');
assert(normalizeNinaLang(undefined) === 'it', 'normalize default it');
assert(ninaReplyLangLabel('zh-CN').includes('中文'), 'label zh-CN');
assert(ninaReplyLangLabel('ja') === '日本語', 'label ja');

const itPrompt = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'ciao',
  lang: 'it',
});
assert(
  !itPrompt.includes('Lingua di risposta'),
  'italian has no reply-lang suffix'
);

const zhPrompt = buildNinaSystemPrompt({
  mode: 'welcome',
  message: 'ciao',
  lang: 'zh-CN',
});
assert(
  zhPrompt.includes('zh-cn') && zhPrompt.includes('中文'),
  'zh-CN prompt suffix present'
);
assert(
  !zhPrompt.includes('Rispondi SEMPRE in italiano'),
  'zh-CN must not fall back to Italian instruction'
);

assert(
  ninaStudioSoftLockReply('zh-CN').includes('欢迎'),
  'soft-lock zh'
);
assert(
  ninaStudioSoftLockReply('en').includes('welcome'),
  'soft-lock en'
);
assert(
  ninaStudioGateCopy('en').studioAuth.includes('Google'),
  'gate copy en'
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
    String(softBody.reply).includes('ウェルカム'),
  'ja soft-lock localized'
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nAll ENN-143 GT lang assertions passed.');
