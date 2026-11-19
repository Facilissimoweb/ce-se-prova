import React from 'react';
import { ArrowRight, Eye, Lock } from 'lucide-react';
import { MaggioriMattoPreviewBody } from './MaggioriMattoPreviewBody';
import { MAGGIORI_MATTO_PREVIEW_FLASHCARD_COUNT } from '../../data/courses/maggioriMattoPreview';
import { IL_MATTO_SECTION_FLASHCARDS } from '../../data/flashcards/arcaniMaggiori';
import { SCROLL_LANDMARKS } from '../../lib/scrollNavigation';

interface MaggioriMattoPreviewProps {
  priceEur: number;
  onEnroll: () => void;
  /** Nested under Modulo 01 — tighter chrome, keeps the landmark id. */
  nested?: boolean;
}

/**
 * ENN-128 — Public, login-free Modulo 01 anteprima (architecture + Il Matto).
 * Bound to the module structure in the Programma workbench — not a catalog footer.
 */
export function MaggioriMattoPreview({
  priceEur,
  onEnroll,
  nested = false,
}: MaggioriMattoPreviewProps) {
  const remainingCards = Math.max(
    0,
    IL_MATTO_SECTION_FLASHCARDS.length - MAGGIORI_MATTO_PREVIEW_FLASHCARD_COUNT
  );

  return (
    <section
      id={SCROLL_LANDMARKS.corsiMaggioriPreview}
      aria-labelledby="maggiori-matto-preview-heading"
      className={
        nested
          ? 'rounded-xl border border-[#D4AF37]/28 bg-[#D4AF37]/6 p-4 sm:p-5 space-y-5 scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))]'
          : 'glass-tier-1 rounded-2xl p-5 sm:p-6 md:p-8 space-y-6 scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))]'
      }
    >
      <header className="space-y-2 max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37] inline-flex items-center gap-2">
          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          Anteprima gratuita · Modulo 01
        </p>
        <h2
          id="maggiori-matto-preview-heading"
          className={`font-body font-semibold tracking-[-0.02em] text-[#F4F1EA] ${
            nested ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
          }`}
        >
          Architettura del mazzo e Il Matto
        </h2>
        <p className="text-sm leading-relaxed text-[#A39B93]">
          Contenuto autentico dalla Dispensa 01: struttura dei Tre Settenari,
          apertura del Primo Settenario, poi Il Matto (bullet, scheda visiva
          Waite-Smith e le prime {MAGGIORI_MATTO_PREVIEW_FLASHCARD_COUNT}{' '}
          flashcard del Sigillo). Nessun accesso richiesto. Bagatto–Carro e i
          moduli successivi restano riservati ai corsisti.
        </p>
      </header>

      <MaggioriMattoPreviewBody compact={nested} />

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border border-[#D4AF37]/22 bg-[#D4AF37]/8 p-4 md:p-5">
        <div className="flex-1 space-y-1.5 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#D4AF37] inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            Oltre l&apos;anteprima
          </p>
          <p className="text-sm text-[#E8e1dd] leading-relaxed">
            Altre {remainingCards} carte del Sigillo Il Matto, Bagatto–Carro,
            i moduli successivi e le dispense complete: sblocco con
            l&apos;iscrizione al percorso.
          </p>
        </div>
        <button
          type="button"
          onClick={onEnroll}
          className="cta-label shrink-0 w-full sm:w-auto min-h-[46px] px-5 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] transition-all duration-150 hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
        >
          Iscriviti al Percorso (€ {priceEur})
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
