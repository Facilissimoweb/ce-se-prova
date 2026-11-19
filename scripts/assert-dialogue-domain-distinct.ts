/**
 * ENN-112 — Assert that for every Maggiore, Dialogo Amore ≠ Lavoro
 * after stripping block labels (so wrappers alone do not count as distinct).
 *
 * Usage: npx tsx scripts/assert-dialogue-domain-distinct.ts
 */
import {
  MAJOR_ARCANA,
  buildArcanaDialogueReply,
  loveAndWorkRepliesDiffer,
  normalizeDialogueReplyContent,
} from '../src/data/majorArcana';

const failures: string[] = [];

for (const card of MAJOR_ARCANA) {
  const missing = (
    [
      ['loveFuture', card.loveFuture],
      ['workFuture', card.workFuture],
      ['loveAdvice', card.loveAdvice],
      ['workAdvice', card.workAdvice],
    ] as const
  ).filter(([, value]) => !value?.trim());

  if (missing.length > 0) {
    failures.push(
      `${card.name} (${card.numeral}): missing ${missing.map(([k]) => k).join(', ')}`
    );
    continue;
  }

  if (!loveAndWorkRepliesDiffer(card)) {
    const love = buildArcanaDialogueReply('probe', card, null, { domain: 'love' });
    const work = buildArcanaDialogueReply('probe', card, null, { domain: 'work' });
    failures.push(
      `${card.name} (${card.numeral}): love ≡ work after normalize\n  love: ${normalizeDialogueReplyContent(love)}\n  work: ${normalizeDialogueReplyContent(work)}`
    );
  }

  // Shared generic blocks must not appear verbatim in domain replies.
  const loveRaw = buildArcanaDialogueReply('probe', card, null, { domain: 'love' });
  const workRaw = buildArcanaDialogueReply('probe', card, null, { domain: 'work' });
  if (loveRaw.includes(card.futureTendency) || loveRaw.includes(card.advice)) {
    failures.push(
      `${card.name} (${card.numeral}): love reply still embeds shared futureTendency/advice`
    );
  }
  if (workRaw.includes(card.futureTendency) || workRaw.includes(card.advice)) {
    failures.push(
      `${card.name} (${card.numeral}): work reply still embeds shared futureTendency/advice`
    );
  }
}

if (failures.length > 0) {
  console.error(`FAIL: ${failures.length} issue(s) across ${MAJOR_ARCANA.length} Maggiori:\n`);
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log(
  `OK: all ${MAJOR_ARCANA.length} Maggiori have distinct love vs work Dialogo replies (labels stripped).`
);
