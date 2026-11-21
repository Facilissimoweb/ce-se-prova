/**
 * ENN-200 / ENN-201 — Compile compact Nina Studio Minori cards FROM Maria’s packs:
 * - content/nina/arcani-minori-luce-ombra.md (luce/ombra, ENN-200)
 * - content/nina/arcani-minori-domande.md (domande di pratica / consulto, ENN-201)
 * Italian SoT for Studio companion. Not the public Minori course (catalog hidden).
 *
 * Run: npx tsx scripts/build-nina-minori-cards.ts
 * Also invoked from scripts/bundle-api.mjs before chat bundle.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const luceOmbraFile = path.join(
  root,
  'content/nina/arcani-minori-luce-ombra.md'
);
const domandeFile = path.join(root, 'content/nina/arcani-minori-domande.md');
const outFile = path.join(root, 'src/data/ninaMinoriCards.generated.ts');

/** Soft cap — keep max-3 inject under Groq 413 (same discipline as Maggiori). */
const MAX_BODY_CHARS = 900;

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

function extractField(
  block: string,
  field: 'Luce' | 'Ombra' | 'Domanda'
): string {
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
  focus?: string;
  cards: Array<{
    rank: NinaMinoriRankId;
    luce: string;
    ombra: string;
    domanda?: string;
  }>;
};

function parseSuitBlocks(
  md: string,
  mode: 'luce' | 'domande'
): Map<
  NinaMinoriSuitId,
  {
    elemento: string;
    senso: string;
    focus: string;
    cards: Map<NinaMinoriRankId, { luce: string; ombra: string; domanda: string }>;
  }
> {
  const out = new Map<
    NinaMinoriSuitId,
    {
      elemento: string;
      senso: string;
      focus: string;
      cards: Map<
        NinaMinoriRankId,
        { luce: string; ombra: string; domanda: string }
      >;
    }
  >();

  for (let i = 0; i < SUITS.length; i += 1) {
    const suit = SUITS[i];
    const next = SUITS[i + 1];
    const re = new RegExp(
      `## ${suit.heading}\\s+([\\s\\S]*?)(?=${next ? `\\n## ${next.heading}\\b` : '$'})`
    );
    const blockMatch = md.match(re);
    if (!blockMatch) {
      throw new Error(`Missing ${mode} suit section: ${suit.heading}`);
    }
    const block = blockMatch[1];
    const { elemento, senso } = extractSuitMeta(block);
    const focusMatch = block.match(/\*\*Focus\*\*\s*:\s*([^\n]+)/i);
    const focus = focusMatch
      ? focusMatch[1].replace(/\s+/g, ' ').trim()
      : '';
    const cards = new Map<
      NinaMinoriRankId,
      { luce: string; ombra: string; domanda: string }
    >();
    const cardParts = block.split(/\n### /).slice(1);
    for (const part of cardParts) {
      const nl = part.indexOf('\n');
      const heading = nl === -1 ? part : part.slice(0, nl);
      const body = nl === -1 ? '' : part.slice(nl + 1);
      const rank = parseRankHeading(heading);
      if (!rank) continue;
      if (mode === 'luce') {
        const luce = extractField(body, 'Luce');
        const ombra = extractField(body, 'Ombra');
        if (!luce || !ombra) {
          throw new Error(`Missing luce/ombra for ${rank} di ${suit.id}`);
        }
        cards.set(rank, { luce, ombra, domanda: '' });
      } else {
        const domanda = extractField(body, 'Domanda');
        if (!domanda) {
          throw new Error(`Missing domanda for ${rank} di ${suit.id}`);
        }
        cards.set(rank, { luce: '', ombra: '', domanda });
      }
    }
    if (cards.size !== 14) {
      throw new Error(
        `Expected 14 ${mode} cards for ${suit.id}, got ${cards.size}`
      );
    }
    out.set(suit.id, { elemento, senso, focus, cards });
  }
  return out;
}

function parseLuceOmbraSource(md: string): {
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

  const parsed = parseSuitBlocks(md, 'luce');
  const suits: ParsedSuit[] = SUITS.map((meta) => {
    const block = parsed.get(meta.id);
    if (!block) throw new Error(`Missing luce block for ${meta.id}`);
    const cards = RANK_ORDER.map((rank) => {
      const c = block.cards.get(rank);
      if (!c) throw new Error(`Missing luce card ${meta.id}-${rank}`);
      return { rank, luce: c.luce, ombra: c.ombra };
    });
    return {
      meta,
      elemento: block.elemento,
      senso: block.senso,
      cards,
    };
  });
  return { intro, pratica, suits };
}

function parseDomandeSource(md: string): {
  intro: string;
  byId: Map<string, string>;
  suitFocus: Map<NinaMinoriSuitId, string>;
} {
  const introMatch = md.match(
    /## Come usare queste domande\s+([\s\S]*?)(?=\n## Bastoni\b)/
  );
  const intro = (introMatch?.[1] ?? '').replace(/\s+/g, ' ').trim().slice(0, 700);
  const parsed = parseSuitBlocks(md, 'domande');
  const byId = new Map<string, string>();
  const suitFocus = new Map<NinaMinoriSuitId, string>();
  for (const suit of SUITS) {
    const block = parsed.get(suit.id);
    if (!block) throw new Error(`Missing domande block for ${suit.id}`);
    if (block.focus) suitFocus.set(suit.id, block.focus);
    for (const [rank, c] of block.cards) {
      byId.set(`${suit.id}-${rank}`, c.domanda);
    }
  }
  if (byId.size !== 56) {
    throw new Error(`Expected 56 domande, got ${byId.size}`);
  }
  return { intro, byId, suitFocus };
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
  domanda: string;
}): string {
  const title = `${RANK_TITLES[params.rank]} di ${params.suit.title}`;
  const lines = [
    `### ${title}`,
    `- **Senso**: ${params.suit.title} — ${joinSense(params.elemento, params.senso)}`,
    `- **Luce/ombra**: Luce — ${params.luce} Ombra — ${params.ombra}`,
  ];
  if (params.domanda) {
    lines.push(`- **Domanda**: ${params.domanda}`);
  }
  return clipBody(lines.join('\n'));
}

function main() {
  const luceMd = readFileSync(luceOmbraFile, 'utf8');
  const domandeMd = readFileSync(domandeFile, 'utf8');
  const { intro, pratica, suits } = parseLuceOmbraSource(luceMd);
  const domande = parseDomandeSource(domandeMd);

  const cards = suits.flatMap((s) =>
    s.cards.map((c) => {
      const id = `${s.meta.id}-${c.rank}`;
      const domanda = domande.byId.get(id);
      if (!domanda) {
        throw new Error(`Missing domanda merge for ${id}`);
      }
      return {
        id,
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
          domanda,
        }),
      };
    })
  );

  if (cards.length !== 56) {
    throw new Error(`Expected 56 Minori cards, got ${cards.length}`);
  }

  const suitFrames = suits.map((s) => {
    const focus = domande.suitFocus.get(s.meta.id);
    const focusLine = focus ? `\n- **Focus domande**: ${focus}` : '';
    return {
      id: s.meta.id,
      title: s.meta.title,
      aliases: s.meta.aliases,
      body: clipBody(
        `### Seme: ${s.meta.title}\n- **Senso**: ${joinSense(s.elemento, s.senso)}${focusLine}`
      ),
    };
  });

  const file = `/**
 * GENERATED by scripts/build-nina-minori-cards.ts — do not edit by hand.
 * ENN-200: compact Nina Studio Minori from:
 * - content/nina/arcani-minori-luce-ombra.md (luce/ombra)
 * - content/nina/arcani-minori-domande.md (domande di pratica)
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

export const NINA_MINORI_DOMANDE_INTRO = ${JSON.stringify(domande.intro)};

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
    `Wrote ${cards.length} Minori cards (luce/ombra + domanda) + ${suitFrames.length} suit frames → ${path.relative(root, outFile)}`
  );
}

main();
