import { listNewsArticlesFromBlog } from '../../lib/blogPosts.ts';
import type { NewsApiResponse } from '../../lib/newsFeed.ts';

/** Blog feed da articoli Markdown in-repo (`content/blog`). */
export type NewsRouteResult = {
  status: number;
  body: NewsApiResponse | { error: string; detail?: string };
  cacheControl?: string;
};

export async function getNewsArticles(): Promise<NewsRouteResult> {
  const articles = listNewsArticlesFromBlog();
  return {
    status: 200,
    cacheControl: 'public, s-maxage=300, stale-while-revalidate=600',
    body: {
      source: 'content/blog',
      feedUrl: null,
      fetchedAt: new Date().toISOString(),
      articles,
    },
  };
}
