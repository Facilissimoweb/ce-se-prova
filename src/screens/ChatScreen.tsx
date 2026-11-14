import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react';
import type { ChatMessage } from '../types/handoff';
import {
  arcanoDelGiorno,
  initialChatMessages,
  siteContent,
} from '../data/siteContent';
import { CopyText } from '../components/CopyText';
import { ResilientImage } from '../components/ResilientImage';
import {
  HermitArcanaIllustration,
  TarotEmblemLogo,
} from '../components/TarotEmblem';
import hermitCardImg from '../assets/images/arcano_eremita_gold_1794651607019.jpg';

interface ChatScreenProps {
  showCmsKeys: boolean;
  onBookConsult: () => void;
}

const GUIDED_RESPONSES: string[] = [
  "Grazie per aver condiviso questo passaggio. Nella luce raccolta dell'Eremita (IX), prova a distinguere ciò che senti come urgenza esterna da ciò che chiede invece maturazione silenziosa.",
  "Osserva la tua domanda senza forzare una risposta immediata: quale piccolo passo concreto rispetta oggi il tuo ritmo autentico?",
  "Questo tema merita uno spazio dedicato e protetto. Se desideri esplorarlo in profondità attraverso una stesa evolutiva, puoi prenotare una sessione o scrivere su WhatsApp.",
];

export function ChatScreen({ showCmsKeys, onBookConsult }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [cardTab, setCardTab] = useState<'arcano' | 'domande'>('arcano');
  const [responseIndex, setResponseIndex] = useState(0);
  const threadEndRef = useRef<HTMLDivElement | null>(null);

  const appendDialogue = (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    const now = new Date();
    const timeLabel = now.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'client',
      authorName: 'Tu',
      timestamp: timeLabel,
      text: trimmed,
    };

    const replyText =
      GUIDED_RESPONSES[responseIndex % GUIDED_RESPONSES.length];
    setResponseIndex((prev) => prev + 1);

    const practitionerMsg: ChatMessage = {
      id: `prac-${Date.now() + 1}`,
      sender: 'practitioner',
      authorName: 'Maria Teresa Rogani · Traccia Guidata',
      timestamp: timeLabel,
      text: replyText,
      arcanaRef: "L'Eremita · IX",
    };

    setMessages((prev) => [...prev, userMsg, practitionerMsg]);
    setInputText('');

    setTimeout(() => {
      threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appendDialogue(inputText);
  };

  const whatsappHref = `https://wa.me/390000000000?text=${encodeURIComponent(
    `Buongiorno Maria Teresa, ho riflettuto sull'Arcano del Giorno (L'Eremita IX) su Tarot Italia e vorrei proseguire il dialogo con te.`
  )}`;

  return (
    <div className="pt-6 md:pt-10 pb-8 space-y-6">
      {/* Standardized Widget Modal Header */}
      <div className="glass-tier-1 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <TarotEmblemLogo size={36} className="shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                <CopyText entry={siteContent.brand.name} showKeys={showCmsKeys} />
              </p>
              <h1 className="font-display text-xl md:text-2xl text-[#F4F1EA]">
                <CopyText entry={siteContent.chat.title} showKeys={showCmsKeys} />
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/35 hover:border-[#D4AF37] text-xs md:text-sm font-semibold text-[#F4F1EA] inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              Bridge WhatsApp
              <ExternalLink className="w-3.5 h-3.5 text-[#A39B93]" />
            </a>
          </div>
        </div>
        <div className="gold-divider" aria-hidden="true" />

        {/* Two-column Workspace: Interactive Arcano del Giorno + Guided Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Interactive Arcano del Giorno: L'Eremita IX */}
          <section
            aria-label="Arcano del Giorno L'Eremita IX"
            className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/15 flex flex-col gap-5 bg-[#151311]/55"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                  Arcano del Giorno
                </p>
                <h2 className="font-display text-xl text-[#F4F1EA]">
                  {arcanoDelGiorno.name} · {arcanoDelGiorno.numeral}
                </h2>
              </div>

              {/* Segmented view toggle */}
              <div className="flex items-center p-1 rounded-lg bg-[#12100E] border border-[#D4AF37]/20">
                <button
                  type="button"
                  onClick={() => setCardTab('arcano')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    cardTab === 'arcano'
                      ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                      : 'text-[#A39B93] hover:text-[#F4F1EA]'
                  }`}
                >
                  Carta
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

            {cardTab === 'arcano' ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-5">
                  <div className="w-36 shrink-0 rounded-xl overflow-hidden border border-[#D4AF37]/30">
                    <ResilientImage
                      src={hermitCardImg}
                      alt="Carta L'Eremita IX incisa in oro"
                      className="w-full aspect-[3/4] object-cover"
                      fallbackNode={<HermitArcanaIllustration className="w-full h-auto" />}
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs text-[#D4AF37] font-medium">
                      {arcanoDelGiorno.archetype}
                    </p>
                    <p className="text-sm leading-relaxed text-[#E8e1dd]">
                      {arcanoDelGiorno.synthesis}
                    </p>
                    <p className="text-xs text-[#A39B93]">
                      {arcanoDelGiorno.keywords.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#A39B93]">
                  Seleziona una domanda maieutica per portarla subito nel dialogo:
                </p>
                {arcanoDelGiorno.maieuticQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => appendDialogue(question)}
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
                Desideri una lettura individuale?
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

          {/* Guided Conversation Panel */}
          <section
            aria-label="Pannello conversazione guidata"
            className="lg:col-span-7 flex flex-col min-h-[460px] lg:h-[580px]"
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
                      className={`max-w-[88%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
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

            {/* Quick Prompt Strip + Composer Input Dock */}
            <div className="border-t border-[#D4AF37]/15 p-4 md:p-5 bg-[#151311]/70 space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                {arcanoDelGiorno.maieuticQuestions.slice(0, 2).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => appendDialogue(q)}
                    className="px-3 py-1.5 rounded-lg bg-[#12100E]/90 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-xs text-[#A39B93] hover:text-[#F4F1EA] whitespace-nowrap shrink-0 transition-colors"
                  >
                    {q.length > 44 ? `${q.slice(0, 44)}…` : q}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
                <label htmlFor="chat-composer" className="sr-only">
                  Scrivi una riflessione o domanda
                </label>
                <input
                  id="chat-composer"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Scrivi un pensiero o una domanda simbolica..."
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
          </section>
        </div>
      </div>
    </div>
  );
}
