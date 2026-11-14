import React from 'react';
import { Clock, CreditCard } from 'lucide-react';
import type { DialogueAccessStatus } from '../../types/handoff';
import { formatCountdown } from '../../lib/dialogueSession';

interface DialogueAccessBarProps {
  accessStatus: DialogueAccessStatus;
  liveRemainingSeconds: number;
  isExpired: boolean;
  progressRatio: number;
  showPassPanel: boolean;
  onTogglePassPanel: () => void;
}

export function DialogueAccessBar({
  accessStatus,
  liveRemainingSeconds,
  isExpired,
  progressRatio,
  showPassPanel,
  onTogglePassPanel,
}: DialogueAccessBarProps) {
  return (
    <div className="px-5 md:px-6 py-3 bg-[#151311]/90 border-t border-[#D4AF37]/15 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <Clock
            className={`w-3.5 h-3.5 shrink-0 ${
              isExpired ? 'text-[#ffb4ab]' : 'text-[#D4AF37]'
            }`}
            aria-hidden="true"
          />
          {accessStatus.mode === 'ready' && (
            <>
              <span className="font-semibold text-[#F4F1EA]">
                Prova gratuita:{' '}
                <span className="tabular-nums text-[#D4AF37]">05:00</span> disponibili
              </span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">
                ·
              </span>
              <span className="text-[#A39B93]">
                Il timer parte alla tua prima domanda o estrazione
              </span>
            </>
          )}
          {accessStatus.mode === 'free_trial' && (
            <>
              <span className="font-semibold text-[#F4F1EA]">Prova gratuita attiva</span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">
                ·
              </span>
              <span className="font-mono font-semibold text-[#D4AF37] tabular-nums">
                {formatCountdown(liveRemainingSeconds)} rimanenti
              </span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">
                ·
              </span>
              <span className="text-[#A39B93]">
                Dopo i 5 min puoi proseguire con un pass a tempo
              </span>
            </>
          )}
          {accessStatus.mode === 'paid_pass' && (
            <>
              <span className="font-semibold text-[#E6C65C]">
                Pass a tempo attivo ({accessStatus.activePackId})
              </span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">
                ·
              </span>
              <span className="font-mono font-semibold text-[#D4AF37] tabular-nums">
                {formatCountdown(liveRemainingSeconds)} rimanenti
              </span>
            </>
          )}
          {accessStatus.mode === 'expired' && (
            <>
              <span className="font-semibold text-[#ffb4ab]">
                I 5 minuti gratuiti sono terminati
              </span>
              <span aria-hidden="true" className="text-[#D4AF37]/40">
                ·
              </span>
              <span className="text-[#A39B93]">
                Sblocca un pacchetto minuti per continuare il dialogo
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onTogglePassPanel}
          className="text-xs font-semibold text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1.5 whitespace-nowrap"
        >
          <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />
          {showPassPanel ? 'Torna al dialogo' : 'Tariffe a tempo (5 / 10 / 15m)'}
        </button>
      </div>

      <div className="h-[2px] w-full bg-[#D4AF37]/15 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            isExpired ? 'bg-[#ffb4ab]/60' : 'bg-[#D4AF37]'
          }`}
          style={{ width: `${Math.round(progressRatio * 100)}%` }}
        />
      </div>
    </div>
  );
}
