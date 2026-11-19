/**
 * ENN-126 / ENN-128 — Public Corsi preview slice for Arcani Maggiori · Modulo 01.
 * Architecture (mazzo / Tre Settenari / intro Primo Settenario) + Il Matto.
 * Reuses live Dispensa 01 + Sigillo data; never invents copy.
 */

import { ARCANI_MAGGIORI_DISPENSE } from './arcaniMaggioriDispense';
import {
  IL_MATTO_FLASHCARD_DECK,
  IL_MATTO_SECTION_FLASHCARDS,
  type CourseModuleFlashcardDeck,
} from '../flashcards/arcaniMaggiori';

/** First heading after Matto embeds — hard stop so Bagatto+ stay private. */
const AFTER_MATTO_HEADING =
  '### La Diade Creativa: Il Bagatto (I) e La Papessa (II)';

/** Must appear in the public slice (architecture before Il Matto). */
const ARCHITECTURE_MARKERS = [
  '## 1. Architettura Didattica e la Mappa dei Tre Settenari',
  '### Mappa dei Tre Cicli',
  '## 2. Il Primo Settenario: La Formazione dell\'Identità (0 – VII)',
  '### 0. Il Matto – L\'Inizio Non Condizionato',
] as const;

export const MAGGIORI_MATTO_PREVIEW_FLASHCARD_COUNT = 3;

/**
 * Markdown for the public Modulo 01 anteprima:
 * dispensa intro + architettura / Tre Settenari + apertura Primo Settenario
 * + Il Matto (bullets + scheda visiva + Sigillo embeds). Stops before Bagatto.
 */
export function getMaggioriMattoPreviewMarkdown(): string {
  const mod01 = ARCANI_MAGGIORI_DISPENSE.find((d) => d.moduleNumber === '01');
  if (!mod01) {
    throw new Error('Dispensa Maggiori 01 missing — cannot build Modulo 1 preview.');
  }

  const { contentMarkdown } = mod01;
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

/** First N Sigillo Matto cards for the free Corsi teaser (not the full deck). */
export function getMaggioriMattoPreviewFlashcardDeck(
  count: number = MAGGIORI_MATTO_PREVIEW_FLASHCARD_COUNT
): CourseModuleFlashcardDeck {
  const cards = IL_MATTO_SECTION_FLASHCARDS.slice(0, Math.max(1, count));
  return {
    courseSlug: IL_MATTO_FLASHCARD_DECK.courseSlug,
    moduleNumber: '01-preview',
    title: 'Sigillo di apprendimento · Il Matto',
    subtitle: `Assaggio pubblico: ${cards.length} di ${IL_MATTO_SECTION_FLASHCARDS.length} carte. Tocca la carta per rivelare la risposta.`,
    cards,
  };
}
