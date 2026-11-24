#!/usr/bin/env node
/**
 * ENN-62 / ENN-198 — Generate sitemap.xml with a brand-safe absolute origin.
 *
 * Origin resolution (first usable match wins):
 *   1. VITE_SITE_ORIGIN / SITE_ORIGIN / APP_URL / SITE_URL
 *      — ignored when the value is a *.vercel.app host
 *   2. Production builds (VERCEL_ENV=production or NODE_ENV=production):
 *      https://tarotitalia.com (never VERCEL_PROJECT_PRODUCTION_URL /
 *      VERCEL_URL, which stay on the default *.vercel.app project host)
 *   3. Preview / local: path-only locs (empty origin)
 *
 * Vercel Production env (recommended):
 *   APP_URL=https://tarotitalia.com
 *   VITE_SITE_ORIGIN=https://tarotitalia.com
 * Both Production-scoped. Do not point them at ce-se-prova.vercel.app.
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

/** Canonical public origin for Production sitemap / robots (ENN-198). */
export const PRODUCTION_SITE_ORIGIN = 'https://tarotitalia.com';

export function isVercelAppHost(value) {
  if (!value || typeof value !== 'string') return false;
  const raw = value.trim();
  if (!raw) return false;
  try {
    const host = new URL(raw.includes('://') ? raw : `https://${raw}`)
      .hostname
      .toLowerCase();
    return host === 'vercel.app' || host.endsWith('.vercel.app');
  } catch {
    return /\.vercel\.app$/i.test(raw.replace(/\/$/, ''));
  }
}

function parseOrigin(raw) {
  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) return '';
  try {
    return new URL(value).origin;
  } catch {
    return value.replace(/\/$/, '');
  }
}

/**
 * Resolve the absolute origin used in sitemap `<loc>` values.
 * Never returns a *.vercel.app host for production SEO assets.
 */
export function resolveSiteOrigin(env = process.env) {
  const candidates = [
    env.VITE_SITE_ORIGIN,
    env.SITE_ORIGIN,
    env.APP_URL,
    env.SITE_URL,
  ];

  for (const raw of candidates) {
    const origin = parseOrigin(raw);
    if (!origin) continue;
    if (isVercelAppHost(origin)) continue;
    return origin;
  }

  if (
    env.VERCEL_ENV === 'production' ||
    env.NODE_ENV === 'production'
  ) {
    return PRODUCTION_SITE_ORIGIN;
  }

  // Preview / local: leave locs path-only so preview hosts do not pollute
  // a committed or production-served sitemap. Do not use VERCEL_URL /
  // VERCEL_PROJECT_PRODUCTION_URL (default project *.vercel.app).
  return '';
}

/** Match `scripts/build-blog.mjs` slugFromFilename (ENN-251). */
function slugFromBlogFilename(filename) {
  return filename
    .replace(/\.(md|mdx)$/i, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

function loadBlogPostPaths() {
  const blogDir = path.join(root, 'content', 'blog');
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter(
      (name) =>
        /\.(md|mdx)$/i.test(name) && !/^readme\.(md|mdx)$/i.test(name)
    )
    .map((name) => {
      const raw = fs.readFileSync(path.join(blogDir, name), 'utf8');
      if (/^draft:\s*true\b/m.test(raw.replace(/^\uFEFF/, ''))) return null;
      const slug = slugFromBlogFilename(name);
      // Encode path segments so spaces / unicode never break <loc> XML.
      const encoded = slug
        .split('/')
        .map((part) => encodeURIComponent(part))
        .join('/');
      return {
        path: `/news/${encoded}`,
        changefreq: 'monthly',
        priority: '0.6',
      };
    })
    .filter(Boolean);
}

function buildSitemap(origin) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [...PUBLIC_URLS, ...loadBlogPostPaths()];
  const urls = entries.map((entry) => {
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
    ? `<!-- Generated with origin ${origin}. Override with VITE_SITE_ORIGIN / APP_URL=https://tarotitalia.com (never *.vercel.app). -->`
    : `<!-- Generated without absolute origin (local / preview). Locs are path-only. Production builds default to ${PRODUCTION_SITE_ORIGIN}. -->`;

  return `<?xml version="1.0" encoding="UTF-8"?>
${note}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots(origin) {
  const sitemapLine = origin
    ? `Sitemap: ${origin}/sitemap.xml`
    : 'Sitemap: /sitemap.xml';

  return `# Tarot Italia — ENN-62 / ENN-191 / ENN-198
# Allow public marketing pages for search engines and reputable AI crawlers.
# Production sitemap locs use ${PRODUCTION_SITE_ORIGIN} (never *.vercel.app).
# Launch: Italian-only public offer; Maggiori on /corsi; Minori/Metodi not public routes.
# AI notes: /llms.txt, /llms-full.txt, /.well-known/llms.txt

User-agent: *
Allow: /
Disallow: /api/
Disallow: /area-riservata

# OpenAI
User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /area-riservata

# Anthropic
User-agent: ClaudeBot
Allow: /
Disallow: /api/
Disallow: /area-riservata

User-agent: anthropic-ai
Allow: /
Disallow: /api/
Disallow: /area-riservata

# Google Gemini / AI Overviews training signal
User-agent: Google-Extended
Allow: /
Disallow: /api/
Disallow: /area-riservata

# Perplexity
User-agent: PerplexityBot
Allow: /
Disallow: /api/
Disallow: /area-riservata

# Apple Intelligence / Applebot extended
User-agent: Applebot-Extended
Allow: /
Disallow: /api/
Disallow: /area-riservata

${sitemapLine}
`;
}

export function generateSeoAssets({ outDir = publicDir, env = process.env } = {}) {
  fs.mkdirSync(outDir, { recursive: true });
  const origin = resolveSiteOrigin(env);
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  const robotsPath = path.join(outDir, 'robots.txt');
  fs.writeFileSync(sitemapPath, buildSitemap(origin), 'utf8');
  fs.writeFileSync(robotsPath, buildRobots(origin), 'utf8');
  return { origin, sitemapPath, robotsPath };
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);
if (isDirectRun) {
  // When regenerating committed public/ assets locally, prefer production
  // canonical unless an explicit non-vercel origin is already in the env.
  const env = { ...process.env };
  if (!resolveSiteOrigin(env)) {
    env.NODE_ENV = env.NODE_ENV || 'production';
  }
  const result = generateSeoAssets({ env });
  console.log(
    `[seo] wrote ${path.relative(root, result.sitemapPath)} + robots.txt (origin=${result.origin || 'path-only'})`
  );
}
