import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  FileText,
  Lock,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import type { ScreenId } from '../../types/handoff';
import { TarotEmblemLogo } from '../TarotEmblem';

interface ReservedLoginGateProps {
  authLoading: boolean;
  authError: string | null;
  onSignIn: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export function ReservedLoginGate({
  authLoading,
  authError,
  onSignIn,
  onNavigate,
}: ReservedLoginGateProps) {
  if (authLoading) {
    return (
      <div className="pt-12 pb-16 flex justify-center">
        <div className="glass-tier-1 rounded-2xl p-8 w-full max-w-lg text-center space-y-3">
          <TarotEmblemLogo size={72} className="mx-auto" />
          <p className="text-sm text-[#A39B93]">Verifica sessione in corso...</p>
        </div>
      </div>
    );
  }

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
          Accedi con il tuo account Google per consultare i percorsi formativi acquistati,
          scaricare le dispense formulate da Maria Teresa Rogani, salvare i tuoi appunti di
          studio e ritrovare i tuoi consulti.
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
              Ogni dispensa dei percorsi{' '}
              <strong className="text-[#F4F1EA]">Arcani Maggiori</strong>,{' '}
              <strong className="text-[#F4F1EA]">Arcani Minori</strong> e{' '}
              <strong className="text-[#F4F1EA]">Metodi di Stesura</strong> è collegata in
              modo personale al tuo profilo protetto.
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
              onClick={onSignIn}
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
                <strong className="text-[#F4F1EA]">12 Dispense Formulate</strong> suddivise
                nei tre pilastri del metodo Tarot Italia.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
              <span>
                <strong className="text-[#F4F1EA]">Quaderno Appunti</strong> personale
                salvato su ogni modulo studiato e completato.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
              <span>
                <strong className="text-[#F4F1EA]">Storico Sessioni</strong> con date, orari
                e note dei consulti individuali prenotati.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
              <span>
                <strong className="text-[#F4F1EA]">Accesso Riservato</strong> vincolato al
                tuo indirizzo email verificato via Firebase Auth.
              </span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
