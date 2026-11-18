#!/usr/bin/env node
/**
 * ENN-82 / ENN-84 — Compile content/blog/*.{md,mdx} → src/data/blogPosts.generated.ts
 * Shared by the Vite SPA and the bundled GET /api/news handler.
 *
 * Frontmatter: title, date, description, draft, cover?, category?, tags[]?
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content', 'blog');
const outFile = path.join(root, 'src', 'data', 'blogPosts.generated.ts');

/** Canonical macro areas (ENN-84). */
export const BLOG_CATEGORIES = [
  'Storia',
  'Autori',
  'A. Maggiori',
  'A. Minori',
];

/**
 * @param {string} raw
 * @returns {{ data: Record<string, string | boolean | string[]>; body: string }}
 */
function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, '');
  if (!normalized.startsWith('---')) {
    return { data: {}, body: normalized.trim() };
  }
  const end = normalized.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, body: normalized.trim() };
  }
  const fmBlock = normalized.slice(3, end).trim();
  const body = normalized.slice(end + 4).replace(/^\s*\n/, '');
  /** @type {Record<string, string | boolean | string[]>} */
  const data = {};
  const lines = fmBlock.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colon = trimmed.indexOf(':');
    if (colon === -1) continue;
    const key = trimmed.slice(0, colon).trim();
    let value = trimmed.slice(colon + 1).trim();

    // YAML list: `tags:` then indented `- item` lines
    if (!value && key === 'tags') {
      /** @type {string[]} */
      const items = [];
      while (i + 1 < lines.length) {
        const next = lines[i + 1];
        const listMatch = next.match(/^\s+-\s+(.+)$/);
        if (!listMatch) break;
        i += 1;
        let item = listMatch[1].trim();
        if (
          (item.startsWith('"') && item.endsWith('"')) ||
          (item.startsWith("'") && item.endsWith("'"))
        ) {
          item = item.slice(1, -1);
        }
        if (item) items.push(item);
      }
      data[key] = items;
      continue;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Inline list: tags: [a, b] or tags: a, b
    if (key === 'tags') {
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
      }
      data[key] = value
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      continue;
    }

    if (value === 'true' || value === 'false') {
      data[key] = value === 'true';
      continue;
    }
    data[key] = value;
  }
  return { data, body: body.trim() };
}

function slugFromFilename(filename) {
  return filename.replace(/\.(md|mdx)$/i, '');
}

function toIsoDate(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const raw = value.trim();
  const d = new Date(raw.includes('T') ? raw : `${raw}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

/**
 * Normalize category to one of the four macro areas when possible.
 * @param {unknown} value
 * @returns {string | null}
 */
function normalizeCategory(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const raw = value.trim();
  const aliases = {
    storia: 'Storia',
    autori: 'Autori',
    'a. maggiori': 'A. Maggiori',
    'arcani maggiori': 'A. Maggiori',
    maggiori: 'A. Maggiori',
    'a. minori': 'A. Minori',
    'arcani minori': 'A. Minori',
    minori: 'A. Minori',
  };
  const lower = raw.toLowerCase();
  if (aliases[lower]) return aliases[lower];
  if (BLOG_CATEGORIES.includes(raw)) return raw;
  return raw;
}

function loadPosts() {
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  const files = fs
    .readdirSync(contentDir)
    .filter(
      (name) =>
        /\.(md|mdx)$/i.test(name) && !/^readme\.(md|mdx)$/i.test(name)
    )
    .sort();

  /** @type {Array<Record<string, unknown>>} */
  const posts = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const { data, body } = parseFrontmatter(raw);
    const draft = data.draft === true;
    const title =
      typeof data.title === 'string' && data.title.trim()
        ? data.title.trim()
        : slugFromFilename(file);
    const description =
      typeof data.description === 'string' ? data.description.trim() : '';
    const cover =
      typeof data.cover === 'string' && data.cover.trim()
        ? data.cover.trim()
        : null;
    const category = normalizeCategory(data.category);
    const tags = Array.isArray(data.tags)
      ? data.tags.filter((t) => typeof t === 'string' && t.trim()).map((t) => t.trim())
      : [];
    const slug = slugFromFilename(file);
    const publishedAt = toIsoDate(
      typeof data.date === 'string' ? data.date : ''
    );
    posts.push({
      id: slug,
      slug,
      title,
      description,
      cover,
      draft,
      publishedAt,
      category,
      tags,
      body,
      sourceFile: `content/blog/${file}`,
    });
  }

  posts.sort((a, b) => {
    const aTime = a.publishedAt ? Date.parse(/** @type {string} */ (a.publishedAt)) : 0;
    const bTime = b.publishedAt ? Date.parse(/** @type {string} */ (b.publishedAt)) : 0;
    return bTime - aTime;
  });

  return posts;
}

export function buildBlogPosts() {
  const posts = loadPosts();
  const header = `/**
 * AUTO-GENERATED by scripts/build-blog.mjs — do not edit by hand.
 * Source: content/blog/*.{md,mdx}
 */
`;

  const body = `${header}export type BlogPostRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string | null;
  draft: boolean;
  publishedAt: string | null;
  category: string | null;
  tags: string[];
  body: string;
  sourceFile: string;
};

export const BLOG_CATEGORIES = ${JSON.stringify(BLOG_CATEGORIES, null, 2)} as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPostRecord[] = ${JSON.stringify(posts, null, 2)};
`;

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, body, 'utf8');
  return { outFile, count: posts.length, published: posts.filter((p) => !p.draft).length };
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const result = buildBlogPosts();
  console.log(
    `[blog] ${result.published}/${result.count} post(s) → ${path.relative(root, result.outFile)}`
  );
}
