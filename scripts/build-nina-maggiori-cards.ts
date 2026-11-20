/**
 * ENN-147 — Compile compact Nina Studio Maggiori cards FROM didactic sources
 * (Area Personale dispensa + schede visive + approfondimenti Terzo Settenario).
 * No hand-duplicated card bodies; no Dialogo Tarot; no invented Waite for VIII–XXI.
 *
 * Run: npx tsx scripts/build-nina-maggiori-cards.ts
 * Also invoked from scripts/bundle-api.mjs before chat bundle.
 */

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { APPROFONDIMENTI_TERZO_SETTENARIO } from '../src/data/courses/approfondimentiTerzoSettenario.ts';
import { ARCANI_MAGGIORI_DISPENSE } from '../src/data/courses/arcaniMaggioriDispense.ts';
import { getSchedaVisiva } from '../src/data/schedeVisive/index.ts';
import type { SchedaVisivaContent } from '../src/data/schedeVisive/types.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outFile = path.join(root, 'src/data/ninaMaggioriCards.generated.ts');

/** Soft cap per card body — keep max-3 inject under Groq 413 (ENN-138). */
const MAX_BODY_CHARS = 1100;

type CardMeta = {
  id: number;
  roman: string;
  title: string;
  aliases: string[];
  /** Scheda visiva id (Primo Settenario only). */
  schedaId?: string;
  /** Short title suffix for heading (from course voice). */
  headingHint: string;
};

/**
 * Matching aliases stay here (not in dispensa markdown).
 * Bodies are compiled from didactic sources below.
 */
const CARD_META: readonly CardMeta[] = [
  {
    id: 0,
    roman: '0',
    title: 'Il Matto',
    aliases: ['matto', 'il matto', 'fool'],
    schedaId: 'il-matto',
    headingHint: 'L’Inizio Non Condizionato',
  },
  {
    id: 1,
    roman: 'I',
    title: 'Il Bagatto',
    aliases: ['bagatto', 'il bagatto', 'mago', 'magician'],
    schedaId: 'il-bagatto',
    headingHint: 'L’Iniziativa e il Talento',
  },
  {
    id: 2,
    roman: 'II',
    title: 'La Papessa',
    aliases: ['papessa', 'la papessa', 'sacerdotessa', 'high priestess'],
    schedaId: 'la-papessa',
    headingHint: 'Gestazione e Saggezza del Silenzio',
  },
  {
    id: 3,
    roman: 'III',
    title: 'L’Imperatrice',
    aliases: ['imperatrice', "l'imperatrice", 'empress'],
    schedaId: 'l-imperatrice',
    headingHint: 'Fioritura e Abbondanza',
  },
  {
    id: 4,
    roman: 'IV',
    title: 'L’Imperatore',
    aliases: ['imperatore', "l'imperatore", 'emperor'],
    schedaId: 'l-imperatore',
    headingHint: 'Stabilità e Metodo',
  },
  {
    id: 5,
    roman: 'V',
    title: 'Il Papa',
    aliases: ['il papa', 'papa', 'ierofante', 'hierophant'],
    schedaId: 'il-papa',
    headingHint: 'Patto Etico e Guida',
  },
  {
    id: 6,
    roman: 'VI',
    title: 'Gli Amanti',
    aliases: ['amanti', 'gli amanti', 'innamorati', 'lovers'],
    schedaId: 'gli-amanti',
    headingHint: 'Il Bivio e la Scelta del Cuore',
  },
  {
    id: 7,
    roman: 'VII',
    title: 'Il Carro',
    aliases: ['il carro', 'carro', 'chariot'],
    schedaId: 'il-carro',
    headingHint: 'Azione Coordinata e Vittoria',
  },
  {
    id: 8,
    roman: 'VIII',
    title: 'La Giustizia',
    aliases: ['giustizia', 'la giustizia', 'justice'],
    headingHint: 'Ordine e Causa-Effetto',
  },
  {
    id: 9,
    roman: 'IX',
    title: 'L’Eremita',
    aliases: ['eremita', "l'eremita", 'hermit'],
    headingHint: 'Luce Interiore',
  },
  {
    id: 10,
    roman: 'X',
    title: 'La Ruota di Fortuna',
    aliases: ['ruota di fortuna', 'ruota della fortuna', 'wheel of fortune'],
    headingHint: 'Ciclo e Mutamento',
  },
  {
    id: 11,
    roman: 'XI',
    title: 'La Forza',
    aliases: ['la forza', 'forza', 'strength'],
    headingHint: 'Dominio Istintivo',
  },
  {
    id: 12,
    roman: 'XII',
    title: 'L’Appeso',
    aliases: ['appeso', "l'appeso", 'hanged man'],
    headingHint: 'Sosta e Cambio di Prospettiva',
  },
  {
    id: 13,
    roman: 'XIII',
    title: 'La Morte',
    aliases: ['la morte', 'morte', 'death', 'arcano senza nome', 'senza nome'],
    headingHint: 'Trasmutazione',
  },
  {
    id: 14,
    roman: 'XIV',
    title: 'La Temperanza',
    aliases: ['temperanza', 'la temperanza', 'temperance'],
    headingHint: 'Alchimia e Moderazione',
  },
  {
    id: 15,
    roman: 'XV',
    title: 'Il Diavolo',
    aliases: ['diavolo', 'il diavolo', 'devil'],
    headingHint: 'Ombra, Materia e Fascino del Potere',
  },
  {
    id: 16,
    roman: 'XVI',
    title: 'La Torre',
    aliases: ['la torre', 'torre', 'tower'],
    headingHint: 'Folgore e Liberazione',
  },
  {
    id: 17,
    roman: 'XVII',
    title: 'Le Stelle',
    aliases: ['le stelle', 'stelle', 'la stella', 'the star'],
    headingHint: 'Speranza e Guarigione',
  },
  {
    id: 18,
    roman: 'XVIII',
    title: 'La Luna',
    aliases: ['la luna', 'luna', 'the moon'],
    headingHint: 'Inconscio e Percorso Notturno',
  },
  {
    id: 19,
    roman: 'XIX',
    title: 'Il Sole',
    aliases: ['il sole', 'sole', 'the sun'],
    headingHint: 'Chiarezza e Realizzazione',
  },
  {
    id: 20,
    roman: 'XX',
    title: 'Il Giudizio',
    aliases: ['il giudizio', 'giudizio', 'judgement', 'judgment'],
    headingHint: 'Chiamata e Risveglio',
  },
  {
    id: 21,
    roman: 'XXI',
    title: 'Il Mondo',
    aliases: ['il mondo', 'mondo', 'the world'],
    headingHint: 'Compiutezza',
  },
];

type DispensaFields = {
  simbologia: string;
  senso: string;
  previsione: string;
};

function stripMarkdownNoise(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/^[\s*•\-]+/, '')
    .trim();
}

function extractField(block: string, labels: string[]): string {
  for (const label of labels) {
    const re = new RegExp(
      `\\*\\*${label}\\*\\*\\s*:\\s*([^\\n]+)`,
      'i'
    );
    const m = block.match(re);
    if (m?.[1]) return stripMarkdownNoise(m[1]);
  }
  return '';
}

/** Parse Trionfo sections from Area Personale dispensa markdown (moduli 01–03). */
function parseDispensaById(): Map<number, DispensaFields> {
  const joined = ARCANI_MAGGIORI_DISPENSE.filter((m) =>
    ['01', '02', '03'].includes(m.moduleNumber)
  )
    .map((m) => m.contentMarkdown)
    .join('\n\n');

  const map = new Map<number, DispensaFields>();
  const sectionRe =
    /###\s+(\d+)\.\s+[^\n]+\n([\s\S]*?)(?=\n###\s+\d+\.|\n###\s+Sintesi|\n###\s+La Diade|\n###\s+Dal Fiorire|\n##\s|$)/g;

  let match: RegExpExecArray | null;
  while ((match = sectionRe.exec(joined)) !== null) {
    const id = Number(match[1]);
    const block = match[2] ?? '';
    if (!Number.isFinite(id) || id < 0 || id > 21) continue;
    const simbologia = extractField(block, [
      'Simbologia ed Essenza',
      'Simbologia',
    ]);
    const senso = extractField(block, [
      'Significato Profondo',
      'Senso',
      'Significato',
    ]);
    const previsione = extractField(block, [
      'In Chiave Previsionale',
      'Chiave Previsionale',
      'Previsione',
    ]);
    if (simbologia || senso || previsione) {
      map.set(id, { simbologia, senso, previsione });
    }
  }
  return map;
}

function compactWaiteCue(scheda: SchedaVisivaContent): string {
  // Prefer short visual map + decode messages (413 discipline).
  const mappaBits = scheda.mappa
    .slice(0, 4)
    .map((b) => stripMarkdownNoise(b.body))
    .filter(Boolean);
  const decodeBits = scheda.decodifica.slice(0, 3).map((d) => {
    const title = stripMarkdownNoise(d.title);
    const msg = stripMarkdownNoise(d.cosaComunica);
    // Keep decode compact: short title cue + message.
    const shortTitle =
      title.length > 42 ? `${title.slice(0, 40).trim()}…` : title;
    return `${shortTitle}=${msg}`;
  });
  let cue = [...mappaBits, ...decodeBits].join(' · ');
  if (cue.length > 360) cue = `${cue.slice(0, 357).trim()}…`;
  return cue;
}

function luceOmbraFromScheda(
  scheda: SchedaVisivaContent
): { luce: string; ombra: string } | null {
  const evolutiva = scheda.sintesi.find((s) =>
    /evolutiva/i.test(s.title)
  );
  const attenzione = scheda.sintesi.find((s) =>
    /attenzione/i.test(s.title)
  );
  if (!evolutiva && !attenzione) return null;
  return {
    luce: evolutiva ? stripMarkdownNoise(evolutiva.body) : '',
    ombra: attenzione ? stripMarkdownNoise(attenzione.body) : '',
  };
}

type ApprofondimentoBits = {
  sensoExtra: string;
  pratica: string;
};

/** Enrich XV–XXI from Area Personale «Approfondimenti Terzo Settenario». */
function approfondimentoFor(roman: string, title: string): ApprofondimentoBits {
  const nameNeedle = title.replace(/^Gli\s+/i, '').replace(/^L[’']/i, '').toLowerCase();
  let sensoExtra = '';
  for (const group of APPROFONDIMENTI_TERZO_SETTENARIO.arcGroups) {
    for (const card of group.cards) {
      if (
        card.roman === roman ||
        card.name.toLowerCase().includes(nameNeedle.toLowerCase())
      ) {
        sensoExtra = stripMarkdownNoise(card.body);
        break;
      }
    }
    if (sensoExtra) break;
  }

  let pratica = '';
  for (const nodo of APPROFONDIMENTI_TERZO_SETTENARIO.nodi) {
    for (const app of nodo.applications) {
      if (
        new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(
          app.title
        ) ||
        new RegExp(roman, 'i').test(app.title)
      ) {
        pratica = `${stripMarkdownNoise(app.title)} — ${stripMarkdownNoise(app.body)}`;
        break;
      }
    }
    if (pratica) break;
  }

  return { sensoExtra, pratica };
}

function mergeSenso(base: string, extra: string): string {
  if (!extra) return base;
  if (!base) return extra;
  const baseNorm = base.toLowerCase();
  // Avoid near-duplicate paste when approfondimento repeats dispensa.
  const extraLead = extra.slice(0, 48).toLowerCase();
  if (baseNorm.includes(extraLead)) return base;
  return `${base} ${extra}`;
}

function trimBody(body: string): string {
  if (body.length <= MAX_BODY_CHARS) return body;
  return `${body.slice(0, MAX_BODY_CHARS - 1).trim()}…`;
}

function compileCard(
  meta: CardMeta,
  dispensa: Map<number, DispensaFields>
): {
  id: number;
  roman: string;
  title: string;
  aliases: string[];
  body: string;
} {
  const fields = dispensa.get(meta.id) ?? {
    simbologia: '',
    senso: '',
    previsione: '',
  };

  let simbologia = fields.simbologia;
  let senso = fields.senso;
  const previsione = fields.previsione;
  let luceOmbraLine = '';
  let praticaLine = '';

  if (meta.schedaId) {
    const scheda = getSchedaVisiva(meta.schedaId);
    if (scheda) {
      const waite = compactWaiteCue(scheda);
      if (waite) {
        simbologia = simbologia
          ? `${simbologia} **Waite**: ${waite}`
          : `**Waite**: ${waite}`;
      }
      const lo = luceOmbraFromScheda(scheda);
      if (lo && (lo.luce || lo.ombra)) {
        const bits = [
          lo.luce ? `Luce — ${lo.luce}` : '',
          lo.ombra ? `Ombra — ${lo.ombra}` : '',
        ].filter(Boolean);
        luceOmbraLine = bits.join(' ');
      }
    }
  } else if (meta.id >= 15) {
    // Terzo Settenario: Area Personale approfondimenti (no Waite invent).
    const appr = approfondimentoFor(meta.roman, meta.title);
    senso = mergeSenso(senso, appr.sensoExtra);
    if (appr.pratica) praticaLine = appr.pratica;
  }

  const lines = [
    `### ${meta.roman}. ${meta.title} — ${meta.headingHint}`,
    simbologia ? `- **Simbologia**: ${simbologia}` : '',
    senso ? `- **Senso**: ${senso}` : '',
    luceOmbraLine ? `- **Luce/ombra**: ${luceOmbraLine}` : '',
    praticaLine ? `- **Pratica corso**: ${praticaLine}` : '',
    previsione ? `- **Previsione**: ${previsione}` : '',
  ].filter(Boolean);

  return {
    id: meta.id,
    roman: meta.roman,
    title: meta.title,
    aliases: [...meta.aliases],
    body: trimBody(lines.join('\n')),
  };
}

function main() {
  const dispensa = parseDispensaById();
  const missing = CARD_META.filter((m) => !dispensa.has(m.id)).map((m) => m.id);
  if (missing.length) {
    console.error(
      `[nina-maggiori] FAIL: dispensa missing Trionfi ids: ${missing.join(', ')}`
    );
    process.exit(1);
  }

  const cards = CARD_META.map((meta) => compileCard(meta, dispensa));
  const diavolo = cards.find((c) => c.id === 15);
  if (
    !diavolo ||
    !/ombra|dipenden|materi|potere|manipol/i.test(diavolo.body)
  ) {
    console.error('[nina-maggiori] FAIL: Il Diavolo body too thin after compile');
    process.exit(1);
  }

  const banner = `/**
 * GENERATED by scripts/build-nina-maggiori-cards.ts — do not edit by hand.
 * ENN-147: compact Nina Studio Trionfi from Area Personale didactic sources.
 * Sources: arcaniMaggioriDispense (moduli 01–03) + schedeVisive (0–VII) +
 * approfondimentiTerzoSettenario (XV–XXI). Not Dialogo Tarot. Not public KB dump.
 * Rebuild: npx tsx scripts/build-nina-maggiori-cards.ts  (also via npm run build:api)
 */

export type NinaMaggioriCardGenerated = {
  id: number;
  roman: string;
  title: string;
  aliases: string[];
  body: string;
};

export const NINA_MAGGIORI_CARDS_GENERATED: readonly NinaMaggioriCardGenerated[] = `;

  const json = JSON.stringify(cards, null, 2);
  const contents = `${banner}${json} as const;\n`;

  writeFileSync(outFile, contents, 'utf8');

  const total = cards.reduce((n, c) => n + c.body.length, 0);
  console.log(
    `[nina-maggiori] ${cards.length} cards → ${path.relative(root, outFile)}` +
      ` (bodies ${total} chars; Diavolo ${diavolo.body.length})`
  );
}

main();
