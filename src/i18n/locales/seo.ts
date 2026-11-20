import type { ScreenId } from '../../types/handoff';
import type { SiteLang } from '../types';

type PageSeoStrings = { title: string; description: string };

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
    title: 'Readings — Tarot Italia · €19 / €50 / €75 / €90',
    description:
      'Readings with Maria Teresa Rogani: Short 20′ €19 (online only), Essential 45′ €50, Evolutive 60′ €75, Integrated 90′ €90. Major and Minor Arcana in every session. WhatsApp booking.',
  },
  corsi: {
    title: 'Courses — Tarot Italia · Didactic Paths',
    description:
      'Tarot Italia training paths: Major Arcana, Minor Arcana and Spread Methods. Catalogue, programme and online enrolment.',
  },
  booking: {
    title: 'Book a Reading — Tarot Italia',
    description:
      'Choose duration, day and time and send the booking on WhatsApp. Online voice-call readings or in person in Macerata (Via Crispi 37).',
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
    title: 'Consultas — Tarot Italia · €19 / €50 / €75 / €90',
    description:
      'Consultas con Maria Teresa Rogani: Breve 20′ €19 (solo en línea), Esencial 45′ €50, Evolutiva 60′ €75, Integrada 90′ €90. Arcanos Mayores y Menores en cada sesión. Reserva por WhatsApp.',
  },
  corsi: {
    title: 'Cursos — Tarot Italia · Recorridos Didácticos',
    description:
      'Recorridos formativos Tarot Italia: Arcanos Mayores, Menores y Métodos de Tirada. Catálogo, programa e inscripción en línea.',
  },
  booking: {
    title: 'Reservar consulta — Tarot Italia',
    description:
      'Elige duración, día y hora y envía la reserva por WhatsApp. Consultas en línea por llamada de voz o en persona en Macerata (Via Crispi 37).',
  },
};

const fr: Partial<Record<ScreenId, PageSeoStrings>> = {
  home: {
    title: 'Tarot Italia — Maria Teresa Rogani · Opératrice holistique',
    description:
      'Tarot Italia de Maria Teresa Rogani, opératrice holistique. Consultations symboliques, évolutives et prévisionnelles du Tarot pour lire présent et futur dans le respect du code déontologique.',
  },
  consulti: {
    title: 'Consultations — Tarot Italia · €19 / €50 / €75 / €90',
    description:
      'Consultations avec Maria Teresa Rogani : Brève 20′ €19 (uniquement en ligne), Essentielle 45′ €50, Évolutive 60′ €75, Intégrée 90′ €90. Arcanes Majeurs et Mineurs à chaque séance. Réservation WhatsApp.',
  },
  corsi: {
    title: 'Cours — Tarot Italia · Parcours didactiques',
    description:
      'Parcours formatifs Tarot Italia : Arcanes Majeurs, Mineurs et Méthodes de Tirage. Catalogue, programme et inscription en ligne.',
  },
  booking: {
    title: 'Réserver une consultation — Tarot Italia',
    description:
      'Choisissez durée, jour et horaire et envoyez la réservation sur WhatsApp. Consultations en ligne en appel vocal ou en personne à Macerata (Via Crispi 37).',
  },
};

const de: Partial<Record<ScreenId, PageSeoStrings>> = {
  home: {
    title: 'Tarot Italia — Maria Teresa Rogani · Holistische Praktikerin',
    description:
      'Tarot Italia von Maria Teresa Rogani, holistische Praktikerin. Symbolische, evolutive und vorausschauende Tarot-Beratung, um Gegenwart und Zukunft unter Achtung des berufsethischen Kodex zu lesen.',
  },
  consulti: {
    title: 'Beratungen — Tarot Italia · €19 / €50 / €75 / €90',
    description:
      'Beratungen mit Maria Teresa Rogani: Kurz 20′ €19 (nur online), Essenziell 45′ €50, Evolutiv 60′ €75, Integriert 90′ €90. Große und Kleine Arkana in jeder Sitzung. Buchung per WhatsApp.',
  },
  corsi: {
    title: 'Kurse — Tarot Italia · Didaktische Wege',
    description:
      'Ausbildungswege Tarot Italia: Große Arkana, Kleine Arkana und Legemethoden. Katalog, Programm und Online-Anmeldung.',
  },
  booking: {
    title: 'Beratung buchen — Tarot Italia',
    description:
      'Wählen Sie Dauer, Tag und Uhrzeit und senden Sie die Buchung per WhatsApp. Online-Sprachanruf oder vor Ort in Macerata (Via Crispi 37).',
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
