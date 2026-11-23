/**
 * ENN-246 — static guard that anti-copy hardening stays wired.
 * Run: npx tsx scripts/assert-content-protection.ts
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const protection = readFileSync(
  path.join(root, 'src/lib/contentProtection.ts'),
  'utf8'
);
const css = readFileSync(path.join(root, 'src/index.css'), 'utf8');
const main = readFileSync(path.join(root, 'src/main.tsx'), 'utf8');

assert.match(
  main,
  /installContentProtection\s*\(\s*\)/,
  'main.tsx must install content protection on boot'
);

for (const hook of [
  'selectstart',
  'keydown',
  'selectionchange',
  'copy',
  'cut',
  'contextmenu',
  'dragstart',
] as const) {
  assert.match(
    protection,
    new RegExp(`['"]${hook}['"]`),
    `contentProtection must listen for ${hook}`
  );
}

assert.match(
  protection,
  /BLOCKED_MOD_KEYS/,
  'must block Ctrl/Cmd select-all / copy shortcuts'
);
assert.match(
  protection,
  /isEditingContext|isEditableTarget/,
  'must keep form / chat / login editable'
);
assert.match(
  protection,
  /\.ti-allow-select/,
  'must honor .ti-allow-select opt-in'
);

assert.match(
  css,
  /#root \*,\s*\n\s*#root \*::before,\s*\n\s*#root \*::after/,
  'CSS must force user-select:none on #root descendants'
);
assert.match(
  css,
  /-webkit-touch-callout:\s*none/,
  'CSS must disable iOS long-press callout on page chrome'
);
assert.match(
  css,
  /\.ti-allow-select \*/,
  'CSS must re-enable selection inside .ti-allow-select'
);
assert.match(
  css,
  /user-select:\s*text\s*!important/,
  'form controls must win over the #root * none rule'
);

console.log('assert-content-protection: ok');
