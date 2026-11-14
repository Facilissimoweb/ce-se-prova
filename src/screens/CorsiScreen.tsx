import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  CreditCard,
  Layers,
  Lock,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import type { CourseId, StripeCheckoutHandoffPayload } from '../types/handoff';
import { educationalCourses, siteContent } from '../data/siteContent';
import { MAJOR_ARCANA } from '../data/majorArcana';
import { CopyText } from '../components/CopyText';
import { MajorArcanaArtwork } from '../components/MajorArcanaArtwork';
import { ResilientImage } from '../components/ResilientImage';
import { COURSE_SECTION_IMAGES } from '../data/sectionImages';
import { MinorArcanaSuitsPlate, SpreadGeometryExplorer } from '../components/CourseVisuals';
import { useAuth } from '../context/AuthContext';
import {
  isValidEmail,
  isValidFullName,
  isValidPhone,
} from '../lib/formValidation';

interface CorsiScreenProps {
  showCmsKeys: boolean;
  selectedCourseId: CourseId;
  onChangeCourseId: (id: CourseId) => void;
  onOpenChat: () => void;
  onOpenReservedArea: () => void;
}

const SAMPLE_MAJOR_ARCANA = [
  MAJOR_ARCANA[0],
  MAJOR_ARCANA[9],
  MAJOR_ARCANA[17],
  MAJOR_ARCANA[21],
];

export function CorsiScreen({
  showCmsKeys,
  selectedCourseId,
  onChangeCourseId,
  onOpenChat,
  onOpenReservedArea,
}: CorsiScreenProps) {
  const { user, signInWithGoogle, getIdToken } = useAuth();
  const activeCourse =
    educationalCourses.find((c) => c.id === selectedCourseId) ??
    educationalCourses[0];

  const [sampleArcanaIdx, setSampleArcanaIdx] = useState<number>(0);
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
    workbenchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEnrollCourse = (courseId: CourseId) => {
    onChangeCourseId(courseId);
    checkoutSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const activeSampleArcana =
    SAMPLE_MAJOR_ARCANA[sampleArcanaIdx] ?? SAMPLE_MAJOR_ARCANA[0];

  return (
    <div className="space-y-12 md:space-y-16 pt-6 md:pt-10 pb-8">
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
          return (
            <article
              key={course.id}
              className={`rounded-2xl p-6 md:p-7 flex flex-col justify-between gap-6 transition-all duration-200 ${
                isSelected
                  ? 'glass-tier-2 border-[#D4AF37]/55 shadow-[0_0_28px_rgba(212,175,55,0.14)]'
                  : 'glass-tier-1 hover:border-[#D4AF37]/35'
              }`}
            >
              <div className="space-y-5">
                {/* 4:3 Bespoke Course Visual */}
                <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#12100E]">
                  <ResilientImage
                    src={courseImage.src}
                    alt={courseImage.alt}
                    className="w-full aspect-[4/3] object-cover"
                    fallbackLabel={course.title}
                  />
                </div>

                {/* Quiet unboxed metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    {course.orderLabel}
                  </span>
                  <span className="text-[#A39B93] tabular-nums">
                    {course.lessonsCount} lezioni · {course.totalHours}
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
                  className={`w-full min-h-[46px] px-5 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C] ${
                    isSelected || course.recommended
                      ? 'bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] hover:shadow-[0_0_16px_rgba(212,175,55,0.3)]'
                      : 'bg-[#D4AF37]/10 border border-[#D4AF37]/35 hover:bg-[#D4AF37] hover:text-[#12100E] text-[#F4F1EA]'
                  }`}
                >
                  Iscriviti al Percorso (€ {course.priceEur})
                  <ArrowRight className="w-4 h-4" />
                </button>

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

      {/* Interactive Syllabus + Visual Workbench */}
      <section
        ref={workbenchSectionRef}
        aria-labelledby="workbench-heading"
        className="glass-tier-1 rounded-2xl p-6 md:p-8 space-y-8 scroll-mt-20"
      >
        {/* Interactive Pillar Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/15 pb-6">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Programma Dettagliato &amp; Laboratorio Visivo
            </p>
            <h2
              id="workbench-heading"
              className="font-body font-semibold tracking-[-0.02em] text-2xl md:text-[28px] text-[#F4F1EA]"
            >
              {activeCourse.orderLabel.split('·')[0].trim()}. {activeCourse.title}
            </h2>
            <p className="text-xs md:text-sm text-[#A39B93]">
              {activeCourse.levelLabel} · {activeCourse.formatLabel}
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
                  className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
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

        {/* 12-col Split: 4 Modules Syllabus + Domain Visual Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Structured 4-module curriculum */}
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

          {/* Right: Interactive Domain Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              <span>Anteprima Didattica Interattiva</span>
              <span className="text-[#A39B93] font-normal normal-case">
                {activeCourse.id === 'arcani-maggiori'
                  ? 'Estratto dal Modulo 01–04'
                  : activeCourse.id === 'arcani-minori'
                    ? 'Atlante dei 4 Semi'
                    : 'Schemi di Stesa'}
              </span>
            </div>

            {activeCourse.id === 'arcani-maggiori' && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2.5">
                  {SAMPLE_MAJOR_ARCANA.map((card, idx) => {
                    const current = idx === sampleArcanaIdx;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setSampleArcanaIdx(idx)}
                        aria-pressed={current}
                        className={`rounded-xl p-2 border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                          current
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37]'
                            : 'bg-[#12100E]/75 border-[#D4AF37]/20 hover:border-[#D4AF37]/45'
                        }`}
                      >
                        <MajorArcanaArtwork
                          number={card.number}
                          numeral={card.numeral}
                          name={card.name}
                          className="w-full h-auto rounded"
                        />
                        <p className="mt-1.5 text-[11px] font-display text-center text-[#F4F1EA] truncate">
                          {card.numeral}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-xl bg-[#12100E]/80 border border-[#D4AF37]/20 p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg text-[#F4F1EA]">
                      {activeSampleArcana.numeral} · {activeSampleArcana.name}
                    </h3>
                    <span className="text-xs text-[#D4AF37]">
                      {activeSampleArcana.element}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-[#E8e1dd] leading-relaxed">
                    <strong className="text-[#D4AF37] font-medium">Lettura del Presente:</strong>{' '}
                    {activeSampleArcana.synthesis}
                  </p>
                  <p className="text-xs md:text-sm text-[#A39B93] leading-relaxed">
                    <strong className="text-[#F4F1EA] font-medium">Direzione Previsionale:</strong>{' '}
                    {activeSampleArcana.futureTendency}
                  </p>
                </div>
              </div>
            )}

            {activeCourse.id === 'arcani-minori' && <MinorArcanaSuitsPlate />}

            {activeCourse.id === 'metodi-stesura' && <SpreadGeometryExplorer />}
          </div>
        </div>
      </section>

      {/* Paid Course Enrollment & Stripe Checkout Handoff */}
      <section
        ref={checkoutSectionRef}
        aria-labelledby="course-checkout-heading"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-20"
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
                className="px-4 py-2.5 min-h-[44px] rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs md:text-sm font-medium text-[#F4F1EA] whitespace-nowrap"
              >
                Chiedi nel Dialogo Tarot
              </button>
              {!user && (
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="px-4 py-2.5 min-h-[44px] rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-xs font-medium text-[#E6C65C] whitespace-nowrap"
                >
                  Accedi con Google per Sbloccare
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={enrolling}
              className="px-6 py-3 min-h-[46px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <CreditCard className="w-4 h-4" />
              {enrolling
                ? 'Registrazione in corso...'
                : user
                  ? `Vai al pagamento Stripe (€ ${activeCourse.priceEur})`
                  : `Accedi e paga il corso (€ ${activeCourse.priceEur})`}
            </button>
          </div>

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
                  className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-xs font-semibold text-[#12100E] inline-flex items-center gap-2 whitespace-nowrap"
                >
                  Apri Area Riservata e Dispense
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`https://wa.me/390000000000?text=${encodeURIComponent(
                    `Buongiorno Maria Teresa, desidero iscrivermi al percorso didattico "${activeCourse.title}" (€ ${activeCourse.priceEur}). Nome: ${fullName}, Email: ${email}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37]/12 border border-[#D4AF37]/35 hover:border-[#D4AF37] text-xs font-semibold text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
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
                {activeCourse.lessonsCount} lezioni ({activeCourse.totalHours})
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-[#A39B93]">Livello</dt>
              <dd className="text-[#F4F1EA] font-medium">{activeCourse.levelLabel}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-[#A39B93] shrink-0">Materiali</dt>
              <dd className="text-[#F4F1EA] font-medium text-right">
                Video HD + Dispense PDF + Sessione Q&amp;A
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
        </aside>
      </section>
    </div>
  );
}
