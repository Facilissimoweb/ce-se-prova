import type { ArcanaCard } from '../types/handoff';

/**
 * I 22 Arcani Maggiori completi per il dialogo interattivo di Tarot Italia.
 * Ogni Arcano include lettura del presente, tendenza previsionale del futuro,
 * declinazioni su relazioni e lavoro, e tre domande di consapevolezza.
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

/**
 * Genera una risposta contestuale autentica per il dialogo con qualsiasi dei 22 Arcani Maggiori,
 * integrando lettura del presente, tendenza previsionale del futuro, ambito (amore/lavoro) e consiglio.
 */
export function buildArcanaDialogueReply(
  userQuery: string,
  activeCard: ArcanaCard,
  spread?: SpreadDrawItem[] | null
): string {
  const q = userQuery.toLowerCase();
  const asksFuture =
    /futur|succed|preved|previs|domani|mesi|anno|prossim|evolv|andrà|esito|svilupp/.test(q);
  const asksLove =
    /amor|relazion|coppia|cuore|sentimen|partner|lui|lei|matrimon|innamor/.test(q);
  const asksWork =
    /lavor|carrier|progett|soldi|econom|azienda|studio|ufficio|collabor|contratt/.test(q);

  if (spread && spread.length === 3) {
    const [past, present, future] = spread;
    const domainNote = asksLove
      ? activeCard.loveReading
      : asksWork
        ? activeCard.workReading
        : activeCard.advice;

    return [
      `Nella tua stesa a tre Arcani sul tema "${userQuery.trim()}":`,
      `• ${past.position} (${past.card.name} · ${past.card.numeral}): mostra da dove nasce la situazione (${past.card.keywords.slice(0, 2).join(', ').toLowerCase()}).`,
      `• ${present.position} (${present.card.name} · ${present.card.numeral}): ${present.card.synthesis}`,
      `• ${future.position} (${future.card.name} · ${future.card.numeral}): ${future.card.futureTendency}`,
      `Indicazione sintetica: ${domainNote}`,
    ].join('\n\n');
  }

  const parts: string[] = [];

  parts.push(
    `In dialogo con ${activeCard.name} (${activeCard.numeral} · ${activeCard.archetype}):`
  );

  if (asksLove) {
    parts.push(`Sfera affettiva: ${activeCard.loveReading}`);
  } else if (asksWork) {
    parts.push(`Ambito professionale e progetti: ${activeCard.workReading}`);
  } else {
    parts.push(`Lettura del presente: ${activeCard.synthesis}`);
  }

  if (asksFuture || (!asksLove && !asksWork)) {
    parts.push(`Linea previsionale (futuro): ${activeCard.futureTendency}`);
  } else {
    parts.push(`Tendenza evolutiva: ${activeCard.futureTendency}`);
  }

  parts.push(`Orientamento pratico: ${activeCard.advice}`);

  return parts.join('\n\n');
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
