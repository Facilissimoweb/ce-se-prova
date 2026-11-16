import React, { useCallback, useEffect, useState } from 'react';
import type { ConsultationTariff, CourseId, ScreenId } from './types/handoff';
import { AuthProvider } from './context/AuthContext';
import {
  FloatingSideRail,
  TopBar,
} from './components/NavigationChrome';
import { HandoffDrawer } from './components/HandoffDrawer';
import { AccessibilityFab } from './components/AccessibilityFab';
import { BackToTopFab } from './components/BackToTopFab';
import { PrivacyCookiesWidget } from './components/PrivacyCookiesWidget';
import { StickyContactBar } from './components/StickyContactBar';
import { LegalNotice, type LegalKind } from './components/LegalNotice';
import { AmbientSanctuaryBackground } from './components/AmbientSanctuaryBackground';
import { TarotEmblemLogo } from './components/TarotEmblem';
import { HomeScreen } from './screens/HomeScreen';
import { ChiSonoScreen } from './screens/ChiSonoScreen';
import { ConsultiScreen } from './screens/ConsultiScreen';
import { CorsiScreen } from './screens/CorsiScreen';
import { ReservedAreaScreen } from './screens/ReservedAreaScreen';
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
import { legalContent } from './data/legalContent';
import {
  bootstrapScreenFromLocation,
  navigatePath,
  pathForScreen,
  screenFromPath,
} from './lib/appPaths';

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
  const [activeScreen, setActiveScreen] = useState<ScreenId>(() =>
    bootstrapScreenFromLocation(window.location.pathname, window.location.search)
  );
  const [selectedTariffId, setSelectedTariffId] =
    useState<ConsultationTariff['id']>('60m');
  const [selectedCourseId, setSelectedCourseId] =
    useState<CourseId>('arcani-maggiori');
  const [showCmsKeys, setShowCmsKeys] = useState(false);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [legalNotice, setLegalNotice] = useState<LegalKind | null>(null);

  const handleNavigate = useCallback((screen: ScreenId) => {
    setActiveScreen(screen);
    navigatePath(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sync screen from URL on load / browser back-forward; rewrite legacy Stripe root returns.
  // Unknown paths keep the URL and show the 404 screen (no silent redirect to home).
  useEffect(() => {
    const syncFromLocation = () => {
      const next = bootstrapScreenFromLocation(
        window.location.pathname,
        window.location.search
      );
      setActiveScreen(next);
      if (next === 'not-found') {
        return;
      }
      const expected = pathForScreen(next);
      if (
        screenFromPath(window.location.pathname) !== next ||
        window.location.pathname !== expected
      ) {
        const search = window.location.search;
        window.history.replaceState({}, '', `${expected}${search}`);
      }
    };

    syncFromLocation();
    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, []);

  const handleSelectTariffAndBook = (tariffId: ConsultationTariff['id']) => {
    setSelectedTariffId(tariffId);
    handleNavigate('booking');
  };

  const handleSelectCourseAndNavigate = (courseId: CourseId) => {
    setSelectedCourseId(courseId);
    handleNavigate('corsi');
  };

  const isAuxScreen = AUX_SCREENS.includes(activeScreen);

  return (
    <AuthProvider>
      <div className="min-h-screen min-h-[100dvh] w-full max-w-[100%] overflow-x-clip bg-[#12100E] text-[#F4F1EA] flex flex-col relative">
        <AmbientSanctuaryBackground />

        <TopBar
          activeScreen={isAuxScreen ? 'home' : activeScreen}
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
            />
          )}

          {activeScreen === 'area-riservata' && (
            <ReservedAreaScreen
              onNavigate={handleNavigate}
              onSelectCourse={handleSelectCourseAndNavigate}
            />
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

        <footer className="border-t border-[#D4AF37]/15 py-10 pb-24 relative z-10">
          <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 space-y-8 text-xs text-[#A39B93]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Brand + contatti + P.IVA + share */}
              <div className="lg:col-span-4 space-y-5">
                <div className="flex items-center gap-3">
                  <TarotEmblemLogo size={56} className="shrink-0" />
                  <div>
                    <p className="font-display text-base tracking-[0.06em] text-[#F4F1EA]">
                      Tarot Italia
                    </p>
                    <p className="text-[11px] text-[#A39B93]">
                      Maria Teresa Rogani · Operatore Olistico
                    </p>
                  </div>
                </div>
                <p className="text-[#A39B93]/95 leading-relaxed max-w-sm">
                  Lettura del presente e del futuro · chiamata vocale online e
                  di persona a Macerata
                </p>
                <div className="space-y-1.5">
                  <p>
                    <a
                      href="mailto:info@tarotitalia.com"
                      className="hover:text-[#D4AF37] transition-colors"
                    >
                      info@tarotitalia.com
                    </a>
                    {' · '}
                    <a
                      href="tel:+393791038253"
                      className="hover:text-[#D4AF37] transition-colors"
                    >
                      379 103 82 53
                    </a>
                  </p>
                  <p>
                    <button
                      type="button"
                      onClick={() => handleNavigate('contatti')}
                      className="hover:text-[#D4AF37] transition-colors text-left"
                    >
                      Via Crispi 37, 62100 Macerata
                    </button>
                  </p>
                  <p className="text-[#F4F1EA]/80 tracking-wide">
                    P.IVA 02136780430
                  </p>
                </div>
                <SocialShareButtons activeScreen={activeScreen} />
              </div>

              {/* Menù a gruppi: Servizi / Info / Legale */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-8">
                  {FOOTER_MENU_GROUPS.map((group) => (
                    <div key={group.title}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                        {group.title}
                      </p>
                      <nav
                        aria-label={group.ariaLabel}
                        className="mt-4 flex flex-col items-start gap-2.5"
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
              </div>
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

        <BackToTopFab />
        <AccessibilityFab />

        <PrivacyCookiesWidget
          showCmsKeys={showCmsKeys}
          isModalOpen={isPrivacyOpen}
          onOpenModal={() => setIsPrivacyOpen(true)}
          onCloseModal={() => setIsPrivacyOpen(false)}
        />

        <LegalNotice kind={legalNotice} onClose={() => setLegalNotice(null)} />
      </div>
    </AuthProvider>
  );
}

export default App;
