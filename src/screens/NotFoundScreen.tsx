import React, { useEffect } from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { TarotEmblemLogo } from '../components/TarotEmblem';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

/** Catch-all SPA per percorsi sconosciuti — layout brand-consistent con via di ritorno. */
export function NotFoundScreen({ onNavigate }: Props) {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Pagina non trovata — Tarot Italia';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-2 pb-16 pt-10 text-center">
      <TarotEmblemLogo size={56} className="mb-6 opacity-90" />
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
        Errore 404
      </p>
      <h1 className="mt-3 font-display text-3xl leading-tight text-[#F4F1EA] md:text-4xl">
        Pagina non trovata
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#A39B93]">
        Il percorso richiesto non esiste su Tarot Italia. Torna alla home oppure
        consulta la mappa del sito per orientarti.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#12100E] transition-colors hover:bg-[#E6C65C]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Torna alla Home
        </button>
        <button
          type="button"
          onClick={() => onNavigate('sitemap')}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D4AF37]/30 bg-[#12100E]/60 px-5 py-2.5 text-sm font-medium text-[#F4F1EA] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
        >
          <Compass className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
          Mappa del sito
        </button>
      </div>
    </div>
  );
}
