import {
  HOUR_SLOTS,
  localIso,
  slotsForDate,
  type OccupiedSlot,
} from './bookingSlots.ts';

export type { OccupiedSlot };

export const WEEKDAYS_IT = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

export const MONTHS_IT = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

export { HOUR_SLOTS, localIso, slotsForDate };

export function toIsoDate(date: Date): string {
  return localIso(date);
}

export function getNextAvailableDate(
  occupied: OccupiedSlot[] = []
): Date {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  for (let i = 0; i < 60; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = localIso(d);
    if (openHoursForDate(iso, occupied).length > 0) {
      d.setHours(0, 0, 0, 0);
      return d;
    }
  }
  const fallback = new Date();
  fallback.setHours(0, 0, 0, 0);
  fallback.setDate(fallback.getDate() + 1);
  return fallback;
}

export function formatItalianDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  return dt.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export type CalendarCell = {
  day: number;
  iso: string;
  disabled: boolean;
} | null;

export function isOccupied(
  list: OccupiedSlot[],
  dateIso: string,
  slot: string
): boolean {
  return list.some((item) => item.dateIso === dateIso && item.slot === slot);
}

export function openHoursForDate(
  dateIso: string,
  occupied: OccupiedSlot[]
): string[] {
  return slotsForDate(dateIso).filter(
    (hour) => !isOccupied(occupied, dateIso, hour)
  );
}

export function buildCalendarCells(
  calendarMonth: Date,
  todayZero: Date,
  occupied: OccupiedSlot[] = []
): CalendarCell[] {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const todayIso = localIso(todayZero);

  const cells: CalendarCell[] = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const current = new Date(year, month, day);
    current.setHours(0, 0, 0, 0);
    const iso = toIsoDate(current);
    const isPast = iso < todayIso;
    const noHours = openHoursForDate(iso, occupied).length === 0;
    cells.push({
      day,
      iso,
      disabled: isPast || noHours,
    });
  }
  return cells;
}

export function monthRangeIso(calendarMonth: Date): { from: string; to: string } {
  const y = calendarMonth.getFullYear();
  const m = calendarMonth.getMonth();
  const from = toIsoDate(new Date(y, m, 1));
  const to = toIsoDate(new Date(y, m + 1, 0));
  return { from, to };
}
