/**
 * ENN-154 — Maggiori IT-only source for GT + PDF.
 * Run: npx tsx scripts/assert-maggiori-it-source.ts
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  assertMaggioriItSourceUrl,
  loadMaggioriItalianMarkdown,
  maggioriItPublicPath,
} from '../src/lib/maggioriItSource.ts';
import { getMaggioriDispensaDownloadUrl } from '../src/data/courses/maggioriDownloads.ts';
import { resolveDownloadLang } from '../src/i18n/materialsLang.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
let failed = 0;

function assert(cond: boolean, label: string) {
  if (!cond) {
    console.error('FAIL:', label);
    failed += 1;
  } else {
    console.log('PASS:', label);
  }
}

assert(
  maggioriItPublicPath('1') === '/dispense/arcani-maggiori/it/modulo-01.md',
  'public path is always /it/'
);

try {
  assertMaggioriItSourceUrl(
    'https://example.com/dispense/arcani-maggiori/en/modulo-01.md'
  );
  assert(false, 'assertMaggioriItSourceUrl must reject /en/');
} catch {
  assert(true, 'assertMaggioriItSourceUrl rejects /en/');
}

assert(
  resolveDownloadLang('en') === 'it',
  'resolveDownloadLang ignores EN and returns it'
);

const enPref = getMaggioriDispensaDownloadUrl('01', 'en');
assert(!!enPref && enPref.lang === 'it', 'download URL ignores preferredLang=en');
assert(
  !!enPref && enPref.url.includes('/it/') && !enPref.url.includes('/en/'),
  'download URL path is /it/ only'
);

const md = await loadMaggioriItalianMarkdown({
  moduleNumber: '01',
  origin: 'http://127.0.0.1:9',
  fallbackMarkdown: '## Fallback IT seed',
});
assert(
  /Arcani Maggiori|Primo Settenario|Matto/i.test(md),
  'loads Italian modulo-01 from disk'
);
assert(!/\bThe Fool\b/.test(md), 'IT source must not be curated EN Fool wording');

const reservedSrc = readFileSync(
  path.join(root, 'src/server/routes/reserved.ts'),
  'utf8'
);
assert(
  !reservedSrc.includes("arcani-maggiori/en/"),
  'reserved.ts PDF route never references /en/'
);
assert(
  reservedSrc.includes('loadMaggioriItalianMarkdown'),
  'reserved.ts uses loadMaggioriItalianMarkdown'
);
assert(
  reservedSrc.includes('translateDispensaChrome'),
  'reserved.ts translates PDF chrome from IT'
);

const preview = readFileSync(
  path.join(root, 'src/components/corsi/MaggioriMattoPreview.tsx'),
  'utf8'
);
assert(
  !/className="[^"]*notranslate/.test(preview) &&
    !preview.includes('translate="no"'),
  'MaggioriMattoPreview has no leftover notranslate shell'
);

const body = readFileSync(
  path.join(root, 'src/components/reserved/FormattedDispensaBody.tsx'),
  'utf8'
);
assert(
  !/className="[^"]*notranslate/.test(body) &&
    !body.includes('translate="no"'),
  'FormattedDispensaBody has no notranslate attribute (GT must reach body)'
);

const flash = readFileSync(
  path.join(root, 'src/components/reserved/DispensaFlashcards.tsx'),
  'utf8'
);
const scheda = readFileSync(
  path.join(root, 'src/components/reserved/DispensaSchedaVisiva.tsx'),
  'utf8'
);
assert(
  !flash.includes('notranslate') && !flash.includes('translate="no"'),
  'Sigillo flashcards fully GT-able — no notranslate on Q/A (ENN-157)'
);
assert(
  !/className="[^"]*notranslate/.test(scheda) &&
    !scheda.includes('translate="no"'),
  'Scheda composizione body has no notranslate (ENN-156 — GT-able map copy)'
);
assert(
  !/<section\b[^>]*\bnotranslate\b/.test(flash) &&
    !/<section\b[^>]*translate="no"/.test(flash),
  'Sigillo shell section is GT-able (ENN-155)'
);
assert(
  /Layers[\s\S]{0,120}Sigillo di apprendimento/.test(flash),
  'Sigillo eyebrow label present'
);
assert(
  /SECTION_LABELS[\s\S]*mappa:\s*'Mappa della composizione'/.test(scheda) &&
    scheda.includes('Mappa della Composizione Visiva') &&
    scheda.includes('requestGoogleTranslateRefresh'),
  'Mappa titles present + scheda requests GT refresh after mount (ENN-156)'
);
assert(
  /className=\{`flashcard-body-text/.test(flash) &&
    !/notranslate flashcard-body-text/.test(flash),
  'Flashcard Q/A h2 has no notranslate (ENN-157 — whole-site GT)'
);
assert(
  flash.includes('requestGoogleTranslateRefresh'),
  'Sigillo requests GT refresh on card flip/nav (ENN-156/157)'
);
assert(
  flash.includes('faceKey') &&
    /key=\{faceKey\}/.test(flash) &&
    flash.includes("flipped ? 'a' : 'q'"),
  'Sigillo remounts Domanda/Risposta faces separately (ENN-162 — full GT both sides)'
);
assert(
  flash.includes('GtSafeBoundary'),
  'Sigillo face wrapped in GtSafeBoundary (ENN-162)'
);
assert(
  /requestGoogleTranslateRefresh\(380\)/.test(flash) ||
    flash.includes('requestGoogleTranslateRefresh(380)'),
  'Sigillo dual GT refresh after face remount (ENN-162)'
);

const catalog = readFileSync(
  path.join(root, 'src/i18n/useLocalizedCatalog.ts'),
  'utf8'
);
assert(
  catalog.includes("course.id === 'arcani-maggiori'") &&
    catalog.includes('return course'),
  'useLocalizedCourses keeps Maggiori on Italian live copy'
);

if (failed > 0) {
  console.error(`assert-maggiori-it-source: ${failed} failure(s)`);
  process.exit(1);
}
console.log('assert-maggiori-it-source: ok');
