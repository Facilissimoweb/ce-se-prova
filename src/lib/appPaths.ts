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
  privacy: '/privacy',
  termini: '/termini-di-servizio',
  disclaimer: '/disclaimer',
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
  '/privacy': 'privacy',
  '/termini-di-servizio': 'termini',
  '/termini': 'termini',
  '/disclaimer': 'disclaimer',
};

export function pathForScreen(screen: ScreenId): string {
  return SCREEN_PATHS[screen];
}

export function screenFromPath(pathname: string): ScreenId {
  const normalized = (pathname.replace(/\/+$/, '') || '/').toLowerCase();
  return PATH_ALIASES[normalized] ?? 'home';
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
  return screenFromPath(pathname);
}

export function navigatePath(screen: ScreenId, search = ''): void {
  const path = pathForScreen(screen);
  const url = search ? `${path}${search.startsWith('?') ? search : `?${search}`}` : path;
  window.history.pushState({}, '', url);
}
