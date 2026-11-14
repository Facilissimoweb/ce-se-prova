import React, { useEffect, useState } from 'react';
import { Check, Cookie, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import type { CookieConsentPreferences } from '../types/handoff';
import { siteContent } from '../data/siteContent';
import { CopyText } from './CopyText';
import { TarotEmblemLogo } from './TarotEmblem';

export const COOKIE_CONSENT_STORAGE_KEY = 'tarot_italia_cookie_consent_v1';

interface PrivacyCookiesWidgetProps {
  showCmsKeys: boolean;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

const DEFAULT_PREFS: CookieConsentPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  updatedAtIso: '',
};

export function loadSavedCookiePreferences(): CookieConsentPreferences | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsentPreferences>;
    if (typeof parsed.functional !== 'boolean' || typeof parsed.analytics !== 'boolean') {
      return null;
    }
    return {
      necessary: true,
      functional: parsed.functional,
      analytics: parsed.analytics,
      updatedAtIso: typeof parsed.updatedAtIso === 'string' ? parsed.updatedAtIso : '',
    };
  } catch {
    return null;
  }
}

export function PrivacyCookiesWidget({
  showCmsKeys,
  isModalOpen,
  onOpenModal,
  onCloseModal,
}: PrivacyCookiesWidgetProps) {
  const [savedPrefs, setSavedPrefs] = useState<CookieConsentPreferences | null>(null);
  const [draftFunctional, setDraftFunctional] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const existing = loadSavedCookiePreferences();
    setSavedPrefs(existing);
    if (existing) {
      setDraftFunctional(existing.functional);
      setDraftAnalytics(existing.analytics);
    }
    setHydrated(true);
  }, []);

  // Sync draft state whenever modal opens
  useEffect(() => {
    if (isModalOpen && savedPrefs) {
      setDraftFunctional(savedPrefs.functional);
      setDraftAnalytics(savedPrefs.analytics);
    } else if (isModalOpen && !savedPrefs) {
      setDraftFunctional(DEFAULT_PREFS.functional);
      setDraftAnalytics(DEFAULT_PREFS.analytics);
    }
  }, [isModalOpen, savedPrefs]);

  const persistPreferences = (functional: boolean, analytics: boolean) => {
    const next: CookieConsentPreferences = {
      necessary: true,
      functional,
      analytics,
      updatedAtIso: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
    setSavedPrefs(next);
    setDraftFunctional(functional);
    setDraftAnalytics(analytics);
    onCloseModal();
  };

  if (!hydrated) return null;

  return (
    <>
      {/* Floating Initial Consent Card — Shown until user makes a choice */}
      {!savedPrefs && !isModalOpen && (
        <aside
          aria-label="Avviso Cookie e Privacy"
          className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:w-[410px] z-40 glass-tier-2 rounded-2xl p-5 border border-[#D4AF37]/30"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Cookie className="w-4 h-4 text-[#D4AF37] shrink-0" aria-hidden="true" />
                <h2 className="font-display text-sm md:text-base text-[#F4F1EA]">
                  <CopyText entry={siteContent.privacy.bannerTitle} showKeys={showCmsKeys} />
                </h2>
              </div>
              <span className="text-[11px] font-medium text-[#A39B93]">GDPR</span>
            </div>

            <p className="text-xs leading-relaxed text-[#A39B93]">
              <CopyText entry={siteContent.privacy.bannerBody} showKeys={showCmsKeys} />
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => persistPreferences(true, true)}
                className="px-3.5 py-2 min-h-[40px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-xs font-semibold whitespace-nowrap transition-colors"
              >
                Accetta Tutti
              </button>
              <button
                type="button"
                onClick={() => persistPreferences(false, false)}
                className="px-3.5 py-2 min-h-[40px] rounded-lg bg-[#12100E]/80 border border-[#D4AF37]/25 hover:border-[#D4AF37] text-[#F4F1EA] text-xs font-medium whitespace-nowrap transition-colors"
              >
                Solo Necessari
              </button>
              <button
                type="button"
                onClick={onOpenModal}
                className="px-3 py-2 min-h-[40px] rounded-lg text-xs font-medium text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1.5 whitespace-nowrap transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Preferenze
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Full Preferences & GDPR Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <div className="w-full sm:max-w-lg max-h-[90vh] overflow-y-auto glass-tier-2 rounded-t-3xl sm:rounded-2xl border border-[#D4AF37]/30 flex flex-col">
            {/* Standardized Tarot Italia Modal Header */}
            <div className="px-6 py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <TarotEmblemLogo size={32} className="shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    Tarot Italia · GDPR
                  </p>
                  <h2 id="privacy-modal-title" className="font-display text-lg md:text-xl text-[#F4F1EA]">
                    <CopyText entry={siteContent.privacy.modalTitle} showKeys={showCmsKeys} />
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                aria-label="Chiudi preferenze privacy e cookie"
                className="w-10 h-10 rounded-lg border border-[#D4AF37]/25 flex items-center justify-center text-[#A39B93] hover:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="gold-divider" aria-hidden="true" />

            <div className="p-6 space-y-6">
              <p className="text-xs md:text-sm leading-relaxed text-[#A39B93]">
                <CopyText entry={siteContent.privacy.modalIntro} showKeys={showCmsKeys} />
              </p>

              {/* Cookie Categories List */}
              <div className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 divide-y divide-[#D4AF37]/15">
                {/* 1. Necessary */}
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#F4F1EA]">
                      Cookie Tecnici e Sessione
                    </p>
                    <p className="text-xs leading-relaxed text-[#A39B93]">
                      Indispensabili per sicurezza, sessione Supabase Auth e memorizzazione della scelta sui cookie.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#D4AF37] whitespace-nowrap shrink-0 mt-0.5 inline-flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    Sempre attivi
                  </span>
                </div>

                {/* 2. Functional */}
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <label htmlFor="toggle-functional-cookies" className="text-sm font-semibold text-[#F4F1EA] block cursor-pointer">
                      Preferenze Funzionali
                    </label>
                    <p className="text-xs leading-relaxed text-[#A39B93]">
                      Conservano il consulto selezionato e le preferenze di lettura tra una visita e l&apos;altra.
                    </p>
                  </div>
                  <button
                    id="toggle-functional-cookies"
                    type="button"
                    role="switch"
                    aria-checked={draftFunctional}
                    onClick={() => setDraftFunctional((prev) => !prev)}
                    className={`relative w-11 h-6 rounded-full shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      draftFunctional ? 'bg-[#D4AF37]' : 'bg-[#2C2927] border border-[#A39B93]/35'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full transition-transform duration-150 ${
                        draftFunctional
                          ? 'translate-x-6 bg-[#12100E]'
                          : 'translate-x-1 bg-[#A39B93]'
                      }`}
                    />
                  </button>
                </div>

                {/* 3. Analytics */}
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <label htmlFor="toggle-analytics-cookies" className="text-sm font-semibold text-[#F4F1EA] block cursor-pointer">
                      Statistiche Anonimizzate
                    </label>
                    <p className="text-xs leading-relaxed text-[#A39B93]">
                      Misurazione aggregata delle visite senza profilazione pubblicitaria né tracciamento di terze parti.
                    </p>
                  </div>
                  <button
                    id="toggle-analytics-cookies"
                    type="button"
                    role="switch"
                    aria-checked={draftAnalytics}
                    onClick={() => setDraftAnalytics((prev) => !prev)}
                    className={`relative w-11 h-6 rounded-full shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      draftAnalytics ? 'bg-[#D4AF37]' : 'bg-[#2C2927] border border-[#A39B93]/35'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full transition-transform duration-150 ${
                        draftAnalytics
                          ? 'translate-x-6 bg-[#12100E]'
                          : 'translate-x-1 bg-[#A39B93]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Concise GDPR Privacy Summary */}
              <div className="rounded-xl bg-[#12100E]/65 border border-[#D4AF37]/15 p-4 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1 text-xs leading-relaxed text-[#A39B93]">
                  <p className="text-[#F4F1EA] font-medium">
                    Informativa Privacy (Reg. UE 2016/679)
                  </p>
                  <p>
                    <CopyText entry={siteContent.privacy.gdprSummary} showKeys={showCmsKeys} />
                  </p>
                </div>
              </div>

              {savedPrefs?.updatedAtIso && (
                <p className="text-[11px] text-[#A39B93] tabular-nums">
                  Ultimo consenso registrato:{' '}
                  {new Date(savedPrefs.updatedAtIso).toLocaleString('it-IT', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => persistPreferences(false, false)}
                  className="px-4 py-2.5 min-h-[44px] rounded-lg border border-[#A39B93]/30 hover:border-[#D4AF37] text-xs font-medium text-[#A39B93] hover:text-[#F4F1EA] whitespace-nowrap transition-colors"
                >
                  Solo Necessari
                </button>
                <button
                  type="button"
                  onClick={() => persistPreferences(draftFunctional, draftAnalytics)}
                  className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs font-semibold text-[#F4F1EA] whitespace-nowrap transition-colors"
                >
                  Salva Preferenze
                </button>
                <button
                  type="button"
                  onClick={() => persistPreferences(true, true)}
                  className="px-5 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-xs font-semibold whitespace-nowrap transition-colors"
                >
                  Accetta Tutti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
