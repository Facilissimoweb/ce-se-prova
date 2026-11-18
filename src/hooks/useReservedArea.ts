import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { readJsonResponse } from '../lib/readJsonResponse';
import {
  RESERVED_DEMO_UID,
  buildReservedDemoOverview,
} from '../lib/reservedDemo';
import type {
  CourseId,
  ReservedAreaOverview,
  ReservedCourseItem,
  ReservedUnlockedDispensa,
} from '../types/handoff';

type GetIdToken = () => Promise<string | null>;

const FALLBACK_OVERVIEW_ERROR =
  'Impossibile caricare i contenuti riservati. Riprova tra poco.';

interface UseReservedAreaParams {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  getIdToken: GetIdToken;
}

export function useReservedArea({ user, getIdToken }: UseReservedAreaParams) {
  const userUid = user?.uid ?? null;

  const [overview, setOverview] = useState<ReservedAreaOverview | null>(null);
  // Start loading when the screen mounts with an authenticated user so SPA
  // remounts (leave Area Riservata → return) never flash an empty shell.
  const [loadingData, setLoadingData] = useState(() => Boolean(userUid));
  const [dataError, setDataError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    'dispense' | 'consulti' | 'appunti'
  >('dispense');
  const [activeCourseSlug, setActiveCourseSlug] =
    useState<CourseId>('arcani-maggiori');
  const [activeDispensaId, setActiveDispensaId] = useState<number | null>(null);

  const [notesDraft, setNotesDraft] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesFeedback, setNotesFeedback] = useState<string | null>(null);

  const [enrollName, setEnrollName] = useState('');
  const [enrollPhone, setEnrollPhone] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState<string | null>(null);

  // Keep latest identity for async work without putting the whole user object
  // in callback deps (parent often recreates `{ uid, email, displayName }`).
  const userRef = useRef(user);
  userRef.current = user;
  const getIdTokenRef = useRef(getIdToken);
  getIdTokenRef.current = getIdToken;
  const overviewRequestIdRef = useRef(0);

  const loadOverview = useCallback(async (signal?: AbortSignal) => {
    const currentUser = userRef.current;
    if (!currentUser) return;

    const requestId = ++overviewRequestIdRef.current;
    setLoadingData(true);
    setDataError(null);
    try {
      if (currentUser.uid === RESERVED_DEMO_UID) {
        if (signal?.aborted || requestId !== overviewRequestIdRef.current) return;
        setOverview(buildReservedDemoOverview());
        setEnrollName((prev) => prev || currentUser.displayName || 'Demo Corsista');
        return;
      }

      const token = await getIdTokenRef.current();
      if (signal?.aborted || requestId !== overviewRequestIdRef.current) return;
      if (!token) {
        setDataError('Sessione non disponibile. Riprova ad accedere.');
        return;
      }
      const res = await fetch('/api/reserved/overview', {
        headers: { Authorization: `Bearer ${token}` },
        // Avoid serving a cached soft-seed / failed overview after SPA remount.
        cache: 'no-store',
        signal,
      });
      if (signal?.aborted || requestId !== overviewRequestIdRef.current) return;
      // Vercel FUNCTION_INVOCATION_FAILED returns plain text — never res.json().
      const json = await readJsonResponse<{
        user?: ReservedAreaOverview['user'];
        courses?: ReservedAreaOverview['courses'];
        bookings?: ReservedAreaOverview['bookings'];
        dialoguePasses?: ReservedAreaOverview['dialoguePasses'];
        degraded?: boolean;
        notice?: string;
        error?: string;
      }>(res, FALLBACK_OVERVIEW_ERROR);
      if (signal?.aborted || requestId !== overviewRequestIdRef.current) return;
      if (!res.ok) {
        throw new Error(json.error || FALLBACK_OVERVIEW_ERROR);
      }
      const overviewPayload = json as ReservedAreaOverview;
      setOverview(overviewPayload);
      if (overviewPayload.degraded || overviewPayload.notice) {
        setDataError(overviewPayload.notice || FALLBACK_OVERVIEW_ERROR);
      }
      setEnrollName(
        (prev) =>
          prev ||
          overviewPayload.user?.displayName ||
          currentUser.displayName ||
          ''
      );
      setEnrollPhone(
        (prev) => prev || overviewPayload.user?.phoneWhatsapp || ''
      );
    } catch (err) {
      if (signal?.aborted || requestId !== overviewRequestIdRef.current) return;
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setDataError(
        err instanceof Error
          ? err.message
          : 'Errore di caricamento dell’Area Riservata.'
      );
    } finally {
      if (!signal?.aborted && requestId === overviewRequestIdRef.current) {
        setLoadingData(false);
      }
    }
  }, []);

  // Refetch whenever Area Riservata mounts / remounts or auth uid becomes ready.
  useEffect(() => {
    if (!userUid) {
      overviewRequestIdRef.current += 1;
      setOverview(null);
      setLoadingData(false);
      setDataError(null);
      return;
    }

    const controller = new AbortController();
    void loadOverview(controller.signal);
    return () => {
      controller.abort();
    };
  }, [userUid, loadOverview]);

  const activeCourse: ReservedCourseItem | null = useMemo(() => {
    if (!overview) return null;
    return (
      overview.courses.find((c) => c.slug === activeCourseSlug) ??
      overview.courses[0] ??
      null
    );
  }, [overview, activeCourseSlug]);

  useEffect(() => {
    if (!activeCourse) {
      setActiveDispensaId(null);
      return;
    }
    if (activeCourse.isUnlocked && activeCourse.unlockedDispense.length > 0) {
      const stillValid = activeCourse.unlockedDispense.some(
        (d) => d.id === activeDispensaId
      );
      if (!stillValid) {
        setActiveDispensaId(activeCourse.unlockedDispense[0].id);
      }
    } else {
      setActiveDispensaId(null);
    }
  }, [activeCourse, activeDispensaId]);

  const activeDispensa: ReservedUnlockedDispensa | null = useMemo(() => {
    if (!activeCourse || !activeCourse.isUnlocked) return null;
    return (
      activeCourse.unlockedDispense.find((d) => d.id === activeDispensaId) ??
      activeCourse.unlockedDispense[0] ??
      null
    );
  }, [activeCourse, activeDispensaId]);

  useEffect(() => {
    setNotesDraft(activeDispensa?.personalNotes ?? '');
    setNotesFeedback(null);
  }, [activeDispensa?.id, activeDispensa?.personalNotes]);

  const handleSaveProgress = async (
    dispensa: ReservedUnlockedDispensa,
    nextCompleted?: boolean
  ) => {
    setSavingNotes(true);
    setNotesFeedback(null);
    try {
      const token = await getIdToken();
      if (!token) throw new Error('Sessione scaduta.');
      const res = await fetch(`/api/reserved/dispense/${dispensa.id}/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed:
            typeof nextCompleted === 'boolean' ? nextCompleted : dispensa.completed,
          personalNotes: notesDraft,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Salvataggio non riuscito.');

      await loadOverview();
      setNotesFeedback('Appunti e stato di avanzamento salvati.');
    } catch (err) {
      setNotesFeedback(
        err instanceof Error ? err.message : 'Impossibile salvare al momento.'
      );
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDownloadDispensa = (
    courseTitle: string,
    dispensa: ReservedUnlockedDispensa
  ) => {
    const fileContent = `# Tarot Italia · Maria Teresa Rogani\nPercorso: ${courseTitle}\nModulo ${dispensa.moduleNumber}: ${dispensa.title}\n${dispensa.subtitle}\n\nPunti Chiave:\n${dispensa.keyTakeaways.map((k) => `- ${k}`).join('\n')}\n\n${dispensa.contentMarkdown}\n`;
    const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarot-italia-modulo-${dispensa.moduleNumber}-${dispensa.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reloadOverview = useCallback(() => {
    void loadOverview();
  }, [loadOverview]);

  const confirmCourseStripeSession = useCallback(
    async (stripeSessionId: string) => {
      if (!userUid) return;
      setEnrolling(true);
      setEnrollMessage(null);
      try {
        const token = await getIdTokenRef.current();
        if (!token) throw new Error('Sessione non valida.');
        const res = await fetch('/api/reserved/confirm-stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ stripeSessionId }),
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || 'Pagamento corso non confermato.');
        }
        await loadOverview();
        setEnrollMessage(
          'Pagamento confermato: il percorso è attivo e le dispense sono accessibili.'
        );
      } catch (err) {
        setEnrollMessage(
          err instanceof Error ? err.message : 'Errore nella conferma del pagamento.'
        );
      } finally {
        setEnrolling(false);
      }
    },
    [userUid, loadOverview]
  );

  useEffect(() => {
    if (!userUid) return;
    const params = new URLSearchParams(window.location.search);
    const stripeSessionId = params.get('course_stripe_session_id');
    if (!stripeSessionId) return;
    void confirmCourseStripeSession(stripeSessionId).finally(() => {
      window.history.replaceState({}, '', window.location.pathname);
    });
  }, [userUid, confirmCourseStripeSession]);

  const handleUnlockCourse = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeCourse || !user) return;
    setEnrolling(true);
    setEnrollMessage(null);
    try {
      const token = await getIdToken();
      if (!token) throw new Error('Sessione non valida.');
      const res = await fetch('/api/reserved/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseSlug: activeCourse.slug,
          customerName:
            enrollName.trim() || user.displayName || user.email || 'Corsista',
          customerPhone: enrollPhone.trim() || undefined,
        }),
      });
      const json = (await res.json()) as {
        error?: string;
        mode?: 'stripe_redirect' | 'enrolled' | 'direct_unlock';
        checkoutUrl?: string;
      };
      if (!res.ok) throw new Error(json.error || 'Attivazione non riuscita.');

      if (json.mode === 'stripe_redirect' && json.checkoutUrl) {
        window.location.assign(json.checkoutUrl);
        return;
      }

      await loadOverview();
      setEnrollMessage(
        json.mode === 'direct_unlock'
          ? `Percorso "${activeCourse.title}" attivato in modalità preview (ALLOW_DIRECT_UNLOCK).`
          : `Percorso "${activeCourse.title}" attivato: tutte le dispense del corso sono ora accessibili.`
      );
    } catch (err) {
      setEnrollMessage(
        err instanceof Error ? err.message : 'Errore durante la registrazione.'
      );
    } finally {
      setEnrolling(false);
    }
  };

  const unlockedCount = overview?.courses.filter((c) => c.isUnlocked).length ?? 0;
  const completedDispenseCount =
    overview?.courses.reduce(
      (acc, c) => acc + c.unlockedDispense.filter((d) => d.completed).length,
      0
    ) ?? 0;
  const totalDispenseCount =
    overview?.courses.reduce((acc, c) => acc + c.dispenseCount, 0) ?? 12;

  return {
    overview,
    loadingData,
    dataError,
    loadOverview: reloadOverview,
    activeTab,
    setActiveTab,
    activeCourseSlug,
    setActiveCourseSlug,
    activeCourse,
    activeDispensa,
    setActiveDispensaId,
    notesDraft,
    setNotesDraft,
    savingNotes,
    notesFeedback,
    setNotesFeedback,
    enrollName,
    setEnrollName,
    enrollPhone,
    setEnrollPhone,
    enrolling,
    enrollMessage,
    setEnrollMessage,
    handleSaveProgress,
    handleDownloadDispensa,
    handleUnlockCourse,
    unlockedCount,
    completedDispenseCount,
    totalDispenseCount,
  };
}
