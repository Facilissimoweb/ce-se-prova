import React, { useEffect, useId, useState } from 'react';
import { Globe } from 'lucide-react';
import {
  loadSavedCookiePreferences,
  subscribeCookieConsent,
} from '../lib/cookieConsent';
import { setSiteLanguage } from '../i18n';

const GT_SCRIPT_ID = 'tarot_italia_google_translate_script';
export const GT_HOST_ID = 'tarot_italia_google_translate_host';

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

function clearGoogleTranslateArtifacts() {
  document
    .querySelectorAll(
      'iframe.goog-te-banner-frame, .skiptranslate, #goog-gt-tt, .goog-te-spinner-pos'
    )
    .forEach((el) => el.remove());
  document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
  document.body?.style.removeProperty('top');
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  document.cookie = `googtrans=; ${expire}`;
  document.cookie = `googtrans=; domain=${window.location.hostname}; ${expire}`;
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
        pageLanguage: 'it',
        includedLanguages:
          'en,es,fr,de,pt,ar,zh-CN,ja,ko,ru,nl,pl,ro,sv,tr,uk,el,hi',
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

type Props = {
  variant?: 'header' | 'drawer';
  className?: string;
  /** Opens privacy preferences when marketing consent is missing. */
  onRequestConsent?: () => void;
};

/**
 * Brand-styled Google Website Translator (ENN-140).
 * Single DOM host lives in the header variant; drawer only shows consent / hint.
 * Script loads only after marketing / third-party cookie consent.
 */
export function GoogleTranslateWidget({
  variant = 'header',
  className = '',
  onRequestConsent,
}: Props) {
  const labelId = useId();
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    const prefs = loadSavedCookiePreferences();
    setMarketingAllowed(Boolean(prefs?.marketing));
    return subscribeCookieConsent((next) => {
      setMarketingAllowed(Boolean(next?.marketing));
    });
  }, []);

  useEffect(() => {
    if (variant !== 'header') return;
    if (marketingAllowed) {
      injectGoogleTranslate();
    } else {
      unloadGoogleTranslate();
    }
  }, [marketingAllowed, variant]);

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
    return (
      <div className={`space-y-2 notranslate ${className}`} translate="no">
        <p
          id={labelId}
          className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]"
        >
          Traduci il sito
        </p>
        <p className="text-xs leading-relaxed text-[#A39B93]">
          Usa il selettore lingua nella barra in alto. Fonte: italiano. I
          materiali didattici hanno file curati a parte (Corsi / Area
          Riservata).
        </p>
      </div>
    );
  }

  return (
    <div
      className={`tarot-gt-shell notranslate flex min-h-[40px] max-w-[9.5rem] items-center rounded-lg border border-[#D4AF37]/25 bg-[#151311]/70 px-1.5 ${className}`}
      translate="no"
      title="Traduci il sito con Google"
      aria-label="Traduci il sito"
    >
      <Globe
        className="ml-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]"
        aria-hidden
      />
      <div id={GT_HOST_ID} className="tarot-gt-host min-w-0 flex-1" />
    </div>
  );
}
