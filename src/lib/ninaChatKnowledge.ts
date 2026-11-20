/**
 * Official-site knowledge for Nina (Groq system prompt).
 * Mirror of public copy from siteContent / booking / corsi — do not invent FAQ or prices.
 * Maggiori didactic extract: Area Personale dispensa + schede visive Waite (0–VII) —
 * not Dialogo Tarot paid dialogue. Inject only matched Trionfi per request (ENN-138).
 * When knowledge changes, rebuild api/chat.js.
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
Spazio interattivo sul sito con i 22 Arcani Maggiori (riflessione guidata). Non sostituisce un consulto umano con Maria Teresa. Non mescolare i testi del Dialogo Tarot con le schede didattiche Maggiori: sono percorsi distinti.

## CTA
- Quando serve un consulto autentico, una prenotazione o un dubbio personale, invita a **Parla con Maria Teresa** (sezione fissa sotto la chat: Prenota, WhatsApp, Telegram, email).
- Non aggiungere blocchi CTA markdown né elenchi di bottoni nel messaggio.`;

export type NinaMaggioriCard = {
  id: number;
  roman: string;
  title: string;
  /** Keywords / aliases for on-demand matching (lowercase, no accents required). */
  aliases: string[];
  /** Compact card body: simbologia cue + senso + previsione (+ luce/ombra if short). */
  body: string;
};

/**
 * Compact Maggiori cards (Trionfi 0–XXI).
 * Fonte: dispensa Area Personale + schede visive Waite-Smith (0–VII).
 * Slimmed for Groq payload limits (ENN-138) — no verbose duplicates.
 */
export const NINA_MAGGIORI_CARDS: readonly NinaMaggioriCard[] = [
  {
    id: 0,
    roman: '0',
    title: 'Il Matto',
    aliases: ['matto', 'il matto', 'fool'],
    body: `### 0. Il Matto — L’Inizio Non Condizionato
- **Simbologia**: soglia fuori numerazione; passo sul precipizio; libertà prima di ogni cristallizzazione. **Waite**: giovane in abiti colorati sull’orlo, sguardo in alto; bastone con sacca; rosa bianca; cane bianco; sole alle spalle. Orlo+sguardo=abbandono al nuovo e rischio; sacca=essenziale; rosa=purezza; cane=istinto/avvertimento; sole=luce sull’apertura.
- **Senso**: slancio genuino, apertura incondizionata, coraggio di slegarsi dai condizionamenti; ogni inizio autentico richiede il rischio dell’ignoto.
- **Luce/ombra**: Luce — percorso nuovo, rottura di routine, viaggio coraggioso. Ombra — leggerezza senza ignorare il terreno concreto.
- **Previsione**: cambio di rotta, partenza, salto di fiducia, novità; chiede audacia e istinto, senza garanzie paralizzanti.`,
  },
  {
    id: 1,
    roman: 'I',
    title: 'Il Bagatto',
    aliases: ['bagatto', 'il bagatto', 'mago', 'magician'],
    body: `### I. Il Bagatto — L’Iniziativa e il Talento
- **Simbologia**: guida della numerazione; sul banco bastoni, coppe, spade, denari. **Waite**: giovane al tavolo, tunica bianca/mantello rosso; bacchetta su, mano a terra; lemniscata; uroboro; quattro semi; rose e gigli. Asse cielo–terra; risorse già disponibili.
- **Senso**: iniziativa immediata, talento, destrezza, agire con ciò che c’è già.
- **Luce/ombra**: Luce — volontà mirata, avvio concreto. Ombra — manipolazione, illusione, dispersione.
- **Previsione**: azione pratica immediata; concretizzare un progetto nei primi giorni.`,
  },
  {
    id: 2,
    roman: 'II',
    title: 'La Papessa',
    aliases: ['papessa', 'la papessa', 'sacerdotessa', 'high priestess'],
    body: `### II. La Papessa — Gestazione e Saggezza del Silenzio
- **Simbologia**: seduta velata tra pilastri; libro chiuso/socchiuso; conoscenza sottile. **Waite**: trono, mantello blu, croce dorata; corona/velo; rotolo TORA; luna ai piedi; colonne B/J; velo con melograni; acqua dietro.
- **Senso**: gestazione silenziosa, verità intuita, attesa fertile; creazione richiede raccoglimento.
- **Luce/ombra**: Luce — ascolto, intuizione, studio, maturazione. Ombra — chiusura eccessiva, passività.
- **Previsione**: non agire/esporre ora; custodire, studiare, lasciare maturare.`,
  },
  {
    id: 3,
    roman: 'III',
    title: 'L’Imperatrice',
    aliases: ['imperatrice', "l'imperatrice", 'empress'],
    body: `### III. L’Imperatrice — Fioritura e Abbondanza
- **Simbologia**: fioritura sensibile, forma e vita alle idee. **Waite**: donna in radura, veste con melagrane; corona di 12 stelle; scettro; scudo Venere; grano, bosco, acqua.
- **Senso**: vitalità, espressione creativa, potere generativo; impulso che diventa manifestazione.
- **Luce/ombra**: Luce — fertilità, cura, crescita. Ombra — eccesso, iperprotettività, dispersione.
- **Previsione**: espansione, intese, fioritura di idee, armonia relazionale.`,
  },
  {
    id: 4,
    roman: 'IV',
    title: 'L’Imperatore',
    aliases: ['imperatore', "l'imperatore", 'emperor'],
    body: `### IV. L’Imperatore — Stabilità e Metodo
- **Simbologia**: autorità, confini, gestione organizzata. **Waite**: trono di pietra con arieti; armatura e mantello rosso; ankh e globo; montagne aride.
- **Senso**: autorità saggia, protezione, governo della realtà; struttura che dà durata.
- **Luce/ombra**: Luce — strutturare, pragmatismo, leadership. Ombra — rigidità autoritaria.
- **Previsione**: consolidamento, basi solide, referente autorevole, gestione metodica.`,
  },
  {
    id: 5,
    roman: 'V',
    title: 'Il Papa',
    aliases: ['il papa', 'papa', 'ierofante', 'hierophant'],
    body: `### V. Il Papa — Patto Etico e Guida
- **Simbologia**: guida spirituale/professionale; trasmissione di valori. **Waite**: tra due colonne, triregno, casula rossa; benedizione a due dita; tripla croce; due discepoli; due chiavi.
- **Senso**: patto etico, mediazione; alleanza tra aspirazioni e tradizione.
- **Luce/ombra**: Luce — studio, mentore, etica. Ombra — conformismo dogmatico.
- **Previsione**: contratti chiari, mediazioni, consulenze, alleanze di fiducia.`,
  },
  {
    id: 6,
    roman: 'VI',
    title: 'Gli Amanti',
    aliases: ['amanti', 'gli amanti', 'innamorati', 'lovers'],
    body: `### VI. Gli Amanti — Il Bivio e la Scelta del Cuore
- **Simbologia**: bivio, incontro, responsabilità della decisione. **Waite**: uomo e donna nudi; albero della vita (12 fiamme) e della conoscenza con serpente; angelo e sole.
- **Senso**: scelta consapevole del cuore; optare escludendo le altre strade.
- **Luce/ombra**: Luce — scelta autentica, partnership, responsabilità. Ombra — attrazione impulsiva non vagliata.
- **Previsione**: decisioni sentimentali/professionali ineludibili; allineamento ai desideri profondi.`,
  },
  {
    id: 7,
    roman: 'VII',
    title: 'Il Carro',
    aliases: ['il carro', 'carro', 'chariot'],
    body: `### VII. Il Carro — Azione Coordinata e Vittoria
- **Simbologia**: condottiero che governa forze opposte. **Waite**: giovane coronato su carro di pietra, scettro, baldacchino stellato; due sfingi B/N senza redini; città e acqua. Governo via baricentro interiore.
- **Senso**: controllo sapiente delle polarità; vittoria con determinazione e rigore.
- **Luce/ombra**: Luce — direzione, viaggio, conquista. Ombra — accelerazione forzata.
- **Previsione**: sblocco di stagnazioni, viaggi, accelerazione verso obiettivi.`,
  },
  {
    id: 8,
    roman: 'VIII',
    title: 'La Giustizia',
    aliases: ['giustizia', 'la giustizia', 'justice'],
    body: `### VIII. La Giustizia — Ordine e Causa-Effetto
- **Simbologia**: figura in trono, spada verticale e bilancia; imparzialità, conseguenze lineari.
- **Senso**: responsabilità, onestà, equilibrio etico; ogni azione genera conseguenza.
- **Previsione**: questioni legali/burocratiche, contratti equi, ordine, risposta meritata.`,
  },
  {
    id: 9,
    roman: 'IX',
    title: 'L’Eremita',
    aliases: ['eremita', "l'eremita", 'hermit'],
    body: `### IX. L’Eremita — Luce Interiore
- **Simbologia**: saggio nel mantello, lanterna nella notte; protegge e illumina il cammino.
- **Senso**: raccoglimento, solitudine rigenerante, ricerca interiore, prudenza.
- **Previsione**: rallentamento, studio, introspezione, riserbo senza affrettare.`,
  },
  {
    id: 10,
    roman: 'X',
    title: 'La Ruota di Fortuna',
    aliases: ['ruota di fortuna', 'ruota della fortuna', 'wheel of fortune'],
    body: `### X. La Ruota di Fortuna — Ciclo e Mutamento
- **Simbologia**: ruota in movimento; cicli vitali e mutevolezza.
- **Senso**: accettazione del cambiamento, sblocco della stagnazione; flessibilità.
- **Previsione**: svolta improvvisa, nuovo ciclo, ribaltamento di una situazione bloccata.`,
  },
  {
    id: 11,
    roman: 'XI',
    title: 'La Forza',
    aliases: ['la forza', 'forza', 'strength'],
    body: `### XI. La Forza — Dominio Istintivo
- **Simbologia**: donna che apre/chiude con dolcezza le fauci di un leone, senza violenza.
- **Senso**: dominio delle passioni con consapevolezza; integrare gli impulsi.
- **Previsione**: superare una prova con determinazione e autocontrollo.`,
  },
  {
    id: 12,
    roman: 'XII',
    title: 'L’Appeso',
    aliases: ['appeso', "l'appeso", 'hanged man'],
    body: `### XII. L’Appeso — Sosta e Cambio di Prospettiva
- **Simbologia**: figura a testa in giù, serena; energia verso l’alto.
- **Senso**: sosta necessaria, sacrificio come «rendere sacro», capovolgimento di sguardo.
- **Previsione**: attesa utile a riconsiderare priorità; lasciare andare la fretta.`,
  },
  {
    id: 13,
    roman: 'XIII',
    title: 'La Morte',
    aliases: ['la morte', 'morte', 'death', 'arcano senza nome', 'senza nome'],
    body: `### XIII. L’Arcano Senza Nome / La Morte — Trasmutazione
- **Simbologia**: scheletro che falcia; germogli dal terreno; potatura indispensabile.
- **Senso**: fine di un ciclo, distacco dall’obsoleto, trasformazione per fare spazio.
- **Previsione**: chiusura netta; se accolta, apre a rinnovamento totale.`,
  },
  {
    id: 14,
    roman: 'XIV',
    title: 'La Temperanza',
    aliases: ['temperanza', 'la temperanza', 'temperance'],
    body: `### XIV. La Temperanza — Alchimia e Moderazione
- **Simbologia**: figura alata che travasa liquido tra due vasi; flusso di armonia.
- **Senso**: misura, guarigione, pazienza, riconciliazione, pace interiore.
- **Previsione**: risoluzione pacifica, cure, recupero, cooperazione.`,
  },
  {
    id: 15,
    roman: 'XV',
    title: 'Il Diavolo',
    aliases: ['diavolo', 'il diavolo', 'devil'],
    body: `### XV. Il Diavolo — Ombra e Materia
- **Simbologia**: creatura alata su due figure legate in modo blando ma consenziente.
- **Senso**: confronto con l’Ombra, attaccamenti, passioni, dipendenze; riconoscere i desideri inconsci.
- **Previsione**: passioni forti, dinamiche di potere; liberarsi da legami tossici.`,
  },
  {
    id: 16,
    roman: 'XVI',
    title: 'La Torre',
    aliases: ['la torre', 'torre', 'tower'],
    body: `### XVI. La Torre — Folgore e Liberazione
- **Simbologia**: torre colpita dal fulmine; corona che salta; figure che precipitano.
- **Senso**: rottura di false certezze; liberazione catartica attraverso la crisi.
- **Previsione**: cambiamento drastico che rompe la stagnazione e libera energie.`,
  },
  {
    id: 17,
    roman: 'XVII',
    title: 'Le Stelle',
    aliases: ['le stelle', 'stelle', 'la stella', 'the star'],
    body: `### XVII. Le Stelle — Speranza e Guarigione
- **Simbologia**: figura nuda che versa linfa su terra e acqua, sotto stelle radiose.
- **Senso**: guida celeste, fiducia, ispirazione, guarigione dopo la Torre.
- **Previsione**: serenità, prospettive favorevoli, successo creativo, conferma del cammino.`,
  },
  {
    id: 18,
    roman: 'XVIII',
    title: 'La Luna',
    aliases: ['la luna', 'luna', 'the moon'],
    body: `### XVIII. La Luna — Inconscio e Percorso Notturno
- **Simbologia**: Luna piena, gambero dalle acque, lupi e torri lontane.
- **Senso**: inconscio, sogni, paure, intuito; illusioni da attraversare con luce interiore.
- **Previsione**: incertezza, segreti, malintesi; procedere ascoltando l’istinto.`,
  },
  {
    id: 19,
    roman: 'XIX',
    title: 'Il Sole',
    aliases: ['il sole', 'sole', 'the sun'],
    body: `### XIX. Il Sole — Chiarezza e Realizzazione
- **Simbologia**: Sole radioso; bambini festosi in un prato fiorito.
- **Senso**: verità svelata, gioia, trasparenza, successo pubblico, vitalità.
- **Previsione**: successo, chiarezza nei rapporti, accordi fortunati, trionfo di un progetto.`,
  },
  {
    id: 20,
    roman: 'XX',
    title: 'Il Giudizio',
    aliases: ['il giudizio', 'giudizio', 'judgement', 'judgment'],
    body: `### XX. Il Giudizio — Chiamata e Risveglio
- **Simbologia**: angelo con tromba; figure dai sepolcri, braccia aperte.
- **Senso**: chiamata alla consapevolezza, risveglio, perdono, liberazione dai giudizi.
- **Previsione**: svolta decisiva, notizie importanti, riconciliazione rinnovante.`,
  },
  {
    id: 21,
    roman: 'XXI',
    title: 'Il Mondo',
    aliases: ['il mondo', 'mondo', 'the world'],
    body: `### XXI. Il Mondo — Compiutezza
- **Simbologia**: figura danzante nella mandorla, circondata dai quattro viventi (Toro, Leone, Aquila, Angelo).
- **Senso**: Compimento dell’Opera, integrazione dei settenari, armonia universale.
- **Previsione**: successo totale, chiusura trionfante, viaggi, massima espansione.`,
  },
];

/** Always-on Maggiori framing (no per-card bodies) — keeps payload small. */
export const NINA_CHAT_MAGGIORI_FRAME = `## Arcani Maggiori — schede didattiche ufficiali (Trionfi 0–XXI)

Fonte: dispensa Area Personale Tarot Italia e, dove indicato, schede visive Waite-Smith (0–VII). Usa SOLO le schede iniettate sotto (se presenti). Non inventare iconografia. Non mescolare con Dialogo Tarot.

Struttura risposta (quando chiedono un Arcano Maggiore — aspetto visivo, simbologia, significato, luce/ombra, previsione):
1. **Simbologia** (+ cues Waite se in scheda)
2. **Significato / senso**
3. **Luce / ombra** — solo se presente; altrimenti non inventarla
4. **In chiave previsionale**
Tono: caldo, rigoroso, Tarot Italia. Per approfondimenti: **Parla con Maria Teresa** / corso Maggiori.

Architettura: 22 lame (0–XXI). Primo (0–VII) identità; Secondo (VIII–XIV) prova etica; Terzo (XV–XXI) Ombra e compiutezza.
Elenco: 0 Matto · I Bagatto · II Papessa · III Imperatrice · IV Imperatore · V Papa · VI Amanti · VII Carro · VIII Giustizia · IX Eremita · X Ruota · XI Forza · XII Appeso · XIII Morte · XIV Temperanza · XV Diavolo · XVI Torre · XVII Stelle · XVIII Luna · XIX Sole · XX Giudizio · XXI Mondo.
Se manca la scheda dettagliata nel contesto, chiedi quale Trionfo (0–XXI) e non inventare dettagli Waite.`;

const MAX_INJECTED_CARDS = 3;

function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Match Trionfi mentioned in user/history text (aliases + roman/id cues).
 * Caps at MAX_INJECTED_CARDS to keep Groq payload under limit.
 * Aliases use word-ish boundaries so «papa» does not match «papessa».
 */
export function selectMaggioriCardsForText(text: string): NinaMaggioriCard[] {
  const hay = normalizeForMatch(text);
  if (!hay.trim()) return [];

  const matched: NinaMaggioriCard[] = [];
  for (const card of NINA_MAGGIORI_CARDS) {
    const hit = card.aliases.some((alias) => {
      const needle = normalizeForMatch(alias);
      if (!needle) return false;
      // Multi-word aliases: substring is fine after NFD normalize.
      if (needle.includes(' ')) return hay.includes(needle);
      return new RegExp(
        `(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`
      ).test(hay);
    });
    // Also match "arcano 0", "trionfo VII", "lama XVI" style cues.
    // Use full words (lama|lame) — not lame? — so «parlami» does not match Bagatto (I).
    const romanCue = new RegExp(
      `(?:^|[^a-z0-9])(?:arcano|trionfo|lama|lame|carta)\\s*(?:n[°o.]?\\s*)?(?:${escapeRegExp(card.roman.toLowerCase())}|${card.id})(?:[^a-z0-9]|$)`
    );
    if (hit || romanCue.test(hay)) {
      matched.push(card);
    }
    if (matched.length >= MAX_INJECTED_CARDS) break;
  }
  return matched;
}

/** Format selected cards (or empty notice) for system prompt injection. */
export function formatMaggioriKnowledgeForCards(
  cards: readonly NinaMaggioriCard[]
): string {
  if (cards.length === 0) {
    return `${NINA_CHAT_MAGGIORI_FRAME}

(Nessuna scheda Trionfo iniettata in questo turno: se chiedono un Arcano specifico, rispondi in sintesi dall’elenco e invita a nominare il Trionfo, oppure usa solo quanto già detto in chat senza inventare Waite.)`;
  }
  return `${NINA_CHAT_MAGGIORI_FRAME}

### Schede iniettate per questa conversazione
${cards.map((c) => c.body).join('\n\n')}`;
}

/**
 * Build Maggiori knowledge block for the current turn.
 * Scans the latest user message plus recent history for Trionfo keywords.
 */
export function buildMaggioriKnowledgeForMessages(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
}): string {
  const parts = [params.message];
  const history = params.history ?? [];
  // Prefer recent turns (last few) so follow-ups like «e la simbologia?» keep context.
  for (const turn of history.slice(-6)) {
    if (typeof turn.content === 'string' && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  const cards = selectMaggioriCardsForText(parts.join('\n'));
  return formatMaggioriKnowledgeForCards(cards);
}

/**
 * Full Maggiori dump (all 22 slim cards) — for smoke/tests only, not every chat call.
 * @deprecated Prefer buildMaggioriKnowledgeForMessages for live prompts.
 */
export function buildAllMaggioriKnowledge(): string {
  return formatMaggioriKnowledgeForCards(NINA_MAGGIORI_CARDS);
}

/** @deprecated Use buildMaggioriKnowledgeForMessages — kept for rebuild/smoke compatibility. */
export const NINA_CHAT_MAGGIORI_KNOWLEDGE = buildAllMaggioriKnowledge();
