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
      liveText: 'Testimonianze',
    },
    testimonialsIntro: {
      cmsKey: '[COPY: siteContent.home.testimonialsIntro]',
      liveText:
        'Voci di chi ha scelto un confronto simbolico lucido e rispettoso per orientare un passaggio personale o professionale.',
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
        'Tre durate calibrate per profondità differenti: online esclusivamente in chiamata vocale riservata, oppure in studio su appuntamento.',
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
        'Seleziona il formato, scegli giorno e orario dal calendario e prepara i tuoi riferimenti per il checkout protetto.',
    },
    stripeHandoffNote: {
      cmsKey: '[COPY: siteContent.booking.stripeNote]',
      liveText:
        'La prenotazione salva tariffa, durata e prezzo dal catalogo server (non dal client). Il pagamento Stripe del consulto può essere collegato in un passo successivo.',
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
    modality: 'Chiamata vocale o studio · 60 min',
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
      'È sufficiente portare una o più domande chiare sul tuo percorso presente o sugli sviluppi futuri — in ambito professionale, creativo o relazionale. I consulti online avvengono esclusivamente in chiamata vocale riservata: dopo la prenotazione riceverai tutte le indicazioni per collegarti o l’indirizzo dello studio.',
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
      '45 minuti di dialogo individuale online in chiamata vocale',
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
      '60 minuti di sessione individuale in chiamata vocale o in studio',
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
      '90 minuti di dialogo olistico in chiamata vocale o in studio',
      'Stesa completa a dodici case simboliche o doppio confronto',
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
      'Studio approfondito dei 22 Trionfi: iconografia tradizionale, struttura numerologica, lettura in luce e ombra e interpretazione previsionale delle grandi svolte.',
    priceEur: 190,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI',
    lessonsCount: 12,
    totalHours: '8h 30m video',
    levelLabel: 'Livello Base e Intermedio',
    formatLabel: 'On-Demand + Dispensa PDF + 1h Q&A Live',
    includes: [
      '12 videolezioni ad alta definizione sui 22 Arcani (da 0 a XXI)',
      'Manuale PDF illustrato con schede archetipiche e parole chiave',
      'Analisi pratica di amore, lavoro e linee evolutive future per ogni lama',
      'Sessione individuale di verifica finale (45 min) con Maria Teresa Rogani',
    ],
    modules: [
      {
        number: '01',
        title: 'Struttura del Mazzo e i Tre Settenari (0 – VII)',
        duration: '2h 15m',
        summary:
          'Dal potenziale puro del Matto alla padronanza dell’azione del Carro: i fondamenti dell’identità e del libero arbitrio.',
      },
      {
        number: '02',
        title: 'Il Crocevia Interiore e il Destino (VIII – XIV)',
        duration: '2h 30m',
        summary:
          'Giustizia, Eremita, Ruota della Fortuna e Temperanza: leggere i cicli temporali, le prove e le svolte imminenti.',
      },
      {
        number: '03',
        title: 'Trasformazione, Visione e Compimento (XV – XXI)',
        duration: '2h 15m',
        summary:
          'Dal Diavolo e la Torre fino a Stelle, Luna, Sole, Giudizio e Mondo: decifrare crisi, intuizioni e realizzazioni future.',
      },
      {
        number: '04',
        title: 'Dialoghi tra Coppie di Arcani e Lettura Previsionale',
        duration: '1h 30m',
        summary:
          'Come due Arcani Maggiori si modificano a vicenda in una stesa e come formulare previsioni lucide e responsabili.',
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

/** Fasce orarie pubbliche (allineate a HOUR_SLOTS server / v2). */
export const bookingTimeSlots = Array.from(
  { length: 14 },
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
      'https://wa.me/390000000000?text=Buongiorno%20Maria%20Teresa%2C%20vorrei%20informazioni%20per%20un%20consulto%20Tarot%20Italia.',
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
    'STRIPE_PRICE_ID_CONSULTO_45M',
    'STRIPE_PRICE_ID_CONSULTO_60M',
    'STRIPE_PRICE_ID_CONSULTO_90M',
    'WHATSAPP_VERIFY_TOKEN',
    'WHATSAPP_ACCESS_TOKEN',
  ],
};
