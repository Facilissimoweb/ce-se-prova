/**
 * ENN-106 — Approfondimenti Terzo Settenario (XV–XXI).
 * Sorgente: Maria Teresa Rogani (Area Personale only).
 */

export interface ApprofondimentoField {
  label: string;
  body: string;
}

export interface ApprofondimentoNodo {
  number: string;
  title: string;
  fields: ApprofondimentoField[];
  applications: { title: string; body: string }[];
}

export interface ApprofondimentoArcano {
  roman: string;
  name: string;
  body: string;
}

export interface ApprofondimentoArcGroup {
  number: string;
  title: string;
  cards: ApprofondimentoArcano[];
}

export const APPROFONDIMENTI_TERZO_SETTENARIO = {
  kicker: 'Area Riservata · Arcani Maggiori',
  title: 'Approfondimenti Terzo Settenario',
  subtitle: 'Carte XV – XXI · Padronanza, liberazione e compiutezza',
  intro: [
    'Il Terzo Settenario (Carte XV – XXI) rappresenta la fase più avanzata dell\'intero percorso evolutivo dei Tarocchi: la padronanza spirituale, la liberazione dai vincoli e la compiutezza nel mondo.',
    'Dopo aver strutturato l\'identità nel Primo Settenario e affrontato la prova etica nel Secondo, l\'individuo si misura qui con le forze profonde della psiche, spezzando le illusioni per giungere alla realizzazione totale.',
  ],
  nodiLead:
    'Ecco tre nodi fondamentali del percorso, tradotti da concetti archetipici ad azioni concrete e situazioni di vita quotidiana.',
  nodi: [
    {
      number: '1',
      title:
        'Il Nodo dell\'Azione: "Sindrome da Foglio Bianco" e Pianificazione Infinita',
      fields: [
        {
          label:
            'Il Concetto Alto (0. Il Matto, I. Il Bagatto, II. La Papessa)',
          body: 'Rappresenta la tensione tra il salto nell\'ignoto senza garanzie, l\'iniziativa pratica immediata con le risorse a disposizione e la gestazione silenziosa che rischia di trasformarsi in accumulo indefinito di informazioni.',
        },
        {
          label: 'La Traduzione Pratica',
          body: 'Si manifesta quando si rinvia un progetto perché "non ci si sente pronti", continuando a studiare, fare ricerca o cercare rassicurazioni (polarità Papessa) invece di mettere alla prova il proprio talento sul campo (polarità Bagatto).',
        },
      ],
      applications: [
        {
          title: 'Se prevale la paralisi',
          body: 'Applica la regola della "minima azione di coraggio" del Matto: individua un\'azione pratica minima che puoi compiere oggi stesso senza pianificare nei dettagli e senza chiedere garanzie logiche.',
        },
        {
          title: 'Test decisionale a due opzioni',
          body: 'Di fronte a un dubbio, esegui il test di alternanza: stabilisci se la situazione richiede un\'azione pragmatica da chiudere entro 24 ore (Bagatto) o 3 giorni di silenzio e ascolto interiore prima di decidere (Papessa).',
        },
      ],
    },
    {
      number: '2',
      title:
        'Il Nodo della Stagnazione: La Sosta Forzata e la Potatura dei Rami Secchi',
      fields: [
        {
          label: 'Il Concetto Alto (XII. L\'Appeso, XIII. La Morte)',
          body: 'Il passaggio dalla sosta volontaria o subìta — che richiede di capovolgere il punto di vista e rinunciare al controllo rigido — al taglio netto che elimina ciò che è obsoleto per consentire la rinascita.',
        },
        {
          label: 'La Traduzione Pratica',
          body: 'È la situazione classica in cui un progetto si blocca, un lavoro ristagna o una relazione non progredisce. L\'errore comune è accanirsi cercando di forzare gli eventi con la fretta.',
        },
      ],
      applications: [
        {
          title: 'Cambio di prospettiva (L\'Appeso)',
          body: 'Considera la pausa non come una punizione o un fallimento, ma come uno spazio per "rendere sacro" il tempo. Chiediti: "Se guardassi questo blocco al contrario, quale priorità sto ignorando?".',
        },
        {
          title: 'Potatura consapevole (La Morte)',
          body: 'Individua i "rami secchi" (abitudini, impegni o legami obsoleti) che stanno assorbendo energia senza produrre valore. Accettare la chiusura di una fase accumulata libera lo spazio necessario per far emergere il nuovo.',
        },
      ],
    },
    {
      number: '3',
      title:
        'Il Nodo delle "Catene Dorate": Falsa Sicurezza e Liberazione Catartica',
      fields: [
        {
          label: 'Il Concetto Alto (XV. Il Diavolo, XVI. La Torre)',
          body: 'Il confronto con le dipendenze, le dinamiche di potere e gli attaccamenti materiali consenzienti, seguito dalla scossa improvvisa che abbatte le strutture rigide non più autentiche.',
        },
        {
          label: 'La Traduzione Pratica',
          body: 'Rappresenta il momento in cui si rimane incastrati in una situazione comoda o redditizia (un lavoro sicuro ma soffocante, una routine dipendente) per paura di perdere il controllo o il vantaggio materiale.',
        },
      ],
      applications: [
        {
          title: 'Diagnosi dell\'Ombra (Il Diavolo)',
          body: 'Riconosci dove stai cedendo la tua autonomia in cambio di sicurezza o profitto immediato, identificando i vincoli a cui stai acconsentendo per timore.',
        },
        {
          title: 'Gestione della crisi (La Torre)',
          body: 'Se la struttura rigida crolla all\'improvviso (un imprevisto lavorativo o una rottura), evita di tentare di ricostruire le vecchie certezze illusorie. Accogli la rottura come una liberazione catartica indispensabile per ricostruire su basi di reale autenticità.',
        },
      ],
    },
  ] satisfies ApprofondimentoNodo[],
  arcGroupsLead:
    'Le tre tappe del Terzo Settenario, dalla rottura delle illusioni all\'integrazione totale.',
  arcGroups: [
    {
      number: '1',
      title: 'La Rottura delle Catene e il Crollo delle Illusioni (XV – XVI)',
      cards: [
        {
          roman: 'XV',
          name: 'Il Diavolo',
          body: 'Mette l\'allievo a confronto diretto con la propria Ombra, le passioni viscerali, i condizionamenti materiali, le dipendenze e i falsi poteri a cui ci si assoggetta in modo consenziente. In chiave pratica, segnala dinamiche di manipolazione o attaccamenti tossici da cui è necessario riprendere il controllo.',
        },
        {
          roman: 'XVI',
          name: 'La Torre',
          body: 'Interviene con una folgore liberatoria che fa crollare le strutture rigide e le false certezze costruite sull\'illusione. Sebbene vissuta come una crisi dirompente, rappresenta una rottura indispensabile per spezzare la stagnazione e ripartire dall\'autenticità.',
        },
      ],
    },
    {
      number: '2',
      title: 'La Guarigione e la Traversata dell\'Inconscio (XVII – XVIII)',
      cards: [
        {
          roman: 'XVII',
          name: 'Le Stelle',
          body: 'Portano la grazia, la speranza e la guarigione dopo la tempesta della Torre. Rappresentano la connessione diretta con il proprio talento originario, infondendo fiducia nel futuro e ispirazione creativa.',
        },
        {
          roman: 'XVIII',
          name: 'La Luna',
          body: 'Immerge il viandante nel regno dell\'inconscio, dei sogni e delle paure ancestrali. Insegna a navigare le nebbie emotive e le illusioni ascoltando l\'intuito profondo, senza farsi paralizzare dalle ansie.',
        },
      ],
    },
    {
      number: '3',
      title: 'La Luce, il Risveglio e l\'Integrazione Totale (XIX – XXI)',
      cards: [
        {
          roman: 'XIX',
          name: 'Il Sole',
          body: 'Rappresenta la verità svelata, la gioia radiosa, la trasparenza e la realizzazione visibile. Dissipa ogni ombra, garantendo chiarezza nei rapporti, vitalità e successo pubblico.',
        },
        {
          roman: 'XX',
          name: 'Il Giudizio',
          body: 'Suona la chiamata alla consapevolezza e al risveglio spirituale. Invita al perdono e alla liberazione dai vecchi giudizi limitanti, permettendo di rinascere a una nuova vita.',
        },
        {
          roman: 'XXI',
          name: 'Il Mondo',
          body: 'Costituisce il coronamento trionfante e la compiutezza del Grande Opera. Simboleggia l\'integrazione armonica di tutte le tappe vissute nei tre settenari e il compimento perfetto della ricerca.',
        },
      ],
    },
  ] satisfies ApprofondimentoArcGroup[],
  sintesi: {
    title: 'Sintesi Pratica per il Consultante',
    body: 'Nella pratica delle letture, le carte del Terzo Settenario indicano la fase di svolta e realizzazione. Segnalano che il consultante non sta più solo costruendo o elaborando le basi, ma sta affrontando il nodo finale per liberare definitivamente il proprio potenziale o raccogliere i frutti di un intero ciclo di vita.',
  },
} as const;
