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
  flash.includes('notranslate') && scheda.includes('notranslate'),
  'Sigillo + schede keep intentional notranslate on body'
);
assert(
  !/<section\b[^>]*\bnotranslate\b/.test(flash) &&
    !/<section\b[^>]*translate="no"/.test(flash),
  'Sigillo shell section is GT-able (ENN-155)'
);
assert(
  !/<section\b[^>]*\bnotranslate\b/.test(scheda) &&
    !/<section\b[^>]*translate="no"/.test(scheda),
  'Scheda shell section is GT-able (ENN-155)'
);
assert(
  /Layers[\s\S]{0,120}Sigillo di apprendimento/.test(flash) &&
    !/className="[^"]*notranslate[^"]*"[\s\S]{0,80}Sigillo di apprendimento/.test(
      flash
    ),
  'Sigillo eyebrow label is outside notranslate'
);
assert(
  /SECTION_LABELS[\s\S]*mappa:\s*'Mappa della composizione'/.test(scheda) &&
    scheda.includes('Mappa della Composizione Visiva') &&
    !/className="[^"]*notranslate[^"]*"[\s\S]{0,160}Mappa della Composizione Visiva/.test(
      scheda
    ),
  'Mappa section titles are outside notranslate'
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
