import React from 'react';
import { Check, Lock, Send, Sparkles, X } from 'lucide-react';
import type { ArcanaCard, ChatMessage, DialoguePack } from '../../types/handoff';
import type { DialogueDomain } from '../../data/majorArcana';
import { dialogueTimePacks, siteContent } from '../../data/siteContent';
import { CopyText } from '../CopyText';
import { GoogleSignInButton } from '../GoogleSignInButton';

interface QuickPromptChip {
  label: string;
  prompt: string;
  domain: DialogueDomain;
}

interface ChatThreadPanelProps {
  messages: ChatMessage[];
  threadEndRef: React.RefObject<HTMLDivElement | null>;
  activeCard: ArcanaCard;
  showCmsKeys: boolean;
  showPassPanel: boolean;
  isExpired: boolean;
  selectedPackId: DialoguePack['id'];
  selectedPack: DialoguePack;
  customerName: string;
  customerEmail: string;
  unlocking: boolean;
  unlockError: string | null;
  inputText: string;
  isSignedIn: boolean;
  onSelectPack: (id: DialoguePack['id']) => void;
  onCustomerNameChange: (value: string) => void;
  onCustomerEmailChange: (value: string) => void;
  onUnlockSubmit: (e: React.FormEvent) => void;
  onClosePassPanel: () => void;
  onSignIn: () => void;
  onBookConsult: () => void;
  onInputChange: (value: string) => void;
  onSubmitMessage: (e: React.FormEvent) => void;
  /** Chip passano un `domain` esplicito (non solo regex sul testo). */
  onQuickPrompt: (prompt: string, domain: DialogueDomain) => void;
}

export function ChatThreadPanel({
  messages,
  threadEndRef,
  activeCard,
  showCmsKeys,
  showPassPanel,
  isExpired,
  selectedPackId,
  selectedPack,
  customerName,
  customerEmail,
  unlocking,
  unlockError,
  inputText,
  isSignedIn,
  onSelectPack,
  onCustomerNameChange,
  onCustomerEmailChange,
  onUnlockSubmit,
  onClosePassPanel,
  onSignIn,
  onBookConsult,
  onInputChange,
  onSubmitMessage,
  onQuickPrompt,
}: ChatThreadPanelProps) {
  return (
    <section
      aria-label="Pannello conversazione guidata"
      className="lg:col-span-7 flex flex-col min-h-[500px] lg:h-[660px]"
    >
      <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
        {messages.map((msg) => {
          const isClient = msg.sender === 'client';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 text-[11px] text-[#A39B93] mb-1 px-1">
                <span>{msg.authorName}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{msg.timestamp}</span>
                {msg.arcanaRef && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#D4AF37]">{msg.arcanaRef}</span>
                  </>
                )}
              </div>

              <div
                className={`max-w-[90%] sm:max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  isClient
                    ? 'bg-[#D4AF37]/16 border border-[#D4AF37]/40 text-[#F4F1EA]'
                    : 'bg-[#12100E]/85 border border-[#D4AF37]/15 text-[#E8e1dd]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={threadEndRef} />
      </div>

      {showPassPanel || isExpired ? (
        <div className="border-t border-[#D4AF37]/25 p-5 md:p-6 bg-[#151311]/95 space-y-4">
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
                {!isSignedIn && (
                  <GoogleSignInButton onClick={onSignIn} />
                )}
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
        </div>
      ) : (
        <div className="border-t border-[#D4AF37]/15 p-4 md:p-5 bg-[#151311]/70 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
            {(
              [
                {
                  label: `Cosa prevede ${activeCard.name} per il mio futuro?`,
                  prompt: `Cosa prevede ${activeCard.name} per il mio futuro?`,
                  domain: 'future',
                },
                {
                  label: `Lettura amore con ${activeCard.name}`,
                  prompt: `Lettura amore con ${activeCard.name}`,
                  domain: 'love',
                },
                {
                  label: 'Lettura lavoro e progetti',
                  prompt: 'Lettura lavoro e progetti',
                  domain: 'work',
                },
              ] satisfies QuickPromptChip[]
            ).map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => onQuickPrompt(chip.prompt, chip.domain)}
                className="px-3 py-1.5 rounded-lg bg-[#12100E]/90 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#A39B93] hover:text-[#F4F1EA] whitespace-nowrap shrink-0 transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmitMessage} className="flex items-center gap-2.5">
            <label htmlFor="chat-composer" className="sr-only">
              Fai una domanda all&apos;Arcano selezionato
            </label>
            <input
              id="chat-composer"
              type="text"
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={`Chiedi a ${activeCard.name} su futuro, amore o lavoro...`}
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-lg input-inset text-sm"
            />
            <button
              type="submit"
              aria-label="Invia messaggio nel dialogo"
              className="min-h-[44px] px-4 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Invia</span>
            </button>
          </form>

          <p className="text-[11px] text-[#A39B93]">
            <CopyText entry={siteContent.chat.whatsappBridgeNote} showKeys={showCmsKeys} />
          </p>
        </div>
      )}
    </section>
  );
}
