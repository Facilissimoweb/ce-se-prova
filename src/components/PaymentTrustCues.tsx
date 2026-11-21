import React from 'react';
import { Lock } from 'lucide-react';

type PaymentTrustCuesProps = {
  /** Tighter typography under tariff / catalog CTAs. */
  compact?: boolean;
  className?: string;
};

/**
 * ENN-172 — Light Stripe + Klarna trust cues next to checkout CTAs.
 * Short trusted copy + brand wordmarks; no fake seals or promo cards.
 */
export function PaymentTrustCues({
  compact = false,
  className = '',
}: PaymentTrustCuesProps) {
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
        <span className="font-semibold tracking-tight text-[#F4F1EA]/95">
          Klarna
        </span>
      </span>
    </p>
  );
}
