/**
 * ENN-244 — share / OG / canonical must never emit *.vercel.app.
 * Run: npx tsx scripts/assert-share-site-origin.ts
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PRODUCTION_SITE_ORIGIN,
  isVercelAppOrigin,
  resolveClientSiteOrigin,
  toPublicAbsoluteUrl,
} from '../src/lib/siteOrigin.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

assert.equal(PRODUCTION_SITE_ORIGIN, 'https://tarotitalia.com');
assert.equal(isVercelAppOrigin('https://ce-se-prova.vercel.app'), true);
assert.equal(isVercelAppOrigin('ce-se-prova.vercel.app'), true);
assert.equal(isVercelAppOrigin('https://tarotitalia.com'), false);
assert.equal(isVercelAppOrigin('https://www.tarotitalia.com'), false);

assert.equal(
  resolveClientSiteOrigin({
    envOrigin: 'https://tarotitalia.com',
    windowOrigin: 'https://ce-se-prova.vercel.app',
  }),
  'https://tarotitalia.com',
  'brand VITE_SITE_ORIGIN wins over vercel window'
);

assert.equal(
  resolveClientSiteOrigin({
    envOrigin: 'https://ce-se-prova.vercel.app',
    windowOrigin: 'https://ce-se-prova.vercel.app',
  }),
  'https://tarotitalia.com',
  'vercel env + vercel window → brand canonical'
);

assert.equal(
  resolveClientSiteOrigin({
    envOrigin: undefined,
    windowOrigin: 'https://ce-se-prova.vercel.app',
  }),
  'https://tarotitalia.com',
  'missing env on vercel host → brand canonical (share fix)'
);

assert.equal(
  resolveClientSiteOrigin({
    envOrigin: undefined,
    windowOrigin: 'https://www.tarotitalia.com',
  }),
  'https://www.tarotitalia.com',
  'custom domain window origin kept'
);

assert.equal(
  resolveClientSiteOrigin({
    envOrigin: undefined,
    windowOrigin: 'http://localhost:5173',
  }),
  'http://localhost:5173',
  'localhost kept for local share debugging'
);

assert.equal(
  toPublicAbsoluteUrl(
    'https://ce-se-prova.vercel.app/news/matto',
    'https://tarotitalia.com'
  ),
  'https://tarotitalia.com/news/matto',
  'absolute vercel share URL rewritten to brand'
);

assert.equal(
  toPublicAbsoluteUrl('/prenota', 'https://tarotitalia.com'),
  'https://tarotitalia.com/prenota'
);

const indexHtml = readFileSync(path.join(root, 'index.html'), 'utf8');
assert.match(
  indexHtml,
  /property="og:url"\s+content="https:\/\/tarotitalia\.com\/"/,
  'index.html static og:url is brand apex'
);
assert.match(
  indexHtml,
  /rel="canonical"\s+href="https:\/\/tarotitalia\.com\/"/,
  'index.html static canonical is brand apex'
);
assert.doesNotMatch(
  indexHtml,
  /https?:\/\/[^\s"'<>]*vercel\.app/i,
  'index.html must not bake a vercel.app URL into meta/links'
);

const share = readFileSync(
  path.join(root, 'src/components/SocialShareButtons.tsx'),
  'utf8'
);
assert.match(
  share,
  /toPublicAbsoluteUrl/,
  'SocialShareButtons rewrites via toPublicAbsoluteUrl'
);
assert.doesNotMatch(
  share,
  /ce-se-prova\.vercel\.app/,
  'SocialShareButtons has no hardcoded vercel host'
);

const seo = readFileSync(path.join(root, 'src/lib/seo.ts'), 'utf8');
assert.match(
  seo,
  /resolveClientSiteOrigin/,
  'seo.getSiteOrigin uses resolveClientSiteOrigin'
);

console.log('assert-share-site-origin: ok');
