import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  RotateCcw,
  Shuffle,
} from 'lucide-react';
import type { CourseModuleFlashcardDeck } from '../../data/flashcards/arcaniMaggiori';

interface DispensaFlashcardsProps {
  deck: CourseModuleFlashcardDeck;
}

function shuffleIds(ids: number[]): number[] {
  const next = [...ids];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function DispensaFlashcards({ deck }: DispensaFlashcardsProps) {
  const baseOrder = useMemo(() => deck.cards.map((c) => c.id), [deck.cards]);
  const [order, setOrder] = useState<number[]>(baseOrder);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setOrder(baseOrder);
    setIndex(0);
    setFlipped(false);
  }, [baseOrder, deck.courseSlug, deck.moduleNumber]);

  const cardById = useMemo(() => {
    const map = new Map(deck.cards.map((c) => [c.id, c]));
    return map;
  }, [deck.cards]);

  const current = cardById.get(order[index] ?? -1) ?? null;
  const total = order.length;
  const position = total === 0 ? 0 : index + 1;

  const go = (delta: number) => {
    if (total === 0) return;
    setFlipped(false);
    setIndex((prev) => (prev + delta + total) % total);
  };

  const handleShuffle = () => {
    setOrder(shuffleIds(baseOrder));
    setIndex(0);
    setFlipped(false);
  };

  const handleReset = () => {
    setOrder(baseOrder);
    setIndex(0);
    setFlipped(false);
  };

  if (!current || total === 0) return null;

  return (
    <section
      className="space-y-4 rounded-2xl border border-[#D4AF37]/25 bg-[#12100E]/55 p-5 md:p-6"
      aria-label="Sigillo di apprendimento con flashcard"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1.5 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37] inline-flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            Sigillo di apprendimento
          </p>
          <h4 className="font-body font-semibold text-lg md:text-xl text-[#F4F1EA]">
            {deck.title}
          </h4>
          <p className="text-xs md:text-sm text-[#A39B93] leading-relaxed">
            {deck.subtitle} Tocca la carta per rivelare la risposta.
          </p>
        </div>
        <p className="text-xs text-[#E6C65C] tabular-nums font-medium shrink-0">
          {position} / {total}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        className="group relative w-full min-h-[200px] md:min-h-[240px] rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#1A1615] to-[#0E0C0B] px-5 py-6 text-left transition-all hover:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#D4AF37]/90 mb-3">
          {flipped ? 'Risposta' : 'Domanda'}
        </p>
        <p className="font-display text-base md:text-lg leading-relaxed text-[#F4F1EA]">
          {flipped ? current.answer : current.question}
        </p>
        <p className="mt-5 text-[11px] text-[#A39B93] group-hover:text-[#E6C65C] transition-colors">
          {flipped ? 'Tocca per tornare alla domanda' : 'Tocca per rivelare la risposta'}
        </p>
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="px-3.5 py-2 min-h-[40px] rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-medium text-[#F4F1EA] inline-flex items-center gap-1.5"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
            Precedente
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="px-3.5 py-2 min-h-[40px] rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-medium text-[#F4F1EA] inline-flex items-center gap-1.5"
          >
            Successiva
            <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleShuffle}
            className="px-3.5 py-2 min-h-[40px] rounded-lg bg-[#D4AF37]/12 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-medium text-[#F4F1EA] inline-flex items-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#D4AF37]" />
            Mescola
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 min-h-[40px] rounded-lg border border-[#A39B93]/25 hover:border-[#D4AF37] text-xs font-medium text-[#A39B93] hover:text-[#F4F1EA] inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Dall&apos;inizio
          </button>
        </div>
      </div>
    </section>
  );
}
