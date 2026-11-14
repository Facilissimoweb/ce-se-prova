import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  Clock,
  CreditCard,
  Lock,
  MessageCircle,
} from 'lucide-react';
import type {
  BookingDraft,
  ConsultationTariff,
  StripeCheckoutHandoffPayload,
} from '../types/handoff';
import {
  bookingTimeSlots,
  consultationTariffs,
  siteContent,
} from '../data/siteContent';
import { CopyText } from '../components/CopyText';
import { BookingCalendar } from '../components/booking/BookingCalendar';
import { useAuth } from '../context/AuthContext';
import {
  buildCalendarCells,
  formatItalianDate,
  getNextAvailableDate,
  toIsoDate,
} from '../lib/bookingCalendar';
import {
  isValidEmail,
  isValidFullName,
  isValidPhone,
} from '../lib/formValidation';

interface BookingScreenProps {
  showCmsKeys: boolean;
  selectedTariffId: ConsultationTariff['id'];
  onChangeTariffId: (id: ConsultationTariff['id']) => void;
  onOpenChat: () => void;
}

export function BookingScreen({
  showCmsKeys,
  selectedTariffId,
  onChangeTariffId,
  onOpenChat,
}: BookingScreenProps) {
  const { user, getIdToken } = useAuth();
  const initialDate = useMemo(() => getNextAvailableDate(), []);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    () => new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );

  const [draft, setDraft] = useState<BookingDraft>({
    tariffId: selectedTariffId,
    selectedDateIso: toIsoDate(initialDate),
    selectedTimeSlot: '11:00',
    fullName: user?.displayName ?? '',
    email: user?.email ?? '',
    phoneWhatsApp: '',
    sessionIntent: '',
    deontologyAccepted: false,
  });

  // Sync external tariff selection when navigating from Consulti
  React.useEffect(() => {
    setDraft((prev) => ({ ...prev, tariffId: selectedTariffId }));
  }, [selectedTariffId]);

  React.useEffect(() => {
    if (user) {
      setDraft((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingSaved, setBookingSaved] = useState(false);
  const [handoffPayload, setHandoffPayload] =
    useState<StripeCheckoutHandoffPayload | null>(null);

  const activeTariff =
    consultationTariffs.find((t) => t.id === draft.tariffId) ??
    consultationTariffs[1];

  const todayZero = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const calendarCells = useMemo(
    () => buildCalendarCells(calendarMonth, todayZero),
    [calendarMonth, todayZero]
  );

  const handleMonthShift = (delta: number) => {
    setCalendarMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
    );
  };

  const handleTariffPick = (id: ConsultationTariff['id']) => {
    onChangeTariffId(id);
    setDraft((prev) => ({ ...prev, tariffId: id }));
    setHandoffPayload(null);
  };

  const validateAndPrepareCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!isValidFullName(draft.fullName)) {
      errors.fullName = 'Inserisci il tuo nome e cognome.';
    }
    if (!isValidEmail(draft.email)) {
      errors.email = 'Inserisci un indirizzo email valido.';
    }
    if (!isValidPhone(draft.phoneWhatsApp)) {
      errors.phoneWhatsApp = 'Inserisci un recapito telefonico o WhatsApp.';
    }
    if (!draft.deontologyAccepted) {
      errors.deontologyAccepted =
        'Conferma la presa visione del codice deontologico per procedere.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const token = user ? await getIdToken() : null;
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          tariffId: activeTariff.id,
          durationMinutes: activeTariff.durationMinutes,
          priceEur: activeTariff.priceEur,
          scheduledDate: draft.selectedDateIso,
          scheduledTime: draft.selectedTimeSlot,
          fullName: draft.fullName.trim(),
          email: draft.email.trim(),
          phoneWhatsApp: draft.phoneWhatsApp.trim(),
          sessionIntent: draft.sessionIntent.trim(),
          deontologyAccepted: draft.deontologyAccepted,
        }),
      });
      if (res.ok) {
        setBookingSaved(true);
      }
    } catch {
      // Handoff payload still presented gracefully even if offline
    } finally {
      setSubmitting(false);
    }

    const payload: StripeCheckoutHandoffPayload = {
      provider: 'stripe_checkout',
      mode: 'payment',
      priceId: activeTariff.stripePriceIdAnnotation,
      amountEur: activeTariff.priceEur,
      currency: 'EUR',
      customerEmail: draft.email.trim(),
      firebaseUserId: user?.uid ?? '<AUTH_UID_FROM_SESSION>',
      metadata: {
        itemType: 'consultation',
        practitioner: 'Maria Teresa Rogani',
        tariffId: activeTariff.id,
        durationMinutes: activeTariff.durationMinutes,
        scheduledDate: draft.selectedDateIso,
        scheduledTime: draft.selectedTimeSlot,
        phoneWhatsApp: draft.phoneWhatsApp.trim(),
        deontologyAccepted: draft.deontologyAccepted,
      },
      successUrlPattern: '/prenotazione/conferma?session_id={CHECKOUT_SESSION_ID}',
      cancelUrlPattern: '/prenota?cancelled=true',
    };

    setHandoffPayload(payload);
  };

  const steps: { num: 1 | 2 | 3; label: string }[] = [
    { num: 1, label: '01. Servizio' },
    { num: 2, label: '02. Data e Ora' },
    { num: 3, label: '03. Dati e Checkout' },
  ];

  return (
    <div className="space-y-10 pt-6 md:pt-10 pb-8">
      {/* Header */}
      <header className="space-y-3 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
          Agenda Riservata · Maria Teresa Rogani
        </p>
        <h1 className="font-display text-[32px] leading-[40px] md:text-[42px] md:leading-[50px] tracking-[0.02em] text-[#F4F1EA]">
          <CopyText entry={siteContent.booking.heading} showKeys={showCmsKeys} />
        </h1>
        <p className="text-sm md:text-base text-[#A39B93]">
          <CopyText entry={siteContent.booking.subheading} showKeys={showCmsKeys} />
        </p>
      </header>

      {/* Step Indicator */}
      <nav aria-label="Passaggi prenotazione" className="glass-tier-1 rounded-xl p-1.5 grid grid-cols-3 gap-1.5 max-w-2xl">
        {steps.map((s) => {
          const isActive = step === s.num;
          const isCompleted = step > s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                setHandoffPayload(null);
                setStep(s.num);
              }}
              className={`min-h-[44px] px-3 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap truncate transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isActive
                  ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                  : isCompleted
                    ? 'bg-[#D4AF37]/12 text-[#E6C65C] hover:bg-[#D4AF37]/20'
                    : 'text-[#A39B93] hover:text-[#F4F1EA]'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </nav>

      {/* Main 12-col Split: Interactive Flow + Live Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 glass-tier-1 rounded-2xl p-6 md:p-8">
          {/* STEP 1: Servizio */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="font-body font-semibold tracking-[-0.02em] text-xl md:text-2xl text-[#F4F1EA]">
                  Seleziona la durata del consulto
                </h2>
                <p className="text-sm text-[#A39B93]">
                  Scegli il formato più adatto al momento che stai attraversando.
                </p>
              </div>

              <div className="space-y-3">
                {consultationTariffs.map((tariff) => {
                  const selected = draft.tariffId === tariff.id;
                  return (
                    <button
                      key={tariff.id}
                      type="button"
                      onClick={() => handleTariffPick(tariff.id)}
                      className={`w-full text-left rounded-xl p-4 md:p-5 border transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                        selected
                          ? 'bg-[#D4AF37]/12 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.16)]'
                          : 'bg-[#12100E]/60 border-[#D4AF37]/15 hover:border-[#D4AF37]/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold uppercase tracking-[0.06em]">
                          <span>{tariff.durationMinutes} min</span>
                          <span aria-hidden="true">·</span>
                          <span>{tariff.focusLabel}</span>
                        </div>
                        <p className="font-display text-lg text-[#F4F1EA]">
                          {showCmsKeys ? (
                            <CopyText
                              entry={{ cmsKey: tariff.cmsKeyTitle, liveText: tariff.title }}
                              showKeys={true}
                            />
                          ) : (
                            tariff.title
                          )}
                        </p>
                        <p className="text-xs md:text-sm text-[#A39B93]">
                          {tariff.description}
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                        <span className="font-display text-2xl text-[#F4F1EA] tabular-nums">
                          € {tariff.priceEur}
                        </span>
                        <span
                          className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                            selected
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-[#12100E]'
                              : 'border-[#A39B93]/40'
                          }`}
                          aria-hidden="true"
                        >
                          {selected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-colors"
                >
                  Prosegui a Data e Ora
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Calendario Mensile + Time Slot Picker */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-1">
                <h2 className="font-body font-semibold tracking-[-0.02em] text-xl md:text-2xl text-[#F4F1EA]">
                  Scegli giorno e fascia oraria
                </h2>
                <p className="text-sm text-[#A39B93]">
                  Disponibilità dal lunedì al sabato (orario italiano CET/CEST).
                </p>
              </div>

              <BookingCalendar
                calendarMonth={calendarMonth}
                calendarCells={calendarCells}
                selectedDateIso={draft.selectedDateIso}
                onMonthShift={handleMonthShift}
                onSelectDate={(iso) =>
                  setDraft((prev) => ({ ...prev, selectedDateIso: iso }))
                }
              />

              {/* Time Slot Picker */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Orari disponibili</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {bookingTimeSlots.map((slot) => {
                    const isSelected = draft.selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() =>
                          setDraft((prev) => ({ ...prev, selectedTimeSlot: slot }))
                        }
                        aria-pressed={isSelected}
                        className={`min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium tabular-nums border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                          isSelected
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-[#12100E] font-semibold'
                            : 'bg-[#12100E]/80 border-[#D4AF37]/20 text-[#F4F1EA] hover:border-[#D4AF37]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 min-h-[44px] rounded-lg border border-[#D4AF37]/30 text-sm font-medium text-[#F4F1EA] hover:border-[#D4AF37] inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Indietro
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap"
                >
                  Prosegui ai Dati
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Form Dati Contatto Inset & Stripe Checkout Handoff */}
          {step === 3 && (
            <form onSubmit={validateAndPrepareCheckout} className="space-y-6" noValidate>
              <div className="space-y-1">
                <h2 className="font-body font-semibold tracking-[-0.02em] text-xl md:text-2xl text-[#F4F1EA]">
                  Dati di contatto e preparazione Checkout
                </h2>
                <p className="text-sm text-[#A39B93]">
                  Inserisci i riferimenti per ricevere la conferma e le indicazioni per la chiamata vocale riservata.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="booking-fullname" className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]">
                    Nome e Cognome *
                  </label>
                  <input
                    id="booking-fullname"
                    type="text"
                    value={draft.fullName}
                    onChange={(e) => {
                      setDraft((p) => ({ ...p, fullName: e.target.value }));
                      setHandoffPayload(null);
                    }}
                    placeholder="Es. Elena Conti"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
                  />
                  {formErrors.fullName && (
                    <p className="text-xs text-[#ffb4ab]">{formErrors.fullName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="booking-email" className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]">
                    Email *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={draft.email}
                    onChange={(e) => {
                      setDraft((p) => ({ ...p, email: e.target.value }));
                      setHandoffPayload(null);
                    }}
                    placeholder="nome@esempio.it"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
                  />
                  {formErrors.email && (
                    <p className="text-xs text-[#ffb4ab]">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="booking-phone" className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]">
                  Telefono / WhatsApp *
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  value={draft.phoneWhatsApp}
                  onChange={(e) => {
                    setDraft((p) => ({ ...p, phoneWhatsApp: e.target.value }));
                    setHandoffPayload(null);
                  }}
                  placeholder="+39 333 000 0000"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
                />
                {formErrors.phoneWhatsApp && (
                  <p className="text-xs text-[#ffb4ab]">{formErrors.phoneWhatsApp}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="booking-intent" className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]">
                  Tema o domanda iniziale (facoltativo)
                </label>
                <textarea
                  id="booking-intent"
                  rows={3}
                  value={draft.sessionIntent}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, sessionIntent: e.target.value }))
                  }
                  placeholder="Condividi brevemente il contesto che desideri esplorare durante l'incontro..."
                  className="w-full px-3.5 py-2.5 rounded-lg input-inset text-sm resize-y"
                />
              </div>

              {/* Custom Dark-Gold Consent Checkbox */}
              <div className="space-y-1.5">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={draft.deontologyAccepted}
                    onClick={() => {
                      setDraft((p) => ({
                        ...p,
                        deontologyAccepted: !p.deontologyAccepted,
                      }));
                      setHandoffPayload(null);
                    }}
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      draft.deontologyAccepted
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-[#12100E]'
                        : 'bg-[#12100E]/85 border-[#D4AF37]/40'
                    }`}
                  >
                    {draft.deontologyAccepted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                  <span className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
                    Confermo di aver compreso che il consulto ha natura olistica, simbolica e previsionale, nel rispetto del libero arbitrio, e non sostituisce pareri medici, psicologici o legali.
                  </span>
                </label>
                {formErrors.deontologyAccepted && (
                  <p className="text-xs text-[#ffb4ab]">{formErrors.deontologyAccepted}</p>
                )}
              </div>

              {/* Handoff Annotation */}
              <div className="p-4 rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 text-xs text-[#A39B93] flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">
                  <CopyText entry={siteContent.booking.stripeHandoffNote} showKeys={showCmsKeys} />
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 min-h-[44px] rounded-lg border border-[#D4AF37]/30 text-sm font-medium text-[#F4F1EA] hover:border-[#D4AF37] inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Modifica Data
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 min-h-[46px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <CreditCard className="w-4 h-4" />
                  {submitting
                    ? 'Registrazione in corso...'
                    : `Conferma e Prepara Checkout (€ ${activeTariff.priceEur})`}
                </button>
              </div>

              {/* Stripe Checkout Handoff Confirmation & Payload View */}
              {handoffPayload && (
                <div className="mt-6 rounded-xl bg-[#12100E]/90 border border-[#D4AF37]/45 p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                        {bookingSaved
                          ? 'Prenotazione Registrata · Riepilogo Checkout'
                          : 'Payload Stripe Checkout Prontamente Strutturato'}
                      </p>
                      <h3 className="font-display text-lg text-[#F4F1EA] mt-1">
                        Riepilogo per {draft.fullName}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-[#A39B93] leading-relaxed">
                    Nessuna transazione fittizia eseguita in questa anteprima: collegando la route server{' '}
                    <code className="text-[#F4F1EA]">POST /api/checkout/session</code> con Firebase Auth e{' '}
                    <code className="text-[#E6C65C]">STRIPE_SECRET_KEY</code>, questo oggetto reindirizzerà al checkout Stripe reale.
                  </p>
                  <pre className="p-3.5 rounded-lg bg-[#151311] border border-[#D4AF37]/15 text-[11px] font-mono text-[#E6C65C] overflow-x-auto">
                    {JSON.stringify(handoffPayload, null, 2)}
                  </pre>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href={`https://wa.me/390000000000?text=${encodeURIComponent(
                        `Buongiorno Maria Teresa, vorrei confermare la prenotazione per ${activeTariff.title} (${activeTariff.durationMinutes}m) il ${draft.selectedDateIso} alle ${draft.selectedTimeSlot}. Nome: ${draft.fullName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37]/12 border border-[#D4AF37]/35 hover:border-[#D4AF37] text-xs font-semibold text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                      Invia Richiesta su WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={onOpenChat}
                      className="px-4 py-2.5 min-h-[44px] rounded-lg border border-[#A39B93]/30 hover:border-[#D4AF37] text-xs font-medium text-[#A39B93] hover:text-[#F4F1EA] whitespace-nowrap"
                    >
                      Torna al Dialogo Tarot
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Sticky Booking Summary Sidebar */}
        <aside className="lg:col-span-4 glass-tier-1 rounded-2xl p-6 space-y-5 lg:sticky lg:top-24">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Riepilogo Sessione
            </p>
            <h3 className="font-display text-lg text-[#F4F1EA]">
              {activeTariff.title}
            </h3>
          </div>

          <div className="gold-divider" aria-hidden="true" />

          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-[#A39B93]">Durata</dt>
              <dd className="text-[#F4F1EA] font-medium tabular-nums">
                {activeTariff.durationMinutes} minuti
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-[#A39B93] shrink-0 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                Data
              </dt>
              <dd className="text-[#F4F1EA] font-medium text-right capitalize">
                {formatItalianDate(draft.selectedDateIso)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-[#A39B93] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                Orario
              </dt>
              <dd className="text-[#F4F1EA] font-medium tabular-nums">
                {draft.selectedTimeSlot} CET
              </dd>
            </div>
          </dl>

          <div className="gold-divider" aria-hidden="true" />

          <div className="flex items-baseline justify-between">
            <span className="text-sm text-[#A39B93]">Contributo sessione</span>
            <span className="font-display text-2xl text-[#D4AF37] tabular-nums">
              € {activeTariff.priceEur}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-[#A39B93]">
            Modalità: Online esclusivamente in chiamata vocale riservata, oppure Studio su appuntamento. Autenticazione utente tramite Firebase Auth; dati su Postgres.
          </p>
        </aside>
      </div>
    </div>
  );
}
