import { useCallback, useEffect, useState } from 'react';
import { monthRangeIso, type OccupiedSlot } from '../lib/bookingCalendar';

export type { OccupiedSlot };

export function useBookingAvailability(calendarMonth: Date) {
  const [occupied, setOccupied] = useState<OccupiedSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const { from, to } = monthRangeIso(calendarMonth);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/bookings/availability?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      );
      const json = (await res.json()) as {
        occupied?: OccupiedSlot[];
        error?: string;
      };
      if (!res.ok) {
        throw new Error(json.error || 'Disponibilità non disponibile.');
      }
      setOccupied(json.occupied ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Errore disponibilità calendario.'
      );
      setOccupied([]);
    } finally {
      setLoading(false);
    }
  }, [calendarMonth]);

  useEffect(() => {
    void reload();
    const onFocus = () => {
      void reload();
    };
    window.addEventListener('focus', onFocus);
    const poll = window.setInterval(() => {
      void reload();
    }, 20_000);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.clearInterval(poll);
    };
  }, [reload]);

  return { occupied, loading, error, reload };
}
