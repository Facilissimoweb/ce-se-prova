import {
  LANG_HTML,
  LANG_OG,
  SUPPORTED_LANGS,
  type SiteLang,
} from './types';

const HREFLANG_ATTR = 'data-ti-hreflang';

/** Local origin helper — avoid importing `seo.ts` (circular with i18n). */
function siteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_ORIGIN?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv).origin;
    } catch {
      return fromEnv.replace(/\/$/, '');
    }
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return '';
}

function absoluteHref(pathWithQuery: string, origin: string): string {
  const normalized = pathWithQuery.startsWith('/')
    ? pathWithQuery
    : `/${pathWithQuery}`;
  if (!origin) return normalized;
  return `${origin.replace(/\/$/, '')}${normalized}`;
}

function upsertMeta(
  selector: { attr: 'name' | 'property'; key: string },
  content: string
): void {
  const head = document.head;
  let el = head.querySelector(
    `meta[${selector.attr}="${selector.key}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(selector.attr, selector.key);
    head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Update `<html lang>`, og:locale, and hreflang alternates for the current path.
 * Pathnames stay Italian (SPA); language is expressed via `?lang=` + document lang.
 */
export function applyDocumentLang(lang: SiteLang, pathname?: string): void {
  if (typeof document === 'undefined') return;

  document.documentElement.lang = LANG_HTML[lang];
  upsertMeta({ attr: 'property', key: 'og:locale' }, LANG_OG[lang]);

  // Alternate og:locale tags for other languages
  document
    .querySelectorAll(`meta[${HREFLANG_ATTR}="og-alt"]`)
    .forEach((n) => n.remove());
  for (const other of SUPPORTED_LANGS) {
    if (other === lang) continue;
    const el = document.createElement('meta');
    el.setAttribute('property', 'og:locale:alternate');
    el.setAttribute('content', LANG_OG[other]);
    el.setAttribute(HREFLANG_ATTR, 'og-alt');
    document.head.appendChild(el);
  }

  const path =
    pathname ??
    (typeof window !== 'undefined' ? window.location.pathname : '/');
  const origin = siteOrigin();

  document
    .querySelectorAll(`link[${HREFLANG_ATTR}="1"]`)
    .forEach((n) => n.remove());

  const hrefFor = (code: SiteLang | 'x-default') => {
    const q = code === 'it' || code === 'x-default' ? '' : `?lang=${code}`;
    return absoluteHref(`${path}${q}`, origin);
  };

  for (const code of SUPPORTED_LANGS) {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = code;
    link.href = hrefFor(code);
    link.setAttribute(HREFLANG_ATTR, '1');
    document.head.appendChild(link);
  }

  const xDefault = document.createElement('link');
  xDefault.rel = 'alternate';
  xDefault.hreflang = 'x-default';
  xDefault.href = hrefFor('x-default');
  xDefault.setAttribute(HREFLANG_ATTR, '1');
  document.head.appendChild(xDefault);
}
