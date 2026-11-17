/**
 * Embedded JSON styles for Maps JavaScript API (no Map ID required).
 * Tuned to Tarot Italia Contatti palette: obsidian / parchment / gold.
 * @see https://developers.google.com/maps/documentation/javascript/style-reference
 */
export type MapStyleRule = {
  featureType?: string;
  elementType?: string;
  stylers: Array<Record<string, string | number | boolean>>;
};

export const TAROT_ITALIA_MAP_STYLES: MapStyleRule[] = [
  { elementType: 'geometry', stylers: [{ color: '#151311' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#12100e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#a39b93' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2a2622' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d4af37' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#1d1b19' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#a39b93' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#1a1f1c' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6e7a6a' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#221f1d' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#12100e' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#c4bbb0' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#3a3428' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1a1714' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e6c65c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1d1b19' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d4af37' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0e1218' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5a6470' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#0e1218' }],
  },
];

/** Approx. Via Francesco Crispi 37, Macerata (OSM street centroid). */
export const SITE_MAP_CENTER = { lat: 43.29855, lng: 13.4519 } as const;
