import React, { useMemo } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Download,
  Lock,
} from 'lucide-react';
import { MaterialsLanguagePicker } from '../MaterialsLanguagePicker';
import { PaymentTrustCues } from '../PaymentTrustCues';
import { GT_ENABLED } from '../../lib/googleTranslateEnabled';
import { DispensaFlashcards } from '../reserved/DispensaFlashcards';
import { DispensaSchedaVisiva } from '../reserved/DispensaSchedaVisiva';
import { FormattedDispensaBody } from '../reserved/FormattedDispensaBody';
import {
  getMaggioriDispensa01,
  getMaggioriMattoPreviewFlashcardDeck,
  getMaggioriMattoPreviewMarkdown,
  getMaggioriPreviewSidebarDispense,
} from '../../data/courses/maggioriMattoPreview';
import { getSchedaVisiva } from '../../data/schedeVisive';
import { SCROLL_LANDMARKS } from '../../lib/scrollNavigation';

interface MaggioriMattoPreviewProps {
  priceEur: number;
  compareAtPriceEur?: number;
  onEnroll: () => void;
  /** ENN-131 — open Modulo 01 gated blog companion (Il Matto) */
  onOpenModuloBlog?: () => void;
  /** ENN-133 — open Il Bagatto gated blog companion */
  onOpenBagattoBlog?: () => void;
}

/**
 * ENN-129 — Public Modulo 01 anteprima identical to Area Personale Maggiori
 * Dispensa reader (sidebar + header chrome + concetti chiave + FormattedDispensaBody),
 * truncated after Il Matto. Guest actions gated; Bagatto+ hidden.
 */
export function MaggioriMattoPreview({
  priceEur,
  compareAtPriceEur,
  onEnroll,
  onOpenModuloBlog,
  onOpenBagattoBlog,
}: MaggioriMattoPreviewProps) {
  const dispensa01 = useMemo(() => getMaggioriDispensa01(), []);
  const sidebarDispense = useMemo(() => getMaggioriPreviewSidebarDispense(), []);
  const markdown = useMemo(() => getMaggioriMattoPreviewMarkdown(), []);
  const mattoDeck = useMemo(() => getMaggioriMattoPreviewFlashcardDeck(), []);

  const embeds = useMemo(() => {
    const map: Record<string, React.ReactNode> = {};
    const scheda = getSchedaVisiva('il-matto');
    if (scheda) {
      map['scheda-visiva:il-matto'] = <DispensaSchedaVisiva content={scheda} />;
    }
    map['sigillo:il-matto'] = <DispensaFlashcards deck={mattoDeck} />;
    return map;
  }, [mattoDeck]);

  return (
    <section
      id={SCROLL_LANDMARKS.corsiMaggioriPreview}
      aria-labelledby="maggiori-matto-preview-heading"
      className="space-y-6 scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))]"
    >
      <h2 id="maggiori-matto-preview-heading" className="sr-only">
        Anteprima Dispensa 01 · Arcani Maggiori
      </h2>

      {/* Same 12-col workspace as Area Personale unlocked Maggiori reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-4 space-y-3">
          <div className="space-y-1 px-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Dispense del Percorso
            </p>
            <p className="font-body font-semibold text-xl text-[#F4F1EA]">
              Arcani Maggiori
            </p>
          </div>

          <div className="space-y-2.5">
            {sidebarDispense.map((dispensa) => {
              const isCurrent = dispensa.moduleNumber === '01';
              const locked = !isCurrent;
              return (
                <button
                  key={dispensa.moduleNumber}
                  type="button"
                  aria-pressed={isCurrent}
                  aria-disabled={locked}
                  title={
                    locked
                      ? 'Disponibile dopo l’iscrizione'
                      : undefined
                  }
                  onClick={() => {
                    if (locked) onEnroll();
                  }}
                  className={`w-full text-left rounded-xl p-4 border transition-all space-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isCurrent
                      ? 'bg-[#D4AF37]/14 border-[#D4AF37]'
                      : 'glass-tier-1 border-[#D4AF37]/18 opacity-75 hover:border-[#D4AF37]/40 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-display text-[#D4AF37] tabular-nums">
                      Dispensa {dispensa.moduleNumber}
                    </span>
                    <span className="text-[#A39B93] inline-flex items-center gap-1.5 tabular-nums">
                      {locked && (
                        <Lock className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                      )}
                      {dispensa.readingMinutes} min
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#F4F1EA]">
                    {dispensa.title}
                  </p>
                  <p className="text-xs text-[#A39B93] line-clamp-2">
                    {dispensa.format}
                  </p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            title="Disponibile dopo l’iscrizione"
            onClick={onEnroll}
            className="w-full text-left rounded-xl p-4 border border-[#D4AF37]/30 bg-[#D4AF37]/08 hover:border-[#D4AF37] hover:bg-[#D4AF37]/14 transition-all space-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="font-semibold uppercase tracking-[0.08em]">
                Approfondimenti
              </span>
              <Lock className="w-3.5 h-3.5 ml-auto shrink-0" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-[#F4F1EA]">
              Approfondimenti Terzo Settenario
            </p>
            <p className="text-xs text-[#A39B93]">
              Nodi pratici · XV–XXI · Sintesi per il consultante
            </p>
          </button>
        </aside>

        <article className="lg:col-span-8 glass-tier-1 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#D4AF37]/15 pb-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#D4AF37]">
                <span className="font-semibold uppercase tracking-[0.08em]">
                  Modulo {dispensa01.moduleNumber}
                </span>
                <span aria-hidden="true" className="text-[#D4AF37]/50">
                  ·
                </span>
                <span className="text-[#A39B93]">{dispensa01.format}</span>
                <span aria-hidden="true" className="text-[#D4AF37]/50">
                  ·
                </span>
                <span className="text-[#A39B93] inline-flex items-center gap-1 tabular-nums">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                  {dispensa01.readingMinutes} min lettura
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-[28px] text-[#F4F1EA]">
                {dispensa01.title}
              </h3>
              <p className="text-sm text-[#A39B93]">{dispensa01.subtitle}</p>
            </div>

            <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
              <MaterialsLanguagePicker />
              <p className="text-[11px] text-[#A39B93] max-w-[16rem] sm:text-right">
                {GT_ENABLED
                  ? 'Dopo l’iscrizione: PDF brandizzato nella lingua di Traduci (auto da italiano).'
                  : 'Dopo l’iscrizione: PDF brandizzato in italiano.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled
                  title="Disponibile dopo l’iscrizione in Area Riservata"
                  className="px-3.5 py-2 min-h-[40px] rounded-lg border border-[#D4AF37]/30 text-xs font-medium text-[#F4F1EA]/55 inline-flex items-center gap-1.5 whitespace-nowrap cursor-not-allowed"
                >
                  <Download
                    className="w-3.5 h-3.5 text-[#D4AF37]/70"
                    aria-hidden="true"
                  />
                  Scarica Dispensa
                </button>
                <button
                  type="button"
                  disabled
                  title="Disponibile dopo l’iscrizione"
                  className="px-3.5 py-2 min-h-[40px] rounded-lg bg-[#D4AF37]/12 border border-[#D4AF37]/35 text-xs font-semibold text-[#F4F1EA]/55 inline-flex items-center gap-1.5 whitespace-nowrap cursor-not-allowed"
                >
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  Segna Completato
                </button>
              </div>
            </div>
          </div>

          {dispensa01.keyTakeaways.length > 0 && (
            <div className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/20 p-4 md:p-5 space-y-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                Concetti Chiave della Dispensa
              </p>
              <ul className="space-y-2">
                {dispensa01.keyTakeaways.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-xs md:text-sm text-[#E8e1dd]"
                  >
                    <Check
                      className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <FormattedDispensaBody markdown={markdown} embeds={embeds} />

          {/* Cut after Il Matto — guest enroll CTA (no Bagatto+, notes, or next module) */}
          <div className="gold-divider" aria-hidden="true" />

          {(onOpenModuloBlog || onOpenBagattoBlog) && (
            <div className="rounded-xl border border-[#D4AF37]/18 bg-[#12100E]/50 p-4 md:p-5 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                Dal Blog · Modulo 01
              </p>
              <p className="text-sm text-[#E8e1dd] leading-relaxed">
                Due articoli compagni: Il Matto (0) e Il Bagatto (I). Intro
                pubblica; approfondimento sbloccato con l&apos;acquisto Maggiori.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
                {onOpenModuloBlog && (
                  <button
                    type="button"
                    onClick={onOpenModuloBlog}
                    className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#D4AF37] transition-colors hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
                  >
                    Leggi Il Matto
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
                {onOpenBagattoBlog && (
                  <button
                    type="button"
                    onClick={onOpenBagattoBlog}
                    className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#D4AF37] transition-colors hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
                  >
                    Leggi Il Bagatto
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border border-[#D4AF37]/22 bg-[#D4AF37]/8 p-4 md:p-5">
            <div className="flex-1 space-y-1.5 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#D4AF37] inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                Fine anteprima · dopo Il Matto
              </p>
              <p className="text-sm text-[#E8e1dd] leading-relaxed">
                Bagatto–Carro, le dispense successive, gli Approfondimenti e Nina
                Studio (chat riservata) si sbloccano con l&apos;iscrizione
                Maggiori
                {compareAtPriceEur != null && compareAtPriceEur > priceEur ? (
                  <>
                    {' '}
                    (
                    <span className="tabular-nums line-through text-[#A39B93]">
                      € {compareAtPriceEur}
                    </span>{' '}
                    <span className="tabular-nums font-semibold text-[#F4F1EA]">
                      € {priceEur}
                    </span>
                    ).
                  </>
                ) : (
                  <> (€ {priceEur}).</>
                )}
              </p>
            </div>
            <div className="shrink-0 w-full sm:w-auto space-y-2">
              <button
                type="button"
                onClick={onEnroll}
                className="cta-label w-full min-h-[46px] px-5 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] transition-all duration-150 hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
              >
                Iscriviti al Percorso (€ {priceEur})
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <PaymentTrustCues compact prominent />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
