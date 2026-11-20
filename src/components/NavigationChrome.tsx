import React, { useEffect, useMemo, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import type { ScreenId } from '../types/handoff';
import { afterNextPaint, scrollWindowTo } from '../lib/scrollNavigation';
import { whatsappHref } from '../lib/siteContacts';
import { GoogleTranslateWidget } from './GoogleTranslateWidget';
import { GtCriticalLabel } from './GtCriticalLabel';
import { TarotNavLogo } from './TarotEmblem';

interface TopBarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenHandoff: () => void;
  onOpenPrivacy: () => void;
  showCmsKeys: boolean;
}

/** Desktop + mobile page links — Home → Contatti. Area personale stays a CTA below. */
const NAV_ITEM_DEFS: {
  id: ScreenId;
  labelKey: string;
  subtitleKey: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'home',
    labelKey: 'nav.home',
    subtitleKey: 'nav.home.subtitle',
    icon: Compass,
  },
  {
    id: 'chi-sono',
    labelKey: 'nav.chiSono',
    subtitleKey: 'nav.chiSono.subtitle',
    icon: User,
  },
  {
    id: 'consulti',
    labelKey: 'nav.consulti',
    subtitleKey: 'nav.consulti.subtitle',
    icon: Sparkles,
  },
  {
    id: 'chat',
    labelKey: 'nav.dialogo',
    subtitleKey: 'nav.dialogo.subtitle',
    icon: MessageCircle,
  },
  {
    id: 'corsi',
    labelKey: 'nav.corsi',
    subtitleKey: 'nav.corsi.subtitle',
    icon: BookOpen,
  },
  {
    id: 'news',
    labelKey: 'nav.blog',
    subtitleKey: 'nav.blog.subtitle',
    icon: Newspaper,
  },
  {
    id: 'contatti',
    labelKey: 'nav.contatti',
    subtitleKey: 'nav.contatti.subtitle',
    icon: MapPin,
  },
];

const HEADER_HEIGHT_CLASS =
  'h-[calc(4.75rem+env(safe-area-inset-top,0px))] md:h-[calc(5rem+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)]';
const HEADER_OFFSET_TOP =
  'top-[calc(4.75rem+env(safe-area-inset-top,0px))]';

export function TopBar({
  activeScreen,
  onNavigate,
  onOpenHandoff,
  onOpenPrivacy,
  showCmsKeys,
}: TopBarProps) {
  const { t } = useTranslation('common');
  const navItems = useMemo(
    () =>
      NAV_ITEM_DEFS.map((item) => ({
        ...item,
        label: t(item.labelKey),
        subtitle: t(item.subtitleKey),
      })),
    [t]
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  /** When true, closing the drawer must not restore mid-page scroll (route change → top). */
  const skipScrollRestoreRef = React.useRef(false);
  /** Capture scrollY before React reflow from opening the fixed header. */
  const lockedScrollYRef = React.useRef(0);

  const setMobileMenuOpen = (open: boolean) => {
    if (open) {
      lockedScrollYRef.current = window.scrollY;
    }
    setIsMobileMenuOpen(open);
  };

  // Close on Escape; lock scroll without losing the top navbar mid-page
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const scrollY = lockedScrollYRef.current;
    const previous = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previous.overflow;
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      const skipRestore = skipScrollRestoreRef.current;
      if (skipRestore) {
        skipScrollRestoreRef.current = false;
      }
      // Instant jump after unlock — CSS `scroll-behavior: smooth` + body-fixed
      // unlock otherwise leaves mid-page on the *new* SPA screen (Corsi/Dialogo).
      const targetY = skipRestore ? 0 : scrollY;
      scrollWindowTo(targetY, 'auto');
      afterNextPaint(() => scrollWindowTo(targetY, 'auto'));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Ensure drawer closes if viewport resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileSelect = (screen: ScreenId) => {
    if (isMobileMenuOpen) {
      skipScrollRestoreRef.current = true;
    }
    setMobileMenuOpen(false);
    onNavigate(screen);
  };

  return (
    <>
      <header
        data-site-header
        className={`${
          isMobileMenuOpen
            ? 'fixed inset-x-0 top-0 z-[60]'
            : 'sticky top-0 z-50'
        } ${HEADER_HEIGHT_CLASS} bg-[#12100E]/90 backdrop-blur-md border-b border-[#D4AF37]/15`}
      >
        <div className="max-w-6xl mx-auto h-full px-4 md:px-8 lg:px-12 flex items-center justify-between gap-2.5 md:gap-8">
          {/* Zone 1: Single-line Brand Wordmark + Nav mark */}
          <button
            type="button"
            data-nowrap-keep
            onClick={() => handleMobileSelect('home')}
            className="flex items-center gap-2 md:gap-3.5 text-left whitespace-nowrap shrink min-w-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg py-1"
            aria-label={t('nav.homeAria')}
          >
            {/* Mobile 72 / desktop 68 — readable next to wordmark, not crowding Prenota */}
            <TarotNavLogo className="h-[4.5rem] w-[4.5rem] md:h-[4.25rem] md:w-[4.25rem] shrink-0 transition-transform duration-200 group-hover:scale-105" />
            <span className="font-display text-base md:text-lg tracking-[0.08em] text-[#F4F1EA] font-medium truncate">
              Tarot Italia
            </span>
          </button>

          {/* Zone 2: Desktop Single-Line Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-4 lg:gap-6"
            aria-label={t('nav.aria')}
          >
            {navItems.map((item) => {
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

          {/* Zone 3: Google Translate (ENN-140) + Primary CTA + Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <GoogleTranslateWidget
              variant="header"
              onRequestConsent={onOpenPrivacy}
            />
            {/* ENN-160: text Prenota only from md+; mobile uses BookSessionFab */}
            <button
              type="button"
              data-nowrap-keep
              onClick={() => handleMobileSelect('booking')}
              className="hidden md:inline-flex px-4 py-2 min-h-[40px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold whitespace-nowrap shrink-0 items-center transition-all duration-150 hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C65C]"
            >
              <GtCriticalLabel uiKey="bookConsult" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-hamburger-menu"
              aria-label={
                isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')
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

      {/* Spacer when header is fixed open — keeps page offset while menu is up */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${HEADER_HEIGHT_CLASS}`} aria-hidden="true" />
      )}

      {/* Mobile Hamburger Drawer — sits under the always-visible top navbar */}
      {isMobileMenuOpen && (
        <div
          id="mobile-hamburger-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.mobileDialog')}
          className={`md:hidden fixed inset-x-0 bottom-0 ${HEADER_OFFSET_TOP} z-50 bg-[#12100E]/96 backdrop-blur-xl border-t border-[#D4AF37]/20 overflow-y-auto`}
        >
          <div className="min-h-full px-5 py-6 flex flex-col justify-between gap-8 max-w-lg mx-auto pb-[max(6rem,env(safe-area-inset-bottom))]">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                <span>{t('nav.studioNav')}</span>
                <span className="text-[#A39B93] font-normal normal-case">
                  {t('nav.studioHint')}
                </span>
              </div>

              <nav aria-label={t('nav.pagesAria')} className="space-y-2.5">
                {navItems.map((item) => {
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
                            {item.label}
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

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleMobileSelect('booking')}
                  className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  {t('nav.bookings')}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => handleMobileSelect('area-riservata')}
                  className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#151311]/90 border border-[#D4AF37]/35 hover:border-[#D4AF37] text-[#F4F1EA] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Lock className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                  {t('nav.areaPersonale')}
                  <ArrowRight className="w-4 h-4 text-[#A39B93]" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#D4AF37]/15">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPrivacy();
                  }}
                  className="min-h-[44px] px-3.5 py-2 rounded-lg bg-[#151311]/85 border border-[#A39B93]/20 hover:border-[#D4AF37] text-xs font-medium text-[#A39B93] hover:text-[#F4F1EA] inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {t('nav.privacyCookie')}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenHandoff();
                  }}
                  className={`min-h-[44px] px-3.5 py-2 rounded-lg border text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap ${
                    showCmsKeys
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#E6C65C]'
                      : 'bg-[#151311]/85 border-[#A39B93]/20 hover:border-[#D4AF37] text-[#A39B93] hover:text-[#F4F1EA]'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {t('nav.handoff')}
                </button>
              </div>

              <p className="text-[11px] text-[#A39B93] text-center">
                {t('nav.practitionerLine')}
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
  const { t } = useTranslation('common');
  return (
    <aside
      className="ti-rail-side hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 p-2 rounded-full glass-tier-2"
      aria-label={t('rail.aria')}
    >
      <button
        type="button"
        onClick={() => onNavigate('booking')}
        title={t('rail.book')}
        aria-label={t('rail.book')}
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <Calendar className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => onNavigate('area-riservata')}
        title={t('rail.reserved')}
        aria-label={t('rail.reserved')}
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#F4F1EA] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <Lock className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onNavigate('chat')}
        title={t('rail.dialogo')}
        aria-label={t('rail.dialogo')}
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
        title={t('rail.whatsapp')}
        aria-label={t('rail.whatsapp')}
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#A39B93] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <PhoneCall className="w-4 h-4" />
      </a>
      <div className="w-6 h-px bg-[#D4AF37]/25 my-0.5" aria-hidden="true" />
      <button
        type="button"
        onClick={onOpenPrivacy}
        title={t('rail.privacy')}
        aria-label={t('rail.privacy')}
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#A39B93] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <ShieldCheck className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onOpenHandoff}
        title={t('rail.handoff')}
        aria-label={t('rail.handoff')}
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
