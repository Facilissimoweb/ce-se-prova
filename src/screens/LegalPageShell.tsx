import React, { type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { LegalCopy } from '../components/LegalNotice';

type LegalPageShellProps = {
  title: string;
  /** Kept for call-site compatibility; document title is owned by DocumentSeo. */
  documentTitle: string;
  intestazione: string;
  onNavigate: (screen: ScreenId) => void;
  children: ReactNode;
};

/** Layout condiviso per Privacy / Termini / Disclaimer (pagine pubbliche). */
export function LegalPageShell({
  title,
  documentTitle: _documentTitle,
  intestazione,
  onNavigate,
  children,
}: LegalPageShellProps) {
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
          Informazioni legali
        </p>
        <h1 className="font-display text-3xl leading-tight text-[#F4F1EA] md:text-4xl">
          {title}
        </h1>
        <p className="text-center text-[0.75rem] text-[#A39B93] md:text-left">
          <LegalCopy>{intestazione}</LegalCopy>
        </p>
      </header>

      <article className="mx-auto max-w-3xl">{children}</article>
    </div>
  );
}
