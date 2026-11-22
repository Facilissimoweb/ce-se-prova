import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  RotateCcw,
  Shuffle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CourseModuleFlashcardDeck } from '../../data/flashcards/arcaniMaggiori';
import { requestGoogleTranslateRefresh } from '../../lib/googleTranslateRuntime';
import { GtSafeBoundary } from '../GtSafeBoundary';

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
  // ENN-204 / ENN-161 — Italian DOM source so Google Translate can localize;
  // never live-locale t() (EN overlays cannot be re-translated cleanly).
  const { i18n } = useTranslation('common');
  const tIt = i18n.getFixedT('it', 'common');

  const baseOrder = useMemo(() => deck.cards.map((c) => c.id), [deck.cards]);
  const [order, setOrder] = useState<number[]>(baseOrder);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  /** Discard GT `<font>` wrappers when face remount fails (ENN-162). */
  const [faceEpoch, setFaceEpoch] = useState(0);

  useEffect(() => {
    setOrder(baseOrder);
    setIndex(0);
    setFlipped(false);
    setFaceEpoch((n) => n + 1);
  }, [baseOrder, deck.courseSlug, deck.moduleNumber]);

  const cardById = useMemo(() => {
    const map = new Map(deck.cards.map((c) => [c.id, c]));
    return map;
  }, [deck.cards]);

  const current = cardById.get(order[index] ?? -1) ?? null;
  const total = order.length;
  const position = total === 0 ? 0 : index + 1;

  /**
   * ENN-162 — remount Q and A as separate faces so GT never reconciles against
   * a previous side’s `<font>` wrappers (partial IT/EN mix). Include card id so
   * shuffle at the same index still refreshes.
   */
  const faceKey = current
    ? `sigillo-${deck.moduleNumber}-${current.id}-${flipped ? 'a' : 'q'}-${faceEpoch}`
    : `sigillo-empty-${faceEpoch}`;

  // Flip / prev-next / shuffle / deck change — refresh like Nina (late nudge
  // after remount; TranslateElement often misses the first combo pulse).
  useEffect(() => {
    requestGoogleTranslateRefresh(140);
    const mid = window.setTimeout(
      () => requestGoogleTranslateRefresh(380),
      300
    );
    const late = window.setTimeout(
      () => requestGoogleTranslateRefresh(900),
      700
    );
    return () => {
      window.clearTimeout(mid);
      window.clearTimeout(late);
    };
  }, [deck.courseSlug, deck.moduleNumber, faceKey]);

  const go = (delta: number) => {
    if (total === 0) return;
    setFlipped(false);
    setFaceEpoch((n) => n + 1);
    setIndex((prev) => (prev + delta + total) % total);
  };

  const handleShuffle = () => {
    setOrder(shuffleIds(baseOrder));
    setIndex(0);
    setFlipped(false);
    setFaceEpoch((n) => n + 1);
  };

  const handleReset = () => {
    setOrder(baseOrder);
    setIndex(0);
    setFlipped(false);
    setFaceEpoch((n) => n + 1);
  };

  if (!current || total === 0) return null;

  // ENN-157/162 — whole Sigillo (chrome + Q/A) follows selected Google Translate.
  // Q/A bodies stay Italian in the data file; GT localizes them (no per-lang SPA bloat).
  return (
    <section
      className="space-y-4 rounded-2xl border border-[#D4AF37]/25 bg-[#12100E]/55 p-5 md:p-6"
      aria-label={tIt('sigillo.aria')}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1.5 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37] inline-flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            {tIt('sigillo.eyebrow')}
          </p>
          <h4 className="font-body font-semibold text-lg md:text-xl text-[#F4F1EA]">
            {deck.title}
          </h4>
          <p className="text-xs md:text-sm text-[#A39B93] leading-relaxed">
            {deck.subtitle} {tIt('sigillo.hintReveal')}
          </p>
        </div>
        <p className="text-xs text-[#E6C65C] tabular-nums font-medium shrink-0">
          {position} / {total}
        </p>
      </div>

      {/*
        ENN-181 — key GtSafeBoundary itself so the whole face tree remounts
        (Fragment-only remount left children under a GT-touched ancestor).
        Keep button key from ENN-164; bump faceEpoch on nav/shuffle/reset.
      */}
      <GtSafeBoundary
        key={faceKey}
        resetKey={faceKey}
        onError={() => setFaceEpoch((n) => n + 1)}
        fallback={
          <button
            type="button"
            onClick={() => setFaceEpoch((n) => n + 1)}
            className="w-full min-h-[200px] md:min-h-[240px] rounded-2xl border border-[#D4AF37]/35 bg-[#1A1615] px-5 py-6 text-sm text-[#E8e1dd]"
          >
            {tIt('sigillo.reload')}
          </button>
        }
      >
        <button
          key={faceKey}
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-pressed={flipped}
          className="group relative w-full min-h-[200px] md:min-h-[240px] rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#1A1615] to-[#0E0C0B] px-5 py-6 text-left transition-all hover:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#D4AF37]/90 mb-3">
            {flipped ? tIt('sigillo.answer') : tIt('sigillo.question')}
          </p>
          <h2
            className={`flashcard-body-text normal-case ${
              flipped ? 'flashcard-body-answer' : 'flashcard-body-question'
            }`}
          >
            {flipped ? current.answer : current.question}
          </h2>
          <p className="mt-5 text-[11px] text-[#A39B93] group-hover:text-[#E6C65C] transition-colors">
            {flipped ? tIt('sigillo.tapBack') : tIt('sigillo.tapReveal')}
          </p>
        </button>
      </GtSafeBoundary>

      {/*
        ENN-214 — stack full-label controls on small screens (2×2 cramped /
        overlapping). Desktop keeps a single horizontal row.
      */}
      <div
        className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-2.5"
        role="toolbar"
        aria-label={tIt('sigillo.toolbarAria')}
      >
        <button
          type="button"
          onClick={() => go(-1)}
          className="btn-secondary min-h-[44px] w-full px-3 py-2.5 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <ChevronLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {tIt('sigillo.prev')}
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="btn-primary min-h-[44px] w-full px-3 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          {tIt('sigillo.next')}
          <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleShuffle}
          className="btn-secondary min-h-[44px] w-full px-3 py-2.5 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <Shuffle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
          {tIt('sigillo.shuffle')}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="min-h-[44px] w-full px-3 py-2.5 rounded-lg border border-[#A39B93]/30 bg-[#151311]/60 hover:border-[#D4AF37] hover:text-[#F4F1EA] text-xs font-medium text-[#A39B93] inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <RotateCcw className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {tIt('sigillo.reset')}
        </button>
      </div>
    </section>
  );
}
