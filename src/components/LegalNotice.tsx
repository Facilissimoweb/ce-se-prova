import React, { useEffect, useId, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { legalContent } from '../data/legalContent';

export type LegalKind = 'privacy' | 'disclaimer' | 'tutela' | 'vendita';

type Props = {
  kind: LegalKind | null;
  onClose: () => void;
};

const TOKEN =
  /(\[[^\]]+\]\(https?:\/\/[^)\s]+\)|www\.tarotitalia\.com|info@tarotitalia\.com|mariateresarogani@gmail\.com|tarotitalia\.com|\+39 379 103 82 53)/g;

export function LegalCopy({ children }: { children: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(TOKEN.source, 'g');
  while ((match = re.exec(children))) {
    if (match.index > last) {
      nodes.push(children.slice(last, match.index));
    }
    const token = match[0];
    const md = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (md) {
      nodes.push(
        <a
          key={`${md[2]}-${match.index}`}
          href={md[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-[#E6C65C]"
        >
          {md[1]}
        </a>
      );
    } else if (token.includes('@')) {
      nodes.push(
        <a
          key={`${token}-${match.index}`}
          href={`mailto:${token}`}
          className="underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-[#E6C65C]"
        >
          {token}
        </a>
      );
    } else if (token.startsWith('+39')) {
      nodes.push(
        <a
          key={`${token}-${match.index}`}
          href="https://wa.me/393791038253"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-[#E6C65C]"
        >
          {token}
        </a>
      );
    } else {
      nodes.push(
        <a
          key={`${token}-${match.index}`}
          href={legalContent.sitoUrl}
          className="underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-[#E6C65C]"
        >
          {token}
        </a>
      );
    }
    last = match.index + token.length;
  }
  if (last < children.length) nodes.push(children.slice(last));
  return <>{nodes}</>;
}

export function PrivacyBody({ className = 'mt-8' }: { className?: string } = {}) {
  const { privacy } = legalContent;
  return (
    <div className={`space-y-8 text-left ${className}`.trim()}>
      {privacy.intro.map((paragrafo) => (
        <p key={paragrafo.slice(0, 48)} className="text-sm leading-[1.9] text-[#A39B93]">
          <LegalCopy>{paragrafo}</LegalCopy>
        </p>
      ))}
      {privacy.sezioni.map((sezione) => (
        <section key={sezione.titolo} className="border-t border-[#D4AF37]/15 pt-8">
          <h3 className="font-display text-lg leading-snug text-[#F4F1EA]">{sezione.titolo}</h3>
          <div className="mt-4 space-y-4">
            {sezione.testi.map((paragrafo) => (
              <p key={paragrafo.slice(0, 64)} className="text-sm leading-[1.9] text-[#A39B93]">
                <LegalCopy>{paragrafo}</LegalCopy>
              </p>
            ))}
            {'elenchi' in sezione && sezione.elenchi ? (
              <ul className="list-disc space-y-2 pl-5 text-sm leading-[1.9] text-[#A39B93]">
                {sezione.elenchi.map((voce) => (
                  <li key={voce}>
                    <LegalCopy>{voce}</LegalCopy>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}

export function DisclaimerBody({ className = 'mt-8' }: { className?: string } = {}) {
  const { disclaimer } = legalContent;
  return (
    <div className={`${className} space-y-8 text-left`}>
      <h3 className="text-center font-display text-base uppercase leading-relaxed tracking-[0.16em] text-[#F4F1EA]">
        {disclaimer.heading}
      </h3>
      {disclaimer.paragrafi.map((paragrafo) => (
        <p key={paragrafo.slice(0, 48)} className="text-sm leading-[1.9] text-[#A39B93]">
          <LegalCopy>{paragrafo}</LegalCopy>
        </p>
      ))}
    </div>
  );
}

export function TutelaBody({ className = 'mt-8' }: { className?: string } = {}) {
  const { tutela } = legalContent;
  return (
    <div className={`${className} space-y-8 text-left`}>
      <p className="text-sm leading-[1.9] text-[#A39B93]">
        <LegalCopy>{tutela.intro}</LegalCopy>
      </p>
      {tutela.punti.map((punto) => (
        <section key={punto.titolo} className="border-t border-[#D4AF37]/15 pt-8">
          <h3 className="font-display text-lg leading-snug text-[#F4F1EA]">{punto.titolo}</h3>
          <p className="mt-4 text-sm leading-[1.9] text-[#A39B93]">
            <LegalCopy>{punto.testo}</LegalCopy>
          </p>
        </section>
      ))}
    </div>
  );
}

export function VenditaBody({
  className = 'mt-8',
  alwaysOpen = false,
}: {
  className?: string;
  alwaysOpen?: boolean;
} = {}) {
  const { vendita } = legalContent;
  const [open, setOpen] = useState<string>(vendita.sezioni[0].id);

  return (
    <div className={`text-left ${className}`.trim()}>
      {vendita.sezioni.map((sezione) => {
        const expanded = alwaysOpen || open === sezione.id;
        return (
          <section key={sezione.id} className="border-t border-[#D4AF37]/15">
            {alwaysOpen ? (
              <h3 className="py-5 font-display text-lg leading-snug text-[#F4F1EA]">
                {sezione.titolo}
              </h3>
            ) : (
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? '' : sezione.id)}
              >
                <h3 className="font-display text-lg leading-snug text-[#F4F1EA]">
                  {sezione.titolo}
                </h3>
                <span className="mt-1 shrink-0 text-[#D4AF37]" aria-hidden>
                  {expanded ? '–' : '+'}
                </span>
              </button>
            )}
            {expanded ? (
              <div className="space-y-4 pb-6">
                {sezione.testi.map((paragrafo) => (
                  <p key={paragrafo.slice(0, 64)} className="text-sm leading-[1.9] text-[#A39B93]">
                    <LegalCopy>{paragrafo}</LegalCopy>
                  </p>
                ))}
              </div>
            ) : null}
          </section>
        );
      })}
      <section className="border-t border-[#D4AF37]/15 pt-8">
        <h3 className="font-display text-lg leading-snug text-[#F4F1EA]">
          {vendita.assistenza.titolo}
        </h3>
        <div className="mt-4 space-y-4">
          {(vendita.assistenza.testi ?? [vendita.assistenza.testo]).map((paragrafo) => (
            <p key={paragrafo} className="text-sm leading-[1.9] text-[#A39B93]">
              <LegalCopy>{paragrafo}</LegalCopy>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

function legalMeta(kind: LegalKind) {
  switch (kind) {
    case 'privacy':
      return legalContent.privacy;
    case 'disclaimer':
      return legalContent.disclaimer;
    case 'tutela':
      return legalContent.tutela;
    case 'vendita':
      return legalContent.vendita;
  }
}

function LegalBody({ kind }: { kind: LegalKind }) {
  switch (kind) {
    case 'privacy':
      return <PrivacyBody />;
    case 'disclaimer':
      return <DisclaimerBody />;
    case 'tutela':
      return <TutelaBody />;
    case 'vendita':
      return <VenditaBody />;
  }
}

/** Modale legale (tutela / disclaimer / termini) — stile Ennamo. */
export function LegalNotice({ kind, onClose }: Props) {
  const titleId = useId();

  useEffect(() => {
    if (!kind) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [kind, onClose]);

  if (!kind || typeof document === 'undefined') return null;

  const meta = legalMeta(kind);

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[#12100E]/80 p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-[#D4AF37]/20 bg-[#1A1714] shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#D4AF37]/15 px-6 py-5 md:px-8">
          <div>
            <h2 id={titleId} className="font-display text-xl text-[#F4F1EA]">
              {meta.titolo}
            </h2>
            <p className="mt-1 text-[0.75rem] text-[#A39B93]">
              <LegalCopy>{meta.intestazione}</LegalCopy>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#A39B93] hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA]"
            aria-label="Chiudi"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          <LegalBody kind={kind} />
        </div>
        {kind === 'disclaimer' ? (
          <div className="shrink-0 border-t border-[#D4AF37]/15 px-6 py-4 md:px-8">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-[#12100E] hover:bg-[#E6C65C]"
            >
              {legalContent.disclaimer.conferma}
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
