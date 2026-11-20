import React from 'react';
import { useTranslation } from 'react-i18next';
import { cmsKeyToContentKey, DEFAULT_LANG, getSiteLanguage } from '../i18n';
import type { CopyEntry } from '../types/handoff';

interface CopyTextProps {
  entry: CopyEntry | { cmsKey: string; liveText: string };
  showKeys: boolean;
  className?: string;
}

/**
 * Renders live editorial prose by default, or the exact [COPY: ...] CMS key
 * when the developer/operator toggles CMS Key Inspection mode.
 * Non-IT locales resolve overlays from the `content` i18n namespace (ENN-136).
 */
export function CopyText({ entry, showKeys, className = '' }: CopyTextProps) {
  const { t, i18n } = useTranslation('content');

  if (showKeys) {
    return (
      <span
        className={`font-mono text-[0.88em] text-[#E6C65C] bg-[#D4AF37]/10 px-1.5 py-0.5 rounded border border-[#D4AF37]/30 ${className}`}
        title={entry.liveText}
      >
        {entry.cmsKey}
      </span>
    );
  }

  const lang = getSiteLanguage();
  let text = entry.liveText;
  if (lang !== DEFAULT_LANG) {
    const key = cmsKeyToContentKey(entry.cmsKey);
    const translated = t(key, { defaultValue: entry.liveText });
    if (translated && translated !== key) {
      text = translated;
    }
  }

  // Bind i18n.language so CopyText re-renders on language change
  void i18n.language;

  return <span className={className}>{text}</span>;
}
