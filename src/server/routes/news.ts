import {
  parseSubstackRss,
  SUBSTACK_FEED_URL,
  SUBSTACK_HOME_URL,
  type NewsApiResponse,
  type SubstackArticle,
} from '../../lib/substackFeed.ts';

const CACHE_TTL_MS = 15 * 60 * 1000;

type CacheEntry = {
  at: number;
  articles: SubstackArticle[];
};

let memoryCache: CacheEntry | null = null;

export type NewsRouteResult = {
  status: number;
  body: NewsApiResponse | { error: string; detail?: string };
  cacheControl?: string;
};

export async function getNewsArticles(): Promise<NewsRouteResult> {
  const now = Date.now();
  if (memoryCache && now - memoryCache.at < CACHE_TTL_MS) {
    return {
      status: 200,
      cacheControl: 'public, s-maxage=900, stale-while-revalidate=1800',
      body: {
        source: SUBSTACK_HOME_URL,
        feedUrl: SUBSTACK_FEED_URL,
        fetchedAt: new Date(memoryCache.at).toISOString(),
        articles: memoryCache.articles,
      },
    };
  }

  try {
    const response = await fetch(SUBSTACK_FEED_URL, {
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
        'User-Agent': 'TarotItaliaNews/1.0 (+https://www.tarotitalia.com)',
      },
    });

    if (!response.ok) {
      return {
        status: 502,
        body: {
          error: 'Feed Substack non disponibile.',
          detail: `HTTP ${response.status}`,
        },
      };
    }

    const xml = await response.text();
    const articles = parseSubstackRss(xml);
    memoryCache = { at: now, articles };

    return {
      status: 200,
      cacheControl: 'public, s-maxage=900, stale-while-revalidate=1800',
      body: {
        source: SUBSTACK_HOME_URL,
        feedUrl: SUBSTACK_FEED_URL,
        fetchedAt: new Date(now).toISOString(),
        articles,
      },
    };
  } catch (error) {
    if (memoryCache) {
      return {
        status: 200,
        cacheControl: 'public, s-maxage=60, stale-while-revalidate=600',
        body: {
          source: SUBSTACK_HOME_URL,
          feedUrl: SUBSTACK_FEED_URL,
          fetchedAt: new Date(memoryCache.at).toISOString(),
          articles: memoryCache.articles,
        },
      };
    }

    return {
      status: 502,
      body: {
        error: 'Impossibile leggere il feed Substack.',
        detail: error instanceof Error ? error.message : String(error),
      },
    };
  }
}
