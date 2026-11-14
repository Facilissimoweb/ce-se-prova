import { resolveBookingMode, sessionModeLabel } from './bookingRules.ts';
import {
  escapeHtml,
  fillBookingConfirmHtml,
  fillBookingConfirmText,
  formatBookingDateIt,
} from './bookingConfirmTemplates.ts';
import { createGoogleCalendarEvent } from './googleCalendar.ts';
import { isZohoMailConfigured, sendZohoMails } from './zohoMail.ts';
import { BOOKING_TARIFF_CATALOG, type BookingTariffId } from './paymentCatalog.ts';

export type BookingRowLike = {
  id: number;
  tariffId: string;
  durationMinutes: number;
  priceEur: number;
  scheduledDate: string;
  scheduledTime: string;
  fullName: string;
  email: string;
  phoneWhatsapp: string;
  mode?: string | null;
  sessionIntent?: string | null;
};

export async function fulfillConfirmedBooking(
  row: BookingRowLike,
  extras: {
    customerEmail: string | null;
    transactionId: string;
    amountCents?: number | null;
  }
): Promise<{ calendarEventId: string | null }> {
  const mode = resolveBookingMode(
    String(row.mode || 'remote'),
    row.scheduledTime
  );
  const modeLabel = sessionModeLabel(mode, row.scheduledTime);
  const tariff =
    row.tariffId in BOOKING_TARIFF_CATALOG
      ? BOOKING_TARIFF_CATALOG[row.tariffId as BookingTariffId]
      : null;
  const title = tariff?.title || `Consulto ${row.durationMinutes} minuti`;

  try {
    await sendBookingMails(row, {
      ...extras,
      title,
      modeLabel,
    });
  } catch (error) {
    console.error('booking mail', error);
  }

  let calendarEventId: string | null = null;
  try {
    calendarEventId = await createGoogleCalendarEvent({
      id: row.id,
      title,
      day: row.scheduledDate,
      slot: row.scheduledTime,
      minutes: row.durationMinutes,
      modeLabel,
      guestName: row.fullName,
      phone: row.phoneWhatsapp,
      customerEmail: extras.customerEmail || row.email,
    });
  } catch (error) {
    console.error('booking calendar', error);
  }

  return { calendarEventId };
}

async function sendBookingMails(
  row: BookingRowLike,
  extras: {
    customerEmail: string | null;
    transactionId: string;
    amountCents?: number | null;
    title: string;
    modeLabel: string;
  }
) {
  if (!isZohoMailConfigured()) {
    console.error('Missing ZOHO secrets — booking mail skipped');
    return;
  }

  const site = (
    process.env.APP_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    'https://www.tarotitalia.com'
  ).replace(/\/$/, '');
  const supportEmail =
    process.env.ZOHO_FROM_EMAIL?.trim() ||
    process.env.ZOHO_EMAIL?.trim() ||
    'info@tarotitalia.com';
  const studioTo =
    process.env.ZOHO_STUDIO_EMAIL?.trim() || supportEmail;
  const whatsappUrl =
    process.env.WHATSAPP_ASSIST_URL?.trim() ||
    'https://wa.me/393791038253';

  const euros =
    extras.amountCents != null && extras.amountCents >= 0
      ? extras.amountCents / 100
      : row.priceEur;
  const amount = Number.isFinite(euros)
    ? euros.toLocaleString('it-IT', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    : String(row.priceEur);

  const vars = {
    user_name: row.fullName.trim() || 'Gentile',
    user_email: extras.customerEmail || row.email,
    session_title: extras.title,
    session_mode: extras.modeLabel,
    booking_date: formatBookingDateIt(row.scheduledDate),
    booking_time: row.scheduledTime,
    booking_id: String(row.id),
    transaction_id: extras.transactionId || '—',
    amount,
    phone: row.phoneWhatsapp,
    riservata_url: `${site}/area-riservata`,
    whatsapp_url: whatsappUrl,
    support_email: supportEmail,
  };

  const htmlVars = {
    ...vars,
    user_name: escapeHtml(vars.user_name),
    user_email: escapeHtml(vars.user_email),
    session_title: escapeHtml(vars.session_title),
    session_mode: escapeHtml(vars.session_mode),
    booking_date: escapeHtml(vars.booking_date),
    booking_time: escapeHtml(vars.booking_time),
    booking_id: escapeHtml(vars.booking_id),
    transaction_id: escapeHtml(vars.transaction_id),
    amount: escapeHtml(vars.amount),
    phone: escapeHtml(vars.phone),
    riservata_url: escapeHtml(vars.riservata_url),
    whatsapp_url: escapeHtml(vars.whatsapp_url),
    support_email: escapeHtml(vars.support_email),
  };

  const messages = [];
  if (vars.user_email) {
    messages.push({
      to: vars.user_email,
      subject: `Pagamento ricevuto — ${vars.booking_date} · ${vars.booking_time}`,
      text: fillBookingConfirmText(vars),
      html: fillBookingConfirmHtml(htmlVars),
      replyTo: supportEmail,
    });
  }

  const studioText = [
    'Nuova prenotazione confermata — Tarot Italia',
    `Nome: ${vars.user_name}`,
    `Email: ${vars.user_email || '—'}`,
    `Recapito: ${vars.phone}`,
    `Sessione: ${vars.session_title}`,
    `Quando: ${vars.booking_date} · ${vars.booking_time}`,
    `Modalità: ${vars.session_mode}`,
    `Totale: €${amount}`,
    `Riferimento: ${vars.booking_id}`,
    `Transazione: ${vars.transaction_id}`,
  ].join('\n');

  messages.push({
    to: studioTo,
    subject: `Nuova prenotazione — ${vars.user_name} · ${vars.booking_date} ${vars.booking_time}`,
    text: studioText,
    html: `<div style="font-family:Georgia,serif;color:#2B2523;background:#F9F8F6;padding:28px"><p>${escapeHtml(studioText).replaceAll('\n', '<br>')}</p></div>`,
    replyTo: vars.user_email || supportEmail,
  });

  await sendZohoMails(messages);
}
