import React from 'react';
import { X, Eye, EyeOff, Database, CreditCard, MessageSquare } from 'lucide-react';
import { handoffArchitectureSpec } from '../data/siteContent';

interface HandoffDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  showCmsKeys: boolean;
  onToggleCmsKeys: () => void;
}

export function HandoffDrawer({
  isOpen,
  onClose,
  showCmsKeys,
  onToggleCmsKeys,
}: HandoffDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="handoff-drawer-title"
    >
      <div className="w-full max-w-md h-full glass-tier-2 border-l border-[#D4AF37]/25 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
              Handoff Tecnico · Cursor / Vercel
            </p>
            <h2
              id="handoff-drawer-title"
              className="font-display text-xl text-[#F4F1EA] mt-1"
            >
              Architettura CMS &amp; Integrazioni
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi pannello handoff"
            className="w-10 h-10 rounded-lg border border-[#D4AF37]/25 flex items-center justify-center text-[#A39B93] hover:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="gold-divider" aria-hidden="true" />

        {/* Live vs [COPY: ...] key toggle */}
        <div className="p-4 rounded-xl bg-[#12100E]/85 border border-[#D4AF37]/20 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-[#F4F1EA]">
              Modalità Placeholder CMS
            </span>
            <button
              type="button"
              onClick={onToggleCmsKeys}
              className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                showCmsKeys
                  ? 'bg-[#D4AF37] text-[#12100E]'
                  : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20'
              }`}
            >
              {showCmsKeys ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  Mostra Testo Reale
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  Mostra Chiavi [COPY]
                </>
              )}
            </button>
          </div>
          <p className="text-xs leading-relaxed text-[#A39B93]">
            Attiva la modalità chiavi per ispezionare in tempo reale i token{' '}
            <code className="text-[#E6C65C]">[COPY: siteContent.*]</code> e{' '}
            <code className="text-[#E6C65C]">[COPY: tariffa.placeholder.*]</code>{' '}
            mappati in <code className="text-[#F4F1EA]">src/data/siteContent.ts</code>.
          </p>
        </div>

        {/* Supabase Auth annotation */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Database className="w-4 h-4 shrink-0" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.06em]">
              Supabase Auth &amp; Database
            </h3>
          </div>
          <div className="p-4 rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 text-xs text-[#A39B93] space-y-2">
            <p className="text-[#F4F1EA]">
              Strategia: <span className="font-mono text-[#E6C65C]">{handoffArchitectureSpec.supabase.strategy}</span>
            </p>
            <p>
              Tabelle previste: <span className="font-mono text-[#F4F1EA]">{handoffArchitectureSpec.supabase.tables.join(', ')}</span>
            </p>
            <p className="leading-relaxed">{handoffArchitectureSpec.supabase.rlsPolicyNote}</p>
          </div>
        </section>

        {/* Stripe Checkout annotation */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <CreditCard className="w-4 h-4 shrink-0" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.06em]">
              Stripe Checkout Handoff
            </h3>
          </div>
          <div className="p-4 rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 text-xs text-[#A39B93] space-y-2">
            <p className="text-[#F4F1EA]">
              Price IDs configurati: 45m, 60m, 90m.
            </p>
            <p className="leading-relaxed">
              Nessuna transazione simulata: il modulo Prenotazione compila il payload strutturato{' '}
              <code className="text-[#E6C65C]">StripeCheckoutHandoffPayload</code> pronto per la route server{' '}
              <code className="text-[#F4F1EA]">/api/checkout/session</code>.
            </p>
          </div>
        </section>

        {/* WhatsApp Webhook annotation */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <MessageSquare className="w-4 h-4 shrink-0" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.06em]">
              WhatsApp Cloud Webhook
            </h3>
          </div>
          <div className="p-4 rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 text-xs text-[#A39B93] space-y-2">
            <p className="text-[#F4F1EA]">
              Endpoint previsto: <span className="font-mono text-[#E6C65C]">{handoffArchitectureSpec.whatsapp.webhookEndpoint}</span>
            </p>
            <p className="leading-relaxed">
              Bridge diretto attivo tramite deep-link WhatsApp dalla schermata Dialogo Tarot con contesto dell’Arcano estratto.
            </p>
          </div>
        </section>

        {/* Env Vars checklist */}
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#A39B93]">
            Variabili d&apos;ambiente Vercel
          </h3>
          <ul className="p-4 rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 space-y-1.5 font-mono text-[11px] text-[#E6C65C]">
            {handoffArchitectureSpec.stripeEnvVars.map((envVar) => (
              <li key={envVar}>{envVar}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
