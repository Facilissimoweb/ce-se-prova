import type {
  ArcanaCard,
  ChatMessage,
  ClientTestimonial,
  ConsultationTariff,
  HolisticFaqItem,
  HolisticPathway,
  SupabaseAuthContract,
  WhatsAppWebhookContract,
} from '../types/handoff';

/**
 * Tarot Italia — Dizionario CMS & Copy Handoff
 * Ogni campo espone la propria chiave simbolica [COPY: ...] per sostituzione immediata
 * nel CMS (Supabase / Sanity / Markdown) o nel repository GitHub (Cursor / Vercel).
 */
export const siteContent = {
  brand: {
    name: {
      cmsKey: '[COPY: siteContent.brand.name]',
      liveText: 'Tarot Italia',
    },
    practitioner: {
      cmsKey: '[COPY: siteContent.brand.practitioner]',
      liveText: 'Maria Teresa Rogani',
    },
    role: {
      cmsKey: '[COPY: siteContent.brand.role]',
      liveText: 'Operatore Olistico · Lettura Simbolica ed Evolutiva',
    },
  },
  home: {
    kicker: {
      cmsKey: '[COPY: siteContent.home.kicker]',
      liveText: 'Maria Teresa Rogani · Operatore Olistico',
    },
    hero: {
      cmsKey: '[COPY: siteContent.home.hero]',
      liveText: 'Uno spazio di ascolto simbolico per orientare il presente e leggere il futuro.',
    },
    heroSubtitle: {
      cmsKey: '[COPY: siteContent.home.heroSubtitle]',
      liveText:
        'Attraverso il linguaggio archetipico dei Tarocchi accompagno la persona in un dialogo riservato e lucido per comprendere il presente e intravedere le linee evolutive del futuro.',
    },
    ethicsBannerTitle: {
      cmsKey: '[COPY: siteContent.ethics.title]',
      liveText: 'Codice Deontologico · Lettura del Presente e del Futuro',
    },
    ethicsBannerBody: {
      cmsKey: '[COPY: siteContent.ethics.body]',
      liveText:
        'La consulenza olistica unisce l’ascolto del presente alla lettura previsionale delle possibili evoluzioni future, nel pieno rispetto del libero arbitrio. Non sostituisce pareri medici, psicologici o legali.',
    },
    pathwaysHeading: {
      cmsKey: '[COPY: siteContent.home.pathwaysHeading]',
      liveText: 'Percorsi di Consulenza Olistica',
    },
    pathwaysIntro: {
      cmsKey: '[COPY: siteContent.home.pathwaysIntro]',
      liveText:
        'Ogni incontro è costruito su misura intorno alla domanda reale che porti con te, senza formule preconfezionate.',
    },
    dockHeading: {
      cmsKey: '[COPY: siteContent.home.dockHeading]',
      liveText: 'Contatto Diretto e Studio',
    },
    faqHeading: {
      cmsKey: '[COPY: siteContent.home.faqHeading]',
      liveText: 'Domande Frequenti su Approccio ed Etica',
    },
    faqIntro: {
      cmsKey: '[COPY: siteContent.home.faqIntro]',
      liveText:
        'Chiarimenti essenziali sul metodo olistico, sui confini deontologici e sullo svolgimento delle sessioni.',
    },
    testimonialsHeading: {
      cmsKey: '[COPY: siteContent.home.testimonialsHeading]',
      liveText: 'Testimonianze',
    },
    testimonialsIntro: {
      cmsKey: '[COPY: siteContent.home.testimonialsIntro]',
      liveText:
        'Voci di chi ha scelto un confronto simbolico lucido e rispettoso per orientare un passaggio personale o professionale.',
    },
  },
  consulti: {
    heading: {
      cmsKey: '[COPY: siteContent.consulti.heading]',
      liveText: 'Scelta del Consulto e Tariffe',
    },
    subheading: {
      cmsKey: '[COPY: siteContent.consulti.subheading]',
      liveText:
        'Tre durate calibrate per profondità differenti, tutte in videochiamata riservata o in presenza su appuntamento.',
    },
    ethicsCallout: {
      cmsKey: '[COPY: siteContent.consulti.ethicsCallout]',
      liveText:
        'Impegno etico: ogni consulto offre una lettura chiara del presente e delle tendenze future nel rispetto del libero arbitrio. Nessuna promessa miracolistica o sostituzione di pareri medici e legali.',
    },
  },
  booking: {
    heading: {
      cmsKey: '[COPY: siteContent.booking.heading]',
      liveText: 'Prenotazione Sessione',
    },
    subheading: {
      cmsKey: '[COPY: siteContent.booking.subheading]',
      liveText:
        'Seleziona il formato, scegli giorno e orario dal calendario e prepara i tuoi riferimenti per il checkout protetto.',
    },
    stripeHandoffNote: {
      cmsKey: '[COPY: siteContent.booking.stripeNote]',
      liveText:
        'Handoff Stripe Checkout: al conferma finale l’app genera il payload verso /api/checkout/session autenticato via Supabase Auth.',
    },
  },
  chat: {
    title: {
      cmsKey: '[COPY: siteContent.chat.title]',
      liveText: 'Dialogo Tarot',
    },
    subtitle: {
      cmsKey: '[COPY: siteContent.chat.subtitle]',
      liveText: 'Spazio di riflessione guidata · Bridge WhatsApp',
    },
    whatsappBridgeNote: {
      cmsKey: '[COPY: siteContent.chat.whatsappNote]',
      liveText:
        'Bridge WhatsApp: puoi proseguire questa riflessione direttamente sul canale WhatsApp dedicato di Maria Teresa Rogani.',
    },
  },
  privacy: {
    bannerTitle: {
      cmsKey: '[COPY: siteContent.privacy.bannerTitle]',
      liveText: 'Riservatezza e Cookie',
    },
    bannerBody: {
      cmsKey: '[COPY: siteContent.privacy.bannerBody]',
      liveText:
        'Utilizziamo cookie tecnici indispensabili per il funzionamento del sito e, solo previo consenso, preferenze funzionali e statistiche anonime.',
    },
    modalTitle: {
      cmsKey: '[COPY: siteContent.privacy.modalTitle]',
      liveText: 'Preferenze Privacy e Cookie',
    },
    modalIntro: {
      cmsKey: '[COPY: siteContent.privacy.modalIntro]',
      liveText:
        'Gestisci in trasparenza il tuo consenso per i cookie non essenziali. Puoi modificare la scelta in qualsiasi momento dal footer o dalla barra laterale.',
    },
    gdprSummary: {
      cmsKey: '[COPY: siteContent.privacy.gdprSummary]',
      liveText:
        'Titolare del trattamento: Maria Teresa Rogani (studio@tarotitalia.it). I dati di contatto e prenotazione vengono trattati esclusivamente per erogare il consulto e gestire gli adempimenti Stripe Checkout, senza cessione a terzi per finalità commerciali.',
    },
  },
} as const;

export const holisticPathways: HolisticPathway[] = [
  {
    index: '01',
    cmsKeyTitle: '[COPY: percorso.placeholder.1.title]',
    title: 'Lettura Evolutiva del Presente',
    cmsKeyDesc: '[COPY: percorso.placeholder.1.desc]',
    description:
      'Mappatura simbolica delle dinamiche attuali per sciogliere nodi decisionali e ritrovare centratura.',
    modality: 'Sessione individuale · 45 / 60 min',
  },
  {
    index: '02',
    cmsKeyTitle: '[COPY: percorso.placeholder.2.title]',
    title: 'Dialogo Archetipico sulle Scelte',
    cmsKeyDesc: '[COPY: percorso.placeholder.2.desc]',
    description:
      'Confronto maieutico su passaggi professionali o relazionali complessi attraverso gli Arcani Maggiori.',
    modality: 'Video o studio · 60 min',
  },
  {
    index: '03',
    cmsKeyTitle: '[COPY: percorso.placeholder.3.title]',
    title: 'Ciclo Annuale di Consapevolezza',
    cmsKeyDesc: '[COPY: percorso.placeholder.3.desc]',
    description:
      'Lettura estesa dei dodici ambiti simbolici per orientare progetti, risorse e priorità nel nuovo ciclo.',
    modality: 'Approfondimento · 90 min',
  },
  {
    index: '04',
    cmsKeyTitle: '[COPY: percorso.placeholder.4.title]',
    title: 'Contemplazione dell’Arcano',
    cmsKeyDesc: '[COPY: percorso.placeholder.4.desc]',
    description:
      'Spazio breve di ascolto guidato e scrittura riflessiva a partire da una singola carta estratta.',
    modality: 'Dialogo guidato · Online',
  },
];

export const holisticFaqs: HolisticFaqItem[] = [
  {
    id: 'faq-1',
    category: 'Approccio Olistico',
    cmsKeyQuestion: '[COPY: faq.placeholder.1.question]',
    question: 'In che modo i Tarocchi di Tarot Italia leggono il presente e prevedono il futuro?',
    cmsKeyAnswer: '[COPY: faq.placeholder.1.answer]',
    answer:
      'Nel metodo di Tarot Italia gli Arcani illuminano le dinamiche attuali e tracciano le linee previsionali degli sviluppi futuri. La lettura previsionale individua scenari, opportunità e snodi in arrivo rispettando sempre il tuo libero arbitrio, così da permetterti scelte lucide e consapevoli.',
  },
  {
    id: 'faq-2',
    category: 'Ruolo Professionale',
    cmsKeyQuestion: '[COPY: faq.placeholder.2.question]',
    question: 'Qual è l’ambito di un Operatore Olistico ai sensi della Legge 4/2013?',
    cmsKeyAnswer: '[COPY: faq.placeholder.2.answer]',
    answer:
      'Maria Teresa Rogani opera come Operatore Olistico disciplinato ai sensi della Legge 4/2013 sulle professioni non organizzate. La consulenza offre ascolto empatico, lettura simbolica e previsionale e stimoli di consapevolezza interiore, senza mai sostituirsi a medici, psicoterapeuti, psichiatri o consulenti legali.',
  },
  {
    id: 'faq-3',
    category: 'Codice Deontologico',
    cmsKeyQuestion: '[COPY: faq.placeholder.3.question]',
    question: 'Quali richieste sono escluse per etica professionale?',
    cmsKeyAnswer: '[COPY: faq.placeholder.3.answer]',
    answer:
      'Non vengono formulate diagnosi o indicazioni sanitarie, pronostici su patologie o decessi, né consulenze legali o finanziarie vincolanti. Sono inoltre categoricamente esclusi rituali magici, legamenti o promesse di risultati garantiti.',
  },
  {
    id: 'faq-4',
    category: 'Svolgimento Sessione',
    cmsKeyQuestion: '[COPY: faq.placeholder.4.question]',
    question: 'Come prepararsi a un consulto da 45, 60 o 90 minuti?',
    cmsKeyAnswer: '[COPY: faq.placeholder.4.answer]',
    answer:
      'È sufficiente portare una o più domande chiare sul tuo percorso presente o sugli sviluppi futuri — in ambito professionale, creativo o relazionale. Dopo la prenotazione riceverai il link riservato per la videochiamata o l’indirizzo dello studio.',
  },
  {
    id: 'faq-5',
    category: 'Riservatezza',
    cmsKeyQuestion: '[COPY: faq.placeholder.5.question]',
    question: 'I temi condivisi durante l’incontro restano confidenziali?',
    cmsKeyAnswer: '[COPY: faq.placeholder.5.answer]',
    answer:
      'Sì. Ogni dialogo si svolge nel rispetto della massima riservatezza professionale: le sessioni non vengono registrate né condivise con terzi e i dati di prenotazione sono trattati esclusivamente per gestire l’appuntamento.',
  },
];

export const clientTestimonials: ClientTestimonial[] = [
  {
    id: 'test-1',
    cmsKeyQuote: '[COPY: testimonianza.placeholder.1.quote]',
    quote:
      'Ero davanti a un cambio di studio professionale e cercavo chiarezza sui mesi successivi. Il consulto con Maria Teresa ha unito una lettura lucida del presente a indicazioni previsionali concrete che hanno rimesso ordine nelle mie priorità.',
    authorName: 'Chiara Bellini',
    authorRole: 'Architetto · Milano',
    sessionContext: 'Consulto Evolutivo · 60 min',
  },
  {
    id: 'test-2',
    cmsKeyQuote: '[COPY: testimonianza.placeholder.2.quote]',
    quote:
      'Ciò che distingue Tarot Italia è la sobrietà etica: nessuna formula teatrale, solo un ascolto attento in cui gli Arcani diventano uno specchio concreto per leggere il presente con lucidità.',
    authorName: 'Lorenzo Ferretti',
    authorRole: 'Consulente Editoriale · Roma',
    sessionContext: 'Sessione Integrata · 90 min',
  },
  {
    id: 'test-3',
    cmsKeyQuote: '[COPY: testimonianza.placeholder.3.quote]',
    quote:
      'In un momento di transizione familiare avevo bisogno di fermarmi senza giudizio. I quarantacinque minuti insieme mi hanno lasciato chiarezza e una sintesi scritta preziosa su cui lavorare.',
    authorName: 'Giulia Marchetti',
    authorRole: 'Docente · Bologna',
    sessionContext: 'Consulto Essenziale · 45 min',
  },
];

export const consultationTariffs: ConsultationTariff[] = [
  {
    id: '45m',
    durationMinutes: 45,
    priceEur: 60,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_45M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.1.title]',
    title: 'Consulto Essenziale',
    cmsKeyDesc: '[COPY: tariffa.placeholder.1.desc]',
    description:
      'Un incontro mirato per mettere a fuoco una singola questione attuale con chiarezza simbolica ed equilibrio.',
    cmsKeyFocus: '[COPY: tariffa.placeholder.1.focus]',
    focusLabel: 'Domanda singola · Chiarezza immediata',
    includes: [
      '45 minuti di dialogo individuale online',
      'Stesa simbolica focalizzata su un tema specifico',
      'Sintesi scritta dei punti emersi via email o WhatsApp',
    ],
  },
  {
    id: '60m',
    durationMinutes: 60,
    priceEur: 85,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_60M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.2.title]',
    title: 'Consulto Evolutivo Completo',
    cmsKeyDesc: '[COPY: tariffa.placeholder.2.desc]',
    description:
      'Il percorso consigliato per esplorare radici, risorse interiori e possibili direzioni di trasformazione consapevole.',
    cmsKeyFocus: '[COPY: tariffa.placeholder.2.focus]',
    focusLabel: 'Consigliato · Analisi approfondita',
    includes: [
      '60 minuti di sessione individuale in video o in studio',
      'Esplorazione combinata di Arcani Maggiori e Minori',
      'Mappa delle domande maieutiche per le settimane successive',
    ],
    recommended: true,
  },
  {
    id: '90m',
    durationMinutes: 90,
    priceEur: 120,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_90M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.3.title]',
    title: 'Sessione Integrata & Ciclo',
    cmsKeyDesc: '[COPY: tariffa.placeholder.3.desc]',
    description:
      'Incontro esteso dedicato a momenti di svolta, bilanci di ciclo annuale o lavoro articolato su più ambiti di vita.',
    cmsKeyFocus: '[COPY: tariffa.placeholder.3.focus]',
    focusLabel: 'Ciclo annuale · Massima profondità',
    includes: [
      '90 minuti di dialogo olistico senza fretta',
      'Stesa completa a dodici case simboliche o doppio confronto',
      'Follow-up scritto entro 48 ore tramite canale riservato',
    ],
  },
];

import { MAJOR_ARCANA } from './majorArcana';

export const arcanoDelGiorno: ArcanaCard = MAJOR_ARCANA[9];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'practitioner',
    authorName: 'Maria Teresa Rogani',
    timestamp: '09:30',
    text: 'Benvenuto nello spazio di dialogo di Tarot Italia. Qui puoi estrarre o scegliere qualsiasi dei 22 Arcani Maggiori per leggere il presente, esplorare le tendenze future e riflettere con consapevolezza.',
  },
  {
    id: 'msg-2',
    sender: 'practitioner',
    authorName: 'Maria Teresa Rogani',
    timestamp: '09:31',
    text: "Partiamo dall'Arcano del Giorno — L'Eremita (IX) — oppure clicca su «Estrai Arcano» o «Stesa 3 Carte» per interrogare tutto il mazzo.",
    arcanaRef: "L'Eremita · IX",
  },
];

export const bookingTimeSlots = ['09:30', '11:00', '14:30', '16:00', '18:00', '19:30'];

export const handoffArchitectureSpec: {
  supabase: SupabaseAuthContract;
  whatsapp: WhatsAppWebhookContract;
  stripeEnvVars: string[];
} = {
  supabase: {
    provider: 'supabase_auth',
    strategy: 'magic_link_or_otp',
    tables: ['profiles', 'bookings', 'consultation_notes'],
    rlsPolicyNote:
      'Row Level Security abilitata su profiles e bookings (auth.uid() = user_id); accesso operatore tramite ruolo verificato.',
  },
  whatsapp: {
    provider: 'whatsapp_cloud_api',
    direction: 'outbound_bridge_and_inbound_webhook',
    webhookEndpoint: '/api/webhooks/whatsapp',
    deepLinkTemplate:
      'https://wa.me/390000000000?text=Buongiorno%20Maria%20Teresa%2C%20vorrei%20informazioni%20per%20un%20consulto%20Tarot%20Italia.',
  },
  stripeEnvVars: [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'WHATSAPP_VERIFY_TOKEN',
    'WHATSAPP_ACCESS_TOKEN',
  ],
};
