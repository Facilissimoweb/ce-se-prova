import React, { useEffect, useId, useRef, useState } from 'react';
import {
  CalendarDays,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCourseEntitlement } from '../hooks/useCourseEntitlement';
import { useAuth } from '../context/AuthContext';
import {
  GT_PAGE_LANG,
  GT_REFRESH_EVENT,
  requestGoogleTranslateRefresh,
  readGoogTransLang,
} from '../lib/googleTranslateRuntime';
import {
  NINA_CHAT_OPEN_EVENT,
  type NinaChatOpenDetail,
} from '../lib/ninaChatOpen';
import { SCROLL_LANDMARKS } from '../lib/scrollNavigation';
import {
  SITE_EMAIL,
  telegramHref,
  whatsappHref,
} from '../lib/siteContacts';
import { looksLikeNinaProviderLeak } from '../lib/ninaReplyLang';
import { NinaMessageBody } from './chat/NinaMessageBody';
import { GtCriticalLabel } from './GtCriticalLabel';
import { GtSafeBoundary } from './GtSafeBoundary';
import { useLeftToolFabVisible, useLeftToolsMenu } from './LeftToolsMenu';

/**
 * Thread turns. `skipGt` marks copy already localized for googtrans
 * (API /api/chat replies, user input). Seed chrome stays Italian DOM
 * source so GT can translate (ENN-158/161) — never English i18n fallback.
 */
type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
  skipGt?: boolean;
};
type NinaMode = 'welcome' | 'studio';

type ChatStatusResponse = {
  available?: boolean;
};

type ChatPostResponse = {
  available?: boolean;
  reply?: string;
  error?: string;
  code?: string;
  locked?: boolean;
  checkoutPath?: string;
  mode?: NinaMode;
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
  'flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-[#D4AF37]/15 bg-[#12100E]/55 px-2 py-1.5 text-[11px] font-semibold leading-tight text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:justify-start sm:gap-2 sm:px-2.5 sm:py-2 sm:text-xs';

/**
 * Left FAB stack: under accessibility, above Torna su
 * (cookie → a11y → chat → Torna su).
 * Live chat via server `/api/chat` (Groq / Nina) when
 * `TAROTITALIACHATGENERICAGROQ_API_KEY` is set on Vercel; otherwise contacts only.
 * ENN-137: welcome (free) vs Nina Studio (Maggiori entitlement).
 * ENN-161: all visible chrome = Italian getFixedT / GtCriticalLabel (GT-able);
 * panel remount + GtSafeBoundary so Studio tab cannot blank the site under GT.
 * ENN-165: panelKey includes googtrans lang; Groq history omits Italian seed;
 * seed never gets stale notranslate; lang re-read on send.
 * On mobile, only visible when «Strumenti» is open.
 */
export function ChatFab() {
  const { i18n } = useTranslation('common');
  /** Italian DOM source for every visible Nina string (ENN-158/161). */
  const tIt = i18n.getFixedT('it', 'common');
  const panelId = useId();
  const composerId = useId();
  const threadRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<NinaMode>('welcome');
  /** Bumps on mode / lock-CTA / recover / open so GT-mutated nodes are discarded. */
  const [panelEpoch, setPanelEpoch] = useState(0);
  /** Active googtrans target — keys chrome remount + Groq `lang` (ENN-165). */
  const [gtLang, setGtLang] = useState(() =>
    typeof document !== 'undefined' ? readGoogTransLang() : GT_PAGE_LANG
  );
  const [statusLoading, setStatusLoading] = useState(false);
  const [chatAvailable, setChatAvailable] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>(() => [
    {
      role: 'assistant',
      content: i18n.getFixedT('it', 'common')('nina.welcome'),
    },
  ]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [showStudioCta, setShowStudioCta] = useState(false);
  const fabVisible = useLeftToolFabVisible();
  const { isCompact, setToolsOpen } = useLeftToolsMenu();
  const entitlement = useCourseEntitlement('arcani-maggiori');
  const { getIdToken } = useAuth();
  const canUseStudio = entitlement.owns;

  function bumpPanel() {
    setPanelEpoch((n) => n + 1);
  }

  function syncGtLang(): string {
    const live =
      typeof document !== 'undefined' ? readGoogTransLang() : GT_PAGE_LANG;
    setGtLang(live);
    return live;
  }

  /** Italian seed only — never EN fallback for JA/other GT langs (ENN-158). */
  function greetingFor(nextMode: NinaMode): string {
    const tf = i18n.getFixedT('it', 'common');
    return nextMode === 'studio'
      ? tf('nina.welcomeStudio')
      : tf('nina.welcome');
  }

  function seedTurn(nextMode: NinaMode): ChatTurn {
    // Never skipGt — seed must stay GT-able Italian DOM (no stale notranslate).
    return { role: 'assistant', content: greetingFor(nextMode) };
  }

  /** Active Google Translate browsing language (`/it/<lang>` cookie/hash). */
  function activeChatLang(): string {
    return typeof document !== 'undefined' ? readGoogTransLang() : gtLang;
  }

  function switchMode(nextMode: NinaMode) {
    if (nextMode === 'studio' && !canUseStudio) {
      setShowStudioCta(true);
      bumpPanel();
      return;
    }
    setMode(nextMode);
    setTurns([seedTurn(nextMode)]);
    setSendError(null);
    setShowStudioCta(false);
    setDraft('');
    bumpPanel();
  }

  function recoverPanel() {
    setMode('welcome');
    setTurns([seedTurn('welcome')]);
    setShowStudioCta(false);
    setSendError(null);
    setDraft('');
    bumpPanel();
  }

  // Keep seed greeting on Italian source when i18n/mode changes (still GT-able).
  useEffect(() => {
    setTurns((prev) => {
      if (
        prev.length === 1 &&
        prev[0]?.role === 'assistant' &&
        !prev[0]?.skipGt
      ) {
        return [seedTurn(mode)];
      }
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seedTurn binds i18n/mode
  }, [i18n.language, mode]);

  // Track googtrans so chrome remounts when Traduci changes (ENN-165).
  // Prefer GT_REFRESH: applyGoogTransLang uses replaceState (no hashchange).
  useEffect(() => {
    const sync = () => {
      syncGtLang();
    };
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener(GT_REFRESH_EVENT, sync);
    const id = window.setInterval(sync, 1500);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener(GT_REFRESH_EVENT, sync);
      window.clearInterval(id);
    };
  }, []);

  // Lang change (SPA Traduci): drop prior-lang skipGt history so Groq follows
  // the new `lang`, and remount Italian seed for GT to scan.
  // sendGen invalidates in-flight replies that would re-pollute history (ENN-180).
  const gtLangPrevRef = useRef(gtLang);
  const sendGenRef = useRef(0);
  useEffect(() => {
    if (gtLangPrevRef.current === gtLang) return;
    gtLangPrevRef.current = gtLang;
    sendGenRef.current += 1;
    setSending(false);
    setTurns([seedTurn(mode)]);
    setSendError(null);
    setShowStudioCta(false);
    bumpPanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lang edge only
  }, [gtLang]);

  // Fresh remount on open so GT scans clean Italian chrome (not stale fonts).
  useEffect(() => {
    if (!open) return;
    syncGtLang();
    bumpPanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- open edge only
  }, [open]);

  // Panel remounts chrome + seed — re-apply googtrans (same as Sigillo ENN-157).
  // Extra late nudge: TranslateElement combo may not exist yet right after switch.
  useEffect(() => {
    if (!open) return;
    if (gtLang === GT_PAGE_LANG) return;
    requestGoogleTranslateRefresh(160);
    const mid = window.setTimeout(() => requestGoogleTranslateRefresh(360), 280);
    const late = window.setTimeout(() => requestGoogleTranslateRefresh(900), 700);
    return () => {
      window.clearTimeout(mid);
      window.clearTimeout(late);
    };
  }, [open, mode, turns.length, showStudioCta, sending, panelEpoch, gtLang]);

  // If Studio entitlement is lost, fall back to welcome.
  useEffect(() => {
    if (!canUseStudio && mode === 'studio') {
      setMode('welcome');
      setTurns([seedTurn('welcome')]);
      bumpPanel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUseStudio, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Open from Area Riservata (or other CTAs) via CustomEvent.
  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<NinaChatOpenDetail>).detail || {};
      const requested = detail.mode === 'studio' ? 'studio' : 'welcome';
      setOpen(true);
      if (isCompact) setToolsOpen(false);
      if (requested === 'studio' && !canUseStudio) {
        setMode('welcome');
        setTurns([seedTurn('welcome')]);
        setShowStudioCta(true);
        bumpPanel();
        return;
      }
      setMode(requested);
      setTurns([seedTurn(requested)]);
      setShowStudioCta(false);
      setSendError(null);
      bumpPanel();
    };
    window.addEventListener(NINA_CHAT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(NINA_CHAT_OPEN_EVENT, onOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUseStudio, isCompact, setToolsOpen]);

  // Lock page scroll while Nina covers the viewport (ENN-69).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
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
  }, [open, turns, sending, showStudioCta]);

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || sending || !chatAvailable) return;

    const effectiveMode: NinaMode =
      mode === 'studio' && canUseStudio ? 'studio' : 'welcome';

    setSendError(null);
    setShowStudioCta(false);
    setDraft('');
    // Live googtrans first — React gtLang may lag one frame after Traduci.
    const replyLang = syncGtLang();
    // ENN-165/180: Groq history = user/API only. If lang just changed and the
    // reset effect has not flushed yet, omit prior-lang skipGt turns.
    const history =
      replyLang !== gtLang
        ? []
        : turns
            .filter(
              (turn) =>
                turn.skipGt === true &&
                (turn.role === 'user' || turn.role === 'assistant')
            )
            .map(({ role, content }) => ({ role, content }))
            .slice(-12);
    const sendGen = sendGenRef.current;
    setTurns((prev) => [
      ...prev,
      { role: 'user', content: message, skipGt: true },
    ]);
    setSending(true);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (effectiveMode === 'studio') {
        const token = await getIdToken();
        if (token) headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message,
          history,
          // ENN-188: Italian-only — ignore googtrans (GT freeze; do not re-enable).
          lang: 'it',
          mode: effectiveMode,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as ChatPostResponse;

      // Traduci mid-flight: drop stale reply so it cannot bias the new lang.
      if (sendGen !== sendGenRef.current) return;

      /** Never surface Groq/Grok/API strings from the API to the user (ENN-152). */
      function safeUserError(fallback: string): string {
        const raw = typeof data.error === 'string' ? data.error.trim() : '';
        if (!raw || looksLikeNinaProviderLeak(raw)) return fallback;
        return raw;
      }

      if (data.available === false) {
        setChatAvailable(false);
        setSendError(safeUserError(tIt('nina.errorUnavailable')));
        return;
      }

      if (data.code === 'studio_locked' || data.locked) {
        setShowStudioCta(true);
        bumpPanel();
        if (data.reply) {
          setTurns((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: data.reply as string,
              skipGt: true,
            },
          ]);
        } else {
          setSendError(safeUserError(tIt('nina.studioLockedHint')));
        }
        return;
      }

      if (data.code === 'studio_auth') {
        setSendError(safeUserError(tIt('nina.errorGeneric')));
        setShowStudioCta(true);
        bumpPanel();
        return;
      }

      // Unclear intent / empty-confused → Nina asks to rephrase in-thread.
      if (data.code === 'unclear' || data.code === 'empty') {
        const apiReply =
          typeof data.reply === 'string' && data.reply.trim()
            ? data.reply.trim()
            : '';
        setTurns((prev) => [
          ...prev,
          apiReply
            ? { role: 'assistant', content: apiReply, skipGt: true }
            : {
                role: 'assistant',
                content: i18n.getFixedT('it', 'common')('nina.errorRephrase'),
              },
        ]);
        return;
      }

      if (data.code === 'payload') {
        setSendError(safeUserError(tIt('nina.errorRephrase')));
        return;
      }

      if (!res.ok) {
        setSendError(safeUserError(tIt('nina.errorGeneric')));
        return;
      }

      if (!data.reply || looksLikeNinaProviderLeak(data.reply)) {
        setTurns((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: i18n.getFixedT('it', 'common')('nina.errorRephrase'),
          },
        ]);
        return;
      }

      setTurns((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply as string, skipGt: true },
      ]);
    } catch {
      if (sendGen === sendGenRef.current) {
        setSendError(tIt('nina.errorOffline'));
      }
    } finally {
      if (sendGen === sendGenRef.current) {
        setSending(false);
      }
    }
  }

  const titleLabel =
    mode === 'studio' && canUseStudio
      ? tIt('nina.fabTitleStudio')
      : tIt('nina.fabTitleWelcome');
  const subtitle = statusLoading
    ? '…'
    : !chatAvailable
      ? tIt('nina.subtitleUnavailable')
      : mode === 'studio' && canUseStudio
        ? tIt('nina.subtitleStudio')
        : tIt('nina.subtitleAvailable');

  const panelKey = `nina-${gtLang}-${mode}-${canUseStudio ? 'u' : 'g'}-${showStudioCta ? 'cta' : 'ok'}-${panelEpoch}`;

  return (
    <>
      {fabVisible && (
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
            if (isCompact) setToolsOpen(false);
          }}
          aria-label={titleLabel}
          aria-expanded={open}
          aria-controls={panelId}
          title={titleLabel}
          className="fixed bottom-[9.5rem] left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#151311]/92 text-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:bottom-[5.75rem] md:left-6"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={titleLabel}
          className="fixed inset-0 z-50 flex flex-col overflow-hidden border-0 bg-[#151311] pt-[env(safe-area-inset-top,0px)] pr-[env(safe-area-inset-right,0px)] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)] shadow-[0_16px_40px_rgba(0,0,0,0.5)] md:inset-[max(0.75rem,env(safe-area-inset-top,0px))_max(0.75rem,env(safe-area-inset-right,0px))_max(0.75rem,env(safe-area-inset-bottom,0px))_max(0.75rem,env(safe-area-inset-left,0px))] md:rounded-2xl md:border md:border-[#D4AF37]/30 md:bg-[#151311]/98 md:pt-0 md:pr-0 md:pb-0 md:pl-0 md:backdrop-blur-md"
        >
          <GtSafeBoundary
            resetKey={panelKey}
            onError={recoverPanel}
            fallback={
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
                <p className="text-sm text-[#E8e1dd]">
                  La chat si è riavviata. Puoi continuare con Nina.
                </p>
                <button
                  type="button"
                  onClick={recoverPanel}
                  className="rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/15 px-3 py-2 text-xs font-semibold text-[#E6C65C]"
                >
                  Riapri Accoglienza
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs text-[#A39B93] underline"
                >
                  Chiudi
                </button>
              </div>
            }
          >
            <div
              key={panelKey}
              className="flex min-h-0 flex-1 flex-col px-3 pb-3 pt-2.5 md:px-4 md:pb-4 md:pt-3"
            >
              <div className="mb-2 flex shrink-0 items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                    <p className="font-display text-[10px] tracking-[0.1em] text-[#D4AF37] uppercase sm:text-[11px]">
                      Tarot Italia
                    </p>
                    <h2 className="font-display text-base leading-none text-[#F4F1EA] sm:text-lg">
                      {mode === 'studio' && canUseStudio
                        ? 'Nina Studio'
                        : 'Nina'}
                    </h2>
                  </div>
                  <p className="mt-1 text-[11px] leading-snug text-[#A39B93] sm:text-xs">
                    {subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Chiudi chat con Nina"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* Mode switch — Accoglienza vs Studio */}
              <div
                className="mb-2 flex shrink-0 flex-wrap items-center gap-1.5"
                role="group"
                aria-label={tIt('nina.modeAria')}
              >
                <button
                  type="button"
                  aria-pressed={mode === 'welcome'}
                  onClick={() => switchMode('welcome')}
                  className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:text-xs ${
                    mode === 'welcome'
                      ? 'border-[#D4AF37]/45 bg-[#D4AF37]/15 text-[#E6C65C]'
                      : 'border-[#D4AF37]/15 text-[#A39B93] hover:border-[#D4AF37]/30 hover:text-[#F4F1EA]'
                  }`}
                >
                  <MessageCircle className="h-3 w-3" aria-hidden />
                  <GtCriticalLabel uiKey="welcomeMode" />
                </button>
                <button
                  type="button"
                  aria-pressed={mode === 'studio' && canUseStudio}
                  onClick={() => switchMode('studio')}
                  className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:text-xs ${
                    mode === 'studio' && canUseStudio
                      ? 'border-[#D4AF37]/45 bg-[#D4AF37]/15 text-[#E6C65C]'
                      : 'border-[#D4AF37]/15 text-[#A39B93] hover:border-[#D4AF37]/30 hover:text-[#F4F1EA]'
                  }`}
                >
                  {canUseStudio ? (
                    <Sparkles className="h-3 w-3" aria-hidden />
                  ) : (
                    <Lock className="h-3 w-3" aria-hidden />
                  )}
                  {tIt('nina.modeStudio')}
                </button>
              </div>

              {showStudioCta && (
                <div
                  className="mb-2 shrink-0 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/08 px-3 py-2.5"
                  role="status"
                >
                  <p className="text-xs leading-relaxed text-[#E8e1dd]">
                    {tIt('nina.studioLockedHint')}
                  </p>
                  <a
                    href={`/corsi#${SCROLL_LANDMARKS.corsiCheckout}`}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/15 px-2.5 py-1.5 text-[11px] font-semibold text-[#E6C65C] transition-colors hover:bg-[#D4AF37]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    <Sparkles className="h-3 w-3" aria-hidden />
                    {tIt('nina.studioCta')}
                  </a>
                </div>
              )}

              {chatAvailable && (
                <div className="mb-2 flex min-h-0 min-w-0 flex-1 flex-col">
                  {/*
                    ENN-158/161: chrome + seed welcome stay GT-able (Italian DOM).
                    Only API/user bubbles use notranslate — replies already follow
                    googtrans via /api/chat (ENN-143). Never default seed to English.
                  */}
                  <div
                    ref={threadRef}
                    className="mb-2 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain rounded-xl border border-[#D4AF37]/12 bg-[#0F0D0B]/70 p-2.5"
                    aria-live="polite"
                  >
                    {turns.map((turn, index) => {
                      const baseClass =
                        turn.role === 'user'
                          ? 'ml-6 break-words rounded-lg bg-[#D4AF37]/15 px-2.5 py-2 text-sm text-[#F4F1EA] whitespace-pre-wrap'
                          : 'mr-2 break-words rounded-lg bg-[#1C1916] px-2.5 py-2.5';
                      // skipGt only for API/user — never seed (stale notranslate left IT).
                      const localized = turn.skipGt === true;
                      return (
                        <div
                          key={`${turn.role}-${index}-${localized ? 'api' : `seed-${gtLang}`}`}
                          className={
                            localized ? `${baseClass} notranslate` : baseClass
                          }
                          {...(localized ? { translate: 'no' as const } : {})}
                        >
                          {turn.role === 'assistant' ? (
                            <NinaMessageBody content={turn.content} />
                          ) : (
                            turn.content
                          )}
                        </div>
                      );
                    })}
                    {sending && (
                      <div className="mr-4 flex items-center gap-2 rounded-lg bg-[#1C1916] px-2.5 py-2 text-sm text-[#A39B93]">
                        <Loader2
                          className="h-3.5 w-3.5 animate-spin"
                          aria-hidden
                        />
                        {tIt('nina.listening')}
                      </div>
                    )}
                  </div>

                  <form
                    onSubmit={sendMessage}
                    className="flex min-w-0 shrink-0 items-end gap-2"
                  >
                    <label htmlFor={composerId} className="sr-only">
                      Messaggio per Nina
                    </label>
                    {/*
                      GT does not translate HTML placeholder attrs — use a visible
                      Italian text node so googtrans can localize «Scrivi qui…».
                    */}
                    <div className="relative min-h-[2.5rem] min-w-0 flex-1">
                      {!draft.trim() && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-2 left-3 right-3 text-sm leading-snug text-[#6F675F]"
                        >
                          Scrivi qui…
                        </span>
                      )}
                      <textarea
                        id={composerId}
                        rows={1}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        disabled={sending}
                        placeholder=""
                        className="min-h-[2.5rem] w-full resize-none rounded-xl border border-[#D4AF37]/20 bg-[#12100E] px-3 py-2 text-sm text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-60"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending || !draft.trim()}
                      aria-label="Invia messaggio"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/15 text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </form>

                  {sendError && (
                    <p
                      className="mt-1.5 shrink-0 text-xs leading-relaxed text-[#C9A27A]"
                      role="alert"
                    >
                      {sendError}
                    </p>
                  )}
                </div>
              )}

              <div
                className={`rounded-lg border border-[#D4AF37]/20 bg-[#0F0D0B]/55 px-2 py-1.5 sm:px-2.5 sm:py-2 ${
                  chatAvailable ? 'shrink-0' : 'mt-auto shrink-0'
                }`}
                role="group"
                aria-label={tIt('nina.sectionAria')}
              >
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  {tIt('cta.talkMaria')}
                </p>
                <ul className="grid grid-cols-2 gap-1.5 md:grid-cols-4">
                  <li>
                    <a href="/prenota" className={linkClass}>
                      <CalendarDays
                        className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]"
                        aria-hidden="true"
                      />
                      <GtCriticalLabel uiKey="bookConsult" />
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
                      <WhatsAppLogo className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                      <GtCriticalLabel uiKey="whatsappContact" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={telegramHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <TelegramLogo className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE_EMAIL}`}
                      className={linkClass}
                      title={`Email · ${SITE_EMAIL}`}
                    >
                      <Mail
                        className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 truncate">Email</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </GtSafeBoundary>
        </div>
      )}
    </>
  );
}
