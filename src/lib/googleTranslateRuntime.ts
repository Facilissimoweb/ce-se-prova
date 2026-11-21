/**
 * ENN-148 — Google Translate SPA runtime.
 *
 * TranslateElement only scans the DOM on init / combo change. React remounts
 * (route changes, auth login, dynamic course UI) leave fresh Italian source
 * until we re-trigger. Cookie `googtrans` is the durable language signal;
 * `#googtrans(it|xx)` is restored across SPA pushState when present/needed.
 *
 * ENN-159 — cookie/hash targets are normalized via `normalizeGoogTransLang`
 * (zh-CN only; ar drives document RTL).
 */

import {
  applyGtDocumentChrome,
  normalizeGoogTransLang,
} from './gtLangCodes';

export const GT_PAGE_LANG = 'it';
export const GT_HOST_ID = 'tarot_italia_google_translate_host';
export const GT_REFRESH_EVENT = 'tarot:gt-refresh';


/** Fired so scroll helpers can wait/retry after GT mutates layout (ENN-149). */
export const GT_LAYOUT_EVENT = 'tarot:gt-layout';

/**
 * Same string as `PATH_CHANGE_EVENT` in appPaths — kept local to avoid a
 * circular import (appPaths needs preservedGoogtransHash from this module).
 */
const PATH_CHANGE_EVENT = 'tarot:pathchange';

type TranslateElementCtor = {
  new (options: Record<string, unknown>, elementId: string): unknown;
  InlineLayout?: { SIMPLE?: number };
};

type GoogleTranslateNs = {
  translate?: {
    TranslateElement: TranslateElementCtor;
  };
};

function googleTranslateApi(): GoogleTranslateNs | undefined {
  return (window as Window & { google?: GoogleTranslateNs }).google;
}

function googtransDomainCandidates(): string[] {
  const host = window.location.hostname;
  const domains: string[] = [''];
  if (
    host &&
    host !== 'localhost' &&
    !/^\d{1,3}(\.\d{1,3}){3}$/.test(host)
  ) {
    domains.push(host);
    const parts = host.split('.');
    for (let i = 0; i <= parts.length - 2; i++) {
      domains.push(`.${parts.slice(i).join('.')}`);
    }
  }
  return [...new Set(domains)];
}

export function expireGoogtransCookies(): void {
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
  const paths = ['/', window.location.pathname || '/'];
  for (const domain of googtransDomainCandidates()) {
    const domainPart = domain ? `domain=${domain}; ` : '';
    for (const path of paths) {
      document.cookie = `googtrans=; ${domainPart}path=${path}; ${expire}`;
    }
  }
}

export function clearGoogtransHash(): void {
  if (!window.location.hash.toLowerCase().includes('googtrans')) return;
  const url = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, '', url);
}

function parseGoogtransTarget(raw: string): string | null {
  try {
    const value = decodeURIComponent(raw.trim());
    const parts = value.split('/').filter(Boolean);
    if (parts.length >= 2) return parts[parts.length - 1];
    if (parts.length === 1 && parts[0] !== GT_PAGE_LANG) return parts[0];
  } catch {
    /* ignore */
  }
  return null;
}

/** True when the URL hash is a Google Translate marker (not a site landmark). */
export function isGoogtransHash(hash: string): boolean {
  const key = hash.replace(/^#/, '').trim().toLowerCase();
  return key.startsWith('googtrans');
}

/**
 * Read active GT target from cookie or hash; default Italian source.
 *
 * Prefer `#googtrans(it|xx)` when it advertises a non-IT target: Traduci SPA
 * writes hash + cookie together, but TranslateElement combo blank-nudges can
 * flicker the cookie back to `/it/it` while the hash (and often the visible
 * page) still say the browsing language. Cookie-first made Nina send `lang=it`
 * and keep prior-IT history after Traduci (ENN-180).
 */
export function readGoogTransLang(): string {
  let fromHash: string | null = null;
  const hash = window.location.hash.match(
    /googtrans\(([^|)]+)\|([^)]+)\)/i
  );
  if (hash?.[2]) fromHash = normalizeGoogTransLang(hash[2]);

  let fromCookie: string | null = null;
  const cookie = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (cookie?.[1]) {
    const parsed = parseGoogtransTarget(cookie[1]);
    if (parsed) fromCookie = normalizeGoogTransLang(parsed);
  }

  if (fromHash && fromHash !== GT_PAGE_LANG) return fromHash;
  if (fromCookie && fromCookie !== GT_PAGE_LANG) return fromCookie;
  if (fromHash) return fromHash;
  if (fromCookie) return fromCookie;
  return GT_PAGE_LANG;
}

export function writeGoogtransCookie(target: string): void {
  expireGoogtransCookies();
  const canonical = normalizeGoogTransLang(target);
  const value = `/${GT_PAGE_LANG}/${canonical}`;
  document.cookie = `googtrans=${value}; path=/`;
  const host = window.location.hostname;
  if (host && !/^\d{1,3}(\.\d{1,3}){3}$/.test(host) && host !== 'localhost') {
    document.cookie = `googtrans=${value}; domain=${host}; path=/`;
    const parts = host.split('.');
    if (parts.length >= 2) {
      document.cookie = `googtrans=${value}; domain=.${parts.slice(-2).join('.')}; path=/`;
    }
  }
}

/**
 * Hash fragment to keep on SPA pushState/replaceState so `#googtrans` survives
 * login and route changes. Empty when browsing Italian (or no cookie).
 */
export function preservedGoogtransHash(): string {
  if (typeof window === 'undefined') return '';
  try {
    if (isGoogtransHash(window.location.hash)) {
      const h = window.location.hash;
      return h.startsWith('#') ? h : `#${h}`;
    }
    const cookie = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
    if (!cookie?.[1]) return '';
    const target = parseGoogtransTarget(cookie[1]);
    if (!target || target === GT_PAGE_LANG) return '';
    return `#googtrans(${GT_PAGE_LANG}|${target})`;
  } catch {
    return '';
  }
}

/** Ensure cookie + hash still advertise the active non-IT language. */
export function ensureGoogtransPersisted(): string {
  const lang = readGoogTransLang();
  applyGtDocumentChrome(lang);
  if (lang === GT_PAGE_LANG) return lang;
  writeGoogtransCookie(lang);
  const want = `#googtrans(${GT_PAGE_LANG}|${lang})`;
  // Rewrite hash when a legacy target (e.g. zh-TW) was normalized to zh-CN.
  const hashMatch = window.location.hash.match(
    /googtrans\(([^|)]+)\|([^)]+)\)/i
  );
  const hashTarget = hashMatch?.[2]
    ? normalizeGoogTransLang(hashMatch[2])
    : null;
  if (!isGoogtransHash(window.location.hash) || hashTarget !== lang) {
    const url = `${window.location.pathname}${window.location.search}${want}`;
    window.history.replaceState(null, '', url);
  }
  return lang;
}

function comboSelect(): HTMLSelectElement | null {
  return document.querySelector<HTMLSelectElement>(
    `#${GT_HOST_ID} select.goog-te-combo, select.goog-te-combo`
  );
}

function notifyGtLayout(): void {
  window.dispatchEvent(new Event(GT_LAYOUT_EVENT));
}

let reapplyLockUntil = 0;
let reapplyTimer: ReturnType<typeof setTimeout> | undefined;
let spaBridgeStarted = false;

/**
 * Re-trigger TranslateElement against the current DOM.
 * Prefer calling {@link requestGoogleTranslateRefresh} (debounced).
 */
export function reapplyGoogleTranslate(): boolean {
  if (typeof window === 'undefined') return false;
  const lang = ensureGoogtransPersisted();
  if (lang === GT_PAGE_LANG) return false;

  const combo = comboSelect();
  if (!combo) return false;

  reapplyLockUntil = Date.now() + 1200;

  const fire = (value: string) => {
    combo.value = value;
    combo.dispatchEvent(new Event('change'));
  };

  // Same-value change is often ignored — nudge via blank then restore.
  if (combo.value === lang) {
    fire('');
    window.setTimeout(() => {
      fire(lang);
      window.setTimeout(notifyGtLayout, 120);
      window.setTimeout(notifyGtLayout, 400);
    }, 40);
  } else {
    fire(lang);
    window.setTimeout(notifyGtLayout, 120);
    window.setTimeout(notifyGtLayout, 400);
  }
  return true;
}

/** Debounced refresh — route / auth / DOM landmarks. */
export function requestGoogleTranslateRefresh(delayMs = 120): void {
  if (typeof window === 'undefined') return;
  if (readGoogTransLang() === GT_PAGE_LANG) return;
  if (reapplyTimer !== undefined) clearTimeout(reapplyTimer);
  reapplyTimer = setTimeout(() => {
    reapplyTimer = undefined;
    reapplyGoogleTranslate();
  }, delayMs);
}

export function notifyGoogleTranslateRefresh(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(GT_REFRESH_EVENT));
}

function isGtOwnMutation(node: Node): boolean {
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    return !parent ? true : isGtOwnMutation(parent);
  }
  if (!(node instanceof Element)) return true;
  if (node.tagName === 'FONT') return true;
  if (node.id === GT_HOST_ID || node.closest?.(`#${GT_HOST_ID}`)) return true;
  if (node.classList.contains('skiptranslate')) return true;
  if (node.classList.contains('goog-te-spinner-pos')) return true;
  if (node.closest?.('.skiptranslate, .goog-te-banner-frame, #goog-gt-tt')) {
    return true;
  }
  return false;
}

function mutationLooksLikeAppContent(mutations: MutationRecord[]): boolean {
  for (const m of mutations) {
    if (m.type !== 'childList') continue;
    for (const node of m.addedNodes) {
      if (isGtOwnMutation(node)) continue;
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (
        node.nodeType === Node.TEXT_NODE &&
        (node.textContent?.trim().length ?? 0) > 0
      ) {
        const parent = node.parentElement;
        if (parent && !isGtOwnMutation(parent)) return true;
      }
    }
  }
  return false;
}

/**
 * Start listeners that re-apply googtrans after SPA navigation, auth, and
 * meaningful React mounts. Idempotent; returns disposer.
 */
export function startGoogleTranslateSpaBridge(): () => void {
  if (typeof window === 'undefined') return () => undefined;
  if (spaBridgeStarted) return () => undefined;
  spaBridgeStarted = true;

  const onRefreshEvent = () => requestGoogleTranslateRefresh(80);
  const onPath = () => requestGoogleTranslateRefresh(100);

  window.addEventListener(GT_REFRESH_EVENT, onRefreshEvent);
  window.addEventListener(PATH_CHANGE_EVENT, onPath);

  const root =
    document.getElementById('root') ??
    document.querySelector('#root') ??
    document.body;

  const observer = new MutationObserver((mutations) => {
    if (Date.now() < reapplyLockUntil) return;
    if (readGoogTransLang() === GT_PAGE_LANG) return;
    if (!mutationLooksLikeAppContent(mutations)) return;
    requestGoogleTranslateRefresh(220);
  });

  observer.observe(root, { childList: true, subtree: true });

  // First paint after inject — cookie may already request EN / ar RTL.
  applyGtDocumentChrome(readGoogTransLang());
  requestGoogleTranslateRefresh(200);

  return () => {
    spaBridgeStarted = false;
    window.removeEventListener(GT_REFRESH_EVENT, onRefreshEvent);
    window.removeEventListener(PATH_CHANGE_EVENT, onPath);
    observer.disconnect();
    if (reapplyTimer !== undefined) clearTimeout(reapplyTimer);
  };
}

/** Used by widget inject path when script already present. */
export function googleTranslateElementReady(): boolean {
  return Boolean(googleTranslateApi()?.translate?.TranslateElement);
}
