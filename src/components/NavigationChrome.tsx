import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Code2,
  Compass,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  Newspaper,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import type { ScreenId } from '../types/handoff';
import { whatsappHref } from '../lib/siteContacts';
import { TarotEmblemLogo } from './TarotEmblem';

interface TopBarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenHandoff: () => void;
  onOpenPrivacy: () => void;
  showCmsKeys: boolean;
}

const NAV_ITEMS: {
  id: ScreenId;
  label: string;
  drawerLabel?: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'home',
    label: 'Home',
    subtitle: 'Panoramica e Arcano del Giorno',
    icon: Compass,
  },
  {
    id: 'chi-sono',
    label: 'Chi Sono',
    subtitle: 'Formazione e percorso disciplinare',
    icon: User,
  },
  {
    id: 'consulti',
    label: 'Consulti',
    subtitle: 'Chiamata vocale online e tariffe',
    icon: Sparkles,
  },
  {
    id: 'corsi',
    label: 'Corsi',
    subtitle: 'Arcani Maggiori, Minori e Stesure',
    icon: BookOpen,
  },
  {
    id: 'news',
    label: 'News',
    drawerLabel: 'News / Articoli',
    subtitle: 'Scritti da Substack @tarotitalia',
    icon: Newspaper,
  },
  {
    id: 'chat',
    label: 'Dialogo',
    drawerLabel: 'Dialogo Tarot',
    subtitle: 'Interagisci con i 22 Arcani Maggiori',
    icon: MessageCircle,
  },
  {
    id: 'contatti',
    label: 'Contatti',
    subtitle: 'Email, telefono, mappa e parcheggi',
    icon: MapPin,
  },
  {
    id: 'area-riservata',
    label: 'Area Riservata',
    subtitle: 'Dispense, appunti e consulti',
    icon: Lock,
  },
];

export function TopBar({
  activeScreen,
  onNavigate,
  onOpenHandoff,
  onOpenPrivacy,
  showCmsKeys,
}: TopBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape and lock body scroll while open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Ensure drawer closes if viewport resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileSelect = (screen: ScreenId) => {
    setIsMobileMenuOpen(false);
    onNavigate(screen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-14 md:h-16 bg-[#12100E]/90 backdrop-blur-md border-b border-[#D4AF37]/15">
        <div className="max-w-6xl mx-auto h-full px-4 md:px-8 lg:px-12 flex items-center justify-between gap-3 md:gap-8">
          {/* Zone 1: Single-line Brand Wordmark + Emblem */}
          <button
            type="button"
            onClick={() => handleMobileSelect('home')}
            className="flex items-center gap-2.5 md:gap-3 text-left whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg py-1"
            aria-label="Torna alla Home di Tarot Italia"
          >
            <TarotEmblemLogo
              size={28}
              className="shrink-0 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-display text-base md:text-lg tracking-[0.08em] text-[#F4F1EA] font-medium">
              Tarot Italia
            </span>
          </button>

          {/* Zone 2: Desktop Single-Line Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-4 lg:gap-6"
            aria-label="Navigazione principale"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-xs lg:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded ${
                    isActive
                      ? 'text-[#D4AF37]'
                      : 'text-[#A39B93] hover:text-[#F4F1EA]'
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

          {/* Zone 3: Primary CTA (Desktop) + Compact CTA & Hamburger Toggle (Mobile) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleMobileSelect('booking')}
              className="px-3.5 md:px-4 py-2 min-h-[40px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-xs md:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-150 hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
            >
              <span className="sm:hidden">Prenota</span>
              <span className="hidden sm:inline">Prenota Consulto</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-hamburger-menu"
              aria-label={
                isMobileMenuOpen
                  ? 'Chiudi menu di navigazione'
                  : 'Apri menu di navigazione'
              }
              className={`md:hidden w-11 h-11 rounded-lg border inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isMobileMenuOpen
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-[#12100E]'
                  : 'bg-[#151311]/90 border-[#D4AF37]/30 text-[#F4F1EA] hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Hamburger Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-hamburger-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione mobile"
          className="md:hidden fixed inset-0 top-14 z-40 bg-[#12100E]/96 backdrop-blur-xl border-t border-[#D4AF37]/20 overflow-y-auto"
        >
          <div className="min-h-full px-5 py-6 flex flex-col justify-between gap-8 max-w-lg mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                <span>Navigazione Studio</span>
                <span className="text-[#A39B93] font-normal normal-case">
                  Chiamata vocale &amp; Studio
                </span>
              </div>

              <nav aria-label="Pagine del sito" className="space-y-2.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleMobileSelect(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full min-h-[54px] px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                        isActive
                          ? 'bg-[#D4AF37]/14 border-[#D4AF37] text-[#F4F1EA]'
                          : 'bg-[#151311]/85 border-[#D4AF37]/18 text-[#F4F1EA] hover:border-[#D4AF37]/45'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-[#D4AF37] text-[#12100E]'
                              : 'bg-[#1D1B19] text-[#D4AF37]'
                          }`}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <span
                            className={`block font-display text-sm tracking-[0.03em] truncate ${
                              isActive ? 'text-[#D4AF37]' : 'text-[#F4F1EA]'
                            }`}
                          >
                            {item.drawerLabel ?? item.label}
                          </span>
                          <span className="block text-xs text-[#A39B93] truncate">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#D4AF37]' : 'text-[#A39B93]'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </nav>

              <button
                type="button"
                onClick={() => handleMobileSelect('booking')}
                className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Prenota un Consulto
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#D4AF37]/15">
              <div className="grid grid-cols-1 gap-2.5">
                <a
                  href={whatsappHref(
                    'Buongiorno Maria Teresa, desidero informazioni su un consulto Tarot Italia.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cta-label min-h-[44px] px-4 py-2.5 rounded-lg bg-[#151311]/85 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs font-medium text-[#F4F1EA] inline-flex items-center justify-between gap-2"
                >
                  <span className="inline-flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                    WhatsApp Diretto
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A39B93]" />
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenPrivacy();
                    }}
                    className="min-h-[44px] px-3.5 py-2 rounded-lg bg-[#151311]/85 border border-[#A39B93]/20 hover:border-[#D4AF37] text-xs font-medium text-[#A39B93] hover:text-[#F4F1EA] inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Privacy &amp; Cookie
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenHandoff();
                    }}
                    className={`min-h-[44px] px-3.5 py-2 rounded-lg border text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap ${
                      showCmsKeys
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#E6C65C]'
                        : 'bg-[#151311]/85 border-[#A39B93]/20 hover:border-[#D4AF37] text-[#A39B93] hover:text-[#F4F1EA]'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Handoff &amp; CMS
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-[#A39B93] text-center">
                Maria Teresa Rogani · Operatore Olistico L. 4/2013
              </p>
            </div>
          </div>
        </div>
      )}
    </>
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
      aria-label="Azioni rapide Tarot Italia"
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
        onClick={() => onNavigate('area-riservata')}
        title="Accedi all'Area Riservata"
        aria-label="Accedi all'Area Riservata"
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#F4F1EA] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <Lock className="w-4 h-4" />
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
        href={whatsappHref(
          'Buongiorno Maria Teresa, desidero informazioni su un consulto Tarot Italia.'
        )}
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
