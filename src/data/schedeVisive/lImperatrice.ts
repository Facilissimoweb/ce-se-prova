/**
 * ENN-119 — Scheda visiva L'Imperatrice (III) (Waite-Smith).
 * Wording Maria Teresa Rogani — non alterare il testo italiano.
 */

import type { SchedaVisivaContent } from './types';

export const SCHEDA_VISIVA_L_IMPERATRICE: SchedaVisivaContent = {
  id: 'l-imperatrice',
  eyebrow: 'Scheda visiva · Waite-Smith',
  title: "L'Analisi Iconografica dell'Imperatrice (III)",
  subtitle:
    'Mappa, decodifica e sintesi operativa della composizione di Pamela Colman Smith.',
  imageSrc: '/images/arcani/l-imperatrice-waite.png',
  imageAlt: "L'Imperatrice — carta Waite-Smith (Pamela Colman Smith)",
  imageCaption: "L'Imperatrice · Waite-Smith",
  mappa: [
    {
      title: 'Il Soggetto Centrale',
      body: 'Una donna regale e sensuale, dal portamento rilassato e accogliente, siede su un ampio cuscino morbido in una radura boschiva, indossando una veste ampia e fluente ornata da melagrane.',
    },
    {
      title: 'Lo Sguardo e la Postura',
      body: "Il volto è rivolto verso l'osservatore con un'espressione serena, materna e appagata; il busto è leggermente reclinato all'indietro e una mano poggia con naturalezza sul grembo o sul fianco, mentre l'altra sorregge un attributo simbolico.",
    },
    {
      title: 'Gli Attributi e gli Oggetti',
      body: 'Sul capo porta una corona formata da dodici stelle luminose; nella mano sollevata regge uno scettro lungo e sottile; davanti a lei, appoggiato a terra, si trova uno scudo a forma di cuore decorato con il simbolo di Venere.',
    },
    {
      title: 'Gli Elementi di Contorno',
      body: "L'intera scena è immersa in un bosco rigoglioso con alberi frondosi, un campo di grano dorato in primo piano e una cascata o un corso d'acqua che scorre sullo sfondo.",
    },
  ],
  decodifica: [
    {
      title: 'Il Campo di Grano, la Cascata e la Foresta',
      cosaSiVede:
        'Un ambiente naturale ricco e variegato, dove si intrecciano grano maturo, vegetazione fitta e acqua corrente.',
      cosaComunica:
        "La fertilità generativa, l'abbondanza concreta e il flusso vitale continuo che nutre la crescita organica senza forzature.",
    },
    {
      title: 'La Veste con le Melagrane e lo Scudo con il Simbolo di Venere',
      cosaSiVede:
        'Un abito morbido con motivi di melagrane e uno scudo a forma di cuore contrassegnato dal glifo venusiano.',
      cosaComunica:
        "L'unione tra fecondità, sensualità, armonia affettiva e bellezza incarnata, accolta in una dimensione di apertura e protezione naturale.",
    },
    {
      title: 'La Corona a Dodici Stelle, lo Scettro e la Postura Rilassata',
      cosaSiVede:
        'Una corona stellata sul capo, uno scettro in mano e una seduta comoda su cuscini anziché su un trono rigido in pietra.',
      cosaComunica:
        'Il dialogo tra il ritmo cosmico/ciclico (le dodici stelle) e la manifestazione terrena, espresso attraverso una sovranità accogliente, vitale e nutritiva.',
    },
  ],
  griglia: [
    {
      dettaglio: 'Grano, bosco e acqua',
      focus: 'Rigoglio ambientale e continuità dei cicli',
      messaggio: 'Fertilità, abbondanza, crescita naturale e vitalità',
    },
    {
      dettaglio: 'Veste con melagrane e simbolo di Venere',
      focus: 'Sensualità, forma a cuore e ricchezza ornamentale',
      messaggio: 'Affettività, bellezza, fecondità e piacere dei sensi',
    },
    {
      dettaglio: 'Cuscini morbidi e corona a dodici stelle',
      focus: 'Comfort della postura e richiamo ciclico sul capo',
      messaggio:
        'Accoglienza, armonia tra spirito e materia, maturazione',
    },
  ],
  sintesi: [
    {
      title: 'In chiave evolutiva',
      body: 'Segna un momento di fertilità creativa o materiale, cura, crescita armoniosa, sensualità, abbondanza e maturazione naturale di ciò che è stato seminato.',
    },
    {
      title: 'In chiave di attenzione',
      body: "Invita a distinguere tra l'abbondanza che nutre e l'eccesso che appesantisce, come iperprotettività, dipendenza affettiva, pigrizia o dispersione nell'indulgere.",
    },
  ],
};
