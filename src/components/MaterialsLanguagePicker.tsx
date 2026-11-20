import React, { useEffect, useState } from 'react';
import {
  CURATED_DOWNLOAD_LANGS,
  getMaterialsLang,
  isCuratedDownloadLang,
  setMaterialsLang,
  type SiteLang,
} from '../i18n/materialsLang';
import { LANG_LABELS, LANG_SHORT, SUPPORTED_LANGS } from '../i18n/types';

type Props = {
  className?: string;
  /** Compact inline control next to download buttons. */
  size?: 'sm' | 'md';
};

/**
 * Curated course/dispensa language (ENN-140 hybrid).
 * Independent from Google Translate browsing — picks downloadable files.
 */
export function MaterialsLanguagePicker({
  className = '',
  size = 'sm',
}: Props) {
  const [lang, setLang] = useState<SiteLang>('it');

  useEffect(() => {
    setLang(getMaterialsLang());
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<SiteLang>).detail;
      if (detail) setLang(detail);
      else setLang(getMaterialsLang());
    };
    window.addEventListener('tarot-italia-materials-lang', onChange);
    return () =>
      window.removeEventListener('tarot-italia-materials-lang', onChange);
  }, []);

  const pick = (next: SiteLang) => {
    if (!isCuratedDownloadLang(next)) return;
    setMaterialsLang(next);
    setLang(next);
  };

  const pad = size === 'md' ? 'px-3 py-2 min-h-[44px]' : 'px-2.5 py-1.5 min-h-[40px]';

  return (
    <div
      className={`notranslate flex flex-wrap items-center gap-2 ${className}`}
      translate="no"
      role="group"
      aria-label="Lingua dei materiali didattici"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
        Lingua dispense
      </span>
      <div className="inline-flex flex-wrap gap-1">
        {SUPPORTED_LANGS.map((code) => {
          const ready = isCuratedDownloadLang(code);
          const active = lang === code;
          return (
            <button
              key={code}
              type="button"
              disabled={!ready}
              title={
                ready
                  ? LANG_LABELS[code]
                  : `${LANG_LABELS[code]} — in arrivo`
              }
              aria-pressed={active}
              aria-label={
                ready
                  ? LANG_LABELS[code]
                  : `${LANG_LABELS[code]} (in arrivo)`
              }
              onClick={() => pick(code)}
              className={`${pad} rounded-lg border text-[11px] font-semibold tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                !ready
                  ? 'cursor-not-allowed border-[#D4AF37]/12 bg-[#151311]/40 text-[#A39B93]/55'
                  : active
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#12100E]'
                    : 'border-[#D4AF37]/25 bg-[#151311]/85 text-[#F4F1EA] hover:border-[#D4AF37]/55'
              }`}
            >
              {LANG_SHORT[code]}
              {!ready && (
                <span className="sr-only"> (in arrivo)</span>
              )}
            </button>
          );
        })}
      </div>
      <span className="text-[11px] text-[#A39B93]">
        File curati: {CURATED_DOWNLOAD_LANGS.map((c) => c.toUpperCase()).join(' · ')}
        {' · '}ES/FR/DE in arrivo
      </span>
    </div>
  );
}
