import { createSign } from 'crypto';
import { BOOKING_TIMEZONE } from './bookingSlots.ts';

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

export function isGoogleCalendarConfigured(): boolean {
  const refresh =
    process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim() ||
    process.env.GOOGLE_CALENDAR_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
  if (refresh && clientId && clientSecret) return true;

  const email = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();
  return Boolean(email && key);
}

function calendarId(): string {
  return (
    process.env.GOOGLE_CALENDAR_ID?.trim() ||
    process.env.GOOGLE_CALENDAR_EMAIL?.trim() ||
    'primary'
  );
}

async function googleAccessToken(): Promise<string | null> {
  const refresh =
    process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim() ||
    process.env.GOOGLE_CALENDAR_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();

  if (refresh && clientId && clientSecret) {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    const data = (await res.json()) as { access_token?: string; error?: string };
    if (!res.ok || !data.access_token) {
      console.error('Google OAuth token', res.status, data);
      return null;
    }
    return data.access_token;
  }

  const email = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();
  if (!email || !key) return null;

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(
    JSON.stringify({ alg: 'RS256', typ: 'JWT' })
  ).toString('base64url');
  const claim = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: CALENDAR_SCOPE,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  ).toString('base64url');
  const unsigned = `${header}.${claim}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(key).toString('base64url');
  const assertion = `${unsigned}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const data = (await res.json()) as { access_token?: string };
  if (!res.ok || !data.access_token) {
    console.error('Google service account token', res.status, data);
    return null;
  }
  return data.access_token;
}

function addMinutes(day: string, slot: string, minutes: number): string {
  const [hour, minute] = slot.split(':').map(Number);
  const total = hour * 60 + minute + minutes;
  const pad = (n: number) => String(n).padStart(2, '0');
  const daysAhead = Math.floor(total / (24 * 60));
  const mins = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const endH = Math.floor(mins / 60);
  const endM = mins % 60;
  if (!daysAhead) return `${day}T${pad(endH)}:${pad(endM)}:00`;
  const [year, month, date] = day.split('-').map(Number);
  const next = new Date(year, month - 1, date + daysAhead);
  return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}T${pad(endH)}:${pad(endM)}:00`;
}

export type CalendarBookingInput = {
  id: string | number;
  title: string;
  day: string;
  slot: string;
  minutes: number;
  modeLabel: string;
  guestName: string;
  phone: string;
  customerEmail: string | null;
};

export async function createGoogleCalendarEvent(
  booking: CalendarBookingInput
): Promise<string | null> {
  const token = await googleAccessToken();
  if (!token) {
    console.error(
      'Google Calendar skipped — missing OAuth or service account secrets'
    );
    return null;
  }

  const start = `${booking.day}T${booking.slot}:00`;
  const end = addMinutes(booking.day, booking.slot, booking.minutes);
  const body = {
    summary: `Tarot Italia · ${booking.title} · ${booking.guestName}`,
    description: [
      booking.title,
      `Quando: ${booking.day} · ${booking.slot}`,
      `Modalità: ${booking.modeLabel}`,
      `Recapito: ${booking.phone}`,
      booking.customerEmail ? `Email: ${booking.customerEmail}` : '',
      `Riferimento: ${booking.id}`,
    ]
      .filter(Boolean)
      .join('\n'),
    start: { dateTime: start, timeZone: BOOKING_TIMEZONE },
    end: { dateTime: end, timeZone: BOOKING_TIMEZONE },
    transparency: 'opaque',
    status: 'confirmed',
    reminders: { useDefault: true },
  };

  const id = calendarId();
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?sendUpdates=none`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    console.error('Google Calendar insert', res.status, await res.text());
    return null;
  }

  const data = (await res.json()) as { id?: string };
  return data.id ?? null;
}

/**
 * FreeBusy: orari già impegnati sul calendario Google (opzionale).
 * Restituisce chiavi `YYYY-MM-DD|HH:00` che si sovrappongono agli HOUR_SLOTS.
 */
export async function fetchGoogleBusySlotKeys(
  fromIso: string,
  toIso: string
): Promise<string[]> {
  if (!isGoogleCalendarConfigured()) return [];
  const token = await googleAccessToken();
  if (!token) return [];

  const timeMin = `${fromIso}T00:00:00+01:00`;
  const timeMax = `${toIso}T23:59:59+01:00`;
  const id = calendarId();

  const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: BOOKING_TIMEZONE,
      items: [{ id }],
    }),
  });

  if (!res.ok) {
    console.error('Google FreeBusy', res.status, await res.text());
    return [];
  }

  const data = (await res.json()) as {
    calendars?: Record<string, { busy?: { start: string; end: string }[] }>;
  };
  const busy = data.calendars?.[id]?.busy ?? [];
  const keys = new Set<string>();

  for (const block of busy) {
    const start = new Date(block.start);
    const end = new Date(block.end);
    for (
      let cursor = new Date(start);
      cursor < end;
      cursor.setMinutes(cursor.getMinutes() + 30)
    ) {
      const day = localIsoFromDateInRome(cursor);
      const hour = Number(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: BOOKING_TIMEZONE,
          hour: '2-digit',
          hour12: false,
        }).format(cursor)
      );
      if (hour >= 9 && hour <= 20) {
        keys.add(`${day}|${String(hour).padStart(2, '0')}:00`);
      }
    }
  }

  return [...keys];
}

function localIsoFromDateInRome(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: BOOKING_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const y = parts.find((p) => p.type === 'year')?.value;
  const m = parts.find((p) => p.type === 'month')?.value;
  const d = parts.find((p) => p.type === 'day')?.value;
  return `${y}-${m}-${d}`;
}
