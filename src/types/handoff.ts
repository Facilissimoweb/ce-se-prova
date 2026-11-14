export type ScreenId = 'home' | 'consulti' | 'booking' | 'chat';

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
    practitioner: string;
    tariffId: string;
    durationMinutes: number;
    scheduledDate: string;
    scheduledTime: string;
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
  numeral: string;
  name: string;
  archetype: string;
  element: string;
  keywords: string[];
  synthesis: string;
  maieuticQuestions: string[];
}
