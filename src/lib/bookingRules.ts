/** Dalle 19:00 (Europe/Rome) i consulti sono solo online — allineato a v2tarotitalia. */
export const EVENING_SLOT_HOUR = 19;

export type BookingMode = 'studio' | 'remote';

export function isEveningSlot(slot: string): boolean {
  const hour = Number(String(slot).slice(0, 2));
  return Number.isFinite(hour) && hour >= EVENING_SLOT_HOUR;
}

export function resolveBookingMode(mode: string, slot: string): BookingMode {
  if (isEveningSlot(slot)) return 'remote';
  return mode === 'studio' ? 'studio' : 'remote';
}

export function sessionModeLabel(mode: string, slot: string): string {
  const resolved = resolveBookingMode(mode, slot);
  const base =
    resolved === 'remote'
      ? 'Chiamata vocale WhatsApp'
      : 'Dal vivo a Macerata';
  return isEveningSlot(slot) ? `${base} · dalle 19:00 solo online` : base;
}
