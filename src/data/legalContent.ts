/** Contenuti legali portati da v2tarotitalia (source of truth), brand Tarot Italia. */
export const legalContent = {
    sitoLabel: "www.tarotitalia.com",
    sitoUrl: "https://www.tarotitalia.com",
    privacy: {
      sezione: "Informativa sulla privacy",
      titolo: "Informativa sulla privacy di Tarot Italia",
      intestazione: "www.tarotitalia.com • Tarot Italia",
      intro: [
        "Il sito web www.tarotitalia.com è gestito da Maria Teresa Rogani — Tarot Italia (P.IVA 02136780430), titolare del trattamento dei tuoi dati personali.",
        "Ho adottato questa Informativa sulla privacy per chiarire come elaboro le informazioni raccolte su tarotitalia.com e i motivi per cui posso dover raccogliere determinati dati personali. Ti invito a leggerla prima di utilizzare il sito.",
        "Mi prendo cura dei tuoi dati personali e mi impegno a garantirne la riservatezza e la sicurezza. L’informativa è visibile e liberamente accessibile sia dal footer del sito sia in fase di autenticazione.",
      ],
      sezioni: [
        {
          icon: "shield" as const,
          titolo: "1. Informazioni personali che raccolgo",
          testi: [
            'Quando visiti tarotitalia.com, raccolgo automaticamente determinate informazioni sul tuo dispositivo, tra cui informazioni sul browser web, indirizzo IP, fuso orario e alcuni dei cookie installati sul dispositivo. Inoltre, mentre navighi sul Sito, raccolgo informazioni sulle pagine o prodotti che visualizzi, su quali siti o termini di ricerca ti hanno indirizzato al Sito e su come interagisci con esso. Mi riferisco a queste informazioni raccolte automaticamente come "Informazioni sul dispositivo". Inoltre, posso raccogliere i dati personali che mi fornisci (inclusi, ma non limitati a, nome, cognome, indirizzo, informazioni di pagamento, ecc.) durante la registrazione, per adempiere all\'accordo.',
            "Per i contenuti digitali acquistati registro data e ora dell’accesso o del download, il titolo, l’indirizzo IP e il user-agent. Servono unicamente a tutela in caso di contestazione del pagamento o di frode: non li uso per profilazione commerciale.",
          ],
        },
        {
          icon: "link" as const,
          titolo: "2. Quali dati raccolgo tramite Google OAuth e Scopi (Scopes) utilizzati",
          testi: [
            "Quando accedi tramite il servizio di autenticazione Google OAuth, l’applicazione richiede esclusivamente l’accesso ai dati non sensibili del tuo profilo. Gli scopes richiesti sono letteralmente i seguenti:",
          ],
          elenchi: [
            "openid: per autenticare in modo sicuro la tua identità.",
            "https://www.googleapis.com/auth/userinfo.profile (equivalente a .../auth/userinfo.profile): per ottenere il tuo nome, cognome e immagine del profilo (se disponibile).",
            "https://www.googleapis.com/auth/userinfo.email (equivalente a .../auth/userinfo.email): per ottenere il tuo indirizzo email principale.",
          ],
        },
        {
          icon: "settings" as const,
          titolo: "3. Come utilizzo questi dati (Scopo del trattamento e Limited Use Requirements)",
          testi: [
            "Utilizzo l’indirizzo email e il nome unicamente per creare il tuo account personale sulla piattaforma Tarot Italia, autenticare i tuoi accessi successivi e inviarti notifiche di servizio strettamente correlate all’uso dell’applicazione. Non utilizzo i dati Google per pubblicità, tracciamento o profilazione commerciale.",
            "L’uso e il trasferimento da parte di Tarot Italia ad altre applicazioni delle informazioni ricevute dalle API di Google avverranno nel pieno rispetto della [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), incluse le limitazioni relative ai requisiti di «Uso Limitato» (Limited Use Requirements).",
          ],
        },
        {
          icon: "policy" as const,
          titolo: "4. Condivisione e trasferimento dei dati — divieto di cessione e profilazione",
          testi: [
            "Non vendo, non scambio e non trasferisco in alcun modo a terze parti i dati personali ottenuti tramite Google OAuth. Questi dati non vengono utilizzati per finalità di tracciamento pubblicitario o profilazione commerciale.",
          ],
        },
        {
          icon: "lock" as const,
          titolo: "5. Conservazione e Procedura di Cancellazione dei dati (Data Deletion)",
          testi: [
            "Periodo di conservazione: i dati del tuo account Google saranno conservati fino a quando manterrai attivo il tuo account sulla piattaforma.",
            "Procedura di cancellazione via email: puoi richiedere la cancellazione immediata e definitiva del tuo account e di tutti i dati associati inviando un’email a info@tarotitalia.com oppure mariateresarogani@gmail.com, oppure tramite la funzione dedicata nelle impostazioni dell’app.",
            "Revoca autonoma da Account Google: puoi revocare l’accesso di Tarot Italia dalla gestione del tuo Account Google (Sezione Sicurezza > App di terze parti con accesso all’account / Security → Third-party apps with account access).",
            "Per qualsiasi comunicazione o richiesta di cancellazione dati puoi contattare il Titolare agli indirizzi email: info@tarotitalia.com oppure mariateresarogani@gmail.com.",
          ],
        },
        {
          icon: "settings" as const,
          titolo: "Perché elaboro i tuoi dati?",
          testi: [
            "La massima priorità è la sicurezza dei dati di chi mi contatta: posso elaborare solo dati utente minimi, nella misura assolutamente necessaria per mantenere il sito. Le informazioni raccolte automaticamente servono a identificare potenziali abusi e a elaborare statistiche sull'utilizzo del sito, senza aggregarle in modo da identificare un particolare utente. Puoi visitare il sito senza dirmi chi sei né rivelare informazioni che permettano di identificarti. Se desideri usare alcune funzionalità, ricevere aggiornamenti o compilare un modulo, puoi fornirmi dati personali (e-mail, nome, cognome, città, organizzazione, telefono). Puoi scegliere di non fornirli, ma in tal caso potresti non poter usare alcune funzionalità (ad esempio newsletter o contatto diretto dal sito). Per dubbi su quali dati siano obbligatori, scrivi a info@tarotitalia.com.",
          ],
        },
        {
          icon: "gavel" as const,
          titolo: "I tuoi diritti",
          testi: [
            "Se sei residente in Europa, hai i seguenti diritti relativi ai tuoi dati personali: diritto di essere informato, di accesso, di rettifica, di cancellazione, di limitare il trattamento, alla portabilità, di opposizione, nonché diritti in relazione al processo decisionale automatizzato e alla profilazione. Per esercitarli, contattami con i riferimenti sotto. Se sei residente in Europa, ti informo che elaboro le tue informazioni per adempiere a contratti eventualmente in essere (ad esempio un ordine tramite il Sito) o per perseguire i legittimi interessi professionali indicati sopra. Le tue informazioni potrebbero essere trasferite fuori Europa, inclusi Canada e Stati Uniti.",
          ],
        },
        {
          icon: "link" as const,
          titolo: "Collegamenti ad altri siti Web",
          testi: [
            "Il sito può contenere collegamenti ad altri siti Web che non sono di mia proprietà né da me controllati. Non sono responsabile di tali siti né delle pratiche sulla privacy di terze parti. Ti invito a prestare attenzione quando lasci tarotitalia.com e a leggere le informative di ciascun sito che potrebbe raccogliere informazioni personali.",
          ],
        },
        {
          icon: "lock" as const,
          titolo: "Sicurezza delle informazioni",
          testi: [
            "Proteggo le informazioni che mi fornisci su server in un ambiente controllato e sicuro, protetto da accessi, usi o divulgazioni non autorizzati. Mantengo misure di sicurezza amministrative, tecniche e fisiche ragionevoli per proteggere i dati personali sotto il mio controllo. Nessuna trasmissione via Internet o rete wireless può tuttavia essere garantita al cento per cento.",
          ],
        },
        {
          icon: "policy" as const,
          titolo: "Divulgazione legale",
          testi: [
            "Divulgo informazioni raccolte, utilizzate o ricevute se richiesto o consentito dalla legge (ad esempio per una citazione o un procedimento analogo), e quando ritengo in buona fede che la divulgazione sia necessaria per proteggere i miei diritti, la tua sicurezza o quella di altri, indagare su frodi o rispondere a una richiesta dell'autorità.",
          ],
        },
        {
          icon: "mail" as const,
          titolo: "Informazioni di contatto",
          testi: [
            "Per saperne di più su questa Informativa o per questioni relative ai diritti individuali e alle tue informazioni personali, puoi scrivere a info@tarotitalia.com oppure mariateresarogani@gmail.com.",
            "Per qualsiasi comunicazione o richiesta di cancellazione dati puoi contattare il Titolare agli indirizzi email: info@tarotitalia.com oppure mariateresarogani@gmail.com.",
            "Titolare: Maria Teresa Rogani · Tarot Italia · Macerata · Via Crispi 37 · P.IVA 02136780430.",
          ],
        },
      ],
    },
    vendita: {
      sezione: "Termini e Condizioni",
      titolo: "Termini e Condizioni",
      intestazione: "www.tarotitalia.com • Termini e Condizioni",
      leggi: "Leggi i Termini e Condizioni",
      sezioni: [
        {
          id: "consulti",
          titolo: "A. Consulti Tarologici e Percorsi di Armonizzazione (Servizi)",
          testi: [
            "I consulti tarologici e i percorsi di armonizzazione sono servizi di natura personalizzata e intellettuale, eseguiti su espressa richiesta della persona che si rivolge a Tarot Italia.",
            "Consenso all’esecuzione anticipata e perdita del recesso: Ai sensi dell’art. 59, comma 1, lett. a) del Decreto Legislativo 6 settembre 2005, n. 206 (Codice del Consumo), con la richiesta di prenotazione e l’avvio della prestazione (inclusa la sessione preliminare di contatto e l’inizio dell’elaborazione simbolica/analitica), il cliente acconsente espressamente all’esecuzione immediata del servizio prima dello scadere del termine di 14 giorni, prendendo atto e accettando che perderà il diritto di recesso una volta che il servizio sarà stato interamente eseguito o che la fase di lavorazione/consulenza avrà avuto inizio.",
            "L’assistenza e il contatto preliminare alla prenotazione avvengono tramite i canali ufficiali indicati (messaggistica WhatsApp e contatto telefonico dedicato).",
          ],
        },
        {
          id: "oggettistica",
          titolo: "B. Oggettistica e Beni Fisici",
          testi: [
            "Per i beni fisici eventualmente commercializzati, è riconosciuto il diritto di recesso standard entro 14 giorni dalla ricezione, conformemente agli artt. 52 e ss. del Codice del Consumo. Le spese di reso restano a carico del cliente.",
            "In caso di merce restituita danneggiata, usata o manipolata in modo diverso da quello necessario per stabilirne la natura, Tarot Italia si riserva il diritto di trattenere un importo fino al 100% del valore del bene.",
            "Eventuali danni da trasporto devono essere segnalati con documentazione fotografica entro 48 ore dalla ricezione della merce.",
          ],
        },
        {
          id: "digitali",
          titolo: "C. Contenuti Digitali e Dispense (PDF)",
          testi: [
            "I contenuti digitali, i file e le dispense in formato PDF sono beni immateriali a fruizione immediata.",
            "Ai sensi dell’art. 59, lett. o) del Codice del Consumo, il diritto di recesso si perde in modo irreversibile con il consenso espresso del consumatore all’avvio del download o dell’accesso anticipato al contenuto digitale.",
          ],
        },
      ],
      assistenza: {
        titolo: "D. Canali di Assistenza Ufficiale",
        testo:
          "L’assistenza e il supporto agli utenti sono garantiti attraverso i canali ufficiali di Tarot Italia. Canale WhatsApp: +39 379 103 82 53. Contatto Telefonico: +39 379 103 82 53.",
        testi: [
          "L’assistenza e il supporto agli utenti sono garantiti attraverso i canali ufficiali di Tarot Italia.",
          "Canale WhatsApp: +39 379 103 82 53",
          "Contatto Telefonico: +39 379 103 82 53",
        ],
      },
    },
    tutela: {
      sezione: "Trasparenza e tutela del marchio",
      titolo: "Nota ufficiale di sicurezza",
      intestazione: "www.tarotitalia.com • Tutela del marchio e anti-phishing",
      kicker: "Trasparenza",
      intro:
        "Per proteggere chi si affida a Tarot Italia e la mia identità professionale, pubblico questa nota ufficiale di sicurezza, tutela del marchio e prevenzione delle imitazioni.",
      sintesi:
        "tarotitalia.com è l’unico canale ufficiale autorizzato. Non sollecito mai consulti o servizi tramite chat private o social non richiesti.",
      punti: [
        {
          titolo: "Unicità del dominio",
          testo:
            "tarotitalia.com è l’unico canale ufficiale autorizzato per i servizi di Tarot Italia. Ogni altra pagina, profilo o indirizzo che ne imiti il nome non è riconosciuto da me.",
        },
        {
          titolo: "Tutela del marchio",
          testo:
            "Il marchio «Tarot Italia» è protetto a tutela della qualità e della mia identità professionale. L’uso non autorizzato del nome, del logo o della mia immagine è contrario a questa tutela.",
        },
        {
          titolo: "Politica anti-contatti non sollecitati",
          testo:
            "Non contatto mai di mia sponte gli utenti tramite chat private o social per offrire consulti o servizi non richiesti. Qualsiasi proposta non preceduta da una richiesta esplicita è da considerarsi estranea a Tarot Italia.",
        },
        {
          titolo: "Segnalazioni",
          testo:
            "Ti invito a segnalare qualsiasi tentativo di imitazione o contatto sospetto scrivendo esclusivamente all’indirizzo email ufficiale: info@tarotitalia.com.",
        },
      ],
      apri: "Apri la nota ufficiale di sicurezza",
    },
    disclaimer: {
      sezione: "Disclaimer Legale (Deontologia & Legge)",
      titolo: "INFORMATIVA LEGALE",
      intestazione: "www.tarotitalia.com • Deontologia & Legge",
      heading: "INFORMATIVA E LIBERATORIA PER ESCLUSIONE DA RESPONSABILITÀ",
      paragrafi: [
        "I corsi, i servizi e i trattamenti offerti da Maria Teresa Rogani, e da chiunque operi per suo conto, la cui lista è disponibile presso la sede del Titolare, sono pratiche senza alcuna valenza scientifica e gli operatori e le operatrici che le svolgono non sono né medici, né psichiatri, né psicologi o psicoterapeuti, non possono quindi fornire diagnosi, prescrivere o somministrare farmaci, né formulare terapie. Le persone che decidono di usufruire di questi servizi lo fanno in piena coscienza, libertà e responsabilità. In nessun caso le suddette pratiche possono essere considerate una terapia, né tantomeno è consigliato sospendere o ridurre le terapie mediche in corso. Le suddette pratiche non costituiscono formalmente una cura fisica, pertanto non è garantito alcun risultato specifico. Consultare sempre un medico abilitato per prendersi cura del proprio stato fisico e/o psichico. Ogni individuo è responsabile per sé stesso e per le proprie cure mediche, psicologiche o psichiatriche. Chi prende visione di tali informazioni e le sottoscrive rinuncia ad ogni tipo di azione legale nei confronti di Maria Teresa Rogani, o di chiunque operi per suo conto, la cui lista è disponibile presso la sede del Titolare, e libera tutti i soggetti indicati in questo documento da ogni e qualsivoglia responsabilità.",
        "L’OPERATORE OLISTICO: L’operatore olistico non si pone come sostituto della medicina classica occidentale, ma come strumento complementare. Si occupa di preservare il benessere dell’individuo a 360°, aiutandolo ad integrarsi nei cicli naturali della vita, ristabilendo gli equilibri del benessere. Non formula diagnosi, non rilascia ricette e non interferisce con le prescrizioni di farmaci e rimedi dati o suggeriti dai medici. Fornisce consigli su come utilizzare nel migliore dei modi i rimedi naturali ritenuti più idonei per il miglioramento del proprio benessere psico-fisico e energetico. Questo sito non intende offrire consigli medici e le informazioni qui contenute non possono sostituirsi ad un consulto personalizzato effettuato da un medico. Il cliente dovrebbe consultare un medico a proposito della propria salute, soprattutto riguardo a sintomi che possano richiedere diagnosi e/o trattamento. L’operatore olistico può supportare chi si rivolge a lui, nella scelta del metodo di cura naturale più indicato al suo problema. L’operatore olistico non si assume alcuna responsabilità per qualsiasi conseguenza che possa derivare da qualsiasi trattamento, procedura, azione, modifica dello stato di salute o applicazione di qualsiasi metodo da parte di qualsiasi persona che legga o segua le informazioni contenute su questo sito. Non si può garantire che le informazioni e i consigli qui contenuti siano adatti o sicuri per ogni persona. Ogni sforzo è stato fatto per garantire che le informazioni qui contenute siano il più complete ed accurate possibile, oltre che aggiornate. Ma queste informazioni dovrebbero essere usate soltanto come guida, e non come la fonte definitiva di informazioni sui disturbi e disagi a cui qui si fa cenno. Per tutti questi motivi si declina ogni responsabilità per qualsiasi conseguenza, danno o perdita che possano essere causate dal contenuto di questo sito e dagli articoli in esso pubblicati.",
        "Ad oggi le discipline Olistiche dette anche Bio-Naturali non hanno ottenuto una normativa a livello nazionale. In attesa di una regolamentazione “ufficiale” alcune regioni come la Lombardia, Toscana, Liguria, Emilia Romagna, hanno stabilito leggi regionali che permettono alla medicina Olistica di affiancarsi a quella tradizionale. Viene riportata di seguito la LEGGE REGIONALE 1 febbraio 2005, N. 2 “Norme in materia di discipline bio-naturali”. (BURL n. 5, 1º suppl. ord. del 04 Febbraio 2005) urn:nir:regione.lombardia:legge:2005-02-01;2",
        "Tali pratiche, che non hanno carattere di prestazioni sanitarie, tendono a stimolare le risorse vitali dell’individuo attraverso metodi ed elementi naturali la cui efficacia sia stata verificata nei contesti culturali e geografici in cui le discipline sono sorgenti e si sono sviluppate. Le informazioni contenute in essi non sono a carattere medico e non vogliono in alcun modo sostituirsi a qualunque consulenza o prescrizione medica. Questo sito fornisce informazioni su argomenti riguardanti il benessere inteso in senso olistico. L’approccio olistico non si pone in contrapposizione, né in alcun modo intende sostituire la medicina tradizionale. Pertanto, è sempre richiesto di utilizzare con intelligenza e buon senso tutte le informazioni presenti su questo sito. Le informazioni contenute in questo sito non costituiscono pareri di tipo professionale, medico o giuridico e non possono in nessun caso essere utilizzate per la cura di patologie o disturbi di qualsivoglia natura. Per qualsiasi decisione o informazione riguardante lo stato di salute è necessario che la persona si rivolga al proprio medico curante o ad un’altra figura professionale autorizzata. Se credi di essere in una condizione che richiede cure mediche, psicologiche, ecc., per favore rivogliti subito alla figura professionale di riferimento. Nessun professionista olistico può dunque sovrapporsi alle figure medico/psicologiche o ricoprirne le vesti. L’Operatore Olistico, l’Operatore del Benessere e l’Operatore Energetico possono intervenire esclusivamente per aiutare il soggetto in questione a riequilibrare il proprio sistema energetico, ma non possono in nessun caso fare diagnosi, prescrivere e/o somministrare farmaci, sostituire un medico o qualunque altra figura professionale preposta. In Italia, la professione dell’operatore olistico è regolamentata dalla legge 4/2013. I trattamenti olistici sono trattamenti di riequilibrio energetico volti al recupero ed al mantenimento del benessere e della vitalità della persona.",
      ],
      conferma: "Ho Letto e Compreso",
    },
  } as const;

export type LegalPrivacyIcon = (typeof legalContent.privacy.sezioni)[number]['icon'];
