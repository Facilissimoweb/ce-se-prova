/**
 * ENN-233 — Compile compact Nina Studio blog knowledge FROM published posts
 * (content/blog → blogPosts.generated.ts → ninaBlogPosts.generated.ts).
 *
 * Rules:
 * - draft:false only
 * - gated Maggiori bodies included (Studio unlock = Maggiori entitlement)
 * - compact bodies + catalog index (no full-article dump / no RAG)
 *
 * Run after build:blog. Also invoked from scripts/bundle-api.mjs before chat bundle.
 * Rebuild: npx tsx scripts/build-nina-blog-pack.ts
 */

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { BLOG_POSTS } from '../src/data/blogPosts.generated.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outFile = path.join(root, 'src/data/ninaBlogPosts.generated.ts');

/** Soft cap — denser than Maggiori cards; keep max-2 inject under Groq 413. */
const MAX_BODY_CHARS = 1000;

/** Stop-words / short tokens skipped when building aliases from titles. */
const ALIAS_STOP = new Set([
  'il',
  'lo',
  'la',
  'i',
  'gli',
  'le',
  'un',
  'uno',
  'una',
  'di',
  'da',
  'del',
  'della',
  'dei',
  'delle',
  'e',
  'ed',
  'a',
  'al',
  'alla',
  'ai',
  'alle',
  'in',
  'su',
  'per',
  'con',
  'tra',
  'fra',
  'che',
  'come',
  'piu',
  'più',
  'the',
  'of',
  'and',
  'or',
  'to',
  'a',
]);

function normalizeAlias(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/['’]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function clipBody(body: string): string {
  const compact = body.replace(/\s+/g, ' ').trim();
  if (compact.length <= MAX_BODY_CHARS) return compact;
  return `${compact.slice(0, MAX_BODY_CHARS - 1).trimEnd()}…`;
}

/** Prefer didactic meat: gated body when present, else full public body. */
function sourceMarkdown(post: (typeof BLOG_POSTS)[number]): string {
  if (post.gated && post.gatedBody?.trim()) {
    return `${post.teaserBody || ''}\n\n${post.gatedBody}`.trim();
  }
  return (post.body || post.teaserBody || '').trim();
}

/**
 * Compact extract: keep headings + first bullets / sentences; strip CTA noise.
 */
function compactArticleBody(md: string, description: string): string {
  const cleaned = md
    .replace(/<!--\s*gated\s*-->/gi, '\n')
    .replace(/\[[^\]]+\]\([^)]+\)/g, (m) => {
      const label = m.match(/^\[([^\]]+)\]/)?.[1] ?? '';
      return label;
    })
    .replace(/^>\s?/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const chunks: string[] = [];
  if (description.trim()) {
    chunks.push(description.trim());
  }

  // Prefer ## / ### sections with a short excerpt each.
  const sections = cleaned.split(/\n(?=##\s+)/);
  for (const section of sections) {
    const lines = section
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;
    const heading = lines[0].replace(/^#+\s*/, '').trim();
    const rest = lines
      .slice(1)
      .filter((l) => !/^#{1,6}\s/.test(l))
      .slice(0, 6)
      .join(' ');
    if (heading && rest) {
      chunks.push(`**${heading}**: ${rest}`);
    } else if (rest) {
      chunks.push(rest);
    } else if (heading && sections.length === 1) {
      // Single block without ## — take opening paragraphs.
      chunks.push(section.replace(/^#+\s*[^\n]*\n?/, '').trim());
    }
    if (chunks.join(' ').length > MAX_BODY_CHARS + 200) break;
  }

  if (chunks.length === 0) {
    chunks.push(cleaned.slice(0, MAX_BODY_CHARS));
  }

  return clipBody(chunks.join('\n'));
}

function buildAliases(post: (typeof BLOG_POSTS)[number]): string[] {
  const out = new Set<string>();
  const slugNorm = normalizeAlias(post.slug.replace(/-/g, ' '));
  if (slugNorm) out.add(slugNorm);
  // kebab form without spaces (URL-ish)
  const kebab = normalizeAlias(post.slug).replace(/\s+/g, '-');
  if (kebab.length >= 4) out.add(kebab);

  for (const tag of post.tags) {
    const n = normalizeAlias(tag);
    if (n.length >= 3) out.add(n);
  }

  if (post.category) {
    const cat = normalizeAlias(post.category);
    if (cat.length >= 3) out.add(cat);
  }

  // Significant title tokens + multi-word title phrases.
  const titleNorm = normalizeAlias(post.title);
  if (titleNorm) {
    const words = titleNorm.split(' ').filter((w) => w.length >= 4 && !ALIAS_STOP.has(w));
    for (const w of words.slice(0, 8)) out.add(w);
    // First meaningful bigrams
    for (let i = 0; i < Math.min(words.length - 1, 5); i += 1) {
      out.add(`${words[i]} ${words[i + 1]}`);
    }
  }

  // Common arcana / author cues from slug
  if (/matto/.test(slugNorm)) {
    out.add('matto');
    out.add('il matto');
  }
  if (/bagatto/.test(slugNorm)) {
    out.add('bagatto');
    out.add('il bagatto');
    out.add('mago');
  }
  if (/giustizia/.test(slugNorm) || /giustizia/.test(titleNorm)) {
    out.add('giustizia');
    out.add('la giustizia');
  }
  if (/pamela|colman|pixie/.test(slugNorm) || /pamela|colman|pixie/.test(titleNorm)) {
    out.add('pamela');
    out.add('pamela colman smith');
    out.add('pixie');
    out.add('colman smith');
  }
  if (/rider|waite/.test(slugNorm) || /rider|waite/.test(titleNorm)) {
    out.add('rider waite');
    out.add('rider-waite-smith');
    out.add('waite');
  }

  return [...out];
}

function citePath(slug: string): string {
  // Preserve generated slug as-is for path (SPA already resolves).
  return `/news/${slug}`;
}

function main() {
  const published = BLOG_POSTS.filter((p) => !p.draft);
  if (published.length === 0) {
    console.warn('[nina-blog] No published (draft:false) posts — empty pack.');
  }

  const posts = published.map((post) => {
    const md = sourceMarkdown(post);
    const body = compactArticleBody(md, post.description || '');
    return {
      id: post.slug,
      slug: post.slug,
      title: post.title,
      category: post.category,
      tags: post.tags,
      gated: post.gated,
      aliases: buildAliases(post),
      summary: clipBody(post.description || post.title).slice(0, 220),
      body,
      cite: citePath(post.slug),
    };
  });

  // Stable order: newest first if dates exist in source order (generated already sorts).
  const catalog = posts.map((p) => ({
    title: p.title,
    category: p.category,
    gated: p.gated,
    cite: p.cite,
    summary: p.summary,
  }));

  const file = `/**
 * GENERATED by scripts/build-nina-blog-pack.ts — do not edit by hand.
 * ENN-233: compact Nina Studio blog knowledge from content/blog (draft:false only).
 * Gated Maggiori bodies included (Studio = Maggiori entitlement).
 * Rebuild: npm run build:blog && npx tsx scripts/build-nina-blog-pack.ts
 * (also via npm run build:api / Vercel build)
 */

export type NinaBlogPostGenerated = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  tags: string[];
  gated: boolean;
  aliases: string[];
  summary: string;
  body: string;
  cite: string;
};

export type NinaBlogCatalogEntry = {
  title: string;
  category: string | null;
  gated: boolean;
  cite: string;
  summary: string;
};

export const NINA_BLOG_CATALOG: readonly NinaBlogCatalogEntry[] = ${JSON.stringify(
    catalog,
    null,
    2
  )};

export const NINA_BLOG_POSTS_GENERATED: readonly NinaBlogPostGenerated[] = ${JSON.stringify(
    posts,
    null,
    2
  )};
`;

  writeFileSync(outFile, file, 'utf8');
  console.log(
    `Wrote ${posts.length} Nina blog pack post(s) → ${path.relative(root, outFile)}`
  );
}

main();
