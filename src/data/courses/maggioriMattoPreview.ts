/**
 * ENN-126 / ENN-128 / ENN-129 — Public Corsi preview slice for Arcani Maggiori · Modulo 01.
 * Same Dispensa 01 source as Area Personale; truncated after Il Matto (before Bagatto).
 */

import {
  ARCANI_MAGGIORI_DISPENSE,
  type MaggioriDispensaSeed,
} from './arcaniMaggioriDispense';
import {
  IL_MATTO_FLASHCARD_DECK,
  type CourseModuleFlashcardDeck,
} from '../flashcards/arcaniMaggiori';

/** First heading after Matto embeds — hard stop so Bagatto+ stay private. */
export const AFTER_MATTO_HEADING =
  '### La Diade Creativa: Il Bagatto (I) e La Papessa (II)';

/** Must appear in the public slice (architecture before Il Matto). */
const ARCHITECTURE_MARKERS = [
  '## 1. Architettura Didattica e la Mappa dei Tre Settenari',
  '### Mappa dei Tre Cicli',
  "## 2. Il Primo Settenario: La Formazione dell'Identità (0 – VII)",
  "### 0. Il Matto – L'Inizio Non Condizionato",
  '{{scheda-visiva:il-matto}}',
  '{{sigillo:il-matto}}',
] as const;

/** Dispensa 01 seed (metadata + full markdown) from the Maggiori catalog. */
export function getMaggioriDispensa01(): MaggioriDispensaSeed {
  const mod01 = ARCANI_MAGGIORI_DISPENSE.find((d) => d.moduleNumber === '01');
  if (!mod01) {
    throw new Error(
      'Dispensa Maggiori 01 missing — cannot build Modulo 1 preview.'
    );
  }
  return mod01;
}

/**
 * Markdown for the public Modulo 01 anteprima:
 * dispensa intro + architettura / Tre Settenari + apertura Primo Settenario
 * + Il Matto (bullets + scheda visiva + Sigillo embeds). Stops before Bagatto.
 */
export function getMaggioriMattoPreviewMarkdown(): string {
  const { contentMarkdown } = getMaggioriDispensa01();
  const end = contentMarkdown.indexOf(AFTER_MATTO_HEADING);

  if (end < 0) {
    throw new Error(
      'Could not locate Il Matto slice end boundary in Dispensa 01 markdown.'
    );
  }

  const slice = contentMarkdown.slice(0, end).trim();
  for (const marker of ARCHITECTURE_MARKERS) {
    if (!slice.includes(marker)) {
      throw new Error(
        `Modulo 1 preview missing architecture marker: ${marker}`
      );
    }
  }

  return slice;
}

/** Full Il Matto Sigillo deck — same as Area Personale (not a truncated sample). */
export function getMaggioriMattoPreviewFlashcardDeck(): CourseModuleFlashcardDeck {
  return IL_MATTO_FLASHCARD_DECK;
}

/** Sidebar rows for the public account-parity chrome (01 open; 02–04 locked). */
export function getMaggioriPreviewSidebarDispense(): MaggioriDispensaSeed[] {
  return ARCANI_MAGGIORI_DISPENSE;
}
