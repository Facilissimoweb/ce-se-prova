/**
 * ENN-200 — Compile compact Nina Studio Minori cards FROM Maria’s luce/ombra pack.
 * Source: content/nina/arcani-minori-luce-ombra.md (Italian SoT for Studio companion).
 * Not the public Minori course (catalog stays hidden). Not Maggiori Area Personale.
 *
 * Run: npx tsx scripts/build-nina-minori-cards.ts
 * Also invoked from scripts/bundle-api.mjs before chat bundle.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceFile = path.join(root, 'content/nina/arcani-minori-luce-ombra.md');
const outFile = path.join(root, 'src/data/ninaMinoriCards.generated.ts');

/** Soft cap — keep max-3 inject under Groq 413 (same discipline as Maggiori). */
const MAX_BODY_CHARS = 700;

export type NinaMinoriSuitId = 'bastoni' | 'coppe' | 'spade' | 'denari';
export type NinaMinoriRankId =
  | 'asso'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'fante'
  | 'cavallo'
  | 'regina'
  | 're';

type SuitMeta = {
  id: NinaMinoriSuitId;
  title: string;
  heading: string;
  aliases: string[];
};

const SUITS: readonly SuitMeta[] = [
  {
    id: 'bastoni',
    title: 'Bastoni',
    heading: 'Bastoni',
    aliases: ['bastoni', 'bastone', 'wands', 'wand'],
  },
  {
    id: 'coppe',
    title: 'Coppe',
    heading: 'Coppe',
    aliases: ['coppe', 'coppa', 'cups', 'cup'],
  },
  {
    id: 'spade',
    title: 'Spade',
    heading: 'Spade',
    aliases: ['spade', 'spada', 'swords', 'sword'],
  },
  {
    id: 'denari',
    title: 'Denari',
    heading: 'Denari',
    aliases: [
      'denari',
      'denaro',
      'pentacoli',
      'pentacolo',
      'pentacles',
      'coins',
      'coin',
    ],
  },
];

const RANK_ORDER: readonly NinaMinoriRankId[] = [
  'asso',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'fante',
  'cavallo',
  'regina',
  're',
];

const RANK_TITLES: Record<NinaMinoriRankId, string> = {
  asso: 'Asso',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '10',
  fante: 'Fante',
  cavallo: 'Cavallo',
  regina: 'Regina',
  re: 'Re',
};

/** Italian number words for alias matching. */
const RANK_WORD_ALIASES: Record<NinaMinoriRankId, string[]> = {
  asso: ['asso', 'ace'],
  '2': ['2', 'due', 'two'],
  '3': ['3', 'tre', 'three'],
  '4': ['4', 'quattro', 'four'],
  '5': ['5', 'cinque', 'five'],
  '6': ['6', 'sei', 'six'],
  '7': ['7', 'sette', 'seven'],
  '8': ['8', 'otto', 'eight'],
  '9': ['9', 'nove', 'nine'],
  '10': ['10', 'dieci', 'ten'],
  fante: ['fante', 'page', 'paggio'],
  cavallo: ['cavallo', 'knight', 'cavaliere'],
  regina: ['regina', 'queen'],
  re: ['re', 'king'],
};

function normalizeHeading(raw: string): string {
  return raw.trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
}

function parseRankHeading(heading: string): NinaMinoriRankId | null {
  const h = normalizeHeading(heading);
  if (h === 'asso') return 'asso';
  if (/^(fante|page)$/.test(h)) return 'fante';
  if (/^(cavallo|knight|cavaliere)$/.test(h)) return 'cavallo';
  if (/^(regina|queen)$/.test(h)) return 'regina';
  if (/^(re|king)$/.test(h)) return 're';
  const num = h.match(/^(\d{1,2})$/);
  if (num) {
    const n = num[1] as NinaMinoriRankId;
    if (RANK_ORDER.includes(n)) return n;
  }
  return null;
}

function extractField(block: string, field: 'Luce' | 'Ombra'): string {
  const re = new RegExp(
    `\\*\\*${field}\\*\\*\\s*:\\s*([^\\n]+(?:\\n(?!\\*\\*)[^\\n]+)*)`,
    'i'
  );
  const m = block.match(re);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}

function extractSuitMeta(block: string): { elemento: string; senso: string } {
  const el = block.match(/\*\*Elemento\*\*\s*:\s*([^\n]+)/i);
  const se = block.match(/\*\*Senso\*\*\s*:\s*([^\n]+)/i);
  return {
    elemento: el ? el[1].replace(/\s+/g, ' ').trim() : '',
    senso: se ? se[1].replace(/\s+/g, ' ').trim() : '',
  };
}

function buildAliases(
  suit: SuitMeta,
  rank: NinaMinoriRankId
): string[] {
  const suitNames = suit.aliases;
  const ranks = RANK_WORD_ALIASES[rank];
  const out = new Set<string>();
  for (const r of ranks) {
    for (const s of suitNames) {
      out.add(`${r} di ${s}`);
      out.add(`${r} ${s}`);
      out.add(`${r} of ${s}`);
    }
  }
  // Primary Italian title forms
  out.add(`${RANK_TITLES[rank]} di ${suit.title}`.toLowerCase());
  if (rank !== 'asso' && !/^\d+$/.test(rank)) {
    out.add(`${RANK_TITLES[rank].toLowerCase()} di ${suit.id}`);
  }
  return [...out];
}

function clipBody(body: string): string {
  if (body.length <= MAX_BODY_CHARS) return body;
  return `${body.slice(0, MAX_BODY_CHARS - 1).trimEnd()}…`;
}

type ParsedSuit = {
  meta: SuitMeta;
  elemento: string;
  senso: string;
  cards: Array<{
    rank: NinaMinoriRankId;
    luce: string;
    ombra: string;
  }>;
};

function parseSource(md: string): {
  intro: string;
  pratica: string;
  suits: ParsedSuit[];
} {
  const introMatch = md.match(
    /## Introduzione\s+([\s\S]*?)(?=\n## Bastoni\b)/
  );
  const intro = (introMatch?.[1] ?? '')
    .replace(/### Pratica di lettura[\s\S]*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  const praticaMatch = md.match(
    /### Pratica di lettura\s+([\s\S]*?)(?=\n## Bastoni\b)/
  );
  const pratica = (praticaMatch?.[1] ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);

  const suits: ParsedSuit[] = [];
  for (let i = 0; i < SUITS.length; i += 1) {
    const suit = SUITS[i];
    const next = SUITS[i + 1];
    const re = new RegExp(
      `## ${suit.heading}\\s+([\\s\\S]*?)(?=${next ? `\\n## ${next.heading}\\b` : '$'})`
    );
    const blockMatch = md.match(re);
    if (!blockMatch) {
      throw new Error(`Missing suit section: ${suit.heading}`);
    }
    const block = blockMatch[1];
    const { elemento, senso } = extractSuitMeta(block);
    const cards: ParsedSuit['cards'] = [];
    const cardParts = block.split(/\n### /).slice(1);
    for (const part of cardParts) {
      const nl = part.indexOf('\n');
      const heading = nl === -1 ? part : part.slice(0, nl);
      const body = nl === -1 ? '' : part.slice(nl + 1);
      const rank = parseRankHeading(heading);
      if (!rank) continue;
      const luce = extractField(body, 'Luce');
      const ombra = extractField(body, 'Ombra');
      if (!luce || !ombra) {
        throw new Error(`Missing luce/ombra for ${rank} di ${suit.id}`);
      }
      cards.push({ rank, luce, ombra });
    }
    if (cards.length !== 14) {
      throw new Error(
        `Expected 14 cards for ${suit.id}, got ${cards.length}`
      );
    }
    // Stable rank order
    cards.sort(
      (a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank)
    );
    suits.push({ meta: suit, elemento, senso, cards });
  }
  return { intro, pratica, suits };
}

function joinSense(elemento: string, senso: string): string {
  const el = elemento.replace(/\.\s*$/, '').trim();
  const se = senso.replace(/^\.\s*/, '').trim();
  if (!el) return se;
  if (!se) return el;
  return `${el}. ${se}`;
}

function formatCardBody(params: {
  suit: SuitMeta;
  rank: NinaMinoriRankId;
  elemento: string;
  senso: string;
  luce: string;
  ombra: string;
}): string {
  const title = `${RANK_TITLES[params.rank]} di ${params.suit.title}`;
  const body = [
    `### ${title}`,
    `- **Senso**: ${params.suit.title} — ${joinSense(params.elemento, params.senso)}`,
    `- **Luce/ombra**: Luce — ${params.luce} Ombra — ${params.ombra}`,
  ].join('\n');
  return clipBody(body);
}

function main() {
  const md = readFileSync(sourceFile, 'utf8');
  const { intro, pratica, suits } = parseSource(md);

  const cards = suits.flatMap((s) =>
    s.cards.map((c) => ({
      id: `${s.meta.id}-${c.rank}`,
      suit: s.meta.id,
      rank: c.rank,
      title: `${RANK_TITLES[c.rank]} di ${s.meta.title}`,
      aliases: buildAliases(s.meta, c.rank),
      body: formatCardBody({
        suit: s.meta,
        rank: c.rank,
        elemento: s.elemento,
        senso: s.senso,
        luce: c.luce,
        ombra: c.ombra,
      }),
    }))
  );

  if (cards.length !== 56) {
    throw new Error(`Expected 56 Minori cards, got ${cards.length}`);
  }

  const suitFrames = suits.map((s) => ({
    id: s.meta.id,
    title: s.meta.title,
    aliases: s.meta.aliases,
    body: clipBody(
      `### Seme: ${s.meta.title}\n- **Senso**: ${joinSense(s.elemento, s.senso)}`
    ),
  }));

  const file = `/**
 * GENERATED by scripts/build-nina-minori-cards.ts — do not edit by hand.
 * ENN-200: compact Nina Studio Minori (luce/ombra) from content/nina/arcani-minori-luce-ombra.md.
 * Companion knowledge for Studio (Maggiori entitlement). Public Minori catalog stays hidden.
 * Rebuild: npx tsx scripts/build-nina-minori-cards.ts  (also via npm run build:api)
 */

export type NinaMinoriSuitId = 'bastoni' | 'coppe' | 'spade' | 'denari';
export type NinaMinoriRankId =
  | 'asso'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'fante'
  | 'cavallo'
  | 'regina'
  | 're';

export type NinaMinoriCardGenerated = {
  id: string;
  suit: NinaMinoriSuitId;
  rank: NinaMinoriRankId;
  title: string;
  aliases: string[];
  body: string;
};

export type NinaMinoriSuitFrameGenerated = {
  id: NinaMinoriSuitId;
  title: string;
  aliases: string[];
  body: string;
};

export const NINA_MINORI_INTRO = ${JSON.stringify(intro)};

export const NINA_MINORI_PRATICA = ${JSON.stringify(pratica)};

export const NINA_MINORI_SUIT_FRAMES: readonly NinaMinoriSuitFrameGenerated[] = ${JSON.stringify(
    suitFrames,
    null,
    2
  )};

export const NINA_MINORI_CARDS_GENERATED: readonly NinaMinoriCardGenerated[] = ${JSON.stringify(
    cards,
    null,
    2
  )};
`;

  writeFileSync(outFile, file, 'utf8');
  console.log(
    `Wrote ${cards.length} Minori cards + ${suitFrames.length} suit frames → ${path.relative(root, outFile)}`
  );
}

main();
