/**
 * In-repo Blog posts (ENN-82). Compiled from content/blog/*.{md,mdx}.
 */
import {
  BLOG_POSTS,
  type BlogPostRecord,
} from '../data/blogPosts.generated.ts';
import { pathForBlogPost } from './appPaths.ts';
import type { NewsArticle } from './newsFeed.ts';

export type BlogPost = BlogPostRecord;

export function listPublishedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => !post.draft);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const normalized = slug.trim().toLowerCase();
  return listPublishedBlogPosts().find(
    (post) => post.slug.toLowerCase() === normalized
  );
}

export function blogPostToNewsArticle(post: BlogPost): NewsArticle {
  return {
    id: post.id,
    title: post.title,
    link: pathForBlogPost(post.slug),
    publishedAt: post.publishedAt,
    summary: post.description,
    imageUrl: post.cover,
  };
}

export function listNewsArticlesFromBlog(): NewsArticle[] {
  return listPublishedBlogPosts().map(blogPostToNewsArticle);
}
