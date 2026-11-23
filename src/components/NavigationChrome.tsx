import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Code2,
  Compass,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  Newspaper,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ScreenId } from '../types/handoff';
import { BLOG_CATEGORIES, type BlogCategory } from '../lib/blogPosts';
import { blogCategorySearchParam } from '../lib/appPaths';
import { afterNextPaint, scrollWindowTo } from '../lib/scrollNavigation';
import { GoogleTranslateWidget } from './GoogleTranslateWidget';
import { GtCriticalLabel } from './GtCriticalLabel';
import { TarotNavLogo } from './TarotEmblem';

interface TopBarProps {
  activeScreen: ScreenId;
  onNavigate: (
    screen: ScreenId,
    options?: { focusId?: string; search?: string }
  ) => void;
  onOpenPrivacy: () => void;
}

/** ENN-232 — exact Italian macro-area labels (nav + /news?category=). */
const BLOG_NAV_CATEGORIES: readonly BlogCategory[] = BLOG_CATEGORIES;

/** Desktop + mobile page links — Home → Contatti. Area personale is a desktop CTA + mobile strip. */
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

/** ENN-224 — Maria custom SVGs for mobile ti-menu-list only. */
function TiMenuIcon({ id }: { id: ScreenId }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (id) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M12 2.5L3 9.5h18L12 2.5z" />
          <path d="M5.5 9.5v10M18.5 9.5v10M3 19.5h18" />
          <circle cx="12" cy="14.5" r="2.6" />
          <path d="M12 10.5v1M12 17.5v1M8.5 14.5h1M14.5 14.5h1" />
        </svg>
      );
    case 'chi-sono':
      return (
        <svg {...common}>
          <path d="M7.5 3.5a6.5 6.5 0 0 0 9 0" />
          <circle cx="12" cy="8.5" r="3" />
          <path d="M5.5 20.5c0-3.8 2.9-6.5 6.5-6.5s6.5 2.7 6.5 6.5" />
          <path d="M12 14v3M10.8 15.5h2.4" />
        </svg>
      );
    case 'consulti':
      return (
        <svg {...common}>
          <rect x="8.5" y="3.5" width="7" height="12" rx="1.2" />
          <path d="M8.5 6.2L4.2 8.2l3.8 9.8 1.5-.6" />
          <path d="M15.5 6.2l4.3 2-3.8 9.8-1.5-.6" />
          <path d="M12 7.8l1.1 1.7-1.1 1.7-1.1-1.7z" />
        </svg>
      );
    case 'news':
      return (
        <svg {...common}>
          <path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-5" />
          <path d="M8.5 7.5h4M8.5 11.5h3M8.5 15.5h5" />
          <path d="M20.5 3.5c-2.5 0-5.5 2.5-6.5 6.5l2.5 1c2.5-1.5 4-4.5 4-7.5z" />
        </svg>
      );
    case 'contatti':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4.5" />
          <circle cx="12" cy="8" r="1.4" />
          <path d="M12 12.5V21M12 16.5h3.5M12 19.5h2.5" />
        </svg>
      );
    default:
      return null;
  }
}

const HEADER_HEIGHT_CLASS =
  'h-[calc(4.75rem+env(safe-area-inset-top,0px))] md:h-[calc(5rem+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)]';
const HEADER_OFFSET_TOP =
  'top-[calc(4.75rem+env(safe-area-inset-top,0px))]';

export function TopBar({
  activeScreen,
  onNavigate,
  onOpenPrivacy,
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
  const [desktopBlogOpen, setDesktopBlogOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const desktopBlogRef = useRef<HTMLDivElement>(null);
  /** When true, closing the drawer must not restore mid-page scroll (route change → top). */
  const skipScrollRestoreRef = React.useRef(false);
  /** Capture scrollY before React reflow from opening the fixed header. */
  const lockedScrollYRef = React.useRef(0);

  const setMobileMenuOpen = (open: boolean) => {
    if (open) {
      lockedScrollYRef.current = window.scrollY;
    } else {
      setMobileBlogOpen(false);
    }
    setIsMobileMenuOpen(open);
  };

  const goBlogCategory = (category: BlogCategory) => {
    setDesktopBlogOpen(false);
    setMobileBlogOpen(false);
    if (isMobileMenuOpen) {
      skipScrollRestoreRef.current = true;
    }
    setMobileMenuOpen(false);
    onNavigate('news', { search: blogCategorySearchParam(category) });
  };

  // ENN-232 — desktop Blog submenu: click-outside + Escape
  useEffect(() => {
    if (!desktopBlogOpen) return;
    const handlePointer = (event: MouseEvent) => {
      if (
        desktopBlogRef.current &&
        !desktopBlogRef.current.contains(event.target as Node)
      ) {
        setDesktopBlogOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDesktopBlogOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopBlogOpen]);

  // Close on Escape; lock scroll without losing the top navbar mid-page
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (mobileBlogOpen) {
          setMobileBlogOpen(false);
          return;
        }
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

    // ENN-229 — lift ambient layer above page chrome so the drawer bottom
    // veil can peek the real sanctuary animation (not page cards).
    document.documentElement.classList.add('ti-mobile-menu-open');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.classList.remove('ti-mobile-menu-open');
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
  }, [isMobileMenuOpen, mobileBlogOpen]);

  // Ensure drawer closes if viewport resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setDesktopBlogOpen(false);
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

          {/* Zone 2: Desktop Single-Line Navigation Links (ENN-240 — clearer weight vs Prenota) */}
          <nav
            className="hidden md:flex items-center gap-3.5 lg:gap-6 xl:gap-7"
            aria-label={t('nav.aria')}
          >
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              if (item.id === 'news') {
                return (
                  <div
                    key={item.id}
                    ref={desktopBlogRef}
                    className="relative shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => setDesktopBlogOpen((open) => !open)}
                      aria-expanded={desktopBlogOpen}
                      aria-haspopup="menu"
                      aria-controls="desktop-blog-submenu"
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative inline-flex items-center gap-1 py-2 text-[13px] lg:text-sm font-semibold tracking-[0.02em] whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded ${
                        isActive || desktopBlogOpen
                          ? 'text-[#D4AF37]'
                          : 'text-[#D4CFC7] hover:text-[#F4F1EA]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          desktopBlogOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                      {isActive && (
                        <span
                          className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D4AF37]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                    {desktopBlogOpen && (
                      <div
                        id="desktop-blog-submenu"
                        role="menu"
                        aria-label={item.label}
                        className="ti-blog-submenu-desktop absolute left-1/2 top-full z-50 mt-2 min-w-[10.5rem] -translate-x-1/2 py-1.5"
                      >
                        {BLOG_NAV_CATEGORIES.map((category) => (
                          <button
                            key={category}
                            type="button"
                            role="menuitem"
                            onClick={() => goBlogCategory(category)}
                            className="ti-blog-submenu-item w-full px-3.5 py-2 text-left text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-[13px] lg:text-sm font-semibold tracking-[0.02em] whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded ${
                    isActive
                      ? 'text-[#D4AF37]'
                      : 'text-[#D4CFC7] hover:text-[#F4F1EA]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D4AF37]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Google Translate (ENN-140) + Area personale + Prenota + Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <GoogleTranslateWidget
              variant="header"
              onRequestConsent={onOpenPrivacy}
            />
            {/* ENN-240: desktop Area personale (same route as mobile CTA); amber glass vs Prenota */}
            <button
              type="button"
              data-nowrap-keep
              onClick={() => onNavigate('area-riservata')}
              aria-current={
                activeScreen === 'area-riservata' ? 'page' : undefined
              }
              className="desktop-nav-area-personale hidden md:inline-flex px-2.5 lg:px-3 py-2 min-h-[40px] rounded-lg text-[13px] lg:text-sm font-semibold whitespace-nowrap shrink-0 items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDBA74]"
            >
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              {t('nav.areaPersonale')}
            </button>
            {/* ENN-160: text Prenota only from md+; mobile uses BookSessionFab */}
            <button
              type="button"
              data-nowrap-keep
              onClick={() => handleMobileSelect('booking')}
              className="btn-primary hidden md:inline-flex px-3 lg:px-3.5 py-2 min-h-[40px] rounded-lg text-[13px] lg:text-sm font-semibold whitespace-nowrap shrink-0 items-center"
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

      {/* Mobile Hamburger Drawer — sits under the always-visible top navbar (ENN-187 / ENN-221) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-hamburger-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.mobileDialog')}
          className={`mobile-hamburger-drawer md:hidden fixed inset-x-0 bottom-0 ${HEADER_OFFSET_TOP} z-50 border-t border-[#D4AF37]/20 overflow-y-auto`}
        >
          {/* ENN-228 — pack from top (no min-h/justify-between stretch) so Area personale→Dialoga stay a prima vista */}
          {/* ENN-229 — soft ambient peek only in the drawer footer zone (veil is CSS ::before) */}
          <div className="relative z-[1] px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex flex-col gap-2 max-w-lg mx-auto">
            <div className="space-y-2">
              {/* ENN-221 — Top strip: Area personale + Prenotazione (was Menù title) */}
              <div className="mobile-menu-cta-strip">
                <button
                  type="button"
                  onClick={() => handleMobileSelect('area-riservata')}
                  className="mobile-menu-cta-area-personale w-full min-h-[36px] px-3 py-1.5 rounded-xl text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDBA74]"
                >
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('nav.areaPersonale')}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileSelect('booking')}
                  className="btn-primary w-full min-h-[36px] px-3 py-1.5 rounded-xl text-[13px] font-semibold inline-flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('nav.bookLong')}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* ENN-224 — Maria ti-menu-list (icon boxes + title/sub + arrow) */}
              {/* ENN-232 — Blog expands in-place (compact) so density stays a prima vista when closed */}
              <nav aria-label={t('nav.pagesAria')} className="ti-menu-list">
                {navItems
                  .filter((item) => item.id !== 'corsi' && item.id !== 'chat')
                  .map((item) => {
                    const isActive = activeScreen === item.id;
                    if (item.id === 'news') {
                      return (
                        <div key={item.id} className="ti-blog-mobile-block">
                          <button
                            type="button"
                            onClick={() =>
                              setMobileBlogOpen((open) => !open)
                            }
                            aria-expanded={mobileBlogOpen}
                            aria-controls="mobile-blog-submenu"
                            aria-current={isActive ? 'page' : undefined}
                            className="ti-menu-item focus-visible:ring-2 focus-visible:ring-[#E2BE48]/60"
                          >
                            <div className="ti-menu-left">
                              <div className="ti-icon-box">
                                <TiMenuIcon id={item.id} />
                              </div>
                              <div className="min-w-0">
                                <h3 className="ti-title truncate">
                                  {item.label}
                                </h3>
                                <p className="ti-sub">{item.subtitle}</p>
                              </div>
                            </div>
                            <ChevronDown
                              className={`ti-arrow w-[13px] h-[13px] transition-transform duration-200 ${
                                mobileBlogOpen ? 'rotate-180' : ''
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                          {mobileBlogOpen && (
                            <div
                              id="mobile-blog-submenu"
                              role="menu"
                              aria-label={item.label}
                              className="ti-blog-submenu-mobile"
                            >
                              {BLOG_NAV_CATEGORIES.map((category) => (
                                <button
                                  key={category}
                                  type="button"
                                  role="menuitem"
                                  onClick={() => goBlogCategory(category)}
                                  className="ti-blog-submenu-mobile-item focus-visible:ring-2 focus-visible:ring-[#E2BE48]/60"
                                >
                                  {category}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleMobileSelect(item.id)}
                        aria-current={isActive ? 'page' : undefined}
                        className="ti-menu-item focus-visible:ring-2 focus-visible:ring-[#E2BE48]/60"
                      >
                        <div className="ti-menu-left">
                          <div className="ti-icon-box">
                            <TiMenuIcon id={item.id} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="ti-title truncate">{item.label}</h3>
                            <p className="ti-sub">{item.subtitle}</p>
                          </div>
                        </div>
                        <ArrowRight
                          className="ti-arrow w-[13px] h-[13px]"
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
              </nav>

              {/* ENN-221 — Former CTA slot: Corsi + Dialoghi (gold strip only here) */}
              <div className="mobile-menu-cta-strip">
                <button
                  type="button"
                  onClick={() => handleMobileSelect('corsi')}
                  className="mobile-menu-cta-gold w-full min-h-[36px] px-3 py-1.5 text-[13px] inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24]"
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('nav.corsi')}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMobileSelect('chat')}
                  className="mobile-menu-cta-gold w-full min-h-[36px] px-3 py-1.5 text-[13px] inline-flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24]"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('nav.dialogaCoi22Arcani')}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <p className="text-[10px] leading-tight tracking-wide text-[#A39B93]/90 text-center pt-0.5 border-t border-[#D4AF37]/10">
              {t('nav.practitionerLine')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

interface FloatingSideRailProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenPrivacy: () => void;
  /** ENN-239 — owner-only; omit for public visitors */
  onOpenHandoff?: () => void;
  showCmsKeys?: boolean;
}

/**
 * ENN-240 — Desktop (xl+) quick tools only: booking + dialogo + privacy.
 * Contacts live in StickyContactBar; Area personale lives in the top nav.
 * Owner handoff stays gated (#204).
 */
export function FloatingSideRail({
  onNavigate,
  onOpenPrivacy,
  onOpenHandoff,
  showCmsKeys = false,
}: FloatingSideRailProps) {
  const { t } = useTranslation('common');
  const showOwnerHandoff = typeof onOpenHandoff === 'function';
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
        onClick={() => onNavigate('chat')}
        title={t('rail.dialogo')}
        aria-label={t('rail.dialogo')}
        className="w-11 h-11 rounded-full flex items-center justify-center text-[#F4F1EA] hover:text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
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
      {showOwnerHandoff ? (
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
      ) : null}
    </aside>
  );
}
