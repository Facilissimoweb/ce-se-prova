/**
 * ENN-114 — Scheda visiva Il Matto (Waite-Smith).
 * Wording Maria Teresa Rogani — non alterare il testo italiano.
 */

export interface SchedaVisivaBullet {
  title: string;
  body: string;
}

export interface SchedaVisivaDecodeItem {
  title: string;
  cosaSiVede: string;
  cosaComunica: string;
}

export interface SchedaVisivaGridRow {
  dettaglio: string;
  focus: string;
  messaggio: string;
}

export interface SchedaVisivaSintesiItem {
  title: string;
  body: string;
}

export interface SchedaVisivaContent {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  mappa: SchedaVisivaBullet[];
  decodifica: SchedaVisivaDecodeItem[];
  griglia: SchedaVisivaGridRow[];
  sintesi: SchedaVisivaSintesiItem[];
}

export const SCHEDA_VISIVA_IL_MATTO: SchedaVisivaContent = {
  id: 'il-matto',
  eyebrow: 'Scheda visiva · Waite-Smith',
  title: "L'Analisi Iconografica del Matto",
  subtitle: 'Mappa, decodifica e sintesi operativa della composizione di Pamela Colman Smith.',
  imageSrc: '/images/arcani/il-matto-waite.png',
  imageAlt: 'Il Matto — carta Waite-Smith (Pamela Colman Smith)',
  mappa: [
    {
      title: 'Il Soggetto Centrale',
      body: 'Un giovane vestito con abiti ricchi e colorati cammina spensierato sull\'orlo di un precipizio.',
    },
    {
      title: 'Lo Sguardo e la Postura',
      body: 'Lo sguardo è rivolto verso l\'alto, mentre il passo avanza lungo il bordo del dirupo.',
    },
    {
      title: "Gli Attributi e l'Oggetto",
      body: 'Porta su una spalla un bastone a cui è appesa una piccola sacca e tiene nella mano destra una rosa bianca.',
    },
    {
      title: 'Gli Elementi di Contorno',
      body: 'Un piccolo cane bianco gli salta accanto e un sole luminoso splende dietro di lui.',
    },
  ],
  decodifica: [
    {
      title: "L'Orlo del Precipizio e lo Sguardo Rivolto verso l'Alto",
      cosaSiVede:
        'Il cammino corre proprio sul bordo di un dirupo, mentre gli occhi del giovane guardano in alto anziché ai suoi piedi.',
      cosaComunica:
        "L'abbandono alle correnti dell'esistenza e la disponibilità a lanciarsi nel nuovo, ma anche la distrazione rispetto ai pericoli immediati del terreno.",
    },
    {
      title: 'Il Bastone con la Piccola Sacca e la Rosa Bianca',
      cosaSiVede:
        'Sulla spalla pende una piccola sacca legata a un bastone; nella mano destra è stretta una rosa bianca.',
      cosaComunica:
        "Le esperienze passate ridotte all'essenziale (la sacca) e la purezza d'intenti che accompagna l'inizio del viaggio (la rosa bianca).",
    },
    {
      title: 'Il Cane Bianco e il Sole Luminoso',
      cosaSiVede:
        'Un piccolo cane bianco salta accanto a lui, con un sole luminoso che splende alle sue spalle.',
      cosaComunica:
        "L'istinto, la fedeltà o l'avvertimento sensoriale di fronte al passo che sta per compiersi, incorniciati da una luce che accompagna l'apertura all'esperienza.",
    },
  ],
  griglia: [
    {
      dettaglio: 'Posizione sul dirupo',
      focus: 'Vicinanza al vuoto e direzione dello sguardo',
      messaggio: "Slancio verso l'ignoto o rischio di ignorare i confini concreti",
    },
    {
      dettaglio: 'Sacca e rosa bianca',
      focus: 'Essenzialità del bagaglio e purezza del gesto',
      messaggio: "Leggerezza, assenza di schemi rigidi e freschezza d'intenti",
    },
    {
      dettaglio: 'Cane bianco e sole',
      focus: 'Movimento laterale e luminosità dello sfondo',
      messaggio: "Istinto vigile, spontaneità e apertura totale all'esperienza",
    },
  ],
  sintesi: [
    {
      title: 'In chiave evolutiva',
      body: "Segna l'inizio di un percorso nuovo, una scelta che rompe con la routine, un viaggio o una decisione coraggiosa e fuori dagli schemi.",
    },
    {
      title: 'In chiave di attenzione',
      body: "Invita a ritrovare leggerezza e apertura mentale, prestando però attenzione a non ignorare il piano d'appoggio concreto o i pericoli immediati del terreno.",
    },
  ],
};
