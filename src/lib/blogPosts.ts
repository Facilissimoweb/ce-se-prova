/**
 * In-repo Blog posts (ENN-82 / ENN-84 / ENN-131 / ENN-132). Compiled from content/blog/*.{md,mdx}.
 */
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  type BlogCategory,
  type BlogPostRecord,
} from '../data/blogPosts.generated.ts';
import { resolveMaggioriModulo01BlogSlug } from '../data/maggioriGatedBlog.ts';
import type { CourseId } from '../types/handoff.ts';
import { pathForBlogPost } from './appPaths.ts';
import type { NewsArticle } from './newsFeed.ts';

export type BlogPost = BlogPostRecord;
export type { BlogCategory };
export { BLOG_CATEGORIES };

export function listPublishedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => !post.draft);
}

/** ENN-251 — former spaced filename for La Giustizia article. */
const GIUSTIZIA_LEGACY_SLUGS = [
  'giustizia articolo',
  'giustizia-articolo',
  'Giustizia Articolo',
] as const;

const GIUSTIZIA_BLOG_SLUG = 'la-giustizia-equilibrio-e-numerazione';

/** Resolve legacy Modulo 01 promo slug → current Matto article (ENN-132). */
export function resolveBlogSlug(slug: string): string {
  const trimmed = slug.trim();
  const spaced = trimmed.replace(/-/g, ' ').toLowerCase();
  const kebab = trimmed.replace(/\s+/g, '-').toLowerCase();
  if (
    (GIUSTIZIA_LEGACY_SLUGS as readonly string[]).some(
      (legacy) =>
        legacy.toLowerCase() === trimmed.toLowerCase() ||
        legacy.toLowerCase() === spaced ||
        legacy.toLowerCase() === kebab
    )
  ) {
    return GIUSTIZIA_BLOG_SLUG;
  }
  return resolveMaggioriModulo01BlogSlug(slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const normalized = resolveBlogSlug(slug);
  return listPublishedBlogPosts().find(
    (post) => post.slug.toLowerCase() === normalized.toLowerCase()
  );
}

/** Course required to unlock gated body (ENN-131). */
export function blogPostRequiresCourse(post: BlogPost): CourseId | null {
  if (!post.gated || !post.requiresCourse) return null;
  return post.requiresCourse as CourseId;
}

/** Public markdown always visible (SEO teaser). */
export function blogPostTeaserMarkdown(post: BlogPost): string {
  return post.teaserBody || post.body;
}

/** Locked markdown for Maggiori (or other course) owners. */
export function blogPostGatedMarkdown(post: BlogPost): string | null {
  if (!post.gated) return null;
  return post.gatedBody;
}

export function filterBlogPosts(options: {
  category?: string | null;
  tag?: string | null;
}): BlogPost[] {
  const category = options.category?.trim() || null;
  const tag = options.tag?.trim().toLowerCase() || null;
  return listPublishedBlogPosts().filter((post) => {
    if (category && post.category !== category) return false;
    if (tag) {
      const hasTag = post.tags.some((t) => t.toLowerCase() === tag);
      if (!hasTag) return false;
    }
    return true;
  });
}

export function blogPostToNewsArticle(post: BlogPost): NewsArticle {
  return {
    id: post.id,
    title: post.title,
    link: pathForBlogPost(post.slug),
    publishedAt: post.publishedAt,
    summary: post.description,
    imageUrl: post.cover,
    category: post.category,
    tags: post.tags,
  };
}

export function listNewsArticlesFromBlog(): NewsArticle[] {
  return listPublishedBlogPosts().map(blogPostToNewsArticle);
}
