import type {
  ArcanaCard,
  ChatMessage,
  ClientTestimonial,
  ConsultationTariff,
  DialoguePack,
  DisciplinaryCredential,
  EducationalCourse,
  HolisticFaqItem,
  HolisticPathway,
  FirebaseAuthContract,
  WhatsAppWebhookContract,
} from '../types/handoff';

/**
 * Tarot Italia — Dizionario CMS & Copy Handoff
 * Ogni campo espone la propria chiave simbolica [COPY: ...] per sostituzione immediata
 * nel CMS (Sanity / Markdown) o nel repository GitHub. Auth runtime: Firebase; dati: Postgres/Drizzle.
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
      liveText: 'Recensioni Google',
    },
    testimonialsIntro: {
      cmsKey: '[COPY: siteContent.home.testimonialsIntro]',
      liveText:
        'Le stesse recensioni pubblicate su Google da chi ha consultato Tarot Italia.',
    },
    coursesHeading: {
      cmsKey: '[COPY: siteContent.home.coursesHeading]',
      liveText: 'Percorsi Didattici · Accademia Tarot Italia',
    },
    coursesIntro: {
      cmsKey: '[COPY: siteContent.home.coursesIntro]',
      liveText:
        'Tre moduli formativi a pagamento per apprendere la lettura simbolica e previsionale dei Tarocchi con metodo rigoroso ed etico.',
    },
  },
  chiSono: {
    kicker: {
      cmsKey: '[COPY: siteContent.chiSono.kicker]',
      liveText: 'Maria Teresa Rogani · Chi Sono',
    },
    heading: {
      cmsKey: '[COPY: siteContent.chiSono.heading]',
      liveText: 'Il mio percorso',
    },
    researchHeading: {
      cmsKey: '[COPY: siteContent.chiSono.researchHeading]',
      liveText: 'Formazione e ricerca',
    },
    researchP1: {
      cmsKey: '[COPY: siteContent.chiSono.researchP1]',
      liveText:
        'La mia formazione accademica e umanistica informa il modo in cui osservo e interpreto le carte.',
    },
    researchP2: {
      cmsKey: '[COPY: siteContent.chiSono.researchP2]',
      liveText:
        'Diplomata come Grafica e laureata in Tecniche della Comunicazione Visiva all’Accademia di Belle Arti, ho approfondito la scultura contemporanea e la filosofia classica.',
    },
    researchP3: {
      cmsKey: '[COPY: siteContent.chiSono.researchP3]',
      liveText:
        'Questa formazione guida il mio sguardo su composizione, colore e simboli, che considero nel loro contesto storico, iconografico e simbolico.',
    },
    disciplinaryKicker: {
      cmsKey: '[COPY: siteContent.chiSono.disciplinaryKicker]',
      liveText: 'Percorso Disciplinare Integrato',
    },
    disciplinaryHeading: {
      cmsKey: '[COPY: siteContent.chiSono.disciplinaryHeading]',
      liveText: 'Percorso disciplinare',
    },
    disciplinaryIntro: {
      cmsKey: '[COPY: siteContent.chiSono.disciplinaryIntro]',
      liveText:
        'Un intreccio coerente tra tarologia esoterica, tradizione iconografica Rider Waite Smith e pratiche olistiche di ascolto e consapevolezza.',
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
        'Quattro durate calibrate per profondità differenti. In ogni sessione leggo Arcani Maggiori e Minori: online in chiamata vocale riservata, oppure di persona a Macerata (Via Crispi 37) su appuntamento — il Consulto Breve è solo online.',
    },
    welcomeKicker: {
      cmsKey: '[COPY: siteContent.consulti.welcomeKicker]',
      liveText: 'Benvenuto e Accoglimento · Dal Caos al Cosmos',
    },
    welcomeHeading: {
      cmsKey: '[COPY: siteContent.consulti.welcomeHeading]',
      liveText: 'Ti accolgo esattamente dove ti trovi, senza giudizio né risposte meccaniche.',
    },
    welcomeBody1: {
      cmsKey: '[COPY: siteContent.consulti.welcomeBody1]',
      liveText:
        'Che tu arrivi con una domanda immediata e sincera — anche semplice o legata agli affetti, come «Mi pensa?» — o con il bisogno di fare chiarezza su un passaggio complesso, i miei consulti nascono per trasformare il caos in cosmos. Integro la lettura viva della cartomanzia pura con la tarologia evolutiva attraverso tutti i 78 Arcani, Maggiori e Minori.',
    },
    welcomeBody2: {
      cmsKey: '[COPY: siteContent.consulti.welcomeBody2]',
      liveText:
        'Non è richiesta alcuna conoscenza preliminare delle carte: ti guido passo dopo passo tra archetipi, motivazioni e chiavi di lettura pratiche perché tu possa uscire con una visione rinnovata e riprendere in mano le redini del tuo percorso. I consulti online si svolgono esclusivamente in modalità chiamata vocale, per favorire ascolto profondo e concentrazione.',
    },
    faqHeading: {
      cmsKey: '[COPY: siteContent.consulti.faqHeading]',
      liveText: 'Domande sul Metodo e sullo Svolgimento del Consulto',
    },
    ethicsCallout: {
      cmsKey: '[COPY: siteContent.consulti.ethicsCallout]',
      liveText:
        'Impegno etico: ogni consulto offre una lettura chiara del presente e delle tendenze future nel rispetto del libero arbitrio. Nessuna promessa miracolistica o sostituzione di pareri medici e legali.',
    },
  },
  corsi: {
    kicker: {
      cmsKey: '[COPY: siteContent.corsi.kicker]',
      liveText: 'Formazione Olistica & Tarologia · 3 Percorsi a Pagamento',
    },
    heading: {
      cmsKey: '[COPY: siteContent.corsi.heading]',
      liveText: 'Percorsi Didattici Tarot Italia',
    },
    subheading: {
      cmsKey: '[COPY: siteContent.corsi.subheading]',
      liveText:
        'Un itinerario progressivo in tre moduli autonomi e acquistabili singolarmente per padroneggiare gli Arcani Maggiori, gli Arcani Minori e i Metodi di Stesura previsionali ed evolutivi.',
    },
    soonBadge: {
      cmsKey: '[COPY: siteContent.corsi.soonBadge]',
      liveText: 'Didattica in arrivo',
    },
    soonHoverTitle: {
      cmsKey: '[COPY: siteContent.corsi.soonHoverTitle]',
      liveText: 'Contenuti a breve',
    },
    soonHoverBody: {
      cmsKey: '[COPY: siteContent.corsi.soonHoverBody]',
      liveText:
        'I materiali didattici di questo percorso saranno distribuiti a breve. Restate in ascolto: la formazione Tarot Italia è in preparazione con cura.',
    },
    checkoutNote: {
      cmsKey: '[COPY: siteContent.corsi.checkoutNote]',
      liveText:
        'Accesso all’area riservata solo dopo pagamento Stripe verificato (Checkout Session paid / webhook) e iscrizione su Postgres, protetta da Firebase Auth.',
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
        'Scegli durata, giorno e orario: in ogni sessione Maria Teresa legge Arcani Maggiori e Minori. Paga online con Stripe Checkout; il consulto si svolge su WhatsApp. Il Consulto Breve è solo online.',
    },
    stripeHandoffNote: {
      cmsKey: '[COPY: siteContent.booking.stripeNote]',
      liveText:
        'Pagamento sicuro con Stripe Checkout. Dopo il pagamento ricevi la conferma via email; Maria Teresa riceve un avviso dello slot. Il consulto si svolge su WhatsApp.',
    },
    /** ENN-166 — soft IT note (booking on site · consult on WhatsApp). */
    waConsultNoteIt: {
      cmsKey: '[COPY: siteContent.booking.waConsultNoteIt]',
      liveText:
        'Prenotazione e pagamento sul sito; il consulto si svolge su WhatsApp. Se usi la traduzione automatica, è consigliata la chat scritta (puoi usare la traduzione integrata di WhatsApp).',
    },
    /** ENN-166 — prominent when googtrans ≠ it: written WhatsApp only. */
    waConsultNoticeNonIt: {
      cmsKey: '[COPY: siteContent.booking.waConsultNoticeNonIt]',
      liveText:
        'Con una lingua diversa dall’italiano, il consulto avviene esclusivamente via chat scritta su WhatsApp. Puoi usare la traduzione integrata di WhatsApp durante la conversazione.',
    },
  },
  chat: {
    title: {
      cmsKey: '[COPY: siteContent.chat.title]',
      liveText: 'Dialogo Tarot',
    },
    subtitle: {
      cmsKey: '[COPY: siteContent.chat.subtitle]',
      liveText: 'Spazio di riflessione guidata · 5 minuti gratuiti e pass a tempo',
    },
    whatsappBridgeNote: {
      cmsKey: '[COPY: siteContent.chat.whatsappNote]',
      liveText:
        'Bridge WhatsApp: se dopo il dialogo con Tarot Italia IA desideri una chiamata vocale personale con Maria Teresa Rogani, prosegui su WhatsApp.',
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
        'Utilizziamo cookie tecnici indispensabili per il funzionamento del sito e, solo previo consenso, preferenze funzionali, statistiche anonime e script di terze parti (es. Google Traduttore).',
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
        'Titolare del trattamento: Maria Teresa Rogani — Tarot Italia (P.IVA 02136780430; info@tarotitalia.com). I dati di contatto e prenotazione vengono trattati esclusivamente per erogare il consulto e gestire gli adempimenti Stripe Checkout / Firebase Auth, senza cessione a terzi per finalità commerciali. Informativa completa: /privacy e /privacy.html.',
    },
  },
} as const;

export const disciplinaryCredentials: DisciplinaryCredential[] = [
  {
    index: '01',
    area: 'tarologia',
    areaLabel: 'Tarologia & Iconografia',
    cmsKeyTitle: '[COPY: disciplina.placeholder.1.title]',
    title: 'Tarocchi Rider Waite Smith',
    cmsKeyDetails: '[COPY: disciplina.placeholder.1.details]',
    details: 'Mariangela Aggio · Percorso formativo completo dedicato alla simbologia e lettura Rider Waite Smith.',
    periodOrCert: 'Percorso 2025',
  },
  {
    index: '02',
    area: 'tarologia',
    areaLabel: 'Tarocco Esoterico',
    cmsKeyTitle: '[COPY: disciplina.placeholder.2.title]',
    title: 'Accademia Nazionale del Tarocco Esoterico',
    cmsKeyDetails: '[COPY: disciplina.placeholder.2.details]',
    details: 'La società dello Zolfo, Dorian Bones · Studio annuale dei fondamenti esoterici, alchemici e iniziatici del Tarocco.',
    periodOrCert: 'Annuale 2023/2024',
  },
  {
    index: '03',
    area: 'olistico',
    areaLabel: 'Disciplina Energetica',
    cmsKeyTitle: '[COPY: disciplina.placeholder.3.title]',
    title: 'Operatore Reiki II Livello',
    cmsKeyDetails: '[COPY: disciplina.placeholder.3.details]',
    details: 'Lignaggio Mikao Usui®, M. F. Tartuferi · Pratica di armonizzazione energetica accreditata IPHM.',
    periodOrCert: 'IPHM dal 2009',
  },
  {
    index: '04',
    area: 'olistico',
    areaLabel: 'Consapevolezza',
    cmsKeyTitle: '[COPY: disciplina.placeholder.4.title]',
    title: 'Facilitatore Mindfulness',
    cmsKeyDetails: '[COPY: disciplina.placeholder.4.details]',
    details: 'Mindfulness Educators® · Accompagnamento alla presenza mentale, respiro e ascolto non giudicante.',
    periodOrCert: 'IPHM',
  },
  {
    index: '05',
    area: 'olistico',
    areaLabel: 'Naturopatia',
    cmsKeyTitle: '[COPY: disciplina.placeholder.5.title]',
    title: 'Operatore Naturopata',
    cmsKeyDetails: '[COPY: disciplina.placeholder.5.details]',
    details: 'Future Academy® · Approccio olistico integrato al benessere naturale e all’equilibrio della persona.',
    periodOrCert: 'IPHM',
  },
  {
    index: '06',
    area: 'olistico',
    areaLabel: 'Radiestesia',
    cmsKeyTitle: '[COPY: disciplina.placeholder.6.title]',
    title: 'Radiestesia & Pendolo PTAH',
    cmsKeyDetails: '[COPY: disciplina.placeholder.6.details]',
    details: 'Emiliano Amici · Tecniche radiestesiche e impiego del pendolo PTAH per l’indagine sottile e l’equilibrio.',
    periodOrCert: 'Formazione Specialistica',
  },
];

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
    modality: 'Chiamata vocale o di persona a Macerata · 60 min',
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
    question: 'Come prepararsi a un consulto da 20, 45, 60 o 90 minuti?',
    cmsKeyAnswer: '[COPY: faq.placeholder.4.answer]',
    answer:
      'È sufficiente portare una o più domande chiare sul tuo percorso presente o sugli sviluppi futuri — in ambito professionale, creativo o relazionale. I consulti online avvengono esclusivamente in chiamata vocale riservata: dopo la prenotazione riceverai tutte le indicazioni per collegarti oppure l’indirizzo di Via Crispi 37 a Macerata per l’incontro di persona.',
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
    cmsKeyQuote: '[COPY: testimonianza.v2-google.1.quote]',
    quote:
      `Un'esperienza che ti cambia la prospettiva! ⭐⭐⭐⭐⭐ La lettura è stata di una precisione impressionante: ha colto aspetti della mia situazione che non avevo detto a nessuno. Non si tratta di "prevedere il futuro", ma di un vero e proprio percorso di consapevolezza. La cartomante, Teresa, è fantastica.. di un'empatia, una dolcezza e una professionalità rare. Mi ha trasmesso una serenità enorme e mi ha dato i consigli giusti per affrontare un momento di grande confusione. Il sito è intuitivo, serio e velocissimo. Consigliatissimo! Grazie di cuore ❤️`,
    authorName: "Caterina Ercoli",
    authorRole: "27 settembre 2026",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-2',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.2.quote]',
    quote:
      "Una professionista attenta e sempre disponibile, la consiglio a chi come me ha scoperto da poco il mondo dei tarocchi :)",
    authorName: "Anna Moriconi",
    authorRole: "30 agosto 2026",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-3',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.3.quote]',
    quote:
      `Teresa è una grandissima professionista del mestiere , gentile e disponibile.
La consultazione è stata molto interessante e precisa , Teresa nei suoi modi e con la sua voce suave fornisce interpretazioni dettagliate e capaci di guidarti al fin di far quadrare ciò che ti dà pensiero.
☺️`,
    authorName: "zoe di giacomo",
    authorRole: "10 agosto 2026",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-4',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.4.quote]',
    quote:
      "Ho fatto una consulenza con Teresa, mi sono trovata benissimo, lei sa leggere oltre, a livello molto più profondo, scende nel tuo sé interiore, ti aiuta a guardarti dentro e dare una lettura completa della tua vita, ti accompagna in un viaggio di introspezione molto emozionante. Tornerò sicuramente ❤️",
    authorName: "Maureen",
    authorRole: "14 luglio 2026",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-5',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.5.quote]',
    quote:
      "ragazza estremamente gentile e professionale. la lettura dei tarocchi durata un’ora, è stata approfondita e coinvolgente: ha descritto con sorprendente precisione ciò che stavo vivendo, facendomi sentire ascoltata e compresa. la consiglio vivamente ❤️",
    authorName: "Martina Rossetti",
    authorRole: "11 luglio 2026",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-6',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.6.quote]',
    quote:
      "Sei una persona speciale e bravissima unica tvtb",
    authorName: "Giuseppina Frassino",
    authorRole: "4 gennaio 2026",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-7',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.7.quote]',
    quote:
      "Bellissima esperienza, grazie!!!",
    authorName: "Maria Cristina Lombardo",
    authorRole: "3 gennaio 2026",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-8',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.8.quote]',
    quote:
      "Teresa è stata gentilissima nei miei confronti, pronta ad ascoltarmi e a darmi qualunque risposta io volessi. Mi ha fatta sentire molto a mio agio🥰",
    authorName: "Francesca D'Emma",
    authorRole: "30 settembre 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-9',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.9.quote]',
    quote:
      "Persona seria e competente, le ho dato 5 stelle perché consiglio vivamente un consulto con lei!",
    authorName: "Elisa Salutari",
    authorRole: "2 settembre 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-10',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.10.quote]',
    quote:
      `Teresa è una persona meravigliosa. Fin da subito mi sono sentita in sintonia con lei… È empatica, sa ascoltare e soprattutto non ti fa sentire giudicata. Dalle sue letture si percepisce gli anni di esperienza e sa sicuramente darti più strade e più visioni sulla propria situazione. Esperienza sicuramente da rifare 🥰
Teresa è indubbiamente la persona più affidabile anche per chi non ha mai conosciuto il mondo dei tarocchi e ci si vuole interfacciare 🫶🏻`,
    authorName: "Adela Vasile",
    authorRole: "30 agosto 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-11',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.11.quote]',
    quote:
      "Ho conosciuto Teresa ieri sera,abbiamo iniziato a chiacchierare di questioni sentimentali e lei mi ha proposto di interrogare le carte.. Molte cose che lei mi ha detto corrispondevano a quanto mi stesse accadendo e sono tornata a casa con il desiderio di verificare le altre..sicura tornerò da lei, mi è sembrata molto brava.",
    authorName: "Martina Canesin",
    authorRole: "27 agosto 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-12',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.12.quote]',
    quote:
      "Professionalità, umanità e personale tecnicamente ineccepibile.",
    authorName: "ELENA ANGELINI",
    authorRole: "23 agosto 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-13',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.13.quote]',
    quote:
      "Con lei mi sono sentita a mio agio: ascolta con attenzione e riesce a leggere i tarocchi con precisione e sensibilità. Le sue parole arrivano con delicatezza, senza giudicare. Un  consulto sincero, umano e illuminante in un momento incerto",
    authorName: "Fabbrica d'Ideali",
    authorRole: "22 agosto 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-14',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.14.quote]',
    quote:
      "Ho contattato oggi Teresa per caso e il caso ha voluto che ci incontrassimo proprio oggi! Siamo entrate subito in sintonia e lei è stata molto precisa sulla sua lettura utilizzando diversi metodi! Mi ha ascoltata attentamente e mi ha dato anche consigli su come affrontare le situazioni! Sicuramente da provare 🌸",
    authorName: "Ilaria",
    authorRole: "3 maggio 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-15',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.15.quote]',
    quote:
      `Professionista seria e preparata .
Molto consigliata.`,
    authorName: "Silvia Scagnetti",
    authorRole: "13 aprile 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-16',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.16.quote]',
    quote:
      `Seria ,profonda brava. Ti accompagna per mano nel viaggio della tua vita dei tuoi sentimenti e delle tue emozioni piu profonde.
Assolutamente la consiglio!!!!`,
    authorName: "cecilia massetani",
    authorRole: "10 aprile 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-17',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.17.quote]',
    quote:
      "Lettura molto esplicativa, ambiente ed energia accogliente e tranquillo. Esperienza da rifare assolutamente! ❤️✨",
    authorName: "Leonardo Sperandini",
    authorRole: "10 aprile 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-18',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.18.quote]',
    quote:
      "Teresa è stata eccezionale! La sua lettura delle carte è stata incredibilmente precisa e dettagliata, dandomi una visione chiara della mia situazione. Ho apprezzato molto la sua professionalità, empatia e capacità di ascolto.Non solo ha interpretato le carte, ma mi ha anche offerto consigli pratici e spunti di riflessione utili. La consiglio vivamente a chi cerca una cartomante seria e competente.",
    authorName: "Valentina Sodano",
    authorRole: "4 febbraio 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-19',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.19.quote]',
    quote:
      "Ottima cartomante sia per problemi sentimentali e lavorativi. Disponibile e simpatica. La consiglio vivamente! Grazie Teresa",
    authorName: "Laurie Capasso",
    authorRole: "1 febbraio 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
  {
    id: 'test-20',
    cmsKeyQuote: '[COPY: testimonianza.v2-google.20.quote]',
    quote:
      `Seria e professionale. Disponibile all'ascolto e vera. Consiglio!`,
    authorName: "Daniela Carcereri",
    authorRole: "1 febbraio 2025",
    sessionContext: 'Recensione Google · 5 stelle',
  },
];


export const consultationTariffs: ConsultationTariff[] = [
  {
    id: '20m',
    durationMinutes: 20,
    priceEur: 19,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_20M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.0.title]',
    title: 'Consulto Breve',
    cmsKeyDesc: '[COPY: tariffa.placeholder.0.desc]',
    description:
      'Venti minuti solo online per una domanda chiara e un orientamento rapido, con lettura di Arcani Maggiori e Minori.',
    cmsKeyFocus: '[COPY: tariffa.placeholder.0.focus]',
    focusLabel: 'Solo online · Domanda rapida',
    onlineOnly: true,
    includes: [
      '20 minuti di dialogo individuale solo online (chiamata vocale)',
      'Lettura con Arcani Maggiori e Minori su un tema puntuale',
      'Indicazioni pratiche via email o WhatsApp',
    ],
  },
  {
    id: '45m',
    durationMinutes: 45,
    priceEur: 50,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_45M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.1.title]',
    title: 'Consulto Essenziale',
    cmsKeyDesc: '[COPY: tariffa.placeholder.1.desc]',
    description:
      'Un incontro mirato per approfondire più domande sul presente, con chiarezza simbolica ed equilibrio.',
    cmsKeyFocus: '[COPY: tariffa.placeholder.1.focus]',
    focusLabel: 'Più domande · Chiarezza immediata',
    includes: [
      '45 minuti di dialogo individuale (online o di persona)',
      'Lettura con Arcani Maggiori e Minori su più domande',
      'Sintesi scritta dei punti emersi via email o WhatsApp',
    ],
  },
  {
    id: '60m',
    durationMinutes: 60,
    priceEur: 75,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_60M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.2.title]',
    title: 'Consulto Evolutivo Completo',
    cmsKeyDesc: '[COPY: tariffa.placeholder.2.desc]',
    description:
      'Il percorso consigliato per esplorare radici, risorse interiori e possibili direzioni di trasformazione consapevole.',
    cmsKeyFocus: '[COPY: tariffa.placeholder.2.focus]',
    focusLabel: 'Consigliato · Analisi approfondita',
    includes: [
      '60 minuti di sessione individuale in chiamata vocale o di persona a Macerata',
      'Lettura combinata di Arcani Maggiori e Minori',
      'Mappa delle domande maieutiche per le settimane successive',
    ],
    recommended: true,
  },
  {
    id: '90m',
    durationMinutes: 90,
    priceEur: 90,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_90M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.3.title]',
    title: 'Sessione Integrata',
    cmsKeyDesc: '[COPY: tariffa.placeholder.3.desc]',
    description:
      'Incontro esteso dedicato a momenti di svolta, bilanci di ciclo annuale o lavoro articolato su più ambiti di vita.',
    cmsKeyFocus: '[COPY: tariffa.placeholder.3.focus]',
    focusLabel: 'Ciclo annuale · Massima profondità',
    includes: [
      '90 minuti di dialogo olistico in chiamata vocale o di persona a Macerata',
      'Lettura completa con Arcani Maggiori e Minori (dodici case o doppio confronto)',
      'Follow-up scritto entro 48 ore tramite canale riservato',
    ],
  },
];

export const consultiFaqs: HolisticFaqItem[] = [
  {
    id: 'cfaq-1',
    category: 'Metodo Ibrido',
    cmsKeyQuestion: '[COPY: consulti.faq.1.question]',
    question: 'Che differenza c’è tra la cartomanzia tradizionale e il mio metodo?',
    cmsKeyAnswer: '[COPY: consulti.faq.1.answer]',
    answer:
      'La cartomanzia tradizionale cerca spesso risposte meccaniche e a tenuta stagna (sì, no, quando). Il mio approccio è un ibrido che integra sia la cartomanzia pura che la tarologia evolutiva: utilizzo i 78 Arcani (tra Maggiori e Minori) non per inchiodarti a un futuro immobile, ma per trasformare il caos in cosmos, dando alla stesa una piega molto più riflessiva e profonda rispetto all’immediatezza di una risposta statica.',
  },
  {
    id: 'cfaq-2',
    category: 'Domande e Affetti',
    cmsKeyQuestion: '[COPY: consulti.faq.2.question]',
    question: 'Ha senso fare una domanda semplice o legata agli affetti, come «Mi pensa?»',
    cmsKeyAnswer: '[COPY: consulti.faq.2.answer]',
    answer:
      'Assolutamente sì. Spesso si parte da un interrogativo immediato o impulsivo tipico della cartomanzia per scavare in profondità. Da una domanda sugli affetti inizio a tracciare dinamiche, motivazioni e chiavi di lettura per nulla banali, restituendo alla situazione una prospettiva riflessiva e la sua reale complessità.',
  },
  {
    id: 'cfaq-3',
    category: 'I 78 Arcani',
    cmsKeyQuestion: '[COPY: consulti.faq.3.question]',
    question: 'Qual è il ruolo dei 78 Arcani durante una sessione?',
    cmsKeyAnswer: '[COPY: consulti.faq.3.answer]',
    answer:
      'I 78 Arcani — comprensivi sia di Arcani Maggiori che di Minori — agiscono come icone, archetipi e specchi della tua interiorità. Non sono entità che decidono per te, ma messaggeri e narratori che ti accompagnano nell’esplorazione della tua narrazione più autentica, in uno spazio sicuro e privo di giudizio.',
  },
  {
    id: 'cfaq-4',
    category: 'Esito del Consulto',
    cmsKeyQuestion: '[COPY: consulti.faq.4.question]',
    question: 'Cosa devo aspettarmi alla fine di una consulenza?',
    cmsKeyAnswer: '[COPY: consulti.faq.4.answer]',
    answer:
      'Di uscire con una visione rinnovata. Più che risposte preconfezionate, riceverai tracce, chiavi di lettura e consapevolezze pratiche per rimettere ordine nel tuo vissuto e riprendere in mano le redini del tuo percorso con maggiore chiarezza.',
  },
  {
    id: 'cfaq-5',
    category: 'Svolgimento e Accoglienza',
    cmsKeyQuestion: '[COPY: consulti.faq.5.question]',
    question: 'Come si svolge la lettura, e mi serve una conoscenza preliminare?',
    cmsKeyAnswer: '[COPY: consulti.faq.5.answer]',
    answer:
      'Non è richiesta alcuna conoscenza preliminare della simbologia o del linguaggio degli arcani. Lavoro integrando la lettura viva della cartomanzia con un percorso di riflessione profonda: ti accolgo esattamente dove ti trovi, guidandoti passo dopo passo attraverso le immagini per decifrare la tua storia. I consulti online avvengono esclusivamente in modalità chiamata vocale.',
  },
];

export const educationalCourses: EducationalCourse[] = [
  {
    id: 'arcani-maggiori',
    orderLabel: '01 · Primo Pilastro',
    cmsKeyTitle: '[COPY: corso.placeholder.1.title]',
    title: 'Arcani Maggiori',
    cmsKeySubtitle: '[COPY: corso.placeholder.1.subtitle]',
    subtitle: 'Il Viaggio Archetipico da 0 a XXI · Presente e Previsione',
    cmsKeyDesc: '[COPY: corso.placeholder.1.desc]',
    description:
      'I 22 Trionfi da 0 a XXI: dispense, schede Waite-Smith, Sigillo flashcard — e Nina Studio, la chat riservata di studio per i corsisti.',
    priceEur: 69,
    compareAtPriceEur: 149,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI',
    lessonsCount: 4,
    totalHours: 'dispense + Sigillo',
    levelLabel: 'Livello Base e Intermedio',
    formatLabel: 'Dispense interattive + Schede visive + Sigillo · Nina Studio',
    includes: [
      '4 moduli sui 22 Trionfi (da 0 a XXI) con Sigillo di verifica',
      'Schede Waite-Smith: simbologia, senso, luce/ombra, previsione',
      'Nina Studio: chat riservata di studio Maggiori (inclusa a vita)',
      'Manuale PDF illustrato con schede archetipiche (in arrivo)',
    ],
    modules: [
      {
        number: '01',
        title: 'Architettura e Primo Settenario (0 – VII)',
        duration: '≈ 40 min lettura',
        summary:
          'Mappa dei Tre Settenari, dal Matto al Carro: bullet, schede visive e Sigillo del Primo Settenario.',
      },
      {
        number: '02',
        title: 'Secondo Settenario: Prova Etica (VIII – XIV)',
        duration: '≈ 40 min lettura',
        summary:
          'Giustizia, Eremita, Ruota, Forza, Appeso, Morte e Temperanza: interiorizzazione e cicli di prova.',
      },
      {
        number: '03',
        title: 'Terzo Settenario: Ombra e Compiutezza (XV – XXI)',
        duration: '≈ 40 min lettura',
        summary:
          'Dal Diavolo e la Torre a Stelle, Luna, Sole, Giudizio e Mondo: crisi, visione e realizzazione.',
      },
      {
        number: '04',
        title: 'Laboratorio Pratico Finale e Verifica',
        duration: '≈ 25 min lettura',
        summary:
          'Autovalutazione dei cicli, stese integrative e ripasso con il Sigillo di apprendimento.',
      },
    ],
  },
  {
    id: 'arcani-minori',
    orderLabel: '02 · Secondo Pilastro',
    cmsKeyTitle: '[COPY: corso.placeholder.2.title]',
    title: 'Arcani Minori',
    cmsKeySubtitle: '[COPY: corso.placeholder.2.subtitle]',
    subtitle: 'I Quattro Semi, Numerologia 1–10 e Carte di Corte',
    cmsKeyDesc: '[COPY: corso.placeholder.2.desc]',
    description:
      'Dall’intuizione alla precisione quotidiana: padroneggia i 56 Arcani Minori per leggere tempi, persone coinvolte, dinamiche lavorative, sentimentali e materiali.',
    priceEur: 210,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CORSO_ARCANI_MINORI',
    lessonsCount: 14,
    totalHours: '9h 45m video',
    levelLabel: 'Livello Intermedio',
    formatLabel: 'On-Demand + Atlante dei Semi PDF + 1h Q&A Live',
    recommended: true,
    includes: [
      '14 videolezioni dedicate ai 4 Semi (Bastoni, Coppe, Spade, Denari)',
      'Mappa comparativa della Numerologia dall’Asso al Dieci per seme',
      'Profilo psicologico e previsionale delle 16 Figure di Corte',
      'Esercizi guidati di lettura combinata Maggiori + Minori',
    ],
    modules: [
      {
        number: '01',
        title: 'I Quattro Elementi nei Tarocchi: Fuoco, Acqua, Aria e Terra',
        duration: '1h 50m',
        summary:
          'Come riconoscere la dominante elementale di una stesa per capire dove scorre o si blocca l’energia del consultante.',
      },
      {
        number: '02',
        title: 'Il Ciclo Numerologico dall’Asso al Dieci',
        duration: '3h 15m',
        summary:
          'Progressione dei numeri: inizi (Assi), scelte (Due), espansione (Tre), stabilità e crisi (Quattro-Cinque) fino al compimento (Dieci).',
      },
      {
        number: '03',
        title: 'Le 16 Figure di Corte: Fanti, Cavalieri, Regine e Re',
        duration: '2h 40m',
        summary:
          'Identificare persone reali, stati d’animo, messaggi in arrivo e ruoli professionali senza confondere i profili.',
      },
      {
        number: '04',
        title: 'Integrazione Pratica: Tempistiche e Dettagli Previsionali',
        duration: '2h 00m',
        summary:
          'Usare gli Arcani Minori per precisare modalità, tempistiche stagionali e azioni concrete attorno a un Arcano Maggiore.',
      },
    ],
  },
  {
    id: 'metodi-stesura',
    orderLabel: '03 · Terzo Pilastro',
    cmsKeyTitle: '[COPY: corso.placeholder.3.title]',
    title: 'Metodi di Stesura',
    cmsKeySubtitle: '[COPY: corso.placeholder.3.subtitle]',
    subtitle: 'Architetture di Lettura, Sintesi ed Etica del Consulto',
    cmsKeyDesc: '[COPY: corso.placeholder.3.desc]',
    description:
      'Dalla domanda alla narrazione coerente: impara a scegliere la geometria di stesa più adatta, collegare le carte tra loro e condurre un consulto professionale.',
    priceEur: 240,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CORSO_METODI_STESURA',
    lessonsCount: 10,
    totalHours: '7h 30m video',
    levelLabel: 'Livello Avanzato & Pratica',
    formatLabel: 'On-Demand + Schemi Vettoriali + Supervisione Live',
    includes: [
      '10 videolezioni operative sulle architetture di stesa classiche e previsionali',
      'Quaderno con 12 schemi di stesa scaricabili e checklist di conduzione',
      'Casi studio reali commentati passo dopo passo',
      'Supervisione pratica su una tua stesa reale con Maria Teresa Rogani',
    ],
    modules: [
      {
        number: '01',
        title: 'L’Arte della Domanda e il Patto Deontologico',
        duration: '1h 20m',
        summary:
          'Come riformulare quesiti confusi in domande aperte, chiare ed eticamente fondate prima di toccare il mazzo.',
      },
      {
        number: '02',
        title: 'Stese Essenziali (3 e 5 Carte) e Dinamica Temporale',
        duration: '2h 00m',
        summary:
          'Passato, Presente, Futuro imminente e linea di sviluppo: costruire letture incisive ed essenziali senza dispersione.',
      },
      {
        number: '03',
        title: 'La Croce Celtica e la Stesa a Due Bivi Decisionali',
        duration: '2h 20m',
        summary:
          'Padroneggiare le 10 posizioni della Croce Celtica e confrontare due scenari futuri alternativi con rigore.',
      },
      {
        number: '04',
        title: 'La Ruota delle 12 Case e la Sintesi Finale del Consulto',
        duration: '1h 50m',
        summary:
          'Mappare un intero ciclo annuale e restituire al consultante una sintesi orale e scritta lucida e rispettosa.',
      },
    ],
  },
];

import { MAJOR_ARCANA } from './majorArcana';

export const dialogueTimePacks: DialoguePack[] = [
  {
    id: '5m',
    title: 'Pass Rapido · 5 Minuti',
    durationMinutes: 5,
    priceEur: 3,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_DIALOGO_5M',
    focusLabel: 'Domanda secca · Prezzo minimo',
    description:
      'Cinque minuti extra di dialogo immediato con Tarot Italia IA per sciogliere un dubbio urgente su un Arcano.',
  },
  {
    id: '10m',
    title: 'Pass Luce · 10 Minuti',
    durationMinutes: 10,
    priceEur: 5,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_DIALOGO_10M',
    focusLabel: 'Più scelto · Stesa a 3 carte',
    description:
      'Dieci minuti continui per esplorare passato, presente e linee future su amore, scelte o lavoro.',
    recommended: true,
  },
  {
    id: '15m',
    title: 'Pass Cosmos · 15 Minuti',
    durationMinutes: 15,
    priceEur: 7,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_DIALOGO_15M',
    focusLabel: 'Massima convenienza · Completo',
    description:
      'Quindici minuti estesi per confrontare più Arcani Maggiori e approfondire le domande maieutiche.',
  },
];

export const arcanoDelGiorno: ArcanaCard = MAJOR_ARCANA[9];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'practitioner',
    authorName: 'Tarot Italia IA',
    timestamp: '09:30',
    text: 'Benvenuto nello spazio di dialogo di Tarot Italia IA. Qui puoi estrarre o scegliere qualsiasi dei 22 Arcani Maggiori per leggere il presente, esplorare le tendenze future e riflettere con consapevolezza.',
  },
  {
    id: 'msg-2',
    sender: 'practitioner',
    authorName: 'Tarot Italia IA',
    timestamp: '09:31',
    text: "Partiamo dall'Arcano del Giorno — L'Eremita (IX) — oppure clicca su «Estrai Arcano» o «Stesa 3 Carte» per interrogare tutto il mazzo.",
    arcanaRef: "L'Eremita · IX",
  },
];

/** Fasce orarie pubbliche (allineate a HOUR_SLOTS server: 09:00–20:00 Europe/Rome). */
export const bookingTimeSlots = Array.from(
  { length: 12 },
  (_, i) => `${String(i + 9).padStart(2, '0')}:00`
);

export const handoffArchitectureSpec: {
  auth: FirebaseAuthContract;
  whatsapp: WhatsAppWebhookContract;
  runtimeEnvVars: string[];
} = {
  auth: {
    provider: 'firebase_auth',
    strategy: 'google_sign_in_id_token',
    tables: [
      'users',
      'courses',
      'dispense',
      'course_purchases',
      'dispensa_progress',
      'bookings',
      'dialogue_sessions',
      'dialogue_purchases',
    ],
    accessPolicyNote:
      'Le API riservate verificano il Firebase ID token con Admin SDK (requireAuth / optionalAuth). I dati applicativi vivono su Postgres tramite Drizzle; non c’è Supabase RLS.',
  },
  whatsapp: {
    provider: 'whatsapp_cloud_api',
    direction: 'outbound_bridge_and_inbound_webhook',
    webhookEndpoint: '/api/webhooks/whatsapp',
    deepLinkTemplate:
      'https://wa.me/393791038253?text=Buongiorno%20Maria%20Teresa%2C%20vorrei%20informazioni%20per%20un%20consulto%20Tarot%20Italia.',
  },
  runtimeEnvVars: [
    'APP_URL',
    'SQL_HOST',
    'SQL_DB_NAME',
    'SQL_USER',
    'SQL_PASSWORD',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'ALLOW_DIRECT_UNLOCK',
    'STRIPE_PRICE_ID_DIALOGO_5M',
    'STRIPE_PRICE_ID_DIALOGO_10M',
    'STRIPE_PRICE_ID_DIALOGO_15M',
    'STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI',
    'STRIPE_PRICE_ID_CORSO_ARCANI_MINORI',
    'STRIPE_PRICE_ID_CORSO_METODI_STESURA',
    'STRIPE_PRICE_ID_CONSULTO_20M',
    'STRIPE_PRICE_ID_CONSULTO_45M',
    'STRIPE_PRICE_ID_CONSULTO_60M',
    'STRIPE_PRICE_ID_CONSULTO_90M',
    'WHATSAPP_VERIFY_TOKEN',
    'WHATSAPP_ACCESS_TOKEN',
  ],
};
