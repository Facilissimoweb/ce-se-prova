import React, { useEffect, useId, useState } from 'react';
import { Mail, MessageCircle, X } from 'lucide-react';
import {
  SITE_EMAIL,
  telegramHref,
  whatsappHref,
} from '../lib/siteContacts';

/**
 * Future live-chat / APE widget hook (UI-only for now).
 *
 * When Maria installs Vercel env (e.g. APE / chat provider keys), wire them here:
 * - Prefer `import.meta.env.VITE_APE_CHAT_ENABLED` (or provider-specific keys)
 *   to swap this placeholder panel for the real widget mount.
 * - Do NOT add new Vercel secrets yet — keep contacts (WhatsApp / Telegram / email)
 *   as the interim path so the FAB ships without env changes.
 *
 * Suggested future env names (document only until Maria adds them):
 *   VITE_APE_CHAT_ENABLED
 *   VITE_APE_CHAT_WIDGET_ID
 *   VITE_APE_CHAT_SCRIPT_URL
 */
function resolveFutureChatWidgetConfig(): {
  enabled: boolean;
  widgetId?: string;
  scriptUrl?: string;
} {
  // Intentionally unread until Maria installs Vercel variables.
  // const enabled = import.meta.env.VITE_APE_CHAT_ENABLED === 'true';
  // const widgetId = import.meta.env.VITE_APE_CHAT_WIDGET_ID?.trim();
  // const scriptUrl = import.meta.env.VITE_APE_CHAT_SCRIPT_URL?.trim();
  return { enabled: false };
}

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function TelegramLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.488.02.777-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
      />
    </svg>
  );
}

const linkClass =
  'flex items-center gap-3 rounded-xl border border-[#D4AF37]/15 bg-[#12100E]/55 px-3 py-2.5 text-sm font-semibold text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]';

/**
 * Left FAB stack: under accessibility, above Torna su
 * (cookie → a11y → chat → Torna su). Italian placeholder until APE env lands.
 */
export function ChatFab() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const futureWidget = resolveFutureChatWidgetConfig();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Apri chat e contatti"
        aria-expanded={open}
        aria-controls={panelId}
        title="Chat"
        className="fixed bottom-24 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#151311]/92 text-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:bottom-[5.75rem] md:left-6"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label="Chat e contatti"
          className="fixed bottom-[13.25rem] left-4 z-50 w-[min(20.5rem,calc(100vw-2rem))] rounded-2xl border border-[#D4AF37]/30 bg-[#151311]/96 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md md:bottom-[12.75rem] md:left-6"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-sm tracking-[0.08em] text-[#D4AF37] uppercase">
                Contatti
              </p>
              <h2 className="mt-1 font-display text-lg text-[#F4F1EA]">Chat</h2>
              <p className="mt-1 text-sm leading-relaxed text-[#A39B93]">
                {futureWidget.enabled
                  ? 'Chat live disponibile.'
                  : 'La chat live arriverà a breve. Per ora puoi scrivermi subito su WhatsApp, Telegram o email.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chiudi chat"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Placeholder mount point for future APE / chat widget script */}
          <div
            id="tarot-italia-chat-widget-root"
            data-chat-widget-hook="pending-vercel-env"
            hidden={!futureWidget.enabled}
          />

          <ul className="space-y-2">
            <li>
              <a
                href={whatsappHref(
                  'Buongiorno Maria Teresa, vorrei scrivere in chat.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <WhatsAppLogo className="h-4 w-4 text-[#D4AF37]" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={telegramHref()}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <TelegramLogo className="h-4 w-4 text-[#D4AF37]" />
                Telegram
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE_EMAIL}`} className={linkClass}>
                <Mail className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                Email · {SITE_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
