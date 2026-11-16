import { useCallback, useEffect, useState } from 'react';
import { monthRangeIso, type OccupiedSlot } from '../lib/bookingCalendar';

export type { OccupiedSlot };

const FALLBACK_AVAILABILITY_ERROR =
  'Non riusciamo a caricare la disponibilità degli orari. Puoi comunque selezionare uno slot; la conferma avverrà via WhatsApp.';

async function readAvailabilityJson(res: Response): Promise<{
  occupied?: OccupiedSlot[];
  error?: string;
  notice?: string;
  degraded?: boolean;
}> {
  const text = await res.text();
  if (!text.trim()) {
    throw new Error(FALLBACK_AVAILABILITY_ERROR);
  }
  try {
    return JSON.parse(text) as {
      occupied?: OccupiedSlot[];
      error?: string;
      notice?: string;
      degraded?: boolean;
    };
  } catch {
    // Vercel FUNCTION_INVOCATION_FAILED returns plain text ("A server error…").
    throw new Error(FALLBACK_AVAILABILITY_ERROR);
  }
}

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
      const json = await readAvailabilityJson(res);
      if (!res.ok) {
        throw new Error(json.error || FALLBACK_AVAILABILITY_ERROR);
      }
      setOccupied(json.occupied ?? []);
      if (json.degraded || json.notice) {
        setError(json.notice || FALLBACK_AVAILABILITY_ERROR);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : FALLBACK_AVAILABILITY_ERROR
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
