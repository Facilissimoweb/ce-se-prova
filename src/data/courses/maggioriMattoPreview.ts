/**
 * ENN-126 — Public Corsi preview slice for Arcani Maggiori · Il Matto.
 * Reuses live Dispensa 01 + Sigillo data; never invents copy.
 */

import { ARCANI_MAGGIORI_DISPENSE } from './arcaniMaggioriDispense';
import {
  IL_MATTO_FLASHCARD_DECK,
  IL_MATTO_SECTION_FLASHCARDS,
  type CourseModuleFlashcardDeck,
} from '../flashcards/arcaniMaggiori';

/** Heading that opens the Matto scheda inside Dispensa 01. */
const MATTO_HEADING = '### 0. Il Matto – L\'Inizio Non Condizionato';
/** First heading after Matto embeds — hard stop so Bagatto+ stay private. */
const AFTER_MATTO_HEADING = '### La Diade Creativa: Il Bagatto (I) e La Papessa (II)';

export const MAGGIORI_MATTO_PREVIEW_FLASHCARD_COUNT = 3;

/**
 * Markdown for the public preview: Matto heading + 3 bullets +
 * `{{scheda-visiva:il-matto}}` + `{{sigillo:il-matto}}` only.
 */
export function getMaggioriMattoPreviewMarkdown(): string {
  const mod01 = ARCANI_MAGGIORI_DISPENSE.find((d) => d.moduleNumber === '01');
  if (!mod01) {
    throw new Error('Dispensa Maggiori 01 missing — cannot build Matto preview.');
  }

  const { contentMarkdown } = mod01;
  const start = contentMarkdown.indexOf(MATTO_HEADING);
  const end = contentMarkdown.indexOf(AFTER_MATTO_HEADING);

  if (start < 0 || end < 0 || end <= start) {
    throw new Error(
      'Could not locate Il Matto slice boundaries in Dispensa 01 markdown.'
    );
  }

  return contentMarkdown.slice(start, end).trim();
}

/** First N Sigillo Matto cards for the free Corsi teaser (not the full deck). */
export function getMaggioriMattoPreviewFlashcardDeck(
  count: number = MAGGIORI_MATTO_PREVIEW_FLASHCARD_COUNT
): CourseModuleFlashcardDeck {
  const cards = IL_MATTO_SECTION_FLASHCARDS.slice(0, Math.max(1, count));
  return {
    courseSlug: IL_MATTO_FLASHCARD_DECK.courseSlug,
    moduleNumber: '01-il-matto-preview',
    title: 'Sigillo di apprendimento · Il Matto',
    subtitle: `Assaggio pubblico: ${cards.length} di ${IL_MATTO_SECTION_FLASHCARDS.length} carte. Tocca la carta per rivelare la risposta.`,
    cards,
  };
}
