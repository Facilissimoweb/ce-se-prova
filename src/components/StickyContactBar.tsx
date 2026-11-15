import React from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import {
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  whatsappHref,
} from '../lib/siteContacts';

/**
 * Discreet site-wide sticky contact dock.
 * Stays clear of the left cookie reopen FAB (bottom-left).
 */
export function StickyContactBar() {
  return (
    <nav
      aria-label="Contatti rapidi"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6"
    >
      <div className="pointer-events-auto ml-14 flex max-w-[min(100%,28rem)] items-center gap-1 rounded-full border border-[#D4AF37]/22 bg-[#151311]/88 px-1.5 py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md md:ml-16 md:gap-1.5 md:px-2 md:py-1.5">
        <a
          href={whatsappHref(
            'Buongiorno Maria Teresa, vorrei informazioni su Tarot Italia.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-medium text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:px-3.5 md:text-xs"
        >
          <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/90" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <span className="h-3.5 w-px bg-[#D4AF37]/20" aria-hidden="true" />

        <a
          href={`tel:${SITE_PHONE_TEL}`}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-medium text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:px-3.5 md:text-xs"
        >
          <Phone className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/90" aria-hidden="true" />
          <span className="tabular-nums">{SITE_PHONE_DISPLAY}</span>
        </a>

        <span className="h-3.5 w-px bg-[#D4AF37]/20" aria-hidden="true" />

        <a
          href={`mailto:${SITE_EMAIL}`}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-medium text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:px-3.5 md:text-xs"
          title={SITE_EMAIL}
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]/90" aria-hidden="true" />
          <span className="hidden sm:inline">Email</span>
          <span className="sm:hidden">Mail</span>
        </a>
      </div>
    </nav>
  );
}
