import React from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Left FAB stack (lowest): cookie → accessibility → Torna su.
 * Smooth-scrolls to top. Italian label «Torna su».
 */
export function BackToTopFab() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Torna su"
      title="Torna su"
      className="fixed bottom-10 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#151311]/92 text-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:bottom-8 md:left-6"
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
