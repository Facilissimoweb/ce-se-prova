/**
 * Legacy curated materials locale (ENN-140).
 * ENN-145 Scarica PDF follows Google Translate (`readGoogTransLang`) instead;
 * helpers remain for any leftover IT/EN static asset lookups.
 */
import {
  DEFAULT_LANG,
  isSiteLang,
  SUPPORTED_LANGS,
  type SiteLang,
} from './types';

export const MATERIALS_LANG_STORAGE_KEY = 'tarot-italia-materials-lang';

/** Languages with curated downloadable Maggiori files in this PR. */
export const CURATED_DOWNLOAD_LANGS = ['it', 'en'] as const;
export type CuratedDownloadLang = (typeof CURATED_DOWNLOAD_LANGS)[number];

export function isCuratedDownloadLang(
  value: string
): value is CuratedDownloadLang {
  return (CURATED_DOWNLOAD_LANGS as readonly string[]).includes(value);
}

export function getMaterialsLang(): SiteLang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const raw = window.localStorage.getItem(MATERIALS_LANG_STORAGE_KEY);
    if (raw && isSiteLang(raw)) return raw;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

export function setMaterialsLang(lang: SiteLang): void {
  if (!isSiteLang(lang)) return;
  try {
    window.localStorage.setItem(MATERIALS_LANG_STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent('tarot-italia-materials-lang', { detail: lang })
  );
}

export function resolveDownloadLang(preferred?: SiteLang): CuratedDownloadLang {
  const lang = preferred ?? getMaterialsLang();
  return isCuratedDownloadLang(lang) ? lang : 'it';
}

export { SUPPORTED_LANGS, type SiteLang };
