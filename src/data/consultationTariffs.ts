import type { ConsultationTariff } from '../types/handoff';

/** Join card paragraphs into one string for SEO / Nina / JSON-LD. */
export function joinTariffDescription(paragraphs: string[]): string {
  return paragraphs.map((p) => p.trim()).filter(Boolean).join(' ');
}

function tariffWithParagraphs(
  base: Omit<ConsultationTariff, 'description' | 'descriptionParagraphs'> & {
    descriptionParagraphs: string[];
  }
): ConsultationTariff {
  return {
    ...base,
    description: joinTariffDescription(base.descriptionParagraphs),
  };
}

/**
 * Canon listino consulti — unica fonte per UI, booking catalog, SEO e Nina.
 * Soft scale (option 2): Breve €22 · Essenziale €49 · Evolutivo €79 · Integrata €99 (IVA inclusa).
 * ENN-195: lead copy as short paragraphs for readable package cards.
 */
export const consultationTariffs: ConsultationTariff[] = [
  tariffWithParagraphs({
    id: '20m',
    durationMinutes: 20,
    priceEur: 22,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_20M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.0.title]',
    title: 'Consulto Breve',
    cmsKeyDesc: '[COPY: tariffa.placeholder.0.desc]',
    descriptionParagraphs: [
      'Una domanda precisa, una lettura mirata, chiarezza immediata.',
      'Quando hai un dubbio puntuale che richiede attenzione — su una relazione, su un’attesa o su una scelta vicina — e desideri comprendere con lucidità cosa si sta muovendo prima di agire.',
    ],
    cmsKeyFocus: '[COPY: tariffa.placeholder.0.focus]',
    focusLabel: 'Solo chiamata vocale WhatsApp',
    onlineOnly: true,
    includes: [
      'Ci concentriamo su un unico tema attraverso i 78 Arcani, andando all’essenza con ascolto e precisione',
      'Dopo: una visione chiara della situazione e 2–3 indicazioni pratiche via WhatsApp o email',
      'Indicato se desideri fare luce su una singola questione in modo rapido e accessibile (non adatto a più temi insieme)',
    ],
  }),
  tariffWithParagraphs({
    id: '45m',
    durationMinutes: 45,
    priceEur: 49,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_45M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.1.title]',
    title: 'Consulto Essenziale',
    cmsKeyDesc: '[COPY: tariffa.placeholder.1.desc]',
    descriptionParagraphs: [
      'Per fare ordine quando hai due o tre questioni aperte e vuoi orientare bene le tue energie.',
      'Quando una risposta veloce non basta perché gli ambiti coinvolti sono più d’uno — ad esempio affetti e lavoro, oppure una decisione importante da prendere con equilibrio e senza fretta.',
    ],
    cmsKeyFocus: '[COPY: tariffa.placeholder.1.focus]',
    focusLabel: 'Vocale o Studio Macerata (Via Crispi 37)',
    includes: [
      'Osserviamo le situazioni collegate tra loro, mettendo a fuoco dinamiche, ostacoli e possibilità concrete del presente',
      'Dopo: una sintesi scritta dei punti principali emersi, da rileggere con calma',
      'Indicato se cerchi chiarezza concreta su più aspetti della quotidianità in un tempo raccolto ed equilibrato',
    ],
  }),
  tariffWithParagraphs({
    id: '60m',
    durationMinutes: 60,
    priceEur: 79,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_60M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.2.title]',
    title: 'Consulto Evolutivo Completo',
    cmsKeyDesc: '[COPY: tariffa.placeholder.2.desc]',
    descriptionParagraphs: [
      'Per comprendere le radici di ciò che vivi e ritrovare una direzione consapevole.',
      'Quando avverti che una dinamica si ripete — nelle relazioni, nel percorso professionale o nelle scelte personali — e desideri osservare con onestà sia il contesto esterno sia il tuo spazio di azione.',
    ],
    cmsKeyFocus: '[COPY: tariffa.placeholder.2.focus]',
    focusLabel: 'Il più scelto · Vocale o Studio Macerata',
    includes: [
      'Un’ora intera, senza fretta, per approfondire le cause profonde, riconoscere i punti ciechi e individuare le strade più autentiche',
      'Dopo: una sintesi della lettura insieme a tracce di riflessione pratiche per le settimane successive',
      'Indicato se desideri una lettura profonda e rispettosa che ti accompagni a scegliere con consapevolezza e autonomia',
    ],
    recommended: true,
  }),
  tariffWithParagraphs({
    id: '90m',
    durationMinutes: 90,
    priceEur: 99,
    stripePriceIdAnnotation: 'STRIPE_PRICE_ID_CONSULTO_90M',
    cmsKeyTitle: '[COPY: tariffa.placeholder.3.title]',
    title: 'Sessione Integrata',
    cmsKeyDesc: '[COPY: tariffa.placeholder.3.desc]',
    descriptionParagraphs: [
      'Un’ora e mezza dedicata a rimettere insieme tutti i fili e guardare con respiro al percorso che ti attende.',
      'Ideale quando stai chiudendo una fase impegnativa, iniziando un nuovo capitolo o senti il bisogno di esplorare insieme relazioni, lavoro, risorse personali e direzione generale senza frammentare il lavoro.',
    ],
    cmsKeyFocus: '[COPY: tariffa.placeholder.3.focus]',
    focusLabel: 'Vocale o Studio Macerata (Via Crispi 37)',
    includes: [
      'Un incontro ampio e approfondito che abbraccia più ambiti della vita e definisce le priorità dei prossimi mesi',
      'Dopo: riscontro scritto entro 48 ore su un canale riservato, per fissare i passaggi chiave a mente serena',
      'Indicato se desideri un lavoro completo in un unico spazio dedicato, con il miglior equilibrio tra tempo, profondità e investimento',
    ],
  }),
];

/** Compact one-line modality for lists / Nina / SEO. */
export function consultTariffModality(tariff: ConsultationTariff): string {
  if (tariff.onlineOnly) return 'solo online (chiamata vocale WhatsApp)';
  return 'vocale o Studio Macerata (Via Crispi 37)';
}

/** Markdown bullet list of the four packages (Nina / LLM prompts). */
export function formatConsultTariffsMarkdownList(): string {
  return consultationTariffs
    .map((t) => {
      const badge = t.recommended ? ' · **Il più scelto**' : '';
      return `- **${t.title}** · ${t.durationMinutes} min · **€${t.priceEur}** · ${consultTariffModality(t)}${badge}`;
    })
    .join('\n');
}

/** Longer detail block when the user asks for package contents. */
export function formatConsultTariffsMarkdownDetails(): string {
  return consultationTariffs
    .map((t) => {
      const includes = t.includes.map((item) => item).join('; ');
      return `- **${t.title}**: ${t.description} Include: ${includes}.`;
    })
    .join('\n');
}
