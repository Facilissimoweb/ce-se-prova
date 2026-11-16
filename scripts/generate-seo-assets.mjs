#!/usr/bin/env node
/**
 * ENN-62 — Generate sitemap.xml with an env-driven absolute origin.
 *
 * Origin resolution (first match wins):
 *   1. VITE_SITE_ORIGIN
 *   2. APP_URL
 *   3. https://$VERCEL_PROJECT_PRODUCTION_URL (Vercel Production builds)
 *   4. https://$VERCEL_URL (preview / other Vercel builds)
 *
 * At domain cutover (ENN-43): set VITE_SITE_ORIGIN or APP_URL to
 * https://www.tarotitalia.com (no trailing slash) and redeploy.
 *
 * Does NOT hardcode www.tarotitalia.com as the only canonical host.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

/** Public marketing pages for search / AI crawlers (skip private auth). */
const PUBLIC_URLS = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/chi-sono', changefreq: 'monthly', priority: '0.8' },
  { path: '/consulti', changefreq: 'weekly', priority: '0.9' },
  { path: '/dialogo', changefreq: 'weekly', priority: '0.7' },
  { path: '/corsi', changefreq: 'weekly', priority: '0.8' },
  { path: '/news', changefreq: 'daily', priority: '0.8' },
  { path: '/contatti', changefreq: 'monthly', priority: '0.8' },
  { path: '/prenota', changefreq: 'weekly', priority: '0.9' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.4' },
  { path: '/termini-di-servizio', changefreq: 'yearly', priority: '0.4' },
  { path: '/disclaimer', changefreq: 'yearly', priority: '0.4' },
  { path: '/sitemap', changefreq: 'monthly', priority: '0.3' },
];

function resolveSiteOrigin() {
  const candidates = [
    process.env.VITE_SITE_ORIGIN,
    process.env.APP_URL,
    process.env.VERCEL_ENV === 'production' &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
  ];

  for (const raw of candidates) {
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (!value) continue;
    try {
      return new URL(value).origin;
    } catch {
      return value.replace(/\/$/, '');
    }
  }
  return '';
}

function buildSitemap(origin) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = PUBLIC_URLS.map((entry) => {
    const loc = origin
      ? `${origin}${entry.path === '/' ? '/' : entry.path}`
      : entry.path;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  }).join('\n');

  const note = origin
    ? `<!-- Generated with origin ${origin}. Override with VITE_SITE_ORIGIN / APP_URL (cutover: https://www.tarotitalia.com). -->`
    : `<!-- Generated without absolute origin (local / missing env). Locs are path-only; Vercel builds inject VERCEL_URL. At cutover set VITE_SITE_ORIGIN=https://www.tarotitalia.com. -->`;

  return `<?xml version="1.0" encoding="UTF-8"?>
${note}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function generateSeoAssets({ outDir = publicDir } = {}) {
  fs.mkdirSync(outDir, { recursive: true });
  const origin = resolveSiteOrigin();
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, buildSitemap(origin), 'utf8');
  return { origin, sitemapPath };
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const result = generateSeoAssets();
  console.log(
    `[seo] wrote ${path.relative(root, result.sitemapPath)} (origin=${result.origin || 'path-only'})`
  );
}
