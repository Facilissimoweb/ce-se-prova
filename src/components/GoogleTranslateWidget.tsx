import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, Globe } from 'lucide-react';
import {
  loadSavedCookiePreferences,
  subscribeCookieConsent,
} from '../lib/cookieConsent';
import { setSiteLanguage } from '../i18n';
import {
  applyGtDocumentChrome,
  normalizeGoogTransLang,
} from '../lib/gtLangCodes';
import {
  GT_HOST_ID,
  GT_PAGE_LANG,
  applyGoogleTranslateSpaSwitch,
  clearGoogtransHash,
  expireGoogtransCookies,
  googleTranslateElementReady,
  notifyGoogleTranslateRefresh,
  readGoogTransLang,
  registerGoogleTranslateHostRemount,
  requestGoogleTranslateRefresh,
  startGoogleTranslateSpaBridge,
  writeGoogtransCookie,
} from '../lib/googleTranslateRuntime';


const GT_SCRIPT_ID = 'tarot_italia_google_translate_script';
export { GT_HOST_ID, readGoogTransLang } from '../lib/googleTranslateRuntime';

type GtLang = {
  /** Google Translate code (`zh-CN`, `pt`, …). `it` = original / reset. */
  code: string;
  short: string;
  label: string;
  flag: string;
};

/**
 * Curated browsing languages (ENN-141).
 * IT is always first so users can leave a stuck foreign GT session.
 */
export const GT_LANGUAGES: readonly GtLang[] = [
  { code: 'it', short: 'IT', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', short: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'es', short: 'ES', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', short: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'de', short: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', short: 'PT', label: 'Português', flag: '🇧🇷' },
  { code: 'zh-CN', short: 'ZH', label: '中文 (简体)', flag: '🇨🇳' },
  { code: 'ja', short: 'JA', label: '日本語', flag: '🇯🇵' },
  { code: 'ar', short: 'AR', label: 'العربية', flag: '🇸🇦' },
  { code: 'ru', short: 'RU', label: 'Русский', flag: '🇷🇺' },
  { code: 'uk', short: 'UK', label: 'Українська', flag: '🇺🇦' },
  { code: 'pl', short: 'PL', label: 'Polski', flag: '🇵🇱' },
  { code: 'nl', short: 'NL', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'ro', short: 'RO', label: 'Română', flag: '🇷🇴' },
  { code: 'sv', short: 'SV', label: 'Svenska', flag: '🇸🇪' },
  { code: 'tr', short: 'TR', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'el', short: 'EL', label: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'ko', short: 'KO', label: '한국어', flag: '🇰🇷' },
  { code: 'hi', short: 'HI', label: 'हिन्दी', flag: '🇮🇳' },
] as const;

const GT_INCLUDED = GT_LANGUAGES.filter((l) => l.code !== 'it')
  .map((l) => l.code)
  .join(',');

type TranslateElementCtor = {
  new (options: Record<string, unknown>, elementId: string): unknown;
  InlineLayout?: { SIMPLE?: number };
};

type GoogleTranslateNs = {
  translate?: {
    TranslateElement: TranslateElementCtor;
  };
};

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
  }
}

function googleTranslateApi(): GoogleTranslateNs | undefined {
  return (window as Window & { google?: GoogleTranslateNs }).google;
}

/** Prevent double-clicks / overlapping reloads while a switch is in flight. */
let gtLangSwitchLock = false;

let spaBridgeStop: (() => void) | undefined;

/**
 * Apply a browsing language via googtrans.
 *
 * - IT: clear cookie/hash and **reload** so GT `<font>` nodes are purged
 *   (ENN-142 Italian restore).
 * - Other langs: write `/it/<code>` cookie + `#googtrans`, notify SPA listeners,
 *   then {@link applyGoogleTranslateSpaSwitch} (wait/retry combo + remount
 *   TranslateElement) — **no full reload** (ENN-184). ENN-142 freeze was from
 *   hash-only `location.replace` leaving the menu `aria-busy`; we unlock after
 *   the SPA switch settles instead of relying on navigation.
 *
 * `replaceState` does not fire `hashchange` — callers must use the return
 * value / `tarot:gt-refresh` (fired here) so ChatFab picks lang immediately.
 */
export function applyGoogTransLang(code: string): 'reload' | 'spa' | 'noop' {
  if (gtLangSwitchLock) return 'noop';
  gtLangSwitchLock = true;

  // Keep react-i18next on Italian so GT does not double-translate overlays.
  void setSiteLanguage('it');

  // ENN-159 — menu / cookie / hash always use canonical codes (zh-CN, ja, ar, hi…).
  const target = normalizeGoogTransLang(code || GT_PAGE_LANG);
  const path = `${window.location.pathname}${window.location.search}`;

  document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
  document.body?.style.removeProperty('top');
  applyGtDocumentChrome(target);

  if (target === GT_PAGE_LANG) {
    expireGoogtransCookies();
    // Strip hash first so reload cannot resurrect a foreign googtrans target.
    window.history.replaceState(null, '', path);
    window.location.reload();
    return 'reload';
  }

  writeGoogtransCookie(target);
  window.history.replaceState(
    null,
    '',
    `${path}#googtrans(${GT_PAGE_LANG}|${target})`
  );
  // Nina + Maggiori + booking listen for this; hashchange does not fire on replaceState.
  notifyGoogleTranslateRefresh();
  // Hardened SPA path (ENN-184) — wait/retry combo; remount gadget if needed.
  void applyGoogleTranslateSpaSwitch(target).finally(() => {
    gtLangSwitchLock = false;
  });
  // Late refresh: Area Personale / Nina remount on GT_REFRESH before combo is ready.
  window.setTimeout(() => requestGoogleTranslateRefresh(220), 160);
  window.setTimeout(() => requestGoogleTranslateRefresh(900), 700);
  return 'spa';
}

function clearGoogleTranslateArtifacts(clearCookies: boolean) {
  document
    .querySelectorAll(
      'iframe.goog-te-banner-frame, .skiptranslate, #goog-gt-tt, .goog-te-spinner-pos'
    )
    .forEach((el) => el.remove());
  document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
  document.body?.style.removeProperty('top');
  if (clearCookies) {
    expireGoogtransCookies();
    clearGoogtransHash();
  }
}

let gtInjected = false;

function ensureSpaBridge() {
  if (!spaBridgeStop) {
    spaBridgeStop = startGoogleTranslateSpaBridge();
  }
  registerGoogleTranslateHostRemount(() => mountTranslateElement());
  requestGoogleTranslateRefresh(160);
}

function mountTranslateElement() {
  const host = document.getElementById(GT_HOST_ID);
  const TranslateElement = googleTranslateApi()?.translate?.TranslateElement;
  if (!host || !TranslateElement) return false;
  host.innerHTML = '';
  new TranslateElement(
    {
      pageLanguage: GT_PAGE_LANG,
      includedLanguages: GT_INCLUDED,
      layout: TranslateElement.InlineLayout?.SIMPLE ?? 0,
      autoDisplay: false,
    },
    GT_HOST_ID
  );
  registerGoogleTranslateHostRemount(() => mountTranslateElement());
  ensureSpaBridge();
  return true;
}

function unloadGoogleTranslate() {
  gtInjected = false;
  spaBridgeStop?.();
  spaBridgeStop = undefined;
  document.getElementById(GT_SCRIPT_ID)?.remove();
  const host = document.getElementById(GT_HOST_ID);
  if (host) host.innerHTML = '';
  delete window.googleTranslateElementInit;
  // Consent revoked — drop googtrans so the next grant starts clean.
  clearGoogleTranslateArtifacts(true);
}

function injectGoogleTranslate() {
  // Keep react-i18next DOM source Italian so GT does not double-translate overlays.
  void setSiteLanguage('it');

  window.googleTranslateElementInit = () => {
    mountTranslateElement();
  };

  const existing = document.getElementById(GT_SCRIPT_ID);
  if (existing) {
    // Script already present (Strict remount / prior inject): remount gadget if needed.
    if (
      googleTranslateElementReady() &&
      !document.querySelector(`#${GT_HOST_ID} .goog-te-gadget`)
    ) {
      mountTranslateElement();
    } else {
      ensureSpaBridge();
    }
    gtInjected = true;
    return;
  }

  if (gtInjected) return;
  gtInjected = true;

  const script = document.createElement('script');
  script.id = GT_SCRIPT_ID;
  script.src =
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  script.onerror = () => {
    gtInjected = false;
    script.remove();
  };
  document.body.appendChild(script);
}

function langByCode(code: string): GtLang {
  return (
    GT_LANGUAGES.find((l) => l.code === code) ??
    GT_LANGUAGES[0]
  );
}

type Props = {
  variant?: 'header' | 'drawer';
  className?: string;
  /** Opens privacy preferences when marketing consent is missing. */
  onRequestConsent?: () => void;
};

/** Preferred menu size; clamped so the panel never leaves the viewport (ENN-142). */
const GT_MENU_WIDTH_PX = 288; // 18rem — room for ZH / JA / AR labels
const GT_MENU_VIEWPORT_PAD_PX = 12;
const GT_MENU_MAX_HEIGHT_PX = 352; // 22rem
const GT_MENU_MIN_HEIGHT_PX = 48; // at least one row

type HeaderMenuPos = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
};

function readSafeAreaInsetTop(): number {
  // CSS env() is not readable via getPropertyValue on :root in all engines.
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top,0px)';
  document.body.appendChild(probe);
  const value = Number.parseFloat(getComputedStyle(probe).paddingTop) || 0;
  probe.remove();
  return value;
}

function clampHeaderMenuPos(trigger: DOMRect): HeaderMenuPos {
  const pad = GT_MENU_VIEWPORT_PAD_PX;
  const vv = window.visualViewport;
  const viewLeft = vv?.offsetLeft ?? 0;
  const viewTop = vv?.offsetTop ?? 0;
  const viewWidth = vv?.width ?? window.innerWidth;
  const viewHeight = vv?.height ?? window.innerHeight;
  const safeTop = readSafeAreaInsetTop();

  const width = Math.min(GT_MENU_WIDTH_PX, viewWidth - pad * 2);
  // Prefer right-align under the trigger; slide in if that would clip.
  let left = trigger.right - width;
  left = Math.max(
    viewLeft + pad,
    Math.min(left, viewLeft + viewWidth - pad - width)
  );

  // Prefer below the trigger; never above safe-area / viewport pad (first row visible).
  const minTop = viewTop + Math.max(pad, safeTop + pad);
  const maxBottom = viewTop + viewHeight - pad;
  let top = Math.max(minTop, trigger.bottom + 6);
  let maxHeight = Math.min(GT_MENU_MAX_HEIGHT_PX, viewHeight * 0.7);

  if (top + GT_MENU_MIN_HEIGHT_PX > maxBottom) {
    // Not enough room below — open upward, still clamped under safe-area.
    const upwardBottom = Math.max(minTop + GT_MENU_MIN_HEIGHT_PX, trigger.top - 6);
    maxHeight = Math.min(maxHeight, upwardBottom - minTop);
    top = Math.max(minTop, upwardBottom - maxHeight);
  } else {
    maxHeight = Math.min(maxHeight, maxBottom - top);
  }
  maxHeight = Math.max(GT_MENU_MIN_HEIGHT_PX, maxHeight);

  return { top, left, width, maxHeight };
}

function BrandedLanguageMenu({
  variant,
  className = '',
}: {
  variant: 'header' | 'drawer';
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(GT_PAGE_LANG);
  const [switching, setSwitching] = useState(false);
  const [headerMenuPos, setHeaderMenuPos] = useState<HeaderMenuPos | null>(
    null
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const active = langByCode(current);

  useEffect(() => {
    const live = readGoogTransLang();
    setCurrent(live);
    applyGtDocumentChrome(live);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      // Portaled list lives outside rootRef — treat both as "inside".
      if (
        rootRef.current?.contains(target) ||
        listRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Header dropdown: portal + clamp so it never clips under header blur/safe-area (ENN-142).
  useLayoutEffect(() => {
    if (variant !== 'header' || !open) {
      setHeaderMenuPos(null);
      return;
    }
    const update = () => {
      const el = triggerRef.current;
      if (!el) return;
      setHeaderMenuPos(clampHeaderMenuPos(el.getBoundingClientRect()));
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    window.visualViewport?.addEventListener('resize', update);
    window.visualViewport?.addEventListener('scroll', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
    };
  }, [open, variant]);

  const pick = (code: string) => {
    if (switching || gtLangSwitchLock) return;
    setOpen(false);
    const live = readGoogTransLang();
    if (code === live) {
      // Cookie/hash already match — still notify + nudge so Nina / chrome
      // re-sync if they drifted (ENN-180), without a full apply/reload.
      if (code !== current) setCurrent(code);
      if (code !== GT_PAGE_LANG) {
        notifyGoogleTranslateRefresh();
        requestGoogleTranslateRefresh(40);
      }
      return;
    }
    setSwitching(true);
    setCurrent(code);
    const outcome = applyGoogTransLang(code);
    // SPA non-IT path: unlock menu (ENN-142 freeze was leaving aria-busy stuck).
    // IT / reload leaves this component unmounted.
    if (outcome === 'spa' || outcome === 'noop') {
      setSwitching(false);
    }
  };

  if (variant === 'drawer') {
    return (
      <div
        className={`space-y-2 notranslate ${className}`}
        translate="no"
        ref={rootRef}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
          Traduci il sito
        </p>
        <p className="text-xs leading-relaxed text-[#A39B93]">
          Fonte: italiano. Scegli IT per tornare all&apos;originale. I materiali
          didattici hanno file curati a parte (Corsi / Area Riservata).
        </p>
        <ul
          role="listbox"
          aria-label="Lingua del sito"
          className="max-h-[min(55vh,22rem)] overflow-y-auto rounded-xl border border-[#D4AF37]/25 bg-[#151311]/90 py-1"
        >
          {GT_LANGUAGES.map((lang) => {
            const selected = lang.code === current;
            return (
              <li key={lang.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => pick(lang.code)}
                  disabled={switching}
                  className={`flex w-full min-h-[44px] items-center justify-between gap-3 px-3 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:bg-[#D4AF37]/12 disabled:opacity-60 ${
                    selected
                      ? 'bg-[#D4AF37]/12 text-[#D4AF37]'
                      : 'text-[#F4F1EA] hover:bg-[#D4AF37]/08'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="text-base leading-none" aria-hidden>
                      {lang.flag}
                    </span>
                    <span className="font-semibold tracking-[0.06em]">
                      {lang.short}
                    </span>
                    <span className="truncate text-[#A39B93]">{lang.label}</span>
                  </span>
                  {selected && (
                    <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`relative notranslate ${className}`}
      translate="no"
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={switching}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-busy={switching || undefined}
        aria-label={`Lingua del sito: ${active.label}`}
        title="Traduci il sito"
        className="inline-flex min-h-[40px] max-w-[11.5rem] items-center gap-1.5 rounded-lg border border-[#D4AF37]/25 bg-[#151311]/70 px-2 py-1.5 text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/55 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-60"
      >
        <span className="text-sm leading-none" aria-hidden>
          {active.flag}
        </span>
        <Globe className="hidden h-3.5 w-3.5 shrink-0 text-[#D4AF37] sm:block" aria-hidden />
        <span className="truncate text-[11px] font-semibold tracking-[0.08em]">
          {active.short}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-[#A39B93] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      {open &&
        headerMenuPos &&
        createPortal(
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Lingua del sito"
            style={{
              top: headerMenuPos.top,
              left: headerMenuPos.left,
              width: headerMenuPos.width,
              maxHeight: headerMenuPos.maxHeight,
            }}
            className="fixed z-[70] overflow-y-auto rounded-xl border border-[#D4AF37]/25 bg-[#12100E]/98 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md notranslate"
            translate="no"
          >
            {GT_LANGUAGES.map((lang) => {
              const selected = lang.code === current;
              return (
                <li key={lang.code} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => pick(lang.code)}
                    disabled={switching}
                    className={`flex w-full min-h-[44px] items-center justify-between gap-3 px-3 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:bg-[#D4AF37]/12 disabled:opacity-60 ${
                      selected
                        ? 'bg-[#D4AF37]/12 text-[#D4AF37]'
                        : 'text-[#F4F1EA] hover:bg-[#D4AF37]/08'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="text-base leading-none" aria-hidden>
                        {lang.flag}
                      </span>
                      <span className="font-semibold tracking-[0.06em]">
                        {lang.short}
                      </span>
                      <span className="truncate text-[#A39B93]">
                        {lang.label}
                      </span>
                    </span>
                    {selected && (
                      <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body
        )}
    </div>
  );
}

/**
 * Brand-styled Google Website Translator control (ENN-140 / ENN-141).
 * Custom gold/obsidian dropdown with flags; GT gadget stays injected but hidden.
 * Script loads only after marketing / third-party cookie consent.
 */
export function GoogleTranslateWidget({
  variant = 'header',
  className = '',
  onRequestConsent,
}: Props) {
  const labelId = useId();
  /** null = consent not read yet — never unload/clear googtrans during this gap. */
  const [marketingAllowed, setMarketingAllowed] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const prefs = loadSavedCookiePreferences();
    setMarketingAllowed(Boolean(prefs?.marketing));
    return subscribeCookieConsent((next) => {
      setMarketingAllowed(Boolean(next?.marketing));
    });
  }, []);

  useEffect(() => {
    // Only the header instance owns the GT script lifecycle (drawer is UI-only).
    if (variant !== 'header') return;
    // null = consent not read yet — never unload/clear googtrans during this gap.
    if (marketingAllowed === null) return;
    if (marketingAllowed) {
      injectGoogleTranslate();
      return;
    }
    unloadGoogleTranslate();
  }, [marketingAllowed, variant]);

  if (marketingAllowed === null) {
    if (variant === 'drawer') return null;
    return (
      <div
        className={`inline-flex min-h-[40px] w-[4.5rem] ${className}`}
        aria-hidden
      />
    );
  }

  if (!marketingAllowed) {
    if (variant === 'drawer') {
      return (
        <div className={`space-y-2 ${className}`}>
          <p
            id={labelId}
            className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]"
          >
            Traduci il sito
          </p>
          <p className="text-xs leading-relaxed text-[#A39B93]">
            Google Traduttore richiede il consenso ai cookie di terze parti
            (marketing).
          </p>
          <button
            type="button"
            onClick={onRequestConsent}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/35 bg-[#151311]/85 px-3 text-xs font-semibold text-[#F4F1EA] transition-colors hover:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Globe className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden />
            Abilita traduzione
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={onRequestConsent}
        title="Abilita Google Traduttore (cookie di terze parti)"
        aria-label="Abilita Google Traduttore"
        className={`inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-[#D4AF37]/25 bg-[#151311]/70 px-2 py-1.5 text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/55 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${className}`}
      >
        <Globe className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" aria-hidden />
        <span className="text-[11px] font-semibold tracking-[0.08em]">
          Traduci
        </span>
      </button>
    );
  }

  if (variant === 'drawer') {
    return <BrandedLanguageMenu variant="drawer" className={className} />;
  }

  return (
    <div className={`relative ${className}`}>
      <div
        id={GT_HOST_ID}
        className="tarot-gt-host tarot-gt-host--hidden"
        aria-hidden
      />
      <BrandedLanguageMenu variant="header" />
    </div>
  );
}
