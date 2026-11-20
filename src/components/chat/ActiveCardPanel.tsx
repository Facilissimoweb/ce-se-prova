import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getSiteLanguage, maggioriNameFor } from '../../i18n';
import type { ArcanaCard } from '../../types/handoff';
import type { SpreadDrawItem } from '../../data/majorArcana';
import { MajorArcanaArtwork } from '../MajorArcanaArtwork';

interface ActiveCardPanelProps {
  activeCard: ArcanaCard;
  activeSpread: SpreadDrawItem[] | null;
  cardTab: 'lettura' | 'domande';
  onChangeTab: (tab: 'lettura' | 'domande') => void;
  onFocusSpreadCard: (card: ArcanaCard) => void;
  onAskQuestion: (question: string) => void;
  onBookConsult: () => void;
}

export function ActiveCardPanel({
  activeCard,
  activeSpread,
  cardTab,
  onChangeTab,
  onFocusSpreadCard,
  onAskQuestion,
  onBookConsult,
}: ActiveCardPanelProps) {
  const lang = getSiteLanguage();
  const displayName = maggioriNameFor(lang, activeCard.id, activeCard.name);
  return (
    <section
      aria-label={`Arcano selezionato ${displayName}`}
      className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/15 flex flex-col gap-5 bg-[#151311]/55"
    >
      {activeSpread && (
        <div className="space-y-2 pb-3 border-b border-[#D4AF37]/15">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Stesa Attiva · Clicca una carta per ispezionarla
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {activeSpread.map((item) => {
              const focused = activeCard.id === item.card.id;
              return (
                <button
                  key={item.position}
                  type="button"
                  onClick={() => onFocusSpreadCard(item.card)}
                  className={`rounded-xl p-1.5 border text-left transition-all ${
                    focused
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37]'
                      : 'bg-[#12100E]/80 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <MajorArcanaArtwork
                    number={item.card.number}
                    numeral={item.card.numeral}
                    name={maggioriNameFor(lang, item.card.id, item.card.name)}
                    compact
                    className="w-full h-auto rounded-lg"
                  />
                  <span className="block text-[10px] font-semibold text-[#D4AF37] text-center mt-1.5 truncate">
                    {item.position.split(' · ')[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            {activeSpread ? 'Focus Carta Selezionata' : 'Arcano Attivo'}
          </p>
          <h2 className="font-body font-semibold tracking-[-0.02em] text-xl text-[#F4F1EA]">
            {displayName} · {activeCard.numeral}
          </h2>
        </div>

        <div className="flex items-center p-1 rounded-lg bg-[#12100E] border border-[#D4AF37]/20 shrink-0">
          <button
            type="button"
            onClick={() => onChangeTab('lettura')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
              cardTab === 'lettura'
                ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                : 'text-[#A39B93] hover:text-[#F4F1EA]'
            }`}
          >
            Lettura
          </button>
          <button
            type="button"
            onClick={() => onChangeTab('domande')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
              cardTab === 'domande'
                ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                : 'text-[#A39B93] hover:text-[#F4F1EA]'
            }`}
          >
            Domande
          </button>
        </div>
      </div>

      {cardTab === 'lettura' ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center sm:items-start lg:items-center xl:items-start gap-5">
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
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-[#A39B93]">
            Seleziona una domanda legata a {displayName} ({activeCard.numeral}) per
            esplorarla nel dialogo:
          </p>
          {activeCard.maieuticQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => onAskQuestion(question)}
              className="w-full text-left p-3.5 rounded-xl bg-[#12100E]/80 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs md:text-sm text-[#F4F1EA] leading-relaxed flex items-start justify-between gap-3 transition-colors group"
            >
              <span>{question}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between gap-3">
        <span className="text-xs text-[#A39B93]">
          Vuoi una chiamata vocale individuale?
        </span>
        <button
          type="button"
          onClick={onBookConsult}
          className="text-xs font-semibold text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1 whitespace-nowrap"
        >
          Prenota ora <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
