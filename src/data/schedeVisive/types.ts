/**
 * Shared shape for inline «scheda visiva» widgets (ENN-114+).
 * One data file per carta; DispensaSchedaVisiva renders any SchedaVisivaContent.
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
  /** Figcaption under the Waite card (e.g. «Il Matto · Waite-Smith»). */
  imageCaption: string;
  mappa: SchedaVisivaBullet[];
  decodifica: SchedaVisivaDecodeItem[];
  griglia: SchedaVisivaGridRow[];
  sintesi: SchedaVisivaSintesiItem[];
}
