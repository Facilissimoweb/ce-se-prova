import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ExternalLink,
  Grid,
  Layers,
  MessageCircle,
  Shuffle,
} from 'lucide-react';
import type { ArcanaCard, ChatMessage } from '../types/handoff';
import {
  MAJOR_ARCANA,
  buildArcanaDialogueReply,
  buildSpreadSynthesisReply,
  type SpreadDrawItem,
  type SpreadPosition,
} from '../data/majorArcana';
import { initialChatMessages, siteContent } from '../data/siteContent';
import { CopyText } from '../components/CopyText';
import { TarotEmblemLogo } from '../components/TarotEmblem';
import { DialogueAccessBar } from '../components/chat/DialogueAccessBar';
import { DeckGallery } from '../components/chat/DeckGallery';
import { ActiveCardPanel } from '../components/chat/ActiveCardPanel';
import { ChatThreadPanel } from '../components/chat/ChatThreadPanel';
import { useAuth } from '../context/AuthContext';
import { useDialogueAccess } from '../hooks/useDialogueAccess';
import { nowTimeLabel } from '../lib/dialogueSession';

interface ChatScreenProps {
  showCmsKeys: boolean;
  onBookConsult: () => void;
}

const SPREAD_POSITIONS: SpreadPosition[] = [
  'Radice · Passato',
  'Centro · Presente',
  'Orizzonte · Futuro',
];

export function ChatScreen({ showCmsKeys, onBookConsult }: ChatScreenProps) {
  const { user, signInWithGoogle, getIdToken } = useAuth();

  const [activeCard, setActiveCard] = useState<ArcanaCard>(MAJOR_ARCANA[9]);
  const [activeSpread, setActiveSpread] = useState<SpreadDrawItem[] | null>(null);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [cardTab, setCardTab] = useState<'lettura' | 'domande'>('lettura');
  const threadEndRef = useRef<HTMLDivElement | null>(null);

  const onPassActivated = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
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

  const scrollToBottom = () => {
    setTimeout(() => {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  useEffect(() => {
    if (messages.length > initialChatMessages.length) {
      scrollToBottom();
    }
  }, [messages.length]);

  const selectSingleCard = async (
    card: ArcanaCard,
    sourceLabel: 'estratto' | 'scelto'
  ) => {
    const allowed = await dialogue.authorizeInteraction();
    if (!allowed) return;

    setActiveSpread(null);
    setActiveCard(card);
    setIsDeckOpen(false);
    setCardTab('lettura');

    const timeLabel = nowTimeLabel();
    const introMsg: ChatMessage = {
      id: `draw-${Date.now()}`,
      sender: 'practitioner',
      authorName: 'Tarot Italia IA · Lettura Guidata',
      timestamp: timeLabel,
      arcanaRef: `${card.name} · ${card.numeral}`,
      text: [
        `Hai ${sourceLabel} ${card.name} (${card.numeral} · ${card.archetype}).`,
        `Presente: ${card.synthesis}`,
        `Previsione futura: ${card.futureTendency}`,
        `Chiedimi pure cosa indica su amore, lavoro o decisioni future, oppure scegli una delle sue domande.`,
      ].join('\n\n'),
    };

    setMessages((prev) => [...prev, introMsg]);
    scrollToBottom();
  };

  const handleDrawRandomCard = async () => {
    const candidates = MAJOR_ARCANA.filter((c) => c.id !== activeCard.id);
    const picked =
      candidates[Math.floor(Math.random() * candidates.length)] ?? MAJOR_ARCANA[0];
    await selectSingleCard(picked, 'estratto');
  };

  const handleDrawThreeCardSpread = async () => {
    const allowed = await dialogue.authorizeInteraction();
    if (!allowed) return;

    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    const three = shuffled.slice(0, 3);
    const spread: SpreadDrawItem[] = three.map((card, i) => ({
      position: SPREAD_POSITIONS[i],
      card,
    }));

    setActiveSpread(spread);
    setActiveCard(spread[1].card);
    setIsDeckOpen(false);
    setCardTab('lettura');

    const spreadMsg: ChatMessage = {
      id: `spread-${Date.now()}`,
      sender: 'practitioner',
      authorName: 'Tarot Italia IA · Stesa a 3 Carte',
      timestamp: nowTimeLabel(),
      arcanaRef: `${spread[0].card.numeral} · ${spread[1].card.numeral} · ${spread[2].card.numeral}`,
      text: buildSpreadSynthesisReply(spread),
    };

    setMessages((prev) => [...prev, spreadMsg]);
    scrollToBottom();
  };

  const appendDialogue = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    const allowed = await dialogue.authorizeInteraction();
    if (!allowed) return;

    const timeLabel = nowTimeLabel();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'client',
      authorName: 'Tu',
      timestamp: timeLabel,
      text: trimmed,
    };

    const replyText = buildArcanaDialogueReply(trimmed, activeCard, activeSpread);

    const practitionerMsg: ChatMessage = {
      id: `prac-${Date.now() + 1}`,
      sender: 'practitioner',
      authorName: 'Tarot Italia IA · Lettura Guidata',
      timestamp: timeLabel,
      text: replyText,
      arcanaRef: activeSpread
        ? `${activeSpread[0].card.numeral} · ${activeSpread[1].card.numeral} · ${activeSpread[2].card.numeral}`
        : `${activeCard.name} · ${activeCard.numeral}`,
    };

    setMessages((prev) => [...prev, userMsg, practitionerMsg]);
    setInputText('');
    scrollToBottom();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void appendDialogue(inputText);
  };

  const whatsappContextText = activeSpread
    ? `Buongiorno Maria Teresa, ho estratto una stesa a 3 carte su Tarot Italia (${activeSpread
        .map((s) => `${s.position}: ${s.card.name} ${s.card.numeral}`)
        .join(', ')}) e vorrei approfondire con te.`
    : `Buongiorno Maria Teresa, ho dialogato con l'Arcano ${activeCard.name} (${activeCard.numeral}) su Tarot Italia e vorrei proseguire la lettura con te.`;

  const whatsappHref = `https://wa.me/390000000000?text=${encodeURIComponent(
    whatsappContextText
  )}`;

  return (
    <div className="pt-6 md:pt-10 pb-8 space-y-6">
      <div className="glass-tier-1 rounded-2xl overflow-hidden">
        <div className="px-5 md:px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <TarotEmblemLogo size={36} className="shrink-0" />
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

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => void handleDrawRandomCard()}
              className="min-h-[42px] px-3.5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Estrai Arcano
            </button>

            <button
              type="button"
              onClick={() => void handleDrawThreeCardSpread()}
              className="min-h-[42px] px-3.5 py-2 rounded-lg bg-[#D4AF37]/12 border border-[#D4AF37]/35 hover:border-[#D4AF37] text-[#F4F1EA] text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              Stesa 3 Carte
            </button>

            <button
              type="button"
              onClick={() => setIsDeckOpen((prev) => !prev)}
              aria-expanded={isDeckOpen}
              className={`min-h-[42px] px-3.5 py-2 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                isDeckOpen
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E6C65C]'
                  : 'bg-[#12100E]/80 border-[#D4AF37]/25 hover:border-[#D4AF37] text-[#F4F1EA]'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-[#D4AF37]" />
              Mazzo (22)
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] px-3.5 py-2 rounded-lg bg-[#12100E]/80 border border-[#D4AF37]/25 hover:border-[#D4AF37] text-xs font-semibold text-[#F4F1EA] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              WhatsApp
              <ExternalLink className="w-3 h-3 text-[#A39B93]" />
            </a>
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
            hasActiveSpread={Boolean(activeSpread)}
            onClose={() => setIsDeckOpen(false)}
            onSelectCard={(card) => void selectSingleCard(card, 'scelto')}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <ActiveCardPanel
            activeCard={activeCard}
            activeSpread={activeSpread}
            cardTab={cardTab}
            onChangeTab={setCardTab}
            onFocusSpreadCard={setActiveCard}
            onAskQuestion={(q) => void appendDialogue(q)}
            onBookConsult={onBookConsult}
          />

          <ChatThreadPanel
            messages={messages}
            threadEndRef={threadEndRef}
            activeCard={activeCard}
            showCmsKeys={showCmsKeys}
            showPassPanel={dialogue.showPassPanel}
            isExpired={dialogue.isExpired}
            selectedPackId={dialogue.selectedPackId}
            selectedPack={dialogue.selectedPack}
            customerName={dialogue.customerName}
            customerEmail={dialogue.customerEmail}
            unlocking={dialogue.unlocking}
            unlockError={dialogue.unlockError}
            inputText={inputText}
            isSignedIn={Boolean(user)}
            onSelectPack={dialogue.setSelectedPackId}
            onCustomerNameChange={dialogue.setCustomerName}
            onCustomerEmailChange={dialogue.setCustomerEmail}
            onUnlockSubmit={dialogue.handleUnlockTimePack}
            onClosePassPanel={() => dialogue.setShowPassPanel(false)}
            onSignIn={signInWithGoogle}
            onBookConsult={onBookConsult}
            onInputChange={setInputText}
            onSubmitMessage={handleSubmit}
            onQuickPrompt={(prompt) => void appendDialogue(prompt)}
          />
        </div>
      </div>
    </div>
  );
}
