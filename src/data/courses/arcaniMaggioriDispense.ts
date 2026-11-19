/**
 * ENN-101 — Contenuti aggiornati del percorso Arcani Maggiori (Primo Step).
 * Sorgente: dispensa formativa Maria aggiornata (Tre Settenari, Matto–Mondo, laboratorio).
 * Importato da seedData per il catalogo DB / Area Riservata.
 */

export interface MaggioriDispensaSeed {
  moduleNumber: string;
  title: string;
  subtitle: string;
  format: string;
  readingMinutes: number;
  keyTakeaways: string[];
  contentMarkdown: string;
}

export const ARCANI_MAGGIORI_DISPENSE: MaggioriDispensaSeed[] = [
  {
    moduleNumber: '01',
    title: 'Architettura e Primo Settenario (0 – VII)',
    subtitle: 'Mappa dei Tre Settenari · Dal Matto al Carro',
    format: 'Dispensa formativa + Esercizi',
    readingMinutes: 40,
    keyTakeaways: [
      'I Tre Settenari come mappa evolutiva dalla materia allo spirito.',
      'Il Matto (0) e la diade Bagatto (I) / Papessa (II).',
      'Imperatrice–Carro (III–VII) con simbologia, senso profondo e chiave previsionale.',
    ],
    contentMarkdown: `## Dispensa Formativa · Arcani Maggiori (Primo Step)

Gli Arcani Maggiori non sono strumenti di divinazione meccanica, bensì una **mappa strutturata** dell'esperienza umana, della psiche e dei cicli evolutivi. Questa dispensa apre il Primo Step di Tarot Italia: dall'architettura dei Tre Settenari al radicamento del Primo Settenario, dal Matto al Carro.

## 1. Architettura Didattica e la Mappa dei Tre Settenari

Il mazzo si articola in **ventidue lame** (dalla carta 0 alla XXI), organizzate in tre grandi cicli di crescita interiore e manifestazione esteriore. Ogni settenario risponde a una precisa fase dell'evoluzione individuale, scandendo il passaggio dalla materia allo spirito.

### Mappa dei Tre Cicli

- **Primo Settenario (0 – VII)** — Formazione dell'identità, radicamento nel mondo fisico, azione concreta e conquista della direzione.
- **Secondo Settenario (VIII – XIV)** — Prova etica, maturazione morale, interiorizzazione, transizione e ricerca dell'equilibrio interiore.
- **Terzo Settenario (XV – XXI)** — Padronanza spirituale, confronto con l'Ombra, liberazione dai vincoli e compiutezza nel mondo.

## 2. Il Primo Settenario: La Formazione dell'Identità (0 – VII)

Il primo ciclo è la fase di radicamento e di costruzione della personalità cosciente. Attraverso queste prime otto carte, l'individuo impara a gestire le risorse materiali, la creatività, l'autorità, la guida etica e la scelta, fino all'affermazione trionfante della propria volontà disciplinata.

### 0. Il Matto – L'Inizio Non Condizionato

- **Simbologia ed Essenza**: Il Matto (0) rappresenta la soglia fuori dalla numerazione sequenziale; passo sul precipizio; libertà assoluta. Precede ogni schema, regola o sovrastruttura mentale: energia pura prima di ogni cristallizzazione materiale.
- **Significato Profondo**: slancio genuino, apertura incondizionata al nuovo, coraggio di slegarsi dai condizionamenti, fiducia nel cammino. Ogni inizio autentico richiede il rischio dell'ignoto e lo spogliamento dalle protezioni superflue.
- **In Chiave Previsionale**: cambiamento improvviso di rotta, partenza imminente, salto di fiducia, novità inattesa. Chiede audacia, spontaneità e istinto pionieristico, senza garanzie logiche paralizzanti.

{{scheda-visiva:il-matto}}

{{sigillo:il-matto}}

### La Diade Creativa: Il Bagatto (I) e La Papessa (II)

La dinamica iniziale del manifestato divide il cammino tra azione visibile e gestazione interiore.

### 1. Il Bagatto (I) – L'Iniziativa e il Talento all'Opera

- **Simbologia ed Essenza**: Situato alla guida della numerazione, il Bagatto (o Giocoliere) dispone sul banco di tutti gli strumenti primari (bastoni, coppe, spade e denari). È il padrone delle risorse operative e delle potenzialità materiali per cominciare subito.
- **Significato Profondo**: iniziativa immediata, talento puro, destrezza, attivazione dei processi con ciò che è già disponibile, senza attendere condizioni ideali.
- **In Chiave Previsionale**: azione pratica immediata; «mettere le mani in pasta», sfruttare le abilità pratiche e concretizzare un progetto o un'azione nei primissimi giorni.

{{scheda-visiva:il-bagatto}}

{{sigillo:il-bagatto}}

### 2. La Papessa (II) – La Gestazione e la Saggezza del Silenzio

- **Simbologia ed Essenza**: Seduta immobile e velata tra i pilastri del tempio, con il sacro libro chiuso o socchiuso; custodisce la conoscenza sottile senza agire all'esterno.
- **Significato Profondo**: gestazione silenziosa, verità intuita prima di essere detta, sapienza del tempo, attesa fertile. Ogni vera creazione richiede raccoglimento e maturazione interiore.
- **In Chiave Previsionale**: non è il momento di agire o esporre idee; custodire, studiare, riflettere, fare ricerca e lasciare maturare gli eventi in profondità.

{{scheda-visiva:la-papessa}}

{{sigillo:la-papessa}}

### Dal Fiorire alla Conquista (III – VII)

La progressione conduce dalla fioritura creativa fino all'accelerazione e alla vittoria della volontà disciplinata.

### 3. L'Imperatrice (III) – La Fioritura Creativa e l'Abbondanza

- **Simbologia ed Essenza**: fioritura sensibile, abbondanza generativa, capacità di dare forma e vita alle idee con espressività, comunicazione e cura fertile dei progetti.
- **Significato Profondo**: vitalità rigogliosa, espressione creativa senza vincoli, potere generativo della parola; armonia che trasforma l'impulso in manifestazione ricca.
- **In Chiave Previsionale**: espansione prospera, intese riuscite, fioritura di nuove idee, fecondità nei progetti, grande armonia relazionale.

{{scheda-visiva:l-imperatrice}}

{{sigillo:l-imperatrice}}

### 4. L'Imperatore (IV) – La Stabilità Strutturale e il Metodo

- **Simbologia ed Essenza**: autorità e concretezza; stabilità, metodo rigoroso, confini solidi, gestione organizzata del mondo materiale.
- **Significato Profondo**: autorità saggia, protezione, governo della realtà senza tentennamenti; forza strutturale per dare durata e confini certi a quanto creato.
- **In Chiave Previsionale**: consolidamento di progetti lavorativi o finanziari, basi solide, referente autorevole o protettivo, gestione metodica ed efficace della materia.

{{scheda-visiva:l-imperatore}}

{{sigillo:l-imperatore}}

### 5. Il Papa (V) – Il Patto Etico e la Guida Spettabile

- **Simbologia ed Essenza**: guida spirituale o professionale; maestro che trasmette valori condivisi e facilita l'adesione a regole e principi codificati.
- **Significato Profondo**: patto etico, trasmissione della sapienza, mediazione illuminata; alleanza tra aspirazioni individuali e tradizione o struttura sociale.
- **In Chiave Previsionale**: contratti chiari e trasparenti, mediazioni riuscite, consulenze autorevoli, alleanze basate sulla fiducia, rispetto delle norme etiche.

{{scheda-visiva:il-papa}}

{{sigillo:il-papa}}

### 6. Gli Innamorati (VI) – Il Bivio Fondamentale e la Scelta del Cuore

- **Simbologia ed Essenza**: la figura umana al bivio, di fronte all'incontro, all'affetto e alla responsabilità della decisione.
- **Significato Profondo**: scelta consapevole del cuore e responsabilità verso la propria direzione emotiva ed esistenziale; optare con convinzione per una strada escludendo le altre.
- **In Chiave Previsionale**: decisioni sentimentali o professionali ineludibili; scelta d'amore o di valore chiara; allineamento autentico con i desideri profondi.

{{scheda-visiva:gli-amanti}}

{{sigillo:gli-amanti}}

### 7. Il Carro (VII) – L'Azione Coordinata e la Vittoria Disciplinata

- **Simbologia ed Essenza**: il condottiero guida il Carro trionfale e governa con maestria le forze opposte che muovono il veicolo.
- **Significato Profondo**: azione coordinata, controllo sapiente delle polarità energetiche, vittoria grazie a determinazione e rigore.
- **In Chiave Previsionale**: sblocco rapido di trattative o situazioni stagnanti, viaggi, spostamenti materiali, accelerazione decisiva e trionfante verso gli obiettivi.

### Sintesi Didattica del Modulo 1

1. Il Matto (0) garantisce la libertà originaria e l'apertura incondizionata al mutamento.
2. La polarità Bagatto (I) / Papessa (II) stabilisce l'alternanza tra azione visibile e gestazione intuitiva.
3. Da Imperatrice (III) e Imperatore (IV) si giunge alla guida etica del Papa (V), alla scelta degli Innamorati (VI) e alla spinta del Carro (VII).

### Esercizi Pratici del Primo Settenario

- **Esercizio 1 (Il Matto e il foglio bianco)**: identifica un progetto rinviato e scrivi l'azione minima di coraggio da compiere oggi, senza pianificarla nei dettagli.
- **Esercizio 2 (Bagatto vs Papessa)**: di fronte a un dubbio, estrai una carta. Bagatto → azione pratica entro 24 ore; Papessa → tre giorni di silenzio e ascolto prima di decidere.
- **Esercizio 3 (Lettura a due lame)**: combina Il Carro con una lama precedente per interpretare uno sblocco inatteso in ambito lavorativo o personale.
`,
  },
  {
    moduleNumber: '02',
    title: 'Secondo Settenario: Prova Etica (VIII – XIV)',
    subtitle: 'Giustizia, Eremita, Ruota, Forza, Appeso, Morte, Temperanza',
    format: 'Dispensa formativa + Schede Archetipo',
    readingMinutes: 40,
    keyTakeaways: [
      'Dal mondo esterno all’interiorizzazione: maturazione morale e limiti.',
      'Ruota (X) e Forza (XI): mutamento e dominio gentile dell’istinto.',
      'Appeso, Morte e Temperanza come transizione verso il terzo ciclo.',
    ],
    contentMarkdown: `## Il Secondo Settenario: La Prova Etica e l'Interiorizzazione (VIII – XIV)

Se il primo settenario costruisce l'identità esterna, il secondo sposta l'asse verso l'interno: maturazione morale, confronto con i limiti, equilibrio e trasformazione profonda.

### 8. La Giustizia (VIII) – Ordine, Misura e Causa-Effetto

- **Simbologia ed Essenza**: figura regale in trono, spada verticale e bilancia in equilibrio; ordine cosmico, imparzialità e linearità delle conseguenze.
- **Significato Profondo**: responsabilità, onestà intellettuale, equilibrio, rigore etico. Ogni azione genera conseguenza; la chiarezza mentale guida l'emotività.
- **In Chiave Previsionale**: questioni legali o burocratiche, contratti equi, necessità di fare ordine, risposta meritata e oggettiva.

### 9. L'Eremita (IX) – Luce Interiore e Tempo della Ricerca

- **Simbologia ed Essenza**: saggio nel mantello, lanterna nella notte; protegge e illumina il cammino.
- **Significato Profondo**: raccoglimento, solitudine rigenerante, ricerca della verità interiore, prudenza; distacco temporaneo dal frastuono per trovare risposte autentiche.
- **In Chiave Previsionale**: rallentamento, studio, introspezione, cautela e riserbo, senza affrettare i tempi.

### 10. La Ruota di Fortuna (X) – Ciclo, Mutamento e Imprevisto

- **Simbologia ed Essenza**: ruota in movimento e figure in evoluzione; cicli vitali e mutevolezza delle circostanze.
- **Significato Profondo**: accettazione del cambiamento, ciclicità, sblocco della stagnazione; adattarsi con flessibilità.
- **In Chiave Previsionale**: svolta improvvisa, colpo di scena, nuovo ciclo, ribaltamento rapido di una situazione bloccata.

### 11. La Forza (XI) – Dominio Istintivo e Coraggio Gentile

- **Simbologia ed Essenza**: una donna apre o chiude con dolcezza le fauci di un leone, senza violenza.
- **Significato Profondo**: dominio delle passioni tramite consapevolezza, coraggio interiore, pazienza, gestione saggia dell'energia; integrare gli impulsi anziché reprimerli.
- **In Chiave Previsionale**: superare una prova complessa con determinazione e autocontrollo; armonia nelle tensioni.

### 12. L'Appeso (XII) – Sosta Volontaria e Cambio di Prospettiva

- **Simbologia ed Essenza**: figura a testa in giù, serena; l'energia fluisce verso l'alto.
- **Significato Profondo**: sosta necessaria, sacrificio come «rendere sacro», rinuncia al controllo rigido, capovolgimento di sguardo.
- **In Chiave Previsionale**: blocco o attesa utile a riconsiderare le priorità, lasciando andare la fretta e accettando la pausa.

### 13. L'Arcano Senza Nome / La Morte (XIII) – Trasmutazione e Taglio Netto

- **Simbologia ed Essenza**: scheletro che falcia; dal terreno emergono germogli; potatura indispensabile alla vita.
- **Significato Profondo**: fine radicale di un ciclo, distacco da ciò che è obsoleto, trasformazione e rinascita per fare spazio al nuovo.
- **In Chiave Previsionale**: chiusura netta e cambiamento drastico; se accolto senza resistenza, apre a rinnovamento totale.

### 14. La Temperanza (XIV) – Alchimia Quotidiana e Moderazione

- **Simbologia ed Essenza**: figura alata che travasa liquido tra due vasi; flusso continuo di armonia.
- **Significato Profondo**: misura, guarigione, pazienza alchemica, riconciliazione, compromesso e pace interiore.
- **In Chiave Previsionale**: risoluzione pacifica, cure efficaci, tempi di recupero fluidi, fase di stabilizzazione in cui regna la cooperazione.

### Sintesi Didattica del Modulo 2

1. Dalla Giustizia (VIII) all'Eremita (IX): maturazione morale e ascolto della coscienza.
2. Ruota (X) e Forza (XI): accettazione del mutamento e dominio saggio dell'energia.
3. Appeso (XII), Morte (XIII) e Temperanza (XIV): transizione emotiva ed etica verso il terzo settenario.
`,
  },
  {
    moduleNumber: '03',
    title: 'Terzo Settenario: Ombra e Compiutezza (XV – XXI)',
    subtitle: 'Dal Diavolo e la Torre fino a Sole, Giudizio e Mondo',
    format: 'Dispensa formativa + Atlante Simbolico',
    readingMinutes: 40,
    keyTakeaways: [
      'Diavolo (XV) e Torre (XVI): Ombra, crollo e liberazione.',
      'Stelle, Luna e Sole: speranza, inconscio e chiarezza visibile.',
      'Giudizio (XX) e Mondo (XXI): risveglio e trionfo finale.',
    ],
    contentMarkdown: `## Il Terzo Settenario: Padronanza Spirituale e Compiutezza (XV – XXI)

Nel terzo settenario l'individuo si confronta con le grandi forze universali: supera le illusioni dell'Ombra, abbatte le false certezze e realizza il proprio potenziale interiore ed esteriore.

### 15. Il Diavolo (XV) – Ombra, Materia e Fascino del Potere

- **Simbologia ed Essenza**: creatura alata su due figure legate in modo blando ma consenziente.
- **Significato Profondo**: confronto con l'Ombra, attaccamento alla materia, passioni, denaro, dipendenze, falsi poteri. Riconoscere i desideri inconsci per riprendere il controllo.
- **In Chiave Previsionale**: passioni forti, dinamiche di potere o manipolazione, profitto materiale; necessità di liberarsi da legami tossici.

### 16. La Torre (XVI) – Folgore, Crollo e Liberazione

- **Simbologia ed Essenza**: torre colpita dal fulmine; corona che salta; figure che precipitano tra scintille.
- **Significato Profondo**: rottura delle false certezze, crollo di strutture non più aderenti alla verità, liberazione catartica attraverso la crisi.
- **In Chiave Previsionale**: cambiamento drastico e inatteso che rompe la stagnazione e libera nuove energie.

### 17. Le Stelle (XVII) – Speranza, Ispirazione e Guarigione

- **Simbologia ed Essenza**: figura nuda che versa linfa su terra e acqua, sotto stelle radiose.
- **Significato Profondo**: guida celeste, fiducia, chiarezza d'intenti, ispirazione, guarigione dopo la Torre.
- **In Chiave Previsionale**: serenità ritrovata, prospettive favorevoli, successo creativo, protezione, conferma del cammino.

### 18. La Luna (XVIII) – Inconscio, Illusioni e Percorso Notturno

- **Simbologia ed Essenza**: Luna piena, gambero dalle acque, lupi e torri lontane.
- **Significato Profondo**: regno dell'inconscio, sogni, paure ancestrali, intuito viscerale, illusioni e nebbie da attraversare con la luce interiore.
- **In Chiave Previsionale**: incertezza, segreti, malintesi; procedere ascoltando l'istinto senza paralisi ansiosa.

### 19. Il Sole (XIX) – Chiarezza, Gioia e Realizzazione Visibile

- **Simbologia ed Essenza**: Sole radioso; bambini festosi in un prato fiorito.
- **Significato Profondo**: verità svelata, gioia, trasparenza, calore umano, successo pubblico, vitalità cosciente.
- **In Chiave Previsionale**: successo, chiarezza nei rapporti, accordi fortunati, vitalità, trionfo di un progetto portato alla luce.

### 20. Il Giudizio (XX) – Chiamata, Risveglio e Rinnovamento

- **Simbologia ed Essenza**: angelo con tromba; figure che emergono dai sepolcri, braccia aperte.
- **Significato Profondo**: chiamata alla consapevolezza, risveglio, perdono, liberazione dai giudizi limitanti.
- **In Chiave Previsionale**: svolta decisiva, notizie importanti, riconciliazione che rinnova l'esistenza.

### 21. Il Mondo (XXI) – Compiutezza e Cerchio Perfetto

- **Simbologia ed Essenza**: figura danzante nella mandorla di foglie, circondata dai quattro viventi (Toro, Leone, Aquila, Angelo).
- **Significato Profondo**: Compimento dell'Opera, integrazione dei settenari, realizzazione e armonia universale.
- **In Chiave Previsionale**: successo totale, chiusura trionfante di un ciclo, viaggi internazionali, massima espansione.

### Sintesi Didattica del Modulo 3

1. Diavolo (XV) e Torre (XVI) spezzano i vincoli materiali.
2. Dalle Stelle (XVII) e dalla Luna (XVIII) si giunge al Sole (XIX).
3. La chiamata al risveglio del Giudizio (XX) conduce alla compiutezza e al trionfo finale del Mondo (XXI).
`,
  },
  {
    moduleNumber: '04',
    title: 'Laboratorio Pratico Finale e Verifica',
    subtitle: 'Autovalutazione dei cicli · Stese integrative · Chiusura Primo Step',
    format: 'Quaderno esercizi + Verifica competenze',
    readingMinutes: 25,
    keyTakeaways: [
      'Riconoscere quale settenario risuona nella situazione attuale.',
      'Esercizi tris dei settenari e stesa delle tre fasi.',
      'Chiusura del Primo Step con ripasso al Sigillo flashcard.',
    ],
    contentMarkdown: `## Laboratorio Pratico Finale e Verifica delle Competenze

Questa sezione trasforma l'inquadramento teorico dei Tre Settenari in **competenza attiva**, per verificare il livello di assimilazione e usare le carte nella consultazione pratica.

## Test di Autovalutazione dei Cicli

Rispondi ai quesiti guida per capire quale settenario risuona con maggiore frequenza nella tua situazione (o in quella del consultante).

### 1. Fase di Avvio — Primo Settenario (0 – VII)

Si sta vivendo un nuovo inizio, cercando la propria direzione o posando le basi di un progetto pratico? In tal caso, analizza l'energia del Matto, del Bagatto e del Carro.

### 2. Fase di Scelta ed Elaborazione — Secondo Settenario (VIII – XIV)

Si stanno affrontando blocchi, soste forzate, norme da rispettare o trasformazioni radicali? In tal caso, approfondisci la lezione dell'Eremita, dell'Appeso o della Morte.

### 3. Fase di Svolta e Realizzazione — Terzo Settenario (XV – XXI)

Si stanno recidendo schemi limitanti, affrontando lati d'Ombra o raccogliendo i frutti di un percorso completo? In tal caso, osserva l'impatto della Torre, del Sole o del Mondo.

## Esercizi Pratici di Lettura

### Esercizio A — Il tris dei settenari

Estrai una carta a caso dal mazzo. Riconosci a quale dei tre settenari appartiene e articola a voce alta la lezione evolutiva che esprime per la situazione esaminata.

### Esercizio B — La stesa delle tre fasi

Esegui una stesa a tre carte, una per ciascun settenario:

1. **Prima carta (1° Settenario)** — punto di partenza e azione pratica immediata.
2. **Seconda carta (2° Settenario)** — nodo interiore o prova etica da superare.
3. **Terza carta (3° Settenario)** — prospettiva di sblocco e direzione evolutiva finale.

## Chiusura del Primo Step

Dopo autovalutazione ed esercizi, ripassa i Trionfi 0–XXI con il **Sigillo di apprendimento** (flashcard) e segna i moduli completati nella tua Area Riservata.
`,
  },
];
