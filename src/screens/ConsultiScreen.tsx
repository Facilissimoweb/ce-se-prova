import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';
import type { ConsultationTariff } from '../types/handoff';
import { siteContent } from '../data/siteContent';
import {
  useLocalizedConsultiFaqs,
  useLocalizedTariffs,
} from '../i18n/useLocalizedCatalog';
import { CopyText } from '../components/CopyText';
import { ResilientImage } from '../components/ResilientImage';
import { TariffDescriptionBlurbs } from '../components/TariffDescriptionBlurbs';
import { TARIFF_SECTION_IMAGES } from '../data/sectionImages';
import consultiDeskImg from '../assets/images/consulti_desk_linen_1794651607906.jpg';
import { PaymentTrustCues } from '../components/PaymentTrustCues';
import { CONSULTATION_STRIPE_ENABLED } from '../lib/bookingCheckoutMode';

interface ConsultiScreenProps {
  showCmsKeys: boolean;
  selectedTariffId: ConsultationTariff['id'];
  onSelectTariffAndBook: (tariffId: ConsultationTariff['id']) => void;
}

export function ConsultiScreen({
  showCmsKeys,
  selectedTariffId,
  onSelectTariffAndBook,
}: ConsultiScreenProps) {
  const consultationTariffs = useLocalizedTariffs();
  const consultiFaqs = useLocalizedConsultiFaqs();
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    consultiFaqs[0]?.id ?? null
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-12 md:space-y-16 pt-6 md:pt-10 pb-8">
      {/* Section Header paired with Editorial Still-Life Photograph */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Tariffario Trasparente · Chiamata Vocale &amp; Studio
          </p>
          <h1 className="font-display text-[32px] leading-[40px] md:text-[42px] md:leading-[50px] tracking-[0.02em] text-[#F4F1EA] text-balance">
            <CopyText entry={siteContent.consulti.heading} showKeys={showCmsKeys} />
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-[#A39B93] max-w-xl">
            <CopyText entry={siteContent.consulti.subheading} showKeys={showCmsKeys} />
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#E6C65C]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
              Consulti online solo in modalità chiamata vocale
            </span>
            <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
            <span className="text-[#A39B93]">78 Arcani Maggiori e Minori</span>
            <span aria-hidden="true" className="text-[#D4AF37]/50">·</span>
            <span className="text-[#A39B93]">Nessuna conoscenza richiesta</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/20 glass-tier-1">
            <ResilientImage
              src={consultiDeskImg}
              alt="Mazzo di tarocchi con dettagli in oro e quaderno su pietra scura"
              className="w-full aspect-[4/3] object-cover"
              fallbackLabel="Consulenza Tarot Italia"
            />
          </div>
        </div>
      </header>

      {/* Editorial Welcome & Accoglimento Block */}
      <section
        aria-labelledby="consulti-welcome-heading"
        className="glass-tier-1 rounded-2xl p-6 md:p-9 space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              <CopyText entry={siteContent.consulti.welcomeKicker} showKeys={showCmsKeys} />
            </p>
            <h2
              id="consulti-welcome-heading"
              className="font-body text-2xl md:text-[28px] md:leading-[36px] font-semibold tracking-[-0.02em] text-[#F4F1EA] text-balance"
            >
              <CopyText entry={siteContent.consulti.welcomeHeading} showKeys={showCmsKeys} />
            </h2>
            <p className="text-sm md:text-[15.5px] leading-relaxed text-[#E8e1dd]">
              <CopyText entry={siteContent.consulti.welcomeBody1} showKeys={showCmsKeys} />
            </p>
            <p className="text-sm md:text-[15.5px] leading-relaxed text-[#A39B93]">
              <CopyText entry={siteContent.consulti.welcomeBody2} showKeys={showCmsKeys} />
            </p>
          </div>

          <div className="lg:col-span-5 divide-y divide-[#D4AF37]/15 border-t lg:border-t-0 lg:border-l border-[#D4AF37]/15 lg:pl-8 pt-6 lg:pt-0">
            <div className="pb-4 space-y-1">
              <p className="font-display text-sm text-[#D4AF37]">
                01. Dal Caos al Cosmos
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
                Un approccio ibrido tra cartomanzia pura e tarologia evolutiva: anche da una domanda diretta come «Mi pensa?» emergono dinamiche profonde e chiavi di lettura lucide.
              </p>
            </div>
            <div className="py-4 space-y-1">
              <p className="font-display text-sm text-[#D4AF37]">
                02. Ascolto Solo in Chiamata Vocale
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
                Online le sessioni avvengono esclusivamente a voce per custodire intimità, silenzio interiore e attenzione piena sui simboli dei 78 Arcani.
              </p>
            </div>
            <div className="pt-4 space-y-1">
              <p className="font-display text-sm text-[#D4AF37]">
                03. Una Visione Rinnovata
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
                Non risposte rigide né sentenze: esci dal consulto con tracce pratiche, consapevolezza e orientamento concreto per riprendere le redini del tuo cammino.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tariff cards: 20 / 45 / 60 / 90 */}
      <section
        aria-label="Tariffe dei consulti"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch"
      >
        {consultationTariffs.map((tariff) => {
          const isSelected = selectedTariffId === tariff.id;
          const tariffImage = TARIFF_SECTION_IMAGES[tariff.id];
          return (
            <article
              key={tariff.id}
              className="foglio-smeraldo p-6 md:p-7 flex flex-col justify-between gap-6"
            >
              <div className="space-y-5">
                {/* 4:3 Bespoke Consultation Visual */}
                <div className="rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#12100E]">
                  <ResilientImage
                    src={tariffImage.src}
                    alt={tariffImage.alt}
                    className="w-full aspect-[4/3] object-cover"
                    fallbackLabel={tariff.title}
                  />
                </div>

                {/* Quiet metadata header without pill clutter */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    {tariff.durationMinutes} Minuti
                  </span>
                  <span className="text-[#A39B93]">
                    {tariff.recommended
                      ? 'Il più scelto'
                      : tariff.onlineOnly
                        ? 'Solo Online'
                        : 'Vocale o Studio'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-body font-semibold tracking-[-0.02em] text-xl md:text-2xl text-[#F4F1EA]">
                    {showCmsKeys ? (
                      <CopyText
                        entry={{ cmsKey: tariff.cmsKeyTitle, liveText: tariff.title }}
                        showKeys={true}
                      />
                    ) : (
                      tariff.title
                    )}
                  </h2>
                  <p className="text-xs font-medium text-[#D4AF37]/90">
                    {showCmsKeys ? (
                      <CopyText
                        entry={{ cmsKey: tariff.cmsKeyFocus, liveText: tariff.focusLabel }}
                        showKeys={true}
                      />
                    ) : (
                      tariff.focusLabel
                    )}
                  </p>
                </div>

                {/* Price in tabular numerals */}
                <div className="py-3 border-y border-[#D4AF37]/15 flex items-baseline justify-between">
                  <span className="font-display text-3xl text-[#F4F1EA] tabular-nums">
                    € {tariff.priceEur}
                  </span>
                  <span className="text-xs text-[#A39B93] tabular-nums">
                    {tariff.durationMinutes} min · IVA inclusa
                  </span>
                </div>

                <TariffDescriptionBlurbs
                  paragraphs={tariff.descriptionParagraphs}
                  flatDescription={tariff.description}
                  cmsKeyDesc={tariff.cmsKeyDesc}
                  showCmsKeys={showCmsKeys}
                />

                <ul className="space-y-2.5 pt-1">
                  {tariff.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-[#E8e1dd]">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectTariffAndBook(tariff.id)}
                  className={`cta-label w-full min-h-[46px] px-5 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap ${
                    tariff.recommended || isSelected
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  Scegli e Prenota ({tariff.durationMinutes}m)
                  <ArrowRight className="w-4 h-4" />
                </button>

                {CONSULTATION_STRIPE_ENABLED ? (
                  <PaymentTrustCues compact prominent />
                ) : null}
              </div>
            </article>
          );
        })}
      </section>

      {/* Consulti Specific FAQ Accordion (User's 01-05 Questions) */}
      <section aria-labelledby="consulti-faq-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Domande &amp; Metodo · 01 – 05
          </p>
          <h2
            id="consulti-faq-heading"
            className="font-body text-2xl md:text-[30px] md:leading-[38px] font-semibold tracking-[-0.02em] text-[#F4F1EA] text-balance"
          >
            <CopyText entry={siteContent.consulti.faqHeading} showKeys={showCmsKeys} />
          </h2>
          <p className="text-sm leading-relaxed text-[#A39B93]">
            Tutto quello che è utile sapere prima di iniziare la chiamata vocale: come dialogano i 78 Arcani, che tipo di domande portare e cosa rimane al termine della sessione.
          </p>
        </div>

        <div className="lg:col-span-8 glass-tier-1 rounded-2xl divide-y divide-[#D4AF37]/15 overflow-hidden">
          {consultiFaqs.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            const panelId = `${faq.id}-panel`;
            const buttonId = `${faq.id}-button`;

            return (
              <div key={faq.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full min-h-[56px] px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-[#D4AF37]/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
                  >
                    <div className="space-y-1.5 pr-2">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]/90 tabular-nums">
                        {String(index + 1).padStart(2, '0')} · {faq.category}
                      </span>
                      <span className="block font-body font-semibold text-base md:text-[17px] tracking-[-0.01em] text-[#F4F1EA]">
                        {showCmsKeys ? (
                          <CopyText
                            entry={{ cmsKey: faq.cmsKeyQuestion, liveText: faq.question }}
                            showKeys={true}
                          />
                        ) : (
                          faq.question
                        )}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#D4AF37] shrink-0 mt-1 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 pt-1"
                  >
                    <p className="text-sm md:text-[15px] leading-relaxed text-[#A39B93]">
                      {showCmsKeys ? (
                        <CopyText
                          entry={{ cmsKey: faq.cmsKeyAnswer, liveText: faq.answer }}
                          showKeys={true}
                        />
                      ) : (
                        faq.answer
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Deontological Callout & Handoff Note (Hairline frame, no thick left border) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 glass-tier-1 rounded-2xl p-6 md:p-7 flex items-start gap-4">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1.5">
            <h3 className="font-display text-base text-[#F4F1EA]">
              Impegno Deontologico
            </h3>
            <p className="text-sm leading-relaxed text-[#A39B93]">
              <CopyText entry={siteContent.consulti.ethicsCallout} showKeys={showCmsKeys} />
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 glass-tier-1 rounded-2xl p-6 md:p-7 flex items-start gap-4">
          <CreditCard className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1.5">
            <h3 className="font-display text-base text-[#F4F1EA]">
              {CONSULTATION_STRIPE_ENABLED
                ? 'Handoff Pagamenti & Auth'
                : 'Prenotazione e pagamento'}
            </h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
              {CONSULTATION_STRIPE_ENABLED
                ? 'Le tariffe selezionate aprono Stripe Checkout: pagamento sicuro, con rate Klarna se disponibili sul totale.'
                : 'Dopo aver scelto la tariffa, invii la richiesta su WhatsApp: Maria Teresa ti risponde con le indicazioni per il pagamento. Il checkout Stripe resta disponibile per ripartire quando sarà il momento.'}
            </p>
            {CONSULTATION_STRIPE_ENABLED ? (
              <PaymentTrustCues prominent className="pt-2" />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
