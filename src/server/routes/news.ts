import type { NewsApiResponse, NewsArticle } from '../../lib/newsFeed.ts';

/** Blog feed disconnesso da Substack; risposta vuota stabile finché non arriva una nuova piattaforma. */
export type NewsRouteResult = {
  status: number;
  body: NewsApiResponse | { error: string; detail?: string };
  cacheControl?: string;
};

export async function getNewsArticles(): Promise<NewsRouteResult> {
  const articles: NewsArticle[] = [];
  return {
    status: 200,
    cacheControl: 'public, s-maxage=300, stale-while-revalidate=600',
    body: {
      source: null,
      feedUrl: null,
      fetchedAt: new Date().toISOString(),
      articles,
      status: 'placeholder',
      message: 'Nuovi articoli in arrivo',
    },
  };
}
