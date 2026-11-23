import React from 'react';
import { Check, Lock, X } from 'lucide-react';
import type { DialoguePack } from '../../types/handoff';
import { dialogueTimePacks } from '../../data/siteContent';
import { GoogleSignInButton } from '../GoogleSignInButton';

/**
 * Pannello Pass a Tempo per Dialogo (estrazione in sola lettura).
 * Nessun composer / chip domande: il resoconto vive in ActiveCardPanel.
 */
interface ChatThreadPanelProps {
  showPassPanel: boolean;
  isExpired: boolean;
  selectedPackId: DialoguePack['id'];
  selectedPack: DialoguePack;
  customerName: string;
  customerEmail: string;
  unlocking: boolean;
  unlockError: string | null;
  isSignedIn: boolean;
  onSelectPack: (id: DialoguePack['id']) => void;
  onCustomerNameChange: (value: string) => void;
  onCustomerEmailChange: (value: string) => void;
  onUnlockSubmit: (e: React.FormEvent) => void;
  onClosePassPanel: () => void;
  onSignIn: () => void;
  onBookConsult: () => void;
}

export function ChatThreadPanel({
  showPassPanel,
  isExpired,
  selectedPackId,
  selectedPack,
  customerName,
  customerEmail,
  unlocking,
  unlockError,
  isSignedIn,
  onSelectPack,
  onCustomerNameChange,
  onCustomerEmailChange,
  onUnlockSubmit,
  onClosePassPanel,
  onSignIn,
  onBookConsult,
}: ChatThreadPanelProps) {
  if (!showPassPanel && !isExpired) {
    return null;
  }

  return (
    <section
      aria-label="Acquisto tempo dialogo"
      className="border-t border-[#D4AF37]/25 p-5 md:p-6 bg-[#151311]/95 space-y-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37] inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            {isExpired
              ? 'Prova gratuita di 5 minuti conclusa'
              : 'Acquista o estendi il tempo di dialogo'}
          </p>
          <h3 className="font-display text-lg text-[#F4F1EA]">
            Scegli un Pass a Tempo per proseguire il Dialogo Tarot
          </h3>
        </div>
        {!isExpired && (
          <button
            type="button"
            onClick={onClosePassPanel}
            aria-label="Chiudi pannello tariffe dialogo"
            className="w-8 h-8 rounded-lg border border-[#D4AF37]/25 flex items-center justify-center text-[#A39B93] hover:text-[#F4F1EA]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {dialogueTimePacks.map((pack) => {
          const selected = pack.id === selectedPackId;
          return (
            <button
              key={pack.id}
              type="button"
              onClick={() => onSelectPack(pack.id)}
              aria-pressed={selected}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selected
                  ? 'bg-[#D4AF37]/16 border-[#D4AF37]'
                  : 'bg-[#12100E]/80 border-[#D4AF37]/20 hover:border-[#D4AF37]/45'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#D4AF37] tabular-nums">
                  {pack.durationMinutes} min
                </span>
                <span className="font-display text-base text-[#F4F1EA] tabular-nums">
                  € {pack.priceEur}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#F4F1EA] mt-1">
                {pack.title.split('·')[0].trim()}
              </p>
              <p className="text-[11px] text-[#A39B93] mt-0.5 line-clamp-2">
                {pack.focusLabel}
              </p>
            </button>
          );
        })}
      </div>

      <form onSubmit={onUnlockSubmit} className="space-y-3" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            placeholder="Nome e Cognome *"
            aria-label="Nome e Cognome"
            className="min-h-[42px] px-3.5 py-2 rounded-lg input-inset text-xs md:text-sm"
          />
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => onCustomerEmailChange(e.target.value)}
            placeholder="Email *"
            aria-label="Indirizzo email"
            className="min-h-[42px] px-3.5 py-2 rounded-lg input-inset text-xs md:text-sm"
          />
        </div>

        {unlockError && (
          <p role="alert" className="text-xs text-[#ffb4ab]">
            {unlockError}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {!isSignedIn && <GoogleSignInButton onClick={onSignIn} />}
            <button
              type="button"
              onClick={onBookConsult}
              className="px-3.5 py-2 min-h-[40px] rounded-lg border border-[#A39B93]/25 hover:border-[#D4AF37] text-xs font-medium text-[#A39B93] hover:text-[#F4F1EA] whitespace-nowrap"
            >
              Prenota Chiamata Vocale
            </button>
          </div>

          <button
            type="submit"
            disabled={unlocking}
            className="px-5 py-2.5 min-h-[42px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-xs md:text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Check className="w-4 h-4" />
            {unlocking
              ? 'Attivazione...'
              : `Attiva ${selectedPack.durationMinutes} min (€ ${selectedPack.priceEur})`}
          </button>
        </div>
      </form>
    </section>
  );
}
