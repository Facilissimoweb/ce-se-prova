import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { CopyText } from '../CopyText';
import { siteContent } from '../../data/siteContent';
import { normalizeGoogTransLang } from '../../lib/gtLangCodes';
import {
  GT_PAGE_LANG,
  GT_REFRESH_EVENT,
  readGoogTransLang,
} from '../../lib/googleTranslateRuntime';

type Props = {
  showCmsKeys: boolean;
  /** Compact variant for the sticky session summary column. */
  compact?: boolean;
};

/**
 * ENN-166 — Language-aware WhatsApp consult notice.
 *
 * Non-IT (googtrans ≠ it): prominent — consult is written WhatsApp chat only.
 * IT: soft — booking on site; consult on WhatsApp (written recommended with auto-translate).
 * Detection matches Traduci / LanguageSelector via `readGoogTransLang`.
 */
export function BookingLangNotice({ showCmsKeys, compact = false }: Props) {
  const [lang, setLang] = useState(GT_PAGE_LANG);

  useEffect(() => {
    const sync = () =>
      setLang(normalizeGoogTransLang(readGoogTransLang()));
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

  const isItalian = lang === GT_PAGE_LANG;
  const entry = isItalian
    ? siteContent.booking.waConsultNoteIt
    : siteContent.booking.waConsultNoticeNonIt;

  if (isItalian) {
    return (
      <aside
        role="status"
        aria-live="polite"
        className={`flex items-start gap-3 rounded-xl border border-[#D4AF37]/20 bg-[#151311]/70 ${
          compact ? 'p-3.5' : 'p-4 md:p-5'
        }`}
      >
        <MessageCircle
          className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]/80"
          aria-hidden="true"
        />
        <div className="min-w-0 space-y-1">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]/90">
            Consulto su WhatsApp
          </p>
          <p
            className={`leading-relaxed text-[#A39B93] ${
              compact ? 'text-xs' : 'text-xs md:text-sm'
            }`}
          >
            <CopyText entry={entry} showKeys={showCmsKeys} />
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside
      role="status"
      aria-live="polite"
      className={`rounded-xl border border-[#D4AF37]/55 bg-[#1d1b19]/95 shadow-[0_0_24px_rgba(212,175,55,0.12)] ${
        compact ? 'p-3.5' : 'p-4 md:p-5'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/15"
          aria-hidden="true"
        >
          <MessageCircle className="h-4 w-4 text-[#E6C65C]" />
        </span>
        <div className="min-w-0 space-y-1.5">
          <p className="font-display text-sm font-semibold tracking-[0.04em] text-[#E6C65C] md:text-base">
            Solo chat scritta su WhatsApp
          </p>
          <p
            className={`leading-relaxed text-[#F4F1EA] ${
              compact ? 'text-xs' : 'text-sm md:text-[15px]'
            }`}
          >
            <CopyText entry={entry} showKeys={showCmsKeys} />
          </p>
        </div>
      </div>
    </aside>
  );
}
