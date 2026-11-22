import React from 'react';
import { ArrowRight, BookOpen, Lock } from 'lucide-react';
import type { CourseId, ScreenId } from '../types/handoff';
import { SCROLL_LANDMARKS } from '../lib/scrollNavigation';
import { GoogleSignInButton } from './GoogleSignInButton';

type Props = {
  courseSlug: CourseId;
  moduleLink: string | null;
  signedIn: boolean;
  loading: boolean;
  error: string | null;
  onNavigate: (
    screen: ScreenId,
    options?: { focusId?: string }
  ) => void;
  onSignIn: () => Promise<unknown>;
};

const COURSE_LABELS: Record<CourseId, string> = {
  'arcani-maggiori': 'Arcani Maggiori',
  'arcani-minori': 'Arcani Minori',
  'metodi-stesura': 'Metodi di Stesura',
};

/**
 * ENN-131 — Guest / non-purchaser CTA under the public blog teaser.
 * Purchase landing: Corsi Maggiori checkout (default course = Maggiori).
 */
export function BlogCourseGate({
  courseSlug,
  moduleLink,
  signedIn,
  loading,
  error,
  onNavigate,
  onSignIn,
}: Props) {
  const courseLabel = COURSE_LABELS[courseSlug] ?? courseSlug;
  const moduleHint =
    moduleLink != null
      ? ` · legato al Modulo ${moduleLink}`
      : '';

  return (
    <aside
      className="mt-8 space-y-5 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/08 p-5 md:p-7"
      aria-label="Contenuto riservato ai corsisti"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#12100E]/40 text-[#D4AF37]">
          <Lock className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D4AF37]">
            Approfondimento riservato{moduleHint}
          </p>
          <h2 className="font-display text-xl leading-snug text-[#F4F1EA] md:text-2xl">
            Continua con il percorso {courseLabel}
          </h2>
          <p className="text-sm leading-relaxed text-[#E8e1dd]/90">
            L&apos;intro sopra è pubblica. Il corpo più profondo si sblocca se
            hai acquistato il corso {courseLabel}
            {moduleLink ? ` (Modulo ${moduleLink})` : ''} — lo stesso accesso
            dell&apos;Area Riservata. Nessun acquisto per singolo articolo
            (Phase 1).
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-[#A39B93]" role="status">
          Verifico l&apos;accesso al corso…
        </p>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={() =>
              onNavigate('corsi', {
                focusId: SCROLL_LANDMARKS.corsiCheckout,
              })
            }
            className="cta-label inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#12100E] transition-all hover:bg-[#E6C65C] hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
          >
            Vai a Corsi · {courseLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          {courseSlug === 'arcani-maggiori' && (
            <button
              type="button"
              onClick={() =>
                onNavigate('corsi', {
                  focusId: SCROLL_LANDMARKS.corsiMaggioriPreview,
                })
              }
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/35 px-5 py-3 text-sm font-medium text-[#F4F1EA] transition-colors hover:border-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <BookOpen className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              Anteprima Modulo 01
            </button>
          )}

          {!signedIn && (
            <GoogleSignInButton
              onClick={() => {
                void onSignIn();
              }}
            >
              Accedi per sbloccare
            </GoogleSignInButton>
          )}

          {signedIn && (
            <button
              type="button"
              onClick={() => onNavigate('area-riservata')}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/25 px-5 py-3 text-sm font-medium text-[#A39B93] transition-colors hover:border-[#D4AF37]/50 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Area Riservata
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-[#A39B93]" role="alert">
          {error}
        </p>
      )}
    </aside>
  );
}
