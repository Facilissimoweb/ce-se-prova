/**
 * ENN-99 — Sigillo di apprendimento · Arcani Maggiori
 * Mapping: course slug `arcani-maggiori`, dispensa moduleNumber `01`
 * (prima dispensa del primo percorso). Deck fornito da Maria (CSV Q/A).
 * Contenuto in-repo: nessuna tabella DB.
 *
 * ENN-113 — Sigillo sezione Il Matto (14 carte CSV Maria), inline dopo
 * la scheda «### 0. Il Matto» in Dispensa 01, dopo `{{scheda-visiva:il-matto}}`
 * (marker `{{sigillo:il-matto}}` — ENN-113 / ordine ENN-114).
 *
 * ENN-116 — Sigillo sezione Il Bagatto (21 carte CSV Maria), inline dopo
 * `{{scheda-visiva:il-bagatto}}` in Dispensa 01 (marker `{{sigillo:il-bagatto}}`).
 *
 * ENN-118 — Sigillo sezione La Papessa (40 carte CSV Maria), inline dopo
 * `{{scheda-visiva:la-papessa}}` in Dispensa 01 (marker `{{sigillo:la-papessa}}`).
 *
 * ENN-119 — Sigillo sezione L'Imperatrice (25 carte CSV Maria), inline dopo
 * `{{scheda-visiva:l-imperatrice}}` in Dispensa 01 (marker `{{sigillo:l-imperatrice}}`).
 *
 * ENN-120 — Sigillo sezione L'Imperatore (19 carte CSV Maria), inline dopo
 * `{{scheda-visiva:l-imperatore}}` in Dispensa 01 (marker `{{sigillo:l-imperatore}}`).
 */

import type { CourseId } from '../../types/handoff';

export interface StudyFlashcard {
  id: number;
  question: string;
  answer: string;
}

export interface CourseModuleFlashcardDeck {
  courseSlug: CourseId;
  moduleNumber: string;
  title: string;
  subtitle: string;
  cards: StudyFlashcard[];
}

/** Inline section seals (not module-end decks). Key = `{{sigillo:<id>}}`. */
export type InlineFlashcardSectionId =
  | 'il-matto'
  | 'il-bagatto'
  | 'la-papessa'
  | 'l-imperatrice'
  | 'l-imperatore';

export const ARCANI_MAGGIORI_MODULE_01_FLASHCARDS: StudyFlashcard[] = [
  {
    id: 1,
    question: "Qual è il tema centrale e la dinamica trasformativa del Primo Settenario (0 – VII) degli Arcani Maggiori?",
    answer: "L'identità, il radicamento nel mondo fisico, l'azione concreta e la conquista della direzione esistenziale.",
  },
  {
    id: 2,
    question: "Qual è il focus evolutivo del Secondo Settenario (VIII – XIV) degli Arcani Maggiori?",
    answer: "La prova etica, l'interiorizzazione della coscienza, la transizione e la ricerca dell'equilibrio interiore.",
  },
  {
    id: 3,
    question: "Quale livello dell'esperienza umana è rappresentato nel Terzo Settenario (XV – XXI)?",
    answer: "La padronanza spirituale, il confronto con l'Ombra, la liberazione dai vincoli terreni e la compiutezza nel mondo.",
  },
  {
    id: 4,
    question: "Perché Il Matto (0) viene definito come la \"soglia fuori dal numero\" all'interno della struttura del mazzo?",
    answer: "Perché precede ogni schema e sovrastruttura mentale codificata, rappresentando l'energia pura prima della sua cristallizzazione nella materia.",
  },
  {
    id: 5,
    question: "Quale attitudine interiore richiede Il Matto (0) per intraprendere un nuovo percorso autentico?",
    answer: "L'accettazione del rischio dell'ignoto, lo spogliamento dalle vecchie protezioni superflue e la fiducia cieca nel proprio istinto pionieristico.",
  },
  {
    id: 6,
    question: "In una lettura di carte in chiave previsionale, che cosa anticipa la comparsa del Matto (0)?",
    answer: "Un cambiamento improvviso di rotta, un salto di fiducia o una partenza imminente che richiede audacia e assenza di garanzie logiche.",
  },
  {
    id: 7,
    question: "Come si articola la polarità della \"Diade Creativa\" formata da Il Bagatto (I) e La Papessa (II)?",
    answer: "Nell'alternanza tra la manifestazione esteriore e l'azione visibile immediata (Bagatto) e la gestazione silenziosa mediante la conoscenza invisibile (Papessa).",
  },
  {
    id: 8,
    question: "Qual è la caratteristica fondamentale degli strumenti che Il Bagatto (I) possiede sul suo banco di lavoro?",
    answer: "Rappresentano le risorse materiali primarie già a disposizione per agire subito, senza attendere condizioni esterne perfette.",
  },
  {
    id: 9,
    question: "Quale indicazione pratica offre Il Bagatto (I) quando compare in consultazione?",
    answer: "Un invito a \"mettere le mani in pasta\", sfruttando le proprie abilità destre per avviare un'azione o progetto nei primissimi giorni a venire.",
  },
  {
    id: 10,
    question: "Qual è l'insegnamento profondo della Papessa (II) riguardo alla creazione?",
    answer: "Ogni vera creazione richiede una fase di raccoglimento, gestazione silenziosa e sapienza del tempo prima di essere tradotta in parole o azioni.",
  },
  {
    id: 11,
    question: "In ambito previsionale, quale condotta suggerisce l'uscita della Papessa (II)?",
    answer: "Trattenere l'azione esterna, custodire un segreto, studiare e lasciare che gli eventi maturino in profondità lontano da sguardi indiscreti.",
  },
  {
    id: 12,
    question: "Qual è la transizione concettuale tra L'Imperatrice (III) e L'Imperatore (IV)?",
    answer: "Il passaggio dalla fioritura creativa espansiva e generativa delle idee (Imperatrice) alla stabilità metodica, ai confini solidi e all'amministrazione concreta (Imperatore).",
  },
  {
    id: 13,
    question: "In chiave previsionale, che cosa segnala la comparsa dell'Imperatrice (III)?",
    answer: "Espansione, comunicazione fertile, intese riuscite, fioritura di progetti e armonia nei rapporti interpersonali.",
  },
  {
    id: 14,
    question: "Quali principi incarna la figura dell'Imperatore (IV) nella costruzione del Primo Settenario?",
    answer: "L'autorità saggia, il metodo, la protezione, la costruzione di confini solidi e la gestione organizzata e concreta della realtà.",
  },
  {
    id: 15,
    question: "Qual è la funzione evolutiva del Papa (V) nella dinamica del Primo Settenario?",
    answer: "La trasmissione di valori condivisi, la guida spirituale o professionale e l'istituzione di un patto etico su regole affidabili.",
  },
  {
    id: 16,
    question: "Quali eventi di natura pratica segnala Il Papa (V) in una lettura previsionale?",
    answer: "Contratti chiari, mediazioni riuscite, consulenze autorevoli e alleanze basate sulla fiducia reciproca.",
  },
  {
    id: 17,
    question: "Perché il significato degli Innamorati (VI) trascende la semplice sfera dei sentimenti?",
    answer: "Perché rappresenta il bivio fondamentale e la necessità di compiere una scelta consapevole del cuore, escludendo le altre strade con responsabilità.",
  },
  {
    id: 18,
    question: "In che modo Il Carro (VII) sintetizza il coronamento del Primo Settenario?",
    answer: "Con la vittoria disciplinata, l'azione coordinata e il controllo sapiente e propulsivo delle forze opposte verso la meta.",
  },
  {
    id: 19,
    question: "In chiave previsionale, quali dinamiche esterne indica Il Carro (VII)?",
    answer: "Lo sblocco rapido di trattative, viaggi, spostamenti materiali e un'accelerazione trionfante verso i propri obiettivi.",
  },
  {
    id: 20,
    question: "Qual è il principio filosofico alla base della Giustizia (VIII)?",
    answer: "La legge di causa-effetto, l'onestà intellettuale, la misura oggettiva e la prevalenza del rigore etico sull'emotività.",
  },
  {
    id: 21,
    question: "Quale riscontro pratico anticipa La Giustizia (VIII) in una stesa previsionale?",
    answer: "La definizione di questioni legali o burocratiche, la firma di contratti equi e l'arrivo di una risposta oggettiva e meritata.",
  },
  {
    id: 22,
    question: "Come viene intesa la solitudine nella figura dell'Eremita (IX)?",
    answer: "Come uno spazio necessario di raccoglimento e rigenerazione per cercare la verità interiore e proteggere la propria luce.",
  },
  {
    id: 23,
    question: "Quale indicazione di condotta offre L'Eremita (IX) in previsione?",
    answer: "Procedere con extrema cautela, adottare il riserbo, dedicarsi allo studio approfondito e non affrettare i tempi dell'azione.",
  },
  {
    id: 24,
    question: "Qual è l'insegnamento morale della Ruota di Fortuna (X) riguardo alla stabilità?",
    answer: "Insegna che la stabilità assoluta non esiste e che occorre sapersi adattare con flessibilità all'eterno mutamento dei cicli vitali.",
  },
  {
    id: 25,
    question: "In chiave previsionale, che cosa preannuncia La Ruota di Fortuna (X)?",
    answer: "Una svolta improvvisa, un colpo di scena fortunato, l'inizio di un nuovo ciclo o il sblocco rapido di una situazione stagnante.",
  },
  {
    id: 26,
    question: "In che modo La Forza (XI) esercita il dominio sugli istinti e sulle passioni?",
    answer: "Attraverso la consapevolezza, la pazienza e la dolcezza, integrando e guidando le energie vitali senza ricorrere alla violenza bruta.",
  },
  {
    id: 27,
    question: "Quale dote evidenzia La Forza (XI) nel superamento delle difficoltà previsionali?",
    answer: "La capacità di superare prove complesse con la determinazione interiore e l'autocontrollo, riportando armonia nei contesti di conflitto.",
  },
  {
    id: 28,
    question: "Cosa esprime il valore del \"sacrificio\" incarnato dall'Appeso (XII)?",
    answer: "L'atto di \"rendere sacro\", la rinuncia al controllo rigido e il capovolgimento della prospettiva per vedere la realtà da un'altra angolazione.",
  },
  {
    id: 29,
    question: "Come va interpretato un blocco segnalato dall'Appeso (XII) in chiave previsionale?",
    answer: "Come una sosta volontaria o attesa inevitabile che serve a riconsiderare le priorità esistenziali, abbandonando la fretta.",
  },
  {
    id: 30,
    question: "Perché l'Arcano Senza Nome / La Morte (XIII) non rappresenta una distruzione sterile?",
    answer: "Perché è un processo di potatura e trasformazione profonda che recide ciò che è ormai morto od obsoleto per fare spazio alla vita nuova.",
  },
  {
    id: 31,
    question: "In lettura previsionale, quale evento segnala La Morte (XIII)?",
    answer: "Una chiusura netta e un cambiamento drastico ineluttabile che, se accolto senza resistenza, apre le porte a un rinnovamento totale.",
  },
  {
    id: 32,
    question: "Qual è il compito alchemico della Temperanza (XIV) al termine del Secondo Settenario?",
    answer: "La moderazione, la pacificazione degli opposti, la guarigione fluida e la riconciliazione che dona equilibrio interiore.",
  },
  {
    id: 33,
    question: "Quale esito relazionale o personale suggerisce La Temperanza (XIV) in una stesa?",
    answer: "La risoluzione pacifica di conflitti, un processo di recupero fluido, la ricerca del giusto compromesso e la stabilizzazione.",
  },
  {
    id: 34,
    question: "Qual è il meccanismo di vincolo rappresentato dalle catene del Diavolo (XV)?",
    answer: "L'attaccamento alla materia, alle passioni viscerali e alle dipendenze che tengono imprigionati gli individui per loro stessa scelta consenziente.",
  },
  {
    id: 35,
    question: "In chiave previsionale, quali dinamiche porta alla luce Il Diavolo (XV)?",
    answer: "Passioni viscerali, giochi di potere o manipolazione, questioni di profitto materiale e l'esigenza di liberarsi da legami tossici.",
  },
  {
    id: 36,
    question: "Qual è la funzione liberatoria del crollo rappresentato nella Torre (XVI)?",
    answer: "La distruzione improvvisa delle false certezze e delle strutture rigide, per rompere l'illusione e risvegliare l'autenticità interiore.",
  },
  {
    id: 37,
    question: "Che cosa preannuncia La Torre (XVI) in un contesto previsionale?",
    answer: "Un cambiamento drastico e inatteso (rottura, crollo di un'intesa o imprevisto) che rompe la stagnazione e sblocca energie nuove.",
  },
  {
    id: 38,
    question: "Quale stato evolutivo introducono Le Stelle (XVII) subito dopo il crollo della Torre?",
    answer: "La speranza, l'ispirazione artistica e intuitiva, la guarigione profonda e la riconnessione armonica con il proprio talento originario.",
  },
  {
    id: 39,
    question: "In chiave previsionale, quale responso offre la comparsa delle Stelle (XVII)?",
    answer: "Serenità ritrovata, protezione celeste, successo in ambito creativo e la conferma di essere orientati verso prospettive rosee.",
  },
  {
    id: 40,
    question: "Quali sono le sfide psicologiche descritte nel regno della Luna (XVIII)?",
    answer: "Il confronto con l'inconscio, i sogni e le paure ancestrali, oltre alle illusioni, agli inganni e alla nebbia emotiva.",
  },
  {
    id: 41,
    question: "Quale atteggiamento raccomanda La Luna (XVIII) di fronte a una fase d'incertezza previsionale?",
    answer: "Procedere con cautela ascoltando l'istinto viscerale, senza farsi paralizzare da segreti, malintesi o ansie immotivate.",
  },
  {
    id: 42,
    question: "Qual è la differenza essenziale tra la luce della Luna (XVIII) e la luce del Sole (XIX)?",
    answer: "La Luna riflette le ombre e le incertezze dell'inconscio, mentre Il Sole porta la verità svelata, la trasparenza, la gioia e la luce visibile.",
  },
  {
    id: 43,
    question: "Quali esiti garantisce Il Sole (XIX) in una lettura previsionale?",
    answer: "Successo pubblico, chiarezza totale nei rapporti, accordi fortunati, vitalità e il trionfo solare di un progetto.",
  },
  {
    id: 44,
    question: "Che cosa simboleggia la tromba dell'angelo nella lama del Giudizio (XX)?",
    answer: "La chiamata al risveglio spirituale, il perdono profondo e la liberazione dai vecchi giudizi limitanti per rinascere a nuova vita.",
  },
  {
    id: 45,
    question: "In chiave previsionale, quale svolta annuncia Il Giudizio (XX)?",
    answer: "Una svolta decisiva derivante da una presa di coscienza, l'arrivo di notizie importanti o una riconciliazione liberatoria.",
  },
  {
    id: 46,
    question: "Qual è il significato simbolico della mandorla e dei quattro viventi nel Mondo (XXI)?",
    answer: "L'integrazione totale di tutte le tappe vissute nei tre settenari, la perfetta armonia cosmica e il compimento della Grande Opera.",
  },
  {
    id: 47,
    question: "In chiave previsionale, quale responso attribuisce Il Mondo (XXI) a una consultazione?",
    answer: "Successo totale, coronamento trionfante di un ciclo di studi o lavoro, viaggi internazionali e la massima espansione.",
  },
  {
    id: 48,
    question: "Nella stesa pratica a tre carte (\"Esercizio delle Tre Fasi\"), quale funzione svolge la carta del Primo Settenario?",
    answer: "Identifica il punto di partenza e l'azione pratica e immediata da compiere oggi.",
  },
  {
    id: 49,
    question: "Nella stesa pratica a tre carte, che cosa analizza la carta estratta dal Secondo Settenario?",
    answer: "Individua il nodo interiore, la prova etica o l'ostacolo emotivo da rielaborare.",
  },
  {
    id: 50,
    question: "Nella stesa delle Tre Fasi, qual è il ruolo attribuito alla carta del Terzo Settenario?",
    answer: "Rivelare la prospettiva di sblocco evolutivo e la direzione di realizzazione finale del consultante.",
  },
  {
    id: 51,
    question: "Secondo il Test di Autovalutazione, in quale settenario si trova chi affronta una pausa forzata o deve accettare un cambiamento radicale?",
    answer: "Nel Secondo Settenario (VIII – XIV), dove operano le dinamiche dell'Eremita, dell'Appeso o della Morte.",
  },
  {
    id: 52,
    question: "In base al Test di Autovalutazione, in quale settenario risuona chi sta spezzando legami limitanti o raccogliendo i frutti di un percorso?",
    answer: "Nel Terzo Settenario (XV – XXI), caratterizzato dal confronto con la Torre, il Sole o il Mondo.",
  },
  {
    id: 53,
    question: "Nell'esercizio pratico \"Bagatto vs Papessa\", quale azione viene prescritta se dall'estrazione esce La Papessa?",
    answer: "Concedersi tre giorni di silenzio e ascolto interiore prima di prendere qualsiasi decisione.",
  },
  {
    id: 54,
    question: "Nell'esercizio pratico \"Bagatto vs Papessa\", qual è la direttiva da seguire se si estrae Il Bagatto?",
    answer: "Pianificare ed eseguire un'azione pratica e concreta entro le 24 ore successive.",
  },
  {
    id: 55,
    question: "In che modo l'esercizio \"Il Matto e il blocco del foglio bianco\" spinge al superamento della procrastinazione?",
    answer: "Richiede di individuare un progetto rinviato e di eseguire subito l'azione minima di coraggio, senza pianificarla nei dettagli.",
  },
  {
    id: 56,
    question: "Qual è la differenza essenziale tra la rottura operata dalla Morte (XIII) e quella provocata dalla Torre (XVI)?",
    answer: "La Morte è una potatura interna e graduale di ciò che è privo di vita; La Torre è un crollo dirompente ed esterno delle strutture rigide dell'illusione.",
  },
  {
    id: 57,
    question: "Come si integrano la legge della Giustizia (VIII) e la ricerca dell'Eremita (IX) nella maturazione interiore?",
    answer: "L'ordine e l'imparzialità della legge di causa-effetto (Giustizia) vengono approfonditi e illuminati dalla saggezza e dalla luce interiore (Eremita).",
  },
  {
    id: 58,
    question: "Qual è la relazione tra la guida etica del Papa (V) e la decisione richiesta dagli Innamorati (VI)?",
    answer: "Il Papa trasmette la struttura e i valori etici di riferimento, che l'individuo deve poi applicare attivamente compiendo la scelta del cuore negli Innamorati.",
  },
];

const MAGGIORI_SEAL_META = {
  courseSlug: 'arcani-maggiori' as const,
  title: 'Sigillo di apprendimento · Arcani Maggiori',
  cards: ARCANI_MAGGIORI_MODULE_01_FLASHCARDS,
};

export const FLASHCARD_DECKS: CourseModuleFlashcardDeck[] = [
  {
    ...MAGGIORI_SEAL_META,
    moduleNumber: '01',
    subtitle:
      'Ripassa i Trionfi (0–XXI) dopo la prima dispensa del Primo Step (architettura e Primo Settenario).',
  },
  {
    ...MAGGIORI_SEAL_META,
    moduleNumber: '04',
    subtitle:
      'Chiusura del Primo Step: ripassa i Trionfi (0–XXI) dopo il laboratorio pratico e i protocolli di verifica.',
  },
];

/** ENN-113 — 14 flashcard Il Matto (CSV Maria), dopo la scheda Matto in Dispensa 01. */
export const IL_MATTO_SECTION_FLASHCARDS: StudyFlashcard[] = [
  {
    id: 1,
    question:
      "Dove si colloca la carta de Il Matto (0) all'interno della sequenza numerica dei Tarocchi?",
    answer:
      'Si colloca al di fuori della numerazione sequenziale, poiché precede ogni schema, regola o sovrastruttura mentale.',
  },
  {
    id: 2,
    question:
      "Qual è l'essenza archetipica fondamentale rappresentata da Il Matto?",
    answer:
      "Rappresenta l'energia pura prima della cristallizzazione nella materia, la libertà assoluta, l'ignoto e il passo sul precipizio.",
  },
  {
    id: 3,
    question:
      "Cosa insegna Il Matto riguardo all'inizio di un percorso autentico?",
    answer:
      "Insegna che per iniziare davvero è necessario accettare il rischio dell'ignoto e spogliarsi delle protezioni superflue.",
  },
  {
    id: 4,
    question:
      'In chiave previsionale, cosa indica la comparsa de Il Matto in una lettura?',
    answer:
      "Anticipa un cambiamento improvviso di rotta, una partenza imminente, un salto di fiducia o una novità inattesa che richiede audacia e istinto pionieristico.",
  },
  {
    id: 5,
    question:
      "Nell'iconografia Waite-Smith, cosa simboleggiano l'orlo del precipizio e lo sguardo rivolto verso l'alto?",
    answer:
      "Simboleggiano l'abbandono alle correnti dell'esistenza e la disponibilità al nuovo, ma indicano anche distrazione dai pericoli immediati del terreno.",
  },
  {
    id: 6,
    question: 'Cosa rappresenta la sacca appesa al bastone de Il Matto?',
    answer: "Rappresenta le esperienze passate ridotte all'essenziale.",
  },
  {
    id: 7,
    question:
      'Qual è il significato simbolico della rosa bianca tenuta nella mano destra del Matto?',
    answer:
      "Simboleggia la purezza d'intenti che accompagna l'inizio del viaggio.",
  },
  {
    id: 8,
    question:
      'Qual è la funzione simbolica del cane bianco che affianca Il Matto?',
    answer:
      "Rappresenta l'istinto, la fedeltà o l'avvertimento sensoriale di fronte al passo che sta per compiersi.",
  },
  {
    id: 9,
    question:
      'Quale avvertimento pragmatico racchiude la figura de Il Matto quando indica un nuovo inizio?',
    answer:
      "Invita ad agire con freschezza e audacia senza tuttavia ignorare il piano d'appoggio concreto.",
  },
  {
    id: 10,
    question:
      "Nell'ambito della crescita personale, quale condizionamento mentale viene messo in discussione da Il Matto?",
    answer:
      'La tendenza della mente a richiedere conferme e garanzie immediate prima di muovere anche un solo passo.',
  },
  {
    id: 11,
    question:
      'In che modo Il Matto si differenzia strutturalmente dalla stabilità di un Re o dalla gestione numerica?',
    answer:
      'Il Matto è energia pura, spontanea e priva di sovrastrutture, mentre i Re rappresentano la stabilità consolidata e i numeri la gestione ciclica e ordinata.',
  },
  {
    id: 12,
    question:
      "Nel lavoro e nella carriera, quale atteggiamento limita l'espressione dell'energia de Il Matto?",
    answer:
      "Trattenere un'idea o un progetto potenziale in attesa di una struttura o di una garanzia perfetta.",
  },
  {
    id: 13,
    question: "Nei rapporti sociali, come si manifesta l'energia de Il Matto?",
    answer:
      'Attraverso il superamento delle difese e delle aspettative rigide, favorendo la leggerezza e il dialogo spontaneo.',
  },
  {
    id: 14,
    question:
      'Qual è il criterio per valutare se Il Matto indica una sana libertà evolutiva o una leggerezza imprudente?',
    answer:
      "Analizzare se la decisione è mossa da una genuina fiducia e purezza d'intenti o se ignora completamente la realtà e il piano d'appoggio concreto.",
  },
];

export const IL_MATTO_FLASHCARD_DECK: CourseModuleFlashcardDeck = {
  courseSlug: 'arcani-maggiori',
  /** Distinct from module-end seals (`01` / `04`) — section-scoped deck. */
  moduleNumber: '01-il-matto',
  title: 'Sigillo di apprendimento · Il Matto',
  subtitle:
    'Ripassa Il Matto (0) subito dopo la scheda del Primo Settenario: essenza, simbologia e chiave previsionale.',
  cards: IL_MATTO_SECTION_FLASHCARDS,
};

/** ENN-116 — 21 flashcard Il Bagatto (CSV Maria), dopo scheda-visiva in Dispensa 01. */
export const IL_BAGATTO_SECTION_FLASHCARDS: StudyFlashcard[] = [
  {
    id: 1,
    question:
      'Quale posizione occupa Il Bagatto nella sequenza numerica degli Arcani Maggiori?',
    answer: 'Apre la sequenza numerica recando il numero I.',
  },
  {
    id: 2,
    question: 'Tra quali due stati Il Bagatto funge da ponte operativo?',
    answer:
      'Funge da ponte tra il potenziale indifferenziato del Matto (0) e la manifestazione concreta nella materia.',
  },
  {
    id: 3,
    question:
      'Quali elementi o strumenti tradizionali sono disposti sul banco di lavoro del Bagatto?',
    answer: 'Tutti i quattro elementi dei semi: bastoni, coppe, spade e denari.',
  },
  {
    id: 4,
    question: 'Cosa incarna Il Bagatto a livello simbolico e archetipico?',
    answer:
      "L'iniziativa immediata, il talento allo stato puro, la destrezza e la capacità di avviare processi sfruttando le risorse già disponibili.",
  },
  {
    id: 5,
    question:
      'Che cosa segnala la comparsa del Bagatto in una lettura in chiave previsionale?',
    answer:
      "Intraprendenza, sveltezza e un invito ad avviare operativamente un'azione, progetto o trattativa nei primissimi giorni a venire.",
  },
  {
    id: 6,
    question:
      'Nella raffigurazione Waite-Smith, quale postura assumono le mani del Bagatto?',
    answer:
      'La mano destra eleva una bacchetta verso il cielo, mentre la mano sinistra indica la terra.',
  },
  {
    id: 7,
    question:
      'Qual è il significato della postura delle mani del Bagatto ("Come in cielo, così in terra")?',
    answer:
      'Rappresenta la funzione di canale mediatore tra il regno delle idee e della volontà spirituale e la sua realizzazione sul piano fisico.',
  },
  {
    id: 8,
    question:
      "Nel simbolismo del banco del Bagatto, a quale piano di realtà corrisponde l'elemento Bastoni (Fuoco)?",
    answer: 'Alla volontà.',
  },
  {
    id: 9,
    question:
      "Nel simbolismo del banco del Bagatto, a quale piano di realtà corrisponde l'elemento Coppe (Acqua)?",
    answer: 'Alle emozioni.',
  },
  {
    id: 10,
    question:
      "Nel simbolismo del banco del Bagatto, a quale piano di realtà corrisponde l'elemento Spade (Aria)?",
    answer: "All'intelletto.",
  },
  {
    id: 11,
    question:
      "Nel simbolismo del banco del Bagatto, a quale piano di realtà corrisponde l'elemento Denari (Terra)?",
    answer: 'Alla materia.',
  },
  {
    id: 12,
    question:
      'Quale simbolo iconografico brilla sopra la testa del Bagatto nella versione Waite-Smith?',
    answer: "La lemniscata (il simbolo dell'infinito).",
  },
  {
    id: 13,
    question: 'Da quale elemento simbolico è cinta la veste del Bagatto?',
    answer: "Dall'Uroboro, ossia un serpente che si morde la coda.",
  },
  {
    id: 14,
    question:
      "Cosa indicano congiuntamente la lemniscata e l'Uroboro nell'iconografia del Bagatto?",
    answer:
      "L'energia vitale inesauribile, la lucidità mentale e la padronanza dei cicli della manifestazione.",
  },
  {
    id: 15,
    question:
      'Nel pergolato che incornicia il Bagatto, cosa simboleggiano le rose rosse?',
    answer: 'Il desiderio fertile e la passione creativa.',
  },
  {
    id: 16,
    question:
      'Nel pergolato che incornicia il Bagatto, cosa simboleggiano i gigli bianchi?',
    answer: "La purezza d'intenti che guida l'azione.",
  },
  {
    id: 17,
    question:
      'Quale atteggiamento disfunzionale invita a superare il Bagatto sul piano della crescita personale?',
    answer:
      "Posticipare l'espressione di sé in attesa di acquisire ulteriori competenze, sottovalutando i talenti di cui si dispone già.",
  },
  {
    id: 18,
    question:
      'In ambito lavorativo, quale micro-esercizio pratico incarna lo spirito del Bagatto?',
    answer:
      "Stendere una bozza provvisoria (es. traccia di 5 punti) di un'idea in sospeso, senza attendere condizioni perfette.",
  },
  {
    id: 19,
    question:
      'Nei rapporti affettivi e sociali, perché Il Bagatto privilegia le azioni pratiche rispetto alle pure intenzioni?',
    answer:
      'Perché i gesti tangibili e la presenza concreta facilitano la connessione relazionale più dei discorsi o pensieri teorici.',
  },
  {
    id: 20,
    question:
      'La spinta indifferenziata e aperta del Matto (0) trova nel Bagatto (I) la sua prima forma di _____.',
    answer: 'canalizzazione operativa (nel mondo materiale)',
  },
  {
    id: 21,
    question:
      "Quale Arcano Maggiore rappresenta la carta contigua al Bagatto nell'ambito della Diade Creativa?",
    answer: 'La Papessa (II).',
  },
];

export const IL_BAGATTO_FLASHCARD_DECK: CourseModuleFlashcardDeck = {
  courseSlug: 'arcani-maggiori',
  /** Distinct from module-end seals (`01` / `04`) — section-scoped deck. */
  moduleNumber: '01-il-bagatto',
  title: 'Sigillo di apprendimento · Il Bagatto',
  subtitle:
    'Ripassa Il Bagatto (I) subito dopo la scheda visiva: iniziativa, simboli e chiave previsionale.',
  cards: IL_BAGATTO_SECTION_FLASHCARDS,
};

/** ENN-118 — flashcard La Papessa (CSV Maria), dopo scheda-visiva in Dispensa 01. */
export const LA_PAPESSA_SECTION_FLASHCARDS: StudyFlashcard[] = [
  {
    id: 1,
    question:
      "Quale numero d'ordine e quale polarità incarna La Papessa nella struttura dei Tarocchi?",
    answer:
      'La Papessa incarna il numero II e la polarità femminile ricettiva della Diade Creativa.',
  },
  {
    id: 2,
    question:
      'Come viene figurativamente rappresentata La Papessa nel tempio archetipico?',
    answer:
      'Seduta immobile e velata tra i pilastri del tempio, con un sacro libro chiuso o socchiuso sulle ginocchia.',
  },
  {
    id: 3,
    question:
      'Quale dimensione custodisce La Papessa prima di ogni manifestazione esteriore?',
    answer:
      "La custodia della conoscenza sottile, la memoria, la gestazione e la dimensione dell'invisibile.",
  },
  {
    id: 4,
    question: 'Cosa insegna La Papessa riguardo al processo di creazione?',
    answer:
      'Insegna che ogni vera creazione richiede tempo di raccoglimento, studio e maturazione interiore lontano dal frastuono esterno.',
  },
  {
    id: 5,
    question:
      "In chiave previsionale, l'uscita della Papessa indica che è giunto il momento di agire subito?",
    answer:
      "No; indica che non è ancora il momento di agire o di esporre un'idea all'esterno.",
  },
  {
    id: 6,
    question:
      'Quale atteggiamento suggerisce di adottare La Papessa in una lettura previsionale?',
    answer:
      'Suggerisce di custodire un segreto, studiare, riflettere e far maturare gli eventi in profondità con riservatezza e ascolto intuitivo.',
  },
  {
    id: 7,
    question:
      'Nella figura della Papessa del mazzo Waite-Smith, cosa reca in capo la figura femminile?',
    answer: 'Una tiara papale a tre livelli.',
  },
  {
    id: 8,
    question:
      'Nel mazzo Waite-Smith, quali lettere contrassegnano le due colonne tra cui siede La Papessa?',
    answer:
      'La lettera "B" sulla colonna nera e la lettera "J" sulla colonna bianca.',
  },
  {
    id: 9,
    question:
      'Quali nomi estesi corrispondono alle lettere B e J sulle colonne della Papessa?',
    answer: 'B sta per Boaz e J sta per Jachin.',
  },
  {
    id: 10,
    question: 'Quale simbolo reca La Papessa sul petto nel mazzo Waite-Smith?',
    answer: 'Una croce solare equilatera.',
  },
  {
    id: 11,
    question:
      'Quale elemento astrologico/simbolico si trova ai piedi della Papessa nel mazzo Waite-Smith?',
    answer: 'Una luna crescente.',
  },
  {
    id: 12,
    question:
      "Cosa tiene La Papessa sul proprio grembo nell'iconografia Waite-Smith?",
    answer: 'Una pergamena parzialmente celata recante la scritta "TORA".',
  },
  {
    id: 13,
    question: 'Cosa cela il velo posto alle spalle della Papessa?',
    answer:
      "Un uno specchio d'acqua, simbolo dell'inconscio e della saggezza primordiale.",
  },
  {
    id: 14,
    question:
      'Con quali motivi vegetali è decorato il velo dietro il trono della Papessa?',
    answer: 'Con melograni e palme.',
  },
  {
    id: 15,
    question:
      'Cosa rappresentano simbolicamente le colonne Boaz (B) e Jachin (J) nella lama della Papessa?',
    answer:
      'Rappresentano la dualità cosmica: forza e materia, oscurità e luce, attivo e passivo.',
  },
  {
    id: 16,
    question:
      'Qual è il ruolo della Papessa rispetto alla dualità rappresentata dalle colonne B e J?',
    answer:
      'Siede al centro come punto di equilibrio e sintesi tra gli opposti.',
  },
  {
    id: 17,
    question:
      'Cosa simboleggia la pergamena recante la scritta "TORA" nel grembo della Papessa?',
    answer: 'Simboleggia la legge sacra e la conoscenza esoterica.',
  },
  {
    id: 18,
    question:
      'Perché la pergamena TORA è parzialmente coperta dal mantello della Papessa?',
    answer:
      'Per indicare che la sapienza si svela soltanto a chi sa guardare oltre le apparenze di superficie.',
  },
  {
    id: 19,
    question:
      'Cosa simboleggia la tiara papale a tre livelli indossata dalla Papessa?',
    answer:
      'Indica il dominio e il governo sui tre mondi: spirituale, mentale e fisico.',
  },
  {
    id: 20,
    question:
      'Quali dimensioni interiori richiamano la croce solare e la luna crescente nella Papessa?',
    answer:
      "L'unione degli opposti e la connessione con i cicli dell'intuizione, dell'inconscio e della memoria profonda.",
  },
  {
    id: 21,
    question:
      'Nella decorazione del velo della Papessa, cosa simboleggiano rispettivamente i melograni e le palme?',
    answer:
      'I melograni simboleggiano il principio femminile e la gestazione; le palme simboleggiano il principio maschile e la fecondità.',
  },
  {
    id: 22,
    question:
      'A quali decisioni sconsiglia di procedere la comparsa della Papessa in una stesa?',
    answer:
      'Sconsiglia azioni affrettate, invitando invece allo studio rigoroso, alla protezione delle idee e al rispetto dei tempi naturali.',
  },
  {
    id: 23,
    question:
      "Nell'ambito della Crescita Personale, qual è lo spunto di riflessione legato alla Papessa?",
    answer:
      "Osservare se si avverte il bisogno di spiegare o giustificare all'esterno le proprie intuizioni prima che siano davvero maturate.",
  },
  {
    id: 24,
    question:
      'In che cosa consiste il micro-esercizio pratico di Crescita Personale per La Papessa?',
    answer:
      "Sperimentare un breve periodo di riservatezza su un'idea o desiderio, custodendone l'energia senza condividerla prematuramente.",
  },
  {
    id: 25,
    question:
      "Nell'ambito di Lavoro e Carriera, qual è lo spunto di riflessione associato alla Papessa?",
    answer:
      'Notare se in un progetto professionale sia richiesta una fase preliminare di studio, documentazione o analisi prima di uscire allo scoperto.',
  },
  {
    id: 26,
    question:
      'Qual è il micro-esercizio pratico suggerito dalla Papessa per il settore Lavoro e Carriera?',
    answer:
      "Dedicare una pausa mirata all'approfondimento teorico, alla verifica dei dati o alla revisione silenziosa della strategia.",
  },
  {
    id: 27,
    question:
      'In Amore e Rapporti Sociali, quale valore invita a valutare lo spunto di riflessione della Papessa?',
    answer:
      "Il valore del silenzio empatico, dell'ascolto discreto e del rispetto dei tempi altrui nelle dinamiche affettive.",
  },
  {
    id: 28,
    question:
      'In che modo si applica il micro-esercizio pratico della Papessa nelle relazioni sociali?',
    answer:
      "Praticare un ascolto attento e privo di giudizio, lasciando che l'altro si esprima pienamente prima di formulare risposte o consigli.",
  },
  {
    id: 29,
    question:
      "Come si colloca La Papessa (II) rispetto all'iniziativa del Bagatto (I) nella Diade Creativa?",
    answer:
      "Si pone come contrappeso e ricettacolo indispensabile all'impulso estroverso e immediato del Bagatto, fornendo gestazione e profondità.",
  },
  {
    id: 30,
    question:
      "Qual è la differenza fondamentale tra l'azione del Bagatto (I) e il ruolo della Papessa (II)?",
    answer:
      "Il Bagatto rappresenta la scintilla attiva e la proiezione esterna; La Papessa rappresenta l'assorbimento ricettivo, lo studio e la matura gestazione interiore.",
  },
  {
    id: 31,
    question:
      'Quando la presenza della Papessa in una stesa segna una pausa fertile per la lettura?',
    answer:
      'Quando evidenzia la necessità di studiare, approfondire, accumulare energia e far maturare un progetto al riparo da sguardi esterni.',
  },
  {
    id: 32,
    question:
      "Quando la presenza della Papessa in una stesa può indicare un'ombra o un limite psicologico?",
    answer:
      "Quando segnala un eccesso di passività, il blocco nell'inazione, il timore di esporsi o la tendenza a nascondersi nel segreto.",
  },
  {
    id: 33,
    question:
      "Quale passaggio evolutivo segna l'avvento dell'Imperatrice (III) dopo La Papessa (II)?",
    answer:
      "Il passaggio dalla gestazione silenziosa e contenuta della Papessa alla fioritura, creatività e manifestazione espressiva dell'Imperatrice.",
  },
  {
    id: 34,
    question:
      "Il principio che unisce la fecondità maschile e la gestazione femminile sul velo della Papessa è rappresentato dall'unione di _____ e _____.",
    answer: 'palme (principio maschile) e melograni (principio femminile)',
  },
  {
    id: 35,
    question:
      'La verità intuita prima ancora di essere tradotta in parole è il significato profondo legato alla figura della _____.',
    answer: 'Papessa (II)',
  },
  {
    id: 36,
    question:
      "Che relazione intercorre tra il velo della Papessa e lo specchio d'acqua sottostante?",
    answer:
      "Il velo custodisce e protegge l'accesso diretto alle acque profonde dell'inconscio e della conoscenza primordiale.",
  },
  {
    id: 37,
    question:
      'Perché La Papessa invita al silenzio riguardo ai propri progetti in fase iniziale?',
    answer:
      "Per evitare che la dispersione energetica o la condivisione prematura compromettano la maturazione profonda dell'idea.",
  },
  {
    id: 38,
    question: 'Quale polarità della Diade Creativa rappresenta La Papessa?',
    answer: 'La polarità femminile ricettiva.',
  },
  {
    id: 39,
    question:
      "In che luogo si trova posizionato il trono della Papessa nell'iconografia classica del mazzo Waite-Smith?",
    answer: "Tra le due colonne Boaz e Jachin all'interno del tempio.",
  },
  {
    id: 40,
    question:
      'Per quale motivo la conoscenza rappresentata dalla Papessa è definita "sapienza del silenzio"?',
    answer:
      "Perché non si esprime attraverso la proclamazione o l'azione esteriore, ma mediante l'ascolto, l'intuizione e la maturazione interiore.",
  },
];


export const LA_PAPESSA_FLASHCARD_DECK: CourseModuleFlashcardDeck = {
  courseSlug: 'arcani-maggiori',
  /** Distinct from module-end seals (`01` / `04`) — section-scoped deck. */
  moduleNumber: '01-la-papessa',
  title: 'Sigillo di apprendimento · La Papessa',
  subtitle:
    'Ripassa La Papessa (II) subito dopo la scheda visiva: gestazione, simboli e chiave previsionale.',
  cards: LA_PAPESSA_SECTION_FLASHCARDS,
};

/** ENN-119 — flashcard L'Imperatrice (CSV Maria), dopo scheda-visiva in Dispensa 01. */
export const L_IMPERATRICE_SECTION_FLASHCARDS: StudyFlashcard[] = [
  {
    id: 1,
    question:
      "Quale tappa del Primo Settenario dei Tarocchi è rappresentata dall'Imperatrice (III)?",
    answer: 'La terza tappa.',
  },
  {
    id: 2,
    question:
      "In che modo L'Imperatrice (III) si sviluppa a partire dal percorso della Papessa (II)?",
    answer:
      'Sblocca la carica vitale accumulata nella gestazione silenziosa della Papessa e la fa sbocciare nella manifestazione visibile.',
  },
  {
    id: 3,
    question:
      "Quali sono i quattro temi centrali incarnati dall'archetipo dell'Imperatrice (III)?",
    answer:
      "1. L'abbondanza\n2. La fioritura creativa\n3. L'espressività\n4. La comunicazione fertile",
  },
  {
    id: 4,
    question:
      "Qual è il significato profondo legato alla virtù generativa dell'Imperatrice (III)?",
    answer:
      'La virtù di nutrire i propri progetti e le proprie relazioni attraverso la vitalità, la bellezza sensibile e il piacere della creazione.',
  },
  {
    id: 5,
    question:
      "Secondo l'insegnamento dell'Imperatrice (III), quali condizioni richiede ogni vera crescita?",
    answer:
      'Richiede apertura, fluidità comunicativa e la capacità di accogliere la vita nei suoi aspetti più ricchi ed espansivi.',
  },
  {
    id: 6,
    question:
      "Che cosa segnala la comparsa dell'Imperatrice (III) in una lettura in chiave previsionale?",
    answer:
      'Segnala espansione, intese riuscite, sviluppo rigoglioso di progetti e armonia nei rapporti.',
  },
  {
    id: 7,
    question:
      "In ambito previsionale, quale maturità di situazione indica L'Imperatrice (III)?",
    answer:
      'Indica che le condizioni sono mature affinché una situazione cresca e porti frutti tangibili tramite un dialogo aperto e caloroso.',
  },
  {
    id: 8,
    question:
      "Come viene raffigurato il trono dell'Imperatrice nel mazzo Waite-Smith?",
    answer:
      "Un comodo trono ricoperto di cuscini e drappeggi, situato all'interno di un paesaggio lussureggiante.",
  },
  {
    id: 9,
    question:
      "Da quale motivo decorativo è ornato l'abito dell'Imperatrice nell'iconografia di Pamela Colman Smith?",
    answer: 'Da melograni.',
  },
  {
    id: 10,
    question:
      "Quali sono le caratteristiche della corona indossata dall'Imperatrice nel mazzo Waite-Smith?",
    answer: 'È composta da dodici stelle a sei punte.',
  },
  {
    id: 11,
    question:
      "Cosa impugna L'Imperatrice nella mano destra nella raffigurazione Waite-Smith?",
    answer: 'Uno scettro sormontato da un globo.',
  },
  {
    id: 12,
    question:
      "Quale oggetto recante il simbolo di Venere poggia ai piedi del trono dell'Imperatrice?",
    answer: 'Uno scudo a forma di cuore.',
  },
  {
    id: 13,
    question:
      "Quali elementi paesaggistici figurano rispettivamente in primo piano e sullo sfondo dell'Imperatrice (Waite-Smith)?",
    answer:
      'In primo piano matura un campo di grano dorato, mentre sullo sfondo scorre una cascata che alimenta un bosco alberato.',
  },
  {
    id: 14,
    question:
      "Cosa simboleggiano congiuntamente la corona a 12 stelle e lo scettro dell'Imperatrice?",
    answer:
      "Il dominio armonico sui dodici mesi dell'anno e sui cicli naturali, congiungendo l'ispirazione celeste alla capacità di nutrire la terra.",
  },
  {
    id: 15,
    question:
      "Qual è il significato simbolico dello scudo di Venere e dell'abito con melograni nell'Imperatrice?",
    answer:
      "Rappresentano l'amore, la sensualità, la bellezza e la fecondità vitale in ogni sua manifestazione.",
  },
  {
    id: 16,
    question:
      "Cosa indicano la cascata e il campo di grano dorato nell'analisi simbolica dell'Imperatrice?",
    answer:
      'La ricchezza del raccolto, la fertilità della natura e il flusso generoso e ininterrotto delle energie emotive e creative.',
  },
  {
    id: 17,
    question:
      "Qual è l'invito operativo sintetico trasmesso dall'Imperatrice quando compare in una stesa?",
    answer:
      "Abbracciare l'abbondanza, comunicare i propri intenti con calore e alimentare con dedizione ed entusiasmo le iniziative intraprese.",
  },
  {
    id: 18,
    question:
      "In ambito di crescita personale, su quale aspetto invita a riflettere l'Imperatrice?",
    answer:
      'Sul verificare se si stia trattenendo la propria espressività o se ci si conceda il permesso di godere della bellezza e dei frutti dei propri sforzi.',
  },
  {
    id: 19,
    question:
      "Qual è il micro-esercizio pratico di crescita personale legato all'Imperatrice?",
    answer:
      "Dedicare un breve momento della giornata a un'attività apertamente espressiva senza scopi utilitaristici, al solo fine di nutrire il benessere interiore.",
  },
  {
    id: 20,
    question:
      "Nel settore lavoro e carriera, qual è lo spunto di riflessione associato all'Imperatrice?",
    answer:
      'Valutare in quale ambito una comunicazione più fluida, aperta ed empatica possa favorire la crescita delle intese.',
  },
  {
    id: 21,
    question:
      "Qual è il micro-esercizio pratico consigliato per l'ambito professionale?",
    answer:
      "Condividere un'idea o un aggiornamento con colleghi o partner puntando sulla valorizzazione degli aspetti positivi e delle potenzialità di sviluppo comune.",
  },
  {
    id: 22,
    question:
      "Nei rapporti affettivi e sociali, su cosa focalizza l'attenzione lo spunto di riflessione dell'Imperatrice?",
    answer:
      "Sulla propria disponibilità a manifestare apertamente l'affetto e a creare ambienti di condivisione caldi e accoglienti.",
  },
  {
    id: 23,
    question:
      "Qual è il micro-esercizio pratico per il settore dell'amore e dei rapporti sociali?",
    answer:
      'Rivolgere un gesto premuroso o una parola di apprezzamento sincero a una persona cara, osservando la naturale armonia generata.',
  },
  {
    id: 24,
    question:
      "Come si contrappone l'espressione dell'Imperatrice (III) alla natura della Papessa (II)?",
    answer:
      "Mentre La Papessa custodisce un sapere introverso e silenzioso, L'Imperatrice lo converte in un'energia espressiva, comunicativa ed estroversa.",
  },
  {
    id: 25,
    question:
      "Nell'interpretare L'Imperatrice in stesa, quale rischio o ombra occorre distinguere da un reale processo di crescita?",
    answer:
      "Il rischio di una dispersione emotiva o di un'ostentazione superficiale.",
  },
];

export const L_IMPERATRICE_FLASHCARD_DECK: CourseModuleFlashcardDeck = {
  courseSlug: 'arcani-maggiori',
  /** Distinct from module-end seals (`01` / `04`) — section-scoped deck. */
  moduleNumber: '01-l-imperatrice',
  title: "Sigillo di apprendimento · L'Imperatrice",
  subtitle:
    "Ripassa L'Imperatrice (III) subito dopo la scheda visiva: abbondanza, simboli e chiave previsionale.",
  cards: L_IMPERATRICE_SECTION_FLASHCARDS,
};

/** ENN-120 — flashcard L'Imperatore (CSV Maria), dopo scheda-visiva in Dispensa 01. */
export const L_IMPERATORE_SECTION_FLASHCARDS: StudyFlashcard[] = [
  {
    id: 1,
    question:
      "Quale posizione occupa L'Imperatore all'interno del Primo Settenario dei Tarocchi?",
    answer: 'La quarta lama (IV).',
  },
  {
    id: 2,
    question:
      "Quale figura femminile affianca L'Imperatore per completare la coppia regale del Primo Settenario?",
    answer: "L'Imperatrice (III).",
  },
  {
    id: 3,
    question:
      "Quali sono i tre concetti chiave che definiscono l'essenza archetipica de L'Imperatore (IV)?",
    answer: 'La stabilità, il metodo e la costruzione di confini solidi.',
  },
  {
    id: 4,
    question:
      'In che modo L\'Imperatore sviluppa le idee germinate precedentemente con Il Bagatto e L\'Imperatrice?',
    answer:
      'Fornendo ad esse ordine, metodo, persistenza e concretezza strutturale.',
  },
  {
    id: 5,
    question:
      "Cosa indica la comparsa de L'Imperatore (IV) in una lettura di tipo previsionale?",
    answer:
      'Segnala consolidamento, stabilità lavorativa o personale, protezione autorevole e gestione concreta.',
  },
  {
    id: 6,
    question:
      'Nel mazzo Waite-Smith, su quale tipo di struttura siede L\'Imperatore?',
    answer:
      'Su un imponente trono di pietra decorato con quattro teste di ariete scolpite.',
  },
  {
    id: 7,
    question:
      'Nel mazzo Waite-Smith, cosa simboleggiano le teste d\'ariete presenti sul trono de L\'Imperatore?',
    answer:
      'La solidità inamovibile, la tenacia, l\'autorità e il legame con il segno zodiacale dell\'Ariete.',
  },
  {
    id: 8,
    question:
      'Qual è il significato simbolico dell\'armatura metallica indossata da L\'Imperatore sotto la veste?',
    answer:
      'Rappresenta la protezione dei propri confini, la prontezza difensiva e la tutela del proprio regno.',
  },
  {
    id: 9,
    question:
      'Nel mazzo Waite-Smith, quale oggetto tiene L\'Imperatore nella mano destra?',
    answer: 'Uno scettro ad ankh (la croce ansata della vita).',
  },
  {
    id: 10,
    question:
      'Cosa simboleggia lo scettro ad ankh impugnato da L\'Imperatore?',
    answer: 'Il potere di preservare la vita e la saggezza.',
  },
  {
    id: 11,
    question:
      'Qual è il significato simbolico del globo dorato tenuto nella mano sinistra de L\'Imperatore?',
    answer: 'Rappresenta la sovranità e il controllo pratico sul piano fisico.',
  },
  {
    id: 12,
    question:
      'Nel mazzo Waite-Smith, cosa simboleggia il paesaggio montuoso e roccioso alle spalle de L\'Imperatore?',
    answer:
      'La fermezza dei principi, la chiarezza razionale e la capacità di resistere alle sfide mediante la disciplina.',
  },
  {
    id: 13,
    question:
      'Nel contesto della crescita personale, quale lavoro interiore richiede la carta de L\'Imperatore?',
    answer:
      'Sviluppare l\'autodisciplina e definire confini più chiari verso l\'esterno.',
  },
  {
    id: 14,
    question:
      'In ambito lavorativo, quale comportamento promuove l\'archetipo de L\'Imperatore (IV)?',
    answer:
      'L\'organizzazione metodica, la pianificazione delle risorse e l\'eliminazione dell\'improvvisazione.',
  },
  {
    id: 15,
    question:
      'Nelle relazioni interpersonali, come si manifesta la gestione sana dei confini secondo L\'Imperatore?',
    answer:
      'Comunicando i propri limiti in modo fermo ma calmo per garantire rispetto e stabilità.',
  },
  {
    id: 16,
    question:
      'Affinché l\'abbondanza espansiva dell\'Imperatrice (III) diventi duratura, L\'Imperatore (IV) apporta _____ e _____.',
    answer: 'metodo; confini',
  },
  {
    id: 17,
    question:
      'Qual è il rischio evolutivo o la deriva negativa associata all\'energia de L\'Imperatore in una stesa?',
    answer:
      'La rigidità, il controllo eccessivo, l\'inflessibilità e l\'autoritarismo.',
  },
  {
    id: 18,
    question:
      'Quale lama segue L\'Imperatore (IV) nel percorso didattico dei Tarocchi?',
    answer: 'Il Papa (V).',
  },
  {
    id: 19,
    question:
      'Quale nuova dimensione introduce la carta successiva, Il Papa (V), rispetto alla stabilità materiale de L\'Imperatore?',
    answer:
      'La dimensione del patto etico, della guida e della trasmissione dei valori spirituali.',
  },
];

export const L_IMPERATORE_FLASHCARD_DECK: CourseModuleFlashcardDeck = {
  courseSlug: 'arcani-maggiori',
  /** Distinct from module-end seals (`01` / `04`) — section-scoped deck. */
  moduleNumber: '01-l-imperatore',
  title: "Sigillo di apprendimento · L'Imperatore",
  subtitle:
    "Ripassa L'Imperatore (IV) subito dopo la scheda visiva: struttura, simboli e chiave previsionale.",
  cards: L_IMPERATORE_SECTION_FLASHCARDS,
};

const INLINE_FLASHCARD_DECKS: Record<
  InlineFlashcardSectionId,
  CourseModuleFlashcardDeck
> = {
  'il-matto': IL_MATTO_FLASHCARD_DECK,
  'il-bagatto': IL_BAGATTO_FLASHCARD_DECK,
  'la-papessa': LA_PAPESSA_FLASHCARD_DECK,
  'l-imperatrice': L_IMPERATRICE_FLASHCARD_DECK,
  'l-imperatore': L_IMPERATORE_FLASHCARD_DECK,
};

export function getFlashcardDeck(
  courseSlug: string,
  moduleNumber: string
): CourseModuleFlashcardDeck | null {
  return (
    FLASHCARD_DECKS.find(
      (d) => d.courseSlug === courseSlug && d.moduleNumber === moduleNumber
    ) ?? null
  );
}

/** Section seal embedded mid-dispensa via `{{sigillo:<id>}}`. */
export function getInlineFlashcardDeck(
  sectionId: string
): CourseModuleFlashcardDeck | null {
  return INLINE_FLASHCARD_DECKS[sectionId as InlineFlashcardSectionId] ?? null;
}

/** Strip embed markers from plain-text downloads / exports. */
export function stripFlashcardEmbedMarkers(markdown: string): string {
  return markdown
    .replace(/^\{\{(?:sigillo|scheda-visiva):[\w-]+\}\}\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n');
}

