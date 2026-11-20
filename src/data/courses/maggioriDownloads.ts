/**
 * ENN-145 — Maggiori dispensa download: branded printable HTML in googtrans lang
 * (auto-translated from IT via Groq). Curated static EN markdown is no longer
 * the primary Scarica path (kept on disk as fallback assets only).
 */
import { buildBrandedDispensaHtml } from '../../lib/dispensaBrandedHtml';
import { stripDispensaEmbedMarkers } from '../../lib/stripDispensaEmbeds';
import type { ReservedUnlockedDispensa } from '../../types/handoff';

export type MaggioriModuleNumber = '01' | '02' | '03' | '04';

const MODULES: MaggioriModuleNumber[] = ['01', '02', '03', '04'];

/** Open branded HTML in a new tab (print dialog → Save as PDF). */
export function openBrandedDispensaPrintHtml(html: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);
  const opened = window.open(objectUrl, '_blank', 'noopener,noreferrer');
  if (!opened) {
    // Popup blocked — navigate same tab as last resort.
    window.location.href = objectUrl;
    return;
  }
  // Revoke after the new document has had time to load.
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
}

/**
 * Entitled Scarica: server builds translated branded HTML.
 * Query `lang` comes from `readGoogTransLang()` (same cookie/hash as Nina).
 */
export async function downloadMaggioriDispensaPdf(params: {
  dispensaId: number;
  lang: string;
  getIdToken: () => Promise<string | null>;
}): Promise<{ lang: string; filename: string; translated: boolean }> {
  const token = await params.getIdToken();
  if (!token) {
    throw new Error('Sessione scaduta. Accedi di nuovo.');
  }
  const lang = encodeURIComponent(params.lang || 'it');
  const res = await fetch(
    `/api/reserved/dispense/${params.dispensaId}/pdf?lang=${lang}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );
  const json = (await res.json()) as {
    error?: string;
    html?: string;
    lang?: string;
    filename?: string;
    translated?: boolean;
  };
  if (!res.ok || !json.html) {
    throw new Error(json.error || 'Impossibile generare il PDF della dispensa.');
  }
  openBrandedDispensaPrintHtml(json.html);
  return {
    lang: json.lang || params.lang || 'it',
    filename: json.filename || `tarot-italia-dispensa-${params.dispensaId}.pdf`,
    translated: Boolean(json.translated),
  };
}

/**
 * Offline / demo fallback: branded Italian print from overview markdown
 * (no server translate). Used when API is unavailable for demo sessions.
 */
export function downloadDispensaBrandedHtmlFallback(params: {
  courseTitle: string;
  dispensa: ReservedUnlockedDispensa;
  lang?: string;
}): void {
  const body = stripDispensaEmbedMarkers(params.dispensa.contentMarkdown);
  const origin = window.location.origin;
  const html = buildBrandedDispensaHtml({
    markdown: body,
    lang: params.lang || 'it',
    moduleNumber: params.dispensa.moduleNumber,
    title: params.dispensa.title,
    subtitle: params.dispensa.subtitle,
    courseTitle: params.courseTitle,
    origin,
    autoPrint: true,
  });
  openBrandedDispensaPrintHtml(html);
}

/** @deprecated ENN-140 curated MD URL — kept for asset discovery / smoke only. */
export function getMaggioriDispensaDownloadUrl(
  moduleNumber: string,
  preferredLang: 'it' | 'en' = 'it'
): { lang: 'it' | 'en'; url: string; filename: string } | null {
  const normalized = moduleNumber.padStart(2, '0') as MaggioriModuleNumber;
  if (!MODULES.includes(normalized)) return null;
  const lang = preferredLang === 'en' ? 'en' : 'it';
  return {
    lang,
    url: `/dispense/arcani-maggiori/${lang}/modulo-${normalized}.md`,
    filename: `tarot-italia-arcani-maggiori-modulo-${normalized}-${lang}.md`,
  };
}
