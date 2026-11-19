/**
 * SPA scroll helpers for mobile-first deep links.
 * Sticky header is ~4.75rem (+ safe-area); section targets must clear it.
 */

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
  /** Public Maggiori teaser — nested under Modulo 01 (ENN-128) */
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

export function normalizeHash(hash: string): string {
  return hash.replace(/^#/, '').trim().toLowerCase();
}

/** Map `#corsi` / `#dialogo` / `#didattica` → screen (or null if unknown). */
export function screenFromHash(hash: string): 'corsi' | 'chat' | 'home' | null {
  const key = normalizeHash(hash);
  if (!key) return null;
  return HASH_SCREEN_ALIASES[key] ?? null;
}

/** Section id to scroll to for a hash, once the right screen is mounted. */
export function sectionIdFromHash(hash: string): string | null {
  const key = normalizeHash(hash);
  if (!key) return null;
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

export function scrollToElement(
  el: Element | null,
  options?: { behavior?: ScrollBehavior; extraOffset?: number }
): boolean {
  if (!el) return false;
  const behavior = options?.behavior ?? 'smooth';
  const offset =
    getStickyHeaderOffsetPx() + Math.max(0, options?.extraOffset ?? 0);
  const top =
    el.getBoundingClientRect().top + window.scrollY - offset;
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
 * Run after the next paints so SPA remount + sticky header + mobile menu
 * body-unlock have settled. Retries once more on a macrotask for races.
 */
export function afterNextPaint(fn: () => void): () => void {
  let cancelled = false;
  let raf1 = 0;
  let raf2 = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(() => {
      if (cancelled) return;
      fn();
      timer = setTimeout(() => {
        if (!cancelled) fn();
      }, 50);
    });
  });

  return () => {
    cancelled = true;
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
    if (timer !== undefined) clearTimeout(timer);
  };
}

/** Scroll to top after paint — default landing for SPA route changes. */
export function scrollToTopAfterPaint(
  behavior: ScrollBehavior = 'auto'
): () => void {
  return afterNextPaint(() => scrollWindowTo(0, behavior));
}

/** Scroll to a landmark after paint (hash / product CTAs). */
export function scrollToIdAfterPaint(
  id: string,
  options?: { behavior?: ScrollBehavior; extraOffset?: number }
): () => void {
  return afterNextPaint(() => {
    if (!scrollToId(id, { behavior: options?.behavior ?? 'auto', ...options })) {
      scrollWindowTo(0, 'auto');
    }
  });
}
