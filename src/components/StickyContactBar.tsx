import React from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import {
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  whatsappHref,
} from '../lib/siteContacts';

/**
 * Discreet site-wide sticky contact dock — icons only.
 * Stays clear of the left cookie reopen FAB (bottom-left).
 */
export function StickyContactBar() {
  return (
    <nav
      aria-label="Contatti rapidi"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6"
    >
      <div className="pointer-events-auto ml-14 flex items-center gap-0.5 rounded-full border border-[#D4AF37]/22 bg-[#151311]/88 px-1 py-1 shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md md:ml-16 md:gap-1 md:px-1.5 md:py-1.5">
        <a
          href={whatsappHref(
            'Buongiorno Maria Teresa, vorrei informazioni su Tarot Italia.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <MessageCircle className="h-4 w-4 text-[#D4AF37]/90" aria-hidden="true" />
        </a>

        <span className="h-3.5 w-px bg-[#D4AF37]/20" aria-hidden="true" />

        <a
          href={`tel:${SITE_PHONE_TEL}`}
          aria-label={`Chiama ${SITE_PHONE_DISPLAY}`}
          title={`Chiama ${SITE_PHONE_DISPLAY}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <Phone className="h-4 w-4 text-[#D4AF37]/90" aria-hidden="true" />
        </a>

        <span className="h-3.5 w-px bg-[#D4AF37]/20" aria-hidden="true" />

        <a
          href={`mailto:${SITE_EMAIL}`}
          aria-label={`Email ${SITE_EMAIL}`}
          title={SITE_EMAIL}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <Mail className="h-4 w-4 text-[#D4AF37]/90" aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
