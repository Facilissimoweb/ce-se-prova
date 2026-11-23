/**
 * ENN-152 — unclear/rephrase UX; no Groq/Grok in user-facing chat errors.
 * Run: npx tsx scripts/assert-nina-rephrase.ts
 */
import { buildNinaSystemPrompt } from '../src/lib/groqChat.ts';
import {
  looksLikeNinaProviderLeak,
  ninaSoftOutageCopy,
  ninaUnclearIntentReply,
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

function assertNoProviderLeak(text: string, label: string) {
  const lower = text.toLowerCase();
  assert(!/\bgroq\b/.test(lower), `${label}: no "groq"`);
  assert(!/\bgrok\b/.test(lower), `${label}: no "grok"`);
  assert(
    !/tarotitaliachatgenericagroq/.test(lower),
    `${label}: no env key name`
  );
  assert(!/api[_ -]?key/.test(lower), `${label}: no api key wording`);
}

async function main() {
  const unclearIt = ninaUnclearIntentReply('it');
  assert(
    /riformul/i.test(unclearIt) && /Arcano/i.test(unclearIt),
    'unclear IT asks to riformulare + Arcano'
  );
  assertNoProviderLeak(unclearIt, 'unclear IT');

  const unclearEn = ninaUnclearIntentReply('en');
  assert(
    /riformul/i.test(unclearEn) && /Arcano/i.test(unclearEn),
    'unclear EN client still Italian (ENN-188)'
  );
  assertNoProviderLeak(unclearEn, 'unclear EN→IT');

  const outage = ninaSoftOutageCopy('it');
  assertNoProviderLeak(outage.unavailable, 'outage.unavailable');
  assertNoProviderLeak(outage.temporary, 'outage.temporary');
  assertNoProviderLeak(outage.tooBroad, 'outage.tooBroad');
  assert(
    /Riprova|WhatsApp|Arcano/i.test(outage.tooBroad) &&
      !/più breve|troppo ampia/i.test(outage.tooBroad),
    'tooBroad soft-retry without shorter-question nudge (ENN-236)'
  );

  assert(looksLikeNinaProviderLeak('problema con Groq'), 'detect Groq leak');
  assert(looksLikeNinaProviderLeak('Grok rate limit'), 'detect Grok leak');
  assert(looksLikeNinaProviderLeak(''), 'empty is leak/confused');
  assert(
    !looksLikeNinaProviderLeak('I consulti costano €19, €50, €75 e €90.'),
    'normal FAQ reply is not a leak'
  );

  const welcomePrompt = buildNinaSystemPrompt({
    message: '???',
    mode: 'welcome',
  });
  assert(
    /riformulare/i.test(welcomePrompt) && /Groq\/Grok/i.test(welcomePrompt),
    'welcome persona asks rephrase and forbids Groq/Grok naming'
  );

  // Without Groq key → soft unavailable (no provider names in JSON body).
  const missing = await postChatMessage({
    body: { message: 'Quanto costano i consulti?', mode: 'welcome' },
  });
  const missingBody = missing.body as Record<string, unknown>;
  if (missingBody.available === false) {
    assert(missing.status === 503, 'missing key → 503');
    assert(missingBody.code === 'missing_key', 'missing key → missing_key');
    assert(
      typeof missingBody.error === 'string',
      'missing key returns error string'
    );
    assertNoProviderLeak(String(missingBody.error), 'missing_key error');
  } else {
    // Key present in this env — skip unavailable branch.
    console.log('SKIP: Groq key present — unavailable soft-copy not exercised');
  }

  // Studio gating still intact (ENN-137) and still localized.
  const denied = await postChatMessage({
    body: { message: 'ciao', mode: 'studio', lang: 'en' },
  });
  const deniedBody = denied.body as Record<string, unknown>;
  assert(denied.status === 401, 'studio gate still 401 without auth');
  assert(deniedBody.code === 'studio_auth', 'studio gate code unchanged');
  assertNoProviderLeak(String(deniedBody.error || ''), 'studio_auth error');

  // Soft-lock + lang still work (ENN-143).
  const soft = await postChatMessage({
    body: {
      message: 'Com’è visivamente l’arcano del Matto?',
      mode: 'welcome',
      lang: 'it',
    },
  });
  const softBody = soft.body as Record<string, unknown>;
  assert(softBody.code === 'studio_locked', 'studio soft-lock still works');
  assertNoProviderLeak(String(softBody.reply || ''), 'soft-lock reply');

  if (failed > 0) {
    console.error(`\n${failed} assertion(s) failed`);
    process.exit(1);
  }
  console.log('\nAll ENN-152 Nina rephrase assertions passed.');
}

void main();
