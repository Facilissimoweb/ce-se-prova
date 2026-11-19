import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { useAuth } from '../context/AuthContext';
import { ReservedLoginGate } from '../components/reserved/ReservedLoginGate';

/** Static Gemini lab HTML served from `public/laboratorio/` (ENN-107). */
export const LABORATORIO_ARCANI_MAGGIORI_ASSET =
  '/laboratorio/arcani-maggiori-primo-step.html';

interface LaboratorioArcaniMaggioriScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

/**
 * Fullscreen mobile-first shell for the Maggiori Primo Step lab.
 * Auth matches Area Riservata; HTML stays a static asset (not rewritten into React).
 */
export function LaboratorioArcaniMaggioriScreen({
  onNavigate,
}: LaboratorioArcaniMaggioriScreenProps) {
  const { user, loading: authLoading, authError, signInWithGoogle } = useAuth();

  if (authLoading || !user) {
    return (
      <div className="min-h-[100dvh] w-full px-5 pt-6 pb-10">
        <ReservedLoginGate
          authLoading={authLoading}
          authError={authError}
          onSignIn={signInWithGoogle}
          onNavigate={onNavigate}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#0a0910] text-[#F4F1EA]">
      <header
        className="shrink-0 z-10 border-b border-[#D4AF37]/25 bg-[#0a0910]/95 backdrop-blur-md pt-[env(safe-area-inset-top,0px)]"
        style={{ minHeight: 'calc(2.75rem + env(safe-area-inset-top, 0px))' }}
      >
        <div className="flex items-center gap-3 px-3 sm:px-4 h-11">
          <button
            type="button"
            onClick={() => onNavigate('area-riservata')}
            className="min-h-[44px] min-w-[44px] -ml-1 inline-flex items-center justify-center gap-2 rounded-lg px-2 text-sm font-medium text-[#F4F1EA] hover:bg-[#D4AF37]/12 hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            aria-label="Torna all'Area Personale"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-[#D4AF37]" />
            <span className="truncate text-left">
              <span className="sm:hidden">Area Personale</span>
              <span className="hidden sm:inline">Torna all&apos;Area Personale</span>
            </span>
          </button>
          <div className="min-w-0 flex-1 text-right">
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#D4AF37] font-semibold truncate">
              Laboratorio Primo Step
            </p>
            <p className="text-xs text-[#A39B93] truncate hidden sm:block">
              Arcani Maggiori · Area Riservata
            </p>
          </div>
        </div>
      </header>

      <iframe
        title="Laboratorio Arcani Maggiori — Primo Step"
        src={LABORATORIO_ARCANI_MAGGIORI_ASSET}
        className="flex-1 w-full min-h-0 border-0 bg-[#0a0910]"
        allow="clipboard-write"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
