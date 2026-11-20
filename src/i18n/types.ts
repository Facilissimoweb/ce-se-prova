/** Supported site languages — PT deferred (ENN-136). */
export const SUPPORTED_LANGS = ['it', 'en', 'es', 'fr', 'de'] as const;

export type SiteLang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: SiteLang = 'it';

export const LANG_STORAGE_KEY = 'tarot-italia-lang';

export const LANG_QUERY_PARAM = 'lang';

/** BCP 47 / HTML lang + hreflang codes. */
export const LANG_HTML: Record<SiteLang, string> = {
  it: 'it',
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
};

/** Open Graph locale tags. */
export const LANG_OG: Record<SiteLang, string> = {
  it: 'it_IT',
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
};

export const LANG_LABELS: Record<SiteLang, string> = {
  it: 'Italiano',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

/** Short codes shown in the switcher chrome. */
export const LANG_SHORT: Record<SiteLang, string> = {
  it: 'IT',
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
};

export function isSiteLang(value: unknown): value is SiteLang {
  return (
    typeof value === 'string' &&
    (SUPPORTED_LANGS as readonly string[]).includes(value)
  );
}
