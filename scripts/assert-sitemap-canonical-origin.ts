/**
 * ENN-198 — sitemap origin must never be *.vercel.app on Production builds.
 */
import assert from 'node:assert/strict';
import {
  PRODUCTION_SITE_ORIGIN,
  isVercelAppHost,
  resolveSiteOrigin,
} from './generate-seo-assets.mjs';

assert.equal(PRODUCTION_SITE_ORIGIN, 'https://tarotitalia.com');
assert.equal(isVercelAppHost('https://ce-se-prova.vercel.app'), true);
assert.equal(isVercelAppHost('ce-se-prova.vercel.app'), true);
assert.equal(isVercelAppHost('https://tarotitalia.com'), false);
assert.equal(isVercelAppHost('https://www.tarotitalia.com'), false);

assert.equal(
  resolveSiteOrigin({
    VITE_SITE_ORIGIN: 'https://tarotitalia.com',
    VERCEL_ENV: 'production',
    VERCEL_PROJECT_PRODUCTION_URL: 'ce-se-prova.vercel.app',
  }),
  'https://tarotitalia.com'
);

assert.equal(
  resolveSiteOrigin({
    APP_URL: 'https://ce-se-prova.vercel.app',
    VERCEL_ENV: 'production',
    VERCEL_PROJECT_PRODUCTION_URL: 'ce-se-prova.vercel.app',
    VERCEL_URL: 'ce-se-prova.vercel.app',
  }),
  'https://tarotitalia.com',
  'Production must ignore vercel.app APP_URL / VERCEL_* and use brand canonical'
);

assert.equal(
  resolveSiteOrigin({
    SITE_URL: 'https://www.tarotitalia.com/',
    VERCEL_ENV: 'production',
  }),
  'https://www.tarotitalia.com'
);

assert.equal(
  resolveSiteOrigin({
    VERCEL_ENV: 'preview',
    VERCEL_URL: 'ce-se-prova-git-abc.vercel.app',
    VERCEL_PROJECT_PRODUCTION_URL: 'ce-se-prova.vercel.app',
  }),
  '',
  'Preview builds stay path-only (do not bake vercel.app into sitemap)'
);

assert.equal(
  resolveSiteOrigin({
    NODE_ENV: 'production',
  }),
  'https://tarotitalia.com'
);

console.log('assert-sitemap-canonical-origin: ok');
