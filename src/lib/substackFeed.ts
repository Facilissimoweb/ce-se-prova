/** Tipi e parsing RSS pubblico di Substack (@tarotitalia). */

export const SUBSTACK_FEED_URL = 'https://tarotitalia.substack.com/feed';
export const SUBSTACK_HOME_URL = 'https://tarotitalia.substack.com';
export const SUBSTACK_PROFILE_URL = 'https://substack.com/@tarotitalia';

export type SubstackArticle = {
  id: string;
  title: string;
  link: string;
  publishedAt: string | null;
  summary: string;
  imageUrl: string | null;
};

export type NewsApiResponse = {
  source: string;
  feedUrl: string;
  fetchedAt: string;
  articles: SubstackArticle[];
};

function decodeEntities(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    );
}

export function stripHtml(html: string): string {
  return decodeEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tagContent(block: string, tag: string): string {
  const re = new RegExp(
    `<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`,
    'i'
  );
  const match = block.match(re);
  return match ? decodeEntities(match[1].trim()) : '';
}

function extractImage(block: string, descriptionHtml: string): string | null {
  const enclosure = block.match(
    /<enclosure[^>]+url=["']([^"']+)["'][^>]*>/i
  );
  if (enclosure?.[1]) return enclosure[1];

  const media = block.match(
    /<media:content[^>]+url=["']([^"']+)["'][^>]*>/i
  );
  if (media?.[1]) return media[1];

  const mediaThumb = block.match(
    /<media:thumbnail[^>]+url=["']([^"']+)["'][^>]*>/i
  );
  if (mediaThumb?.[1]) return mediaThumb[1];

  const img = descriptionHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  return img?.[1] ?? null;
}

function firstItemBlocks(xml: string): string[] {
  const items: string[] = [];
  const re = /<item\b[\s\S]*?<\/item>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml)) !== null) {
    items.push(match[0]);
  }
  return items;
}

export function parseSubstackRss(xml: string): SubstackArticle[] {
  return firstItemBlocks(xml).map((block, index) => {
    const title = stripHtml(tagContent(block, 'title')) || 'Articolo senza titolo';
    const link =
      tagContent(block, 'link') ||
      block.match(/<link[^>]*href=["']([^"']+)["']/i)?.[1] ||
      SUBSTACK_HOME_URL;
    const guid = stripHtml(tagContent(block, 'guid')) || link || `item-${index}`;
    const pubDate = tagContent(block, 'pubDate');
    const descriptionHtml =
      tagContent(block, 'content:encoded') ||
      tagContent(block, 'description') ||
      '';
    const summary = stripHtml(descriptionHtml).slice(0, 280);
    const publishedAt = pubDate
      ? (() => {
          const d = new Date(pubDate);
          return Number.isNaN(d.getTime()) ? null : d.toISOString();
        })()
      : null;

    return {
      id: guid,
      title,
      link,
      publishedAt,
      summary,
      imageUrl: extractImage(block, descriptionHtml),
    };
  });
}

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
