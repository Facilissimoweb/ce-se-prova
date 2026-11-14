/**
 * Server-side payment catalogs. Never trust client-supplied price/duration.
 */

export type BookingTariffId = '45m' | '60m' | '90m';

export const BOOKING_TARIFF_CATALOG: Record<
  BookingTariffId,
  {
    id: BookingTariffId;
    title: string;
    durationMinutes: number;
    priceEur: number;
    stripePriceIdAnnotation: string;
  }
> = {
  '45m': {
    id: '45m',
    title: 'Consulto Essenziale',
    durationMinutes: 45,
    priceEur: 60,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_45M',
  },
  '60m': {
    id: '60m',
    title: 'Consulto Evolutivo Completo',
    durationMinutes: 60,
    priceEur: 85,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_60M',
  },
  '90m': {
    id: '90m',
    title: 'Sessione Integrata & Ciclo',
    durationMinutes: 90,
    priceEur: 120,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_90M',
  },
};

export function resolveBookingTariff(tariffId: string) {
  if (tariffId !== '45m' && tariffId !== '60m' && tariffId !== '90m') {
    return null;
  }
  return BOOKING_TARIFF_CATALOG[tariffId];
}

/** Env annotation keys for course Stripe Price IDs (matched to seed slugs). */
export const COURSE_STRIPE_PRICE_ENV: Record<string, string> = {
  'arcani-maggiori': 'STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI',
  'arcani-minori': 'STRIPE_PRICE_ID_CORSO_ARCANI_MINORI',
  'metodi-stesura': 'STRIPE_PRICE_ID_CORSO_METODI_STESURA',
};

export function courseStripePriceAnnotation(slug: string): string {
  return COURSE_STRIPE_PRICE_ENV[slug] || `STRIPE_PRICE_ID_CORSO_${slug}`;
}
