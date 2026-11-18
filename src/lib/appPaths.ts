import type { ScreenId } from '../types/handoff';

/** Path pubblici allineati a v2tarotitalia dove possibile (`/privacy`, `/termini-di-servizio`, `/disclaimer`). */
export const SCREEN_PATHS: Record<ScreenId, string> = {
  home: '/',
  'chi-sono': '/chi-sono',
  consulti: '/consulti',
  corsi: '/corsi',
  'area-riservata': '/area-riservata',
  booking: '/prenota',
  chat: '/dialogo',
  news: '/news',
  contatti: '/contatti',
  privacy: '/privacy',
  termini: '/termini-di-servizio',
  disclaimer: '/disclaimer',
  sitemap: '/sitemap',
  'not-found': '/404',
};

const PATH_ALIASES: Record<string, ScreenId> = {
  '/': 'home',
  '/home': 'home',
  '/chi-sono': 'chi-sono',
  '/consulti': 'consulti',
  '/corsi': 'corsi',
  '/area-riservata': 'area-riservata',
  '/riservata': 'area-riservata',
  '/prenota': 'booking',
  '/prenotazione': 'booking',
  '/dialogo': 'chat',
  '/chat': 'chat',
  '/news': 'news',
  '/articoli': 'news',
  '/blog': 'news',
  '/contatti': 'contatti',
  '/contatto': 'contatti',
  '/privacy': 'privacy',
  '/termini-di-servizio': 'termini',
  '/termini': 'termini',
  '/disclaimer': 'disclaimer',
  '/sitemap': 'sitemap',
  '/mappa-del-sito': 'sitemap',
  '/404': 'not-found',
};

/**
 * Pagine elencate nella mappa del sito HTML (`/sitemap`).
 * Lo `sitemap.xml` per i crawler (ENN-62) esclude area riservata / auth e 404;
 * vedi `scripts/generate-seo-assets.mjs`.
 */
export const SITEMAP_ENTRIES: {
  screen: Exclude<ScreenId, 'not-found'>;
  path: string;
  label: string;
  description: string;
}[] = [
  {
    screen: 'home',
    path: '/',
    label: 'Home',
    description: 'Panoramica, Arcano del Giorno e percorsi di Tarot Italia',
  },
  {
    screen: 'chi-sono',
    path: '/chi-sono',
    label: 'Chi Sono',
    description: 'Formazione e percorso disciplinare di Maria Teresa Rogani',
  },
  {
    screen: 'consulti',
    path: '/consulti',
    label: 'Consulti',
    description: 'Chiamata vocale online e tariffe',
  },
  {
    screen: 'corsi',
    path: '/corsi',
    label: 'Corsi',
    description: 'Arcani Maggiori, Minori e metodi di stesura',
  },
  {
    screen: 'booking',
    path: '/prenota',
    label: 'Prenota Consulto',
    description: 'Calendario e prenotazione consulto',
  },
  {
    screen: 'chat',
    path: '/dialogo',
    label: 'Dialogo Tarot',
    description: 'Interazione con i 22 Arcani Maggiori',
  },
  {
    screen: 'news',
    path: '/news',
    label: 'News / Articoli',
    description: 'Articoli e riflessioni di Tarot Italia',
  },
  {
    screen: 'contatti',
    path: '/contatti',
    label: 'Contatti',
    description: 'Email, telefono, mappa e parcheggi a Macerata',
  },
  {
    screen: 'area-riservata',
    path: '/area-riservata',
    label: 'Area Riservata',
    description: 'Dispense, appunti e percorsi per corsisti',
  },
  {
    screen: 'privacy',
    path: '/privacy',
    label: 'Informativa Privacy',
    description: 'Trattamento dati e cookie (GDPR)',
  },
  {
    screen: 'termini',
    path: '/termini-di-servizio',
    label: 'Termini e Condizioni',
    description: 'Condizioni di vendita e di servizio',
  },
  {
    screen: 'disclaimer',
    path: '/disclaimer',
    label: 'Disclaimer',
    description: 'Limiti del servizio e responsabilità',
  },
  {
    screen: 'sitemap',
    path: '/sitemap',
    label: 'Mappa del sito',
    description: 'Indice delle pagine pubbliche',
  },
];

export function pathForScreen(screen: ScreenId): string {
  return SCREEN_PATHS[screen];
}

const BLOG_PREFIXES = ['/news', '/blog', '/articoli'] as const;

/** Slug articolo da path tipo `/news/mio-articolo` (alias `/blog`, `/articoli`). */
export function blogSlugFromPath(pathname: string): string | null {
  const normalized = (pathname.replace(/\/+$/, '') || '/').toLowerCase();
  for (const prefix of BLOG_PREFIXES) {
    if (normalized === prefix) return null;
    if (normalized.startsWith(`${prefix}/`)) {
      const rest = normalized.slice(prefix.length + 1);
      if (!rest || rest.includes('/')) return null;
      try {
        return decodeURIComponent(rest);
      } catch {
        return rest;
      }
    }
  }
  return null;
}

export function pathForBlogPost(slug: string): string {
  return `/news/${encodeURIComponent(slug)}`;
}

export function navigateBlogPost(slug: string): void {
  window.history.pushState({}, '', pathForBlogPost(slug));
}

export function screenFromPath(pathname: string): ScreenId {
  const normalized = (pathname.replace(/\/+$/, '') || '/').toLowerCase();
  if (blogSlugFromPath(normalized)) return 'news';
  return PATH_ALIASES[normalized] ?? 'not-found';
}

/**
 * All'avvio: se Stripe ha lasciato i query param sulla root (legacy),
 * indirizza alla destinazione corretta prima del mount dei confirm hook.
 */
export function bootstrapScreenFromLocation(
  pathname: string,
  search: string
): ScreenId {
  const params = new URLSearchParams(search);
  if (
    params.has('course_stripe_session_id') ||
    params.get('item') === 'course' ||
    params.get('course_cancelled') === 'true'
  ) {
    return 'area-riservata';
  }
  if (
    params.has('dialogue_stripe_session_id') ||
    params.get('item') === 'dialogue' ||
    params.get('dialogue_cancelled') === 'true'
  ) {
    return 'chat';
  }
  if (
    params.has('booking_stripe_session_id') ||
    params.get('item') === 'consultation' ||
    params.get('item') === 'booking'
  ) {
    return 'booking';
  }
  return screenFromPath(pathname);
}

export function navigatePath(screen: ScreenId, search = ''): void {
  const path = pathForScreen(screen);
  const url = search ? `${path}${search.startsWith('?') ? search : `?${search}`}` : path;
  window.history.pushState({}, '', url);
}
