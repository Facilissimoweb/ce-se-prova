/**
 * ENN-123 — Scheda visiva Il Carro (VII) (Waite-Smith).
 * Wording Maria Teresa Rogani — non alterare il testo italiano.
 */

import type { SchedaVisivaContent } from './types';

export const SCHEDA_VISIVA_IL_CARRO: SchedaVisivaContent = {
  id: 'il-carro',
  eyebrow: 'Scheda visiva · Waite-Smith',
  title: "L'Analisi Iconografica del Carro (VII)",
  subtitle:
    'Mappa, decodifica e sintesi operativa della composizione di Pamela Colman Smith.',
  imageSrc: '/images/arcani/il-carro-waite.png',
  imageAlt: 'Il Carro — carta Waite-Smith (Pamela Colman Smith)',
  imageCaption: 'Il Carro · Waite-Smith',
  mappa: [
    {
      title: 'Il Soggetto Centrale e la Postura',
      body: 'Un giovane condottiero coronato, con una stella a otto punte sulla fronte e una corazza decorata con mezze lune, siede eretto su un carro di pietra aperto, tenendo nella mano destra uno scettro e mantenendo una postura ferma e centrata nonostante il movimento.',
    },
    {
      title: 'Il Carro e il Baldacchino',
      body: 'Il carro è sormontato da un baldacchino a quattro colonne sostenuto da un drappo stellato blu scuro, mentre sulla parte anteriore spicca il simbolo alato del disco solare (o glifo alato) e sul fronte compare uno stemma o un\'iscrizione simbolica.',
    },
    {
      title: 'Le Sfingi / i Cavalli Contrapposti',
      body: 'Due sfingi — una bianca e una nera — sono affiancate davanti al carro, rivolte in direzioni opposte o divergenti, senza che il condottiero stringa briglie o redini visibili nelle mani.',
    },
    {
      title: "L'Ambiente e il Piano d'Appoggio",
      body: 'Il terreno su cui poggia il carro appare grigio, roccioso e irregolare, mentre sullo sfondo si estendono le mura di una città fortificata e un corso d\'acqua.',
    },
  ],
  decodifica: [
    {
      title: "Le Sfingi Bianca e Nera e l'Assenza di Redini",
      cosaSiVede:
        'Due figure opposte nel colore (chiaro e scuro) trainano o affiancano il carro, mentre il condottiero non impugna redini fisiche.',
      cosaComunica:
        'Il governo delle polarità e delle pulsioni contrapposte (luce/ombra, istinto/ragione, spinte opposte) non avviene per costrizione meccanica, ma attraverso il baricentro interiore, la concentrazione e la volontà ferma del guidatore.',
    },
    {
      title: 'Il Baldacchino Stellato, la Corazza Lunare e lo Scettro',
      cosaSiVede:
        'Il cielo stellato sul baldacchino, la stella sulla fronte, le lune sulle spalle e lo scettro tenuto con decisione.',
      cosaComunica:
        "L'allineamento tra l'orientamento superiore (la meta, la visione, la legge interiore) e la forza d'azione che permette di avanzare senza farsi disorientare dagli imprevisti.",
    },
    {
      title: "Il Terreno Irregolare, l'Acqua e la Città sullo Sfondo",
      cosaSiVede:
        'Un suolo accidentato e non levigato in primo piano, un fiume e un centro abitato in lontananza.',
      cosaComunica:
        "Il cammino verso la meta non è privo di asperità o dislivelli, ma l'avanzamento resta possibile mantenendo salda la rotta verso l'obiettivo.",
    },
  ],
  griglia: [
    {
      dettaglio: 'Sfingi bianca e nera',
      focus: 'Contrasto cromatico e orientamento delle due figure',
      messaggio: 'Gestione delle polarità, tensioni da armonizzare e controllo',
    },
    {
      dettaglio: 'Postura del condottiero e baldacchino',
      focus: 'Centratura del busto, corona, stella e scettro',
      messaggio: 'Determinazione, direzione chiara, volontà e avanzamento',
    },
    {
      dettaglio: 'Terreno grigio e città sullo sfondo',
      focus: 'Ruvidità del suolo e distanza della meta',
      messaggio: 'Ostacoli superabili, viaggio concreto e conquista di un traguardo',
    },
  ],
  sintesi: [
    {
      title: 'In chiave evolutiva',
      body: "Quando questa carta compare in una stesa, indica il superamento di un ostacolo attraverso la determinazione, la spinta verso un obiettivo concreto, la gestione di tensioni interne o esterne e il viaggio — fisico, professionale o evolutivo — che porta a una conquista.",
    },
    {
      title: 'In chiave di attenzione',
      body: "All'interno di una stesa, questa lama incarna la traduzione di una decisione in movimento deciso, direzione mirata, avanzamento, controllo delle spinte opposte e affermazione nel mondo — distinguendo una conquista solida e centrata da un'accelerazione forzata e rigida.",
    },
  ],
};
