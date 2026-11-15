import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { SITEMAP_ENTRIES } from '../lib/appPaths';

type Props = {
  onNavigate: (screen: ScreenId) => void;
};

/** Pagina utente `/sitemap` — indice delle sezioni pubbliche. */
export function SitemapScreen({ onNavigate }: Props) {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Mappa del sito — Tarot Italia';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="space-y-8 pb-12 pt-6 md:pt-10">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-sm text-[#A39B93] transition-colors hover:text-[#D4AF37]"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna alla Home
      </button>

      <header className="space-y-3 border-b border-[#D4AF37]/15 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
          Orientamento
        </p>
        <h1 className="font-display text-3xl leading-tight text-[#F4F1EA] md:text-4xl">
          Mappa del sito
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[#A39B93]">
          Elenco delle pagine pubbliche di Tarot Italia. Per i motori di ricerca
          è disponibile anche{' '}
          <a
            href="/sitemap.xml"
            className="text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-2 hover:text-[#E6C65C]"
          >
            /sitemap.xml
          </a>
          .
        </p>
      </header>

      <nav aria-label="Mappa del sito" className="mx-auto max-w-3xl">
        <ul className="divide-y divide-[#D4AF37]/12 border-y border-[#D4AF37]/12">
          {SITEMAP_ENTRIES.map((entry) => (
            <li key={entry.path}>
              <button
                type="button"
                onClick={() => onNavigate(entry.screen)}
                className="group flex w-full flex-col gap-1 px-1 py-4 text-left transition-colors hover:bg-[#D4AF37]/05 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="font-display text-base text-[#F4F1EA] group-hover:text-[#D4AF37] sm:text-lg">
                  {entry.label}
                </span>
                <span className="text-xs leading-relaxed text-[#A39B93] sm:max-w-md sm:text-right">
                  {entry.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
