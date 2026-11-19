import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { readJsonResponse } from '../lib/readJsonResponse';
import {
  RESERVED_DEMO_UID,
  buildReservedDemoOverview,
} from '../lib/reservedDemo';
import type { CourseId, ReservedAreaOverview } from '../types/handoff';

const FALLBACK_ERROR =
  'Impossibile verificare l’accesso al corso. Riprova tra poco.';

export type CourseEntitlementState = {
  /** Auth + overview still resolving */
  loading: boolean;
  /** Active purchase for the course (or demo unlock) */
  owns: boolean;
  /** Signed-in Firebase / demo user */
  signedIn: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<unknown>;
};

/**
 * Reuses Area Riservata ownership: active `course_purchases` → `isUnlocked`.
 * Soft client gate for Maggiori-linked blog (ENN-131 Phase 1).
 */
export function useCourseEntitlement(
  courseSlug: CourseId | null
): CourseEntitlementState {
  const { user, loading: authLoading, getIdToken, signInWithGoogle } =
    useAuth();
  const [owns, setOwns] = useState(false);
  const [loading, setLoading] = useState(() => Boolean(courseSlug));
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);
  const getIdTokenRef = useRef(getIdToken);
  getIdTokenRef.current = getIdToken;

  useEffect(() => {
    if (!courseSlug) {
      setOwns(false);
      setLoading(false);
      setError(null);
      return;
    }

    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!user) {
      setOwns(false);
      setLoading(false);
      setError(null);
      return;
    }

    const requestId = ++requestIdRef.current;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    (async () => {
      try {
        if (user.uid === RESERVED_DEMO_UID) {
          if (requestId !== requestIdRef.current) return;
          const overview = buildReservedDemoOverview();
          const course = overview.courses.find((c) => c.slug === courseSlug);
          setOwns(Boolean(course?.isUnlocked));
          return;
        }

        const token = await getIdTokenRef.current();
        if (requestId !== requestIdRef.current || controller.signal.aborted) {
          return;
        }
        if (!token) {
          setOwns(false);
          setError('Sessione non disponibile. Riprova ad accedere.');
          return;
        }

        const res = await fetch('/api/reserved/overview', {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
          signal: controller.signal,
        });
        if (requestId !== requestIdRef.current || controller.signal.aborted) {
          return;
        }

        const json = await readJsonResponse<{
          courses?: ReservedAreaOverview['courses'];
          error?: string;
        }>(res, FALLBACK_ERROR);

        if (requestId !== requestIdRef.current || controller.signal.aborted) {
          return;
        }
        if (!res.ok) {
          throw new Error(json.error || FALLBACK_ERROR);
        }

        const course = json.courses?.find((c) => c.slug === courseSlug);
        setOwns(Boolean(course?.isUnlocked));
      } catch (err) {
        if (controller.signal.aborted || requestId !== requestIdRef.current) {
          return;
        }
        setOwns(false);
        setError(err instanceof Error ? err.message : FALLBACK_ERROR);
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [authLoading, courseSlug, user]);

  return {
    loading: Boolean(courseSlug) && (authLoading || loading),
    owns,
    signedIn: Boolean(user),
    error,
    signInWithGoogle,
  };
}
