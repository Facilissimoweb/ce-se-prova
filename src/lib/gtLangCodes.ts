/**
 * ENN-159 — Canonical Google Translate browsing codes for Tarot Italia.
 *
 * Menu, googtrans cookie/hash, Nina `lang`, and document chrome must agree:
 * - Chinese → Simplified only (`zh-CN`), never Traditional / zh-TW
 * - Japanese → `ja`
 * - Arabic → `ar` (MSA) + RTL document direction
 * - Hindi → `hi`
 *
 * Kept free of googleTranslateRuntime imports to avoid circular deps.
 */

/** Italian page source — same value as `GT_PAGE_LANG` in the runtime module. */
export const GT_SOURCE_LANG = 'it';

/** Languages that require `dir="rtl"` on the document root. */
export const GT_RTL_LANGS = new Set(['ar']);

/**
 * Normalize a googtrans / menu / Nina lang tag to our canonical GT code.
 * Always returns `zh-CN` for any Chinese variant (Hans/Hant/TW/HK).
 */
export function normalizeGoogTransLang(lang?: string | null): string {
  const raw = (lang || GT_SOURCE_LANG).trim().replace(/_/g, '-');
  if (!raw) return GT_SOURCE_LANG;

  const lower = raw.toLowerCase();
  if (lower === 'zh' || lower.startsWith('zh-')) {
    return 'zh-CN';
  }

  if (lower === 'ja' || lower === 'ar' || lower === 'hi') return lower;
  if (lower === GT_SOURCE_LANG) return GT_SOURCE_LANG;

  // Pass through other menu codes as lowercase primary (en, es, …).
  const primary = lower.split('-')[0] || GT_SOURCE_LANG;
  return primary;
}

export function isGtRtlLang(lang?: string | null): boolean {
  return GT_RTL_LANGS.has(normalizeGoogTransLang(lang).toLowerCase());
}

/**
 * Sync `<html lang>` + `dir` (and body `dir`) with the active googtrans target.
 * Call after reading cookie/hash and whenever the browsing language changes.
 */
export function applyGtDocumentChrome(lang?: string | null): void {
  if (typeof document === 'undefined') return;
  const code = normalizeGoogTransLang(lang);
  const rtl = isGtRtlLang(code);
  const root = document.documentElement;

  root.lang = code === GT_SOURCE_LANG ? GT_SOURCE_LANG : code;
  root.dir = rtl ? 'rtl' : 'ltr';
  root.classList.toggle('ti-gt-rtl', rtl);
  if (document.body) {
    document.body.dir = rtl ? 'rtl' : 'ltr';
  }
}
