import React, { useCallback, useEffect, useState } from 'react';
import type { ConsultationTariff, CourseId, ScreenId } from './types/handoff';
import { AuthProvider } from './context/AuthContext';
import {
  FloatingSideRail,
  TopBar,
} from './components/NavigationChrome';
import { HandoffDrawer } from './components/HandoffDrawer';
import { PrivacyCookiesWidget } from './components/PrivacyCookiesWidget';
import { LegalNotice, type LegalKind } from './components/LegalNotice';
import { AmbientSanctuaryBackground } from './components/AmbientSanctuaryBackground';
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
import { legalContent } from './data/legalContent';
import {
  bootstrapScreenFromLocation,
  navigatePath,
  pathForScreen,
  screenFromPath,
} from './lib/appPaths';

const LEGAL_SCREENS: ScreenId[] = ['privacy', 'termini', 'disclaimer'];

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
  useEffect(() => {
    const syncFromLocation = () => {
      const next = bootstrapScreenFromLocation(
        window.location.pathname,
        window.location.search
      );
      setActiveScreen(next);
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

  const isLegalScreen = LEGAL_SCREENS.includes(activeScreen);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#12100E] text-[#F4F1EA] flex flex-col relative">
        <AmbientSanctuaryBackground />

        <TopBar
          activeScreen={isLegalScreen ? 'home' : activeScreen}
          onNavigate={handleNavigate}
          onOpenHandoff={() => setIsHandoffOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          showCmsKeys={showCmsKeys}
        />

        <main className="flex-1 w-full max-w-6xl mx-auto px-5 md:px-8 lg:px-12 pb-12 relative z-10">
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

          {activeScreen === 'privacy' && (
            <PrivacyScreen onNavigate={handleNavigate} />
          )}

          {activeScreen === 'termini' && (
            <TerminiScreen onNavigate={handleNavigate} />
          )}

          {activeScreen === 'disclaimer' && (
            <DisclaimerScreen onNavigate={handleNavigate} />
          )}
        </main>

        <footer className="border-t border-[#D4AF37]/15 py-8 relative z-10">
          <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 space-y-5 text-xs text-[#A39B93]">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1.5 max-w-xl">
                <p>
                  Tarot Italia · Maria Teresa Rogani, Operatore Olistico · Lettura del presente e del futuro
                </p>
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
                <p>Via Crispi 37, 62100 Macerata</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-end">
                <button
                  type="button"
                  onClick={() => handleNavigate('chi-sono')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Chi Sono
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate('area-riservata')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Area Riservata
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate('disclaimer')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Disclaimer
                </button>
                <button
                  type="button"
                  onClick={() => setLegalNotice('tutela')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {legalContent.tutela.kicker}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#D4AF37]/10 pt-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A39B93]/85">
                <button
                  type="button"
                  onClick={() => handleNavigate('privacy')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {legalContent.privacy.sezione}
                </button>
                <span className="text-[#D4AF37]/30" aria-hidden>
                  |
                </span>
                <button
                  type="button"
                  onClick={() => handleNavigate('termini')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {legalContent.vendita.sezione}
                </button>
                <span className="text-[#D4AF37]/30" aria-hidden>
                  |
                </span>
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Cookie
                </button>
              </div>
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
