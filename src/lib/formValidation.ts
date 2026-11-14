/** Validazioni condivise per form di prenotazione, iscrizione e dialogo. */

export function isValidFullName(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return value.trim().length >= 7;
}
