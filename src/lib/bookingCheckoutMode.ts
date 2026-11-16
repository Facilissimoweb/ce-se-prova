/**
 * Consulti booking checkout mode.
 *
 * Soft-freeze Stripe for consulti: the booking UI hands off to WhatsApp so Maria
 * can send payment details manually. Stripe create/confirm routes stay in the
 * codebase for when she re-enables checkout.
 */
export const CONSULTATION_STRIPE_ENABLED = false;

export type BookingWhatsAppDraft = {
  tariffTitle: string;
  durationMinutes: number;
  priceEur: number;
  dateLabel: string;
  timeSlot: string;
  modeLabel: string;
  fullName: string;
  email: string;
  phoneWhatsApp: string;
  sessionIntent?: string;
};

/** Prefill message Maria receives when a client taps «Invia prenotazione». */
export function buildBookingWhatsAppMessage(draft: BookingWhatsAppDraft): string {
  const lines = [
    'Buongiorno Maria Teresa,',
    '',
    'nuova richiesta di prenotazione — Tarot Italia:',
    '',
    `• Servizio: ${draft.tariffTitle} (${draft.durationMinutes} min) — € ${draft.priceEur}`,
    `• Data: ${draft.dateLabel}`,
    `• Orario: ${draft.timeSlot}`,
    `• Modalità: ${draft.modeLabel}`,
    `• Nome: ${draft.fullName}`,
    `• Email: ${draft.email}`,
    `• Telefono / WhatsApp: ${draft.phoneWhatsApp}`,
  ];

  const intent = draft.sessionIntent?.trim();
  if (intent) {
    lines.push(`• Tema: ${intent}`);
  }

  lines.push(
    '',
    'Attendo le indicazioni per il pagamento. Grazie.'
  );

  return lines.join('\n');
}
