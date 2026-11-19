/**
 * ENN-120 — Scheda visiva L'Imperatore (IV) (Waite-Smith).
 * Wording Maria Teresa Rogani — non alterare il testo italiano.
 */

import type { SchedaVisivaContent } from './types';

export const SCHEDA_VISIVA_L_IMPERATORE: SchedaVisivaContent = {
  id: 'l-imperatore',
  eyebrow: 'Scheda visiva · Waite-Smith',
  title: "L'Analisi Iconografica dell'Imperatore (IV)",
  subtitle:
    'Mappa, decodifica e sintesi operativa della composizione di Pamela Colman Smith.',
  imageSrc: '/images/arcani/l-imperatore-waite.png',
  imageAlt: "L'Imperatore — carta Waite-Smith (Pamela Colman Smith)",
  imageCaption: "L'Imperatore · Waite-Smith",
  mappa: [
    {
      title: 'Il Soggetto Centrale',
      body: 'Un sovrano maturo e severo siede dritto su un trono massiccio in pietra, ornato da quattro teste d\'ariete; indossa un\'armatura sotto un mantello rosso.',
    },
    {
      title: 'Lo Sguardo e la Postura',
      body: 'La postura è eretta e ferma sul trono; l\'espressione è severa e autorevole, senza concessioni al rilassamento o alla sensualità dell\'Imperatrice.',
    },
    {
      title: 'Gli Attributi e gli Oggetti',
      body: 'Nella mano destra tiene uno scettro sormontato da una croce ansata (ankh) e nella mano sinistra un globo dorato.',
    },
    {
      title: 'Gli Elementi di Contorno',
      body: 'Alle sue spalle si ergono montagne rocciose e aride, sotto un cielo acceso, senza vegetazione o acqua corrente.',
    },
  ],
  decodifica: [
    {
      title: 'Il Trono in Pietra e le Teste d\'Ariete',
      cosaSiVede:
        'Un trono massiccio in pietra ornato da quattro teste d\'ariete scolpite.',
      cosaComunica:
        'La solidità incrollabile, la determinazione e l\'energia pionieristica del Fuoco cardinale (legata all\'Ariete).',
    },
    {
      title: 'L\'Armatura sotto il Mantello Rosso',
      cosaSiVede:
        'Un\'armatura metallica visibile sotto un mantello rosso di sovranità.',
      cosaComunica:
        'La protezione, il controllo e la forza d\'azione radicata nella disciplina.',
    },
    {
      title: 'L\'Ankh, il Globo e le Montagne Aride',
      cosaSiVede:
        'Uno scettro con croce ansata, un globo dorato e uno sfondo di montagne rocciose e aride.',
      cosaComunica:
        'Il governo del reale (vita/autorità e dominio ordinato sul piano materiale) con chiarezza essenziale e fermezza priva di fronzoli emotivi.',
    },
  ],
  griglia: [
    {
      dettaglio: 'Trono in pietra e teste d\'ariete',
      focus: 'Solidità della seduta e simbolismo del Fuoco cardinale',
      messaggio: 'Stabilità, disciplina, autorità strutturata e iniziativa ferma',
    },
    {
      dettaglio: 'Armatura e mantello rosso',
      focus: 'Protezione interiore e slancio vitale controllato',
      messaggio: 'Autocontrollo, coraggio pragmatico e responsabilità',
    },
    {
      dettaglio: 'Ankh, globo e montagne',
      focus: 'Attributi del comando e aridità dello sfondo',
      messaggio: 'Governo del reale, chiarezza d\'intenti e confini netti',
    },
  ],
  sintesi: [
    {
      title: 'In chiave evolutiva',
      body: 'Quando questa carta compare in una stesa, indica la necessità di strutturare un progetto, di fissare confini netti, di agire con pragmatismo e leadership, oppure la presenza di una figura autorevole o paterna che offre protezione e regole solide.',
    },
    {
      title: 'In chiave di attenzione',
      body: 'All\'interno di una stesa, questa lama indica il bisogno di darsi regole chiare, di assumere una responsabilità concreta, di consolidare una posizione o di esercitare un comando lucido e fermo sulla realtà — distinguendo la guida solida dalla rigidità autoritaria.',
    },
  ],
};
