import type { SiteLang } from '../types';

/**
 * Structured extract of the 22 Major Arcana display names.
 * Full Dialogo didactic bodies stay IT-first (ENN-136 Phase 1);
 * EN+ES+FR+DE cover marketing/chrome names for commerce surfaces.
 */
export type MaggioriNameEntry = {
  id: string;
  numeral: string;
  name: string;
};

const IT: MaggioriNameEntry[] = [
  { id: '0-il-matto', numeral: '0', name: 'Il Matto' },
  { id: '1-il-bagatto', numeral: 'I', name: 'Il Bagatto' },
  { id: '2-la-papessa', numeral: 'II', name: 'La Papessa' },
  { id: '3-limperatrice', numeral: 'III', name: "L'Imperatrice" },
  { id: '4-limperatore', numeral: 'IV', name: "L'Imperatore" },
  { id: '5-il-papa', numeral: 'V', name: 'Il Papa' },
  { id: '6-gli-amanti', numeral: 'VI', name: 'Gli Amanti' },
  { id: '7-il-carro', numeral: 'VII', name: 'Il Carro' },
  { id: '8-la-giustizia', numeral: 'VIII', name: 'La Giustizia' },
  { id: '9-leremita', numeral: 'IX', name: "L'Eremita" },
  { id: '10-la-ruota', numeral: 'X', name: 'La Ruota' },
  { id: '11-la-forza', numeral: 'XI', name: 'La Forza' },
  { id: '12-lappeso', numeral: 'XII', name: "L'Appeso" },
  { id: '13-la-morte', numeral: 'XIII', name: 'La Morte' },
  { id: '14-la-temperanza', numeral: 'XIV', name: 'La Temperanza' },
  { id: '15-il-diavolo', numeral: 'XV', name: 'Il Diavolo' },
  { id: '16-la-torre', numeral: 'XVI', name: 'La Torre' },
  { id: '17-le-stelle', numeral: 'XVII', name: 'Le Stelle' },
  { id: '18-la-luna', numeral: 'XVIII', name: 'La Luna' },
  { id: '19-il-sole', numeral: 'XIX', name: 'Il Sole' },
  { id: '20-il-giudizio', numeral: 'XX', name: 'Il Giudizio' },
  { id: '21-il-mondo', numeral: 'XXI', name: 'Il Mondo' },
];

const EN_NAMES: Record<string, string> = {
  '0-il-matto': 'The Fool',
  '1-il-bagatto': 'The Magician',
  '2-la-papessa': 'The High Priestess',
  '3-limperatrice': 'The Empress',
  '4-limperatore': 'The Emperor',
  '5-il-papa': 'The Hierophant',
  '6-gli-amanti': 'The Lovers',
  '7-il-carro': 'The Chariot',
  '8-la-giustizia': 'Justice',
  '9-leremita': 'The Hermit',
  '10-la-ruota': 'Wheel of Fortune',
  '11-la-forza': 'Strength',
  '12-lappeso': 'The Hanged Man',
  '13-la-morte': 'Death',
  '14-la-temperanza': 'Temperance',
  '15-il-diavolo': 'The Devil',
  '16-la-torre': 'The Tower',
  '17-le-stelle': 'The Star',
  '18-la-luna': 'The Moon',
  '19-il-sole': 'The Sun',
  '20-il-giudizio': 'Judgement',
  '21-il-mondo': 'The World',
};

const ES_NAMES: Record<string, string> = {
  '0-il-matto': 'El Loco',
  '1-il-bagatto': 'El Mago',
  '2-la-papessa': 'La Sacerdotisa',
  '3-limperatrice': 'La Emperatriz',
  '4-limperatore': 'El Emperador',
  '5-il-papa': 'El Hierofante',
  '6-gli-amanti': 'Los Enamorados',
  '7-il-carro': 'El Carro',
  '8-la-giustizia': 'La Justicia',
  '9-leremita': 'El Ermitaño',
  '10-la-ruota': 'La Rueda de la Fortuna',
  '11-la-forza': 'La Fuerza',
  '12-lappeso': 'El Colgado',
  '13-la-morte': 'La Muerte',
  '14-la-temperanza': 'La Templanza',
  '15-il-diavolo': 'El Diablo',
  '16-la-torre': 'La Torre',
  '17-le-stelle': 'La Estrella',
  '18-la-luna': 'La Luna',
  '19-il-sole': 'El Sol',
  '20-il-giudizio': 'El Juicio',
  '21-il-mondo': 'El Mundo',
};

const FR_NAMES: Record<string, string> = {
  '0-il-matto': 'Le Mat',
  '1-il-bagatto': 'Le Bateleur',
  '2-la-papessa': 'La Papesse',
  '3-limperatrice': "L'Impératrice",
  '4-limperatore': "L'Empereur",
  '5-il-papa': 'Le Pape',
  '6-gli-amanti': 'Les Amoureux',
  '7-il-carro': 'Le Chariot',
  '8-la-giustizia': 'La Justice',
  '9-leremita': "L'Ermite",
  '10-la-ruota': 'La Roue de Fortune',
  '11-la-forza': 'La Force',
  '12-lappeso': 'Le Pendu',
  '13-la-morte': 'La Mort',
  '14-la-temperanza': 'Tempérance',
  '15-il-diavolo': 'Le Diable',
  '16-la-torre': 'La Maison Dieu',
  '17-le-stelle': "L'Étoile",
  '18-la-luna': 'La Lune',
  '19-il-sole': 'Le Soleil',
  '20-il-giudizio': 'Le Jugement',
  '21-il-mondo': 'Le Monde',
};

const DE_NAMES: Record<string, string> = {
  '0-il-matto': 'Der Narr',
  '1-il-bagatto': 'Der Magier',
  '2-la-papessa': 'Die Hohepriesterin',
  '3-limperatrice': 'Die Herrscherin',
  '4-limperatore': 'Der Herrscher',
  '5-il-papa': 'Der Hierophant',
  '6-gli-amanti': 'Die Liebenden',
  '7-il-carro': 'Der Wagen',
  '8-la-giustizia': 'Die Gerechtigkeit',
  '9-leremita': 'Der Eremit',
  '10-la-ruota': 'Das Rad des Schicksals',
  '11-la-forza': 'Die Kraft',
  '12-lappeso': 'Der Gehängte',
  '13-la-morte': 'Der Tod',
  '14-la-temperanza': 'Die Mäßigkeit',
  '15-il-diavolo': 'Der Teufel',
  '16-la-torre': 'Der Turm',
  '17-le-stelle': 'Der Stern',
  '18-la-luna': 'Der Mond',
  '19-il-sole': 'Die Sonne',
  '20-il-giudizio': 'Das Gericht',
  '21-il-mondo': 'Die Welt',
};

function mapNames(names: Record<string, string>): MaggioriNameEntry[] {
  return IT.map((card) => ({
    ...card,
    name: names[card.id] ?? card.name,
  }));
}

export const maggioriNamesByLang: Record<SiteLang, MaggioriNameEntry[]> = {
  it: IT,
  en: mapNames(EN_NAMES),
  es: mapNames(ES_NAMES),
  fr: mapNames(FR_NAMES),
  de: mapNames(DE_NAMES),
};

export function maggioriNameFor(
  lang: SiteLang,
  cardId: string,
  fallback: string
): string {
  const entry = maggioriNamesByLang[lang]?.find((c) => c.id === cardId);
  return entry?.name ?? fallback;
}
