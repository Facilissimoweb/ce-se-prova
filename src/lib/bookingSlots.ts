/**
 * Fasce orarie pubbliche (Europe/Rome).
 * Disponibilità = slot meno quelli già occupati in Postgres (+ optional Google FreeBusy).
 */

export const BOOKING_TIMEZONE = 'Europe/Rome';

/** Prima e ultima ora prenotabile (inclusive), Europe/Rome. */
export const BOOKING_HOUR_START = 9;
export const BOOKING_HOUR_END = 20;

/** Ore prenotabili: 09:00 → 20:00 inclusive. */
export const HOUR_SLOTS = Array.from(
  { length: BOOKING_HOUR_END - BOOKING_HOUR_START + 1 },
  (_, i) => `${String(i + BOOKING_HOUR_START).padStart(2, '0')}:00`
);

export function localIso(date = new Date()): string {
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

export function slotsForDate(dateIso: string, now = new Date()): string[] {
  const today = localIso(now);
  if (dateIso > today) return [...HOUR_SLOTS];
  if (dateIso < today) return [];
  const romeHour = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: BOOKING_TIMEZONE,
      hour: '2-digit',
      hour12: false,
    }).format(now)
  );
  const romeMinute = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: BOOKING_TIMEZONE,
      minute: '2-digit',
    }).format(now)
  );
  const nextHour = romeMinute > 0 ? romeHour + 1 : romeHour;
  return HOUR_SLOTS.filter((slot) => Number(slot.slice(0, 2)) >= nextHour);
}

export function isValidSlotFormat(slot: string): boolean {
  return /^\d{2}:\d{2}$/.test(slot) && HOUR_SLOTS.includes(slot);
}

export function isValidDateIso(iso: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(iso);
}

export function occupiedKey(dateIso: string, slot: string): string {
  return `${dateIso}|${slot}`;
}

export type OccupiedSlot = { dateIso: string; slot: string };
