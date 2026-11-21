import React, { useEffect, useState } from 'react';
import { GT_ENABLED } from '../lib/googleTranslateEnabled';
import {
  GT_REFRESH_EVENT,
  readGoogTransLang,
} from '../lib/googleTranslateRuntime';

type Props = {
  className?: string;
  /** Compact inline control next to download buttons. */
  size?: 'sm' | 'md';
};

/**
 * ENN-145 — Dispensa PDF follows Google Translate (`googtrans`), not a separate
 * curated materials switcher. Shows the active GT language for Scarica.
 * ENN-182 — also listens `GT_REFRESH` (SPA Traduci uses replaceState).
 * ENN-185 — hidden while `GT_ENABLED` is false (Italian-only launch).
 */
export function MaterialsLanguagePicker({
  className = '',
}: Props) {
  const [lang, setLang] = useState('it');

  useEffect(() => {
    if (!GT_ENABLED) return;
    const sync = () => setLang(readGoogTransLang());
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener(GT_REFRESH_EVENT, sync);
    const id = window.setInterval(sync, 1200);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener(GT_REFRESH_EVENT, sync);
      window.clearInterval(id);
    };
  }, []);

  if (!GT_ENABLED) return null;

  const isIt = lang.toLowerCase() === 'it';

  return (
    <div
      className={`notranslate flex flex-wrap items-center gap-2 ${className}`}
      translate="no"
      role="status"
      aria-label="Lingua PDF dispensa"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
        PDF dispensa
      </span>
      <span className="rounded-lg border border-[#D4AF37]/35 bg-[#151311]/85 px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#F4F1EA]">
        {lang.toUpperCase()}
      </span>
      <span className="text-[11px] text-[#A39B93] max-w-[18rem]">
        {isIt
          ? 'Stessa lingua di Traduci · italiano (senza traduzione)'
          : 'Stessa lingua di Traduci · PDF auto-tradotto da IT + template brand'}
      </span>
    </div>
  );
}
