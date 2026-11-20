import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  Clock,
  CreditCard,
  Lock,
  MessageCircle,
  Send,
} from 'lucide-react';
import type { BookingDraft, ConsultationTariff } from '../types/handoff';
import { siteContent } from '../data/siteContent';
import { useLocalizedTariffs } from '../i18n/useLocalizedCatalog';
import { CopyText } from '../components/CopyText';
import { BookingCalendar } from '../components/booking/BookingCalendar';
import { BookingLangNotice } from '../components/booking/BookingLangNotice';
import { CheckoutReturnBanner } from '../components/CheckoutReturnBanner';
import { useAuth } from '../context/AuthContext';
import { useBookingAvailability } from '../hooks/useBookingAvailability';
import {
  buildCalendarCells,
  formatItalianDate,
  getNextAvailableDate,
  HOUR_SLOTS,
  openHoursForDate,
  toIsoDate,
} from '../lib/bookingCalendar';
import {
  buildBookingWhatsAppMessage,
  CONSULTATION_STRIPE_ENABLED,
} from '../lib/bookingCheckoutMode';
import { GtCriticalLabel } from '../components/GtCriticalLabel';
import {
  isEveningSlot,
  isSlotAllowedForMode,
  sessionModeLabel,
  type BookingMode,
} from '../lib/bookingRules';
import {
  isValidEmail,
  isValidFullName,
  isValidPhone,
} from '../lib/formValidation';
import { SCREEN_PATHS } from '../lib/appPaths';
import { readJsonResponse } from '../lib/readJsonResponse';
import { whatsappHref } from '../lib/siteContacts';

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
  const consultationTariffs = useLocalizedTariffs();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const d = getNextAvailableDate();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const {
    occupied,
    loading: availabilityLoading,
    error: availabilityError,
    reload,
  } = useBookingAvailability(calendarMonth);

  const [draft, setDraft] = useState<BookingDraft>({
    tariffId: selectedTariffId,
    selectedDateIso: toIsoDate(getNextAvailableDate()),
    selectedTimeSlot: '11:00',
    mode: 'remote',
    fullName: user?.displayName ?? '',
    email: user?.email ?? '',
    phoneWhatsApp: '',
    sessionIntent: '',
    deontologyAccepted: false,
    privacyTermsAccepted: false,
  });

  useEffect(() => {
    const tariff =
      consultationTariffs.find((t) => t.id === selectedTariffId) ??
      consultationTariffs[0];
    setDraft((prev) => ({
      ...prev,
      tariffId: selectedTariffId,
      mode: tariff.onlineOnly ? 'remote' : prev.mode,
    }));
  }, [selectedTariffId]);

  useEffect(() => {
    if (user) {
      setDraft((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    const hours = openHoursForDate(draft.selectedDateIso, occupied).filter(
      (slot) => isSlotAllowedForMode(draft.mode, slot)
    );
    if (hours.length === 0) {
      const next = getNextAvailableDate(occupied);
      const iso = toIsoDate(next);
      const nextHours = openHoursForDate(iso, occupied).filter((slot) =>
        isSlotAllowedForMode(draft.mode, slot)
      );
      setDraft((prev) => ({
        ...prev,
        selectedDateIso: iso,
        selectedTimeSlot: nextHours[0] ?? prev.selectedTimeSlot,
      }));
      return;
    }
    if (!hours.includes(draft.selectedTimeSlot)) {
      setDraft((prev) => ({
        ...prev,
        selectedTimeSlot: hours[0],
      }));
    }
  }, [occupied, draft.selectedDateIso, draft.selectedTimeSlot, draft.mode]);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmingStripe, setConfirmingStripe] = useState(false);

  const activeTariff =
    consultationTariffs.find((t) => t.id === draft.tariffId) ??
    consultationTariffs[1];

  const todayZero = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const calendarCells = useMemo(
    () => buildCalendarCells(calendarMonth, todayZero, occupied),
    [calendarMonth, todayZero, occupied]
  );

  const openHours = useMemo(
    () =>
      openHoursForDate(draft.selectedDateIso, occupied).filter((slot) =>
        isSlotAllowedForMode(draft.mode, slot)
      ),
    [draft.selectedDateIso, occupied, draft.mode]
  );

  useEffect(() => {
    // Kept for when CONSULTATION_STRIPE_ENABLED is turned back on.
    if (!CONSULTATION_STRIPE_ENABLED) return;
    const params = new URLSearchParams(window.location.search);
    const stripeSessionId = params.get('booking_stripe_session_id');
    if (!stripeSessionId) return;
    setConfirmingStripe(true);
    void (async () => {
      try {
        const token = user ? await getIdToken() : null;
        const res = await fetch('/api/bookings/confirm-stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ stripeSessionId }),
        });
        const json = await readJsonResponse<{ error?: string }>(
          res,
          'Conferma pagamento non riuscita. Riprova o contatta lo studio.'
        );
        if (!res.ok) throw new Error(json.error || 'Conferma non riuscita.');
        setBookingConfirmed(true);
        setStep(3);
        void reload();
      } catch (err) {
        setSubmitError(
          err instanceof Error
            ? err.message
            : 'Errore nella conferma del pagamento.'
        );
      } finally {
        setConfirmingStripe(false);
        window.history.replaceState({}, '', window.location.pathname);
      }
    })();
  }, [user, getIdToken, reload]);

  const handleMonthShift = (delta: number) => {
    setCalendarMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
    );
  };

  const handleTariffPick = (id: ConsultationTariff['id']) => {
    onChangeTariffId(id);
    const tariff =
      consultationTariffs.find((t) => t.id === id) ?? consultationTariffs[0];
    setDraft((prev) => ({
      ...prev,
      tariffId: id,
      mode: tariff.onlineOnly ? 'remote' : prev.mode,
    }));
  };

  const handleModePick = (mode: BookingMode) => {
    if (activeTariff.onlineOnly && mode === 'studio') return;
    setDraft((prev) => ({ ...prev, mode }));
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
    if (!draft.privacyTermsAccepted) {
      errors.privacyTermsAccepted =
        'Conferma di essere maggiorenne e di accettare privacy e termini per procedere.';
    }
    if (!openHours.includes(draft.selectedTimeSlot)) {
      errors.selectedTimeSlot =
        'Seleziona una fascia oraria ancora disponibile.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

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
          scheduledDate: draft.selectedDateIso,
          scheduledTime: draft.selectedTimeSlot,
          mode: draft.mode,
          fullName: draft.fullName.trim(),
          email: draft.email.trim(),
          phoneWhatsApp: draft.phoneWhatsApp.trim(),
          sessionIntent: draft.sessionIntent.trim(),
          deontologyAccepted: draft.deontologyAccepted,
          privacyTermsAccepted: draft.privacyTermsAccepted,
        }),
      });
      const json = await readJsonResponse<{
        error?: string;
        mode?:
          | 'stripe_redirect'
          | 'direct_unlock'
          | 'confirmed'
          | 'whatsapp_handoff';
        checkoutUrl?: string;
        bookingId?: number;
      }>(
        res,
        'Il server prenotazioni non ha risposto correttamente. Riprova tra poco o scrivi su WhatsApp.'
      );
      if (!res.ok) {
        throw new Error(json.error || 'Prenotazione non riuscita.');
      }
      if (json.mode === 'stripe_redirect' && json.checkoutUrl) {
        window.location.assign(json.checkoutUrl);
        return;
      }
      // Soft-freeze: slot already reserved in DB as pending_payment; open WhatsApp.
      if (json.mode === 'whatsapp_handoff') {
        const message = buildBookingWhatsAppMessage({
          tariffTitle: activeTariff.title,
          durationMinutes: activeTariff.durationMinutes,
          priceEur: activeTariff.priceEur,
          dateLabel: formatItalianDate(draft.selectedDateIso),
          timeSlot: draft.selectedTimeSlot,
          modeLabel: sessionModeLabel(draft.mode, draft.selectedTimeSlot),
          fullName: draft.fullName.trim(),
          email: draft.email.trim(),
          phoneWhatsApp: draft.phoneWhatsApp.trim(),
          sessionIntent: draft.sessionIntent.trim(),
        });
        window.open(whatsappHref(message), '_blank', 'noopener,noreferrer');
      }
      setBookingConfirmed(true);
      void reload();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Errore durante la prenotazione.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const steps: { num: 1 | 2 | 3; label: string }[] = [
    { num: 1, label: '01. Servizio' },
    { num: 2, label: '02. Data e Ora' },
    {
      num: 3,
      label: CONSULTATION_STRIPE_ENABLED
        ? '03. Dati e Checkout'
        : '03. Dati e invio',
    },
  ];

  return (
    <div className="space-y-10 pt-6 md:pt-10 pb-8">
      {CONSULTATION_STRIPE_ENABLED ? (
        <CheckoutReturnBanner variant="booking" />
      ) : null}

      <header className="space-y-3 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
          Agenda Riservata · Maria Teresa Rogani
        </p>
        <h1 className="font-display text-[32px] leading-[40px] md:text-[42px] md:leading-[50px] tracking-[0.02em] text-[#F4F1EA]">
          <CopyText entry={siteContent.booking.heading} showKeys={showCmsKeys} />
        </h1>
        <p className="text-sm md:text-base text-[#A39B93]">
          <CopyText
            entry={siteContent.booking.subheading}
            showKeys={showCmsKeys}
          />
        </p>
        {confirmingStripe ? (
          <p className="text-sm text-[#D4AF37]">
            Conferma del pagamento in corso…
          </p>
        ) : null}
        <div className="pt-2">
          <BookingLangNotice showCmsKeys={showCmsKeys} />
        </div>
      </header>

      <nav
        aria-label="Passaggi prenotazione"
        className="glass-tier-1 rounded-xl p-1.5 grid grid-cols-3 gap-1.5 max-w-2xl"
      >
        {steps.map((s) => {
          const isActive = step === s.num;
          const isCompleted = step > s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num)}
              className={`cta-label min-h-[44px] px-2.5 sm:px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 glass-tier-1 rounded-2xl p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="font-body font-semibold tracking-[-0.02em] text-xl md:text-2xl text-[#F4F1EA]">
                  Durata e modalità del consulto
                </h2>
                <p className="text-sm text-[#A39B93]">
                  {CONSULTATION_STRIPE_ENABLED
                    ? 'Scegli durata e modalità. In ogni sessione leggo Arcani Maggiori e Minori. Il Consulto Breve è solo online. Checkout Stripe al passo finale.'
                    : 'Scegli durata e modalità. In ogni sessione leggo Arcani Maggiori e Minori. Il Consulto Breve è solo online. Al passo finale invii la richiesta su WhatsApp.'}
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
                              entry={{
                                cmsKey: tariff.cmsKeyTitle,
                                liveText: tariff.title,
                              }}
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
                          {selected && (
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  Modalità *
                </p>
                {activeTariff.onlineOnly ? (
                  <p className="text-xs text-[#A39B93]">
                    Il Consulto Breve è disponibile solo online in chiamata vocale.
                  </p>
                ) : null}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(
                    [
                      [
                        'remote',
                        'Online',
                        'Chiamata vocale riservata (WhatsApp)',
                      ],
                      [
                        'studio',
                        'Di persona a Macerata',
                        activeTariff.onlineOnly
                          ? 'Non disponibile per il Consulto Breve'
                          : 'Via Crispi 37 · fino alle 18:00',
                      ],
                    ] as const
                  ).map(([value, label, hint]) => {
                    const selected = draft.mode === value;
                    const disabled =
                      activeTariff.onlineOnly && value === 'studio';
                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleModePick(value)}
                        aria-disabled={disabled}
                        className={`min-h-[64px] px-4 py-3 rounded-xl text-left border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                          disabled
                            ? 'border-[#D4AF37]/10 bg-[#12100E]/40 text-[#A39B93]/50 cursor-not-allowed opacity-60'
                            : selected
                              ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F4F1EA]'
                              : 'border-[#D4AF37]/20 bg-[#12100E]/60 text-[#A39B93] hover:border-[#D4AF37]/45'
                        }`}
                      >
                        <span className="block text-sm font-semibold text-[#F4F1EA]">
                          {label}
                        </span>
                        <span className="block text-xs mt-0.5 opacity-90">
                          {hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  Prosegui a Data e Ora
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-1">
                <h2 className="font-body font-semibold tracking-[-0.02em] text-xl md:text-2xl text-[#F4F1EA]">
                  Scegli giorno e fascia oraria
                </h2>
                <p className="text-sm text-[#A39B93]">
                  Slot orari Europe/Rome. Gli orari occupati (prenotazioni o
                  calendario) non sono selezionabili.
                  {availabilityLoading ? ' Aggiornamento…' : ''}
                </p>
                {availabilityError ? (
                  <p className="text-xs text-[#ffb4ab]">{availabilityError}</p>
                ) : null}
              </div>

              <BookingCalendar
                calendarMonth={calendarMonth}
                calendarCells={calendarCells}
                selectedDateIso={draft.selectedDateIso}
                onMonthShift={handleMonthShift}
                onSelectDate={(iso) => {
                  const hours = openHoursForDate(iso, occupied).filter((slot) =>
                    isSlotAllowedForMode(draft.mode, slot)
                  );
                  setDraft((prev) => ({
                    ...prev,
                    selectedDateIso: iso,
                    selectedTimeSlot: hours[0] ?? prev.selectedTimeSlot,
                  }));
                }}
              />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Orari disponibili</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                  {HOUR_SLOTS.map((slot) => {
                    const available =
                      isSlotAllowedForMode(draft.mode, slot) &&
                      openHours.includes(slot);
                    const isSelected =
                      draft.selectedTimeSlot === slot && available;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!available}
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            selectedTimeSlot: slot,
                          }))
                        }
                        aria-pressed={isSelected}
                        className={`min-h-[48px] px-2 py-2 rounded-lg text-sm font-medium tabular-nums border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                          isSelected
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-[#12100E] font-semibold'
                            : available
                              ? 'bg-[#12100E]/80 border-[#D4AF37]/20 text-[#F4F1EA] hover:border-[#D4AF37]'
                              : 'bg-[#12100E]/40 border-transparent text-[#A39B93]/35 cursor-not-allowed'
                        }`}
                      >
                        {slot}
                        {isEveningSlot(slot) ? (
                          <span className="mt-0.5 block text-[10px] uppercase tracking-wide opacity-70">
                            online
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[#A39B93] leading-relaxed">
                  {draft.mode === 'studio'
                    ? 'Di persona a Macerata: disponibili fino alle 18:00. Dalle 19:00 solo online.'
                    : 'Dalle 19:00 i consulti sono solo online (chiamata vocale WhatsApp).'}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="cta-label px-5 py-3 min-h-[44px] rounded-lg border border-[#D4AF37]/30 text-sm font-medium text-[#F4F1EA] hover:border-[#D4AF37] inline-flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  Indietro
                </button>
                <button
                  type="button"
                  disabled={openHours.length === 0}
                  onClick={() => setStep(3)}
                  className="cta-label px-6 py-3 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-50 text-[#12100E] text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  Prosegui ai Dati
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form
              onSubmit={validateAndPrepareCheckout}
              className="space-y-6"
              noValidate
            >
              <div className="space-y-1">
                <h2 className="font-body font-semibold tracking-[-0.02em] text-xl md:text-2xl text-[#F4F1EA]">
                  {CONSULTATION_STRIPE_ENABLED
                    ? 'Dati di contatto e checkout'
                    : 'Dati di contatto e invio'}
                </h2>
                <p className="text-sm text-[#A39B93]">
                  {CONSULTATION_STRIPE_ENABLED
                    ? 'Dopo il pagamento ricevi conferma via email (Zoho) e lo slot viene riservato sul calendario.'
                    : 'Compila i dati e invia la richiesta su WhatsApp: Maria Teresa ti risponderà con le indicazioni per il pagamento e la conferma dello slot.'}
                </p>
              </div>

              {bookingConfirmed ? (
                <div className="rounded-xl border border-[#D4AF37]/45 bg-[#12100E]/90 p-5 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    {CONSULTATION_STRIPE_ENABLED
                      ? 'Prenotazione confermata'
                      : 'Richiesta inviata'}
                  </p>
                  <p className="text-sm text-[#F4F1EA] leading-relaxed">
                    {CONSULTATION_STRIPE_ENABLED ? (
                      <>
                        Grazie {draft.fullName}. La sessione del{' '}
                        {formatItalianDate(draft.selectedDateIso)} alle{' '}
                        {draft.selectedTimeSlot} è riservata. Controlla la
                        casella email per i dettagli.
                      </>
                    ) : (
                      <>
                        Grazie {draft.fullName}. Abbiamo aperto WhatsApp con i
                        dettagli della sessione del{' '}
                        {formatItalianDate(draft.selectedDateIso)} alle{' '}
                        {draft.selectedTimeSlot}. Invia il messaggio: Maria
                        Teresa ti risponderà a breve con le modalità di
                        pagamento.
                      </>
                    )}
                  </p>
                  {!CONSULTATION_STRIPE_ENABLED ? (
                    <a
                      href={whatsappHref(
                        buildBookingWhatsAppMessage({
                          tariffTitle: activeTariff.title,
                          durationMinutes: activeTariff.durationMinutes,
                          priceEur: activeTariff.priceEur,
                          dateLabel: formatItalianDate(draft.selectedDateIso),
                          timeSlot: draft.selectedTimeSlot,
                          modeLabel: sessionModeLabel(
                            draft.mode,
                            draft.selectedTimeSlot
                          ),
                          fullName: draft.fullName.trim(),
                          email: draft.email.trim(),
                          phoneWhatsApp: draft.phoneWhatsApp.trim(),
                          sessionIntent: draft.sessionIntent.trim(),
                        })
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-xs font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Riapri WhatsApp
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={onOpenChat}
                    className="px-4 py-2.5 min-h-[44px] rounded-lg border border-[#A39B93]/30 text-xs font-medium text-[#A39B93] hover:text-[#F4F1EA]"
                  >
                    Torna al Dialogo Tarot
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-fullname"
                        className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
                      >
                        Nome e Cognome *
                      </label>
                      <input
                        id="booking-fullname"
                        type="text"
                        value={draft.fullName}
                        onChange={(e) =>
                          setDraft((p) => ({ ...p, fullName: e.target.value }))
                        }
                        placeholder="Es. Elena Conti"
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
                      />
                      {formErrors.fullName && (
                        <p className="text-xs text-[#ffb4ab]">
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-email"
                        className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
                      >
                        Email *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        value={draft.email}
                        onChange={(e) =>
                          setDraft((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="nome@esempio.it"
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
                      />
                      {formErrors.email && (
                        <p className="text-xs text-[#ffb4ab]">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
                    >
                      Telefono / WhatsApp *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      value={draft.phoneWhatsApp}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          phoneWhatsApp: e.target.value,
                        }))
                      }
                      placeholder="+39 333 000 0000"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg input-inset text-sm"
                    />
                    {formErrors.phoneWhatsApp && (
                      <p className="text-xs text-[#ffb4ab]">
                        {formErrors.phoneWhatsApp}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-intent"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#E8e1dd]"
                    >
                      Tema o domanda iniziale (facoltativo)
                    </label>
                    <textarea
                      id="booking-intent"
                      rows={3}
                      value={draft.sessionIntent}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          sessionIntent: e.target.value,
                        }))
                      }
                      placeholder="Condividi brevemente il contesto che desideri esplorare durante l'incontro..."
                      className="w-full px-3.5 py-2.5 rounded-lg input-inset text-sm resize-y"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={draft.deontologyAccepted}
                        onClick={() =>
                          setDraft((p) => ({
                            ...p,
                            deontologyAccepted: !p.deontologyAccepted,
                          }))
                        }
                        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                          draft.deontologyAccepted
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-[#12100E]'
                            : 'bg-[#12100E]/85 border-[#D4AF37]/40'
                        }`}
                      >
                        {draft.deontologyAccepted && (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        )}
                      </button>
                      <span className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
                        Confermo di aver compreso che il consulto ha natura
                        olistica, simbolica e previsionale, nel rispetto del
                        libero arbitrio, e non sostituisce pareri medici,
                        psicologici o legali.
                      </span>
                    </label>
                    {formErrors.deontologyAccepted && (
                      <p className="text-xs text-[#ffb4ab]">
                        {formErrors.deontologyAccepted}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={draft.privacyTermsAccepted}
                        onClick={() =>
                          setDraft((p) => ({
                            ...p,
                            privacyTermsAccepted: !p.privacyTermsAccepted,
                          }))
                        }
                        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                          draft.privacyTermsAccepted
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-[#12100E]'
                            : 'bg-[#12100E]/85 border-[#D4AF37]/40'
                        }`}
                      >
                        {draft.privacyTermsAccepted && (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        )}
                      </button>
                      <span className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
                        Confermo di essere maggiorenne (18+) e di aver letto e
                        accettato la{' '}
                        <a
                          href={SCREEN_PATHS.privacy}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-2 hover:text-[#E6C65C]"
                        >
                          Privacy Policy
                        </a>{' '}
                        e i{' '}
                        <a
                          href={SCREEN_PATHS.termini}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-2 hover:text-[#E6C65C]"
                        >
                          Termini di servizio
                        </a>
                        .
                      </span>
                    </label>
                    {formErrors.privacyTermsAccepted && (
                      <p className="text-xs text-[#ffb4ab]">
                        {formErrors.privacyTermsAccepted}
                      </p>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 text-xs text-[#A39B93] flex items-start gap-3">
                    {CONSULTATION_STRIPE_ENABLED ? (
                      <Lock
                        className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <MessageCircle
                        className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                    <p className="leading-relaxed">
                      <CopyText
                        entry={siteContent.booking.stripeHandoffNote}
                        showKeys={showCmsKeys}
                      />
                    </p>
                  </div>

                  {submitError ? (
                    <p className="text-sm text-[#ffb4ab]">{submitError}</p>
                  ) : null}
                  {formErrors.selectedTimeSlot ? (
                    <p className="text-sm text-[#ffb4ab]">
                      {formErrors.selectedTimeSlot}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3 min-h-[44px] rounded-lg border border-[#D4AF37]/30 text-sm font-medium text-[#F4F1EA] hover:border-[#D4AF37] inline-flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Modifica Data
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 min-h-[46px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    >
                      {CONSULTATION_STRIPE_ENABLED ? (
                        <CreditCard className="w-4 h-4" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {submitting
                        ? CONSULTATION_STRIPE_ENABLED
                          ? 'Reindirizzamento…'
                          : 'Apertura WhatsApp…'
                        : CONSULTATION_STRIPE_ENABLED
                          ? `Paga e conferma (€ ${activeTariff.priceEur})`
                          : (
                              <GtCriticalLabel uiKey="sendBooking" />
                            )}
                    </button>
                  </div>

                  {CONSULTATION_STRIPE_ENABLED ? (
                    <a
                      href={whatsappHref(
                        `Buongiorno Maria Teresa, vorrei conferma per ${activeTariff.title} (${activeTariff.durationMinutes}m) il ${draft.selectedDateIso} alle ${draft.selectedTimeSlot}. Nome: ${draft.fullName}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-[#A39B93] hover:text-[#D4AF37]"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Assistenza WhatsApp
                    </a>
                  ) : null}
                </>
              )}
            </form>
          )}
        </div>

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
            <div className="flex items-center justify-between gap-2">
              <dt className="text-[#A39B93]">Modalità</dt>
              <dd className="text-[#F4F1EA] font-medium text-right">
                {sessionModeLabel(draft.mode)}
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

          <BookingLangNotice showCmsKeys={showCmsKeys} compact />

          <p className="text-xs leading-relaxed text-[#A39B93]">
            {CONSULTATION_STRIPE_ENABLED
              ? 'Pagamento Stripe · conferma email Zoho · evento Google Calendar. Firebase Auth + Postgres.'
              : 'Richiesta via WhatsApp · Maria Teresa invia le indicazioni di pagamento · conferma slot a mano. Il checkout Stripe resta pronto per ripartire.'}
          </p>
        </aside>
      </div>
    </div>
  );
}
