import React from 'react';
import { Lock } from 'lucide-react';

type PaymentTrustCuesProps = {
  /** Tighter typography under tariff / catalog CTAs. */
  compact?: boolean;
  /**
   * Buy / Prenota CTAs (Maggiori + consulti) — Klarna pink badge + Stripe
   * secure, more visible than the default microcopy.
   */
  prominent?: boolean;
  className?: string;
};

/** Klarna brand pink (official accent). */
const KLARNA_PINK = '#FFA8CD';

function KlarnaMark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 font-semibold tracking-tight text-[#0A0B09] ${className}`.trim()}
      style={{ backgroundColor: KLARNA_PINK }}
      aria-hidden="true"
    >
      Klarna
    </span>
  );
}

/**
 * ENN-172 / ENN-170 / ENN-177 — Stripe + Klarna trust cues next to checkout CTAs.
 * Short trusted copy + brand marks; no fake seals or promo cards.
 */
export function PaymentTrustCues({
  compact = false,
  prominent = false,
  className = '',
}: PaymentTrustCuesProps) {
  if (prominent) {
    return (
      <div
        role="note"
        className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${
          compact ? 'justify-center' : ''
        } ${className}`.trim()}
      >
        <span className="inline-flex items-center gap-2 text-sm text-[#F4F1EA]">
          <KlarnaMark className="text-[13px] leading-none" />
          <span className="font-medium leading-snug">
            Paga in 3 rate con Klarna
          </span>
        </span>
        <span
          className="hidden h-4 w-px bg-[#D4AF37]/35 sm:block"
          aria-hidden="true"
        />
        <span className="inline-flex items-center gap-1.5 text-xs leading-snug text-[#A39B93]">
          <Lock
            className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/85"
            aria-hidden="true"
          />
          Pagamento sicuro{' '}
          <span className="font-semibold lowercase tracking-tight text-[#F4F1EA]/95">
            stripe
          </span>
        </span>
      </div>
    );
  }

  return (
    <p
      role="note"
      className={`flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[#A39B93] ${
        compact ? 'justify-center text-[11px] leading-snug' : 'text-xs leading-relaxed'
      } ${className}`.trim()}
    >
      <Lock
        className={`shrink-0 text-[#D4AF37]/85 ${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'}`}
        aria-hidden="true"
      />
      <span className="min-w-0">
        Pagamento sicuro via{' '}
        <span className="font-semibold lowercase tracking-tight text-[#F4F1EA]/95">
          stripe
        </span>
        {' · '}
        rate possibili con{' '}
        <KlarnaMark
          className={compact ? 'text-[10px] leading-none' : 'text-[11px] leading-none'}
        />
      </span>
    </p>
  );
}

type CourseOfferPriceProps = {
  priceEur: number;
  compareAtPriceEur?: number;
  /** Visual weight of the live price. */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

/**
 * ENN-170 — Live price with optional struck list price (€149 → €69).
 */
export function CourseOfferPrice({
  priceEur,
  compareAtPriceEur,
  size = 'lg',
  className = '',
}: CourseOfferPriceProps) {
  const liveClass =
    size === 'lg'
      ? 'font-display text-3xl text-[#F4F1EA] tabular-nums'
      : size === 'md'
        ? 'font-display text-2xl text-[#D4AF37] tabular-nums'
        : 'text-xs text-[#A39B93] tabular-nums';

  return (
    <span
      className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${className}`.trim()}
    >
      {compareAtPriceEur != null && compareAtPriceEur > priceEur ? (
        <span
          className={`tabular-nums text-[#A39B93] line-through decoration-[#A39B93]/80 ${
            size === 'lg'
              ? 'font-display text-xl'
              : size === 'md'
                ? 'font-display text-base'
                : 'text-[11px]'
          }`}
        >
          € {compareAtPriceEur}
        </span>
      ) : null}
      <span className={liveClass}>€ {priceEur}</span>
    </span>
  );
}
