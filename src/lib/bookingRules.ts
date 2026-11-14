/** Dalle 19:00 (Europe/Rome) i consulti sono solo online — allineato a v2tarotitalia. */
export const EVENING_SLOT_HOUR = 19;

export type BookingMode = 'studio' | 'remote';

export function isEveningSlot(slot: string): boolean {
  const hour = Number(String(slot).slice(0, 2));
  return Number.isFinite(hour) && hour >= EVENING_SLOT_HOUR;
}

/** Di persona: niente slot serali (solo online dalle 19:00). */
export function isSlotAllowedForMode(mode: BookingMode, slot: string): boolean {
  if (mode === 'studio' && isEveningSlot(slot)) return false;
  return true;
}

export function resolveBookingMode(mode: string, slot: string): BookingMode {
  if (isEveningSlot(slot)) return 'remote';
  return mode === 'studio' ? 'studio' : 'remote';
}

export function sessionModeLabel(mode: string, slot?: string): string {
  const resolved =
    slot != null ? resolveBookingMode(mode, slot) : mode === 'studio' ? 'studio' : 'remote';
  const base =
    resolved === 'remote'
      ? 'Online · chiamata vocale'
      : 'Di persona a Macerata';
  if (slot != null && isEveningSlot(slot) && mode === 'studio') {
    return `${base} · dalle 19:00 solo online`;
  }
  return base;
}
