import React, { useEffect, useMemo, useRef } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Lock,
  LogOut,
  MessageCircle,
  Save,
  Sparkles,
} from 'lucide-react';
import type { CourseId, ScreenId } from '../types/handoff';
import { useAuth } from '../context/AuthContext';
import { CheckoutReturnBanner } from '../components/CheckoutReturnBanner';
import { MaterialsLanguagePicker } from '../components/MaterialsLanguagePicker';
import { FormattedDispensaBody } from '../components/reserved/FormattedDispensaBody';
import { DispensaFlashcards } from '../components/reserved/DispensaFlashcards';
import { DispensaSchedaVisiva } from '../components/reserved/DispensaSchedaVisiva';
import { ReservedLoginGate } from '../components/reserved/ReservedLoginGate';
import { ReservedNotesPanel } from '../components/reserved/ReservedNotesPanel';
import {
  getFlashcardDeck,
  getInlineFlashcardDeck,
} from '../data/flashcards/arcaniMaggiori';
import { getSchedaVisiva } from '../data/schedeVisive';
import { useReservedArea } from '../hooks/useReservedArea';
import {
  MAGGIORI_BAGATTO_BLOG_SLUG,
  MAGGIORI_MODULO_01_BLOG_SLUG,
} from '../data/maggioriGatedBlog';
import { openNinaChat } from '../lib/ninaChatOpen';
import {
  SCROLL_LANDMARKS,
  scrollToIdAfterPaint,
} from '../lib/scrollNavigation';

type ReservedScrollTarget =
  | 'percorsi'
  | 'dispense-list'
  | 'dispensa-content'
  | null;

interface ReservedAreaScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectCourse: (courseId: CourseId) => void;
  /** ENN-131 — open Modulo 01 blog companion without losing slug */
  onOpenBlogPost?: (slug: string) => void;
}

export function ReservedAreaScreen({
  onNavigate,
  onSelectCourse,
  onOpenBlogPost,
}: ReservedAreaScreenProps) {
  const { user, loading: authLoading, authError, signInWithGoogle, logout, getIdToken } =
    useAuth();

  // Stable identity for the hook — avoid a fresh object every render.
  const reservedUser = useMemo(
    () =>
      user
        ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }
        : null,
    [user]
  );

  const area = useReservedArea({
    user: reservedUser,
    getIdToken,
  });

  const {
    overview,
    loadingData,
    dataError,
    loadOverview,
    activeTab,
    setActiveTab,
    activeCourse,
    activeDispensa,
    setActiveCourseSlug,
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
  } = area;

  const activeFlashcardDeck = useMemo(() => {
    if (!activeCourse || !activeDispensa) return null;
    return getFlashcardDeck(activeCourse.slug, activeDispensa.moduleNumber);
  }, [activeCourse, activeDispensa]);

  /**
   * ENN-113–122 — mid-dispensa embeds for Maggiori Dispensa 01.
   * Order in markdown: scheda-visiva → sigillo when both exist (visual before flashcards).
   * Matto / Bagatto / Papessa / Imperatrice / Imperatore / Papa / Amanti each keep that order.
   * Embed keys are `<type>:<id>` (see FormattedDispensaBody).
   */
  const dispensaFlashcardEmbeds = useMemo(() => {
    if (
      !activeCourse ||
      !activeDispensa ||
      activeCourse.slug !== 'arcani-maggiori' ||
      activeDispensa.moduleNumber !== '01'
    ) {
      return undefined;
    }
    const embeds: Record<string, React.ReactNode> = {};
    for (const schedaId of [
      'il-matto',
      'il-bagatto',
      'la-papessa',
      'l-imperatrice',
      'l-imperatore',
      'il-papa',
      'gli-amanti',
      'il-carro',
    ] as const) {
      const scheda = getSchedaVisiva(schedaId);
      if (scheda) {
        embeds[`scheda-visiva:${schedaId}`] = (
          <DispensaSchedaVisiva content={scheda} />
        );
      }
    }
    for (const sigilloId of [
      'il-matto',
      'il-bagatto',
      'la-papessa',
      'l-imperatrice',
      'l-imperatore',
      'il-papa',
      'gli-amanti',
      'il-carro',
    ] as const) {
      const deck = getInlineFlashcardDeck(sigilloId);
      if (deck) {
        embeds[`sigillo:${sigilloId}`] = <DispensaFlashcards deck={deck} />;
      }
    }
    return Object.keys(embeds).length > 0 ? embeds : undefined;
  }, [activeCourse, activeDispensa]);

  const pendingScrollRef = useRef<ReservedScrollTarget>(null);

  const nextDispensa = useMemo(() => {
    if (!activeCourse?.isUnlocked || !activeDispensa) return null;
    const list = activeCourse.unlockedDispense;
    const idx = list.findIndex((d) => d.id === activeDispensa.id);
    if (idx < 0 || idx >= list.length - 1) return null;
    return list[idx + 1] ?? null;
  }, [activeCourse, activeDispensa]);

  const scrollLandmarkFor = (target: ReservedScrollTarget): string | null => {
    if (target === 'percorsi') return SCROLL_LANDMARKS.reservedPercorsi;
    if (target === 'dispense-list') return SCROLL_LANDMARKS.reservedDispenseList;
    if (target === 'dispensa-content')
      return SCROLL_LANDMARKS.reservedDispensaContent;
    return null;
  };

  useEffect(() => {
    const target = pendingScrollRef.current;
    if (!target) return;
    pendingScrollRef.current = null;
    const landmark = scrollLandmarkFor(target);
    if (!landmark) return;
    return scrollToIdAfterPaint(landmark, { behavior: 'smooth' });
  }, [activeCourse?.slug, activeDispensa?.id, activeCourse?.isUnlocked]);

  const selectCourse = (slug: CourseId) => {
    pendingScrollRef.current = 'dispense-list';
    setEnrollMessage(null);
    if (slug === activeCourse?.slug) {
      // Same percorso: still land on the dispense list (mobile).
      scrollToIdAfterPaint(SCROLL_LANDMARKS.reservedDispenseList, {
        behavior: 'smooth',
      });
      return;
    }
    setActiveCourseSlug(slug);
  };

  const selectDispensa = (id: number) => {
    pendingScrollRef.current = 'dispensa-content';
    if (id === activeDispensa?.id) {
      scrollToIdAfterPaint(SCROLL_LANDMARKS.reservedDispensaContent, {
        behavior: 'smooth',
      });
      return;
    }
    setActiveDispensaId(id);
  };

  const goToNextDispensa = () => {
    if (!nextDispensa) return;
    selectDispensa(nextDispensa.id);
  };

  const returnToPercorsi = () => {
    pendingScrollRef.current = 'percorsi';
    // Re-trigger scroll even if course/dispensa ids are unchanged.
    scrollToIdAfterPaint(SCROLL_LANDMARKS.reservedPercorsi, {
      behavior: 'smooth',
    });
  };

  if (authLoading || !user) {
    return (
      <ReservedLoginGate
        authLoading={authLoading}
        authError={authError}
        onSignIn={signInWithGoogle}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="space-y-10 pt-6 md:pt-10 pb-10">
      <CheckoutReturnBanner variant="course" />
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

        <div className="grid grid-cols-2 gap-3 w-full md:w-auto md:min-w-[20rem] shrink-0">
          {overview?.courses.some(
            (c) => c.slug === 'arcani-maggiori' && c.isUnlocked
          ) && (
            <button
              type="button"
              onClick={() => openNinaChat({ mode: 'studio' })}
              className="col-span-2 w-full px-3 py-2.5 min-h-[44px] rounded-lg border border-[#D4AF37]/45 bg-[#D4AF37]/12 hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 text-xs md:text-sm font-medium text-[#F4F1EA] inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" aria-hidden />
              Apri Nina Studio
              <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden />
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigate('corsi')}
            className="w-full px-3 py-2.5 min-h-[44px] rounded-lg border border-[#D4AF37]/30 bg-[#12100E]/55 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs md:text-sm font-medium text-[#F4F1EA] inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            Esplora Corsi
          </button>
          <button
            type="button"
            onClick={logout}
            className="w-full px-3 py-2.5 min-h-[44px] rounded-lg border border-[#D4AF37]/30 bg-[#12100E]/55 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs md:text-sm font-medium text-[#F4F1EA] inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <LogOut className="w-4 h-4 text-[#D4AF37] shrink-0" />
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
            aria-selected={activeTab === 'appunti'}
            onClick={() => setActiveTab('appunti')}
            className={`px-4 py-2 min-h-[40px] rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'appunti'
                ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                : 'text-[#A39B93] hover:text-[#F4F1EA]'
            }`}
          >
            Appunti
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

      {activeTab === 'appunti' ? (
        <ReservedNotesPanel getIdToken={getIdToken} />
      ) : loadingData && !overview ? (
        <div className="glass-tier-1 rounded-2xl p-10 text-center text-sm text-[#A39B93]">
          Caricamento dei percorsi e delle dispense riservate...
        </div>
      ) : !overview ? (
        <div className="glass-tier-1 rounded-2xl p-10 text-center space-y-4">
          <p className="text-sm text-[#A39B93]">
            I contenuti riservati non sono ancora disponibili.
          </p>
          <button
            type="button"
            onClick={loadOverview}
            className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37] text-[#12100E] text-xs font-semibold"
          >
            Ricarica Area Riservata
          </button>
        </div>
      ) : activeTab === 'dispense' && activeCourse ? (
        <div className="space-y-8">
          {/* Course Selector Strip */}
          <div
            id={SCROLL_LANDMARKS.reservedPercorsi}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))]"
          >
            {overview.courses.map((course, idx) => {
              const isSelected = course.slug === activeCourse.slug;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => selectCourse(course.slug)}
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
              <aside
                id={SCROLL_LANDMARKS.reservedDispenseList}
                className="lg:col-span-4 space-y-3 scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))]"
              >
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
                        onClick={() => selectDispensa(dispensa.id)}
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

                {/* ENN-106 — Maggiori only; not in public nav */}
                {activeCourse.slug === 'arcani-maggiori' && (
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate('approfondimenti-terzo-settenario')
                    }
                    className="w-full text-left rounded-xl p-4 border border-[#D4AF37]/30 bg-[#D4AF37]/08 hover:border-[#D4AF37] hover:bg-[#D4AF37]/14 transition-all space-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-semibold uppercase tracking-[0.08em]">
                        Approfondimenti
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#F4F1EA]">
                      Approfondimenti Terzo Settenario
                    </p>
                    <p className="text-xs text-[#A39B93]">
                      Nodi pratici · XV–XXI · Sintesi per il consultante
                    </p>
                  </button>
                )}
              </aside>

              {/* Right Column: Dispensa Content + Study Notes */}
              {activeDispensa && (
                <article
                  id={SCROLL_LANDMARKS.reservedDispensaContent}
                  className="notranslate lg:col-span-8 glass-tier-1 rounded-2xl p-6 md:p-8 space-y-6 scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))]"
                  translate="no"
                >
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
                      {activeCourse.slug === 'arcani-maggiori' &&
                        activeDispensa.moduleNumber === '01' &&
                        onOpenBlogPost && (
                          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-3 pt-1">
                            <button
                              type="button"
                              onClick={() =>
                                onOpenBlogPost(MAGGIORI_MODULO_01_BLOG_SLUG)
                              }
                              className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium text-[#D4AF37] transition-colors hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
                            >
                              <BookOpen
                                className="w-3.5 h-3.5"
                                aria-hidden="true"
                              />
                              Blog · Il Matto
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                onOpenBlogPost(MAGGIORI_BAGATTO_BLOG_SLUG)
                              }
                              className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium text-[#D4AF37] transition-colors hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
                            >
                              <BookOpen
                                className="w-3.5 h-3.5"
                                aria-hidden="true"
                              />
                              Blog · Il Bagatto
                            </button>
                          </div>
                        )}
                    </div>

                    <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0">
                      {activeCourse.slug === 'arcani-maggiori' && (
                        <MaterialsLanguagePicker />
                      )}
                      <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          void handleDownloadDispensa(
                            activeCourse.title,
                            activeDispensa,
                            activeCourse.slug
                          )
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

                  {/* Formatted Dispensa Body (+ inline sigilli, e.g. Il Matto) */}
                  <FormattedDispensaBody
                    markdown={activeDispensa.contentMarkdown}
                    embeds={dispensaFlashcardEmbeds}
                  />

                  {activeFlashcardDeck && (
                    <>
                      <div className="gold-divider" aria-hidden="true" />
                      <DispensaFlashcards deck={activeFlashcardDeck} />
                    </>
                  )}

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

                  <div className="gold-divider" aria-hidden="true" />

                  {/* End-of-module: next dispensa or back to percorsi */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <p className="text-xs text-[#A39B93]">
                      {nextDispensa
                        ? `Fine modulo ${activeDispensa.moduleNumber}. Continua con la dispensa successiva.`
                        : `Ultimo modulo del percorso ${activeCourse.title}.`}
                    </p>
                    {nextDispensa ? (
                      <button
                        type="button"
                        onClick={goToNextDispensa}
                        className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
                      >
                        Prosegui a dispensa {nextDispensa.moduleNumber}
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={returnToPercorsi}
                        className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/18 text-[#F4F1EA] text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                      >
                        Torna ai percorsi
                        <ArrowRight className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                      </button>
                    )}
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
                    Completa i tuoi dati e prosegui al checkout Stripe: le 4 dispense si sbloccano solo dopo pagamento verificato.
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
                      ? 'Preparazione checkout...'
                      : `Paga e sblocca (€ ${activeCourse.priceEur})`}
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

          {overview?.dialoguePasses && overview.dialoguePasses.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-lg text-[#F4F1EA]">
                  Pass a Tempo Dialogo Tarot Acquistati
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate('chat')}
                  className="text-xs font-semibold text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1"
                >
                  Apri Dialogo Tarot
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {overview.dialoguePasses.map((pass) => {
                  const isActive = new Date(pass.expiresAt).getTime() > Date.now();
                  return (
                    <article
                      key={pass.id}
                      className="glass-tier-1 rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#D4AF37] tabular-nums">
                          Pass {pass.durationMinutes} min
                        </span>
                        <span className="text-[#E6C65C]">
                          {isActive ? 'Attivo' : 'Concluso'}
                        </span>
                      </div>
                      <p className="font-display text-base text-[#F4F1EA] tabular-nums">
                        € {pass.priceEur}
                      </p>
                      <p className="text-xs text-[#A39B93] tabular-nums">
                        Scadenza: {new Date(pass.expiresAt).toLocaleString('it-IT')}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
