import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GT_ENABLED } from '../lib/googleTranslateEnabled';
import { applyDocumentLang } from './applyDocumentLang';
import { detectSiteLang, persistSiteLang, syncLangQueryParam } from './detect';
import { catalogTranslations } from './locales/catalog';
import { commonTranslations } from './locales/common';
import { contentTranslations } from './locales/content';
import { seoTranslations } from './locales/seo';
import {
  DEFAULT_LANG,
  isSiteLang,
  SUPPORTED_LANGS,
  type SiteLang,
} from './types';

function buildResources() {
  const resources: Record<
    SiteLang,
    {
      common: Record<string, string>;
      content: Record<string, string>;
      catalog: Record<string, string>;
      seo: Record<string, string>;
    }
  > = {} as never;

  for (const lang of SUPPORTED_LANGS) {
    const seoFlat: Record<string, string> = {};
    const seoPages = seoTranslations[lang];
    for (const [screen, page] of Object.entries(seoPages)) {
      if (!page) continue;
      seoFlat[`pages.${screen}.title`] = page.title;
      seoFlat[`pages.${screen}.description`] = page.description;
    }

    resources[lang] = {
      common: commonTranslations[lang],
      content: contentTranslations[lang],
      catalog: catalogTranslations[lang],
      seo: seoFlat,
    };
  }

  return resources;
}

let initialized = false;

export function initI18n(search?: string): typeof i18n {
  // ENN-204 — while Traduci/GT is the public language system, keep react-i18next
  // on Italian so curated EN/ES/… overlays are not “stuck” and GT can translate
  // a single Italian DOM source (same policy as applyGoogTransLang).
  const detected = detectSiteLang(search);
  const lng: SiteLang = GT_ENABLED ? DEFAULT_LANG : detected;

  if (!initialized) {
    void i18n.use(initReactI18next).init({
      resources: buildResources(),
      lng,
      fallbackLng: DEFAULT_LANG,
      defaultNS: 'common',
      ns: ['common', 'content', 'catalog', 'seo'],
      interpolation: { escapeValue: false },
      returnNull: false,
      // Missing keys fall back to Italian resources / caller defaultValue
      parseMissingKeyHandler: (key) => key,
    });
    initialized = true;
  } else if (i18n.language !== lng) {
    void i18n.changeLanguage(lng);
  }

  persistSiteLang(lng);
  if (typeof document !== 'undefined') {
    applyDocumentLang(lng);
  }

  return i18n;
}

/** Change language, persist, sync `?lang=`, update document lang/hreflang. */
export async function setSiteLanguage(lang: SiteLang): Promise<void> {
  if (!isSiteLang(lang)) return;
  await i18n.changeLanguage(lang);
  persistSiteLang(lang);
  syncLangQueryParam(lang);
  applyDocumentLang(lang);
}

export function getSiteLanguage(): SiteLang {
  const raw = (i18n.resolvedLanguage || i18n.language || DEFAULT_LANG)
    .split('-')[0]
    .toLowerCase();
  return isSiteLang(raw) ? raw : DEFAULT_LANG;
}

export {
  DEFAULT_LANG,
  LANG_LABELS,
  LANG_SHORT,
  SUPPORTED_LANGS,
  type SiteLang,
} from './types';

export { maggioriNameFor, maggioriNamesByLang } from './locales/maggiori';
export { cmsKeyToContentKey } from './locales/content';

export default i18n;
