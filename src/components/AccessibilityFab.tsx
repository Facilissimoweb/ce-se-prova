import React, { useEffect, useId, useState } from 'react';
import { Contrast, Pause, Type, X } from 'lucide-react';
import { useLeftToolFabVisible, useLeftToolsMenu } from './LeftToolsMenu';

export const A11Y_PREFS_STORAGE_KEY = 'tarot_italia_a11y_prefs_v1';

/**
 * Classic «persona a braccia aperte» (universal-access / open-arms figure).
 * Filled silhouette so it stays readable at FAB size — not Lucide Accessibility.
 */
function OpenArmsPersonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      {/* Head */}
      <circle cx="12" cy="4.6" r="2.35" />
      {/* Body + outstretched arms + open legs (single silhouette) */}
      <path d="M3.2 9.1c0-.7.55-1.25 1.25-1.25h15.1c.7 0 1.25.55 1.25 1.25s-.55 1.25-1.25 1.25h-5.35v2.35l4.85 7.55a1.25 1.25 0 0 1-2.1 1.35L12 14.55l-4.95 7.15a1.25 1.25 0 0 1-2.1-1.35l4.85-7.55V10.35H4.45c-.7 0-1.25-.55-1.25-1.25Z" />
    </svg>
  );
}

export interface A11yPreferences {
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
}

const DEFAULT_PREFS: A11yPreferences = {
  largeText: false,
  highContrast: false,
  reduceMotion: false,
};

function readStoredPrefs(): A11yPreferences {
  try {
    const raw = window.localStorage.getItem(A11Y_PREFS_STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<A11yPreferences>;
    return {
      largeText: Boolean(parsed.largeText),
      highContrast: Boolean(parsed.highContrast),
      reduceMotion: Boolean(parsed.reduceMotion),
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function applyPrefsToDocument(prefs: A11yPreferences) {
  const root = document.documentElement;
  root.classList.toggle('a11y-large-text', prefs.largeText);
  root.classList.toggle('a11y-high-contrast', prefs.highContrast);
  root.classList.toggle('a11y-reduce-motion', prefs.reduceMotion);
}

/**
 * Left tools cluster: under the cookie reopen control
 * (cookie → accessibility → Torna su; Nina is separate — ENN-213).
 * Opens «Visualizzazione facilitata». On mobile, only when «Strumenti» is open.
 */
export function AccessibilityFab() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPreferences>(DEFAULT_PREFS);
  const [hydrated, setHydrated] = useState(false);
  const fabVisible = useLeftToolFabVisible();
  const { isCompact, setToolsOpen } = useLeftToolsMenu();

  useEffect(() => {
    const existing = readStoredPrefs();
    setPrefs(existing);
    applyPrefsToDocument(existing);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const persist = (next: A11yPreferences) => {
    setPrefs(next);
    applyPrefsToDocument(next);
    try {
      window.localStorage.setItem(A11Y_PREFS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  };

  const toggle = (key: keyof A11yPreferences) => {
    persist({ ...prefs, [key]: !prefs[key] });
  };

  const reset = () => persist(DEFAULT_PREFS);

  if (!hydrated) return null;

  const anyActive = prefs.largeText || prefs.highContrast || prefs.reduceMotion;

  return (
    <>
      {fabVisible && (
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
            if (isCompact) setToolsOpen(false);
          }}
          aria-label="Visualizzazione facilitata"
          aria-expanded={open}
          aria-controls={panelId}
          title="Visualizzazione facilitata"
          className="fixed bottom-[13rem] left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#151311]/92 text-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] md:bottom-[9rem] md:left-6"
        >
          <OpenArmsPersonIcon className="h-5 w-5" />
          {anyActive && (
            <span
              className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#D4AF37]"
              aria-hidden="true"
            />
          )}
        </button>
      )}

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label="Visualizzazione facilitata"
          className="fixed z-50 max-h-[min(70dvh,calc(100dvh-7.5rem))] w-auto max-w-[20.5rem] overflow-y-auto overscroll-contain rounded-2xl border border-[#D4AF37]/30 bg-[#151311]/96 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md left-[max(1rem,env(safe-area-inset-left,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] bottom-[calc(6.25rem+env(safe-area-inset-bottom,0px))] md:bottom-[16.25rem] md:left-6 md:right-auto md:max-h-none md:w-[20.5rem] md:overflow-visible"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-sm tracking-[0.08em] text-[#D4AF37] uppercase">
                Accessibilità
              </p>
              <h2 className="mt-1 font-display text-lg text-[#F4F1EA]">
                Visualizzazione facilitata
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#A39B93]">
                Opzioni per leggere e navigare con più comodità. La scelta resta
                salvata su questo dispositivo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chiudi visualizzazione facilitata"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#A39B93] transition-colors hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <ul className="space-y-2">
            <li>
              <ToggleRow
                id="a11y-large-text"
                checked={prefs.largeText}
                onChange={() => toggle('largeText')}
                icon={<Type className="h-4 w-4" aria-hidden="true" />}
                label="Testo più grande"
                description="Aumenta la dimensione del testo su tutto il sito."
              />
            </li>
            <li>
              <ToggleRow
                id="a11y-high-contrast"
                checked={prefs.highContrast}
                onChange={() => toggle('highContrast')}
                icon={<Contrast className="h-4 w-4" aria-hidden="true" />}
                label="Contrasto elevato"
                description="Rende testo e bordi più nitidi sullo sfondo scuro."
              />
            </li>
            <li>
              <ToggleRow
                id="a11y-reduce-motion"
                checked={prefs.reduceMotion}
                onChange={() => toggle('reduceMotion')}
                icon={<Pause className="h-4 w-4" aria-hidden="true" />}
                label="Riduci movimento"
                description="Disattiva animazioni e scorrimenti fluidi."
              />
            </li>
          </ul>

          <div className="mt-3 flex justify-end border-t border-[#D4AF37]/15 pt-3">
            <button
              type="button"
              onClick={reset}
              disabled={!anyActive}
              className="text-xs font-semibold tracking-[0.06em] text-[#A39B93] uppercase transition-colors hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Reimposta
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  id,
  checked,
  onChange,
  icon,
  label,
  description,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#D4AF37]/15 bg-[#12100E]/55 px-3 py-2.5 transition-colors hover:border-[#D4AF37]/35"
    >
      <span className="mt-0.5 text-[#D4AF37]">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[#F4F1EA]">{label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-[#A39B93]">
          {description}
        </span>
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
          checked
            ? 'border-[#D4AF37] bg-[#D4AF37]/25'
            : 'border-[#A39B93]/35 bg-[#12100E]'
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full transition-transform ${
            checked
              ? 'translate-x-5 bg-[#D4AF37]'
              : 'translate-x-1 bg-[#A39B93]'
          }`}
        />
      </span>
    </label>
  );
}
