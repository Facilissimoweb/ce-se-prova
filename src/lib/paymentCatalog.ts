/**
 * Server-side payment catalogs. Never trust client-supplied price/duration.
 * Booking tariffs derive from the shared `consultationTariffs` canon (ENN-192).
 */

import { consultationTariffs } from '../data/consultationTariffs';

export type BookingTariffId = '20m' | '45m' | '60m' | '90m';

export const BOOKING_TARIFF_CATALOG: Record<
  BookingTariffId,
  {
    id: BookingTariffId;
    title: string;
    durationMinutes: number;
    priceEur: number;
    stripePriceIdAnnotation: string;
    /** Se true, solo chiamata vocale online (niente studio di persona). */
    onlineOnly?: boolean;
  }
> = Object.fromEntries(
  consultationTariffs.map((t) => [
    t.id,
    {
      id: t.id,
      title: t.title,
      durationMinutes: t.durationMinutes,
      priceEur: t.priceEur,
      stripePriceIdAnnotation: t.stripePriceIdAnnotation,
      ...(t.onlineOnly ? { onlineOnly: true } : {}),
    },
  ])
) as Record<
  BookingTariffId,
  {
    id: BookingTariffId;
    title: string;
    durationMinutes: number;
    priceEur: number;
    stripePriceIdAnnotation: string;
    onlineOnly?: boolean;
  }
>;

export function resolveBookingTariff(tariffId: string) {
  if (
    tariffId !== '20m' &&
    tariffId !== '45m' &&
    tariffId !== '60m' &&
    tariffId !== '90m'
  ) {
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
