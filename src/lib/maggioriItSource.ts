/**
 * ENN-154 — Arcani Maggiori Italian source of truth for PDF (and any future
 * on-screen loaders). Never load `public/dispense/arcani-maggiori/en/` as the
 * translate pipeline source — curated EN files are archive-only.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { stripDispensaEmbedMarkers } from './stripDispensaEmbeds.ts';

export const MAGGIORI_COURSE_SLUG = 'arcani-maggiori';
export const MAGGIORI_MODULES = new Set(['01', '02', '03', '04']);

export function normalizeMaggioriModule(moduleNumber: string): string {
  return moduleNumber.padStart(2, '0');
}

/** Public URL path — always `/it/`, never `/en/`. */
export function maggioriItPublicPath(moduleNumber: string): string {
  const nn = normalizeMaggioriModule(moduleNumber);
  if (!MAGGIORI_MODULES.has(nn)) {
    throw new Error(`Modulo Maggiori non supportato: ${moduleNumber}`);
  }
  return `/dispense/arcani-maggiori/it/modulo-${nn}.md`;
}

export function maggioriItAbsoluteUrl(
  origin: string,
  moduleNumber: string
): string {
  return `${origin.replace(/\/$/, '')}${maggioriItPublicPath(moduleNumber)}`;
}

/** Repo / deploy root → `public/dispense/.../it/modulo-NN.md`. */
export function maggioriItFsPath(
  projectRoot: string,
  moduleNumber: string
): string {
  const nn = normalizeMaggioriModule(moduleNumber);
  return path.join(
    projectRoot,
    'public',
    'dispense',
    'arcani-maggiori',
    'it',
    `modulo-${nn}.md`
  );
}

/** Reject accidental EN (or other) curated paths in the PDF pipeline. */
export function assertMaggioriItSourceUrl(url: string): void {
  const lower = url.toLowerCase();
  if (lower.includes('/dispense/arcani-maggiori/en/')) {
    throw new Error(
      'ENN-154: Maggiori PDF must not load curated EN markdown as source.'
    );
  }
  if (
    lower.includes('/dispense/arcani-maggiori/') &&
    !lower.includes('/dispense/arcani-maggiori/it/')
  ) {
    throw new Error(
      'ENN-154: Maggiori PDF source path must be under .../arcani-maggiori/it/.'
    );
  }
}

function readFsItalian(moduleNumber: string): string | null {
  const nn = normalizeMaggioriModule(moduleNumber);
  if (!MAGGIORI_MODULES.has(nn)) return null;

  const candidates = [
    maggioriItFsPath(process.cwd(), nn),
    // Vercel / bundled cwd may sit under dist — walk up once for public/.
    maggioriItFsPath(path.resolve(process.cwd(), '..'), nn),
  ];

  for (const filePath of candidates) {
    try {
      if (!existsSync(filePath)) continue;
      const text = readFileSync(filePath, 'utf8').trim();
      if (text) return text;
    } catch {
      /* try next */
    }
  }
  return null;
}

/**
 * Load Maggiori dispensa Markdown in Italian only.
 * Order: local `public/.../it/` → HTTP `/it/` → DB/seed fallback (also IT).
 */
export async function loadMaggioriItalianMarkdown(params: {
  moduleNumber: string;
  origin: string;
  fallbackMarkdown?: string;
}): Promise<string> {
  const nn = normalizeMaggioriModule(params.moduleNumber);

  const fromDisk = readFsItalian(nn);
  if (fromDisk) return fromDisk;

  if (MAGGIORI_MODULES.has(nn)) {
    const url = maggioriItAbsoluteUrl(params.origin, nn);
    assertMaggioriItSourceUrl(url);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = (await res.text()).trim();
        if (text) return text;
      }
    } catch (error) {
      console.warn('Maggiori IT markdown fetch failed:', nn, error);
    }
  }

  const fallback = (params.fallbackMarkdown || '').trim();
  if (fallback) return stripDispensaEmbedMarkers(fallback);
  throw new Error('Dispensa non trovata.');
}
