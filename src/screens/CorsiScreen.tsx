import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  CreditCard,
  Eye,
  Layers,
  Lock,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import type { CourseId, StripeCheckoutHandoffPayload } from '../types/handoff';
import { siteContent } from '../data/siteContent';
import { useLocalizedCourses } from '../i18n/useLocalizedCatalog';
import { CopyText } from '../components/CopyText';
import { ResilientImage } from '../components/ResilientImage';
import { COURSE_SECTION_IMAGES } from '../data/sectionImages';
import { MaggioriMattoPreview } from '../components/corsi/MaggioriMattoPreview';
import { MinorArcanaSuitsPlate, SpreadGeometryExplorer } from '../components/CourseVisuals';
import { PaymentTrustCues } from '../components/PaymentTrustCues';
import { useAuth } from '../context/AuthContext';
import {
  isValidEmail,
  isValidFullName,
  isValidPhone,
} from '../lib/formValidation';
import {
  SCROLL_LANDMARKS,
  scrollToElement,
  scrollToIdAfterPaint,
} from '../lib/scrollNavigation';
import { whatsappHref } from '../lib/siteContacts';

interface CorsiScreenProps {
  showCmsKeys: boolean;
  selectedCourseId: CourseId;
  onChangeCourseId: (id: CourseId) => void;
  onOpenChat: () => void;
  onOpenReservedArea: () => void;
  /** ENN-131 — Modulo 01 gated blog companion (Il Matto) */
  onOpenMaggioriModuloBlog?: () => void;
  /** ENN-133 — Il Bagatto gated blog companion */
  onOpenMaggioriBagattoBlog?: () => void;
}

export function CorsiScreen({
  showCmsKeys,
  selectedCourseId,
  onChangeCourseId,
  onOpenChat,
  onOpenReservedArea,
  onOpenMaggioriModuloBlog,
  onOpenMaggioriBagattoBlog,
}: CorsiScreenProps) {
  const { user, signInWithGoogle, getIdToken } = useAuth();
  const educationalCourses = useLocalizedCourses();
  const activeCourse =
    educationalCourses.find((c) => c.id === selectedCourseId) ??
    educationalCourses[0];

  const [fullName, setFullName] = useState(user?.displayName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phoneWhatsApp, setPhoneWhatsApp] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [enrolling, setEnrolling] = useState(false);
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [checkoutPayload, setCheckoutPayload] =
    useState<StripeCheckoutHandoffPayload | null>(null);
  /** Hover / tap reveal for “didattica in arrivo” on catalog cards */
  const [soonRevealedId, setSoonRevealedId] = useState<CourseId | null>(null);

  const checkoutSectionRef = useRef<HTMLElement | null>(null);
  const workbenchSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (user) {
      setFullName((prev) => prev || user.displayName || '');
      setEmail((prev) => prev || user.email || '');
    }
  }, [user]);

  useEffect(() => {
    setCheckoutPayload(null);
    setEnrolledSuccess(false);
    setEnrollError(null);
  }, [selectedCourseId]);

  const handleExploreCourse = (courseId: CourseId) => {
    onChangeCourseId(courseId);
    scrollToElement(workbenchSectionRef.current, { behavior: 'smooth' });
  };

  const handleEnrollCourse = (courseId: CourseId) => {
    onChangeCourseId(courseId);
    scrollToElement(checkoutSectionRef.current, { behavior: 'smooth' });
  };

  /** ENN-129 — open Modulo 01 anteprima (account-parity Dispensa reader). */
  const handleMaggioriMattoPreview = () => {
    onChangeCourseId('arcani-maggiori');
    // Preview mounts only when Maggiori is the active workbench course.
    // Settle retries cover remount + GT layout shift (ENN-149).
    scrollToIdAfterPaint(SCROLL_LANDMARKS.corsiMaggioriPreview, {
      behavior: 'smooth',
    });
  };

  const handlePrepareCourseCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!isValidFullName(fullName)) {
      errors.fullName = 'Inserisci il tuo nome e cognome.';
    }
    if (!isValidEmail(email)) {
      errors.email = 'Inserisci un indirizzo email valido per ricevere l’accesso.';
    }
    if (!isValidPhone(phoneWhatsApp)) {
      errors.phoneWhatsApp = 'Inserisci un recapito telefonico o WhatsApp.';
    }
    if (!termsAccepted) {
      errors.termsAccepted =
        'Conferma le condizioni formative e la presa visione dell’approccio etico.';
    }

    setFormErrors(errors);
    setEnrollError(null);
    if (Object.keys(errors).length > 0) return;

    const payload: StripeCheckoutHandoffPayload = {
      provider: 'stripe_checkout',
      mode: 'payment',
      priceId: activeCourse.stripePriceIdAnnotation,
      amountEur: activeCourse.priceEur,
      currency: 'EUR',
      customerEmail: email.trim(),
      firebaseUserId: user?.uid ?? '<AUTH_UID_FROM_SESSION>',
      metadata: {
        itemType: 'course',
        practitioner: 'Maria Teresa Rogani',
        courseId: activeCourse.id,
        courseTitle: activeCourse.title,
        phoneWhatsApp: phoneWhatsApp.trim(),
        deontologyAccepted: termsAccepted,
      },
      successUrlPattern: `/area-riservata?course_stripe_session_id={CHECKOUT_SESSION_ID}`,
      cancelUrlPattern: `/area-riservata?checkout=cancel&item=course&course=${activeCourse.id}`,
    };

    setCheckoutPayload(payload);

    if (!user) {
      setEnrollError(
        'Accedi con Google per avviare il checkout Stripe e attivare il percorso dopo il pagamento.'
      );
      return;
    }

    setEnrolling(true);
    try {
      const token = await getIdToken();
      if (!token) {
        throw new Error('Sessione non valida. Riprova ad accedere.');
      }
      const res = await fetch('/api/reserved/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseSlug: activeCourse.id,
          customerName: fullName.trim(),
          customerPhone: phoneWhatsApp.trim(),
        }),
      });
      const json = (await res.json()) as {
        error?: string;
        mode?: 'stripe_redirect' | 'enrolled' | 'direct_unlock';
        checkoutUrl?: string;
      };
      if (!res.ok) {
        throw new Error(json.error || 'Registrazione percorso non riuscita.');
      }
      if (json.mode === 'stripe_redirect' && json.checkoutUrl) {
        window.location.assign(json.checkoutUrl);
        return;
      }
      setEnrolledSuccess(true);
    } catch (err) {
      setEnrollError(
        err instanceof Error ? err.message : 'Errore durante la registrazione.'
      );
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div
      id={SCROLL_LANDMARKS.corsi}
      className="relative isolate scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] pt-6 md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] md:pt-10 pb-8"
    >
      {/* ENN-125: page fully active — ENN-47 obscure banner + dim overlay removed */}
      <div className="relative z-10 space-y-12 md:space-y-16">
      {/* Header */}
      <header className="space-y-4 max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
          <CopyText entry={siteContent.corsi.kicker} showKeys={showCmsKeys} />
        </p>
        <h1 className="font-display text-[32px] leading-[40px] md:text-[44px] md:leading-[52px] tracking-[0.02em] text-[#F4F1EA] text-balance">
          <CopyText entry={siteContent.corsi.heading} showKeys={showCmsKeys} />
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-[#A39B93]">
          <CopyText entry={siteContent.corsi.subheading} showKeys={showCmsKeys} />
        </p>
      </header>

      {/* 3 Paid Courses Catalog Grid */}
      <section aria-label="Catalogo percorsi didattici a pagamento" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {educationalCourses.map((course) => {
          const isSelected = course.id === activeCourse.id;
          const courseImage = COURSE_SECTION_IMAGES[course.id];
          const soonOpen = soonRevealedId === course.id;
          return (
            <article
              key={course.id}
              onMouseEnter={() => setSoonRevealedId(course.id)}
              onMouseLeave={() => setSoonRevealedId(null)}
              className={`rounded-2xl p-6 md:p-7 flex flex-col justify-between gap-6 transition-all duration-200 ${
                isSelected
                  ? 'glass-tier-2 border-[#D4AF37]/55 shadow-[0_0_28px_rgba(212,175,55,0.14)]'
                  : 'glass-tier-1 hover:border-[#D4AF37]/35'
              }`}
            >
              <div className="space-y-5">
                {/* 4:3 Bespoke Course Visual — hover/tap reveals “didattica in arrivo” */}
                <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#12100E]">
                  <ResilientImage
                    src={courseImage.src}
                    alt={courseImage.alt}
                    className={`w-full aspect-[4/3] object-cover transition-transform duration-500 ease-out ${
                      soonOpen ? 'scale-[1.03]' : ''
                    }`}
                    fallbackLabel={course.title}
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#12100E]/95 via-[#12100E]/55 to-transparent p-4 transition-opacity duration-300 ease-out ${
                      soonOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={!soonOpen}
                  >
                    <p className="font-display text-sm tracking-[0.06em] text-[#D4AF37]">
                      <CopyText
                        entry={siteContent.corsi.soonHoverTitle}
                        showKeys={showCmsKeys}
                      />
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#E8e1dd]">
                      <CopyText
                        entry={siteContent.corsi.soonHoverBody}
                        showKeys={showCmsKeys}
                      />
                    </p>
                  </div>
                  {/* Always-visible badge; tap toggles reveal on touch devices */}
                  <button
                    type="button"
                    aria-expanded={soonOpen}
                    onClick={() =>
                      setSoonRevealedId((prev) =>
                        prev === course.id ? null : course.id
                      )
                    }
                    className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] rounded-md border border-[#D4AF37]/45 bg-[#12100E]/85 px-2.5 py-1.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:border-[#D4AF37]/75 hover:bg-[#12100E]/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
                    aria-label={`${siteContent.corsi.soonBadge.liveText}. ${siteContent.corsi.soonHoverBody.liveText}`}
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#D4AF37]">
                      <CopyText
                        entry={siteContent.corsi.soonBadge}
                        showKeys={showCmsKeys}
                      />
                    </span>
                  </button>
                </div>

                {/* Quiet unboxed metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    {course.orderLabel}
                  </span>
                  <span className="text-[#A39B93] tabular-nums">
                    {course.id === 'arcani-maggiori'
                      ? `${course.lessonsCount} moduli · ${course.totalHours}`
                      : `${course.lessonsCount} lezioni · ${course.totalHours}`}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-body font-semibold tracking-[-0.02em] text-xl md:text-2xl text-[#F4F1EA]">
                    {showCmsKeys ? (
                      <CopyText
                        entry={{ cmsKey: course.cmsKeyTitle, liveText: course.title }}
                        showKeys={true}
                      />
                    ) : (
                      course.title
                    )}
                  </h2>
                  <p className="text-xs font-medium text-[#D4AF37]/90">
                    {showCmsKeys ? (
                      <CopyText
                        entry={{ cmsKey: course.cmsKeySubtitle, liveText: course.subtitle }}
                        showKeys={true}
                      />
                    ) : (
                      course.subtitle
                    )}
                  </p>
                </div>

                {/* Price row */}
                <div className="py-3 border-y border-[#D4AF37]/15 flex items-baseline justify-between gap-2">
                  <span className="font-display text-3xl text-[#F4F1EA] tabular-nums">
                    € {course.priceEur}
                  </span>
                  <span className="text-xs text-[#A39B93] text-right">
                    Accesso perpetuo · IVA incl.
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#A39B93]">
                  {showCmsKeys ? (
                    <CopyText
                      entry={{ cmsKey: course.cmsKeyDesc, liveText: course.description }}
                      showKeys={true}
                    />
                  ) : (
                    course.description
                  )}
                </p>

                <ul className="space-y-2.5 pt-1">
                  {course.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs md:text-sm text-[#E8e1dd]"
                    >
                      <Check
                        className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => handleEnrollCourse(course.id)}
                  className={`cta-label cta-label w-full min-h-[46px] px-5 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C] ${
                    isSelected || course.recommended
                      ? 'bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] hover:shadow-[0_0_16px_rgba(212,175,55,0.3)]'
                      : 'bg-[#D4AF37]/10 border border-[#D4AF37]/35 hover:bg-[#D4AF37] hover:text-[#12100E] text-[#F4F1EA]'
                  }`}
                >
                  Iscriviti al Percorso (€ {course.priceEur})
                  <ArrowRight className="w-4 h-4" />
                </button>

                {course.id === 'arcani-maggiori' ? (
                  <PaymentTrustCues compact />
                ) : null}

                {course.id === 'arcani-maggiori' && (
                  <button
                    type="button"
                    onClick={handleMaggioriMattoPreview}
                    className="w-full min-h-[42px] px-4 py-2 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-2 border border-[#D4AF37]/40 text-[#E6C65C] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/18 hover:border-[#D4AF37]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    Anteprima gratuita · Modulo 01
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleExploreCourse(course.id)}
                  className={`w-full min-h-[42px] px-4 py-2 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-2 border transition-colors ${
                    isSelected
                      ? 'border-[#D4AF37]/45 text-[#E6C65C] bg-[#D4AF37]/8'
                      : 'border-[#D4AF37]/20 text-[#A39B93] hover:text-[#F4F1EA] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {isSelected ? 'Programma selezionato sotto' : 'Esplora Programma e Anteprima'}
                </button>

                <p className="text-[11px] font-mono text-[#A39B93]/80 text-center truncate">
                  Stripe Price Key: {course.stripePriceIdAnnotation}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* Interactive Syllabus + Visual Workbench.
          Maggiori (ENN-129): account-parity Dispensa 01 reader (truncated after Il Matto). */}
      <section
        id={SCROLL_LANDMARKS.corsiWorkbench}
        ref={workbenchSectionRef}
        aria-labelledby="workbench-heading"
        className="glass-tier-1 rounded-2xl p-6 md:p-8 space-y-8 scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))]"
      >
        {/* Interactive Pillar Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-6">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              {activeCourse.id === 'arcani-maggiori'
                ? 'Anteprima Dispensa · Area Personale'
                : 'Programma Dettagliato & Laboratorio Visivo'}
            </p>
            <h2
              id="workbench-heading"
              className="font-body font-semibold tracking-[-0.02em] text-2xl md:text-[28px] text-[#F4F1EA]"
            >
              {activeCourse.orderLabel.split('·')[0].trim()}. {activeCourse.title}
            </h2>
            <p className="text-xs md:text-sm text-[#A39B93]">
              {activeCourse.id === 'arcani-maggiori'
                ? 'Stessa UI dell’Area Personale · Modulo 01 fino a Il Matto'
                : `${activeCourse.levelLabel} · ${activeCourse.formatLabel}`}
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2 p-1 rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/20"
            role="tablist"
            aria-label="Seleziona percorso didattico"
          >
            {educationalCourses.map((c, idx) => {
              const current = c.id === activeCourse.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={current}
                  onClick={() => onChangeCourseId(c.id)}
                  className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    current
                      ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                      : 'text-[#A39B93] hover:text-[#F4F1EA]'
                  }`}
                >
                  {idx + 1}) {c.title}
                </button>
              );
            })}
          </div>
        </div>

        {activeCourse.id === 'arcani-maggiori' ? (
          <MaggioriMattoPreview
            priceEur={
              educationalCourses.find((c) => c.id === 'arcani-maggiori')
                ?.priceEur ?? 190
            }
            onEnroll={() => handleEnrollCourse('arcani-maggiori')}
            onOpenModuloBlog={onOpenMaggioriModuloBlog}
            onOpenBagattoBlog={onOpenMaggioriBagattoBlog}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                <Layers className="w-4 h-4" aria-hidden="true" />
                <span>Struttura in 4 Moduli</span>
              </div>

              <div className="space-y-3">
                {activeCourse.modules.map((mod) => (
                  <div
                    key={mod.number}
                    className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/18 p-4 md:p-5 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-display text-[#D4AF37] tabular-nums">
                        Modulo {mod.number}
                      </span>
                      <span className="text-[#A39B93] inline-flex items-center gap-1 tabular-nums">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]/80" />
                        {mod.duration}
                      </span>
                    </div>
                    <h3 className="font-display text-base md:text-lg text-[#F4F1EA]">
                      {mod.title}
                    </h3>
                    <p className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
                      {mod.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                <span>Anteprima Didattica Interattiva</span>
                <span className="text-[#A39B93] font-normal normal-case">
                  {activeCourse.id === 'arcani-minori'
                    ? 'Atlante dei 4 Semi'
                    : 'Schemi di Stesa'}
                </span>
              </div>

              {activeCourse.id === 'arcani-minori' && <MinorArcanaSuitsPlate />}

              {activeCourse.id === 'metodi-stesura' && (
                <SpreadGeometryExplorer />
              )}
            </div>
          </div>
        )}
      </section>

      {/* Paid Course Enrollment & Stripe Checkout Handoff */}
      <section
        id={SCROLL_LANDMARKS.corsiCheckout}
        ref={checkoutSectionRef}
        aria-labelledby="course-checkout-heading"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))]"
      >
        <form
          onSubmit={handlePrepareCourseCheckout}
          noValidate
          className="lg:col-span-8 glass-tier-1 rounded-2xl p-6 md:p-8 space-y-6"
        >
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Iscrizione &amp; Pagamento Sicuro
            </p>
            <h2
              id="course-checkout-heading"
              className="font-body font-semibold tracking-[-0.02em] text-xl md:text-2xl text-[#F4F1EA]"
            >
              Acquista il Percorso: {activeCourse.title}
            </h2>
            <p className="text-sm text-[#A39B93]">
              Inserisci i tuoi dati per generare la sessione Stripe Checkout e attivare il tuo profilo corsista (Firebase Auth + Postgres).
            </p>
          </div>

          {/* Quick switcher inside checkout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {educationalCourses.map((course, idx) => {
              const selected = course.id === activeCourse.id;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => onChangeCourseId(course.id)}
                  aria-pressed={selected}
                  className={`p-3 rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    selected
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37]'
                      : 'bg-[#12100E]/65 border-[#D4AF37]/18 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <p className="text-[11px] text-[#D4AF37] font-semibold">
                    0{idx + 1}. Percorso
                  </p>
                  <p className="font-display text-sm text-[#F4F1EA] mt-0.5 truncate">
                    {course.title}
                  </p>
                  <p className="text-xs text-[#A39B93] tabular-nums mt-0.5">
                    € {course.priceEur}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="course-fullname"
                className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
              >
                Nome e Cognome *
              </label>
              <input
                id="course-fullname"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setCheckoutPayload(null);
                }}
                placeholder="Es. Marco Bellini"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
              />
              {formErrors.fullName && (
                <p className="text-xs text-[#ffb4ab]">{formErrors.fullName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="course-email"
                className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
              >
                Email per accesso area corsisti *
              </label>
              <input
                id="course-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setCheckoutPayload(null);
                }}
                placeholder="nome@esempio.it"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
              />
              {formErrors.email && (
                <p className="text-xs text-[#ffb4ab]">{formErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="course-phone"
                className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
              >
                Telefono / WhatsApp *
              </label>
              <input
                id="course-phone"
                type="tel"
                value={phoneWhatsApp}
                onChange={(e) => {
                  setPhoneWhatsApp(e.target.value);
                  setCheckoutPayload(null);
                }}
                placeholder="+39 333 000 0000"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
              />
              {formErrors.phoneWhatsApp && (
                <p className="text-xs text-[#ffb4ab]">{formErrors.phoneWhatsApp}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="course-goal"
                className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
              >
                Livello attuale (facoltativo)
              </label>
              <input
                id="course-goal"
                type="text"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                placeholder="Es. Principiante / Lettura personale"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
              />
            </div>
          </div>

          {/* Consent checkbox */}
          <div className="space-y-1.5">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <button
                type="button"
                role="checkbox"
                aria-checked={termsAccepted}
                onClick={() => {
                  setTermsAccepted((prev) => !prev);
                  setCheckoutPayload(null);
                }}
                className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  termsAccepted
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#12100E]'
                    : 'bg-[#12100E]/85 border-[#D4AF37]/40'
                }`}
              >
                {termsAccepted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
              <span className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
                Confermo l’iscrizione al percorso formativo digitale Tarot Italia nel rispetto dei principi deontologici di Maria Teresa Rogani (L. 4/2013) e delle norme sulla privacy.
              </span>
            </label>
            {formErrors.termsAccepted && (
              <p className="text-xs text-[#ffb4ab]">{formErrors.termsAccepted}</p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 text-xs text-[#A39B93] flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <CopyText entry={siteContent.corsi.checkoutNote} showKeys={showCmsKeys} />
            </p>
          </div>

          {enrollError && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-[#93000a]/25 border border-[#ffb4ab]/35 text-xs text-[#ffb4ab]"
            >
              {enrollError}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenChat}
                className="px-4 py-2.5 min-h-[44px] rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs md:text-sm font-medium text-[#F4F1EA]"
              >
                Chiedi nel Dialogo Tarot
              </button>
              {!user && (
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="px-4 py-2.5 min-h-[44px] rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-xs font-medium text-[#E6C65C]"
                >
                  Accedi con Google per Sbloccare
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={enrolling}
              className="cta-label px-6 py-3 min-h-[46px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <CreditCard className="w-4 h-4" />
              {enrolling
                ? 'Registrazione in corso...'
                : user
                  ? `Vai al pagamento Stripe (€ ${activeCourse.priceEur})`
                  : `Accedi e paga il corso (€ ${activeCourse.priceEur})`}
            </button>
          </div>

          <PaymentTrustCues />

          {checkoutPayload && (
            <div className="mt-4 rounded-xl bg-[#12100E]/90 border border-[#D4AF37]/45 p-5 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  {enrolledSuccess
                    ? 'Percorso Sbloccato nella Tua Area Riservata'
                    : 'Payload Iscrizione Stripe Checkout Pronto'}
                </p>
                <h3 className="font-display text-lg text-[#F4F1EA] mt-1">
                  {enrolledSuccess
                    ? `${activeCourse.title} attivo per ${fullName}`
                    : `Handoff per ${fullName} · ${activeCourse.title}`}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-[#A39B93] leading-relaxed">
                {enrolledSuccess
                  ? 'Le 4 dispense formulate di questo percorso sono ora disponibili nel tuo spazio personale protetto.'
                  : 'Accedi con Google sopra oppure completa il checkout per attivare l’accesso permanente alle 4 dispense nell’Area Riservata.'}
              </p>
              {!enrolledSuccess && (
                <pre className="p-3.5 rounded-lg bg-[#151311] border border-[#D4AF37]/15 text-[11px] font-mono text-[#E6C65C] overflow-x-auto">
                  {JSON.stringify(checkoutPayload, null, 2)}
                </pre>
              )}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenReservedArea}
                  className="cta-label px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-xs font-semibold text-[#12100E] inline-flex items-center gap-2"
                >
                  Apri Area Riservata e Dispense
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={whatsappHref(
                    `Buongiorno Maria Teresa, desidero iscrivermi al percorso didattico "${activeCourse.title}" (€ ${activeCourse.priceEur}). Nome: ${fullName}, Email: ${email}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-label px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37]/12 border border-[#D4AF37]/35 hover:border-[#D4AF37] text-xs font-semibold text-[#F4F1EA] inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  Invia Iscrizione su WhatsApp
                </a>
              </div>
            </div>
          )}
        </form>

        {/* Sticky Course Summary */}
        <aside className="lg:col-span-4 glass-tier-1 rounded-2xl p-6 space-y-5 lg:sticky lg:top-24">
          <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#12100E]">
            <ResilientImage
              src={COURSE_SECTION_IMAGES[activeCourse.id].src}
              alt={COURSE_SECTION_IMAGES[activeCourse.id].alt}
              className="w-full aspect-[4/3] object-cover"
              fallbackLabel={activeCourse.title}
            />
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Riepilogo Percorso Scelto
            </p>
            <h3 className="font-display text-xl text-[#F4F1EA]">
              {activeCourse.title}
            </h3>
            <p className="text-xs text-[#A39B93]">{activeCourse.subtitle}</p>
          </div>

          <div className="gold-divider" aria-hidden="true" />

          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-[#A39B93]">Contenuti</dt>
              <dd className="text-[#F4F1EA] font-medium tabular-nums">
                {activeCourse.id === 'arcani-maggiori'
                  ? `${activeCourse.lessonsCount} moduli (${activeCourse.totalHours})`
                  : `${activeCourse.lessonsCount} lezioni (${activeCourse.totalHours})`}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-[#A39B93]">Livello</dt>
              <dd className="text-[#F4F1EA] font-medium">{activeCourse.levelLabel}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-[#A39B93] shrink-0">Materiali</dt>
              <dd className="text-[#F4F1EA] font-medium text-right">
                {activeCourse.formatLabel}
              </dd>
            </div>
          </dl>

          <div className="gold-divider" aria-hidden="true" />

          <div className="flex items-baseline justify-between">
            <span className="text-sm text-[#A39B93]">Quota di iscrizione</span>
            <span className="font-display text-2xl text-[#D4AF37] tabular-nums">
              € {activeCourse.priceEur}
            </span>
          </div>

          <div className="pt-2 flex items-start gap-2.5 text-xs text-[#A39B93]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              Accesso illimitato nel tempo ai materiali didattici e attestato di partecipazione olistica rilasciato da Tarot Italia.
            </p>
          </div>

          <PaymentTrustCues />
        </aside>
      </section>
      </div>
    </div>
  );
}
