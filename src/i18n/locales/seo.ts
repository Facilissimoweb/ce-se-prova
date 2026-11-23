import type { ScreenId } from '../../types/handoff';
import type { SiteLang } from '../types';

type PageSeoStrings = { title: string; description: string };

/**
 * Non-IT SEO overlays (ENN-136). Launch is Italian-only (ENN-185 GT freeze);
 * keep strings accurate anyway so re-enabling Traduci does not revive Minori
 * catalogue claims or WhatsApp-only booking / paused Stripe copy.
 */
const en: Partial<Record<ScreenId, PageSeoStrings>> = {
  home: {
    title: 'Tarot Italia — Maria Teresa Rogani · Holistic Practitioner',
    description:
      'Tarot Italia by Maria Teresa Rogani, holistic practitioner. Symbolic, evolutive and predictive Tarot counselling to read present and future in respect of the code of ethics.',
  },
  'chi-sono': {
    title: 'About — Tarot Italia · Maria Teresa Rogani',
    description:
      'Training and path of Maria Teresa Rogani, Holistic Practitioner: symbolic and evolutive Tarot method, ethics and listening.',
  },
  consulti: {
    title: 'Readings — Tarot Italia · €22 / €49 / €79 / €99',
    description:
      'Readings with Maria Teresa Rogani (VAT included): Short 20′ €22 (online only), Essential 45′ €49, Evolutive 60′ €79, Integrated 90′ €99. Major and Minor Arcana in every session. Book with Stripe on site; live reading on WhatsApp voice.',
  },
  corsi: {
    title: 'Courses — Tarot Italia · Major Arcana',
    description:
      'Tarot Italia training · Major Arcana €69 (list €149 struck): materials, visual cards, Sigillo and Nina Studio. Minor Arcana and Spread Methods are not on public sale.',
  },
  booking: {
    title: 'Book a Reading — Tarot Italia',
    description:
      'Choose duration (€22 / €49 / €79 / €99 VAT included), day and time; pay with Stripe Checkout on the site. Live reading on WhatsApp voice, or in person in Macerata (Via Crispi 37; from 19:00 online only).',
  },
  chat: {
    title: 'Tarot Dialogue — Tarot Italia',
    description:
      'Interactive space with the 22 Major Arcana for guided reflection. Does not replace a reading with Maria Teresa Rogani.',
  },
  news: {
    title: 'Blog / News — Tarot Italia',
    description:
      'Articles and reflections from Tarot Italia: tarotology, symbols and evolutive path, published on the site.',
  },
  contatti: {
    title: 'Contact — Tarot Italia · Macerata',
    description:
      'Contact Maria Teresa Rogani: email info@tarotitalia.com, phone/WhatsApp 379 103 82 53, studio Via Crispi 37, 62100 Macerata. VAT 02136780430.',
  },
  sitemap: {
    title: 'Sitemap — Tarot Italia',
    description:
      'Index of public Tarot Italia pages (Home, About, Readings, Dialogue, Courses, Blog, Contact).',
  },
  'not-found': {
    title: 'Page not found — Tarot Italia',
    description: 'The requested path does not exist on Tarot Italia.',
  },
};

const es: Partial<Record<ScreenId, PageSeoStrings>> = {
  home: {
    title: 'Tarot Italia — Maria Teresa Rogani · Operadora Holística',
    description:
      'Tarot Italia de Maria Teresa Rogani, operadora holística. Consultas simbólicas, evolutivas y previsionales de Tarot para leer presente y futuro respetando el código deontológico.',
  },
  consulti: {
    title: 'Consultas — Tarot Italia · €22 / €49 / €79 / €99',
    description:
      'Consultas con Maria Teresa Rogani (IVA incluida): Breve 20′ €22 (solo en línea), Esencial 45′ €49, Evolutiva 60′ €79, Integrada 90′ €99. Arcanos Mayores y Menores en cada sesión. Reserva con Stripe en el sitio; lectura en voz por WhatsApp.',
  },
  corsi: {
    title: 'Cursos — Tarot Italia · Arcanos Mayores',
    description:
      'Formación Tarot Italia · Arcanos Mayores €69 (lista €149 tachada): materiales, fichas, Sigillo y Nina Studio. Menores y Métodos no están a la venta pública.',
  },
  booking: {
    title: 'Reservar consulta — Tarot Italia',
    description:
      'Elige duración (€22 / €49 / €79 / €99 IVA incluida), día y hora; paga con Stripe Checkout en el sitio. Lectura en voz por WhatsApp o en persona en Macerata (Via Crispi 37; desde las 19:00 solo en línea).',
  },
};

const fr: Partial<Record<ScreenId, PageSeoStrings>> = {
  home: {
    title: 'Tarot Italia — Maria Teresa Rogani · Opératrice holistique',
    description:
      'Tarot Italia de Maria Teresa Rogani, opératrice holistique. Consultations symboliques, évolutives et prévisionnelles du Tarot pour lire présent et futur dans le respect du code déontologique.',
  },
  consulti: {
    title: 'Consultations — Tarot Italia · €22 / €49 / €79 / €99',
    description:
      'Consultations avec Maria Teresa Rogani (TVA incluse) : Brève 20′ €22 (uniquement en ligne), Essentielle 45′ €49, Évolutive 60′ €79, Intégrée 90′ €99. Arcanes Majeurs et Mineurs à chaque séance. Réservation Stripe sur le site ; lecture en voix WhatsApp.',
  },
  corsi: {
    title: 'Cours — Tarot Italia · Arcanes Majeurs',
    description:
      'Parcours Tarot Italia · Arcanes Majeurs €69 (liste €149 barré) : supports, fiches, Sigillo et Nina Studio. Mineurs et Méthodes ne sont pas en vente publique.',
  },
  booking: {
    title: 'Réserver une consultation — Tarot Italia',
    description:
      'Choisissez durée (€22 / €49 / €79 / €99 TVA incluse), jour et horaire ; payez avec Stripe Checkout sur le site. Lecture en voix WhatsApp ou en personne à Macerata (Via Crispi 37 ; à partir de 19:00 uniquement en ligne).',
  },
};

const de: Partial<Record<ScreenId, PageSeoStrings>> = {
  home: {
    title: 'Tarot Italia — Maria Teresa Rogani · Holistische Praktikerin',
    description:
      'Tarot Italia von Maria Teresa Rogani, holistische Praktikerin. Symbolische, evolutive und vorausschauende Tarot-Beratung, um Gegenwart und Zukunft unter Achtung des berufsethischen Kodex zu lesen.',
  },
  consulti: {
    title: 'Beratungen — Tarot Italia · €22 / €49 / €79 / €99',
    description:
      'Beratungen mit Maria Teresa Rogani (inkl. MwSt.): Kurz 20′ €22 (nur online), Essenziell 45′ €49, Evolutiv 60′ €79, Integriert 90′ €99. Große und Kleine Arkana in jeder Sitzung. Buchung per Stripe auf der Website; Live-Reading per WhatsApp-Sprachanruf.',
  },
  corsi: {
    title: 'Kurse — Tarot Italia · Große Arkana',
    description:
      'Ausbildung Tarot Italia · Große Arkana €69 (Listenpreis €149 durchgestrichen): Materialien, Karten, Sigillo und Nina Studio. Kleine Arkana und Legemethoden sind nicht öffentlich im Verkauf.',
  },
  booking: {
    title: 'Beratung buchen — Tarot Italia',
    description:
      'Wählen Sie Dauer (€22 / €49 / €79 / €99 inkl. MwSt.), Tag und Uhrzeit; zahlen Sie per Stripe Checkout auf der Website. Live-Reading per WhatsApp-Sprachanruf oder vor Ort in Macerata (Via Crispi 37; ab 19:00 nur online).',
  },
};

export const seoTranslations: Record<
  SiteLang,
  Partial<Record<ScreenId, PageSeoStrings>>
> = {
  it: {},
  en,
  es,
  fr,
  de,
};
