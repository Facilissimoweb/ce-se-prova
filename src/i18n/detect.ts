import {
  DEFAULT_LANG,
  isSiteLang,
  LANG_QUERY_PARAM,
  LANG_STORAGE_KEY,
  type SiteLang,
} from './types';

/** Read `?lang=` from a search string (e.g. `window.location.search`). */
export function langFromSearch(search: string): SiteLang | null {
  try {
    const params = new URLSearchParams(
      search.startsWith('?') ? search : `?${search}`
    );
    const raw = params.get(LANG_QUERY_PARAM)?.trim().toLowerCase();
    return isSiteLang(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function langFromStorage(): SiteLang | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LANG_STORAGE_KEY)?.trim().toLowerCase();
    return isSiteLang(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function langFromNavigator(): SiteLang | null {
  if (typeof navigator === 'undefined') return null;
  const candidates = [
    navigator.language,
    ...(navigator.languages ?? []),
  ]
    .filter(Boolean)
    .map((l) => l.trim().toLowerCase());

  for (const candidate of candidates) {
    const primary = candidate.split('-')[0];
    if (isSiteLang(primary)) return primary;
  }
  return null;
}

/**
 * Resolution order for Phase 1:
 * 1. `?lang=` (shareable / SEO-friendly without translating pathnames)
 * 2. localStorage preference
 * 3. browser language (if supported)
 * 4. Italian default
 */
export function detectSiteLang(search?: string): SiteLang {
  const fromQuery =
    typeof search === 'string'
      ? langFromSearch(search)
      : typeof window !== 'undefined'
        ? langFromSearch(window.location.search)
        : null;
  if (fromQuery) return fromQuery;

  const fromStorage = langFromStorage();
  if (fromStorage) return fromStorage;

  const fromNav = langFromNavigator();
  if (fromNav) return fromNav;

  return DEFAULT_LANG;
}

export function persistSiteLang(lang: SiteLang): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* private mode / quota — ignore */
  }
}

/**
 * Keep `?lang=` in sync when the user picks a non-default language;
 * remove the param when returning to Italian (cleaner URLs).
 * Preserves other query params and SPA path/hash.
 */
export function syncLangQueryParam(lang: SiteLang): void {
  if (typeof window === 'undefined') return;
  try {
    const url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) {
      url.searchParams.delete(LANG_QUERY_PARAM);
    } else {
      url.searchParams.set(LANG_QUERY_PARAM, lang);
    }
    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) {
      window.history.replaceState(window.history.state, '', next);
    }
  } catch {
    /* ignore */
  }
}
