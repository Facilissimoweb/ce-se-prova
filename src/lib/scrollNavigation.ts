/**
 * SPA scroll helpers for mobile-first deep links.
 * Sticky header is ~4.75rem (+ safe-area); section targets must clear it.
 *
 * ENN-149 — settle retries + GT layout events so A→B landings stay correct
 * when Google Translate rewrites the DOM after the first paint.
 */

import {
  GT_LAYOUT_EVENT,
  GT_PAGE_LANG,
  isGoogtransHash,
  readGoogTransLang,
} from './googleTranslateRuntime';

export const SITE_HEADER_OFFSET_PX = 76; // 4.75rem — matches NavigationChrome mobile header
export const SITE_HEADER_OFFSET_MD_PX = 80; // 5rem desktop

/** Landmark ids used by hash deep-links and in-page CTAs. */
export const SCROLL_LANDMARKS = {
  corsi: 'corsi',
  dialogo: 'dialogo',
  homeConsulti: 'home-consulti',
  homeDidattica: 'home-didattica',
  corsiWorkbench: 'corsi-workbench',
  corsiCheckout: 'corsi-checkout',
  /** Public Maggiori anteprima — account-parity Dispensa 01 (ENN-129) */
  corsiMaggioriPreview: 'corsi-maggiori-preview',
  /** Area Riservata — course strip / dispense list / active dispensa reader */
  reservedPercorsi: 'reserved-percorsi',
  reservedDispenseList: 'reserved-dispense-list',
  reservedDispensaContent: 'reserved-dispensa-content',
} as const;

export type ScrollLandmarkId =
  (typeof SCROLL_LANDMARKS)[keyof typeof SCROLL_LANDMARKS];

const HASH_SCREEN_ALIASES: Record<string, 'corsi' | 'chat' | 'home'> = {
  corsi: 'corsi',
  corso: 'corsi',
  dialogo: 'chat',
  chat: 'chat',
  consulti: 'home',
  didattica: 'home',
  'home-consulti': 'home',
  'home-didattica': 'home',
  /** ENN-126/128 — public Maggiori · Modulo 01 anteprima */
  'maggiori-preview': 'corsi',
  'matto-preview': 'corsi',
};

const HASH_SECTION_ALIASES: Record<string, string> = {
  consulti: SCROLL_LANDMARKS.homeConsulti,
  didattica: SCROLL_LANDMARKS.homeDidattica,
  'home-consulti': SCROLL_LANDMARKS.homeConsulti,
  'home-didattica': SCROLL_LANDMARKS.homeDidattica,
  workbench: SCROLL_LANDMARKS.corsiWorkbench,
  checkout: SCROLL_LANDMARKS.corsiCheckout,
  'maggiori-preview': SCROLL_LANDMARKS.corsiMaggioriPreview,
  'matto-preview': SCROLL_LANDMARKS.corsiMaggioriPreview,
  corsi: SCROLL_LANDMARKS.corsi,
  dialogo: SCROLL_LANDMARKS.dialogo,
};

/** How close (px) the landmark top must sit under the sticky header. */
export const LANDING_TOLERANCE_PX = 14;

const SETTLE_DELAYS_MS = [0, 50, 160, 360] as const;
/** Extra beats while GT is rewriting text / wrapping fonts (ENN-149). */
const SETTLE_DELAYS_GT_MS = [0, 50, 120, 280, 520, 900, 1400] as const;

export function normalizeHash(hash: string): string {
  return hash.replace(/^#/, '').trim().toLowerCase();
}

/** Map `#corsi` / `#dialogo` / `#didattica` → screen (or null if unknown). */
export function screenFromHash(hash: string): 'corsi' | 'chat' | 'home' | null {
  const key = normalizeHash(hash);
  if (!key || isGoogtransHash(key)) return null;
  return HASH_SCREEN_ALIASES[key] ?? null;
}

/** Section id to scroll to for a hash, once the right screen is mounted. */
export function sectionIdFromHash(hash: string): string | null {
  const key = normalizeHash(hash);
  if (!key || isGoogtransHash(key)) return null;
  return HASH_SECTION_ALIASES[key] ?? null;
}

export function getStickyHeaderOffsetPx(): number {
  if (typeof window === 'undefined') return SITE_HEADER_OFFSET_PX;
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (header) {
    const h = header.getBoundingClientRect().height;
    if (h > 0) return Math.ceil(h);
  }
  return window.matchMedia('(min-width: 768px)').matches
    ? SITE_HEADER_OFFSET_MD_PX
    : SITE_HEADER_OFFSET_PX;
}

/**
 * Current page scroll, including when the mobile drawer locks the body with
 * `position: fixed; top: -<y>px` (window.scrollY is 0 in that state).
 */
export function captureScrollY(): number {
  if (typeof window === 'undefined') return 0;
  const { position, top } = document.body.style;
  if (position === 'fixed' && top) {
    const locked = Math.abs(Number.parseInt(top, 10));
    if (Number.isFinite(locked)) return locked;
  }
  return window.scrollY || window.pageYOffset || 0;
}

function gtBrowsingActive(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return readGoogTransLang() !== GT_PAGE_LANG;
  } catch {
    return false;
  }
}

/** Signed error: landmark top minus sticky header (+ extra). 0 = perfect landing. */
export function landingErrorPx(
  el: Element,
  extraOffset = 0
): number {
  const offset =
    getStickyHeaderOffsetPx() + Math.max(0, extraOffset);
  return el.getBoundingClientRect().top - offset;
}

export function isLandingSettled(
  el: Element,
  extraOffset = 0,
  tolerance = LANDING_TOLERANCE_PX
): boolean {
  return Math.abs(landingErrorPx(el, extraOffset)) <= tolerance;
}

/** Disable CSS `scroll-behavior: smooth` for one programmatic jump. */
function withInstantScroll(run: () => void): void {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  try {
    run();
  } finally {
    // Restore on next frame so the jump isn't smoothed by the stylesheet rule.
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previous;
    });
  }
}

export function scrollWindowTo(
  top: number,
  behavior: ScrollBehavior = 'auto'
): void {
  const y = Math.max(0, top);
  if (behavior === 'smooth') {
    window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
    return;
  }
  withInstantScroll(() => {
    window.scrollTo({ top: y, left: 0, behavior: 'auto' });
  });
}

/**
 * Reset window + documentElement + body + overflow ancestors.
 * Some mobile browsers scroll `documentElement`/`body` independently of
 * `window.scrollTo`, and wizard UIs may sit under nested scrollports.
 */
export function scrollAllPortsToTop(from?: Element | null): void {
  if (typeof window === 'undefined') return;
  withInstantScroll(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    let el: Element | null = from ?? document.body;
    while (el instanceof HTMLElement) {
      if (el.scrollTop) el.scrollTop = 0;
      el = el.parentElement;
    }
  });
}

/**
 * ENN-196 — land a wizard step at the top under the sticky header.
 *
 * Why a dedicated helper: tapping persistent step-pill buttons keeps focus on
 * the pill. Mobile browsers then re-scroll to keep the focused control in view,
 * undoing a plain `window.scrollTo(0,0)` after paint. We blur first, reset every
 * scrollport, `scrollIntoView({ block: 'start' })` the step heading, then correct
 * for the sticky header — immediately and again after double-rAF + settle retries.
 */
export function scrollStepToTopAfterPaint(
  landmark: Element | null | (() => Element | null),
  options?: { from?: Element | null; behavior?: ScrollBehavior }
): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const behavior = options?.behavior ?? 'auto';
  const from = options?.from ?? null;

  const run = () => {
    const active = document.activeElement;
    if (
      active instanceof HTMLElement &&
      active !== document.body &&
      active !== document.documentElement
    ) {
      active.blur();
    }

    scrollAllPortsToTop(from);

    const el = typeof landmark === 'function' ? landmark() : landmark;
    if (!el) {
      scrollWindowTo(0, behavior);
      return;
    }

    try {
      el.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'auto' });
    } catch {
      // Older WebKit without options object — sticky correction below still runs.
    }
    // Sticky header offset (scrollIntoView alone leaves the title under the bar).
    scrollToElement(el, { behavior, extraOffset: 0 });
  };

  run();
  return afterLayoutSettle(run);
}

export function scrollToElement(
  el: Element | null,
  options?: { behavior?: ScrollBehavior; extraOffset?: number }
): boolean {
  if (!el) return false;
  const behavior = options?.behavior ?? 'smooth';
  const offset =
    getStickyHeaderOffsetPx() + Math.max(0, options?.extraOffset ?? 0);
  // captureScrollY — not window.scrollY — so body-fixed drawer unlock is correct.
  const top =
    el.getBoundingClientRect().top + captureScrollY() - offset;
  scrollWindowTo(top, behavior);
  return true;
}

export function scrollToId(
  id: string,
  options?: { behavior?: ScrollBehavior; extraOffset?: number }
): boolean {
  if (typeof document === 'undefined' || !id) return false;
  return scrollToElement(document.getElementById(id), options);
}

/**
 * Run `fn` after paint, then on settle delay beats (longer when GT is active).
 */
export function afterNextPaint(fn: () => void): () => void {
  return afterLayoutSettle(fn);
}

/**
 * Multi-beat settle scheduler. GT-aware by default so Translate DOM mutations
 * get corrective passes (ENN-149).
 */
export function afterLayoutSettle(
  fn: () => void,
  options?: { gtAware?: boolean }
): () => void {
  let cancelled = false;
  let raf1 = 0;
  let raf2 = 0;
  const timers: ReturnType<typeof setTimeout>[] = [];
  const gtAware = options?.gtAware !== false;
  const delays =
    gtAware && gtBrowsingActive() ? SETTLE_DELAYS_GT_MS : SETTLE_DELAYS_MS;

  const run = () => {
    if (!cancelled) fn();
  };

  raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(() => {
      for (const ms of delays) {
        if (ms === 0) {
          run();
        } else {
          timers.push(setTimeout(run, ms));
        }
      }
    });
  });

  return () => {
    cancelled = true;
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
    for (const t of timers) clearTimeout(t);
  };
}

/** Scroll to top after paint — default landing for SPA route changes. */
export function scrollToTopAfterPaint(
  behavior: ScrollBehavior = 'auto'
): () => void {
  return afterLayoutSettle(() => scrollWindowTo(0, behavior));
}

/**
 * Scroll to a landmark after paint, then correct until settled (or retries
 * exhaust). Also re-corrects when GT fires layout events mid-flight.
 */
export function scrollToIdAfterPaint(
  id: string,
  options?: { behavior?: ScrollBehavior; extraOffset?: number }
): () => void {
  if (typeof window === 'undefined') return () => undefined;

  let cancelled = false;
  let first = true;
  const behavior = options?.behavior ?? 'auto';
  const extraOffset = options?.extraOffset ?? 0;

  const correct = () => {
    if (cancelled) return;
    const el = document.getElementById(id);
    if (!el) {
      if (first) scrollWindowTo(0, 'auto');
      first = false;
      return;
    }
    if (!first && isLandingSettled(el, extraOffset)) return;
    scrollToElement(el, {
      behavior: first ? behavior : 'auto',
      extraOffset,
    });
    first = false;
  };

  const stopSettle = afterLayoutSettle(correct);
  const onGtLayout = () => {
    if (cancelled) return;
    // GT rewrote text — force another correction even if previously settled.
    first = false;
    const el = document.getElementById(id);
    if (!el) return;
    if (isLandingSettled(el, extraOffset)) return;
    scrollToElement(el, { behavior: 'auto', extraOffset });
  };
  window.addEventListener(GT_LAYOUT_EVENT, onGtLayout);

  return () => {
    cancelled = true;
    stopSettle();
    window.removeEventListener(GT_LAYOUT_EVENT, onGtLayout);
  };
}
