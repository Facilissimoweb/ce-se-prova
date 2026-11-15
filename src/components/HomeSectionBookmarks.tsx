import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

export const HOME_CONSULTI_SECTION_ID = 'home-consulti';
export const HOME_DIDATTICA_SECTION_ID = 'home-didattica';

type BookmarkTarget = {
  id: typeof HOME_CONSULTI_SECTION_ID | typeof HOME_DIDATTICA_SECTION_ID;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
};

const BOOKMARKS: BookmarkTarget[] = [
  {
    id: HOME_CONSULTI_SECTION_ID,
    label: 'Consulti',
    shortLabel: 'Consulti',
    icon: Sparkles,
  },
  {
    id: HOME_DIDATTICA_SECTION_ID,
    label: 'Didattica',
    shortLabel: 'Didattica',
    icon: BookOpen,
  },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

type Props = {
  /** When false, hide both bookmark UIs (e.g. not on Home). */
  visible: boolean;
};

/**
 * Home-only navigation aids: horizontal section bookmarks + right-edge bookmark tabs
 * for Consulti and Didattica.
 */
export function HomeSectionBookmarks({ visible }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) {
      setActiveId(null);
      return;
    }

    const nodes = BOOKMARKS.map((b) => document.getElementById(b.id)).filter(
      (n): n is HTMLElement => Boolean(n)
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0.15, 0.35, 0.55],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Horizontal bookmark strip — Home only */}
      <div className="pointer-events-none sticky top-14 z-20 -mx-1 mb-2 md:top-16">
        <div className="pointer-events-auto flex justify-center px-1 py-2">
          <nav
            aria-label="Segnalibri sezioni Home"
            className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/20 bg-[#151311]/82 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
          >
            {BOOKMARKS.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isActive
                      ? 'bg-[#D4AF37]/18 text-[#D4AF37]'
                      : 'text-[#A39B93] hover:bg-[#D4AF37]/08 hover:text-[#F4F1EA]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Right-edge bookmark tabs — avoid FloatingSideRail (xl:right-6) */}
      <aside
        aria-label="Segnalibri laterali Consulti e Didattica"
        className="pointer-events-none fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 md:flex xl:right-[4.75rem]"
      >
        {BOOKMARKS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-current={isActive ? 'true' : undefined}
              title={item.label}
              className={`pointer-events-auto group flex items-center gap-2 rounded-l-lg border border-r-0 py-3 pl-2.5 pr-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isActive
                  ? 'border-[#D4AF37]/45 bg-[#D4AF37]/18 text-[#D4AF37]'
                  : 'border-[#D4AF37]/22 bg-[#151311]/88 text-[#A39B93] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#F4F1EA]'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span
                className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.08em] opacity-0 transition-all duration-200 group-hover:max-w-[7rem] group-hover:opacity-100 group-focus-visible:max-w-[7rem] group-focus-visible:opacity-100"
                style={
                  isActive
                    ? { maxWidth: '7rem', opacity: 1 }
                    : undefined
                }
              >
                {item.shortLabel}
              </span>
            </button>
          );
        })}
      </aside>
    </>
  );
}
