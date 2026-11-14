import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Lock,
  LogOut,
  Save,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import type {
  CourseId,
  ReservedAreaOverview,
  ReservedCourseItem,
  ReservedUnlockedDispensa,
  ScreenId,
} from '../types/handoff';
import { useAuth } from '../context/AuthContext';
import { TarotEmblemLogo } from '../components/TarotEmblem';

interface ReservedAreaScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectCourse: (courseId: CourseId) => void;
}

function renderInlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-[#F4F1EA]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function FormattedDispensaBody({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n');
  return (
    <div className="space-y-3 text-sm md:text-[15px] leading-relaxed text-[#E8e1dd]">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) return <div key={idx} className="h-1" aria-hidden="true" />;
        if (line.startsWith('## ')) {
          return (
            <h4
              key={idx}
              className="font-display text-lg md:text-xl text-[#D4AF37] pt-3 first:pt-0"
            >
              {line.slice(3)}
            </h4>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h5
              key={idx}
              className="font-body font-semibold text-base text-[#F4F1EA] pt-2"
            >
              {line.slice(4)}
            </h5>
          );
        }
        if (line.startsWith('- ') || /^\d+\.\s/.test(line)) {
          const clean = line.startsWith('- ')
            ? line.slice(2)
            : line.replace(/^\d+\.\s/, '');
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2">
              <span
                className="text-[#D4AF37] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0"
                aria-hidden="true"
              />
              <p>{renderInlineBold(clean)}</p>
            </div>
          );
        }
        return <p key={idx}>{renderInlineBold(line)}</p>;
      })}
    </div>
  );
}

export function ReservedAreaScreen({
  onNavigate,
  onSelectCourse,
}: ReservedAreaScreenProps) {
  const { user, loading: authLoading, authError, signInWithGoogle, logout, getIdToken } =
    useAuth();

  const [overview, setOverview] = useState<ReservedAreaOverview | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'dispense' | 'consulti'>('dispense');
  const [activeCourseSlug, setActiveCourseSlug] =
    useState<CourseId>('arcani-maggiori');
  const [activeDispensaId, setActiveDispensaId] = useState<number | null>(null);

  // Study notes & saving state
  const [notesDraft, setNotesDraft] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesFeedback, setNotesFeedback] = useState<string | null>(null);

  // Quick unlock / purchase form for locked course
  const [enrollName, setEnrollName] = useState('');
  const [enrollPhone, setEnrollPhone] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState<string | null>(null);

  const loadOverview = useCallback(async () => {
    if (!user) return;
    setLoadingData(true);
    setDataError(null);
    try {
      const token = await getIdToken();
      if (!token) {
        setDataError('Sessione non disponibile. Riprova ad accedere.');
        return;
      }
      const res = await fetch('/api/reserved/overview', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Impossibile caricare i contenuti riservati.');
      }
      setOverview(json as ReservedAreaOverview);
      setEnrollName(
        (prev) => prev || json.user?.displayName || user.displayName || ''
      );
      setEnrollPhone((prev) => prev || json.user?.phoneWhatsapp || '');
    } catch (err) {
      setDataError(
        err instanceof Error
          ? err.message
          : 'Errore di caricamento dell’Area Riservata.'
      );
    } finally {
      setLoadingData(false);
    }
  }, [user, getIdToken]);

  useEffect(() => {
    if (user) {
      loadOverview();
    } else {
      setOverview(null);
    }
  }, [user, loadOverview]);

  const activeCourse: ReservedCourseItem | null = useMemo(() => {
    if (!overview) return null;
    return (
      overview.courses.find((c) => c.slug === activeCourseSlug) ??
      overview.courses[0] ??
      null
    );
  }, [overview, activeCourseSlug]);

  // Select first unlocked dispensa when switching course
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
      const res = await fetch(
        `/api/reserved/dispense/${dispensa.id}/progress`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed:
              typeof nextCompleted === 'boolean'
                ? nextCompleted
                : dispensa.completed,
            personalNotes: notesDraft,
          }),
        }
      );
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

  const handleUnlockCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCourse) return;
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
          customerName: enrollName.trim() || user?.displayName || user?.email || 'Corsista',
          customerPhone: enrollPhone.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Attivazione non riuscita.');
      await loadOverview();
      setEnrollMessage(
        `Percorso "${activeCourse.title}" attivato: tutte le dispense del corso sono ora accessibili.`
      );
    } catch (err) {
      setEnrollMessage(
        err instanceof Error ? err.message : 'Errore durante la registrazione.'
      );
    } finally {
      setEnrolling(false);
    }
  };

  const unlockedCount =
    overview?.courses.filter((c) => c.isUnlocked).length ?? 0;
  const completedDispenseCount =
    overview?.courses.reduce(
      (acc, c) => acc + c.unlockedDispense.filter((d) => d.completed).length,
      0
    ) ?? 0;
  const totalDispenseCount =
    overview?.courses.reduce((acc, c) => acc + c.dispenseCount, 0) ?? 12;

  // 1. Unauthenticated / Loading Gate
  if (authLoading) {
    return (
      <div className="pt-12 pb-16 flex justify-center">
        <div className="glass-tier-1 rounded-2xl p-8 w-full max-w-lg text-center space-y-3">
          <TarotEmblemLogo size={42} className="mx-auto" />
          <p className="text-sm text-[#A39B93]">Verifica sessione in corso...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-8 md:pt-14 pb-12 space-y-10">
        <header className="space-y-3 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Spazio Personale Corsisti · Accesso Protetto
          </p>
          <h1 className="font-display text-[32px] leading-[40px] md:text-[44px] md:leading-[52px] tracking-[0.02em] text-[#F4F1EA]">
            Area Riservata Tarot Italia
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-[#A39B93]">
            Accedi con il tuo account Google per consultare i percorsi formativi acquistati, scaricare le dispense formulate da Maria Teresa Rogani, salvare i tuoi appunti di studio e ritrovare i tuoi consulti.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 glass-tier-1 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#D4AF37]">
                <Lock className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.08em]">
                  Accesso Unico Sicuro
                </span>
              </div>
              <h2 className="font-body font-semibold text-xl md:text-2xl tracking-[-0.02em] text-[#F4F1EA]">
                Entra nella tua biblioteca simbolica personale
              </h2>
              <p className="text-sm leading-relaxed text-[#A39B93]">
                Ogni dispensa dei percorsi <strong className="text-[#F4F1EA]">Arcani Maggiori</strong>,{' '}
                <strong className="text-[#F4F1EA]">Arcani Minori</strong> e{' '}
                <strong className="text-[#F4F1EA]">Metodi di Stesura</strong> è collegata in modo personale al tuo profilo protetto.
              </p>

              {authError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/35 text-xs text-[#ffb4ab]"
                >
                  {authError}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={signInWithGoogle}
                className="px-6 py-3 min-h-[46px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center gap-2.5 whitespace-nowrap transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
              >
                <UserCheck className="w-4 h-4" />
                Accedi con Google
              </button>

              <button
                type="button"
                onClick={() => onNavigate('corsi')}
                className="px-5 py-3 min-h-[46px] rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-sm font-medium text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                Vedi i 3 Percorsi Didattici
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>

          <aside className="lg:col-span-5 glass-tier-1 rounded-2xl p-6 md:p-8 space-y-5">
            <h3 className="font-display text-lg text-[#F4F1EA]">
              Cosa trovi dentro l&apos;Area Riservata
            </h3>
            <ul className="space-y-3.5 text-sm text-[#E8e1dd]">
              <li className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#F4F1EA]">12 Dispense Formulate</strong> suddivise nei tre pilastri del metodo Tarot Italia.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#F4F1EA]">Quaderno Appunti</strong> personale salvato su ogni modulo studiato e completato.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#F4F1EA]">Storico Sessioni</strong> con date, orari e note dei consulti individuali prenotati.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#F4F1EA]">Accesso Riservato</strong> vincolato al tuo indirizzo email verificato.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    );
  }

  // 2. Authenticated Reserved Area View
  return (
    <div className="space-y-10 pt-6 md:pt-10 pb-10">
      {/* Header */}
      <header className="glass-tier-1 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Area Riservata · Profilo Verificato
          </p>
          <h1 className="font-display text-[28px] leading-[36px] md:text-[38px] md:leading-[46px] text-[#F4F1EA]">
            Bentornato, {user.displayName || user.email}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-[#A39B93] tabular-nums">
            <span>{user.email}</span>
            <span aria-hidden="true" className="text-[#D4AF37]/60">·</span>
            <span>
              {unlockedCount} / {overview?.courses.length ?? 3} percorsi attivi
            </span>
            <span aria-hidden="true" className="text-[#D4AF37]/60">·</span>
            <span>
              {completedDispenseCount} / {totalDispenseCount} dispense completate
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('corsi')}
            className="px-4 py-2.5 min-h-[44px] rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs md:text-sm font-medium text-[#F4F1EA] whitespace-nowrap transition-colors"
          >
            Esplora Corsi
          </button>
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#12100E]/80 border border-[#A39B93]/25 hover:border-[#D4AF37] text-xs md:text-sm font-medium text-[#A39B93] hover:text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap transition-colors"
          >
            <LogOut className="w-4 h-4 text-[#D4AF37]" />
            Esci
          </button>
        </div>
      </header>

      {/* Segmented Control: Dispense vs Consulti */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="inline-flex p-1 rounded-xl bg-[#1A1615]/80 border border-[#D4AF37]/20"
          role="tablist"
          aria-label="Sezioni Area Riservata"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'dispense'}
            onClick={() => setActiveTab('dispense')}
            className={`px-4 py-2 min-h-[40px] rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'dispense'
                ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                : 'text-[#A39B93] hover:text-[#F4F1EA]'
            }`}
          >
            Percorsi &amp; Dispense
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'consulti'}
            onClick={() => setActiveTab('consulti')}
            className={`px-4 py-2 min-h-[40px] rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'consulti'
                ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                : 'text-[#A39B93] hover:text-[#F4F1EA]'
            }`}
          >
            I Miei Consulti ({overview?.bookings.length ?? 0})
          </button>
        </div>
      </div>

      {dataError && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-[#93000a]/25 border border-[#ffb4ab]/35 text-sm text-[#ffb4ab] flex items-center justify-between gap-4"
        >
          <span>{dataError}</span>
          <button
            type="button"
            onClick={loadOverview}
            className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#12100E] text-xs font-semibold shrink-0"
          >
            Riprova
          </button>
        </div>
      )}

      {loadingData && !overview ? (
        <div className="glass-tier-1 rounded-2xl p-10 text-center text-sm text-[#A39B93]">
          Caricamento dei percorsi e delle dispense riservate...
        </div>
      ) : activeTab === 'dispense' && overview && activeCourse ? (
        <div className="space-y-8">
          {/* Course Selector Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overview.courses.map((course, idx) => {
              const isSelected = course.slug === activeCourse.slug;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => {
                    setActiveCourseSlug(course.slug);
                    setEnrollMessage(null);
                  }}
                  aria-pressed={isSelected}
                  className={`rounded-2xl p-5 text-left border transition-all duration-150 flex flex-col justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isSelected
                      ? 'glass-tier-2 border-[#D4AF37] shadow-[0_0_24px_rgba(212,175,55,0.14)]'
                      : 'glass-tier-1 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold uppercase tracking-[0.06em] text-[#D4AF37]">
                      {idx + 1}) {course.title}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 font-medium ${
                        course.isUnlocked ? 'text-[#E6C65C]' : 'text-[#A39B93]'
                      }`}
                    >
                      {course.isUnlocked ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Attivo
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" /> € {course.priceEur}
                        </>
                      )}
                    </span>
                  </div>
                  <p className="font-display text-base text-[#F4F1EA]">
                    {course.subtitle}
                  </p>
                  <p className="text-xs text-[#A39B93] tabular-nums">
                    {course.dispenseCount} dispense · {course.lessonsCount} lezioni
                  </p>
                </button>
              );
            })}
          </div>

          {enrollMessage && (
            <div className="p-4 rounded-xl bg-[#D4AF37]/12 border border-[#D4AF37]/40 text-sm text-[#F4F1EA]">
              {enrollMessage}
            </div>
          )}

          {/* Selected Course Workspace: Unlocked Dispense Reader OR Enrollment Activation */}
          {activeCourse.isUnlocked ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 4 Dispense Navigation */}
              <aside className="lg:col-span-4 space-y-3">
                <div className="space-y-1 px-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    Dispense del Percorso
                  </p>
                  <h2 className="font-body font-semibold text-xl text-[#F4F1EA]">
                    {activeCourse.title}
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {activeCourse.unlockedDispense.map((dispensa) => {
                    const isCurrent = dispensa.id === activeDispensa?.id;
                    return (
                      <button
                        key={dispensa.id}
                        type="button"
                        onClick={() => setActiveDispensaId(dispensa.id)}
                        aria-pressed={isCurrent}
                        className={`w-full text-left rounded-xl p-4 border transition-all space-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                          isCurrent
                            ? 'bg-[#D4AF37]/14 border-[#D4AF37]'
                            : 'glass-tier-1 hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-display text-[#D4AF37] tabular-nums">
                            Dispensa {dispensa.moduleNumber}
                          </span>
                          <span className="text-[#A39B93] inline-flex items-center gap-1.5 tabular-nums">
                            {dispensa.completed && (
                              <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                            )}
                            {dispensa.readingMinutes} min
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#F4F1EA]">
                          {dispensa.title}
                        </p>
                        <p className="text-xs text-[#A39B93] line-clamp-2">
                          {dispensa.format}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Right Column: Dispensa Content + Study Notes */}
              {activeDispensa && (
                <article className="lg:col-span-8 glass-tier-1 rounded-2xl p-6 md:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#D4AF37]/15 pb-5">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#D4AF37]">
                        <span className="font-semibold uppercase tracking-[0.08em]">
                          Modulo {activeDispensa.moduleNumber}
                        </span>
                        <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
                        <span className="text-[#A39B93]">{activeDispensa.format}</span>
                        <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
                        <span className="text-[#A39B93] inline-flex items-center gap-1 tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                          {activeDispensa.readingMinutes} min lettura
                        </span>
                      </div>
                      <h3 className="font-display text-2xl md:text-[28px] text-[#F4F1EA]">
                        {activeDispensa.title}
                      </h3>
                      <p className="text-sm text-[#A39B93]">
                        {activeDispensa.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleDownloadDispensa(activeCourse.title, activeDispensa)
                        }
                        className="px-3.5 py-2 min-h-[40px] rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-medium text-[#F4F1EA] inline-flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Scarica Dispensa
                      </button>

                      <button
                        type="button"
                        disabled={savingNotes}
                        onClick={() =>
                          handleSaveProgress(
                            activeDispensa,
                            !activeDispensa.completed
                          )
                        }
                        className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                          activeDispensa.completed
                            ? 'bg-[#D4AF37] text-[#12100E]'
                            : 'bg-[#D4AF37]/12 border border-[#D4AF37]/35 text-[#F4F1EA] hover:border-[#D4AF37]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {activeDispensa.completed
                          ? 'Modulo Completato'
                          : 'Segna Completato'}
                      </button>
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  {activeDispensa.keyTakeaways.length > 0 && (
                    <div className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/20 p-4 md:p-5 space-y-2.5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                        Concetti Chiave della Dispensa
                      </p>
                      <ul className="space-y-2">
                        {activeDispensa.keyTakeaways.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-xs md:text-sm text-[#E8e1dd]"
                          >
                            <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Formatted Dispensa Body */}
                  <FormattedDispensaBody markdown={activeDispensa.contentMarkdown} />

                  <div className="gold-divider" aria-hidden="true" />

                  {/* Personal Study Notebook */}
                  <div className="space-y-3">
                    <label
                      htmlFor="dispensa-personal-notes"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]"
                    >
                      Quaderno Appunti Personali del Modulo
                    </label>
                    <textarea
                      id="dispensa-personal-notes"
                      rows={4}
                      value={notesDraft}
                      onChange={(e) => {
                        setNotesDraft(e.target.value);
                        setNotesFeedback(null);
                      }}
                      placeholder="Annota qui le tue osservazioni sugli Arcani, domande emerse o stese di esercitazione..."
                      className="w-full px-3.5 py-2.5 rounded-lg input-inset text-sm resize-y"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs text-[#A39B93]">
                        {notesFeedback || 'Gli appunti restano salvati nella tua Area Riservata.'}
                      </p>
                      <button
                        type="button"
                        disabled={savingNotes}
                        onClick={() => handleSaveProgress(activeDispensa)}
                        className="px-4 py-2.5 min-h-[42px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-xs font-semibold inline-flex items-center gap-2 whitespace-nowrap"
                      >
                        <Save className="w-3.5 h-3.5" />
                        {savingNotes ? 'Salvataggio...' : 'Salva Appunti'}
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </div>
          ) : (
            /* Locked Course Preview + Activation Form */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 glass-tier-1 rounded-2xl p-6 md:p-8 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                      Indice delle Dispense Incluse
                    </p>
                    <h2 className="font-body font-semibold text-xl md:text-2xl text-[#F4F1EA] mt-1">
                      {activeCourse.title} · {activeCourse.dispenseCount} Moduli
                    </h2>
                  </div>
                  <span className="font-display text-2xl text-[#D4AF37] tabular-nums">
                    € {activeCourse.priceEur}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#A39B93]">
                  {activeCourse.description}
                </p>

                <div className="space-y-3 pt-1">
                  {activeCourse.dispenseOutline.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 p-4 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-[#D4AF37] tabular-nums">
                          Modulo {item.moduleNumber} · {item.format}
                        </p>
                        <p className="text-sm font-medium text-[#F4F1EA]">
                          {item.title}
                        </p>
                        <p className="text-xs text-[#A39B93]">{item.subtitle}</p>
                      </div>
                      <Lock className="w-4 h-4 text-[#A39B93] shrink-0 mt-1" />
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleUnlockCourse}
                className="lg:col-span-5 glass-tier-2 rounded-2xl p-6 md:p-7 space-y-5"
              >
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    Sblocca Accesso Formativo
                  </p>
                  <h3 className="font-display text-xl text-[#F4F1EA]">
                    Iscrizione a {activeCourse.title}
                  </h3>
                  <p className="text-xs text-[#A39B93] leading-relaxed">
                    Completa i tuoi dati per registrare il percorso nel tuo profilo e accedere subito alle 4 dispense formulate.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="enroll-name"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
                    >
                      Nome e Cognome
                    </label>
                    <input
                      id="enroll-name"
                      type="text"
                      required
                      value={enrollName}
                      onChange={(e) => setEnrollName(e.target.value)}
                      placeholder="Es. Chiara Bellini"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="enroll-phone"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
                    >
                      Recapito WhatsApp (facoltativo)
                    </label>
                    <input
                      id="enroll-phone"
                      type="tel"
                      value={enrollPhone}
                      onChange={(e) => setEnrollPhone(e.target.value)}
                      placeholder="+39 333 000 0000"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    disabled={enrolling}
                    className="w-full min-h-[46px] px-5 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all"
                  >
                    {enrolling
                      ? 'Registrazione in corso...'
                      : `Attiva Percorso & Dispense (€ ${activeCourse.priceEur})`}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectCourse(activeCourse.slug)}
                    className="w-full min-h-[42px] px-4 py-2 rounded-lg border border-[#D4AF37]/25 hover:border-[#D4AF37] text-xs font-medium text-[#A39B93] hover:text-[#F4F1EA]"
                  >
                    Torna alla scheda pubblica del corso
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : (
        /* Tab 2: Booked Consultations History */
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-body font-semibold text-xl md:text-2xl text-[#F4F1EA]">
                Storico dei Tuoi Consulti
              </h2>
              <p className="text-sm text-[#A39B93]">
                Tutte le sessioni individuali prenotate mentre eri autenticato nel tuo profilo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('booking')}
              className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-xs md:text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap"
            >
              Prenota Nuovo Consulto
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {overview && overview.bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {overview.bookings.map((b) => (
                <article
                  key={b.id}
                  className="glass-tier-1 rounded-2xl p-5 md:p-6 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold uppercase tracking-[0.06em] text-[#D4AF37]">
                      Consulto {b.durationMinutes} min
                    </span>
                    <span className="text-[#E6C65C] font-medium capitalize">
                      {b.status === 'confirmed' ? 'Confermato' : b.status}
                    </span>
                  </div>
                  <p className="font-display text-lg text-[#F4F1EA] tabular-nums">
                    {b.scheduledDate} · {b.scheduledTime} CET
                  </p>
                  {b.sessionIntent && (
                    <p className="text-xs md:text-sm text-[#A39B93] leading-relaxed">
                      Tema: {b.sessionIntent}
                    </p>
                  )}
                  <div className="pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs text-[#A39B93] tabular-nums">
                    <span>{b.fullName}</span>
                    <span className="text-[#F4F1EA] font-semibold">
                      € {b.priceEur}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="glass-tier-1 rounded-2xl p-8 text-center space-y-3">
              <p className="text-sm text-[#F4F1EA]">
                Nessun consulto ancora associato al tuo profilo.
              </p>
              <p className="text-xs text-[#A39B93] max-w-md mx-auto">
                Quando effettui una prenotazione mentre sei connesso, l&apos;appuntamento comparirà automaticamente in questa sezione.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
