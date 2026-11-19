import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { useAuth } from '../context/AuthContext';
import { ReservedLoginGate } from '../components/reserved/ReservedLoginGate';
import { APPROFONDIMENTI_TERZO_SETTENARIO as CONTENT } from '../data/courses/approfondimentiTerzoSettenario';

interface ApprofondimentiTerzoSettenarioScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export function ApprofondimentiTerzoSettenarioScreen({
  onNavigate,
}: ApprofondimentiTerzoSettenarioScreenProps) {
  const { user, loading: authLoading, authError, signInWithGoogle } = useAuth();

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
      <header className="glass-tier-1 rounded-2xl p-6 md:p-8 space-y-5">
        <button
          type="button"
          onClick={() => onNavigate('area-riservata')}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[#A39B93] hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          Torna all&apos;Area Personale
        </button>

        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            {CONTENT.kicker}
          </p>
          <h1 className="font-display text-[28px] leading-[36px] md:text-[38px] md:leading-[46px] text-[#F4F1EA]">
            {CONTENT.title}
          </h1>
          <p className="text-sm md:text-base text-[#A39B93]">{CONTENT.subtitle}</p>
        </div>
      </header>

      {/* Intro Terzo Settenario */}
      <section
        aria-labelledby="ts-intro-heading"
        className="glass-tier-1 rounded-2xl p-6 md:p-8 space-y-4"
      >
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Introduzione
          </p>
          <h2
            id="ts-intro-heading"
            className="font-display text-xl md:text-2xl text-[#F4F1EA]"
          >
            Il Terzo Settenario (XV – XXI)
          </h2>
        </div>
        <div className="space-y-3 text-sm md:text-[15px] leading-relaxed text-[#E8e1dd]">
          {CONTENT.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Tre nodi pratici */}
      <section aria-labelledby="ts-nodi-heading" className="space-y-5">
        <div className="space-y-2 px-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Laboratorio pratico
          </p>
          <h2
            id="ts-nodi-heading"
            className="font-display text-xl md:text-2xl text-[#F4F1EA]"
          >
            Tre nodi fondamentali
          </h2>
          <p className="text-sm text-[#A39B93] max-w-3xl">{CONTENT.nodiLead}</p>
        </div>

        <div className="space-y-4">
          {CONTENT.nodi.map((nodo) => (
            <article
              key={nodo.number}
              className="glass-tier-1 rounded-2xl p-6 md:p-7 space-y-5 border border-[#D4AF37]/12"
            >
              <div className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-0.5 w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 font-display text-sm text-[#D4AF37] inline-flex items-center justify-center tabular-nums"
                  aria-hidden="true"
                >
                  {nodo.number}
                </span>
                <h3 className="font-body font-semibold text-base md:text-lg text-[#F4F1EA] leading-snug">
                  {nodo.title}
                </h3>
              </div>

              <div className="space-y-4">
                {nodo.fields.map((field) => (
                  <div key={field.label} className="space-y-1.5">
                    <p className="text-xs font-semibold text-[#E6C65C]">
                      {field.label}
                    </p>
                    <p className="text-sm leading-relaxed text-[#E8e1dd]">
                      {field.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/20 p-4 md:p-5 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  Applicazione sul Campo
                </p>
                <ul className="space-y-3">
                  {nodo.applications.map((app) => (
                    <li key={app.title} className="space-y-1">
                      <p className="text-sm font-semibold text-[#F4F1EA]">
                        {app.title}
                      </p>
                      <p className="text-sm leading-relaxed text-[#E8e1dd]">
                        {app.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tre gruppi di archi */}
      <section aria-labelledby="ts-archi-heading" className="space-y-5">
        <div className="space-y-2 px-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
            Percorso XV – XXI
          </p>
          <h2
            id="ts-archi-heading"
            className="font-display text-xl md:text-2xl text-[#F4F1EA]"
          >
            Le tre tappe del Terzo Settenario
          </h2>
          <p className="text-sm text-[#A39B93] max-w-3xl">
            {CONTENT.arcGroupsLead}
          </p>
        </div>

        <div className="space-y-4">
          {CONTENT.arcGroups.map((group) => (
            <article
              key={group.number}
              className="glass-tier-1 rounded-2xl p-6 md:p-7 space-y-5 border border-[#D4AF37]/12"
            >
              <div className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-0.5 w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 font-display text-sm text-[#D4AF37] inline-flex items-center justify-center tabular-nums"
                  aria-hidden="true"
                >
                  {group.number}
                </span>
                <h3 className="font-body font-semibold text-base md:text-lg text-[#F4F1EA] leading-snug">
                  {group.title}
                </h3>
              </div>

              <div className="space-y-4">
                {group.cards.map((card) => (
                  <div
                    key={card.roman}
                    className="rounded-xl bg-[#12100E]/60 border border-[#D4AF37]/15 p-4 md:p-5 space-y-2"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#D4AF37]">
                      {card.roman}. {card.name}
                    </p>
                    <p className="text-sm leading-relaxed text-[#E8e1dd]">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sintesi pratica */}
      <section
        aria-labelledby="ts-sintesi-heading"
        className="glass-tier-2 rounded-2xl p-6 md:p-8 space-y-4 border border-[#D4AF37]/25"
      >
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h2
              id="ts-sintesi-heading"
              className="font-display text-xl md:text-2xl text-[#F4F1EA]"
            >
              {CONTENT.sintesi.title}
            </h2>
            <p className="text-sm md:text-[15px] leading-relaxed text-[#E8e1dd]">
              {CONTENT.sintesi.body}
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={() => onNavigate('area-riservata')}
          className="min-h-[44px] px-5 py-2.5 rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/18 text-[#F4F1EA] text-sm font-semibold inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          Torna ai Percorsi &amp; Dispense
        </button>
      </div>
    </div>
  );
}
