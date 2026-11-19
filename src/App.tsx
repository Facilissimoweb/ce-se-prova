import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import type { ConsultationTariff, CourseId, ScreenId } from './types/handoff';
import { AuthProvider } from './context/AuthContext';
import {
  FloatingSideRail,
  TopBar,
} from './components/NavigationChrome';
import { HandoffDrawer } from './components/HandoffDrawer';
import { AccessibilityFab } from './components/AccessibilityFab';
import { BackToTopFab } from './components/BackToTopFab';
import { ChatFab } from './components/ChatFab';
import {
  LEFT_TOOLS_MENU_ID,
  LeftToolsMenuProvider,
  ToolsFab,
} from './components/LeftToolsMenu';
import { PrivacyCookiesWidget } from './components/PrivacyCookiesWidget';
import { StickyContactBar } from './components/StickyContactBar';
import { LegalNotice, type LegalKind } from './components/LegalNotice';
import { AmbientSanctuaryBackground } from './components/AmbientSanctuaryBackground';
import { TarotHomeHeroLogo } from './components/TarotEmblem';
import { HomeScreen } from './screens/HomeScreen';
import { ChiSonoScreen } from './screens/ChiSonoScreen';
import { ConsultiScreen } from './screens/ConsultiScreen';
import { CorsiScreen } from './screens/CorsiScreen';
import { ReservedAreaScreen } from './screens/ReservedAreaScreen';
import { ApprofondimentiTerzoSettenarioScreen } from './screens/ApprofondimentiTerzoSettenarioScreen';
import { BookingScreen } from './screens/BookingScreen';
import { ChatScreen } from './screens/ChatScreen';
import { PrivacyScreen } from './screens/PrivacyScreen';
import { TerminiScreen } from './screens/TerminiScreen';
import { DisclaimerScreen } from './screens/DisclaimerScreen';
import { SitemapScreen } from './screens/SitemapScreen';
import { NotFoundScreen } from './screens/NotFoundScreen';
import { NewsScreen } from './screens/NewsScreen';
import { ContattiScreen } from './screens/ContattiScreen';
import { SocialShareButtons } from './components/SocialShareButtons';
import { DocumentSeo } from './components/DocumentSeo';
import { MAGGIORI_MODULO_01_BLOG_SLUG } from './data/maggioriGatedBlog';
import { legalContent } from './data/legalContent';
import {
  PATH_CHANGE_EVENT,
  bootstrapScreenFromLocation,
  navigateBlogPost,
  navigatePath,
  pathForScreen,
  screenFromPath,
} from './lib/appPaths';
import {
  SCROLL_LANDMARKS,
  afterNextPaint,
  captureScrollY,
  screenFromHash,
  scrollToId,
  scrollToIdAfterPaint,
  scrollToTopAfterPaint,
  scrollWindowTo,
  sectionIdFromHash,
} from './lib/scrollNavigation';
import { SITE_PIVA, SITE_PIVA_VERIFY_URL } from './lib/siteContacts';

const AUX_SCREENS: ScreenId[] = [
  'privacy',
  'termini',
  'disclaimer',
  'sitemap',
  'not-found',
];

type FooterNavItem =
  | { kind: 'screen'; id: ScreenId; label: string }
  | { kind: 'notice'; notice: LegalKind; label: string }
  | { kind: 'action'; action: 'cookies'; label: string }
  | { kind: 'href'; href: string; label: string };

type FooterMenuGroup = {
  title: string;
  ariaLabel: string;
  items: FooterNavItem[];
};

/**
 * Compact dark/gold chrome — same visual language as Nina ChatFab
 * «Parla con Maria Teresa» CTAs (ENN-71), adapted for a vertical stack.
 */
const FOOTER_CONTACT_BTN_CLASS =
  'flex min-w-0 w-full items-center justify-center gap-1.5 rounded-lg border border-[#D4AF37]/15 bg-[#12100E]/55 px-2.5 py-1.5 text-center text-[11px] font-semibold leading-tight text-[#F4F1EA] transition-colors hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:gap-2 sm:px-2.5 sm:py-2 sm:text-xs';

/** Colonne footer allineate allo sguardo Tarot Italia (Servizi / Info / Legale). */
const FOOTER_MENU_GROUPS: FooterMenuGroup[] = [
  {
    title: 'Servizi',
    ariaLabel: 'Servizi',
    items: [
      { kind: 'screen', id: 'consulti', label: 'Consulti' },
      { kind: 'screen', id: 'corsi', label: 'Corsi' },
      { kind: 'screen', id: 'chat', label: 'Dialogo' },
      { kind: 'screen', id: 'booking', label: 'Prenota' },
      { kind: 'screen', id: 'area-riservata', label: 'Area Riservata' },
    ],
  },
  {
    title: 'Info',
    ariaLabel: 'Informazioni',
    items: [
      { kind: 'screen', id: 'home', label: 'Home' },
      { kind: 'screen', id: 'chi-sono', label: 'Chi Sono' },
      { kind: 'screen', id: 'news', label: 'News / Articoli' },
      { kind: 'screen', id: 'contatti', label: 'Contatti' },
      { kind: 'screen', id: 'sitemap', label: 'Mappa del sito' },
    ],
  },
  {
    title: 'Legale',
    ariaLabel: 'Informazioni legali',
    items: [
      { kind: 'screen', id: 'disclaimer', label: 'Disclaimer' },
      { kind: 'notice', notice: 'tutela', label: legalContent.tutela.kicker },
      {
        kind: 'screen',
        id: 'privacy',
        label: legalContent.privacy.sezione,
      },
      {
        kind: 'screen',
        id: 'termini',
        label: legalContent.vendita.sezione,
      },
      { kind: 'action', action: 'cookies', label: 'Preferenze Cookie' },
      { kind: 'href', href: '/sitemap.xml', label: 'sitemap.xml' },
    ],
  },
];

const FOOTER_LINK_CLASS =
  'text-left text-[13px] leading-snug text-[#A39B93] hover:text-[#D4AF37] transition-colors';

export function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>(() => {
    const fromPath = bootstrapScreenFromLocation(
      window.location.pathname,
      window.location.search
    );
    // Legacy / marketing hashes: `/#corsi`, `/#dialogo` open the matching screen.
    if (fromPath === 'home' || fromPath === 'not-found') {
      const fromHash = screenFromHash(window.location.hash);
      if (fromHash === 'corsi' || fromHash === 'chat') return fromHash;
    }
    return fromPath;
  });
  const [selectedTariffId, setSelectedTariffId] =
    useState<ConsultationTariff['id']>('60m');
  const [selectedCourseId, setSelectedCourseId] =
    useState<CourseId>('arcani-maggiori');
  const [showCmsKeys, setShowCmsKeys] = useState(false);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [legalNotice, setLegalNotice] = useState<LegalKind | null>(null);

  const scrollPositionsRef = useRef<Partial<Record<ScreenId, number>>>({});
  const pendingFocusIdRef = useRef<string | null>(null);
  const navigationKindRef = useRef<'push' | 'pop' | 'boot'>('boot');
  const activeScreenRef = useRef(activeScreen);
  activeScreenRef.current = activeScreen;
  /** Track pathname so same-screen SPA jumps (e.g. /news → /news/slug) still scroll to top. */
  const lastPathnameRef = useRef(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  /** Per-path scroll memory for browser back within the same ScreenId (blog). */
  const scrollByPathRef = useRef<Record<string, number>>({});

  const handleNavigate = useCallback(
    (screen: ScreenId, options?: { focusId?: string }) => {
      const focusId =
        options?.focusId ??
        (screen === 'corsi'
          ? SCROLL_LANDMARKS.corsi
          : screen === 'chat'
            ? SCROLL_LANDMARKS.dialogo
            : null);

      // Re-tapping the active route still recenters (mobile menu / footer CTAs).
      if (screen === activeScreenRef.current) {
        navigatePath(screen);
        if (focusId) {
          scrollToIdAfterPaint(focusId, { behavior: 'auto' });
        } else {
          scrollToTopAfterPaint('auto');
        }
        return;
      }

      scrollPositionsRef.current[activeScreenRef.current] = captureScrollY();
      navigationKindRef.current = 'push';
      pendingFocusIdRef.current = focusId;
      setActiveScreen(screen);
      navigatePath(screen);
    },
    []
  );

  /** Open `/news/<slug>` without collapsing to list via navigatePath('news'). */
  const handleOpenBlogPost = useCallback((slug: string) => {
    scrollPositionsRef.current[activeScreenRef.current] = captureScrollY();
    navigationKindRef.current = 'push';
    pendingFocusIdRef.current = null;
    navigateBlogPost(slug);
    if (activeScreenRef.current !== 'news') {
      setActiveScreen('news');
    } else {
      scrollToTopAfterPaint('auto');
    }
  }, []);

  // Land on the right spot after SPA paint (avoids sticky-header + menu-unlock races).
  useEffect(() => {
    const kind = navigationKindRef.current;
    navigationKindRef.current = 'push';
    lastPathnameRef.current = window.location.pathname;

    if (kind === 'boot') {
      const sectionFromHash = sectionIdFromHash(window.location.hash);
      if (sectionFromHash) {
        return scrollToIdAfterPaint(sectionFromHash, { behavior: 'auto' });
      }
      return scrollToTopAfterPaint('auto');
    }

    if (kind === 'pop') {
      const y = scrollPositionsRef.current[activeScreen] ?? 0;
      return afterNextPaint(() => scrollWindowTo(y, 'auto'));
    }

    const focusId = pendingFocusIdRef.current;
    pendingFocusIdRef.current = null;
    if (focusId) {
      return scrollToIdAfterPaint(focusId, { behavior: 'auto' });
    }
    return scrollToTopAfterPaint('auto');
  }, [activeScreen]);

  // Same ScreenId, new path (blog article, etc.): always return to top unless a
  // deep-link focus/hash is pending (ENN-102/103 intentional landings).
  useEffect(() => {
    const onPathChange = () => {
      const nextPath = window.location.pathname;
      const prevPath = lastPathnameRef.current;
      if (nextPath === prevPath) return;
      scrollByPathRef.current[prevPath] = captureScrollY();
      lastPathnameRef.current = nextPath;

      if (pendingFocusIdRef.current) return;
      if (sectionIdFromHash(window.location.hash)) return;

      scrollToTopAfterPaint('auto');
    };

    window.addEventListener(PATH_CHANGE_EVENT, onPathChange);
    return () => window.removeEventListener(PATH_CHANGE_EVENT, onPathChange);
  }, []);

  // Sync screen from URL on load / browser back-forward; rewrite legacy Stripe root returns.
  // Unknown paths keep the URL and show the 404 screen (no silent redirect to home).
  // Blog detail URLs (`/news/:slug`) stay as-is — do not collapse to `/news`.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const applyLocation = (kind: 'push' | 'pop' | 'boot') => {
      let next = bootstrapScreenFromLocation(
        window.location.pathname,
        window.location.search
      );
      const hashScreen = screenFromHash(window.location.hash);
      if (
        hashScreen &&
        (next === 'home' || next === 'not-found') &&
        (hashScreen === 'corsi' || hashScreen === 'chat')
      ) {
        next = hashScreen;
        const expected = pathForScreen(next);
        window.history.replaceState(
          {},
          '',
          `${expected}${window.location.search}`
        );
      }

      navigationKindRef.current = kind;
      if (kind === 'push' || kind === 'boot') {
        const section = sectionIdFromHash(window.location.hash);
        if (section) pendingFocusIdRef.current = section;
        else if (next === 'corsi') pendingFocusIdRef.current = SCROLL_LANDMARKS.corsi;
        else if (next === 'chat') pendingFocusIdRef.current = SCROLL_LANDMARKS.dialogo;
      }

      setActiveScreen(next);
      if (next === 'not-found') {
        return;
      }
      const pathname = window.location.pathname;
      const isBlogDetail =
        next === 'news' &&
        /^\/(news|blog|articoli)\/[^/]+\/?$/i.test(pathname);
      if (isBlogDetail) {
        return;
      }
      const expected = pathForScreen(next);
      if (
        screenFromPath(pathname) !== next ||
        pathname !== expected
      ) {
        const search = window.location.search;
        window.history.replaceState({}, '', `${expected}${search}`);
      }
    };

    const syncFromLocation = () => applyLocation('boot');
    const onPopState = () => {
      scrollPositionsRef.current[activeScreenRef.current] = captureScrollY();
      const pathBefore = lastPathnameRef.current;
      const screenBefore = activeScreenRef.current;
      scrollByPathRef.current[pathBefore] = captureScrollY();
      applyLocation('pop');
      const pathAfter = window.location.pathname;
      lastPathnameRef.current = pathAfter;
      // Blog detail ↔ list keeps ScreenId `news` — activeScreen effect may not run.
      if (screenBefore === activeScreenRef.current && pathBefore !== pathAfter) {
        const y = scrollByPathRef.current[pathAfter] ?? 0;
        afterNextPaint(() => scrollWindowTo(y, 'auto'));
      }
    };
    const onHashChange = () => {
      const hashScreen = screenFromHash(window.location.hash);
      const sectionFromHash = sectionIdFromHash(window.location.hash);
      if (hashScreen === 'corsi' || hashScreen === 'chat') {
        handleNavigate(
          hashScreen,
          sectionFromHash ? { focusId: sectionFromHash } : undefined
        );
        return;
      }
      const section = sectionFromHash;
      if (section) {
        if (activeScreenRef.current === 'home' || section.startsWith('home-')) {
          if (activeScreenRef.current !== 'home') {
            handleNavigate('home', { focusId: section });
          } else {
            afterNextPaint(() => scrollToId(section, { behavior: 'smooth' }));
          }
        }
      }
    };

    syncFromLocation();
    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [handleNavigate]);

  const handleSelectTariffAndBook = (tariffId: ConsultationTariff['id']) => {
    setSelectedTariffId(tariffId);
    handleNavigate('booking');
  };

  const handleSelectCourseAndNavigate = (courseId: CourseId) => {
    setSelectedCourseId(courseId);
    handleNavigate('corsi', { focusId: SCROLL_LANDMARKS.corsi });
  };

  const isAuxScreen = AUX_SCREENS.includes(activeScreen);
  /** Highlight Area personale when on gated Maggiori approfondimenti (ENN-106). */
  const topBarScreen: ScreenId = isAuxScreen
    ? 'home'
    : activeScreen === 'approfondimenti-terzo-settenario'
      ? 'area-riservata'
      : activeScreen;

  return (
    <AuthProvider>
      <LeftToolsMenuProvider>
      <div className="min-h-screen min-h-[100dvh] w-full max-w-[100%] overflow-x-clip bg-[#12100E] text-[#F4F1EA] flex flex-col relative">
        <DocumentSeo activeScreen={activeScreen} />
        <AmbientSanctuaryBackground />

        <TopBar
          activeScreen={topBarScreen}
          onNavigate={handleNavigate}
          onOpenHandoff={() => setIsHandoffOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          showCmsKeys={showCmsKeys}
        />

        <main className="flex-1 w-full max-w-6xl mx-auto px-5 md:px-8 lg:px-12 pb-[max(6rem,env(safe-area-inset-bottom))] relative z-10">
          {activeScreen === 'home' && (
            <HomeScreen
              showCmsKeys={showCmsKeys}
              onNavigate={handleNavigate}
              onSelectTariffAndBook={handleSelectTariffAndBook}
              onSelectCourse={handleSelectCourseAndNavigate}
              onOpenHandoff={() => setIsHandoffOpen(true)}
              onOpenPrivacy={() => setIsPrivacyOpen(true)}
            />
          )}

          {activeScreen === 'chi-sono' && (
            <ChiSonoScreen
              showCmsKeys={showCmsKeys}
              onNavigate={handleNavigate}
            />
          )}

          {activeScreen === 'consulti' && (
            <ConsultiScreen
              showCmsKeys={showCmsKeys}
              selectedTariffId={selectedTariffId}
              onSelectTariffAndBook={handleSelectTariffAndBook}
            />
          )}

          {activeScreen === 'corsi' && (
            <CorsiScreen
              showCmsKeys={showCmsKeys}
              selectedCourseId={selectedCourseId}
              onChangeCourseId={setSelectedCourseId}
              onOpenChat={() => handleNavigate('chat')}
              onOpenReservedArea={() => handleNavigate('area-riservata')}
              onOpenMaggioriModuloBlog={() =>
                handleOpenBlogPost(MAGGIORI_MODULO_01_BLOG_SLUG)
              }
            />
          )}

          {activeScreen === 'area-riservata' && (
            <ReservedAreaScreen
              onNavigate={handleNavigate}
              onSelectCourse={handleSelectCourseAndNavigate}
              onOpenBlogPost={handleOpenBlogPost}
            />
          )}

          {activeScreen === 'approfondimenti-terzo-settenario' && (
            <ApprofondimentiTerzoSettenarioScreen onNavigate={handleNavigate} />
          )}

          {activeScreen === 'booking' && (
            <BookingScreen
              showCmsKeys={showCmsKeys}
              selectedTariffId={selectedTariffId}
              onChangeTariffId={setSelectedTariffId}
              onOpenChat={() => handleNavigate('chat')}
            />
          )}

          {activeScreen === 'chat' && (
            <ChatScreen
              showCmsKeys={showCmsKeys}
              onBookConsult={() => handleNavigate('booking')}
            />
          )}

          {activeScreen === 'news' && (
            <NewsScreen onNavigate={handleNavigate} />
          )}

          {activeScreen === 'contatti' && (
            <ContattiScreen onNavigate={handleNavigate} />
          )}

          {activeScreen === 'privacy' && (
            <PrivacyScreen onNavigate={handleNavigate} />
          )}

          {activeScreen === 'termini' && (
            <TerminiScreen onNavigate={handleNavigate} />
          )}

          {activeScreen === 'disclaimer' && (
            <DisclaimerScreen onNavigate={handleNavigate} />
          )}

          {activeScreen === 'sitemap' && (
            <SitemapScreen onNavigate={handleNavigate} />
          )}

          {activeScreen === 'not-found' && (
            <NotFoundScreen onNavigate={handleNavigate} />
          )}
        </main>

        <footer className="border-t border-[#D4AF37]/15 py-10 pb-24 relative z-10 md:py-12">
          <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 space-y-8 text-xs text-[#A39B93] md:space-y-10">
            {/*
              ENN-78: brand stack opens the footer centered on top (logo, Nina-compact
              contacts, address, CONDIVIDI). SERVIZI / INFO / LEGALE sit below as a
              separate three-column row — not four equal siblings in one grid.
            */}
            <div className="mx-auto flex w-full max-w-md flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <TarotHomeHeroLogo className="mx-auto block h-auto w-[min(52vw,168px)] md:w-[148px] lg:w-[10.75rem]" />
                <p className="text-[12px] leading-snug tracking-[0.04em] text-[#F4F1EA]/88">
                  Maria Teresa Rogani · Operatore Olistico
                </p>
              </div>
              <p className="max-w-[34ch] text-[13px] leading-relaxed text-[#A39B93]">
                Lettura del presente e del futuro · chiamata vocale online e di
                persona a Macerata
              </p>
              <div className="w-full max-w-[16rem] space-y-2">
                <div className="flex flex-col gap-1.5">
                  <a
                    href="tel:+393791038253"
                    className={FOOTER_CONTACT_BTN_CLASS}
                  >
                    <Phone
                      className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 truncate">379 103 82 53</span>
                  </a>
                  <a
                    href="mailto:info@tarotitalia.com"
                    className={FOOTER_CONTACT_BTN_CLASS}
                    title="Email · info@tarotitalia.com"
                  >
                    <Mail
                      className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 truncate">info@tarotitalia.com</span>
                  </a>
                  <a
                    href={SITE_PIVA_VERIFY_URL}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Verifica Partita IVA ${SITE_PIVA} sul sito dell'Agenzia delle Entrate`}
                    title="Verifica P.IVA · Agenzia delle Entrate"
                    className={FOOTER_CONTACT_BTN_CLASS}
                  >
                    <span className="min-w-0 truncate tracking-[0.06em]">
                      P.IVA {SITE_PIVA}
                    </span>
                  </a>
                </div>
                <p className="px-0.5 text-[12px] leading-relaxed text-[#A39B93]">
                  Via Crispi 37, 62100 Macerata
                </p>
              </div>
              <SocialShareButtons
                activeScreen={activeScreen}
                className="items-center"
              />
            </div>

            {/* Menù a gruppi: Servizi / Info / Legale — row under brand */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-8">
              {FOOTER_MENU_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.18em] text-[#D4AF37]">
                    {group.title}
                  </p>
                  <nav
                    aria-label={group.ariaLabel}
                    className="mt-3.5 flex flex-col items-start gap-2.5"
                  >
                    {group.items.map((item) => {
                      if (item.kind === 'screen') {
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavigate(item.id)}
                            className={FOOTER_LINK_CLASS}
                          >
                            {item.label}
                          </button>
                        );
                      }
                      if (item.kind === 'notice') {
                        return (
                          <button
                            key={item.notice}
                            type="button"
                            onClick={() => setLegalNotice(item.notice)}
                            className={FOOTER_LINK_CLASS}
                          >
                            {item.label}
                          </button>
                        );
                      }
                      if (item.kind === 'action') {
                        return (
                          <button
                            key={item.action}
                            type="button"
                            onClick={() => setIsPrivacyOpen(true)}
                            className={FOOTER_LINK_CLASS}
                          >
                            {item.label}
                          </button>
                        );
                      }
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          className={FOOTER_LINK_CLASS}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-[#D4AF37]/10 pt-5 md:flex-row md:items-center md:justify-between">
              <p className="text-[11px] text-[#A39B93]/80">
                © {new Date().getFullYear()} Tarot Italia · Maria Teresa Rogani
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <button
                  type="button"
                  onClick={() => setShowCmsKeys((prev) => !prev)}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {showCmsKeys ? 'Mostra Testi Live' : 'Ispeziona Chiavi [COPY]'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsHandoffOpen(true)}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Specifiche Handoff &amp; CMS
                </button>
              </div>
            </div>
          </div>
        </footer>

        <FloatingSideRail
          onNavigate={handleNavigate}
          onOpenHandoff={() => setIsHandoffOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          showCmsKeys={showCmsKeys}
        />

        <HandoffDrawer
          isOpen={isHandoffOpen}
          onClose={() => setIsHandoffOpen(false)}
          showCmsKeys={showCmsKeys}
          onToggleCmsKeys={() => setShowCmsKeys((prev) => !prev)}
        />

        <StickyContactBar />

        {/* Mobile: single «Strumenti» FAB; desktop: full vertical stack */}
        <ToolsFab />
        <div id={LEFT_TOOLS_MENU_ID}>
          <BackToTopFab />
          <ChatFab />
          <AccessibilityFab />
          <PrivacyCookiesWidget
            showCmsKeys={showCmsKeys}
            isModalOpen={isPrivacyOpen}
            onOpenModal={() => setIsPrivacyOpen(true)}
            onCloseModal={() => setIsPrivacyOpen(false)}
          />
        </div>

        <LegalNotice kind={legalNotice} onClose={() => setLegalNotice(null)} />
      </div>
      </LeftToolsMenuProvider>
    </AuthProvider>
  );
}

export default App;
