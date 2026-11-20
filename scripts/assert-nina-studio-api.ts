/**
 * ENN-137 — API soft-lock + studio auth gate (no Groq key required).
 * Run: npx tsx scripts/assert-nina-studio-api.ts
 */
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

async function main() {
  const soft = await postChatMessage({
    body: { message: 'Com’è visivamente l’arcano del Matto?', mode: 'welcome' },
  });
  const softBody = soft.body as Record<string, unknown>;
  assert(soft.status === 200, 'soft-lock HTTP 200');
  assert(softBody.code === 'studio_locked', 'soft-lock code studio_locked');
  assert(softBody.locked === true, 'soft-lock locked=true');
  assert(
    typeof softBody.reply === 'string' &&
      String(softBody.reply).includes('Nina Studio'),
    'soft-lock reply mentions Nina Studio'
  );

  const softZh = await postChatMessage({
    body: {
      message: 'Com’è visivamente l’arcano del Matto?',
      mode: 'welcome',
      lang: 'zh-CN',
    },
  });
  const softZhBody = softZh.body as Record<string, unknown>;
  assert(softZh.status === 200, 'soft-lock zh HTTP 200');
  assert(
    typeof softZhBody.reply === 'string' &&
      String(softZhBody.reply).includes('欢迎'),
    'soft-lock zh reply is Chinese'
  );

  const prices = await postChatMessage({
    body: { message: 'Quanto costano i consulti?', mode: 'welcome' },
  });
  // Without Groq key → 503 missing_key; with key would be 200 reply.
  // Either way it must NOT be studio_locked.
  const pricesBody = prices.body as Record<string, unknown>;
  assert(
    pricesBody.code !== 'studio_locked',
    'prices question is not soft-locked'
  );

  const denied = await postChatMessage({
    body: { message: 'ciao', mode: 'studio', lang: 'en' },
  });
  const deniedBody = denied.body as Record<string, unknown>;
  assert(denied.status === 401, 'studio without auth → 401');
  assert(deniedBody.code === 'studio_auth', 'studio without auth → studio_auth');
  assert(
    typeof deniedBody.error === 'string' &&
      String(deniedBody.error).toLowerCase().includes('google') &&
      String(deniedBody.error).toLowerCase().includes('sign in'),
    'studio auth error localized (en)'
  );

  if (failed > 0) {
    console.error(`\n${failed} assertion(s) failed`);
    process.exit(1);
  }
  console.log('\nAll ENN-137/ENN-143 API gate assertions passed.');
}

void main();
