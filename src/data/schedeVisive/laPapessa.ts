/**
 * ENN-117 — Scheda visiva La Papessa (II) (Waite-Smith).
 * Wording Maria Teresa Rogani — non alterare il testo italiano.
 */

import type { SchedaVisivaContent } from './types';

export const SCHEDA_VISIVA_LA_PAPESSA: SchedaVisivaContent = {
  id: 'la-papessa',
  eyebrow: 'Scheda visiva · Waite-Smith',
  title: "L'Analisi Iconografica della Papessa (II)",
  subtitle:
    'Mappa, decodifica e sintesi operativa della composizione di Pamela Colman Smith.',
  imageSrc: '/images/arcani/la-papessa-waite.png',
  imageAlt: 'La Papessa — carta Waite-Smith (Pamela Colman Smith)',
  imageCaption: 'La Papessa · Waite-Smith',
  mappa: [
    {
      title: 'Il Soggetto Centrale',
      body: 'Una donna maestosa e solenne siede immobile su un trono in pietra, avvolta in un ampio mantello blu che scende fino ai piedi e in una veste chiara decorata con una grande croce solare dorata sul petto.',
    },
    {
      title: 'Lo Sguardo e la Postura',
      body: 'Il volto è rivolto frontalmente con espressione calma, raccolta e impassibile; le mani sono posate con compostezza in grembo, mentre ai piedi si distende un drappo a strisce chiare e scure (o a onde).',
    },
    {
      title: 'Gli Attributi e gli Oggetti',
      body: "Sul capo indossa una corona a tre livelli (triregno/tiara lunare) affiancata da un velo che scende ai lati; tra le mani tiene parzialmente avvolto un rotolo o libro aperto recante l'iscrizione TORA; ai suoi piedi è appoggiata una falce di luna crescente.",
    },
    {
      title: 'Gli Elementi di Contorno',
      body: "Ai lati del trono si ergono due colonne: una nera a sinistra con la lettera B e una bianca a destra con la lettera J; alle spalle si apre un velo riccamente decorato con melagrane e palme, che separa la figura da uno specchio d'acqua visibile solo ai margini.",
    },
  ],
  decodifica: [
    {
      title: 'Le Colonne (B e J) e il Velo con le Melagrane',
      cosaSiVede:
        'Due colonne simmetriche (scura con B, chiara con J) incorniciano il trono, mentre un velo trapunto di melagrane chiude parzialmente lo sfondo.',
      cosaComunica:
        'La soglia tra gli opposti e la custodia dei misteri: il velo indica che la conoscenza profonda non viene esibita apertamente, ma custodita dietro una cortina simbolica fatta di fertilità interiore e sapienza riservata.',
    },
    {
      title: 'Il Rotolo "TORA", la Corona Lunare e la Croce sul Petto',
      cosaSiVede:
        'Un rotolo/libro parzialmente coperto sulle ginocchia, una corona lunare sul capo, una falce di luna ai piedi e una croce solare al centro del busto.',
      cosaComunica:
        "L'integrazione tra legge interiore/studio silenzioso (TORA), cicli ricettivi e intuitivi (la luna) ed equilibrio tra dimensione spirituale e incarnazione, mantenendo sempre una quota di riservatezza.",
    },
    {
      title: "Il Mantello Blu, l'Acqua sullo Sfondo e la Postura Immobile",
      cosaSiVede:
        "Il drappeggio blu profondo, l'assenza di movimento brusco e l'acqua intravista ai lati del velo.",
      cosaComunica:
        "Il dominio dell'inconscio, dell'ascolto interiore, dell'attesa feconda e della calma contemplativa, contrapposta all'azione immediata e manifesta.",
    },
  ],
  griglia: [
    {
      dettaglio: 'Velo con melagrane e colonne B/J',
      focus: 'Soglia, separazione e simmetria laterale',
      messaggio:
        "Riservatezza, soglia dell'inconscio e custodia di ciò che non va ancora detto",
    },
    {
      dettaglio: 'Rotolo "TORA" e postura seduta',
      focus: 'Raccoglimento, silenzio e lettura interiore',
      messaggio:
        'Studio, intuizione, ascolto profondo e non-azione consapevole',
    },
    {
      dettaglio: 'Simboli lunari e mantello blu',
      focus: 'Ricettività, profondità e quiete',
      messaggio:
        'Sensibilità intuitiva, ciclicità emotiva e verità che matura nel silenzio',
    },
  ],
  sintesi: [
    {
      title: 'In chiave evolutiva',
      body: 'Segna un momento di ascolto interiore, intuizione lucidamente percepita, studio approfondito, riservatezza strategica e maturazione silenziosa prima di agire.',
    },
    {
      title: 'In chiave di attenzione',
      body: 'Invita a distinguere tra saggia prudenza/custodia interiore e chiusura eccessiva, passività, segreto tenace o elusione del confronto concreto.',
    },
  ],
};
