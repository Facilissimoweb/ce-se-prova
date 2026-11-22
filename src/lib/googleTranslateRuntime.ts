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
 *
 * ENN-184 — harden non-IT SPA lang switch: wait/retry for `.goog-te-combo`,
 * fire bubbles InputEvent/change GT accepts, remount TranslateElement host
 * if still failing — never `location.reload()` for non-IT.
 *
 * ENN-205 — Italian restore is also SPA (`applyGoogleTranslateSpaRestore`):
 * clear combo → remount host → notify listeners — never `location.reload()`.
 */

import {
  applyGtDocumentChrome,
  normalizeGoogTransLang,
} from './gtLangCodes';
import { GT_ENABLED } from './googleTranslateEnabled';

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
  // ENN-185 launch freeze — Italian-only for Nina / PDF / chrome consumers.
  if (!GT_ENABLED) return GT_PAGE_LANG;

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
  if (!GT_ENABLED) return;
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
  if (!GT_ENABLED) return '';
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
  if (!GT_ENABLED || lang === GT_PAGE_LANG) return lang;
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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Set select value the way browsers / TranslateElement expect, then fire
 * bubbling input + change (plain `new Event('change')` is often ignored).
 */
function dispatchComboChange(
  combo: HTMLSelectElement,
  value: string
): void {
  const proto = Object.getOwnPropertyDescriptor(
    HTMLSelectElement.prototype,
    'value'
  );
  if (proto?.set) {
    proto.set.call(combo, value);
  } else {
    combo.value = value;
  }
  // Keep property in sync when proto setter was a no-op on some embeds.
  if (combo.value !== value) {
    combo.value = value;
  }

  combo.dispatchEvent(new Event('input', { bubbles: true }));
  try {
    combo.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true, data: value })
    );
  } catch {
    /* InputEvent unsupported — Event('input') above still fired */
  }
  combo.dispatchEvent(new Event('change', { bubbles: true }));

  // Legacy HTMLEvents path some GT gadget builds still listen to.
  try {
    const legacy = document.createEvent('HTMLEvents');
    legacy.initEvent('change', true, true);
    combo.dispatchEvent(legacy);
  } catch {
    /* ignore */
  }
}

function comboHasOption(combo: HTMLSelectElement, lang: string): boolean {
  return Array.from(combo.options).some((opt) => opt.value === lang);
}

function pageLooksTranslated(lang: string): boolean {
  const html = document.documentElement;
  if (
    html.classList.contains('translated-ltr') ||
    html.classList.contains('translated-rtl')
  ) {
    return true;
  }
  // Fresh IT→xx: class can lag; combo already on target + any font under root.
  const combo = comboSelect();
  if (combo?.value === lang && document.querySelector('#root font, body font')) {
    return true;
  }
  return false;
}

/**
 * Widget registers remount of hidden TranslateElement (clear host + new
 * TranslateElement). Used when combo never appears or SPA switch stalls.
 * Must NOT call location.reload.
 */
let remountTranslateHost: (() => boolean) | null = null;

export function registerGoogleTranslateHostRemount(
  remount: () => boolean
): void {
  remountTranslateHost = remount;
}

function tryRemountTranslateHost(): boolean {
  if (!remountTranslateHost) return false;
  try {
    return Boolean(remountTranslateHost());
  } catch {
    return false;
  }
}

let reapplyLockUntil = 0;
let reapplyTimer: ReturnType<typeof setTimeout> | undefined;
let spaBridgeStarted = false;
/** Consecutive combo-misses from {@link reapplyGoogleTranslate} / refresh. */
let comboMissStreak = 0;
let spaSwitchGeneration = 0;

/**
 * Fire combo toward `lang`, blank-nudging when GT would ignore a same-value
 * or cross-lang change.
 */
function fireComboToward(combo: HTMLSelectElement, lang: string): void {
  reapplyLockUntil = Date.now() + 1200;
  const prev = combo.value;
  if (prev === lang || (prev && prev !== lang)) {
    dispatchComboChange(combo, '');
    window.setTimeout(() => {
      const live = comboSelect() ?? combo;
      dispatchComboChange(live, lang);
      window.setTimeout(notifyGtLayout, 120);
      window.setTimeout(notifyGtLayout, 400);
    }, 40);
  } else {
    dispatchComboChange(combo, lang);
    window.setTimeout(notifyGtLayout, 120);
    window.setTimeout(notifyGtLayout, 400);
  }
}

/**
 * Re-trigger TranslateElement against the current DOM.
 * Prefer calling {@link requestGoogleTranslateRefresh} (debounced).
 * ENN-184: no silent miss — retry / remount when combo is absent.
 */
export function reapplyGoogleTranslate(): boolean {
  if (typeof window === 'undefined' || !GT_ENABLED) return false;
  const lang = ensureGoogtransPersisted();
  if (lang === GT_PAGE_LANG) {
    comboMissStreak = 0;
    return false;
  }

  const combo = comboSelect();
  if (!combo || !comboHasOption(combo, lang)) {
    comboMissStreak += 1;
    if (comboMissStreak === 4) {
      tryRemountTranslateHost();
    }
    if (comboMissStreak <= 10) {
      requestGoogleTranslateRefresh(120);
    } else {
      comboMissStreak = 0;
    }
    return false;
  }

  comboMissStreak = 0;
  fireComboToward(combo, lang);
  return true;
}

/**
 * ENN-184 — non-IT Traduci without full reload: wait for combo, fire GT-accepted
 * events, remount TranslateElement if still failing. Resolves true when combo
 * settled on `target` (and preferably page shows translated chrome).
 */
export async function applyGoogleTranslateSpaSwitch(
  target: string
): Promise<boolean> {
  if (typeof window === 'undefined' || !GT_ENABLED) return false;
  const lang = normalizeGoogTransLang(target);
  if (lang === GT_PAGE_LANG) return false;

  const gen = ++spaSwitchGeneration;
  ensureGoogtransPersisted();
  if (reapplyTimer !== undefined) {
    clearTimeout(reapplyTimer);
    reapplyTimer = undefined;
  }

  let remounted = false;
  const deadline = Date.now() + 4500;

  while (Date.now() < deadline) {
    if (gen !== spaSwitchGeneration) return false;

    let combo = comboSelect();
    if (!combo || !comboHasOption(combo, lang)) {
      if (!remounted) {
        remounted = tryRemountTranslateHost();
        await sleep(220);
        continue;
      }
      await sleep(80);
      continue;
    }

    // Always blank-nudge then set — cross-lang + same-value both need it.
    dispatchComboChange(combo, '');
    await sleep(50);
    if (gen !== spaSwitchGeneration) return false;
    combo = comboSelect() ?? combo;
    // Cookie may flicker on blank nudge — re-assert target.
    writeGoogtransCookie(lang);
    dispatchComboChange(combo, lang);
    await sleep(280);
    if (gen !== spaSwitchGeneration) return false;

    combo = comboSelect();
    if (combo?.value === lang) {
      if (pageLooksTranslated(lang)) {
        notifyGtLayout();
        window.setTimeout(notifyGtLayout, 200);
        comboMissStreak = 0;
        return true;
      }
      // Combo accepted; give GT a beat to wrap text.
      await sleep(450);
      if (gen !== spaSwitchGeneration) return false;
      if (comboSelect()?.value === lang) {
        notifyGtLayout();
        comboMissStreak = 0;
        // Accept combo match even if class lags (first IT→EN).
        return true;
      }
    }

    if (!remounted) {
      ensureGoogtransPersisted();
      remounted = tryRemountTranslateHost();
      await sleep(280);
      continue;
    }

    await sleep(120);
  }

  // Last ditch: remount + one fire (still no location.reload).
  if (gen !== spaSwitchGeneration) return false;
  ensureGoogtransPersisted();
  tryRemountTranslateHost();
  await sleep(320);
  const last = comboSelect();
  if (!last) return false;
  dispatchComboChange(last, '');
  await sleep(50);
  writeGoogtransCookie(lang);
  const live = comboSelect() ?? last;
  dispatchComboChange(live, lang);
  window.setTimeout(notifyGtLayout, 120);
  window.setTimeout(notifyGtLayout, 400);
  comboMissStreak = 0;
  return comboSelect()?.value === lang;
}

/**
 * ENN-205 — restore Italian without full page reload.
 * Caller must already expire googtrans cookies + strip `#googtrans` hash.
 * Cancels any in-flight non-IT SPA switch, blanks the combo (original),
 * remounts TranslateElement, and notifies layout listeners.
 */
export async function applyGoogleTranslateSpaRestore(): Promise<boolean> {
  if (typeof window === 'undefined' || !GT_ENABLED) return false;

  const gen = ++spaSwitchGeneration;
  if (reapplyTimer !== undefined) {
    clearTimeout(reapplyTimer);
    reapplyTimer = undefined;
  }
  comboMissStreak = 0;
  reapplyLockUntil = Date.now() + 1200;

  document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
  document.body?.style.removeProperty('top');
  applyGtDocumentChrome(GT_PAGE_LANG);

  // Prefer blanking the live combo before remount so GT unwraps `<font>`.
  const combo = comboSelect();
  if (combo) {
    dispatchComboChange(combo, '');
    await sleep(80);
    if (gen !== spaSwitchGeneration) return false;
  }

  tryRemountTranslateHost();
  await sleep(280);
  if (gen !== spaSwitchGeneration) return false;

  // Post-remount: blank again if gadget rebuilt with a stale selection.
  const after = comboSelect();
  if (after && after.value && after.value !== GT_PAGE_LANG) {
    dispatchComboChange(after, '');
    await sleep(60);
  }

  // Drop residual banner / tooltip chrome left from the prior target.
  document
    .querySelectorAll(
      'iframe.goog-te-banner-frame, #goog-gt-tt, .goog-te-spinner-pos'
    )
    .forEach((el) => el.remove());

  document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
  document.body?.style.removeProperty('top');
  applyGtDocumentChrome(GT_PAGE_LANG);
  notifyGtLayout();
  window.setTimeout(notifyGtLayout, 200);
  comboMissStreak = 0;
  return true;
}

/** Debounced refresh — route / auth / DOM landmarks. */
export function requestGoogleTranslateRefresh(delayMs = 120): void {
  if (typeof window === 'undefined' || !GT_ENABLED) return;
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
  if (typeof window === 'undefined' || !GT_ENABLED) return () => undefined;
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
