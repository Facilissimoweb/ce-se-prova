import type { ScreenId } from '../types/handoff';
import { pathForScreen } from './appPaths';
import { holisticFaqs, consultiFaqs } from '../data/siteContent';
import { SITE_EMAIL, SITE_PHONE_E164, SITE_PIVA } from './siteContacts';

/** Default brand strings (also used as index.html fallbacks). */
export const SEO_SITE_NAME = 'Tarot Italia';
export const SEO_DEFAULT_TITLE =
  'Tarot Italia — Maria Teresa Rogani · Operatore Olistico';
export const SEO_DEFAULT_DESCRIPTION =
  'Tarot Italia di Maria Teresa Rogani, operatore olistico. Consulenze simboliche, evolutive e previsionali dei Tarocchi per leggere il presente e il futuro nel rispetto del codice deontologico.';
export const SEO_DEFAULT_OG_IMAGE = '/brand/tarot-italia-nav.png';

export type PageSeo = {
  title: string;
  description: string;
  /** If true, ask crawlers not to index (private / error). */
  noindex?: boolean;
};

const PAGE_SEO: Record<ScreenId, PageSeo> = {
  home: {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
  },
  'chi-sono': {
    title: 'Chi Sono — Tarot Italia · Maria Teresa Rogani',
    description:
      'Formazione e percorso di Maria Teresa Rogani, Operatore Olistico: metodo simbolico ed evolutivo dei Tarocchi, etica e ascolto.',
  },
  consulti: {
    title: 'Consulti — Tarot Italia · €19 / €50 / €75 / €90',
    description:
      'Consulti con Maria Teresa Rogani: Breve 20′ €19 (solo online), Essenziale 45′ €50, Evolutivo 60′ €75, Integrata 90′ €90. Arcani Maggiori e Minori in ogni sessione. Prenotazione WhatsApp.',
  },
  corsi: {
    title: 'Corsi — Tarot Italia · Didattica a breve',
    description:
      'Percorsi formativi Tarot Italia in preparazione (Arcani Maggiori, Minori, metodi di stesura). Catalogo e iscrizioni a breve.',
  },
  booking: {
    title: 'Prenota Consulto — Tarot Italia',
    description:
      'Scegli durata, giorno e orario e invia la prenotazione su WhatsApp. Consulti online in chiamata vocale o di persona a Macerata (Via Crispi 37).',
  },
  chat: {
    title: 'Dialogo Tarot — Tarot Italia',
    description:
      'Spazio interattivo con i 22 Arcani Maggiori per una riflessione guidata. Non sostituisce un consulto con Maria Teresa Rogani.',
  },
  news: {
    title: 'Blog / News — Tarot Italia',
    description:
      'Articoli e riflessioni di Tarot Italia: tarologia, simboli e percorso evolutivo, pubblicati sul sito.',
  },
  contatti: {
    title: 'Contatti — Tarot Italia · Macerata',
    description:
      'Contatta Maria Teresa Rogani: email info@tarotitalia.com, telefono/WhatsApp 379 103 82 53, studio Via Crispi 37, 62100 Macerata. P.IVA 02136780430.',
  },
  'area-riservata': {
    title: 'Area Riservata — Tarot Italia',
    description:
      'Accesso riservato ai corsisti Tarot Italia: dispense, appunti e percorsi formativi.',
    noindex: true,
  },
  privacy: {
    title: 'Privacy — Tarot Italia',
    description:
      'Informativa privacy e cookie di Tarot Italia (Maria Teresa Rogani) ai sensi del GDPR.',
  },
  termini: {
    title: 'Termini di servizio — Tarot Italia',
    description:
      'Condizioni di vendita e di servizio di Tarot Italia — Maria Teresa Rogani.',
  },
  disclaimer: {
    title: 'Disclaimer — Tarot Italia',
    description:
      'Limiti del servizio olistico e responsabilità: Tarot Italia non sostituisce pareri medici, psicologici o legali.',
  },
  sitemap: {
    title: 'Mappa del sito — Tarot Italia',
    description:
      'Indice delle pagine pubbliche di Tarot Italia (Home, Chi sono, Consulti, Dialogo, Corsi, Blog, Contatti).',
  },
  'not-found': {
    title: 'Pagina non trovata — Tarot Italia',
    description: 'Il percorso richiesto non esiste su Tarot Italia.',
    noindex: true,
  },
};

export function pageSeoForScreen(screen: ScreenId): PageSeo {
  return PAGE_SEO[screen] ?? PAGE_SEO.home;
}

export function pageTitleForScreen(screen: ScreenId): string {
  return pageSeoForScreen(screen).title;
}

/**
 * Public origin for absolute SEO URLs (canonical, OG, sitemap).
 * Prefer `VITE_SITE_ORIGIN` (or mirror of `APP_URL`) so previews keep their host;
 * at domain cutover set it to `https://www.tarotitalia.com`.
 * Runtime fallback: `window.location.origin` (never hardcodes the brand domain alone).
 */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_ORIGIN?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv).origin;
    } catch {
      return fromEnv.replace(/\/$/, '');
    }
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return '';
}

export function absoluteUrl(path: string, origin = getSiteOrigin()): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (!origin) return normalizedPath;
  return `${origin.replace(/\/$/, '')}${normalizedPath}`;
}

export function canonicalPathForScreen(screen: ScreenId): string {
  if (screen === 'not-found') {
    return typeof window !== 'undefined' ? window.location.pathname : '/404';
  }
  return pathForScreen(screen);
}

function upsertMeta(
  selector: { attr: 'name' | 'property'; key: string },
  content: string
): void {
  const head = document.head;
  let el = head.querySelector(
    `meta[${selector.attr}="${selector.key}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(selector.attr, selector.key);
    head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  const head = document.head;
  let el = head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: unknown): void {
  const head = document.head;
  let el = head.querySelector(`script#${id}`) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function organizationJsonLd(origin: string) {
  const url = origin || undefined;
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    name: 'Tarot Italia',
    alternateName: 'Tarot Italia — Maria Teresa Rogani',
    description: SEO_DEFAULT_DESCRIPTION,
    url: url || undefined,
    email: SITE_EMAIL,
    telephone: `+${SITE_PHONE_E164}`,
    taxID: SITE_PIVA,
    image: absoluteUrl(SEO_DEFAULT_OG_IMAGE, origin),
    logo: absoluteUrl('/brand/tarot-italia-logo.png', origin),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Crispi 37',
      addressLocality: 'Macerata',
      postalCode: '62100',
      addressCountry: 'IT',
    },
    areaServed: ['IT', 'Online'],
    priceRange: '€19–€90',
    founder: {
      '@type': 'Person',
      name: 'Maria Teresa Rogani',
      jobTitle: 'Operatore Olistico',
    },
    sameAs: ['https://tarotitalia.substack.com/'],
  };
}

function faqJsonLd(
  faqs: { question: string; answer: string }[],
  pageUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: pageUrl || undefined,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** Apply classic SEO tags for the active SPA screen (client-side). */
export function applyDocumentSeo(screen: ScreenId): void {
  if (typeof document === 'undefined') return;

  const seo = pageSeoForScreen(screen);
  const origin = getSiteOrigin();
  const path = canonicalPathForScreen(screen);
  const canonical = absoluteUrl(path, origin);
  const image = absoluteUrl(SEO_DEFAULT_OG_IMAGE, origin);

  document.title = seo.title;
  upsertMeta({ attr: 'name', key: 'description' }, seo.description);
  upsertMeta(
    { attr: 'name', key: 'robots' },
    seo.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  );

  upsertMeta({ attr: 'property', key: 'og:title' }, seo.title);
  upsertMeta({ attr: 'property', key: 'og:description' }, seo.description);
  upsertMeta({ attr: 'property', key: 'og:type' }, 'website');
  upsertMeta({ attr: 'property', key: 'og:site_name' }, SEO_SITE_NAME);
  upsertMeta({ attr: 'property', key: 'og:locale' }, 'it_IT');
  upsertMeta({ attr: 'property', key: 'og:image' }, image);
  if (canonical.startsWith('http')) {
    upsertMeta({ attr: 'property', key: 'og:url' }, canonical);
    upsertLink('canonical', canonical);
  } else {
    upsertLink('canonical', path);
  }

  upsertMeta({ attr: 'name', key: 'twitter:card' }, 'summary_large_image');
  upsertMeta({ attr: 'name', key: 'twitter:title' }, seo.title);
  upsertMeta({ attr: 'name', key: 'twitter:description' }, seo.description);
  upsertMeta({ attr: 'name', key: 'twitter:image' }, image);

  upsertJsonLd('json-ld-organization', organizationJsonLd(origin));

  if (screen === 'home') {
    upsertJsonLd(
      'json-ld-faq',
      faqJsonLd(
        holisticFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        })),
        canonical.startsWith('http') ? canonical : absoluteUrl('/', origin)
      )
    );
  } else if (screen === 'consulti') {
    upsertJsonLd(
      'json-ld-faq',
      faqJsonLd(
        consultiFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        })),
        canonical.startsWith('http') ? canonical : absoluteUrl('/consulti', origin)
      )
    );
  } else {
    document.getElementById('json-ld-faq')?.remove();
  }
}
