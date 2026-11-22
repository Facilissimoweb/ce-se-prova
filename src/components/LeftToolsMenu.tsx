import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Plus, X } from 'lucide-react';

type LeftToolsMenuContextValue = {
  toolsOpen: boolean;
  setToolsOpen: (open: boolean) => void;
  toggleTools: () => void;
  /** Below Tailwind `md` — individual FABs hide behind Strumenti. */
  isCompact: boolean;
};

const LeftToolsMenuContext = createContext<LeftToolsMenuContextValue | null>(
  null
);

export function useLeftToolsMenu() {
  const ctx = useContext(LeftToolsMenuContext);
  if (!ctx) {
    throw new Error('useLeftToolsMenu must be used within LeftToolsMenuProvider');
  }
  return ctx;
}

/**
 * Shared chrome for left tool FABs:
 * - Mobile: hidden unless Strumenti menu is open
 * - Desktop (md+): always visible
 */
export function useLeftToolFabVisible(): boolean {
  const { toolsOpen, isCompact } = useLeftToolsMenu();
  return !isCompact || toolsOpen;
}

export function LeftToolsMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => {
      const compact = !mq.matches;
      setIsCompact(compact);
      if (!compact) setToolsOpen(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!toolsOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setToolsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toolsOpen]);

  const toggleTools = useCallback(() => {
    setToolsOpen((prev) => !prev);
  }, []);

  return (
    <LeftToolsMenuContext.Provider
      value={{ toolsOpen, setToolsOpen, toggleTools, isCompact }}
    >
      {children}
    </LeftToolsMenuContext.Provider>
  );
}

const fabChrome =
  'fixed z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#151311]/92 text-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:text-[#E6C65C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]';

/**
 * Mobile-only «Strumenti» (+ / ×) control. Desktop keeps the tool stack.
 * Opens cookie, accessibility, and Torna su (ENN-213: Nina is independent).
 */
/** Stable id for aria-controls on the expanded tool cluster. */
export const LEFT_TOOLS_MENU_ID = 'left-tools-menu';

export function ToolsFab() {
  const { toolsOpen, toggleTools, isCompact } = useLeftToolsMenu();

  if (!isCompact) return null;

  return (
    <button
      type="button"
      id="left-tools-fab"
      onClick={toggleTools}
      aria-label={toolsOpen ? 'Chiudi strumenti' : 'Strumenti'}
      aria-expanded={toolsOpen}
      aria-controls={LEFT_TOOLS_MENU_ID}
      title="Strumenti"
      className={`${fabChrome} bottom-10 left-4`}
    >
      {toolsOpen ? (
        <X className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Plus className="h-5 w-5" aria-hidden="true" />
      )}
      <span className="sr-only">Strumenti</span>
    </button>
  );
}
