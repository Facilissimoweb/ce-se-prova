import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  getSiteLanguage,
  LANG_LABELS,
  LANG_SHORT,
  setSiteLanguage,
  SUPPORTED_LANGS,
  type SiteLang,
} from './index';

type Props = {
  /** Compact control for the sticky header; full labels in the mobile drawer. */
  variant?: 'header' | 'drawer';
  className?: string;
};

/**
 * Site language switcher — IT default + EN/ES/FR/DE.
 * Persists to localStorage and mirrors preference in `?lang=` (paths stay Italian).
 */
export function LanguageSwitcher({
  variant = 'header',
  className = '',
}: Props) {
  const { t, i18n } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = getSiteLanguage();

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

  // Keep document lang/hreflang aligned when language changes elsewhere
  useEffect(() => {
    const onLang = () => {
      /* re-render via i18n subscription */
    };
    i18n.on('languageChanged', onLang);
    return () => {
      i18n.off('languageChanged', onLang);
    };
  }, [i18n]);

  const pick = async (lang: SiteLang) => {
    setOpen(false);
    if (lang === current) return;
    await setSiteLanguage(lang);
  };

  if (variant === 'drawer') {
    return (
      <div className={`space-y-2 ${className}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
          {t('lang.switcherAria')}
        </p>
        <div
          role="group"
          aria-label={t('lang.switcherAria')}
          className="grid grid-cols-5 gap-1.5"
        >
          {SUPPORTED_LANGS.map((lang) => {
            const active = lang === current;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => void pick(lang)}
                aria-pressed={active}
                aria-label={LANG_LABELS[lang]}
                className={`min-h-[44px] rounded-lg border text-xs font-semibold tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  active
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#12100E]'
                    : 'border-[#D4AF37]/25 bg-[#151311]/85 text-[#F4F1EA] hover:border-[#D4AF37]/55'
                }`}
              >
                {LANG_SHORT[lang]}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={t('lang.current', { label: LANG_LABELS[current] })}
        title={t('lang.switcherAria')}
        className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-[#D4AF37]/25 bg-[#151311]/70 px-2 py-1.5 text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/55 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <Globe className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" aria-hidden />
        <span className="text-[11px] font-semibold tracking-[0.08em]">
          {LANG_SHORT[current]}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#A39B93] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t('lang.switcherAria')}
          className="absolute right-0 top-[calc(100%+0.35rem)] z-[70] min-w-[10.5rem] overflow-hidden rounded-xl border border-[#D4AF37]/25 bg-[#12100E]/98 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          {SUPPORTED_LANGS.map((lang) => {
            const active = lang === current;
            return (
              <li key={lang} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => void pick(lang)}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-xs transition-colors focus-visible:outline-none focus-visible:bg-[#D4AF37]/12 ${
                    active
                      ? 'bg-[#D4AF37]/12 text-[#D4AF37]'
                      : 'text-[#F4F1EA] hover:bg-[#D4AF37]/08'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-semibold tracking-[0.06em]">
                      {LANG_SHORT[lang]}
                    </span>
                    <span className="text-[#A39B93]">{LANG_LABELS[lang]}</span>
                  </span>
                  {active && (
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
