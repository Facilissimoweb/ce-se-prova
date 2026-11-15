/** Contatti pubblici Tarot Italia (allineati a v2 / Maria). */
export const SITE_EMAIL = 'info@tarotitalia.com';
export const SITE_PHONE_DISPLAY = '379 103 82 53';
export const SITE_PHONE_E164 = '393791038253';
export const SITE_PHONE_TEL = '+393791038253';
export const SITE_ADDRESS = 'Via Crispi 37, 62100 Macerata';
export const SITE_ADDRESS_FULL = 'Via Crispi 37, 62100 Macerata, Italia';
export const SITE_PIVA = '02136780430';
export const SITE_WHATSAPP_HREF = `https://wa.me/${SITE_PHONE_E164}`;

/** Query Maps / Business Profile: indirizzo completo (niente “studio” inventato). */
export const SITE_MAPS_QUERY = 'Via Francesco Crispi 37, 62100 Macerata, Italia';
export const SITE_BUSINESS_QUERY = 'Tarot Italia Via Crispi 37 Macerata';

export const SITE_MAPS_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_MAPS_QUERY)}`;
export const SITE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE_MAPS_QUERY)}`;
export const SITE_BUSINESS_PROFILE_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_BUSINESS_QUERY)}`;
export const SITE_PARKING_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`parcheggio near ${SITE_MAPS_QUERY}`)}`;

export type NearbyParking = {
  name: string;
  address: string;
  note: string;
  mapsUrl: string;
};

/** Parcheggi pubblici utili per raggiungere Via Crispi (centro storico / ZTL). */
export const NEARBY_PARKING: NearbyParking[] = [
  {
    name: 'Parcheggio Centro Storico',
    address: 'Via Antonio Mugnoz, 62100 Macerata',
    note: 'Struttura APM · collegamento con ascensore al centro storico',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Parcheggio Centro Storico Via Antonio Mugnoz Macerata'),
  },
  {
    name: 'Parcheggio Garibaldi',
    address: 'Via Augusto Murri, 62100 Macerata',
    note: 'Struttura APM · accessibile da nord, ascensore / scale verso il centro',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Parcheggio Garibaldi Via Murri Macerata'),
  },
  {
    name: 'Parcheggio Centrale',
    address: 'Via Leopoldo Armaroli 1, 62100 Macerata',
    note: 'A pochi minuti a piedi dal centro · utile se arrivi in auto',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Parcheggio Centrale Via Leopoldo Armaroli Macerata'),
  },
];

/**
 * Embed Google Maps senza dipendere da un nuovo key a pagamento:
 * - se `VITE_GOOGLE_MAPS_API_KEY` è presente → Embed API ufficiale (place/search);
 * - altrimenti → iframe legacy `output=embed` (funziona senza key).
 */
export function mapsPlaceEmbedSrc(query: string = SITE_MAPS_QUERY): string {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
  if (key) {
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodeURIComponent(query)}&language=it&zoom=16`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=it&z=16&output=embed`;
}

export function mapsParkingEmbedSrc(
  nearQuery: string = SITE_MAPS_QUERY
): string {
  const parkingQuery = `parcheggio near ${nearQuery}`;
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
  if (key) {
    return `https://www.google.com/maps/embed/v1/search?key=${encodeURIComponent(key)}&q=${encodeURIComponent(parkingQuery)}&language=it&zoom=15`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(parkingQuery)}&hl=it&z=15&output=embed`;
}

export function hasGoogleMapsApiKey(): boolean {
  return Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim());
}

export function whatsappHref(prefill: string): string {
  return `${SITE_WHATSAPP_HREF}?text=${encodeURIComponent(prefill)}`;
}

/**
 * Deep-link Telegram (allineato a v2 `telegramHref`):
 * `VITE_TELEGRAM_URL` se impostato, altrimenti `https://t.me/+${SITE_PHONE_E164}`.
 */
export function telegramHref(): string {
  const fromEnv = import.meta.env.VITE_TELEGRAM_URL?.trim();
  if (fromEnv) return fromEnv;
  return `https://t.me/+${SITE_PHONE_E164}`;
}
