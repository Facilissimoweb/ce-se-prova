import React, { useEffect, useId, useRef, useState } from 'react';
import { CalendarDays, Loader2, Mail, MessageCircle, Send, X } from 'lucide-react';
import {
  SITE_EMAIL,
  telegramHref,
  whatsappHref,
} from '../lib/siteContacts';
import { NinaMessageBody } from './chat/NinaMessageBody';
import { useLeftToolFabVisible, useLeftToolsMenu } from './LeftToolsMenu';

type ChatTurn = { role: 'user' | 'assistant'; content: string };

type ChatStatusResponse = {
  available?: boolean;
};

type ChatPostResponse = {
  available?: boolean;
  reply?: string;
  error?: string;
};

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

const WELCOME_ASSISTANT = `Ciao, sono **Nina**, l’assistente virtuale di Tarot Italia.

Sono qui per **accoglierti** e orientarti con calma.

Quando vorrai un consulto autentico, ti accompagno verso **Maria Teresa** — usa la sezione **Parla con Maria Teresa** qui sotto.`;

/**
 * Left FAB stack: under accessibility, above Torna su
 * (cookie → a11y → chat → Torna su).
 * Live chat via server `/api/chat` (Groq / Nina) when
 * `TAROTITALIACHATGENERICAGROQ_API_KEY` is set on Vercel; otherwise contacts only.
 * On mobile, only visible when «Strumenti» is open.
 */
export function ChatFab() {
  const panelId = useId();
  const composerId = useId();
  const threadRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [chatAvailable, setChatAvailable] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([
    { role: 'assistant', content: WELCOME_ASSISTANT },
  ]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const fabVisible = useLeftToolFabVisible();
  const { isCompact, setToolsOpen } = useLeftToolsMenu();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const controller = new AbortController();

    async function loadStatus() {
      setStatusLoading(true);
      try {
        const res = await fetch('/api/chat', {
          method: 'GET',
          signal: controller.signal,
        });
        const data = (await res.json().catch(() => ({}))) as ChatStatusResponse;
        if (!cancelled) {
          setChatAvailable(Boolean(res.ok && data.available));
        }
      } catch {
        if (!cancelled) setChatAvailable(false);
      } finally {
        if (!cancelled) setStatusLoading(false);
      }
    }

    void loadStatus();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !threadRef.current) return;
    threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [open, turns, sending]);

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || sending || !chatAvailable) return;

    setSendError(null);
    setDraft('');
    const history = turns
      .filter((t) => t.role === 'user' || t.role === 'assistant')
      .slice(-12);
    setTurns((prev) => [...prev, { role: 'user', content: message }]);
    setSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });
      const data = (await res.json().catch(() => ({}))) as ChatPostResponse;

      if (data.available === false) {
        setChatAvailable(false);
        setSendError(
          data.error ||
            'Nina non è ancora attiva. Usa i contatti qui sotto per parlare con Maria Teresa.'
        );
        return;
      }

      if (!res.ok || !data.reply) {
        setSendError(
          data.error ||
            'Non riesco a rispondere in questo momento. Riprova o usa i contatti.'
        );
        return;
      }

      setTurns((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply as string },
      ]);
    } catch {
      setSendError(
        'Connessione interrotta. Riprova tra poco oppure usa WhatsApp, Telegram o email.'
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {fabVisible && (
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
            if (isCompact) setToolsOpen(false);
          }}
          aria-label="Apri chat con Nina e contatti"
          aria-expanded={open}
          aria-controls={panelId}
          title="Chat con Nina"
          className="fixed bottom-[9.5rem] left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#151311]/92 text-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:bottom-[5.75rem] md:left-6"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label="Chat con Nina e contatti"
          className="fixed z-50 max-h-[min(70dvh,calc(100dvh-7.5rem))] w-auto max-w-[22rem] overflow-y-auto overscroll-contain rounded-2xl border border-[#D4AF37]/30 bg-[#151311]/96 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md left-[max(1rem,env(safe-area-inset-left,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] bottom-[calc(6.25rem+env(safe-area-inset-bottom,0px))] md:bottom-[12.75rem] md:left-6 md:right-auto md:max-h-none md:w-[22rem] md:overflow-visible"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-sm tracking-[0.08em] text-[#D4AF37] uppercase">
                Tarot Italia
              </p>
              <h2 className="mt-1 font-display text-lg text-[#F4F1EA]">Nina</h2>
              <p className="mt-1 text-sm leading-relaxed text-[#A39B93]">
                {statusLoading
                  ? 'Verifico Nina…'
                  : chatAvailable
                    ? 'Assistente virtuale di Maria Teresa. Per un consulto autentico, usa la sezione Parla con Maria Teresa qui sotto.'
                    : 'Nina non è attiva in questo momento. Usa la sezione Parla con Maria Teresa qui sotto.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chiudi chat con Nina"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {chatAvailable && (
            <div className="mb-3">
              <div
                ref={threadRef}
                className="mb-2 max-h-52 space-y-2 overflow-y-auto rounded-xl border border-[#D4AF37]/12 bg-[#0F0D0B]/70 p-2.5"
                aria-live="polite"
              >
                {turns.map((turn, index) => (
                  <div
                    key={`${turn.role}-${index}`}
                    className={
                      turn.role === 'user'
                        ? 'ml-6 break-words rounded-lg bg-[#D4AF37]/15 px-2.5 py-2 text-sm text-[#F4F1EA] whitespace-pre-wrap'
                        : 'mr-2 break-words rounded-lg bg-[#1C1916] px-2.5 py-2.5'
                    }
                  >
                    {turn.role === 'assistant' ? (
                      <NinaMessageBody content={turn.content} />
                    ) : (
                      turn.content
                    )}
                  </div>
                ))}
                {sending && (
                  <div className="mr-4 flex items-center gap-2 rounded-lg bg-[#1C1916] px-2.5 py-2 text-sm text-[#A39B93]">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                    Nina sta ascoltando…
                  </div>
                )}
              </div>

              <form onSubmit={sendMessage} className="flex min-w-0 items-end gap-2">
                <label htmlFor={composerId} className="sr-only">
                  Messaggio per Nina
                </label>
                <textarea
                  id={composerId}
                  rows={2}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  disabled={sending}
                  placeholder="Scrivi qui…"
                  className="min-h-[2.75rem] min-w-0 flex-1 resize-none rounded-xl border border-[#D4AF37]/20 bg-[#12100E] px-3 py-2 text-sm text-[#F4F1EA] placeholder:text-[#6F675F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={sending || !draft.trim()}
                  aria-label="Invia messaggio"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/15 text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>

              {sendError && (
                <p className="mt-2 text-xs leading-relaxed text-[#C9A27A]" role="alert">
                  {sendError}
                </p>
              )}
            </div>
          )}

          <div
            className="rounded-xl border border-[#D4AF37]/20 bg-[#0F0D0B]/55 p-3"
            role="group"
            aria-label="Parla con Maria Teresa"
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Parla con Maria Teresa
            </p>
            <ul className="space-y-2">
              <li>
                <a href="/prenota" className={linkClass}>
                  <CalendarDays className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                  Prenota
                </a>
              </li>
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
                <a href={`mailto:${SITE_EMAIL}`} className={`${linkClass} min-w-0`}>
                  <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                  <span className="min-w-0 break-words">Email · {SITE_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
