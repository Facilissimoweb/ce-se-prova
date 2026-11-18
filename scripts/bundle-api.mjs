/**
 * Bundle each Ennamo API group into api/<name>.js for Vercel.
 * Inline local + JS deps; keep native/heavy packages external (pg, firebase-admin).
 * api/health.ts stays as a zero-dep TypeScript entry (not bundled).
 */
import * as esbuild from 'esbuild';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildBlogPosts } from './build-blog.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const entriesDir = path.join(root, 'src', 'server', 'apiEntries');
const outDir = path.join(root, 'api');

const blog = buildBlogPosts();
console.log(
  `[blog] ${blog.published}/${blog.count} post(s) → ${path.relative(root, blog.outFile)}`
);

/** Output basename under api/ → source file under apiEntries/ */
const entries = {
  courses: 'courses.ts',
  bookings: 'bookings.ts',
  'booking-availability': 'bookingAvailability.ts',
  stripe: 'stripe.ts',
  reserved: 'reserved.ts',
  dialogue: 'dialogue.ts',
  news: 'news.ts',
  chat: 'chat.ts',
  'coming-soon': 'comingSoon.ts',
};

mkdirSync(outDir, { recursive: true });

await esbuild.build({
  absWorkingDir: root,
  entryPoints: Object.fromEntries(
    Object.entries(entries).map(([outName, src]) => [
      outName,
      path.join(entriesDir, src),
    ])
  ),
  outdir: outDir,
  entryNames: '[name]',
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  // Bundle pure JS deps into the function; leave native / huge SDKs on node_modules.
  external: [
    'pg',
    'pg-native',
    'firebase-admin',
    'firebase-admin/*',
    '@google-cloud/*',
    'nodemailer',
  ],
  sourcemap: false,
  logLevel: 'info',
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.json': 'json',
  },
});

console.log(
  `bundled API -> ${Object.keys(entries)
    .map((n) => `api/${n}.js`)
    .join(', ')}`
);
