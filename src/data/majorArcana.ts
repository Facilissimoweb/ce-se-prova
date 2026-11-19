import type { ArcanaCard } from '../types/handoff';

/**
 * I 22 Arcani Maggiori completi per il dialogo interattivo di Tarot Italia.
 * Ogni Arcano include lettura del presente, tendenza previsionale del futuro,
 * declinazioni su relazioni e lavoro (lettura + futuro + consiglio dedicati),
 * e tre domande di consapevolezza.
 */
export const MAJOR_ARCANA: ArcanaCard[] = [
  {
    id: '0-il-matto',
    number: 0,
    numeral: '0',
    name: 'Il Matto',
    archetype: 'Libertà · Salto Fiducioso · Inizio Assoluto',
    element: 'Aria · Urano',
    keywords: ['Spontaneità', 'Nuovo Ciclo', 'Fiducia', 'Imprevisto'],
    synthesis:
      'Il Matto segnala una soglia aperta: vecchi schemi non bastano più e una spinta vitale chiede di muovere il primo passo senza zavorre superflue.',
    futureTendency:
      'Nei prossimi sviluppi si profilano svolte improvvise, spostamenti o proposte fuori programma che premiano chi accetta di cambiare rotta con prontezza.',
    advice:
      'Distinguere l’impulso autentico dalla fuga: prepara l’essenziale nello zaino e poi concediti il coraggio di iniziare.',
    loveReading:
      'In amore annuncia incontri inattesi, leggerezza ritrovata o la necessità di rinnovare un legame uscendo dalla routine.',
    workReading:
      'Sul piano professionale indica l’avvio di un progetto inedito, un cambio di settore o un’idea originale ancora tutta da plasmare.',
    loveFuture:
      'In amore si profilano incontri improvvisi, una dichiarazione fuori schema o la voglia di ripartire da zero lasciando dietro dinamiche stantie.',
    workFuture:
      'Sul lavoro arrivano proposte fuori programma, un trasferimento o l’avvio di un’iniziativa autonoma che premia chi osa cambiare mestiere o metodo.',
    loveAdvice:
      'Prima di impegnarti, chiediti se stai fuggendo dalla solitudine o se stai davvero aprendo il cuore a qualcosa di nuovo.',
    workAdvice:
      'Prepara un piano minimo concreto (budget, tempi, contatti) e poi fai il primo passo professionale senza aspettare garanzie totali.',
    maieuticQuestions: [
      'Quale passo nuovo sto rimandando solo per paura di non avere tutte le garanzie?',
      'Cosa posso lasciare andare oggi per sentirmi più leggero nel prossimo ciclo?',
      'Dove la mia spontaneità sta cercando spazio per esprimersi?',
    ],
  },
  {
    id: '1-il-bagatto',
    number: 1,
    numeral: 'I',
    name: 'Il Bagatto',
    archetype: 'Volontà · Iniziativa · Maestria Nascente',
    element: 'Aria · Mercurio',
    keywords: ['Azione', 'Talento', 'Strumenti', 'Inizio'],
    synthesis:
      'Sul tavolo hai già tutti gli strumenti necessari: è il momento di trasformare un’intuizione o un desiderio in un gesto concreto e visibile.',
    futureTendency:
      'Le prossime settimane portano sblocchi rapidi, contatti fruttuosi e l’opportunità concreta di avviare qualcosa che dipende in prima persona dalla tua iniziativa.',
    advice:
      'Non disperdere energia in mille direzioni: scegli un obiettivo preciso e compi oggi la prima azione reale.',
    loveReading:
      'Segnala dialoghi chiarificatori, attrazione intellettuale e la possibilità di dare un nuovo impulso a una conoscenza o coppia.',
    workReading:
      'Favorisce trattative, colloqui, lanci di progetti autonomi e acquisizione di nuove competenze pratiche.',
    loveFuture:
      'Nelle relazioni si aprono conversazioni decisive, un messaggio che sblocca l’attesa o il primo gesto concreto che fa passare dalla simpatia all’intesa.',
    workFuture:
      'In ambito professionale arrivano colloqui, trattative o il lancio di un’iniziativa in cui conta la tua capacità di usare subito gli strumenti che hai.',
    loveAdvice:
      'Smetti di aspettare che l’altro legga nel pensiero: proponi un incontro o un chiarimento chiaro e misurabile.',
    workAdvice:
      'Scegli un obiettivo professionale preciso e compi entro quarantotto ore la prima azione reale (mail, bozza, chiamata).',
    maieuticQuestions: [
      'Quale talento o risorsa ho già sul tavolo ma non sto ancora usando?',
      'Qual è il primo gesto concreto che posso compiere entro quarantotto ore?',
      'Dove sto aspettando un permesso esterno invece di assumere la guida?',
    ],
  },
  {
    id: '2-la-papessa',
    number: 2,
    numeral: 'II',
    name: 'La Papessa',
    archetype: 'Intuizione · Silenzio · Conoscenza Velata',
    element: 'Acqua · Luna',
    keywords: ['Ascolto', 'Segreto', 'Maturazione', 'Saggezza'],
    synthesis:
      'La Papessa invita alla calma e all’osservazione interiore: non tutto ciò che conta è ancora visibile in superficie, qualcosa sta maturando nel silenzio.',
    futureTendency:
      'Il futuro prossimo rivelerà dettagli oggi nascosti, intuizioni che troveranno conferma nei fatti e tempi di attesa utili prima di esporsi.',
    advice:
      'Custodisci i tuoi progetti con discrezione e ascolta i segnali sottili prima di prendere decisioni definitive.',
    loveReading:
      'Indica sentimenti profondi ma riservati, bisogno di autenticità interiore o dinamiche non ancora dichiarate apertamente.',
    workReading:
      'Consiglia studio, ricerca, preparazione accurata dietro le quinte prima di firmare accordi o presentare un piano.',
    loveFuture:
      'In amore emergeranno sentimenti finora taciuti, un segnale discreto o la conferma che ciò che intuisci sul legame ha fondamento.',
    workFuture:
      'Sul lavoro arriveranno informazioni riservate, esiti di ricerche o tempi di preparazione utili prima di firmare o presentare in pubblico.',
    loveAdvice:
      'Non forzare dichiarazioni premature: ascolta cosa si muove sotto le parole e custodisci ciò che ancora non è maturo da condividere.',
    workAdvice:
      'Studia e prepara dietro le quinte; evita annunci o firme finché i dettagli chiave non sono chiari.',
    maieuticQuestions: [
      'Cosa intuisco già con chiarezza ma esito ancora ad ammettere a me stesso?',
      'Quale scelta merita ancora qualche giorno di riserbo e ascolto?',
      'Sto forzando i tempi in una situazione che chiede invece maturazione?',
    ],
  },
  {
    id: '3-l-imperatrice',
    number: 3,
    numeral: 'III',
    name: "L'Imperatrice",
    archetype: 'Creatività · Abbondanza · Fioritura',
    element: 'Terra · Venere',
    keywords: ['Fecondità', 'Bellezza', 'Nutrimento', 'Espressione'],
    synthesis:
      'Energia vitale in piena espansione: ciò che hai coltivato inizia a prendere forma fertile, portando calore, ispirazione e cura verso di te e gli altri.',
    futureTendency:
      'All’orizzonte si aprono sviluppi generosi, risposte positive in ambito creativo o familiare e una fase di crescita tangibile.',
    advice:
      'Nutri con costanza le tue idee e concediti piacere e bellezza senza sensi di colpa: la fertilità nasce dal benessere.',
    loveReading:
      'Annuncia complicità, affetto espresso con calore, consolidamento sentimentale o un periodo favorevole alla vita familiare.',
    workReading:
      'Ottimo presagio per attività creative, comunicazione, collaborazioni armoniose e crescita di progetti già avviati.',
    loveFuture:
      'In amore si consolida calore quotidiano, gesti di cura, progetti di famiglia o una stagione in cui l’affetto diventa tangibile e generoso.',
    workFuture:
      'Sul lavoro fioriscono collaborazioni creative, feedback positivi e crescita concreta di progetti già coltivati con costanza.',
    loveAdvice:
      'Nutri il legame con gesti quotidiani di bellezza e presenza: non dare per scontato ciò che cresce solo se curato.',
    workAdvice:
      'Dai spazio e risorse a ciò che è già creativo e produttivo, senza sacrificare benessere e ritmo sostenibile.',
    maieuticQuestions: [
      'Quale progetto o relazione sta chiedendo cura e nutrimento quotidiano?',
      'Come posso esprimere in modo più autentico la mia creatività?',
      'Cosa rende davvero fertile e vitale il mio presente?',
    ],
  },
  {
    id: '4-l-imperatore',
    number: 4,
    numeral: 'IV',
    name: "L'Imperatore",
    archetype: 'Struttura · Autorità · Stabilità',
    element: 'Fuoco · Ariete',
    keywords: ['Ordine', 'Confini', 'Responsabilità', 'Solidità'],
    synthesis:
      'L’Imperatore richiama alla concretezza, alla definizione di confini chiari e alla capacità di dare fondamenta solide a ciò che desideri costruire.',
    futureTendency:
      'Le prossime evoluzioni premiano disciplina e pianificazione: sono favoriti consolidamenti economici, ruoli di responsabilità e accordi stabili.',
    advice:
      'Trasforma le intenzioni in un metodo sostenibile, evitando però di confondere la fermezza con la rigidità.',
    loveReading:
      'Indica bisogno di sicurezza, presenza affidabile o la necessità di allentare il controllo per lasciare spazio all’ascolto.',
    workReading:
      'Sostiene leadership, organizzazione finanziaria, contratti solidi e il riconoscimento della tua autorevolezza.',
    loveFuture:
      'In amore emerge il bisogno di regole chiare nella coppia, di affidabilità reciproca o di rinegoziare chi decide e chi ascolta.',
    workFuture:
      'Sul lavoro si consolidano ruoli di responsabilità, budget, contratti stabili e riconoscimenti di leadership basati sulla disciplina.',
    loveAdvice:
      'Offri stabilità senza soffocare: definisci confini amorevoli e lascia spazio all’altro di esprimersi senza controllo eccessivo.',
    workAdvice:
      'Trasforma le intenzioni in un piano con scadenze e risorse; guida con fermezza, non con rigidità punitiva.',
    maieuticQuestions: [
      'Dove devo tracciare un confine più chiaro per proteggere la mia energia?',
      'Quale struttura pratica manca oggi al mio progetto per diventare stabile?',
      'In cosa sto esercitando un controllo eccessivo che genera tensione?',
    ],
  },
  {
    id: '5-il-papa',
    number: 5,
    numeral: 'V',
    name: 'Il Papa',
    archetype: 'Valori · Guida · Trasmissione',
    element: 'Terra · Toro',
    keywords: ['Etica', 'Insegnamento', 'Alleanza', 'Senso'],
    synthesis:
      'Il Papa invita a confrontarti con i tuoi valori profondi e a cercare una guida autorevole, un maestro o un principio etico che orienti le tue scelte.',
    futureTendency:
      'In arrivo consigli preziosi, percorsi formativi, ufficializzazioni o un chiarimento morale che scioglie un dubbio di fondo.',
    advice:
      'Rimani fedele a ciò che ritieni giusto e non temere di chiedere un confronto qualificato dove serve esperienza.',
    loveReading:
      'Parla di legami fondati su rispetto, condivisione di valori, promesse durature o ricerca di armonia spirituale.',
    workReading:
      'Favorisce docenze, consulenze, percorsi di certificazione e collaborazioni basate su fiducia e serietà.',
    loveFuture:
      'In amore si avvicina un passo di impegno condiviso — promesse, dialogo sui valori di coppia o la benedizione di un legame che chiede chiarezza etica e rispetto reciproco.',
    workFuture:
      'Sul lavoro arrivano mentorship, corsi o certificazioni, e ufficializzazioni di ruolo basate su fiducia, serietà e trasmissione di competenza.',
    loveAdvice:
      'Scegli e custodisci un legame allineato ai tuoi principi: se serve, chiedi un confronto con qualcuno di fiducia sulla relazione, non solo sul “cosa fare”.',
    workAdvice:
      'Investi in formazione qualificata e in collaborazioni etiche; non accettare scorciatoie che tradiscono ciò in cui credi professionalmente.',
    maieuticQuestions: [
      'Quale principio non negoziabile deve guidare la scelta che ho davanti?',
      'Da chi potrei accogliere un consiglio lucido e disinteressato in questo momento?',
      'Le mie azioni attuali rispecchiano davvero ciò in cui credo?',
    ],
  },
  {
    id: '6-gli-amanti',
    number: 6,
    numeral: 'VI',
    name: 'Gli Amanti',
    archetype: 'Scelta · Armonia · Risonanza del Cuore',
    element: 'Aria · Gemelli',
    keywords: ['Decisione', 'Unione', 'Desiderio', 'Coerenza'],
    synthesis:
      'Sei davanti a un bivio significativo o a un incontro che mette in gioco il cuore: l’Arcano chiede di scegliere ciò che risuona davvero con la tua verità.',
    futureTendency:
      'Il futuro vicino porta una decisione importante da sciogliere con sincerità, un’intesa significativa o una nuova alleanza affettiva e creativa.',
    advice:
      'Non decidere per compiacere o per abitudine: scegli ciò verso cui ti muovi con interezza.',
    loveReading:
      'Arcano d’elezione per intesa sentimentale, attrazione reciproca, scelte di coppia o chiarimenti decisivi del cuore.',
    workReading:
      'Indica collaborazioni basate sull’affinità oppure un bivio professionale tra due strade ugualmente allettanti.',
    loveFuture:
      'In amore arriva una scelta di cuore da prendere con sincerità: un’intesa reciproca, un sì consapevole o il chiarimento di chi vuoi davvero accanto.',
    workFuture:
      'Sul lavoro si apre un bivio tra due strade allettanti, oppure una collaborazione basata su affinità reale più che su convenienza.',
    loveAdvice:
      'Non restare a metà per paura di ferire: dichiara cosa desideri davvero nella relazione e scegli con interezza.',
    workAdvice:
      'Valuta le due opzioni professionali in base a valori e energia quotidiana, non solo a stipendio o prestigio.',
    maieuticQuestions: [
      'Tra le opzioni davanti a me, quale nasce dal desiderio autentico e quale dalla paura?',
      'Cosa significa oggi scegliere con tutto il cuore senza rimanere a metà?',
      'Quale legame o progetto merita la mia piena adesione?',
    ],
  },
  {
    id: '7-il-carro',
    number: 7,
    numeral: 'VII',
    name: 'Il Carro',
    archetype: 'Direzione · Slancio · Conquista',
    element: 'Acqua · Cancro',
    keywords: ['Avanzamento', 'Determinazione', 'Viaggio', 'Successo'],
    synthesis:
      'Il Carro porta movimento rapido e capacità di tenere le redini anche tra spinte contrastanti: la direzione è tracciata, ora conta la costanza di rotta.',
    futureTendency:
      'Nelle prossime fasi si prevedono accelerazioni decise, traguardi raggiunti, viaggi o avanzamenti concreti grazie alla tua determinazione.',
    advice:
      'Mantieni salde le redini: armonizza ragione ed emozione invece di lasciarle tirare in direzioni opposte.',
    loveReading:
      'Dinamismo, desiderio di superare ostacoli esterni insieme o uno spostamento che ravviva la relazione.',
    workReading:
      'Forte avanzamento di carriera, vittoria in una trattativa, mobilità lavorativa e risultati rapidi.',
    loveFuture:
      'Nella coppia si supera un ostacolo esterno, si decide un trasferimento insieme o si ritrova slancio dopo una fase di stallo sentimentale.',
    workFuture:
      'In carriera arrivano avanzamenti concreti, vittorie in trattative, mobilità o traguardi raggiunti grazie a determinazione e rotta chiara.',
    loveAdvice:
      'Tieni la stessa direzione emotiva: non lasciare che rabbia e tenerezza tirino la relazione in sensi opposti.',
    workAdvice:
      'Definisci la meta professionale del mese e accelera senza perdere lucidità su priorità e risorse.',
    maieuticQuestions: [
      'Verso quale meta precisa sto orientando le mie energie in questo mese?',
      'Quali due spinte interiori opposte ho bisogno di armonizzare per avanzare?',
      'Dove posso accelerare con fiducia senza perdere lucidità?',
    ],
  },
  {
    id: '8-la-giustizia',
    number: 8,
    numeral: 'VIII',
    name: 'La Giustizia',
    archetype: 'Equilibrio · Verità · Discernimento',
    element: 'Aria · Bilancia',
    keywords: ['Chiarezza', 'Equità', 'Bilancio', 'Decisione'],
    synthesis:
      'La Giustizia chiede oggettività e rettitudine: è il momento di pesare fatti, accordi e responsabilità con mente limpida, senza autoinganni.',
    futureTendency:
      'Gli sviluppi futuri portano verdetti equi, firme ufficiali, regolarizzazioni o conseguenze proporzionate alle scelte compiute.',
    advice:
      'Taglia via ciò che è ambiguo con la spada della chiarezza e ristabilisci equilibrio tra dare e ricevere.',
    loveReading:
      'Richiede sincerità reciproca, parità nei ruoli e chiarimenti netti su impegni o decisioni condivise.',
    workReading:
      'Favorisce contratti, pratiche burocratiche o legali, valutazioni meritocratiche e bilanci economici trasparenti.',
    loveFuture:
      'In amore arrivano chiarimenti netti su impegni, equità nei ruoli o decisioni condivise che chiudono zone grigie nella coppia.',
    workFuture:
      'Sul lavoro si chiudono contratti, pratiche legali o bilanci trasparenti: verdetti e firme che premiano chiarezza e merito.',
    loveAdvice:
      'Chiedi e offri parità: spezza ambiguità su cosa siete l’uno per l’altro e ristabilisci il dare-ricevere affettivo.',
    workAdvice:
      'Metti per iscritto accordi e numeri; taglia ambiguità contrattuali prima che diventino contenzioso.',
    maieuticQuestions: [
      'Sto guardando i fatti così come sono o li sto filtrando attraverso un desiderio?',
      'Dove si è creato uno squilibrio tra ciò che do e ciò che ricevo?',
      'Quale decisione netta porterebbe subito più ordine nella mia vita?',
    ],
  },
  {
    id: '9-l-eremita',
    number: 9,
    numeral: 'IX',
    name: "L'Eremita",
    archetype: 'Discernimento · Silenzio Fertile · Luce Interiore',
    element: 'Terra · Vergine',
    keywords: ['Introspezione', 'Misura', 'Autonomia', 'Prudenza'],
    synthesis:
      "L'Eremita non indica isolamento sterile, ma la scelta consapevole di sottrarsi al rumore esterno per ascoltare la propria lanterna. Invita a procedere con passo lento, onorando ciò che è essenziale.",
    futureTendency:
      'Il periodo che si apre privilegia maturazioni silenziose, risposte che emergono dalla riflessione e incontri con persone sagge o guide affidabili.',
    advice:
      'Rallenta quanto basta per vedere il prossimo passo illuminato dalla lanterna, senza pretendere di vedere subito l’intera strada.',
    loveReading:
      'Indica bisogno di spazio interiore per comprendere i propri sentimenti reali o un legame profondo, maturo e poco incline alla superficialità.',
    workReading:
      'Favorisce lavoro autonomo, ricerca, revisione strategica e scelte ponderate prima di esporsi pubblicamente.',
    loveFuture:
      'In amore matura una comprensione silenziosa dei tuoi sentimenti reali, o si approfondisce un legame adulto che non ha bisogno di rumorose prove.',
    workFuture:
      'Sul lavoro prevalgono ricerca, revisione strategica e scelte ponderate prima di esporsi: risposte che nascono dalla riflessione, non dalla fretta.',
    loveAdvice:
      'Concediti (e concedi) spazio senza chiudere la porta: ascolta cosa senti davvero prima di promettere o chiedere.',
    workAdvice:
      'Sospendi annunci pubblici e lavora in autonomia finché la prossima mossa professionale non è chiara alla tua lanterna.',
    maieuticQuestions: [
      'Dove sto cercando risposte all’esterno quando conosco già il mio passo?',
      'Quale rumore superfluo posso sospendere oggi per ascoltare con lucidità?',
      'Cosa illumina davvero la mia lanterna in questa fase di transizione?',
    ],
  },
  {
    id: '10-la-ruota-della-fortuna',
    number: 10,
    numeral: 'X',
    name: 'La Ruota della Fortuna',
    archetype: 'Ciclo · Svolta · Sincronicità',
    element: 'Fuoco · Giove',
    keywords: ['Cambiamento', 'Occasione', 'Ciclicità', 'Destino'],
    synthesis:
      'Un ciclo si chiude e un altro gira in movimento: gli eventi si mettono in moto attraverso coincidenze significative e cambi di scenario.',
    futureTendency:
      'Il futuro prossimo porta una svolta inattesa, un sblocco di situazioni stagnanti e nuove opportunità da cogliere al volo.',
    advice:
      'Resta centrato nel mozzo della ruota mentre tutto intorno gira: flessibilità e prontezza sono le tue alleate.',
    loveReading:
      'Segnala incontri karmici o inattesi, cambi di fase nella coppia o la fine di una ripetizione emotiva.',
    workReading:
      'Novità improvvise, cambi di contesto, opportunità favorevoli e necessità di adattarsi rapidamente.',
    loveFuture:
      'In amore gira una fase nuova: incontro inatteso, fine di una ripetizione emotiva o sblocco di una storia ferma da troppo tempo.',
    workFuture:
      'Sul lavoro arriva una svolta di contesto — opportunità improvvisa, cambio di scenario o sblocco di una situazione professionale stagnante.',
    loveAdvice:
      'Accogli il cambio di fase sentimentale senza aggrapparti allo schema vecchio: resta aperto a ciò che la coincidenza porta.',
    workAdvice:
      'Tieni flessibilità operativa: quando arriva l’occasione professionale, coglila senza restare bloccato nei piani di ieri.',
    maieuticQuestions: [
      'Quale schema ripetitivo è pronto a chiudersi definitivamente in questo ciclo?',
      'Sono pronto a riconoscere e cogliere l’occasione quando la ruota gira?',
      'Cosa rimane stabile dentro di me anche quando le circostanze mutano?',
    ],
  },
  {
    id: '11-la-forza',
    number: 11,
    numeral: 'XI',
    name: 'La Forza',
    archetype: 'Coraggio Mite · Padronanza · Energia Vitale',
    element: 'Fuoco · Leone',
    keywords: ['Tenacia', 'Dolcezza', 'Autocontrollo', 'Passione'],
    synthesis:
      'La vera forza non schiaccia ma doma con fermezza e grazia: hai la capacità interiore di attraversare una prova complessa trasformando l’istinto in energia alleata.',
    futureTendency:
      'Nel futuro vicino supererai una resistenza grazie alla costanza serena, conquistando fiducia e padronanza sulla situazione.',
    advice:
      'Non combattere le tue emozioni con durezza: accoglile, canalizzale e mantieni una presenza calma ma irremovibile.',
    loveReading:
      'Passione profonda unita a tenerezza, capacità di ricucire tensioni con pazienza e magnetismo autentico.',
    workReading:
      'Resistenza nelle sfide impegnative, coraggio di sostenere le proprie idee e risoluzione diplomatica di conflitti.',
    loveFuture:
      'In amore la pazienza ricuce tensioni: passione e tenerezza si alleano e il legame guadagna fiducia dopo una prova emotiva.',
    workFuture:
      'Sul lavoro superi una resistenza con costanza serena: le tue idee tengono e i conflitti si risolvono con presenza diplomatica.',
    loveAdvice:
      'Non forzare l’altro né te stesso: canalizza gelosia o paura in dialogo caldo e fermo, senza aggressività.',
    workAdvice:
      'Sostieni le tue posizioni professionali con calma irremovibile; evita scontri frontali quando basta tenacia paziente.',
    maieuticQuestions: [
      'Quale paura o impulso sto cercando di forzare invece di ascoltare con calma?',
      'Dove posso mostrare più coraggio gentile verso me stesso?',
      'Quale sfida richiede oggi la mia costanza paziente?',
    ],
  },
  {
    id: '12-l-appeso',
    number: 12,
    numeral: 'XII',
    name: "L'Appeso",
    archetype: 'Cambio di Sguardo · Sospensione · Rivelazione',
    element: 'Acqua · Nettuno',
    keywords: ['Prospettiva', 'Pausa', 'Lasciar Andare', 'Intuizione'],
    synthesis:
      'Una pausa apparente chiede di sospendere la spinta abituale per guardare la realtà da un’angolazione completamente diversa.',
    futureTendency:
      'Prima di una ripartenza servirà un breve tempo di ridefinizione: ciò che sembra fermo sta preparando un cambio di visione risolutivo.',
    advice:
      'Smetti di spingere una porta chiusa: cambia punto di osservazione e scoprirai un passaggio finora invisibile.',
    loveReading:
      'Fase di riflessione o attesa che invita a capire cosa sei disposto a trasformare senza sacrificare te stesso.',
    workReading:
      'Rallentamento temporaneo utile a rivedere strategie, priorità o accordi prima di ripartire su basi nuove.',
    loveFuture:
      'In amore una pausa o un’attesa prepara un cambio di sguardo sul legame: ciò che sembra fermo rivela cosa sei disposto a trasformare.',
    workFuture:
      'Sul lavoro un rallentamento temporaneo serve a rivedere strategia e priorità prima di ripartire su basi nuove e più lucide.',
    loveAdvice:
      'Smetti di spingere l’altro a rispondere subito: sospendi e osserva la relazione da un’angolazione inedita.',
    workAdvice:
      'Non forzare scadenze su una porta chiusa: rivedi priorità e accordi, poi riparti quando la visione è chiara.',
    maieuticQuestions: [
      'Come apparirebbe questo problema se lo guardassi capovolgendo le mie aspettative?',
      'Cosa sto trattenendo per abitudine che invece chiede di essere lasciato andare?',
      'Che dono porta con sé questa pausa forzata?',
    ],
  },
  {
    id: '13-arcano-xiii',
    number: 13,
    numeral: 'XIII',
    name: 'Arcano XIII · Trasformazione',
    archetype: 'Rinascita · Taglio Netto · Essenzialità',
    element: 'Acqua · Scorpione',
    keywords: ['Chiusura', 'Mutamento', 'Verità', 'Alba'],
    synthesis:
      'Un ciclo giunge naturalmente al termine per fare spazio al nuovo: è il taglio pulito di ciò che ha esaurito la propria funzione vitale.',
    futureTendency:
      'Nel prossimo futuro si compie una svolta radicale e liberatoria: ciò che finisce apre subito terreno fertile per una rinascita autentica.',
    advice:
      'Onora ciò che si chiude e non trattenere forme ormai vuote: oltre la soglia c’è già l’alba di un nuovo inizio.',
    loveReading:
      'Trasformazione profonda di un legame su basi totalmente rinnovate oppure chiusura definitiva di una storia esaurita.',
    workReading:
      'Fine di un ruolo, contratto o metodo superato per lasciare posto a un percorso molto più aderente a chi sei oggi.',
    loveFuture:
      'In amore si chiude una storia esaurita o nasce un legame su basi totalmente rinnovate: il taglio apre spazio a un’alba affettiva autentica.',
    workFuture:
      'Sul lavoro termina un ruolo, un contratto o un metodo superato: subito dopo si apre un percorso più aderente a chi sei oggi.',
    loveAdvice:
      'Onora la fine senza trattenere forme vuote: non restare per abitudine in un legame che ha già esaurito la sua vita.',
    workAdvice:
      'Chiudi con chiarezza ciò che è finito professionalmente e investi energia solo in ciò che può rinascere con te.',
    maieuticQuestions: [
      'Cosa nella mia vita è già finito interiormente ma fatico ancora a salutare?',
      'Quale zavorra posso deporre per permettere alla nuova alba di sorgere?',
      'Chi sto diventando al di là di questo cambiamento?',
    ],
  },
  {
    id: '14-la-temperanza',
    number: 14,
    numeral: 'XIV',
    name: 'La Temperanza',
    archetype: 'Alchimia · Guarigione · Giusta Misura',
    element: 'Fuoco · Sagittario',
    keywords: ['Armonia', 'Pazienza', 'Sintesi', 'Equilibrio'],
    synthesis:
      'La Temperanza mescola con cura elementi diversi trovando la formula che risana: dopo fasi intense torna una fluidità serena e rigenerante.',
    futureTendency:
      'Le tendenze future indicano riconciliazioni, guarigione emotiva, ritmi più sani e soluzioni equilibrate che uniscono esigenze opposte.',
    advice:
      'Procedi con gradualità e misura: l’alchimia interiore non ama gli estremi né la fretta.',
    loveReading:
      'Dialogo disteso, tenerezza, guarigione di ferite passate e ritrovata armonia quotidiana nella coppia.',
    workReading:
      'Collaborazioni fluide, mediazioni riuscite, gestione equilibrata del tempo e stabilità progressiva.',
    loveFuture:
      'In amore tornano dialogo disteso, tenerezza e guarigione di ferite passate: la coppia ritrova un ritmo quotidiano armonico.',
    workFuture:
      'Sul lavoro maturano mediazioni riuscite, collaborazioni fluide e una gestione del tempo più sana e sostenibile.',
    loveAdvice:
      'Non forzare riconciliazioni a tappe forzate: mescola ascolto e pazienza finché la tenerezza torna naturale.',
    workAdvice:
      'Cerca sintesi tra esigenze opposte in team o clienti; evita estremi di carico e procedi con gradualità.',
    maieuticQuestions: [
      'Quali due aspetti della mia vita hanno bisogno oggi di essere integrati con dolcezza?',
      'Dove posso sostituire la fretta con un ritmo più armonico e rispettoso?',
      'Cosa porta subito pace e centratura alla mia giornata?',
    ],
  },
  {
    id: '15-il-diavolo',
    number: 15,
    numeral: 'XV',
    name: 'Il Diavolo',
    archetype: 'Ombra · Desiderio · Liberazione dai Vincoli',
    element: 'Terra · Capricorno',
    keywords: ['Intensità', 'Attaccamento', 'Magnetismo', 'Consapevolezza'],
    synthesis:
      'Questo Arcano porta alla luce passioni intense, ambizioni o legami di attaccamento di cui non vediamo subito i fili. Guardare l’ombra è il primo passo per sciogliere le catene.',
    futureTendency:
      'Nel futuro vicino emergeranno prove di lucidità di fronte a tentazioni, accordi vincolanti o dinamiche di dipendenza da trasformare in potere consapevole.',
    advice:
      'Le catene dell’Arcano sono larghe: riconosci dove stai cedendo il tuo potere per paura o desiderio e riprenditi la scelta.',
    loveReading:
      'Forte magnetismo e attrazione fisica, ma anche invito a vigilare su gelosie, possessività o giochi di potere.',
    workReading:
      'Ambizione materiale ed energia produttiva elevate; leggi con attenzione clausole, compensi e dipendenze economiche.',
    loveFuture:
      'In amore intensità e magnetismo salgono: emergeranno anche prove su gelosia, possessività o dipendenza emotiva da affrontare con lucidità.',
    workFuture:
      'Sul lavoro crescono ambizione e pressione su compensi o clausole: attenzioni a contratti vincolanti e dipendenze economiche da sciogliere.',
    loveAdvice:
      'Riconosci dove cedi potere per paura di perdere l’altro: riprendi scelta e dignità senza spegnere il desiderio autentico.',
    workAdvice:
      'Leggi ogni clausola e ogni dipendenza da un cliente o datore: non scambiare sicurezza materiale con libertà professionale.',
    maieuticQuestions: [
      'A quale attaccamento o paura sto consegnando silenziosamente la mia libertà?',
      'Quale desiderio intenso chiede di essere riconosciuto senza vergogna né eccesso?',
      'Quale catena potrei sfilare oggi stesso semplicemente scegliendo con lucidità?',
    ],
  },
  {
    id: '16-la-torre',
    number: 16,
    numeral: 'XVI',
    name: 'La Torre',
    archetype: 'Folgorazione · Verità Improvvisa · Liberazione',
    element: 'Fuoco · Marte',
    keywords: ['Rottura', 'Verità', 'Risveglio', 'Ricostruzione'],
    synthesis:
      'Un lampo di verità fa cadere strutture o illusioni costruite su basi fragili. Anche se spiazza, l’evento libera energia prigioniera e riporta alla realtà.',
    futureTendency:
      'Possibili scosse improvvise, rivelazioni impreviste o crolli di falsi equilibri che accelerano un cambiamento ormai inevitabile.',
    advice:
      'Non aggrapparti a mura che stanno cedendo: salva ciò che è vivo e costruisci d’ora in avanti sulla roccia della verità.',
    loveReading:
      'Verità che vengono a galla di colpo, crisi chiarificatrici o rottura di schemi finti per tornare all’autenticità.',
    workReading:
      'Cambiamenti repentini di assetto, ristrutturazioni o intuizioni folgoranti che impongono un cambio di rotta immediato.',
    loveFuture:
      'In amore una verità esplode: crisi chiarificatrice o fine di uno schema finto, con spazio per ricostruire solo sull’autenticità.',
    workFuture:
      'Sul lavoro arrivano ristrutturazioni, cambi di assetto o intuizioni che impongono una rotta nuova senza indugi.',
    loveAdvice:
      'Non ricostruire la stessa illusione: salva ciò che è vivo nel legame e lascia cadere le maschere.',
    workAdvice:
      'Accetta lo scossone organizzativo; metti in salvo competenze e relazioni utili e riparti su basi verificabili.',
    maieuticQuestions: [
      'Quale falsa sicurezza nella mia vita si regge solo sull’abitudine?',
      'Quale verità ho già intuito ma temo ancora che venga alla luce?',
      'Cosa resta intatto e prezioso anche quando cadono le apparenze?',
    ],
  },
  {
    id: '17-le-stelle',
    number: 17,
    numeral: 'XVII',
    name: 'Le Stelle',
    archetype: 'Speranza · Ispirazione · Guarigione Aperta',
    element: 'Aria · Acquario',
    keywords: ['Fiducia', 'Luce', 'Autenticità', 'Orizzonte'],
    synthesis:
      'Dopo ogni tempesta tornano aria pulita e cielo stellato: questo Arcano porta serenità, ispirazione limpida e fiducia profonda nel proprio cammino.',
    futureTendency:
      'Il futuro apre un periodo luminoso e rigenerante, con buone notizie, guarigioni interiori, protezioni inattese e progetti guidati da una stella chiara.',
    advice:
      'Mostrati senza maschere e condividi ciò che hai di più vero: sei esattamente sotto la guida della tua buona stella.',
    loveReading:
      'Tenerezza sincera, rinnovata speranza affettiva, incontri limpidi e affinità spirituale.',
    workReading:
      'Ispirazione artistica o progettuale, visibilità positiva, vocazione autentica e prospettive serene a medio termine.',
    loveFuture:
      'In amore tornano tenerezza sincera, speranza rinnovata e incontri limpidi: un orizzonte affettivo più chiaro dopo la tempesta.',
    workFuture:
      'Sul lavoro si apre visibilità positiva, ispirazione progettuale e prospettive serene allineate alla tua vocazione autentica.',
    loveAdvice:
      'Mostrati senza maschere nella relazione: la fiducia nasce dalla trasparenza, non dalla perfezione.',
    workAdvice:
      'Condividi la tua visione professionale con chiarezza; investi in ciò che ispira davvero, non solo in ciò che “fa curriculum”.',
    maieuticQuestions: [
      'Qual è l’orizzonte luminoso verso cui sento di poter guardare di nuovo con fiducia?',
      'In cosa posso essere oggi più trasparente e autentico?',
      'Quale sogno merita di essere riacceso dopo le fatiche recenti?',
    ],
  },
  {
    id: '18-la-luna',
    number: 18,
    numeral: 'XVIII',
    name: 'La Luna',
    archetype: 'Sogno · Profondità · Attraversamento della Nebbia',
    element: 'Acqua · Pesci',
    keywords: ['Inconscio', 'Immaginazione', 'Incertezza', 'Intuito'],
    synthesis:
      'Sotto la luce lunare i contorni sfumano e riaffiorano sogni, memorie e timori antichi. Non tutto ciò che percepisci è minaccia: occorre distinguere l’intuito dalla proiezione.',
    futureTendency:
      'Nei prossimi giorni attraverserai una fase di sensibilità acuta o informazioni ancora confuse: evita decisioni affrettate finché la luce non sarà chiara.',
    advice:
      'Cammina lungo il sentiero tra le due torri senza farti ipnotizzare dalle ombre: verifica i fatti con calma.',
    loveReading:
      'Emozioni profonde e nostalgiche, ma anche possibili malintesi o paure non dette da chiarire con dolcezza.',
    workReading:
      'Ottimo per l’immaginazione creativa e artistica; su accordi e denaro attendi invece chiarezza completa prima di decidere.',
    loveFuture:
      'In amore riaffiorano emozioni profonde e possibili malintesi: servirà chiarire paure non dette prima che la nebbia si addensi.',
    workFuture:
      'Sul lavoro l’immaginazione creativa è fertile, ma su contratti e denaro i contorni restano confusi finché non verifichi i fatti.',
    loveAdvice:
      'Distingui intuito e proiezione: parla con dolcezza di ciò che temi, invece di immaginare tradimenti o rifiuti.',
    workAdvice:
      'Usa la creatività, ma non firmare né investire finché numeri e clausole non sono limpidi.',
    maieuticQuestions: [
      'Quale timore attuale appartiene davvero al presente e quale invece al passato?',
      'Cosa mi stanno suggerendo i miei sogni o la mia sensibilità in questi giorni?',
      'Dove ho bisogno di verificare un fatto concreto prima di trarre conclusioni?',
    ],
  },
  {
    id: '19-il-sole',
    number: 19,
    numeral: 'XIX',
    name: 'Il Sole',
    archetype: 'Chiarezza · Gioia · Piena Realizzazione',
    element: 'Fuoco · Sole',
    keywords: ['Luce', 'Successo', 'Verità', 'Vitalità'],
    synthesis:
      'Tutte le ombre si dissolvono sotto una luce piena e generosa: chiarezza mentale, vitalità, riconoscimento e gioia condivisa illuminano il presente.',
    futureTendency:
      'Le previsioni parlano di pieno successo, chiarimenti felici, energia ritrovata e risultati evidenti che premiano la tua sincerità.',
    advice:
      'Accogli il successo e la gioia senza sminuirli, condividendo calore e generosità con chi cammina accanto a te.',
    loveReading:
      'Amore luminoso, gioia condivisa, chiarimento totale, progetti di coppia felici e vitalità affettiva.',
    workReading:
      'Riconoscimento pubblico, ottimo andamento economico, collaborazione trasparente e realizzazione dei tuoi sforzi.',
    loveFuture:
      'In amore si apre una stagione di gioia condivisa, chiarimenti felici e progetti di coppia vissuti con vitalità e luce.',
    workFuture:
      'Sul lavoro arrivano riconoscimenti pubblici, risultati evidenti e collaborazioni trasparenti che premiano sincerità e impegno.',
    loveAdvice:
      'Celebra e condividi la gioia di coppia senza sminuirla: lascia che il calore arrivi anche agli altri intorno a voi.',
    workAdvice:
      'Accogli il successo professionale senza falsa modestia; condividi credito e generosità con il team.',
    maieuticQuestions: [
      'Cosa merita oggi di essere celebrato nella mia vita con gratitudine?',
      'Dove posso portare più chiarezza solare e sincerità immediata?',
      'Quale mio talento è pronto a risplendere alla luce del sole?',
    ],
  },
  {
    id: '20-il-giudizio',
    number: 20,
    numeral: 'XX',
    name: 'Il Giudizio',
    archetype: 'Chiamata · Risveglio · Rinnovamento',
    element: 'Fuoco · Plutone',
    keywords: ['Vocazione', 'Perdono', 'Risposta', 'Svolta'],
    synthesis:
      'Un richiamo interiore risveglia ciò che sembrava sopito: il passato trova finalmente senso e si apre una chiamata a vivere su un piano più autentico.',
    futureTendency:
      'In arrivo notizie decisive, chiamate o risposte attese da tempo, ricongiungimenti significativi e un netto salto di consapevolezza.',
    advice:
      'Rispondi alla chiamata senza rimanere prigioniero del giudizio su errori passati: il risveglio chiede presenza.',
    loveReading:
      'Ritorni significativi, rinascita profonda di un rapporto o una comprensione che libera entrambi dal passato.',
    workReading:
      'Scoperta o conferma della propria vocazione, chiamata professionale importante e svolta decisiva.',
    loveFuture:
      'In amore possono arrivare un ritorno significativo, una rinascita del rapporto o una comprensione che libera entrambi dal passato.',
    workFuture:
      'Sul lavoro arriva una chiamata o conferma di vocazione: notizie decisive e una svolta professionale che non puoi più ignorare.',
    loveAdvice:
      'Rispondi al richiamo del cuore senza restare prigioniero di colpe passate: il perdono apre lo spazio al nuovo.',
    workAdvice:
      'Accogli la chiamata professionale con presenza: non lasciarti bloccare dal giudizio su errori di carriera passati.',
    maieuticQuestions: [
      'Quale chiamata autentica sta suonando nella mia vita che non posso più ignorare?',
      'Cosa posso perdonare a me stesso per rinascere leggero in questa nuova fase?',
      'Quale risposta attesa sono pronto ad accogliere?',
    ],
  },
  {
    id: '21-il-mondo',
    number: 21,
    numeral: 'XXI',
    name: 'Il Mondo',
    archetype: 'Compimento · Interezza · Apertura Totale',
    element: 'Terra · Saturno',
    keywords: ['Realizzazione', 'Unità', 'Viaggio', 'Armonia'],
    synthesis:
      'Il cerchio dei ventidue Arcani si compie nella danza dell’interezza: i frammenti dispersi si ricompongono e puoi raccogliere i frutti di un lungo percorso.',
    futureTendency:
      'Il futuro corona un ciclo con piena realizzazione, riconoscimenti internazionali o nuovi orizzonti di viaggio, studio e realizzazione personale.',
    advice:
      'Riconosci la strada percorsa e preparati a varcare un orizzonte più ampio con il cuore integro.',
    loveReading:
      'Pienezza affettiva, armonia matura, realizzazione di un progetto di vita o incontro che fa sentire a casa.',
    workReading:
      'Completamento brillante di un grande progetto, aperture verso l’estero o piena affermazione professionale.',
    loveFuture:
      'In amore si corona un ciclo con pienezza e armonia matura: progetto di vita condiviso o senso di casa ritrovato nel legame.',
    workFuture:
      'Sul lavoro si completa un grande progetto, con aperture verso l’estero o piena affermazione del percorso costruito finora.',
    loveAdvice:
      'Riconosci la strada percorsa insieme e apriti a un orizzonte di coppia più ampio, con il cuore integro.',
    workAdvice:
      'Celebra il traguardo professionale e preparati al prossimo cerchio: viaggio, studio o mercato più ampio.',
    maieuticQuestions: [
      'Quale grande ciclo della mia vita sta giungendo oggi al suo pieno compimento?',
      'Quali parti di me si sono finalmente riconciliate in questo percorso?',
      'Verso quale orizzonte più vasto desidero aprirmi ora?',
    ],
  },
];

export type SpreadPosition = 'Radice · Passato' | 'Centro · Presente' | 'Orizzonte · Futuro';

export interface SpreadDrawItem {
  position: SpreadPosition;
  card: ArcanaCard;
}

/** Ambito esplicito del dialogo (chip / sessione); Fase A. */
export type DialogueDomain = 'love' | 'work' | 'general' | 'future';

export interface BuildArcanaDialogueOptions {
  /** Dominio forzato dai chip o dalla sessione; ha priorità sulla sola regex. */
  domain?: DialogueDomain | null;
}

const LOVE_QUERY_RE =
  /amor|relazion|coppia|cuore|sentimen|partner|lui|lei|matrimon|innamor/;
const WORK_QUERY_RE =
  /lavor|carrier|progett|soldi|econom|azienda|studio|ufficio|collabor|contratt/;
const FUTURE_QUERY_RE =
  /futur|succed|preved|previs|domani|mesi|anno|prossim|evolv|andrà|esito|svilupp/;
const GENERAL_QUERY_RE =
  /percorso\s+general|in\s+general|general[ei]|complessiv|nel\s+complesso|sintesi\s+general/;

/** Inferisce un ambito dal testo; `null` se non c’è segnale chiaro (maieutiche generiche). */
export function detectDialogueDomain(userQuery: string): DialogueDomain | null {
  const q = userQuery.toLowerCase();
  const asksLove = LOVE_QUERY_RE.test(q);
  const asksWork = WORK_QUERY_RE.test(q);
  if (asksLove && !asksWork) return 'love';
  if (asksWork && !asksLove) return 'work';
  if (asksLove && asksWork) {
    // Ambiguità: preferisci la prima keyword che compare nel testo
    const loveIdx = q.search(LOVE_QUERY_RE);
    const workIdx = q.search(WORK_QUERY_RE);
    return loveIdx <= workIdx ? 'love' : 'work';
  }
  if (GENERAL_QUERY_RE.test(q)) return 'general';
  if (FUTURE_QUERY_RE.test(q)) return 'future';
  return null;
}

/**
 * Genera una risposta contestuale autentica per il dialogo con qualsiasi dei 22 Arcani Maggiori,
 * integrando lettura del presente, tendenza previsionale del futuro, ambito (amore/lavoro) e consiglio.
 * In amore/lavoro usa solo campi di dominio (loveFuture/workFuture, loveAdvice/workAdvice): mai futureTendency/advice condivisi.
 */
export function buildArcanaDialogueReply(
  userQuery: string,
  activeCard: ArcanaCard,
  spread?: SpreadDrawItem[] | null,
  options?: BuildArcanaDialogueOptions
): string {
  const inferred = detectDialogueDomain(userQuery);
  const domain: DialogueDomain =
    options?.domain ?? inferred ?? 'general';

  if (spread && spread.length === 3) {
    const [past, present, future] = spread;
    const domainNote =
      domain === 'love'
        ? activeCard.loveReading
        : domain === 'work'
          ? activeCard.workReading
          : activeCard.advice;
    const domainLabel =
      domain === 'love'
        ? 'Amore'
        : domain === 'work'
          ? 'Lavoro'
          : domain === 'future'
            ? 'Futuro'
            : 'Generale';

    const futureLine =
      domain === 'love' && activeCard.loveFuture
        ? activeCard.loveFuture
        : domain === 'work' && activeCard.workFuture
          ? activeCard.workFuture
          : future.card.futureTendency;

    return [
      `Nella tua stesa a tre Arcani (ambito: ${domainLabel}) sul tema "${userQuery.trim()}":`,
      `• ${past.position} (${past.card.name} · ${past.card.numeral}): mostra da dove nasce la situazione (${past.card.keywords.slice(0, 2).join(', ').toLowerCase()}).`,
      `• ${present.position} (${present.card.name} · ${present.card.numeral}): ${present.card.synthesis}`,
      `• ${future.position} (${future.card.name} · ${future.card.numeral}): ${futureLine}`,
      domain === 'love' || domain === 'work'
        ? `Indicazione per ${domainLabel.toLowerCase()}: ${domainNote}`
        : `Indicazione sintetica: ${domainNote}`,
    ].join('\n\n');
  }

  const parts: string[] = [];
  const domainHeader =
    domain === 'love'
      ? 'Amore'
      : domain === 'work'
        ? 'Lavoro'
        : domain === 'future'
          ? 'Futuro'
          : 'Generale';

  parts.push(
    `Ambito: ${domainHeader} · In dialogo con ${activeCard.name} (${activeCard.numeral} · ${activeCard.archetype}):`
  );

  if (domain === 'love') {
    parts.push(`Lettura affettiva: ${activeCard.loveReading}`);
    if (activeCard.loveFuture) {
      parts.push(`Tendenza in amore: ${activeCard.loveFuture}`);
    }
    if (activeCard.loveAdvice) {
      parts.push(`Orientamento affettivo: ${activeCard.loveAdvice}`);
    }
  } else if (domain === 'work') {
    parts.push(`Lettura professionale: ${activeCard.workReading}`);
    if (activeCard.workFuture) {
      parts.push(`Tendenza nel lavoro: ${activeCard.workFuture}`);
    }
    if (activeCard.workAdvice) {
      parts.push(`Orientamento professionale: ${activeCard.workAdvice}`);
    }
  } else {
    parts.push(`Lettura del presente: ${activeCard.synthesis}`);
    parts.push(`Linea previsionale (futuro): ${activeCard.futureTendency}`);
    parts.push(`Orientamento pratico: ${activeCard.advice}`);
  }

  return parts.join('\n\n');
}

/**
 * Normalizza una reply Dialogo per confronto: toglie etichette di blocco e collassa spazi.
 * Usato dagli assert Amore ≠ Lavoro (ENN-112).
 */
export function normalizeDialogueReplyContent(text: string): string {
  return text
    .split(/\n+/)
    .map((line) =>
      line
        .replace(/^Ambito:\s*(Amore|Lavoro|Futuro|Generale)\s*·\s*/i, '')
        .replace(
          /^(Lettura affettiva|Lettura professionale|Lettura del presente|Tendenza in amore|Tendenza nel lavoro|Linea previsionale \(futuro\)|Orientamento affettivo|Orientamento professionale|Orientamento pratico):\s*/i,
          ''
        )
        .trim()
        .toLowerCase()
    )
    .filter(Boolean)
    .join('\n');
}

/** True se, a etichette rimosse, la reply Amore e quella Lavoro differiscono. */
export function loveAndWorkRepliesDiffer(card: ArcanaCard): boolean {
  const love = buildArcanaDialogueReply('Lettura amore', card, null, {
    domain: 'love',
  });
  const work = buildArcanaDialogueReply('Lettura lavoro', card, null, {
    domain: 'work',
  });
  return (
    normalizeDialogueReplyContent(love) !== normalizeDialogueReplyContent(work)
  );
}

export function buildSpreadSynthesisReply(spread: SpreadDrawItem[]): string {
  const [past, present, future] = spread;
  return [
    `Stesa a 3 Arcani completata — ${past.card.name} (${past.card.numeral}) → ${present.card.name} (${present.card.numeral}) → ${future.card.name} (${future.card.numeral}):`,
    `1. ${past.position}: ${past.card.name} richiama ${past.card.keywords.join(', ').toLowerCase()}.`,
    `2. ${present.position}: ${present.card.synthesis}`,
    `3. ${future.position}: ${future.card.futureTendency}`,
    `Puoi cliccare su una delle tre carte o scrivere una domanda specifica su amore, lavoro o decisioni future.`,
  ].join('\n\n');
}
