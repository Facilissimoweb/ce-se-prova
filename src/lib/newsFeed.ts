/** Tipi e client per GET /api/news (articoli Blog). Fonte esterna disconnessa. */

export type NewsArticle = {
  id: string;
  title: string;
  link: string;
  publishedAt: string | null;
  summary: string;
  imageUrl: string | null;
};

export type NewsApiResponse = {
  source: string | null;
  feedUrl: string | null;
  fetchedAt: string;
  articles: NewsArticle[];
  status?: 'placeholder';
  message?: string;
};

export function formatArticleDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}

export async function fetchNewsArticles(
  signal?: AbortSignal
): Promise<NewsApiResponse> {
  const res = await fetch('/api/news', { signal });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(
      detail || `Impossibile caricare gli articoli (${res.status}).`
    );
  }
  return (await res.json()) as NewsApiResponse;
}
