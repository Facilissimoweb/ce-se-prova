/**
 * ENN-145 — smoke: branded HTML from IT markdown (no Groq / no network).
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildBrandedDispensaHtml,
  dispensaPdfFilename,
  markdownToBrandedBodyHtml,
} from '../src/lib/dispensaBrandedHtml.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const mdPath = path.join(
  root,
  'public/dispense/arcani-maggiori/it/modulo-01.md'
);
const md = readFileSync(mdPath, 'utf8');
const body = markdownToBrandedBodyHtml(md);
if (!body.includes('<h1>') && !body.includes('<h2>')) {
  throw new Error('Expected headings in branded body HTML');
}
const html = buildBrandedDispensaHtml({
  markdown: md,
  lang: 'it',
  moduleNumber: '01',
  title: 'Architettura e Primo Settenario',
  subtitle: 'Test',
  courseTitle: 'Arcani Maggiori',
  origin: 'https://tarotitalia.com',
  autoPrint: false,
});
if (!html.includes('Tarot Italia') || !html.includes('info@tarotitalia.com')) {
  throw new Error('Branded HTML missing brand/footer contacts');
}
if (!html.includes('/brand/tarot-italia-nav.png')) {
  throw new Error('Branded HTML missing logo URL');
}
const name = dispensaPdfFilename('01', 'zh-cn');
if (name !== 'tarot-italia-arcani-maggiori-modulo-01-zh-cn.pdf') {
  throw new Error(`Unexpected filename: ${name}`);
}
console.log('assert-dispensa-branded-html: ok');
