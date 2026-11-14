import React, { useState } from 'react';
import type { ConsultationTariff, ScreenId } from './types/handoff';
import {
  FloatingSideRail,
  MobileBottomNav,
  TopBar,
} from './components/NavigationChrome';
import { HandoffDrawer } from './components/HandoffDrawer';
import { PrivacyCookiesWidget } from './components/PrivacyCookiesWidget';
import { AmbientSanctuaryBackground } from './components/AmbientSanctuaryBackground';
import { HomeScreen } from './screens/HomeScreen';
import { ConsultiScreen } from './screens/ConsultiScreen';
import { BookingScreen } from './screens/BookingScreen';
import { ChatScreen } from './screens/ChatScreen';

export function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [selectedTariffId, setSelectedTariffId] =
    useState<ConsultationTariff['id']>('60m');
  const [showCmsKeys, setShowCmsKeys] = useState(false);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleNavigate = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTariffAndBook = (tariffId: ConsultationTariff['id']) => {
    setSelectedTariffId(tariffId);
    handleNavigate('booking');
  };

  return (
    <div className="min-h-screen bg-[#12100E] text-[#F4F1EA] flex flex-col relative">
      <AmbientSanctuaryBackground />

      <TopBar activeScreen={activeScreen} onNavigate={handleNavigate} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-5 md:px-8 lg:px-12 pb-24 md:pb-12 relative z-10">
        {activeScreen === 'home' && (
          <HomeScreen
            showCmsKeys={showCmsKeys}
            onNavigate={handleNavigate}
            onOpenHandoff={() => setIsHandoffOpen(true)}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
          />
        )}

        {activeScreen === 'consulti' && (
          <ConsultiScreen
            showCmsKeys={showCmsKeys}
            selectedTariffId={selectedTariffId}
            onSelectTariffAndBook={handleSelectTariffAndBook}
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
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="hidden md:block border-t border-[#D4AF37]/15 py-6 relative z-10">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A39B93]">
          <p>
            Tarot Italia · Maria Teresa Rogani, Operatore Olistico · Lettura del presente e del futuro
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Privacy &amp; Cookie
            </button>
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
      </footer>

      <MobileBottomNav activeScreen={activeScreen} onNavigate={handleNavigate} />

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
    </div>
  );
}

export default App;
