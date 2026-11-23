import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, Shuffle } from 'lucide-react';
import type { ArcanaCard, ChatMessage } from '../types/handoff';
import { MAJOR_ARCANA } from '../data/majorArcana';
import { siteContent } from '../data/siteContent';
import { CopyText } from '../components/CopyText';
import { TarotEmblemLogo } from '../components/TarotEmblem';
import { CheckoutReturnBanner } from '../components/CheckoutReturnBanner';
import { DialogueAccessBar } from '../components/chat/DialogueAccessBar';
import { DeckGallery } from '../components/chat/DeckGallery';
import { ActiveCardPanel } from '../components/chat/ActiveCardPanel';
import { ChatThreadPanel } from '../components/chat/ChatThreadPanel';
import { useAuth } from '../context/AuthContext';
import { useDialogueAccess } from '../hooks/useDialogueAccess';
import {
  SCROLL_LANDMARKS,
  afterLayoutSettle,
  scrollToElement,
} from '../lib/scrollNavigation';

interface ChatScreenProps {
  showCmsKeys: boolean;
  onBookConsult: () => void;
}

/**
 * Mobile-first: porta l’inizio del resoconto sotto l’header sticky
 * (non a metà / in fondo alla pagina).
 */
function scrollDialogueAnswerIntoView(el: HTMLElement | null): () => void {
  if (!el || typeof window === 'undefined') return () => undefined;

  const run = () => {
    scrollToElement(el, { behavior: 'smooth', extraOffset: 8 });
  };

  run();
  return afterLayoutSettle(run);
}

export function ChatScreen({ showCmsKeys, onBookConsult }: ChatScreenProps) {
  const { user, signInWithGoogle, getIdToken } = useAuth();

  const [activeCard, setActiveCard] = useState<ArcanaCard>(MAJOR_ARCANA[9]);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  /** Incrementato a ogni estrazione/scelta per ri-ancorare lo scroll. */
  const [resultScrollKey, setResultScrollKey] = useState(0);
  const resultScrollRef = useRef<HTMLElement | null>(null);
  const cancelAnswerScrollRef = useRef<(() => void) | null>(null);

  const onPassActivated = useCallback((_message: ChatMessage) => {
    // Il Dialogo è in sola lettura: il Pass sblocca nuove estrazioni, senza thread chat.
  }, []);

  const dialogue = useDialogueAccess({
    userUid: user?.uid,
    getIdToken,
    onPassActivated,
  });

  useEffect(() => {
    if (user) {
      dialogue.setCustomerName((prev) => prev || user.displayName || '');
      dialogue.setCustomerEmail((prev) => prev || user.email || '');
    }
    // Only hydrate from auth profile when user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (resultScrollKey === 0) return;
    cancelAnswerScrollRef.current?.();
    cancelAnswerScrollRef.current = scrollDialogueAnswerIntoView(
      resultScrollRef.current
    );
    return () => {
      cancelAnswerScrollRef.current?.();
      cancelAnswerScrollRef.current = null;
    };
  }, [resultScrollKey, activeCard.id]);

  const selectSingleCard = async (card: ArcanaCard) => {
    const allowed = await dialogue.authorizeInteraction();
    if (!allowed) return;

    setActiveCard(card);
    setIsDeckOpen(false);
    setResultScrollKey((n) => n + 1);
  };

  const handleDrawRandomCard = async () => {
    const candidates = MAJOR_ARCANA.filter((c) => c.id !== activeCard.id);
    const picked =
      candidates[Math.floor(Math.random() * candidates.length)] ?? MAJOR_ARCANA[0];
    await selectSingleCard(picked);
  };

  return (
    <div
      id={SCROLL_LANDMARKS.dialogo}
      className="scroll-mt-[calc(4.75rem+env(safe-area-inset-top,0px))] pt-6 md:scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] md:pt-10 pb-8 space-y-6"
    >
      <CheckoutReturnBanner variant="dialogue" />
      <div className="glass-tier-1 rounded-2xl overflow-hidden">
        <div className="px-5 md:px-6 py-5 space-y-4">
          <div className="flex items-center gap-3.5">
            <TarotEmblemLogo size={56} className="shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                <CopyText entry={siteContent.brand.name} showKeys={showCmsKeys} /> IA · 22
                Arcani Maggiori
              </p>
              <h1 className="font-display text-2xl md:text-[28px] tracking-[0.02em] text-[#F4F1EA]">
                <CopyText entry={siteContent.chat.title} showKeys={showCmsKeys} />
              </h1>
            </div>
          </div>

          <p className="text-sm md:text-[15px] leading-relaxed text-[#E8e1dd] max-w-2xl">
            Concentrati su una domanda e ascolta il resoconto.
          </p>

          <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => void handleDrawRandomCard()}
              className="min-h-[42px] w-full px-3.5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors sm:w-auto sm:shrink-0"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Estrai Arcano
            </button>

            <button
              type="button"
              onClick={() => setIsDeckOpen((prev) => !prev)}
              aria-expanded={isDeckOpen}
              className={`min-h-[42px] w-full px-3.5 py-2 rounded-lg border text-xs font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors sm:w-auto sm:shrink-0 ${
                isDeckOpen
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E6C65C]'
                  : 'bg-[#12100E]/80 border-[#D4AF37]/25 hover:border-[#D4AF37] text-[#F4F1EA]'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-[#D4AF37]" />
              Mazzo (22 Lame)
            </button>
          </div>
        </div>

        <DialogueAccessBar
          accessStatus={dialogue.accessStatus}
          liveRemainingSeconds={dialogue.liveRemainingSeconds}
          isExpired={dialogue.isExpired}
          progressRatio={dialogue.progressRatio}
          showPassPanel={dialogue.showPassPanel}
          onTogglePassPanel={() => dialogue.setShowPassPanel((prev) => !prev)}
        />

        <div className="gold-divider" aria-hidden="true" />

        {isDeckOpen && (
          <DeckGallery
            activeCardId={activeCard.id}
            onClose={() => setIsDeckOpen(false)}
            onSelectCard={(card) => void selectSingleCard(card)}
          />
        )}

        <ActiveCardPanel
          activeCard={activeCard}
          resultScrollRef={resultScrollRef}
        />

        <ChatThreadPanel
          showPassPanel={dialogue.showPassPanel}
          isExpired={dialogue.isExpired}
          selectedPackId={dialogue.selectedPackId}
          selectedPack={dialogue.selectedPack}
          customerName={dialogue.customerName}
          customerEmail={dialogue.customerEmail}
          unlocking={dialogue.unlocking}
          unlockError={dialogue.unlockError}
          isSignedIn={Boolean(user)}
          onSelectPack={dialogue.setSelectedPackId}
          onCustomerNameChange={dialogue.setCustomerName}
          onCustomerEmailChange={dialogue.setCustomerEmail}
          onUnlockSubmit={dialogue.handleUnlockTimePack}
          onClosePassPanel={() => dialogue.setShowPassPanel(false)}
          onSignIn={signInWithGoogle}
          onBookConsult={onBookConsult}
        />
      </div>
    </div>
  );
}
