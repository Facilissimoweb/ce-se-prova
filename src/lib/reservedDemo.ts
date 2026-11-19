import { ARCANI_MAGGIORI_DISPENSE } from '../data/courses/arcaniMaggioriDispense';
import type {
  CourseId,
  ReservedAreaOverview,
  ReservedCourseItem,
  ReservedUnlockedDispensa,
} from '../types/handoff';

/** Local-only preview uid for Area Riservata screenshots / agent checks. */
export const RESERVED_DEMO_UID = 'demo-reserved-enn103';

export function isReservedDemoRequested(): boolean {
  if (typeof window === 'undefined') return false;
  if (!import.meta.env.DEV) return false;
  return new URLSearchParams(window.location.search).get('demo_reserved') === '1';
}

type DemoCourseSeed = {
  slug: CourseId;
  title: string;
  subtitle: string;
  description: string;
  priceEur: number;
  lessonsCount: number;
  totalHours: string;
  levelLabel: string;
  sortOrder: number;
  dispense: {
    moduleNumber: string;
    title: string;
    subtitle: string;
    format: string;
    readingMinutes: number;
    keyTakeaways: string[];
    contentMarkdown: string;
  }[];
};

/** Client-safe catalog (no `process.env`) for DEV demo overview. */
const DEMO_COURSE_SEEDS: DemoCourseSeed[] = [
  {
    slug: 'arcani-maggiori',
    title: 'Arcani Maggiori',
    subtitle: 'Primo Step · Tre Settenari da 0 a XXI · Presente e Previsione',
    description:
      'Dispensa formativa completa del Primo Step: mappa dei Tre Settenari, studio dei 22 Trionfi dal Matto al Mondo, schede visive e Sigillo.',
    priceEur: 190,
    lessonsCount: 4,
    totalHours: 'dispense + Sigillo',
    levelLabel: 'Livello Base e Intermedio',
    sortOrder: 1,
    dispense: ARCANI_MAGGIORI_DISPENSE,
  },
  {
    slug: 'arcani-minori',
    title: 'Arcani Minori',
    subtitle: 'I Quattro Semi, Numerologia 1–10 e Carte di Corte',
    description: 'Padroneggia i 56 Arcani Minori per leggere tempi e dinamiche quotidiane.',
    priceEur: 210,
    lessonsCount: 14,
    totalHours: '9h 45m video',
    levelLabel: 'Livello Intermedio',
    sortOrder: 2,
    dispense: [
      {
        moduleNumber: '01',
        title: 'Atlante dei Quattro Semi ed Elementi',
        subtitle: 'Bastoni, Coppe, Spade e Denari',
        format: 'Atlante PDF + Schede Elementali',
        readingMinutes: 20,
        keyTakeaways: ['Riconoscere la prevalenza di un seme.', 'Elemento e stagione.', 'Seme assente.'],
        contentMarkdown:
          '## I Quattro Semi\n\nBastoni, Coppe, Spade e Denari nella trama del quotidiano (demo ENN-103).',
      },
      {
        moduleNumber: '02',
        title: 'Numerologia dall’Asso al Dieci',
        subtitle: 'Gradi di sviluppo',
        format: 'Dispensa Numerologica',
        readingMinutes: 26,
        keyTakeaways: ['Assi e Due', 'Cinque e Sette', 'Nove e Dieci'],
        contentMarkdown: '## Scala Numerica\n\nDemo modulo 02 Arcani Minori.',
      },
      {
        moduleNumber: '03',
        title: 'Carte di Corte',
        subtitle: 'Pagine, Cavalieri, Regine, Re',
        format: 'Schede di Corte',
        readingMinutes: 24,
        keyTakeaways: ['Ruoli', 'Età simbolica', 'Interazione tra corti'],
        contentMarkdown: '## Carte di Corte\n\nDemo modulo 03.',
      },
      {
        moduleNumber: '04',
        title: 'Sintesi operativa Minori',
        subtitle: 'Letture integrate',
        format: 'Laboratorio',
        readingMinutes: 22,
        keyTakeaways: ['Combinazioni', 'Tempistiche', 'Esercizi'],
        contentMarkdown: '## Sintesi\n\nDemo modulo 04 — ultimo del percorso Minori.',
      },
    ],
  },
  {
    slug: 'metodi-stesura',
    title: 'Metodi di Stesura',
    subtitle: 'Geometrie di lettura e sintesi',
    description: 'Metodi di stesura per consulti e studio.',
    priceEur: 170,
    lessonsCount: 10,
    totalHours: '6h video',
    levelLabel: 'Livello Intermedio',
    sortOrder: 3,
    dispense: [
      {
        moduleNumber: '01',
        title: 'Stesa a Tre Carte',
        subtitle: 'Passato · Presente · Futuro',
        format: 'Dispensa + Esercizi',
        readingMinutes: 18,
        keyTakeaways: ['Posizioni', 'Nessi', 'Sintesi'],
        contentMarkdown: '## Stesa a Tre\n\nDemo metodi 01.',
      },
      {
        moduleNumber: '02',
        title: 'Croce Celtica essenziale',
        subtitle: 'Dieci posizioni chiave',
        format: 'Dispensa',
        readingMinutes: 28,
        keyTakeaways: ['Struttura', 'Nodi', 'Chiusura'],
        contentMarkdown: '## Croce Celtica\n\nDemo metodi 02.',
      },
    ],
  },
];

function toUnlockedCourse(course: DemoCourseSeed, courseId: number): ReservedCourseItem {
  const outline = course.dispense.map((d, i) => ({
    id: courseId * 100 + i + 1,
    courseId,
    moduleNumber: d.moduleNumber,
    title: d.title,
    subtitle: d.subtitle,
    format: d.format,
    readingMinutes: d.readingMinutes,
    sortOrder: i + 1,
  }));

  const unlockedDispense: ReservedUnlockedDispensa[] = course.dispense.map((d, i) => ({
    ...outline[i],
    contentMarkdown: d.contentMarkdown,
    keyTakeaways: d.keyTakeaways,
    completed: false,
    personalNotes: '',
  }));

  return {
    id: courseId,
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    priceEur: course.priceEur,
    stripePriceId: `DEMO_${course.slug}`,
    lessonsCount: course.lessonsCount,
    totalHours: course.totalHours,
    levelLabel: course.levelLabel,
    sortOrder: course.sortOrder,
    isUnlocked: true,
    purchasedAt: '2026-01-01T00:00:00.000Z',
    amountPaidEur: course.priceEur,
    dispenseCount: course.dispense.length,
    dispenseOutline: outline,
    unlockedDispense,
  };
}

/** Build a fully unlocked overview from client-safe seeds (no network). */
export function buildReservedDemoOverview(): ReservedAreaOverview {
  return {
    user: {
      id: 0,
      uid: RESERVED_DEMO_UID,
      email: 'demo@tarotitalia.local',
      displayName: 'Demo Corsista',
      phoneWhatsapp: null,
    },
    courses: DEMO_COURSE_SEEDS.map((c, i) => toUnlockedCourse(c, i + 1)),
    bookings: [],
    dialoguePasses: [],
  };
}
