import React from 'react';
import { getSiteLanguage, maggioriNameFor } from '../../i18n';
import type { ArcanaCard } from '../../types/handoff';
import { MajorArcanaArtwork } from '../MajorArcanaArtwork';

interface ActiveCardPanelProps {
  activeCard: ArcanaCard;
  /** Ancora per scroll mobile all’inizio del resoconto. */
  resultScrollRef?: React.Ref<HTMLElement | null>;
}

export function ActiveCardPanel({
  activeCard,
  resultScrollRef,
}: ActiveCardPanelProps) {
  const lang = getSiteLanguage();
  const displayName = maggioriNameFor(lang, activeCard.id, activeCard.name);
  return (
    <section
      ref={resultScrollRef}
      aria-label={`Resoconto ${displayName}`}
      className="p-5 md:p-6 flex flex-col gap-5 bg-[#151311]/55"
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
          Resoconto dell’Arcano
        </p>
        <h2 className="font-body font-semibold tracking-[-0.02em] text-xl text-[#F4F1EA]">
          {displayName} · {activeCard.numeral}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-36 shrink-0 rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
            <MajorArcanaArtwork
              number={activeCard.number}
              numeral={activeCard.numeral}
              name={displayName}
              className="w-full h-auto"
            />
          </div>
          <div className="space-y-2.5 text-sm">
            <p className="text-xs text-[#D4AF37] font-medium">{activeCard.archetype}</p>
            <p className="text-xs text-[#A39B93]">
              {activeCard.element} · {activeCard.keywords.join(' · ')}
            </p>
            <div className="space-y-1 pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#D4AF37]">
                Presente
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-[#E8e1dd]">
                {activeCard.synthesis}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 p-3 space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#D4AF37]">
              Amore
            </p>
            <p className="text-xs leading-relaxed text-[#E8e1dd]">
              {activeCard.loveReading}
            </p>
            {activeCard.loveFuture && (
              <p className="text-xs leading-relaxed text-[#A39B93] pt-1 border-t border-[#D4AF37]/10">
                Futuro: {activeCard.loveFuture}
              </p>
            )}
            {activeCard.loveAdvice && (
              <p className="text-xs leading-relaxed text-[#A39B93]">
                Consiglio: {activeCard.loveAdvice}
              </p>
            )}
          </div>
          <div className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 p-3 space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#D4AF37]">
              Lavoro
            </p>
            <p className="text-xs leading-relaxed text-[#E8e1dd]">
              {activeCard.workReading}
            </p>
            {activeCard.workFuture && (
              <p className="text-xs leading-relaxed text-[#A39B93] pt-1 border-t border-[#D4AF37]/10">
                Futuro: {activeCard.workFuture}
              </p>
            )}
            {activeCard.workAdvice && (
              <p className="text-xs leading-relaxed text-[#A39B93]">
                Consiglio: {activeCard.workAdvice}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 p-3.5 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#D4AF37]">
            Linea Previsionale · Futuro
          </p>
          <p className="text-xs leading-relaxed text-[#E8e1dd]">
            {activeCard.futureTendency}
          </p>
          <p className="text-xs leading-relaxed text-[#A39B93] pt-1 border-t border-[#D4AF37]/10">
            Consiglio: {activeCard.advice}
          </p>
        </div>
      </div>
    </section>
  );
}
