/**
 * In-repo Blog posts (ENN-82 / ENN-84). Compiled from content/blog/*.{md,mdx}.
 */
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  type BlogCategory,
  type BlogPostRecord,
} from '../data/blogPosts.generated.ts';
import { pathForBlogPost } from './appPaths.ts';
import type { NewsArticle } from './newsFeed.ts';

export type BlogPost = BlogPostRecord;
export type { BlogCategory };
export { BLOG_CATEGORIES };

export function listPublishedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => !post.draft);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const normalized = slug.trim().toLowerCase();
  return listPublishedBlogPosts().find(
    (post) => post.slug.toLowerCase() === normalized
  );
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
