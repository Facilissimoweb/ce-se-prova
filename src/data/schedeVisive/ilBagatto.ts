/**
 * ENN-115 — Scheda visiva Il Bagatto (I) (Waite-Smith).
 * Wording Maria Teresa Rogani — non alterare il testo italiano.
 */

import type { SchedaVisivaContent } from './types';

export const SCHEDA_VISIVA_IL_BAGATTO: SchedaVisivaContent = {
  id: 'il-bagatto',
  eyebrow: 'Scheda visiva · Waite-Smith',
  title: "L'Analisi Iconografica del Bagatto (I)",
  subtitle:
    'Mappa, decodifica e sintesi operativa della composizione di Pamela Colman Smith.',
  imageSrc: '/images/arcani/il-bagatto-waite.png',
  imageAlt: 'Il Bagatto — carta Waite-Smith (Pamela Colman Smith)',
  imageCaption: 'Il Bagatto · Waite-Smith',
  mappa: [
    {
      title: 'Il Soggetto Centrale',
      body: 'Un giovane uomo dal portamento sicuro è in piedi dietro un tavolo, vestito con una tunica bianca stretta in vita e un mantello rosso drappeggiato sulle spalle.',
    },
    {
      title: 'Lo Sguardo e la Postura',
      body: "Il volto è rivolto frontalmente verso l'osservatore con espressione concentrata; il braccio destro è levato verso l'alto e impugna una bacchetta bianca a due punte, mentre l'indice della mano sinistra punta direttamente verso la terra.",
    },
    {
      title: 'Gli Attributi e gli Oggetti',
      body: "Sopra la testa fluttua il simbolo matematico dell'infinito (lemniscata); intorno alla vita porta un serpente che si morde la coda (uroboro); sul tavolo di legno davanti a lui sono disposti i quattro simboli dei semi minori: una coppa, una spada, un denario e un bastone.",
    },
    {
      title: 'Gli Elementi di Contorno',
      body: 'La scena è immersa in una luce dorata; un arco di rose rosse incornicia la parte superiore della carta, mentre in basso il terreno fiorisce di gigli bianchi e rose rosse.',
    },
  ],
  decodifica: [
    {
      title: "La Postura delle Braccia (Cielo e Terra) e il Simbolo dell'Infinito",
      cosaSiVede:
        'La mano destra solleva la bacchetta verso l\'alto, la sinistra indica il suolo, e una lemniscata orizzontale sovrasta il capo.',
      cosaComunica:
        'Il principio ermetico del "come in alto, così in basso": il Bagatto funge da canale attivo che raccoglie l\'energia illimitata del piano spirituale o mentale e la manifesta concretamente nella realtà terrena.',
    },
    {
      title: 'Gli Abiti (Tunica Bianca, Mantello Rosso e Cintura a Serpente)',
      cosaSiVede:
        'Un abito interno bianco puro coperto da un mantello rosso acceso, legato da un serpente che si morde la coda.',
      cosaComunica:
        "L'unione tra la purezza d'intenti (bianco) e la spinta vitale, la volontà e l'azione nel mondo (rosso), racchiusa nel ciclo eterno e continuo dell'energia trasformatrice (uroboro).",
    },
    {
      title: 'Il Tavolo con i Quattro Strumenti e il Giardino Fiorito',
      cosaSiVede:
        'Sul piano del tavolo poggiano coppa, spada, denario e bastone; intorno al personaggio crescono gigli e rose.',
      cosaComunica:
        'La piena padronanza potenziale dei quattro elementi (Acqua, Aria, Terra, Fuoco) posti sul piano d\'appoggio materiale, e la fertilità creativa e mentale pronta a fiorire attraverso la volontà consapevole (rose della passione e gigli della chiarezza).',
    },
  ],
  griglia: [
    {
      dettaglio: 'Asse verticale (Bacchetta - Mano - Lemniscata)',
      focus: 'Direzione opposta delle braccia e simbolo sul capo',
      messaggio:
        'Canalizzazione attiva, potere personale e collegamento tra idea e azione',
    },
    {
      dettaglio: 'Tavolo dei quattro semi',
      focus: 'Presenza simultanea di coppa, spada, denario e bastone',
      messaggio:
        'Disponibilità di tutte le risorse e gli strumenti necessari per iniziare',
    },
    {
      dettaglio: 'Colori e fiori (Rosso, Bianco, Giallo)',
      focus: 'Contrasto tra tunica e mantello e fioritura del terreno',
      messaggio:
        "Azione mirata, chiarezza d'intenti e terreno fertile per manifestare",
    },
  ],
  sintesi: [
    {
      title: 'In chiave evolutiva',
      body: "Segna il momento in cui l'energia libera diventa volontà consapevole, iniziativa mirata, padronanza delle proprie capacità e avvio concreto di un progetto grazie agli strumenti già a disposizione.",
    },
    {
      title: 'In chiave di attenzione',
      body: 'Invita a verificare che la destrezza e il potere comunicativo siano guidati da autenticità e trasparenza, evitando la manipolazione, l\'illusione o la dispersione delle proprie abilità.',
    },
  ],
};
