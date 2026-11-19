/**
 * ENN-122 — Scheda visiva Gli Amanti (VI) (Waite-Smith).
 * Wording Maria Teresa Rogani — non alterare il testo italiano.
 */

import type { SchedaVisivaContent } from './types';

export const SCHEDA_VISIVA_GLI_AMANTI: SchedaVisivaContent = {
  id: 'gli-amanti',
  eyebrow: 'Scheda visiva · Waite-Smith',
  title: "L'Analisi Iconografica degli Amanti (VI)",
  subtitle:
    'Mappa, decodifica e sintesi operativa della composizione di Pamela Colman Smith.',
  imageSrc: '/images/arcani/gli-amanti-waite.png',
  imageAlt: 'Gli Amanti — carta Waite-Smith (Pamela Colman Smith)',
  imageCaption: 'Gli Amanti · Waite-Smith',
  mappa: [
    {
      title: 'Il Soggetto Centrale',
      body: "Un uomo e una donna stanno nudi l'uno di fronte all'altra in un paesaggio paradisiaco e luminoso.",
    },
    {
      title: 'Lo Sguardo e la Postura',
      body: "La nudità e la prossimità dei due personaggi indicano l'apertura, la vulnerabilità e l'unione tra opposti che si riconoscono senza maschere.",
    },
    {
      title: 'Gli Attributi e gli Oggetti',
      body: "Alle spalle dell'uomo si erge l'albero della vita con dodici fiamme, mentre alle spalle della donna si innalza l'albero della conoscenza del bene e del male, attorno al cui tronco è avvolto un serpente.",
    },
    {
      title: 'Gli Elementi di Contorno',
      body: 'In alto, tra le nuvole dorate, un angelo con le ali spiegate protende le braccia verso di loro, mentre un sole radioso illumina la scena.',
    },
  ],
  decodifica: [
    {
      title: "L'Angelo e il Sole Radioso",
      cosaSiVede:
        'Un angelo con le ali spiegate tra le nuvole dorate e un sole radioso che illumina la scena.',
      cosaComunica:
        "La benedizione superiore, la chiarezza della coscienza e l'ispirazione che invita a scegliere con integrità.",
    },
    {
      title: 'I Due Alberi e il Serpente',
      cosaSiVede:
        "L'albero della vita con dodici fiamme e l'albero della conoscenza con un serpente attorno al tronco.",
      cosaComunica:
        "Le polarità dell'esistenza, l'istinto, la consapevolezza e la prova del discernimento.",
    },
    {
      title: 'La Nudità e la Prossimità della Coppia',
      cosaSiVede:
        "Due figure nude l'una di fronte all'altra in una radura luminosa.",
      cosaComunica:
        "L'apertura, la vulnerabilità e l'unione tra opposti che si riconoscono senza maschere.",
    },
  ],
  griglia: [
    {
      dettaglio: 'Angelo in alto e sole radioso',
      focus: 'Presenza celeste e luminosità dello sfondo',
      messaggio: "Discernimento superiore, benedizione e chiarezza d'intenti",
    },
    {
      dettaglio: 'Coppia nuda in radura luminosa',
      focus: 'Prossimità, esposizione senza filtri e armonia',
      messaggio: 'Unione delle polarità, autenticità relazionale e apertura',
    },
    {
      dettaglio: 'Albero della vita e albero con serpente',
      focus: 'Simmetria arborea e presenza simbolica ai lati',
      messaggio: 'Bivio evolutivo, tentazione/consapevolezza e scelta libera',
    },
  ],
  sintesi: [
    {
      title: 'In chiave evolutiva',
      body: "Quando questa carta compare in una stesa, indica una scelta importante dettata dal cuore o da un'adesione interiore profonda, una relazione significativa o una partnership basata sull'armonia e sulla risonanza, oppure il momento di assumersi la responsabilità di un bivio evitando di delegare la decisione ad autorità esterne.",
    },
    {
      title: 'In chiave di attenzione',
      body: "All'interno di una stesa, questa lama non descrive soltanto un legame sentimentale o un'attrazione romantica, ma l'incontro tra polarità complementari, il bivio della coscienza, l'armonia autentica e l'impegno consapevole che dà forma a una direzione di vita — distinguendo un'unione autentica e una libertà consapevole da un'attrazione impulsiva e non vagliata.",
    },
  ],
};
