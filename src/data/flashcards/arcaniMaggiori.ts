/**
 * ENN-99 — Sigillo di apprendimento · Arcani Maggiori
 * Mapping: course slug `arcani-maggiori`, dispensa moduleNumber `01`
 * (prima dispensa del primo percorso). Deck fornito da Maria (CSV Q/A).
 * Contenuto in-repo: nessuna tabella DB.
 *
 * ENN-113 — Sigillo sezione Il Matto (14 carte CSV Maria), inline dopo
 * la scheda «### 0. Il Matto» in Dispensa 01, dopo `{{scheda-visiva:il-matto}}`
 * (marker `{{sigillo:il-matto}}` — ENN-113 / ordine ENN-114).
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
export type InlineFlashcardSectionId = 'il-matto';

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

const INLINE_FLASHCARD_DECKS: Record<
  InlineFlashcardSectionId,
  CourseModuleFlashcardDeck
> = {
  'il-matto': IL_MATTO_FLASHCARD_DECK,
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

