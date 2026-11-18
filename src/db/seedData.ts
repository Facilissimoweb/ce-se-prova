import { ARCANI_MAGGIORI_DISPENSE } from '../data/courses/arcaniMaggioriDispense.ts';

export interface CourseSeedEntry {
  slug: 'arcani-maggiori' | 'arcani-minori' | 'metodi-stesura';
  title: string;
  subtitle: string;
  description: string;
  priceEur: number;
  stripePriceId: string;
  lessonsCount: number;
  totalHours: string;
  levelLabel: string;
  sortOrder: number;
  dispense: {
    moduleNumber: string;
    title: string;
    subtitle: string;
    format: string;
    readingMinutes: number;
    keyTakeaways: string[];
    contentMarkdown: string;
  }[];
}

export const COURSE_SEED_CATALOG: CourseSeedEntry[] = [
  {
    slug: 'arcani-maggiori',
    title: 'Arcani Maggiori',
    subtitle: 'Primo Step · Tre Settenari da 0 a XXI · Presente e Previsione',
    description:
      'Dispensa formativa completa del Primo Step: mappa dei Tre Settenari, studio dei 22 Trionfi dal Matto al Mondo, lettura in chiave previsionale ed esercizi di verifica.',
    priceEur: 190,
    stripePriceId:
      process.env.STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI ||
      'STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI',
    lessonsCount: 12,
    totalHours: '8h 30m video',
    levelLabel: 'Livello Base e Intermedio',
    sortOrder: 1,
    dispense: ARCANI_MAGGIORI_DISPENSE,
  },
  {
    slug: 'arcani-minori',
    title: 'Arcani Minori',
    subtitle: 'I Quattro Semi, Numerologia 1–10 e Carte di Corte',
    description:
      'Dall’intuizione alla precisione quotidiana: padroneggia i 56 Arcani Minori per leggere tempi, persone coinvolte, dinamiche lavorative, sentimentali e materiali.',
    priceEur: 210,
    stripePriceId:
      process.env.STRIPE_PRICE_ID_CORSO_ARCANI_MINORI ||
      'STRIPE_PRICE_ID_CORSO_ARCANI_MINORI',
    lessonsCount: 14,
    totalHours: '9h 45m video',
    levelLabel: 'Livello Intermedio',
    sortOrder: 2,
    dispense: [
      {
        moduleNumber: '01',
        title: 'Atlante dei Quattro Semi ed Elementi',
        subtitle: 'Bastoni, Coppe, Spade e Denari nella vita concreta',
        format: 'Atlante PDF + Schede Elementali',
        readingMinutes: 20,
        keyTakeaways: [
          'Riconoscere a colpo d’occhio la prevalenza di un seme nella stesa.',
          'Corrispondenza tra Elemento, stagione previsionale e velocità degli eventi.',
          'Compensare un seme assente per leggere ciò che manca nella situazione.',
        ],
        contentMarkdown: `## I Quattro Semi: La Trama del Quotidiano

Se gli Arcani Maggiori segnano i grandi capitoli del destino, i 56 Arcani Minori mostrano come gli eventi prendono forma giorno per giorno.

### Quadro Elementale
- **Bastoni (Fuoco · Primavera)**: iniziativa, impresa, passione, spostamenti e ritmo rapido.
- **Coppe (Acqua · Estate)**: legami affettivi, ascolto, famiglia, sensibilità e fiducia.
- **Spade (Aria · Autunno)**: pensiero strategico, decisioni nette, confini, documenti e chiarezza verbale.
- **Denari (Terra · Inverno)**: lavoro stabile, entrate economiche, casa, salute quotidiana e maturazione lenta.`,
      },
      {
        moduleNumber: '02',
        title: 'Numerologia dall’Asso al Dieci per Seme',
        subtitle: 'Leggere i gradi di sviluppo di ogni progetto o legame',
        format: 'Dispensa Numerologica PDF',
        readingMinutes: 26,
        keyTakeaways: [
          'Assi e Due: nascita dell’impulso e prima scelta relazionale o operativa.',
          'Cinque e Sette: snodi di verifica, attrito costruttivo e perseveranza.',
          'Nove e Dieci: raccolta autonoma e compimento di un intero ciclo.',
        ],
        contentMarkdown: `## La Scala Numerica nei Tarocchi Minori

Comprendere la logica dei numeri da 1 a 10 evita di dover memorizzare meccanicamente 40 significati isolati.

### Le Fasi del Ciclo 1–10
- **1 (Asso)**: seme puro, occasione nuova nel dominio del seme.
- **2 – 3**: dualità/accordo (2) e prima espansione visibile (3).
- **4**: consolidamento, pausa protettiva o struttura stabile.
- **5**: sfida dinamica, confronto o perdita di un vecchio equilibrio necessario a crescere.
- **6**: armonia ritrovata, scambio equo, passaggio di transizione.
- **7 – 8**: prova di discernimento (7) e accelerazione/maestria (8).
- **9 – 10**: culmine individuale (9) e saturazione/nuovo inizio del ciclo (10).`,
      },
      {
        moduleNumber: '03',
        title: 'Le 16 Figure di Corte: Ritratti e Ruoli',
        subtitle: 'Fanti, Cavalieri, Regine e Re nella lettura reale',
        format: 'Schede Personaggi PDF',
        readingMinutes: 24,
        keyTakeaways: [
          'Distinguere quando una Figura indica una persona esterna o una qualità interiore.',
          'I Fanti come messaggi imminenti, studi o notizie in arrivo.',
          'Cavalieri (movimento), Regine (cura e padronanza interna) e Re (autorità).',
        ],
        contentMarkdown: `## Decifrare le Figure di Corte Senza Ambiguità

Le Carte di Corte rappresentano spesso il punto più temuto da chi inizia: in questa dispensa le trasformiamo in alleate chiarissime.

### I Quattro Ranghi
1. **Fanti**: principianti curiosi, messaggi scritti, convocazioni o proposte fresche.
2. **Cavalieri**: movimento in atto, arrivi, cambi rapidi di stato (Spade/Bastoni velocissimi; Coppe romantico; Denari costante).
3. **Regine**: governo ricettivo, intelligenza emotiva o pratica già maturata.
4. **Re**: decisione responsabile, guida professionale, consolidamento di posizione.`,
      },
      {
        moduleNumber: '04',
        title: 'Integrazione Maggiori + Minori e Tempistiche',
        subtitle: 'Calibrare settimane, mesi e azioni concrete nelle previsioni',
        format: 'Protocollo Previsionale PDF',
        readingMinutes: 22,
        keyTakeaways: [
          'Usare gli Arcani Minori come lente di dettaglio attorno a un Arcano Maggiore.',
          'Indicatori di tempo rapido (Bastoni/Spade) vs maturazione graduale (Coppe/Denari).',
          'Sintesi di stese miste su temi lavorativi e relazionali.',
        ],
        contentMarkdown: `## La Lettura Integrata a 78 Carte

Un Arcano Maggiore indica *che cosa* sta maturando a livello profondo; l'Arcano Minore adiacente specifica *come* e *in quali tempi* si manifesta.

### Esempio di Lettura Combinata
- **Il Sole + Asso di Denari**: opportunità concreta di contratto, nuova entrata economica o avvio solido entro poche settimane.
- **La Giustizia + Tre di Spade**: chiarezza necessaria dopo una parola non detta; l'equilibrio torna scegliendo trasparenza.`,
      },
    ],
  },
  {
    slug: 'metodi-stesura',
    title: 'Metodi di Stesura',
    subtitle: 'Architetture di Lettura, Sintesi ed Etica del Consulto',
    description:
      'Dalla domanda alla narrazione coerente: impara a scegliere la geometria di stesa più adatta, collegare le carte tra loro e condurre un consulto professionale.',
    priceEur: 240,
    stripePriceId:
      process.env.STRIPE_PRICE_ID_CORSO_METODI_STESURA ||
      'STRIPE_PRICE_ID_CORSO_METODI_STESURA',
    lessonsCount: 10,
    totalHours: '7h 30m video',
    levelLabel: 'Livello Avanzato & Pratica',
    sortOrder: 3,
    dispense: [
      {
        moduleNumber: '01',
        title: 'L’Arte della Domanda e Patto Deontologico',
        subtitle: 'Trasformare quesiti chiusi in domande generative e verificabili',
        format: 'Guida Operativa PDF',
        readingMinutes: 18,
        keyTakeaways: [
          'Perché evitare domande binarie rigide (“sì/no”) che spengono il dialogo.',
          'Struttura del patto iniziale con il consultante secondo la Legge 4/2013.',
          'Rituale sobrio di centratura prima di estrarre le carte.',
        ],
        contentMarkdown: `## Prima delle Carte: Formulare la Domanda Giusta

La precisione di una stesa nasce prima ancora di mescolare il mazzo: una domanda confusa produce risposte confuse.

### Riformulazione Pratica
- **Invece di**: "Andrà bene il progetto?"
- **Formula**: "Quali risorse sostengono questo progetto oggi e quale direzione evolutiva mostrano i prossimi tre mesi?"

### Apertura del Consulto
Spiegare in modo sobrio che la lettura illumina il presente e traccia le tendenze future rispettando sempre la libertà di azione della persona crea immediatamente fiducia e serenità.`,
      },
      {
        moduleNumber: '02',
        title: 'Stese Essenziali (3 e 5 Carte) e Linea Temporale',
        subtitle: 'Schemi rapidi ad alta leggibilità per consulti da 45 minuti',
        format: 'Quaderno Schemi PDF',
        readingMinutes: 20,
        keyTakeaways: [
          'Stesa a 3 carte: Radice · Nodo Attuale · Tendenza Futura.',
          'Stesa del Bivio a 5 carte per confrontare due scelte lavorative o affettive.',
          'Evitare la sovrapposizione di carte extra non necessarie.',
        ],
        contentMarkdown: `## Geometrie Essenziali ad Alta Chiarezza

Non serve estrarre dieci carte quando una domanda chiede decisione immediata.

### 1. Stesa a 3 Carte (Presente → Futuro)
1. Stato attuale e radice emotiva/pratica.
2. Ostacolo o leva decisiva del momento.
3. Direzione previsionale più probabile e consiglio operativo.

### 2. Stesa del Bivio (5 Carte)
Carta 1 al centro (il consultante), poi due rami paralleli (2-3 per l'Opzione A, 4-5 per l'Opzione B) per confrontare serenamente fatiche e frutti di ciascuna scelta.`,
      },
      {
        moduleNumber: '03',
        title: 'La Croce Celtica a 10 Carte nel Metodo Tarot Italia',
        subtitle: 'Lettura stratificata di contesto, influenze e sviluppo futuro',
        format: 'Mappa Posizioni PDF + Caso Reale',
        readingMinutes: 30,
        keyTakeaways: [
          'Significato esatto delle 6 posizioni della Croce centrale e delle 4 del Bastone.',
          'Come leggere la Carta 2 (l’attraversamento) non solo come blocco ma come stimolo.',
          'Collegare la Posizione 6 (futuro prossimo) alla Posizione 10 (esito di ciclo).',
        ],
        contentMarkdown: `## La Croce Celtica: Architettura Classica

La Croce Celtica rimane lo strumento più completo per sviscerare una questione articolata in un consulto da 60 minuti.

### La Croce (Posizioni 1–6)
1. Il cuore del presente.
2. Ciò che attraversa o sfida la situazione.
3. L'obiettivo consapevole.
4. La radice profonda / memoria inconscia.
5. Il passato recente che si sta chiudendo.
6. Il futuro prossimo in avvicinamento.

### Il Bastone Verticale (Posizioni 7–10)
7. Atteggiamento del consultante · 8. Ambiente e persone attorno · 9. Timori o attese · 10. Sintesi evolutiva finale.`,
      },
      {
        moduleNumber: '04',
        title: 'La Ruota delle 12 Case e Sintesi Scritta Finale',
        subtitle: 'Mappatura annuale completa e restituzione professionale',
        format: 'Template Sintesi + Ruota 12 Case',
        readingMinutes: 25,
        keyTakeaways: [
          'Distribuire le 12 aree di vita (identità, risorse, casa, amore, lavoro, visione).',
          'Individuare le carte ponte che collegano ambiti distanti.',
          'Redigere la sintesi scritta post-consulto chiara, empatica e senza tecnicismi inutili.',
        ],
        contentMarkdown: `## La Ruota Annuale e l'Arte della Restituzione

Nella sessione integrata da 90 minuti la Ruota delle 12 Case offre una bussola completa per i dodici mesi successivi.

### Struttura della Sintesi Finale
1. **Filo Rosso**: il tema centrale emerso trasversalmente tra le carte.
2. **Punti di Forza**: le risorse già attive su cui appoggiarsi subito.
3. **Snodi Previsionali**: i mesi o passaggi chiave che richiedono attenzione o slancio.
4. **Tre Domande Maieutiche**: spunti concreti che il consultante porta con sé dopo l'incontro.`,
      },
    ],
  },
];
