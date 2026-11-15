export type ScreenId =
  | 'home'
  | 'chi-sono'
  | 'consulti'
  | 'corsi'
  | 'area-riservata'
  | 'booking'
  | 'chat'
  | 'news'
  | 'contatti'
  | 'privacy'
  | 'termini'
  | 'disclaimer'
  | 'sitemap'
  | 'not-found';

export interface DisciplinaryCredential {
  index: string;
  area: 'tarologia' | 'olistico';
  areaLabel: string;
  cmsKeyTitle: string;
  title: string;
  cmsKeyDetails: string;
  details: string;
  periodOrCert: string;
}

export type CourseId = 'arcani-maggiori' | 'arcani-minori' | 'metodi-stesura';

export interface CourseModuleItem {
  number: string;
  title: string;
  duration: string;
  summary: string;
}

export interface EducationalCourse {
  id: CourseId;
  orderLabel: string;
  cmsKeyTitle: string;
  title: string;
  cmsKeySubtitle: string;
  subtitle: string;
  cmsKeyDesc: string;
  description: string;
  priceEur: number;
  stripePriceIdAnnotation: string;
  lessonsCount: number;
  totalHours: string;
  levelLabel: string;
  formatLabel: string;
  includes: string[];
  modules: CourseModuleItem[];
  recommended?: boolean;
}

export interface ReservedDispensaOutline {
  id: number;
  courseId: number;
  moduleNumber: string;
  title: string;
  subtitle: string;
  format: string;
  readingMinutes: number;
  sortOrder: number;
}

export interface ReservedUnlockedDispensa extends ReservedDispensaOutline {
  contentMarkdown: string;
  keyTakeaways: string[];
  completed: boolean;
  personalNotes: string;
}

export interface ReservedCourseItem {
  id: number;
  slug: CourseId;
  title: string;
  subtitle: string;
  description: string;
  priceEur: number;
  stripePriceId: string;
  lessonsCount: number;
  totalHours: string;
  levelLabel: string;
  sortOrder: number;
  isUnlocked: boolean;
  purchasedAt: string | null;
  amountPaidEur: number | null;
  dispenseCount: number;
  dispenseOutline: ReservedDispensaOutline[];
  unlockedDispense: ReservedUnlockedDispensa[];
}

export interface ReservedBookingItem {
  id: number;
  tariffId: string;
  durationMinutes: number;
  priceEur: number;
  scheduledDate: string;
  scheduledTime: string;
  fullName: string;
  email: string;
  phoneWhatsapp: string;
  sessionIntent: string;
  status: string;
  createdAt: string;
}

export interface ReservedDialoguePassItem {
  id: number;
  packId: DialoguePackId;
  durationMinutes: number;
  priceEur: number;
  expiresAt: string;
  createdAt: string;
}

export interface ReservedAreaOverview {
  user: {
    id: number;
    uid: string;
    email: string;
    displayName: string | null;
    phoneWhatsapp: string | null;
  };
  courses: ReservedCourseItem[];
  bookings: ReservedBookingItem[];
  dialoguePasses?: ReservedDialoguePassItem[];
}

export interface CopyEntry {
  cmsKey: string;
  liveText: string;
}

export type ConsultationTariffId = '20m' | '45m' | '60m' | '90m';

export interface ConsultationTariff {
  id: ConsultationTariffId;
  durationMinutes: number;
  priceEur: number;
  stripePriceIdAnnotation: string;
  cmsKeyTitle: string;
  title: string;
  cmsKeyDesc: string;
  description: string;
  cmsKeyFocus: string;
  focusLabel: string;
  includes: string[];
  recommended?: boolean;
}

export type DialoguePackId = '5m' | '10m' | '15m';

export interface DialoguePack {
  id: DialoguePackId;
  title: string;
  durationMinutes: number;
  priceEur: number;
  stripePriceIdAnnotation: string;
  focusLabel: string;
  description: string;
  recommended?: boolean;
}

export type DialogueAccessMode = 'ready' | 'free_trial' | 'paid_pass' | 'expired';

export interface DialogueAccessStatus {
  sessionKey: string;
  mode: DialogueAccessMode;
  remainingSeconds: number;
  freeTrialSecondsTotal: number;
  freeTrialUsed: boolean;
  activePackId: DialoguePackId | null;
  expiresAtIso: string | null;
  interactionsCount: number;
  serverTimeIso: string;
}

export interface HolisticPathway {
  index: string;
  cmsKeyTitle: string;
  title: string;
  cmsKeyDesc: string;
  description: string;
  modality: string;
}

export interface HolisticFaqItem {
  id: string;
  cmsKeyQuestion: string;
  question: string;
  cmsKeyAnswer: string;
  answer: string;
  category: string;
}

export interface ClientTestimonial {
  id: string;
  cmsKeyQuote: string;
  quote: string;
  authorName: string;
  authorRole: string;
  sessionContext: string;
}

export interface CookieConsentPreferences {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  updatedAtIso: string;
}

export interface BookingDraft {
  tariffId: ConsultationTariffId;
  selectedDateIso: string;
  selectedTimeSlot: string;
  mode: 'studio' | 'remote';
  fullName: string;
  email: string;
  phoneWhatsApp: string;
  sessionIntent: string;
  deontologyAccepted: boolean;
}

export interface StripeCheckoutHandoffPayload {
  provider: 'stripe_checkout';
  mode: 'payment';
  priceId: string;
  amountEur: number;
  currency: 'EUR';
  customerEmail: string;
  /** Firebase Auth UID (client session); not a payment proof. */
  firebaseUserId: string;
  metadata: {
    itemType?: 'consultation' | 'course' | 'dialogue_pass';
    practitioner: string;
    tariffId?: string;
    courseId?: CourseId;
    courseTitle?: string;
    packId?: DialoguePackId;
    durationMinutes?: number;
    scheduledDate?: string;
    scheduledTime?: string;
    phoneWhatsApp: string;
    deontologyAccepted: boolean;
  };
  successUrlPattern: string;
  cancelUrlPattern: string;
}

/** Contratto handoff allineato allo stack reale: Firebase Auth + Postgres/Drizzle. */
export interface FirebaseAuthContract {
  provider: 'firebase_auth';
  strategy: 'google_sign_in_id_token';
  tables: string[];
  accessPolicyNote: string;
}

export interface WhatsAppWebhookContract {
  provider: 'whatsapp_cloud_api';
  direction: 'outbound_bridge_and_inbound_webhook';
  webhookEndpoint: string;
  deepLinkTemplate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'practitioner' | 'client';
  authorName: string;
  timestamp: string;
  text: string;
  arcanaRef?: string;
}

export interface ArcanaCard {
  id: string;
  number: number;
  numeral: string;
  name: string;
  archetype: string;
  element: string;
  keywords: string[];
  synthesis: string;
  futureTendency: string;
  advice: string;
  loveReading: string;
  workReading: string;
  maieuticQuestions: string[];
}
