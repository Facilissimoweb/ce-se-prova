import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import {
  loadSavedCookiePreferences,
  subscribeCookieConsent,
} from '../lib/cookieConsent';
import { setSiteLanguage } from '../i18n';

const GT_SCRIPT_ID = 'tarot_italia_google_translate_script';
export const GT_HOST_ID = 'tarot_italia_google_translate_host';

/** Google Translate pageLanguage (site source). */
const GT_PAGE_LANG = 'it';

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

function expireGoogtransCookies() {
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  const host = window.location.hostname;
  document.cookie = `googtrans=; ${expire}`;
  document.cookie = `googtrans=; domain=${host}; ${expire}`;
  const parts = host.split('.');
  if (parts.length >= 2) {
    document.cookie = `googtrans=; domain=.${parts.slice(-2).join('.')}; ${expire}`;
  }
}

function clearGoogtransHash() {
  if (!window.location.hash.toLowerCase().includes('googtrans')) return;
  const url = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, '', url);
}

/** Read active GT target from cookie or hash; default Italian source. */
export function readGoogTransLang(): string {
  const cookie = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (cookie?.[1]) {
    try {
      const value = decodeURIComponent(cookie[1].trim());
      // Forms: /it/en  or  /auto/en
      const parts = value.split('/').filter(Boolean);
      if (parts.length >= 2) return parts[parts.length - 1];
      if (parts.length === 1 && parts[0] !== GT_PAGE_LANG) return parts[0];
    } catch {
      /* ignore */
    }
  }
  const hash = window.location.hash.match(
    /googtrans\(([^|)]+)\|([^)]+)\)/i
  );
  if (hash?.[2]) return hash[2];
  return GT_PAGE_LANG;
}

function writeGoogtransCookie(target: string) {
  const value = `/${GT_PAGE_LANG}/${target}`;
  document.cookie = `googtrans=${value}; path=/`;
  const host = window.location.hostname;
  // Browsers reject Domain= for raw IPs (localhost / 127.0.0.1).
  if (host && !/^\d{1,3}(\.\d{1,3}){3}$/.test(host) && host !== 'localhost') {
    document.cookie = `googtrans=${value}; domain=${host}; path=/`;
  }
}

/**
 * Apply a browsing language via googtrans.
 * IT clears cookie/hash, restores page.lang, and reloads to Italian source.
 */
export function applyGoogTransLang(code: string) {
  void setSiteLanguage('it');
  if (code === GT_PAGE_LANG || code === '') {
    expireGoogtransCookies();
    clearGoogtransHash();
    document.documentElement.lang = GT_PAGE_LANG;
    document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
    window.location.reload();
    return;
  }
  writeGoogtransCookie(code);
  clearGoogtransHash();
  window.location.reload();
}

function clearGoogleTranslateArtifacts() {
  document
    .querySelectorAll(
      'iframe.goog-te-banner-frame, .skiptranslate, #goog-gt-tt, .goog-te-spinner-pos'
    )
    .forEach((el) => el.remove());
  document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
  document.body?.style.removeProperty('top');
  expireGoogtransCookies();
  clearGoogtransHash();
}

function unloadGoogleTranslate() {
  document.getElementById(GT_SCRIPT_ID)?.remove();
  const host = document.getElementById(GT_HOST_ID);
  if (host) host.innerHTML = '';
  delete window.googleTranslateElementInit;
  clearGoogleTranslateArtifacts();
}

function injectGoogleTranslate() {
  if (document.getElementById(GT_SCRIPT_ID)) {
    const host = document.getElementById(GT_HOST_ID);
    if (
      host &&
      !host.childElementCount &&
      googleTranslateApi()?.translate?.TranslateElement
    ) {
      window.googleTranslateElementInit?.();
    }
    return;
  }

  // Keep react-i18next DOM source Italian so GT does not double-translate overlays.
  void setSiteLanguage('it');

  window.googleTranslateElementInit = () => {
    const host = document.getElementById(GT_HOST_ID);
    const TranslateElement = googleTranslateApi()?.translate?.TranslateElement;
    if (!host || !TranslateElement) return;
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
  };

  const script = document.createElement('script');
  script.id = GT_SCRIPT_ID;
  script.src =
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
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

function BrandedLanguageMenu({
  variant,
  className = '',
}: {
  variant: 'header' | 'drawer';
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(GT_PAGE_LANG);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const active = langByCode(current);

  useEffect(() => {
    setCurrent(readGoogTransLang());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
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

  const pick = (code: string) => {
    setOpen(false);
    if (code === current) return;
    applyGoogTransLang(code);
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
                  className={`flex w-full min-h-[44px] items-center justify-between gap-3 px-3 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:bg-[#D4AF37]/12 ${
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
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={`Lingua del sito: ${active.label}`}
        title="Traduci il sito"
        className="inline-flex min-h-[40px] max-w-[11.5rem] items-center gap-1.5 rounded-lg border border-[#D4AF37]/25 bg-[#151311]/70 px-2 py-1.5 text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/55 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
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

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Lingua del sito"
          className="absolute right-0 top-[calc(100%+0.35rem)] z-[70] max-h-[min(70vh,22rem)] min-w-[14rem] overflow-y-auto rounded-xl border border-[#D4AF37]/25 bg-[#12100E]/98 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          {GT_LANGUAGES.map((lang) => {
            const selected = lang.code === current;
            return (
              <li key={lang.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => pick(lang.code)}
                  className={`flex w-full min-h-[44px] items-center justify-between gap-3 px-3 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:bg-[#D4AF37]/12 ${
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
    if (variant !== 'header') return;
    if (marketingAllowed === null) return;
    if (marketingAllowed) {
      injectGoogleTranslate();
    } else {
      unloadGoogleTranslate();
    }
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
