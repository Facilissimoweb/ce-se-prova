/**
 * ENN-121 — Scheda visiva Il Papa (V) (Waite-Smith).
 * Wording Maria Teresa Rogani — non alterare il testo italiano.
 */

import type { SchedaVisivaContent } from './types';

export const SCHEDA_VISIVA_IL_PAPA: SchedaVisivaContent = {
  id: 'il-papa',
  eyebrow: 'Scheda visiva · Waite-Smith',
  title: "L'Analisi Iconografica del Papa (V)",
  subtitle:
    'Mappa, decodifica e sintesi operativa della composizione di Pamela Colman Smith.',
  imageSrc: '/images/arcani/il-papa-waite.png',
  imageAlt: 'Il Papa — carta Waite-Smith (Pamela Colman Smith)',
  imageCaption: 'Il Papa · Waite-Smith',
  mappa: [
    {
      title: 'Il Soggetto Centrale',
      body: 'Una figura sacra siede tra due colonne grigie su un podio elevato, indossando un triregno a tre livelli, una casula rossa e un camice bianco.',
    },
    {
      title: 'Lo Sguardo e la Postura',
      body: 'Con la mano destra compie un gesto di benedizione o insegnamento (con due dita alzate e due piegate), mentre nella sinistra regge un bastone papale a tripla croce.',
    },
    {
      title: 'Gli Attributi e gli Oggetti',
      body: 'Nella sinistra regge un bastone papale a tripla croce; ai piedi della figura, alle spalle dei discepoli, si incrociano due chiavi.',
    },
    {
      title: 'Gli Elementi di Contorno',
      body: 'Ai suoi piedi sono inginocchiati due chierici o discepoli; la scena è incorniciata da due colonne grigie su un podio elevato.',
    },
  ],
  decodifica: [
    {
      title: 'Le Due Colonne e il Triregno',
      cosaSiVede:
        'Due colonne grigie incorniciano la figura sacra, che indossa un triregno a tre livelli.',
      cosaComunica:
        "L'architettura simbolica, l'autorità spirituale e la gerarchia della trasmissione dottrinale.",
    },
    {
      title: 'Il Gesto della Mano Destra e il Bastone a Tripla Croce',
      cosaSiVede:
        'La mano destra con due dita alzate e due piegate; nella sinistra un bastone papale a tripla croce.',
      cosaComunica:
        "L'insegnamento, la benedizione e il collegamento tra diversi piani di comprensione.",
    },
    {
      title: 'Le Chiavi Incrociate e i Due Discepoli',
      cosaSiVede:
        'Due chiavi incrociate ai piedi della figura e due chierici o discepoli inginocchiati.',
      cosaComunica:
        "L'accesso alla conoscenza custodita e alla disciplina della tradizione; il rapporto tra chi trasmette la regola e chi la apprende.",
    },
  ],
  griglia: [
    {
      dettaglio: 'Gesto della mano e tripla croce',
      focus: "Atteggiamento d'insegnamento e attributo rituale",
      messaggio: 'Trasmissione del sapere, guida formativa e mediazione',
    },
    {
      dettaglio: 'Due colonne e chiavi incrociate',
      focus: 'Cornice architettonica e simboli alla base',
      messaggio: 'Tradizione, accesso alla conoscenza e struttura condivisa',
    },
    {
      dettaglio: 'Due figure inginocchiate',
      focus: 'Relazione gerarchica in primo piano',
      messaggio: 'Apprendimento, ascolto, conformità o rapporto allievo-guida',
    },
  ],
  sintesi: [
    {
      title: 'In chiave evolutiva',
      body: 'Quando questa carta compare in una stesa, indica un percorso di studio o formazione, il consiglio di un mentore o di una figura esperta, il rispetto di principi etici o istituzionali, oppure l\'invito a dare coerenza e metodo al proprio cammino.',
    },
    {
      title: 'In chiave di attenzione',
      body: "All'interno di una stesa, questa lama indica il valore dello studio metodico, l'incontro con un maestro o una guida, l'adesione a un percorso formativo o il confronto con norme e convinzioni consolidate — distinguendo l'orientamento saggio e formativo dal conformismo rigido e dogmatico.",
    },
  ],
};
