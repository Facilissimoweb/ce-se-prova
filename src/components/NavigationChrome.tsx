import React from 'react';
import { Calendar, Compass, MessageCircle, Sparkles, Code2, PhoneCall, ShieldCheck } from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { TarotEmblemLogo } from './TarotEmblem';

interface TopBarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const NAV_ITEMS: { id: ScreenId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', label: 'Home', icon: Compass },
  { id: 'consulti', label: 'Consulti', icon: Sparkles },
  { id: 'booking', label: 'Prenota', icon: Calendar },
  { id: 'chat', label: 'Dialogo', icon: MessageCircle },
];

export function TopBar({ activeScreen, onNavigate }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 h-14 md:h-16 bg-[#12100E]/85 backdrop-blur-md border-b border-[#D4AF37]/15">
      <div className="max-w-6xl mx-auto h-full px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single-line Brand Wordmark + Emblem */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg py-1"
          aria-label="Torna alla Home di Tarot Italia"
        >
          <TarotEmblemLogo size={30} className="shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <span className="font-display text-base md:text-lg tracking-[0.08em] text-[#F4F1EA] font-medium">
            Tarot Italia
          </span>
        </button>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navigazione principale">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded ${
                  isActive ? 'text-[#D4AF37]' : 'text-[#A39B93] hover:text-[#F4F1EA]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#D4AF37]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('booking')}
            className="px-4 py-2 min-h-[40px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-xs md:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-150 hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
          >
            Prenota Consulto
          </button>
        </div>
      </div>
    </header>
  );
}

export function MobileBottomNav({ activeScreen, onNavigate }: TopBarProps) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-[#151311]/92 backdrop-blur-lg border-t border-[#D4AF37]/20"
      aria-label="Navigazione mobile"
    >
      <div className="grid grid-cols-4 h-full max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-[44px] gap-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37] ${
                isActive ? 'text-[#D4AF37]' : 'text-[#A39B93] hover:text-[#F4F1EA]'
              }`}
            >
              <Icon className="w-[20px] h-[20px]" />
              <span className="text-[11px] font-medium tracking-wide whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

interface FloatingSideRailProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenHandoff: () => void;
  onOpenPrivacy: () => void;
  showCmsKeys: boolean;
}

export function FloatingSideRail({
  onNavigate,
  onOpenHandoff,
  onOpenPrivacy,
  showCmsKeys,
}: FloatingSideRailProps) {
  return (
    <aside
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 p-2 rounded-full glass-tier-2"
      aria-label="Azioni rapide studio"
    >
      <button
        type="button"
        onClick={() => onNavigate('booking')}
        title="Prenota una sessione"
        aria-label="Prenota una sessione"
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <Calendar className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => onNavigate('chat')}
        title="Dialogo Tarot e Bridge WhatsApp"
        aria-label="Dialogo Tarot e Bridge WhatsApp"
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#F4F1EA] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
      <a
        href="https://wa.me/390000000000?text=Buongiorno%20Maria%20Teresa%2C%20desidero%20informazioni%20su%20un%20consulto%20Tarot%20Italia."
        target="_blank"
        rel="noopener noreferrer"
        title="Contatto rapido WhatsApp"
        aria-label="Contatto rapido WhatsApp"
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#A39B93] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <PhoneCall className="w-4 h-4" />
      </a>
      <div className="w-6 h-px bg-[#D4AF37]/25 my-0.5" aria-hidden="true" />
      <button
        type="button"
        onClick={onOpenPrivacy}
        title="Preferenze Privacy e Cookie"
        aria-label="Preferenze Privacy e Cookie"
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#A39B93] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <ShieldCheck className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onOpenHandoff}
        title="Apri specifiche CMS & Handoff"
        aria-label="Apri specifiche CMS e Handoff"
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
          showCmsKeys
            ? 'bg-[#D4AF37] text-[#12100E]'
            : 'text-[#A39B93] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15'
        }`}
      >
        <Code2 className="w-4 h-4" />
      </button>
    </aside>
  );
}
