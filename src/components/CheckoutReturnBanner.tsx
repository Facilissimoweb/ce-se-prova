import React, { useEffect, useState } from 'react';

type Variant = 'course' | 'dialogue';

type Props = {
  variant: Variant;
};

/**
 * Banner per ritorno Stripe cancel (pattern v2: `checkout=cancel` su area riservata / dialogo).
 * Supporta anche i query legacy `*_cancelled=true`.
 */
export function CheckoutReturnBanner({ variant }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cancelled =
      params.get('checkout') === 'cancel' ||
      (variant === 'course' && params.get('course_cancelled') === 'true') ||
      (variant === 'dialogue' && params.get('dialogue_cancelled') === 'true');
    if (!cancelled) return;

    setVisible(true);
    const next = new URLSearchParams(params);
    next.delete('checkout');
    next.delete('item');
    next.delete('course_cancelled');
    next.delete('dialogue_cancelled');
    const qs = next.toString();
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${qs ? `?${qs}` : ''}`
    );
  }, [variant]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="mb-6 rounded-lg border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-4 py-3 text-sm text-[#F4F1EA]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p>
          {variant === 'course'
            ? 'Pagamento corso annullato. Nessun addebito: puoi riprovare quando vuoi dall’area riservata.'
            : 'Pagamento dialogo annullato. Nessun addebito: puoi riprendere il checkout dal pannello pass.'}
        </p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#E6C65C]"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
}
