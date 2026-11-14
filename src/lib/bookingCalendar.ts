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

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getNextAvailableDate(): Date {
  const candidate = new Date();
  candidate.setHours(0, 0, 0, 0);
  candidate.setDate(candidate.getDate() + 1);
  while (candidate.getDay() === 0) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return candidate;
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

export function buildCalendarCells(
  calendarMonth: Date,
  todayZero: Date
): CalendarCell[] {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;

  const cells: CalendarCell[] = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const current = new Date(year, month, day);
    current.setHours(0, 0, 0, 0);
    const isSunday = current.getDay() === 0;
    const isPast = current.getTime() < todayZero.getTime();
    cells.push({
      day,
      iso: toIsoDate(current),
      disabled: isSunday || isPast,
    });
  }
  return cells;
}
