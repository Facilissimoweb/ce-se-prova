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
    subtitle: 'Il Viaggio Archetipico da 0 a XXI · Presente e Previsione',
    description:
      'Studio approfondito dei 22 Trionfi: iconografia tradizionale, struttura numerologica, lettura in luce e ombra e interpretazione previsionale delle grandi svolte.',
    priceEur: 190,
    stripePriceId: 'STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI',
    lessonsCount: 12,
    totalHours: '8h 30m video',
    levelLabel: 'Livello Base e Intermedio',
    sortOrder: 1,
    dispense: [
      {
        moduleNumber: '01',
        title: 'Struttura del Mazzo e Primo Settenario (0 – VII)',
        subtitle: 'Dal potenziale originario del Matto alla direzione del Carro',
        format: 'Dispensa PDF + Scheda Archetipica',
        readingMinutes: 22,
        keyTakeaways: [
          'Il Matto (0) come soglia fuori dal numero e principio di libertà.',
          'Polarità attiva e ricettiva tra Il Bagatto (I) e La Papessa (II).',
          'Lettura previsionale del Carro (VII): accelerazione, spostamenti e vittoria disciplinata.',
        ],
        contentMarkdown: `## Il Primo Settenario: Identità e Radicamento nel Mondo

I primi sette Arcani Maggiori descrivono la formazione della coscienza individuale e la capacità di agire nella realtà concreta.

### 1. Il Matto (0) e l'inizio non condizionato
Quando compare in lettura, segnala uno slancio genuino, una partenza imminente o un salto di fiducia ancora privo di schema rigido. In chiave previsionale anticipa un cambiamento improvviso di rotta o una novità che richiede coraggio.

### 2. La diade creativa: Bagatto (I) e Papessa (II)
- **Il Bagatto**: strumenti sul tavolo, iniziativa immediata, talento da mettere all'opera nei prossimi giorni.
- **La Papessa**: gestazione silenziosa, verità intuita prima che detta, attesa fertile.

### 3. Imperatrice (III), Imperatore (IV), Papa (V), Innamorati (VI) e Carro (VII)
Dal fiorire creativo alla struttura, fino al patto etico (V), alla scelta del cuore (VI) e al movimento deciso del Carro (VII), che in previsione indica sblocco rapido di trattative o viaggi.`,
      },
      {
        moduleNumber: '02',
        title: 'Secondo Settenario: Prove Interiori e Destino (VIII – XIV)',
        subtitle: 'Giustizia, Eremita, Ruota della Fortuna e Temperanza',
        format: 'Dispensa PDF + Mappa Cicli',
        readingMinutes: 25,
        keyTakeaways: [
          'La Giustizia (VIII/XI) e il bilancio oggettivo di accordi e contratti.',
          'L’Eremita (IX) come ricerca della lanterna interiore e maturità dei tempi.',
          'La Ruota della Fortuna (X) e la Temperanza (XIV): leggere il cambio di stagione.',
        ],
        contentMarkdown: `## Il Secondo Settenario: Il Confronto con la Legge del Tempo

In questa fascia centrale degli Arcani Maggiori il consultante impara a distinguere ciò che dipende dalla volontà da ciò che appartiene ai cicli più ampi.

### La Giustizia e La Forza
La Giustizia chiede chiarezza contrattuale e coerenza morale; sul piano futuro anticipa firme, verifiche o riequilibri meritati. La Forza sostituisce la durezza con la padronanza calma dell'istinto.

### L'Eremita (IX) e La Ruota (X)
- **L'Eremita**: invita a non forzare i tempi; mostra un periodo di discernimento che precede una decisione stabile.
- **La Ruota della Fortuna**: segnala una svolta esterna imminente, un ritorno ciclico o un'opportunità che chiede prontezza.

### Appeso (XII), Arcano XIII e Temperanza (XIV)
L'Appeso sospende l'azione per cambiare sguardo; l'Arcano XIII chiude ciò che ha esaurito la sua funzione; la Temperanza ricompone gli opposti con misura e guarigione graduale.`,
      },
      {
        moduleNumber: '03',
        title: 'Terzo Settenario: Ombra, Luce e Compimento (XV – XXI)',
        subtitle: 'Dal Diavolo e la Torre fino alle Stelle, Sole e Mondo',
        format: 'Dispensa PDF + Atlante Simbolico',
        readingMinutes: 28,
        keyTakeaways: [
          'Leggere Il Diavolo (XV) e La Torre (XVI) senza fatalismo ma come verità liberatorie.',
          'Le Stelle (XVII) e La Luna (XVIII): discernere speranza autentica da proiezione.',
          'Il Sole (XIX), Il Giudizio (XX) e Il Mondo (XXI) nelle previsioni di realizzazione.',
        ],
        contentMarkdown: `## Il Terzo Settenario: La Trasformazione Profonda

Gli ultimi sette Arcani conducono oltre i legami dell'ego verso una visione aperta e integrata.

### Ombra e Rottura Costruttiva (XV – XVI)
Il Diavolo porta alla luce attaccamenti, desideri intensi o accordi squilibrati. La Torre non punisce: abbatte costruzioni ormai fragili per liberare spazio autentico nel futuro prossimo.

### Le Luci del Cielo (XVII – XIX)
- **Le Stelle**: protezione, vocazione limpida, fidatezza dei progetti a medio termine.
- **La Luna**: sogni, memorie familiari, zone non ancora chiarite dove muoversi con cautela.
- **Il Sole**: chiarezza meridiana, riconoscimento pubblico, intesa affettiva e riuscita concreta.

### Rinascita e Sintesi (XX – XXI)
Il Giudizio annuncia una chiamata o notizia decisiva; Il Mondo sancisce il compimento di un ciclo e l'apertura di un nuovo orizzonte.`,
      },
      {
        moduleNumber: '04',
        title: 'Dialoghi tra Arcani e Formulazione Previsionale Etica',
        subtitle: 'Combinazioni binarie, libero arbitrio e codice deontologico',
        format: 'Quaderno Esercizi + Casi Studio',
        readingMinutes: 20,
        keyTakeaways: [
          'Come il secondo Arcano orienta la direzione evolutiva del primo.',
          'Linguaggio deontologico per esprimere scenari futuri senza togliere autonomia.',
          'Protocollo di verifica su amore, lavoro e scelte personali.',
        ],
        contentMarkdown: `## Combinare Due Arcani Maggiori in Chiave Previsionale

Una carta isolata descrive un archetipo; due carte accostate mostrano un movimento nel tempo.

### Regola della Direzione (Carta A → Carta B)
1. **Carta A** fotografa la radice attiva nel presente.
2. **Carta B** mostra dove converge l'energia nei mesi successivi se il consultante mantiene la rotta.

### Esempio Pratico
- **Eremita + Carro**: dopo una fase di studio riservato o attesa riflessiva, arriva una ripartenza veloce con obiettivi definiti.
- **Torre + Stelle**: una ristrutturazione improvvisa libera risorse per un progetto più fedele alla propria vocazione.

### Confine Etico (Legge 4/2013)
La previsione olistica traccia tendenze reali e punti di snodo lasciando sempre al consultante la responsabilità delle proprie scelte; restano escluse diagnosi mediche o pronostici sanitari.`,
      },
    ],
  },
  {
    slug: 'arcani-minori',
    title: 'Arcani Minori',
    subtitle: 'I Quattro Semi, Numerologia 1–10 e Carte di Corte',
    description:
      'Dall’intuizione alla precisione quotidiana: padroneggia i 56 Arcani Minori per leggere tempi, persone coinvolte, dinamiche lavorative, sentimentali e materiali.',
    priceEur: 210,
    stripePriceId: 'STRIPE_PRICE_ID_CORSO_ARCANI_MINORI',
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
    stripePriceId: 'STRIPE_PRICE_ID_CORSO_METODI_STESURA',
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
