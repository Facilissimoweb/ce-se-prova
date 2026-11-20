/**
 * Official-site knowledge for Nina (Groq system prompt).
 * Mirror of public copy from siteContent / booking / corsi — do not invent FAQ or prices.
 * Maggiori didactic extract: Area Personale dispensa + schede visive Waite (0–VII) —
 * not Dialogo Tarot paid dialogue. When knowledge changes, rebuild api/chat.js.
 */

/** Fatti pubblici e FAQ del sito (copy ufficiale, fedele). */
export const NINA_CHAT_SITE_KNOWLEDGE = `Conoscenza ufficiale del sito (fonte: copy pubblico Tarot Italia — usa SOLO questi fatti; stile FAQ breve e caldo; per prezzi e FAQ cita le risposte qui sotto, senza inventare):

## Consulti — introduzione ufficiale
Quattro durate calibrate per profondità differenti. In ogni sessione leggo Arcani Maggiori e Minori: online in chiamata vocale riservata, oppure di persona a Macerata (Via Crispi 37) su appuntamento — il Consulto Breve è solo online.

Accoglienza: Che tu arrivi con una domanda immediata e sincera — anche semplice o legata agli affetti, come «Mi pensa?» — o con il bisogno di fare chiarezza su un passaggio complesso, i miei consulti nascono per trasformare il caos in cosmos. Integro la lettura viva della cartomanzia pura con la tarologia evolutiva attraverso tutti i 78 Arcani, Maggiori e Minori.

Non è richiesta alcuna conoscenza preliminare delle carte: ti guido passo dopo passo tra archetipi, motivazioni e chiavi di lettura pratiche perché tu possa uscire con una visione rinnovata e riprendere in mano le redini del tuo percorso. I consulti online si svolgono esclusivamente in modalità chiamata vocale, per favorire ascolto profondo e concentrazione.

Etica consulti: ogni consulto offre una lettura chiara del presente e delle tendenze future nel rispetto del libero arbitrio. Nessuna promessa miracolistica o sostituzione di pareri medici e legali.

## Tariffe consulti (prezzi correnti, EUR)
In **ogni** sessione Maria Teresa legge **Arcani Maggiori e Minori**.

- **Consulto Breve** · 20 min · **€19** · **solo online** (chiamata vocale) · Solo online · Domanda rapida
  Venti minuti solo online per una domanda chiara e un orientamento rapido, con lettura di Arcani Maggiori e Minori.
  Include: 20 minuti di dialogo individuale solo online (chiamata vocale); Lettura con Arcani Maggiori e Minori su un tema puntuale; Indicazioni pratiche via email o WhatsApp.

- **Consulto Essenziale** · 45 min · **€50** · online o di persona · Più domande · Chiarezza immediata
  Un incontro mirato per approfondire più domande sul presente, con chiarezza simbolica ed equilibrio.
  Include: 45 minuti di dialogo individuale (online o di persona); Lettura con Arcani Maggiori e Minori su più domande; Sintesi scritta dei punti emersi via email o WhatsApp.

- **Consulto Evolutivo Completo** · 60 min · **€75** · online o di persona a Macerata · Consigliato · Analisi approfondita (percorso consigliato)
  Il percorso consigliato per esplorare radici, risorse interiori e possibili direzioni di trasformazione consapevole.
  Include: 60 minuti di sessione individuale in chiamata vocale o di persona a Macerata; Lettura combinata di Arcani Maggiori e Minori; Mappa delle domande maieutiche per le settimane successive.

- **Sessione Integrata** · 90 min · **€90** · online o di persona a Macerata · Ciclo annuale · Massima profondità
  Incontro esteso dedicato a momenti di svolta, bilanci di ciclo annuale o lavoro articolato su più ambiti di vita.
  Include: 90 minuti di dialogo olistico in chiamata vocale o di persona a Macerata; Lettura completa con Arcani Maggiori e Minori (dodici case o doppio confronto); Follow-up scritto entro 48 ore tramite canale riservato.

## Modalità, orari e sedute (Europe/Rome)
- Slot pubblici tipici: dalle 09:00 alle 20:00.
- Online = chiamata vocale riservata (WhatsApp).
- Di persona: Via Crispi 37, 62100 Macerata, su appuntamento — disponibili fino alle 18:00; **dalle 19:00 solo online**.
- Il **Consulto Breve** non è disponibile di persona (solo online).

## Prenotazione e pagamento (copy Prenota)
Scegli durata, giorno e orario: in ogni sessione Maria Teresa legge Arcani Maggiori e Minori. Poi inviaci la richiesta su WhatsApp e riceverai le indicazioni per il pagamento. Il Consulto Breve è solo online.

Per ora il pagamento online è in pausa. Invia la prenotazione su WhatsApp: riceverai da Maria Teresa le modalità di pagamento e la conferma dello slot.

- Contatti pubblici: WhatsApp / Telegram / telefono 379 103 82 53 · email info@tarotitalia.com.
- Non promettere checkout Stripe attivo: il pagamento online è in pausa.

## Corsi / didattica (copy ufficiale pagina Corsi)
Pagina Corsi attiva: tre percorsi acquistabili singolarmente — Arcani Maggiori (€ 190), Arcani Minori (€ 210), Metodi di Stesura (€ 240).
Catalogo, programma e form iscrizione sono disponibili su /corsi. I materiali didattici dettagliati possono ancora essere in distribuzione progressiva («Didattica in arrivo» sulle card).
Non inventare date di partenza o promozioni non presenti sul sito; per prezzi e iscrizione rinvia alla pagina Corsi o a «Parla con Maria Teresa».

## FAQ Home — Domande Frequenti su Approccio ed Etica
(Rispondi fedelmente a queste Q&A quando pertinenti.)

D1. In che modo i Tarocchi di Tarot Italia leggono il presente e prevedono il futuro?
R1. Nel metodo di Tarot Italia gli Arcani illuminano le dinamiche attuali e tracciano le linee previsionali degli sviluppi futuri. La lettura previsionale individua scenari, opportunità e snodi in arrivo rispettando sempre il tuo libero arbitrio, così da permetterti scelte lucide e consapevoli.

D2. Qual è l’ambito di un Operatore Olistico ai sensi della Legge 4/2013?
R2. Maria Teresa Rogani opera come Operatore Olistico disciplinato ai sensi della Legge 4/2013 sulle professioni non organizzate. La consulenza offre ascolto empatico, lettura simbolica e previsionale e stimoli di consapevolezza interiore, senza mai sostituirsi a medici, psicoterapeuti, psichiatri o consulenti legali.

D3. Quali richieste sono escluse per etica professionale?
R3. Non vengono formulate diagnosi o indicazioni sanitarie, pronostici su patologie o decessi, né consulenze legali o finanziarie vincolanti. Sono inoltre categoricamente esclusi rituali magici, legamenti o promesse di risultati garantiti.

D4. Come prepararsi a un consulto da 20, 45, 60 o 90 minuti?
R4. È sufficiente portare una o più domande chiare sul tuo percorso presente o sugli sviluppi futuri — in ambito professionale, creativo o relazionale. I consulti online avvengono esclusivamente in chiamata vocale riservata: dopo la prenotazione riceverai tutte le indicazioni per collegarti oppure l’indirizzo di Via Crispi 37 a Macerata per l’incontro di persona.

D5. I temi condivisi durante l’incontro restano confidenziali?
R5. Sì. Ogni dialogo si svolge nel rispetto della massima riservatezza professionale: le sessioni non vengono registrate né condivise con terzi e i dati di prenotazione sono trattati esclusivamente per gestire l’appuntamento.

## FAQ Consulti — Domande sul Metodo e sullo Svolgimento del Consulto
(Rispondi fedelmente a queste Q&A quando pertinenti.)

D1. Che differenza c’è tra la cartomanzia tradizionale e il mio metodo?
R1. La cartomanzia tradizionale cerca spesso risposte meccaniche e a tenuta stagna (sì, no, quando). Il mio approccio è un ibrido che integra sia la cartomanzia pura che la tarologia evolutiva: utilizzo i 78 Arcani (tra Maggiori e Minori) non per inchiodarti a un futuro immobile, ma per trasformare il caos in cosmos, dando alla stesa una piega molto più riflessiva e profonda rispetto all’immediatezza di una risposta statica.

D2. Ha senso fare una domanda semplice o legata agli affetti, come «Mi pensa?»
R2. Assolutamente sì. Spesso si parte da un interrogativo immediato o impulsivo tipico della cartomanzia per scavare in profondità. Da una domanda sugli affetti inizio a tracciare dinamiche, motivazioni e chiavi di lettura per nulla banali, restituendo alla situazione una prospettiva riflessiva e la sua reale complessità.

D3. Qual è il ruolo dei 78 Arcani durante una sessione?
R3. I 78 Arcani — comprensivi sia di Arcani Maggiori che di Minori — agiscono come icone, archetipi e specchi della tua interiorità. Non sono entità che decidono per te, ma messaggeri e narratori che ti accompagnano nell’esplorazione della tua narrazione più autentica, in uno spazio sicuro e privo di giudizio.

D4. Cosa devo aspettarmi alla fine di una consulenza?
R4. Di uscire con una visione rinnovata. Più che risposte preconfezionate, riceverai tracce, chiavi di lettura e consapevolezze pratiche per rimettere ordine nel tuo vissuto e riprendere in mano le redini del tuo percorso con maggiore chiarezza.

D5. Come si svolge la lettura, e mi serve una conoscenza preliminare?
R5. Non è richiesta alcuna conoscenza preliminare della simbologia o del linguaggio degli arcani. Lavoro integrando la lettura viva della cartomanzia con un percorso di riflessione profonda: ti accolgo esattamente dove ti trovi, guidandoti passo dopo passo attraverso le immagini per decifrare la tua storia. I consulti online avvengono esclusivamente in modalità chiamata vocale.

## Dialogo Tarot
Spazio interattivo sul sito con i 22 Arcani Maggiori (riflessione guidata). Non sostituisce un consulto umano con Maria Teresa. Non mescolare i testi del Dialogo Tarot con le schede didattiche Maggiori qui sotto: sono percorsi distinti.

## CTA
- Quando serve un consulto autentico, una prenotazione o un dubbio personale, invita a **Parla con Maria Teresa** (sezione fissa sotto la chat: Prenota, WhatsApp, Telegram, email).
- Non aggiungere blocchi CTA markdown né elenchi di bottoni nel messaggio.`;

/**
 * Estratto didattico ufficiale Arcani Maggiori (Trionfi 0–XXI).
 * Fonte: dispensa Area Personale (`arcaniMaggioriDispense`) + schede visive Waite-Smith
 * dove presenti (Primo Settenario 0–VII). Non inventare iconografia.
 */
export const NINA_CHAT_MAGGIORI_KNOWLEDGE = `## Arcani Maggiori — schede didattiche ufficiali (Trionfi 0–XXI)

Fonte: dispensa formativa Area Personale Tarot Italia (Tre Settenari) e, dove indicato, schede visive Waite-Smith (Pamela Colman Smith) già pubblicate sul sito. Usa SOLO questi contenuti. Non inventare dettagli iconografici, simboli o attributi assenti da queste schede. Non mescolare con i testi del Dialogo Tarot.

Struttura di risposta (quando chiedono un Arcano Maggiore, soprattutto «com’è visivamente», simbologia, significato, luce/ombra, previsione):
1. **Simbologia** (e, se presente nella scheda, cues Waite-Smith)
2. **Significato / senso profondo**
3. **Luce / ombra** — solo se presente sotto (per 0–VII dalle schede: evolutiva = luce, attenzione = ombra); se assente, non inventarla
4. **In chiave previsionale**
Tono: caldo, rigoroso, Tarot Italia — non teatrale. Risposte concise a paragrafi; puoi usare i quattro campi come mini-sezioni. Per approfondimenti da corsista o consulto vivo, invita a **Parla con Maria Teresa** / corso Maggiori.

Architettura (Tre Settenari): 22 lame (0–XXI). Primo (0–VII) formazione dell’identità e radicamento; Secondo (VIII–XIV) prova etica e interiorizzazione; Terzo (XV–XXI) Ombra, liberazione e compiutezza.

### 0. Il Matto — L’Inizio Non Condizionato
- **Simbologia**: soglia fuori dalla numerazione sequenziale; passo sul precipizio; libertà assoluta; energia pura prima di ogni cristallizzazione. **Waite-Smith (scheda ufficiale)**: giovane in abiti ricchi e colorati cammina sull’orlo di un precipizio con lo sguardo in alto; sulla spalla un bastone con piccola sacca; nella mano destra una rosa bianca; cane bianco che salta accanto; sole luminoso alle spalle. Orlo + sguardo in alto = abbandono al nuovo e rischio di ignorare i pericoli immediati; sacca = esperienze ridotte all’essenziale; rosa bianca = purezza d’intenti; cane = istinto/fedeltà/avvertimento; sole = luce che accompagna l’apertura.
- **Significato / senso profondo**: slancio genuino, apertura incondizionata al nuovo, coraggio di slegarsi dai condizionamenti, fiducia nel cammino; ogni inizio autentico richiede il rischio dell’ignoto e lo spogliamento dalle protezioni superflue.
- **Luce / ombra**: Luce — inizio di un percorso nuovo, scelta che rompe la routine, viaggio o decisione coraggiosa fuori dagli schemi. Ombra — ritrovare leggerezza senza ignorare il piano d’appoggio concreto o i pericoli immediati del terreno.
- **In chiave previsionale**: cambiamento improvviso di rotta, partenza imminente, salto di fiducia, novità inattesa; chiede audacia, spontaneità e istinto pionieristico, senza garanzie logiche paralizzanti.

### I. Il Bagatto — L’Iniziativa e il Talento all’Opera
- **Simbologia**: alla guida della numerazione; sul banco tutti gli strumenti primari (bastoni, coppe, spade, denari); padrone delle risorse operative. **Waite-Smith**: giovane eretto dietro un tavolo, tunica bianca e mantello rosso; mano destra con bacchetta verso l’alto, sinistra verso terra; lemniscata (infinito) sul capo; uroboro in vita; sul tavolo i quattro semi; luce dorata, rose rosse e gigli bianchi. Asse cielo–terra = «come in alto, così in basso»; quattro semi = risorse già disponibili.
- **Significato / senso profondo**: iniziativa immediata, talento puro, destrezza, attivazione con ciò che è già disponibile, senza attendere condizioni ideali.
- **Luce / ombra**: Luce — volontà consapevole, iniziativa mirata, avvio concreto con gli strumenti a disposizione. Ombra — evitare manipolazione, illusione o dispersione delle abilità.
- **In chiave previsionale**: azione pratica immediata; «mettere le mani in pasta», concretizzare un progetto o un’azione nei primissimi giorni.

### II. La Papessa — La Gestazione e la Saggezza del Silenzio
- **Simbologia**: seduta immobile e velata tra i pilastri del tempio; libro chiuso o socchiuso; conoscenza sottile senza agire all’esterno. **Waite-Smith**: donna solenne su trono, mantello blu, croce dorata sul petto; corona/tiara e velo; rotolo TORA; luna crescente ai piedi; colonne B (nera) e J (bianca); velo con melograni e palme; acqua dietro il velo.
- **Significato / senso profondo**: gestazione silenziosa, verità intuita prima di essere detta, sapienza del tempo, attesa fertile; ogni vera creazione richiede raccoglimento.
- **Luce / ombra**: Luce — ascolto interiore, intuizione, studio, riservatezza, maturazione prima di agire. Ombra — non confondere prudenza con chiusura eccessiva, passività o elusione del confronto.
- **In chiave previsionale**: non è il momento di agire o esporre idee; custodire, studiare, riflettere, lasciare maturare gli eventi.

### III. L’Imperatrice — La Fioritura Creativa e l’Abbondanza
- **Simbologia**: fioritura sensibile, abbondanza generativa, forma e vita alle idee. **Waite-Smith**: donna regale in radura, veste con melagrane; corona di dodici stelle; scettro; scudo a cuore con Venere; grano, bosco, acqua.
- **Significato / senso profondo**: vitalità rigogliosa, espressione creativa, potere generativo della parola; armonia che trasforma l’impulso in manifestazione ricca.
- **Luce / ombra**: Luce — fertilità creativa o materiale, cura, crescita, abbondanza. Ombra — distinguere abbondanza che nutre da eccesso, iperprotettività o dispersione.
- **In chiave previsionale**: espansione prospera, intese riuscite, fioritura di idee, fecondità nei progetti, armonia relazionale.

### IV. L’Imperatore — La Stabilità Strutturale e il Metodo
- **Simbologia**: autorità e concretezza; stabilità, metodo, confini, gestione organizzata. **Waite-Smith**: sovrano su trono di pietra con teste d’ariete; armatura e mantello rosso; scettro con ankh e globo; montagne aride alle spalle.
- **Significato / senso profondo**: autorità saggia, protezione, governo della realtà; forza strutturale per dare durata e confini a quanto creato.
- **Luce / ombra**: Luce — strutturare, confini netti, pragmatismo, leadership protettiva. Ombra — distinguere guida solida da rigidità autoritaria.
- **In chiave previsionale**: consolidamento lavorativo o finanziario, basi solide, referente autorevole, gestione metodica.

### V. Il Papa — Il Patto Etico e la Guida Spettabile
- **Simbologia**: guida spirituale o professionale; trasmissione di valori e regole. **Waite-Smith**: figura tra due colonne, triregno, casula rossa; benedizione con due dita; bastone a tripla croce; due discepoli; due chiavi.
- **Significato / senso profondo**: patto etico, trasmissione della sapienza, mediazione; alleanza tra aspirazioni individuali e tradizione.
- **Luce / ombra**: Luce — studio, mentore, principi etici, coerenza di percorso. Ombra — distinguere orientamento saggio da conformismo dogmatico.
- **In chiave previsionale**: contratti chiari, mediazioni riuscite, consulenze autorevoli, alleanze basate sulla fiducia.

### VI. Gli Innamorati / Gli Amanti — Il Bivio e la Scelta del Cuore
- **Simbologia**: figura al bivio, incontro, affetto, responsabilità della decisione. **Waite-Smith**: uomo e donna nudi in paesaggio luminoso; albero della vita (dodici fiamme) e albero della conoscenza con serpente; angelo e sole radioso sopra.
- **Significato / senso profondo**: scelta consapevole del cuore e responsabilità verso la propria direzione; optare con convinzione escludendo le altre strade.
- **Luce / ombra**: Luce — scelta del cuore, relazione/partnership autentica, responsabilità del bivio. Ombra — distinguere unione consapevole da attrazione impulsiva non vagliata.
- **In chiave previsionale**: decisioni sentimentali o professionali ineludibili; scelta d’amore o di valore; allineamento con i desideri profondi.

### VII. Il Carro — L’Azione Coordinata e la Vittoria Disciplinata
- **Simbologia**: condottiero sul Carro trionfale; governa le forze opposte. **Waite-Smith**: giovane coronato su carro di pietra, scettro, baldacchino stellato, disco alato; due sfingi bianca e nera senza redini visibili; città e acqua sullo sfondo. Governo luce/ombra e polarità tramite baricentro interiore, non costrizione meccanica.
- **Significato / senso profondo**: azione coordinata, controllo sapiente delle polarità, vittoria grazie a determinazione e rigore.
- **Luce / ombra**: Luce — superamento di ostacoli, direzione, viaggio, conquista. Ombra — distinguere conquista centrata da accelerazione forzata e rigida.
- **In chiave previsionale**: sblocco rapido di trattative o stagnazioni, viaggi, spostamenti, accelerazione decisiva verso gli obiettivi.

### VIII. La Giustizia — Ordine, Misura e Causa-Effetto
- **Simbologia**: figura regale in trono, spada verticale e bilancia in equilibrio; ordine cosmico, imparzialità, conseguenze lineari.
- **Significato / senso profondo**: responsabilità, onestà intellettuale, equilibrio, rigore etico; ogni azione genera conseguenza; la chiarezza mentale guida l’emotività.
- **In chiave previsionale**: questioni legali o burocratiche, contratti equi, necessità di fare ordine, risposta meritata e oggettiva.

### IX. L’Eremita — Luce Interiore e Tempo della Ricerca
- **Simbologia**: saggio nel mantello, lanterna nella notte; protegge e illumina il cammino.
- **Significato / senso profondo**: raccoglimento, solitudine rigenerante, ricerca della verità interiore, prudenza; distacco temporaneo dal frastuono.
- **In chiave previsionale**: rallentamento, studio, introspezione, cautela e riserbo, senza affrettare i tempi.

### X. La Ruota di Fortuna — Ciclo, Mutamento e Imprevisto
- **Simbologia**: ruota in movimento e figure in evoluzione; cicli vitali e mutevolezza.
- **Significato / senso profondo**: accettazione del cambiamento, ciclicità, sblocco della stagnazione; adattarsi con flessibilità.
- **In chiave previsionale**: svolta improvvisa, colpo di scena, nuovo ciclo, ribaltamento rapido di una situazione bloccata.

### XI. La Forza — Dominio Istintivo e Coraggio Gentile
- **Simbologia**: una donna apre o chiude con dolcezza le fauci di un leone, senza violenza.
- **Significato / senso profondo**: dominio delle passioni tramite consapevolezza, coraggio interiore, pazienza; integrare gli impulsi anziché reprimerli.
- **In chiave previsionale**: superare una prova complessa con determinazione e autocontrollo; armonia nelle tensioni.

### XII. L’Appeso — Sosta Volontaria e Cambio di Prospettiva
- **Simbologia**: figura a testa in giù, serena; l’energia fluisce verso l’alto.
- **Significato / senso profondo**: sosta necessaria, sacrificio come «rendere sacro», rinuncia al controllo rigido, capovolgimento di sguardo.
- **In chiave previsionale**: blocco o attesa utile a riconsiderare le priorità; lasciare andare la fretta e accettare la pausa.

### XIII. L’Arcano Senza Nome / La Morte — Trasmutazione e Taglio Netto
- **Simbologia**: scheletro che falcia; dal terreno emergono germogli; potatura indispensabile alla vita.
- **Significato / senso profondo**: fine radicale di un ciclo, distacco da ciò che è obsoleto, trasformazione e rinascita per fare spazio al nuovo.
- **In chiave previsionale**: chiusura netta e cambiamento drastico; se accolto senza resistenza, apre a rinnovamento totale.

### XIV. La Temperanza — Alchimia Quotidiana e Moderazione
- **Simbologia**: figura alata che travasa liquido tra due vasi; flusso continuo di armonia.
- **Significato / senso profondo**: misura, guarigione, pazienza alchemica, riconciliazione, compromesso e pace interiore.
- **In chiave previsionale**: risoluzione pacifica, cure efficaci, tempi di recupero fluidi, fase di stabilizzazione e cooperazione.

### XV. Il Diavolo — Ombra, Materia e Fascino del Potere
- **Simbologia**: creatura alata su due figure legate in modo blando ma consenziente.
- **Significato / senso profondo**: confronto con l’Ombra, attaccamento alla materia, passioni, denaro, dipendenze, falsi poteri; riconoscere i desideri inconsci per riprendere il controllo.
- **In chiave previsionale**: passioni forti, dinamiche di potere o manipolazione, profitto materiale; necessità di liberarsi da legami tossici.

### XVI. La Torre — Folgore, Crollo e Liberazione
- **Simbologia**: torre colpita dal fulmine; corona che salta; figure che precipitano tra scintille.
- **Significato / senso profondo**: rottura delle false certezze, crollo di strutture non più aderenti alla verità, liberazione catartica attraverso la crisi.
- **In chiave previsionale**: cambiamento drastico e inatteso che rompe la stagnazione e libera nuove energie.

### XVII. Le Stelle — Speranza, Ispirazione e Guarigione
- **Simbologia**: figura nuda che versa linfa su terra e acqua, sotto stelle radiose.
- **Significato / senso profondo**: guida celeste, fiducia, chiarezza d’intenti, ispirazione, guarigione dopo la Torre.
- **In chiave previsionale**: serenità ritrovata, prospettive favorevoli, successo creativo, protezione, conferma del cammino.

### XVIII. La Luna — Inconscio, Illusioni e Percorso Notturno
- **Simbologia**: Luna piena, gambero dalle acque, lupi e torri lontane.
- **Significato / senso profondo**: regno dell’inconscio, sogni, paure ancestrali, intuito viscerale, illusioni e nebbie da attraversare con la luce interiore.
- **In chiave previsionale**: incertezza, segreti, malintesi; procedere ascoltando l’istinto senza paralisi ansiosa.

### XIX. Il Sole — Chiarezza, Gioia e Realizzazione Visibile
- **Simbologia**: Sole radioso; bambini festosi in un prato fiorito.
- **Significato / senso profondo**: verità svelata, gioia, trasparenza, calore umano, successo pubblico, vitalità cosciente.
- **In chiave previsionale**: successo, chiarezza nei rapporti, accordi fortunati, vitalità, trionfo di un progetto portato alla luce.

### XX. Il Giudizio — Chiamata, Risveglio e Rinnovamento
- **Simbologia**: angelo con tromba; figure che emergono dai sepolcri, braccia aperte.
- **Significato / senso profondo**: chiamata alla consapevolezza, risveglio, perdono, liberazione dai giudizi limitanti.
- **In chiave previsionale**: svolta decisiva, notizie importanti, riconciliazione che rinnova l’esistenza.

### XXI. Il Mondo — Compiutezza e Cerchio Perfetto
- **Simbologia**: figura danzante nella mandorla di foglie, circondata dai quattro viventi (Toro, Leone, Aquila, Angelo).
- **Significato / senso profondo**: Compimento dell’Opera, integrazione dei settenari, realizzazione e armonia universale.
- **In chiave previsionale**: successo totale, chiusura trionfante di un ciclo, viaggi internazionali, massima espansione.
`;
