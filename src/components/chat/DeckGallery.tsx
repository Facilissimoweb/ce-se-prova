import React from 'react';
import { X } from 'lucide-react';
import { getSiteLanguage, maggioriNameFor } from '../../i18n';
import type { ArcanaCard } from '../../types/handoff';
import { MAJOR_ARCANA } from '../../data/majorArcana';
import { MajorArcanaArtwork } from '../MajorArcanaArtwork';

interface DeckGalleryProps {
  activeCardId: string;
  onClose: () => void;
  onSelectCard: (card: ArcanaCard) => void;
}

export function DeckGallery({
  activeCardId,
  onClose,
  onSelectCard,
}: DeckGalleryProps) {
  const lang = getSiteLanguage();
  return (
    <section
      aria-label="Galleria dei 22 Arcani Maggiori"
      className="p-5 md:p-6 bg-[#100E0C]/90 border-b border-[#D4AF37]/20 space-y-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Mazzo Completo · 0 – XXI
          </p>
          <h2 className="font-body font-semibold tracking-[-0.015em] text-base md:text-lg text-[#F4F1EA]">
            Scegli una delle 22 lame del mazzo
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi galleria degli Arcani"
          className="w-9 h-9 rounded-lg border border-[#D4AF37]/25 flex items-center justify-center text-[#A39B93] hover:text-[#F4F1EA] hover:border-[#D4AF37]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
        {MAJOR_ARCANA.map((card) => {
          const isSelected = activeCardId === card.id;
          const displayName = maggioriNameFor(lang, card.id, card.name);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectCard(card)}
              className={`group rounded-xl p-1.5 border text-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isSelected
                  ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                  : 'bg-[#151311]/75 border-[#D4AF37]/15 hover:border-[#D4AF37]/60 hover:-translate-y-0.5'
              }`}
              title={`${card.numeral} · ${displayName}`}
            >
              <MajorArcanaArtwork
                number={card.number}
                numeral={card.numeral}
                name={displayName}
                compact
                className="w-full h-auto rounded-lg"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
