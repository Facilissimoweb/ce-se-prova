import React from 'react';
import { ArrowRight, Check, ShieldCheck, CreditCard } from 'lucide-react';
import type { ConsultationTariff } from '../types/handoff';
import { consultationTariffs, siteContent } from '../data/siteContent';
import { CopyText } from '../components/CopyText';
import { ResilientImage } from '../components/ResilientImage';
import { TARIFF_SECTION_IMAGES } from '../data/sectionImages';
import consultiDeskImg from '../assets/images/consulti_desk_linen_1794651607906.jpg';

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
  return (
    <div className="space-y-12 md:space-y-16 pt-6 md:pt-10 pb-8">
      {/* Section Header paired with Editorial Still-Life Photograph */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Tariffario Trasparente · Sessioni Individuali
          </p>
          <h1 className="font-display text-[32px] leading-[40px] md:text-[42px] md:leading-[50px] tracking-[0.02em] text-[#F4F1EA] text-balance">
            <CopyText entry={siteContent.consulti.heading} showKeys={showCmsKeys} />
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-[#A39B93] max-w-xl">
            <CopyText entry={siteContent.consulti.subheading} showKeys={showCmsKeys} />
          </p>
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

      {/* 3 Dark Glass Tariff Cards */}
      <section aria-label="Tariffe dei consulti" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {consultationTariffs.map((tariff) => {
          const isSelected = selectedTariffId === tariff.id;
          const tariffImage = TARIFF_SECTION_IMAGES[tariff.id];
          return (
            <article
              key={tariff.id}
              className={`rounded-2xl p-6 md:p-7 flex flex-col justify-between gap-6 transition-all duration-200 ${
                tariff.recommended
                  ? 'glass-tier-2 border-[#D4AF37]/45 shadow-[0_0_28px_rgba(212,175,55,0.12)]'
                  : 'glass-tier-1 hover:border-[#D4AF37]/35'
              }`}
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
                    {tariff.recommended ? 'Percorso Consigliato' : 'Individuale'}
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

                <p className="text-sm leading-relaxed text-[#A39B93]">
                  {showCmsKeys ? (
                    <CopyText
                      entry={{ cmsKey: tariff.cmsKeyDesc, liveText: tariff.description }}
                      showKeys={true}
                    />
                  ) : (
                    tariff.description
                  )}
                </p>

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
                  className={`w-full min-h-[46px] px-5 py-3 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C] ${
                    tariff.recommended || isSelected
                      ? 'bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] hover:shadow-[0_0_16px_rgba(212,175,55,0.3)]'
                      : 'bg-[#D4AF37]/10 border border-[#D4AF37]/35 hover:bg-[#D4AF37] hover:text-[#12100E] text-[#F4F1EA]'
                  }`}
                >
                  Scegli e Prenota ({tariff.durationMinutes}m)
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] font-mono text-[#A39B93]/80 text-center truncate">
                  Stripe Price Key: {tariff.stripePriceIdAnnotation}
                </p>
              </div>
            </article>
          );
        })}
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
              Handoff Pagamenti &amp; Auth
            </h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
              Le tariffe selezionate pre-compilano la sessione Stripe Checkout e il record di prenotazione protetto da Supabase Auth RLS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
