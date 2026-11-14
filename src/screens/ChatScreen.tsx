import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  CreditCard,
  ExternalLink,
  Grid,
  Layers,
  Lock,
  MessageCircle,
  Send,
  Shuffle,
  Sparkles,
  X,
} from 'lucide-react';
import type {
  ArcanaCard,
  ChatMessage,
  DialogueAccessStatus,
  DialoguePackId,
  StripeCheckoutHandoffPayload,
} from '../types/handoff';
import {
  MAJOR_ARCANA,
  buildArcanaDialogueReply,
  buildSpreadSynthesisReply,
  type SpreadDrawItem,
  type SpreadPosition,
} from '../data/majorArcana';
import {
  dialogueTimePacks,
  initialChatMessages,
  siteContent,
} from '../data/siteContent';
import { CopyText } from '../components/CopyText';
import { MajorArcanaArtwork } from '../components/MajorArcanaArtwork';
import { TarotEmblemLogo } from '../components/TarotEmblem';
import { useAuth } from '../context/AuthContext';

interface ChatScreenProps {
  showCmsKeys: boolean;
  onBookConsult: () => void;
}

const SPREAD_POSITIONS: SpreadPosition[] = [
  'Radice · Passato',
  'Centro · Presente',
  'Orizzonte · Futuro',
];

const SESSION_STORAGE_KEY = 'tarot_italia_dialogue_session_key';

function getOrCreateDialogueSessionKey(): string {
  try {
    const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (existing && existing.length >= 12) return existing;
    const created =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `dlg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(SESSION_STORAGE_KEY, created);
    return created;
  } catch {
    return `dlg_mem_${Date.now()}`;
  }
}

function formatCountdown(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function nowTimeLabel(): string {
  return new Date().toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ChatScreen({ showCmsKeys, onBookConsult }: ChatScreenProps) {
  const { user, signInWithGoogle, getIdToken } = useAuth();
  const [sessionKey] = useState<string>(() => getOrCreateDialogueSessionKey());

  const [accessStatus, setAccessStatus] = useState<DialogueAccessStatus>({
    sessionKey,
    mode: 'ready',
    remainingSeconds: 300,
    freeTrialSecondsTotal: 300,
    freeTrialUsed: false,
    activePackId: null,
    expiresAtIso: null,
    interactionsCount: 0,
    serverTimeIso: new Date().toISOString(),
  });
  const [serverOffsetMs, setServerOffsetMs] = useState(0);
  const [liveRemainingSeconds, setLiveRemainingSeconds] = useState(300);

  const [activeCard, setActiveCard] = useState<ArcanaCard>(MAJOR_ARCANA[9]);
  const [activeSpread, setActiveSpread] = useState<SpreadDrawItem[] | null>(null);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [cardTab, setCardTab] = useState<'lettura' | 'domande'>('lettura');

  // Paywall / Timed Pass Checkout state
  const [showPassPanel, setShowPassPanel] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState<DialoguePackId>('30m');
  const [customerName, setCustomerName] = useState(user?.displayName ?? '');
  const [customerEmail, setCustomerEmail] = useState(user?.email ?? '');
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [handoffPayload, setHandoffPayload] =
    useState<StripeCheckoutHandoffPayload | null>(null);

  const threadEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user) {
      setCustomerName((prev) => prev || user.displayName || '');
      setCustomerEmail((prev) => prev || user.email || '');
    }
  }, [user]);

  const applyServerStatus = useCallback((nextStatus: DialogueAccessStatus) => {
    const serverNow = Date.parse(nextStatus.serverTimeIso);
    if (!Number.isNaN(serverNow)) {
      setServerOffsetMs(serverNow - Date.now());
    }
    setAccessStatus(nextStatus);
    setLiveRemainingSeconds(nextStatus.remainingSeconds);
    if (nextStatus.mode === 'expired') {
      setShowPassPanel(true);
    }
  }, []);

  const fetchDialogueStatus = useCallback(async () => {
    try {
      const token = user ? await getIdToken() : null;
      const res = await fetch(
        `/api/dialogue/status?sessionKey=${encodeURIComponent(sessionKey)}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      if (!res.ok) return;
      const json = (await res.json()) as { status?: DialogueAccessStatus };
      if (json.status) {
        applyServerStatus(json.status);
      }
    } catch {
      // Keep graceful local state if transient network error
    }
  }, [sessionKey, user, getIdToken, applyServerStatus]);

  useEffect(() => {
    fetchDialogueStatus();
  }, [fetchDialogueStatus]);

  // Synchronized countdown ticker once trial or paid pass has started
  useEffect(() => {
    if (
      (accessStatus.mode !== 'free_trial' && accessStatus.mode !== 'paid_pass') ||
      !accessStatus.expiresAtIso
    ) {
      return;
    }

    const expiryMs = Date.parse(accessStatus.expiresAtIso);
    if (Number.isNaN(expiryMs)) return;

    const updateTick = () => {
      const estimatedServerNow = Date.now() + serverOffsetMs;
      const secs = Math.max(0, Math.ceil((expiryMs - estimatedServerNow) / 1000));
      setLiveRemainingSeconds(secs);
      if (secs <= 0) {
        setAccessStatus((prev) => ({
          ...prev,
          mode: 'expired',
          remainingSeconds: 0,
        }));
        setShowPassPanel(true);
      }
    };

    updateTick();
    const timer = window.setInterval(updateTick, 1000);
    return () => window.clearInterval(timer);
  }, [accessStatus.mode, accessStatus.expiresAtIso, serverOffsetMs]);

  const scrollToBottom = () => {
    setTimeout(() => {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const authorizeInteraction = async (): Promise<boolean> => {
    if (accessStatus.mode === 'expired' || liveRemainingSeconds <= 0 && accessStatus.mode !== 'ready') {
      setShowPassPanel(true);
      return false;
    }

    try {
      const token = user ? await getIdToken() : null;
      const res = await fetch('/api/dialogue/interact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ sessionKey }),
      });
      const json = (await res.json()) as {
        allowed?: boolean;
        status?: DialogueAccessStatus;
      };
      if (json.status) {
        applyServerStatus(json.status);
      }
      if (res.status === 402 || json.allowed === false) {
        setShowPassPanel(true);
        return false;
      }
      return true;
    } catch {
      return accessStatus.mode === 'ready' || liveRemainingSeconds > 0;
    }
  };

  const selectSingleCard = async (
    card: ArcanaCard,
    sourceLabel: 'estratto' | 'scelto'
  ) => {
    const allowed = await authorizeInteraction();
    if (!allowed) return;

    setActiveSpread(null);
    setActiveCard(card);
    setIsDeckOpen(false);
    setCardTab('lettura');

    const timeLabel = nowTimeLabel();
    const introMsg: ChatMessage = {
      id: `draw-${Date.now()}`,
      sender: 'practitioner',
      authorName: 'Maria Teresa Rogani · Lettura Guidata',
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
    const allowed = await authorizeInteraction();
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
      authorName: 'Maria Teresa Rogani · Stesa a 3 Carte',
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

    const allowed = await authorizeInteraction();
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
      authorName: 'Maria Teresa Rogani · Lettura Guidata',
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

  const selectedPack =
    dialogueTimePacks.find((p) => p.id === selectedPackId) ?? dialogueTimePacks[1];

  const handleUnlockTimePack = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockError(null);

    if (customerName.trim().length < 2) {
      setUnlockError('Inserisci il tuo nome e cognome.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      setUnlockError('Inserisci un indirizzo email valido.');
      return;
    }

    setUnlocking(true);
    try {
      const token = user ? await getIdToken() : null;
      const res = await fetch('/api/dialogue/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          sessionKey,
          packId: selectedPack.id,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
        }),
      });
      const json = (await res.json()) as {
        error?: string;
        status?: DialogueAccessStatus;
      };
      if (!res.ok) {
        throw new Error(json.error || 'Impossibile attivare il pass temporale.');
      }

      if (json.status) {
        applyServerStatus(json.status);
      }

      const payload: StripeCheckoutHandoffPayload = {
        provider: 'stripe_checkout',
        mode: 'payment',
        priceId: selectedPack.stripePriceIdAnnotation,
        amountEur: selectedPack.priceEur,
        currency: 'EUR',
        customerEmail: customerEmail.trim(),
        supabaseUserId: user?.uid ?? '<GUEST_OR_AUTH_SESSION>',
        metadata: {
          itemType: 'dialogue_pass',
          practitioner: 'Maria Teresa Rogani',
          packId: selectedPack.id,
          durationMinutes: selectedPack.durationMinutes,
          phoneWhatsApp: '',
          deontologyAccepted: true,
        },
        successUrlPattern: `/dialogo?pass=${selectedPack.id}&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrlPattern: `/dialogo?cancelled=true`,
      };
      setHandoffPayload(payload);
      setShowPassPanel(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `unlock-${Date.now()}`,
          sender: 'practitioner',
          authorName: 'Maria Teresa Rogani · Pass Attivato',
          timestamp: nowTimeLabel(),
          text: `${selectedPack.title} attivato (${selectedPack.durationMinutes} minuti). Puoi proseguire il dialogo con gli Arcani Maggiori.`,
        },
      ]);
      scrollToBottom();
    } catch (err) {
      setUnlockError(
        err instanceof Error ? err.message : 'Errore durante l’attivazione.'
      );
    } finally {
      setUnlocking(false);
    }
  };

  const whatsappContextText = activeSpread
    ? `Buongiorno Maria Teresa, ho estratto una stesa a 3 carte su Tarot Italia (${activeSpread
        .map((s) => `${s.position}: ${s.card.name} ${s.card.numeral}`)
        .join(', ')}) e vorrei approfondire con te.`
    : `Buongiorno Maria Teresa, ho dialogato con l'Arcano ${activeCard.name} (${activeCard.numeral}) su Tarot Italia e vorrei proseguire la lettura con te.`;

  const whatsappHref = `https://wa.me/390000000000?text=${encodeURIComponent(
    whatsappContextText
  )}`;

  const isExpired = accessStatus.mode === 'expired';
  const totalWindowSeconds =
    accessStatus.mode === 'paid_pass'
      ? Math.max(
          liveRemainingSeconds,
          (dialogueTimePacks.find((p) => p.id === accessStatus.activePackId)
            ?.durationMinutes ?? 15) * 60
        )
      : accessStatus.freeTrialSecondsTotal;
  const progressRatio = Math.min(
    1,
    Math.max(0, liveRemainingSeconds / Math.max(1, totalWindowSeconds))
  );

  return (
    <div className="pt-6 md:pt-10 pb-8 space-y-6">
      {/* Main Interactive Sanctuary Card */}
      <div className="glass-tier-1 rounded-2xl overflow-hidden">
        <div className="px-5 md:px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <TarotEmblemLogo size={36} className="shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                <CopyText entry={siteContent.brand.name} showKeys={showCmsKeys} /> · 22 Arcani Maggiori
              </p>
              <h1 className="font-display text-2xl md:text-[28px] tracking-[0.02em] text-[#F4F1EA]">
                <CopyText entry={siteContent.chat.title} showKeys={showCmsKeys} />
              </h1>
            </div>
          </div>

          {/* Interactive Deck Actions */}
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

        {/* Authoritative 5-Minute Free Trial + Timed Pass Status Bar */}
        <div className="px-5 md:px-6 py-3 bg-[#151311]/90 border-t border-[#D4AF37]/15 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <Clock
                className={`w-3.5 h-3.5 shrink-0 ${
                  isExpired ? 'text-[#ffb4ab]' : 'text-[#D4AF37]'
                }`}
                aria-hidden="true"
              />
              {accessStatus.mode === 'ready' && (
                <>
                  <span className="font-semibold text-[#F4F1EA]">
                    Prova gratuita: <span className="tabular-nums text-[#D4AF37]">05:00</span> disponibili
                  </span>
                  <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
                  <span className="text-[#A39B93]">
                    Il timer parte alla tua prima domanda o estrazione
                  </span>
                </>
              )}
              {accessStatus.mode === 'free_trial' && (
                <>
                  <span className="font-semibold text-[#F4F1EA]">
                    Prova gratuita attiva
                  </span>
                  <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
                  <span className="font-mono font-semibold text-[#D4AF37] tabular-nums">
                    {formatCountdown(liveRemainingSeconds)} rimanenti
                  </span>
                  <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
                  <span className="text-[#A39B93]">
                    Dopo i 5 min puoi proseguire con un pass a tempo
                  </span>
                </>
              )}
              {accessStatus.mode === 'paid_pass' && (
                <>
                  <span className="font-semibold text-[#E6C65C]">
                    Pass a tempo attivo ({accessStatus.activePackId})
                  </span>
                  <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
                  <span className="font-mono font-semibold text-[#D4AF37] tabular-nums">
                    {formatCountdown(liveRemainingSeconds)} rimanenti
                  </span>
                </>
              )}
              {accessStatus.mode === 'expired' && (
                <>
                  <span className="font-semibold text-[#ffb4ab]">
                    I 5 minuti gratuiti sono terminati
                  </span>
                  <span aria-hidden="true" className="text-[#D4AF37]/40">·</span>
                  <span className="text-[#A39B93]">
                    Sblocca un pacchetto minuti per continuare il dialogo
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowPassPanel((prev) => !prev)}
              className="text-xs font-semibold text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />
              {showPassPanel ? 'Torna al dialogo' : 'Tariffe a tempo (15 / 30 / 60m)'}
            </button>
          </div>

          <div className="h-[2px] w-full bg-[#D4AF37]/15 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isExpired ? 'bg-[#ffb4ab]/60' : 'bg-[#D4AF37]'
              }`}
              style={{ width: `${Math.round(progressRatio * 100)}%` }}
            />
          </div>
        </div>

        <div className="gold-divider" aria-hidden="true" />

        {/* Collapsible Visual Gallery of All 22 Major Arcana */}
        {isDeckOpen && (
          <section
            aria-label="Galleria dei 22 Arcani Maggiori"
            className="p-5 md:p-6 bg-[#100E0C]/90 border-b border-[#D4AF37]/20 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  Mazzo Completo · 0 – XXI
                </p>
                <h2 className="font-body font-semibold tracking-[-0.015em] text-base md:text-lg text-[#F4F1EA]">
                  Scegli un Arcano Maggiore con cui dialogare
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsDeckOpen(false)}
                aria-label="Chiudi galleria degli Arcani"
                className="w-9 h-9 rounded-lg border border-[#D4AF37]/25 flex items-center justify-center text-[#A39B93] hover:text-[#F4F1EA] hover:border-[#D4AF37]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
              {MAJOR_ARCANA.map((card) => {
                const isSelected = activeCard.id === card.id && !activeSpread;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => void selectSingleCard(card, 'scelto')}
                    className={`group rounded-xl p-1.5 border text-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      isSelected
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                        : 'bg-[#151311]/75 border-[#D4AF37]/15 hover:border-[#D4AF37]/60 hover:-translate-y-0.5'
                    }`}
                    title={`${card.numeral} · ${card.name}`}
                  >
                    <MajorArcanaArtwork
                      number={card.number}
                      numeral={card.numeral}
                      name={card.name}
                      compact
                      className="w-full h-auto rounded-lg"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Two-column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: Active Card or 3-Card Spread Details */}
          <section
            aria-label={`Arcano selezionato ${activeCard.name}`}
            className="lg:col-span-5 p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/15 flex flex-col gap-5 bg-[#151311]/55"
          >
            {activeSpread && (
              <div className="space-y-2 pb-3 border-b border-[#D4AF37]/15">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  Stesa Attiva · Clicca una carta per ispezionarla
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {activeSpread.map((item) => {
                    const focused = activeCard.id === item.card.id;
                    return (
                      <button
                        key={item.position}
                        type="button"
                        onClick={() => setActiveCard(item.card)}
                        className={`rounded-xl p-1.5 border text-left transition-all ${
                          focused
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37]'
                            : 'bg-[#12100E]/80 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <MajorArcanaArtwork
                          number={item.card.number}
                          numeral={item.card.numeral}
                          name={item.card.name}
                          compact
                          className="w-full h-auto rounded-lg"
                        />
                        <span className="block text-[10px] font-semibold text-[#D4AF37] text-center mt-1.5 truncate">
                          {item.position.split(' · ')[1]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  {activeSpread ? 'Focus Carta Selezionata' : 'Arcano Attivo'}
                </p>
                <h2 className="font-body font-semibold tracking-[-0.02em] text-xl text-[#F4F1EA]">
                  {activeCard.name} · {activeCard.numeral}
                </h2>
              </div>

              <div className="flex items-center p-1 rounded-lg bg-[#12100E] border border-[#D4AF37]/20 shrink-0">
                <button
                  type="button"
                  onClick={() => setCardTab('lettura')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    cardTab === 'lettura'
                      ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                      : 'text-[#A39B93] hover:text-[#F4F1EA]'
                  }`}
                >
                  Lettura
                </button>
                <button
                  type="button"
                  onClick={() => setCardTab('domande')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    cardTab === 'domande'
                      ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                      : 'text-[#A39B93] hover:text-[#F4F1EA]'
                  }`}
                >
                  Domande
                </button>
              </div>
            </div>

            {cardTab === 'lettura' ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center sm:items-start lg:items-center xl:items-start gap-5">
                  <div className="w-36 shrink-0 rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
                    <MajorArcanaArtwork
                      number={activeCard.number}
                      numeral={activeCard.numeral}
                      name={activeCard.name}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <p className="text-xs text-[#D4AF37] font-medium">
                      {activeCard.archetype}
                    </p>
                    <p className="text-xs text-[#A39B93]">
                      {activeCard.element} · {activeCard.keywords.join(' · ')}
                    </p>
                    <div className="space-y-1 pt-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#D4AF37]">
                        Presente
                      </p>
                      <p className="text-xs md:text-sm leading-relaxed text-[#E8e1dd]">
                        {activeCard.synthesis}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#12100E]/75 border border-[#D4AF37]/15 p-3.5 space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#D4AF37]">
                    Linea Previsionale · Futuro
                  </p>
                  <p className="text-xs leading-relaxed text-[#E8e1dd]">
                    {activeCard.futureTendency}
                  </p>
                  <p className="text-xs leading-relaxed text-[#A39B93] pt-1 border-t border-[#D4AF37]/10">
                    Consiglio: {activeCard.advice}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#A39B93]">
                  Seleziona una domanda legata a {activeCard.name} ({activeCard.numeral}) per esplorarla nel dialogo:
                </p>
                {activeCard.maieuticQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void appendDialogue(question)}
                    className="w-full text-left p-3.5 rounded-xl bg-[#12100E]/80 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs md:text-sm text-[#F4F1EA] leading-relaxed flex items-start justify-between gap-3 transition-colors group"
                  >
                    <span>{question}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between gap-3">
              <span className="text-xs text-[#A39B93]">
                Vuoi una chiamata vocale individuale?
              </span>
              <button
                type="button"
                onClick={onBookConsult}
                className="text-xs font-semibold text-[#D4AF37] hover:text-[#E6C65C] inline-flex items-center gap-1 whitespace-nowrap"
              >
                Prenota ora <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* Right Panel: Guided Conversation Thread + Timed Paywall Panel */}
          <section
            aria-label="Pannello conversazione guidata"
            className="lg:col-span-7 flex flex-col min-h-[500px] lg:h-[660px]"
          >
            {/* Scrollable Messages */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4">
              {messages.map((msg) => {
                const isClient = msg.sender === 'client';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isClient ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[11px] text-[#A39B93] mb-1 px-1">
                      <span>{msg.authorName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{msg.timestamp}</span>
                      {msg.arcanaRef && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#D4AF37]">{msg.arcanaRef}</span>
                        </>
                      )}
                    </div>

                    <div
                      className={`max-w-[90%] sm:max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                        isClient
                          ? 'bg-[#D4AF37]/16 border border-[#D4AF37]/40 text-[#F4F1EA]'
                          : 'bg-[#12100E]/85 border border-[#D4AF37]/15 text-[#E8e1dd]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={threadEndRef} />
            </div>

            {/* Timed Pass Checkout Panel OR Active Composer Dock */}
            {showPassPanel || isExpired ? (
              <div className="border-t border-[#D4AF37]/25 p-5 md:p-6 bg-[#151311]/95 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37] inline-flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      {isExpired
                        ? 'Prova gratuita di 5 minuti conclusa'
                        : 'Acquista o estendi il tempo di dialogo'}
                    </p>
                    <h3 className="font-display text-lg text-[#F4F1EA]">
                      Scegli un Pass a Tempo per proseguire il Dialogo Tarot
                    </h3>
                  </div>
                  {!isExpired && (
                    <button
                      type="button"
                      onClick={() => setShowPassPanel(false)}
                      aria-label="Chiudi pannello tariffe dialogo"
                      className="w-8 h-8 rounded-lg border border-[#D4AF37]/25 flex items-center justify-center text-[#A39B93] hover:text-[#F4F1EA]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* 3 Timed Packs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {dialogueTimePacks.map((pack) => {
                    const selected = pack.id === selectedPackId;
                    return (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => setSelectedPackId(pack.id)}
                        aria-pressed={selected}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          selected
                            ? 'bg-[#D4AF37]/16 border-[#D4AF37]'
                            : 'bg-[#12100E]/80 border-[#D4AF37]/20 hover:border-[#D4AF37]/45'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#D4AF37] tabular-nums">
                            {pack.durationMinutes} min
                          </span>
                          <span className="font-display text-base text-[#F4F1EA] tabular-nums">
                            € {pack.priceEur}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#F4F1EA] mt-1">
                          {pack.title.split('·')[0].trim()}
                        </p>
                        <p className="text-[11px] text-[#A39B93] mt-0.5 line-clamp-2">
                          {pack.focusLabel}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleUnlockTimePack} className="space-y-3" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nome e Cognome *"
                      aria-label="Nome e Cognome"
                      className="min-h-[42px] px-3.5 py-2 rounded-lg input-inset text-xs md:text-sm"
                    />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Email *"
                      aria-label="Indirizzo email"
                      className="min-h-[42px] px-3.5 py-2 rounded-lg input-inset text-xs md:text-sm"
                    />
                  </div>

                  {unlockError && (
                    <p role="alert" className="text-xs text-[#ffb4ab]">
                      {unlockError}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      {!user && (
                        <button
                          type="button"
                          onClick={signInWithGoogle}
                          className="px-3.5 py-2 min-h-[40px] rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-medium text-[#E6C65C] whitespace-nowrap"
                        >
                          Accedi con Google
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={onBookConsult}
                        className="px-3.5 py-2 min-h-[40px] rounded-lg border border-[#A39B93]/25 hover:border-[#D4AF37] text-xs font-medium text-[#A39B93] hover:text-[#F4F1EA] whitespace-nowrap"
                      >
                        Prenota Chiamata Vocale
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={unlocking}
                      className="px-5 py-2.5 min-h-[42px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-xs md:text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      <Check className="w-4 h-4" />
                      {unlocking
                        ? 'Attivazione...'
                        : `Attiva ${selectedPack.durationMinutes} min (€ ${selectedPack.priceEur})`}
                    </button>
                  </div>
                </form>

                {handoffPayload && (
                  <p className="text-[11px] font-mono text-[#E6C65C] truncate">
                    Stripe Price Ready: {handoffPayload.priceId} (€ {handoffPayload.amountEur})
                  </p>
                )}
              </div>
            ) : (
              <div className="border-t border-[#D4AF37]/15 p-4 md:p-5 bg-[#151311]/70 space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                  {[
                    `Cosa prevede ${activeCard.name} per il mio futuro?`,
                    `Lettura amore con ${activeCard.name}`,
                    `Lettura lavoro e progetti`,
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void appendDialogue(prompt)}
                      className="px-3 py-1.5 rounded-lg bg-[#12100E]/90 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#A39B93] hover:text-[#F4F1EA] whitespace-nowrap shrink-0 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
                  <label htmlFor="chat-composer" className="sr-only">
                    Fai una domanda all&apos;Arcano selezionato
                  </label>
                  <input
                    id="chat-composer"
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Chiedi a ${activeCard.name} su futuro, amore o lavoro...`}
                    className="flex-1 min-h-[44px] px-4 py-2.5 rounded-lg input-inset text-sm"
                  />
                  <button
                    type="submit"
                    aria-label="Invia messaggio nel dialogo"
                    className="min-h-[44px] px-4 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] text-[#12100E] text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Invia</span>
                  </button>
                </form>

                <p className="text-[11px] text-[#A39B93]">
                  <CopyText entry={siteContent.chat.whatsappBridgeNote} showKeys={showCmsKeys} />
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
