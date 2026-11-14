import React, { useState } from 'react';
import { ArrowRight, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { disciplinaryCredentials, siteContent } from '../data/siteContent';
import { CopyText } from '../components/CopyText';
import { ResilientImage } from '../components/ResilientImage';
import chiSonoAtelierImg from '../assets/images/chi_sono_atelier_tarot_1794659562519.jpg';

interface ChiSonoScreenProps {
  showCmsKeys: boolean;
  onNavigate: (screen: ScreenId) => void;
}

type DisciplineFilter = 'all' | 'tarologia' | 'olistico';

export function ChiSonoScreen({ showCmsKeys, onNavigate }: ChiSonoScreenProps) {
  const [filter, setFilter] = useState<DisciplineFilter>('all');

  const visibleCredentials =
    filter === 'all'
      ? disciplinaryCredentials
      : disciplinaryCredentials.filter((item) => item.area === filter);

  return (
    <div className="space-y-14 md:space-y-20 pt-6 md:pt-10 pb-10">
      {/* Page Header */}
      <header className="space-y-4 max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
          <CopyText entry={siteContent.chiSono.kicker} showKeys={showCmsKeys} />
        </p>
        <h1 className="font-display text-[34px] leading-[42px] md:text-[48px] md:leading-[56px] tracking-[0.02em] text-[#F4F1EA] text-balance">
          <CopyText entry={siteContent.chiSono.heading} showKeys={showCmsKeys} />
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-[#A39B93]">
          <span>Grafica e Comunicazione Visiva</span>
          <span aria-hidden="true" className="text-[#D4AF37]/60">·</span>
          <span>Scultura Contemporanea</span>
          <span aria-hidden="true" className="text-[#D4AF37]/60">·</span>
          <span>Filosofia Classica</span>
          <span aria-hidden="true" className="text-[#D4AF37]/60">·</span>
          <span>Operatore Olistico L. 4/2013</span>
        </div>
      </header>

      {/* Formazione e Ricerca — Balanced 12-col Split with Atelier Photograph */}
      <section
        aria-labelledby="research-heading"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#D4AF37]/20 glass-tier-1">
          <ResilientImage
            src={chiSonoAtelierImg}
            alt="Tavolo da studio tra Accademia di Belle Arti e tarologia: taccuino con geometrie classiche, busto classico in ombra, lama delle Stelle e pendolo in ottone"
            className="w-full h-full min-h-[260px] aspect-[4/3] lg:aspect-auto object-cover"
            fallbackLabel="Atelier Maria Teresa Rogani · Belle Arti e Tarologia"
          />
        </div>

        <div className="lg:col-span-6 glass-tier-1 rounded-2xl p-6 md:p-9 flex flex-col justify-center gap-5">
          <div className="flex items-center gap-2.5 text-[#D4AF37]">
            <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Sguardo Iconografico e Filosofico
            </span>
          </div>

          <h2
            id="research-heading"
            className="font-body text-2xl md:text-[30px] md:leading-[38px] font-semibold tracking-[-0.02em] text-[#F4F1EA]"
          >
            <CopyText
              entry={siteContent.chiSono.researchHeading}
              showKeys={showCmsKeys}
            />
          </h2>

          <div className="space-y-4 text-sm md:text-[15.5px] leading-relaxed text-[#E8e1dd]">
            <p className="text-[#F4F1EA] font-medium">
              <CopyText
                entry={siteContent.chiSono.researchP1}
                showKeys={showCmsKeys}
              />
            </p>
            <p className="text-[#A39B93]">
              <CopyText
                entry={siteContent.chiSono.researchP2}
                showKeys={showCmsKeys}
              />
            </p>
            <p className="text-[#A39B93]">
              <CopyText
                entry={siteContent.chiSono.researchP3}
                showKeys={showCmsKeys}
              />
            </p>
          </div>

          <div className="pt-3 border-t border-[#D4AF37]/15 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#D4AF37]">
            <span>Composizione Visiva</span>
            <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
            <span>Colore e Forma</span>
            <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
            <span>Contesto Storico e Simbolico</span>
          </div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      {/* Percorso Disciplinare Integrato */}
      <section aria-labelledby="disciplinary-heading" className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              <CopyText
                entry={siteContent.chiSono.disciplinaryKicker}
                showKeys={showCmsKeys}
              />
            </p>
            <h2
              id="disciplinary-heading"
              className="font-body text-2xl md:text-[32px] md:leading-[40px] font-semibold tracking-[-0.02em] text-[#F4F1EA]"
            >
              <CopyText
                entry={siteContent.chiSono.disciplinaryHeading}
                showKeys={showCmsKeys}
              />
            </h2>
            <p className="text-sm md:text-base text-[#A39B93]">
              <CopyText
                entry={siteContent.chiSono.disciplinaryIntro}
                showKeys={showCmsKeys}
              />
            </p>
          </div>

          {/* Interactive Discipline Filter Controls */}
          <div
            className="inline-flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#1A1615]/80 border border-[#D4AF37]/20 self-start lg:self-auto"
            role="tablist"
            aria-label="Filtra il percorso disciplinare"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                  : 'text-[#A39B93] hover:text-[#F4F1EA]'
              }`}
            >
              Tutte (6)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'tarologia'}
              onClick={() => setFilter('tarologia')}
              className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === 'tarologia'
                  ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                  : 'text-[#A39B93] hover:text-[#F4F1EA]'
              }`}
            >
              Tarologia &amp; Esoterismo
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'olistico'}
              onClick={() => setFilter('olistico')}
              className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === 'olistico'
                  ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                  : 'text-[#A39B93] hover:text-[#F4F1EA]'
              }`}
            >
              Discipline Olistiche
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {visibleCredentials.map((cred) => (
            <article
              key={cred.index}
              className="glass-tier-1 rounded-2xl p-6 md:p-7 flex flex-col justify-between gap-5 transition-colors duration-150 hover:border-[#D4AF37]/40"
            >
              <div className="space-y-3">
                {/* Quiet unboxed metadata line */}
                <div className="flex items-center justify-between gap-2 text-xs text-[#A39B93]">
                  <span className="font-display text-sm text-[#D4AF37] tabular-nums">
                    {cred.index}.
                  </span>
                  <span>{cred.areaLabel}</span>
                </div>

                <h3 className="font-display text-lg md:text-xl text-[#F4F1EA]">
                  {showCmsKeys ? (
                    <CopyText
                      entry={{ cmsKey: cred.cmsKeyTitle, liveText: cred.title }}
                      showKeys={true}
                    />
                  ) : (
                    cred.title
                  )}
                </h3>

                <p className="text-sm leading-relaxed text-[#A39B93]">
                  {showCmsKeys ? (
                    <CopyText
                      entry={{ cmsKey: cred.cmsKeyDetails, liveText: cred.details }}
                      showKeys={true}
                    />
                  ) : (
                    cred.details
                  )}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs">
                <span className="text-[#D4AF37] font-medium">
                  {cred.periodOrCert}
                </span>
                <span className="text-[#A39B93]">Formazione Certificata</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Deontological & Next-Step Bridge */}
      <section className="glass-tier-2 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
              Studio &amp; Consulenza · Maria Teresa Rogani
            </span>
          </div>
          <h2 className="font-body font-semibold text-xl md:text-2xl tracking-[-0.02em] text-[#F4F1EA]">
            Dalla ricerca iconografica all&apos;incontro individuale
          </h2>
          <p className="text-sm text-[#A39B93] leading-relaxed">
            Puoi prenotare un consulto dedicato per orientare il presente e prevedere le evoluzioni future, oppure approfondire il metodo attraverso i percorsi didattici.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('booking')}
            className="px-5 py-3 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-all"
          >
            Prenota un Consulto
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('corsi')}
            className="px-5 py-3 min-h-[44px] rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-sm font-medium text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            Vai ai Percorsi Didattici
          </button>
        </div>
      </section>
    </div>
  );
}
