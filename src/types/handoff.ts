export type ScreenId =
  | 'home'
  | 'consulti'
  | 'corsi'
  | 'area-riservata'
  | 'booking'
  | 'chat';

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
}

export interface CopyEntry {
  cmsKey: string;
  liveText: string;
}

export interface ConsultationTariff {
  id: '45m' | '60m' | '90m';
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
  tariffId: '45m' | '60m' | '90m';
  selectedDateIso: string;
  selectedTimeSlot: string;
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
  supabaseUserId: string;
  metadata: {
    itemType?: 'consultation' | 'course';
    practitioner: string;
    tariffId?: string;
    courseId?: CourseId;
    courseTitle?: string;
    durationMinutes?: number;
    scheduledDate?: string;
    scheduledTime?: string;
    phoneWhatsApp: string;
    deontologyAccepted: boolean;
  };
  successUrlPattern: string;
  cancelUrlPattern: string;
}

export interface SupabaseAuthContract {
  provider: 'supabase_auth';
  strategy: 'magic_link_or_otp';
  tables: string[];
  rlsPolicyNote: string;
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
