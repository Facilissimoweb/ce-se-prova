import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { resolveGtCriticalLabel } from '../lib/gtCriticalUi';
import { normalizeGoogTransLang } from '../lib/gtLangCodes';
import {
  GT_PAGE_LANG,
  readGoogTransLang,
} from '../lib/googleTranslateRuntime';

type Props = {
  onBook: () => void;
};

/**
 * ENN-160 — Mobile-only floating «Prenota» CTA.
 * Icon-only shopping bag on the right, clear of left «Strumenti» and the
 * centered contact dock. Same destination as the former top-bar Prenota.
 * Desktop keeps the text button in the nav.
 */
export function BookSessionFab({ onBook }: Props) {
  const [lang, setLang] = useState(GT_PAGE_LANG);

  useEffect(() => {
    setLang(normalizeGoogTransLang(readGoogTransLang()));
  }, []);

  const { text: label, useCurated } = resolveGtCriticalLabel(
    lang,
    'bookSession'
  );

  return (
    <button
      type="button"
      id="book-session-fab"
      onClick={onBook}
      aria-label={label}
      title={label}
      className="fixed bottom-10 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-[#12100E] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-colors hover:bg-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C] md:hidden"
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" strokeWidth={2.25} />
      {useCurated ? (
        <span className="sr-only notranslate" translate="no">
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </button>
  );
}
