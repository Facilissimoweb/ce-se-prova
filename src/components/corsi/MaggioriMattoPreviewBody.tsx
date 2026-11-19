import React, { useMemo } from 'react';
import { DispensaFlashcards } from '../reserved/DispensaFlashcards';
import { DispensaSchedaVisiva } from '../reserved/DispensaSchedaVisiva';
import { FormattedDispensaBody } from '../reserved/FormattedDispensaBody';
import {
  getMaggioriMattoPreviewFlashcardDeck,
  getMaggioriMattoPreviewMarkdown,
  MAGGIORI_MATTO_PREVIEW_FLASHCARD_COUNT,
} from '../../data/courses/maggioriMattoPreview';
import { getSchedaVisiva } from '../../data/schedeVisive';

interface MaggioriMattoPreviewBodyProps {
  /** Tighter chrome for the Programma workbench anteprima slot. */
  compact?: boolean;
}

/**
 * Shared real Matto slice (ENN-126/127): dispensa bullets + scheda visiva + Sigillo sample.
 * Used by the public preview section and the Corsi Maggiori anteprima slot.
 */
export function MaggioriMattoPreviewBody({
  compact = false,
}: MaggioriMattoPreviewBodyProps) {
  const markdown = useMemo(() => getMaggioriMattoPreviewMarkdown(), []);
  const previewDeck = useMemo(
    () => getMaggioriMattoPreviewFlashcardDeck(MAGGIORI_MATTO_PREVIEW_FLASHCARD_COUNT),
    []
  );
  const scheda = getSchedaVisiva('il-matto');

  const embeds = useMemo(() => {
    const map: Record<string, React.ReactNode> = {};
    if (scheda) {
      map['scheda-visiva:il-matto'] = <DispensaSchedaVisiva content={scheda} />;
    }
    map['sigillo:il-matto'] = <DispensaFlashcards deck={previewDeck} />;
    return map;
  }, [scheda, previewDeck]);

  return (
    <div
      className={
        compact
          ? 'rounded-xl border border-[#D4AF37]/18 bg-[#12100E]/80 p-3.5 sm:p-4 md:p-5'
          : 'rounded-xl border border-[#D4AF37]/18 bg-[#12100E]/65 p-4 sm:p-5 md:p-6'
      }
    >
      <FormattedDispensaBody markdown={markdown} embeds={embeds} />
    </div>
  );
}
