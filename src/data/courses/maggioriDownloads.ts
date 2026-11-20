/**
 * ENN-140 — Curated Maggiori dispensa downloads by language.
 * IT + EN ship in this PR; ES/FR/DE stubbed (fall back to IT until curated).
 */
import type { CuratedDownloadLang } from '../../i18n/materialsLang';
import { resolveDownloadLang } from '../../i18n/materialsLang';
import type { SiteLang } from '../../i18n/types';

export type MaggioriModuleNumber = '01' | '02' | '03' | '04';

const MODULES: MaggioriModuleNumber[] = ['01', '02', '03', '04'];

function modulePath(lang: CuratedDownloadLang, module: MaggioriModuleNumber) {
  return `/dispense/arcani-maggiori/${lang}/modulo-${module}.md`;
}

/** Public URL for a curated Maggiori module file, or null if missing. */
export function getMaggioriDispensaDownloadUrl(
  moduleNumber: string,
  preferredLang?: SiteLang
): { lang: CuratedDownloadLang; url: string; filename: string } | null {
  const normalized = moduleNumber.padStart(2, '0') as MaggioriModuleNumber;
  if (!MODULES.includes(normalized)) return null;
  const lang = resolveDownloadLang(preferredLang);
  const url = modulePath(lang, normalized);
  return {
    lang,
    url,
    filename: `tarot-italia-arcani-maggiori-modulo-${normalized}-${lang}.md`,
  };
}

/** Trigger browser download of a curated Maggiori file. */
export async function downloadMaggioriDispensaFile(
  moduleNumber: string,
  preferredLang?: SiteLang
): Promise<{ lang: CuratedDownloadLang; filename: string }> {
  const target = getMaggioriDispensaDownloadUrl(moduleNumber, preferredLang);
  if (!target) {
    throw new Error('Modulo dispensa non trovato.');
  }
  const res = await fetch(target.url);
  if (!res.ok) {
    throw new Error(
      `File curato non disponibile (${target.lang.toUpperCase()}).`
    );
  }
  const text = await res.text();
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objectUrl;
  a.download = target.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
  return { lang: target.lang, filename: target.filename };
}
