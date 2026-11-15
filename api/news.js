// src/lib/substackFeed.ts
var SUBSTACK_FEED_URL = "https://tarotitalia.substack.com/feed";
var SUBSTACK_HOME_URL = "https://tarotitalia.substack.com";
function decodeEntities(raw) {
  return raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(
    /&#x([0-9a-fA-F]+);/g,
    (_, h) => String.fromCharCode(parseInt(h, 16))
  );
}
function stripHtml(html) {
  return decodeEntities(html).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function tagContent(block, tag) {
  const re = new RegExp(
    `<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`,
    "i"
  );
  const match = block.match(re);
  return match ? decodeEntities(match[1].trim()) : "";
}
function extractImage(block, descriptionHtml) {
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
function firstItemBlocks(xml) {
  const items = [];
  const re = /<item\b[\s\S]*?<\/item>/gi;
  let match;
  while ((match = re.exec(xml)) !== null) {
    items.push(match[0]);
  }
  return items;
}
function parseSubstackRss(xml) {
  return firstItemBlocks(xml).map((block, index) => {
    const title = stripHtml(tagContent(block, "title")) || "Articolo senza titolo";
    const link = tagContent(block, "link") || block.match(/<link[^>]*href=["']([^"']+)["']/i)?.[1] || SUBSTACK_HOME_URL;
    const guid = stripHtml(tagContent(block, "guid")) || link || `item-${index}`;
    const pubDate = tagContent(block, "pubDate");
    const descriptionHtml = tagContent(block, "content:encoded") || tagContent(block, "description") || "";
    const summary = stripHtml(descriptionHtml).slice(0, 280);
    const publishedAt = pubDate ? (() => {
      const d = new Date(pubDate);
      return Number.isNaN(d.getTime()) ? null : d.toISOString();
    })() : null;
    return {
      id: guid,
      title,
      link,
      publishedAt,
      summary,
      imageUrl: extractImage(block, descriptionHtml)
    };
  });
}

// src/server/routes/news.ts
var CACHE_TTL_MS = 15 * 60 * 1e3;
var memoryCache = null;
async function getNewsArticles() {
  const now = Date.now();
  if (memoryCache && now - memoryCache.at < CACHE_TTL_MS) {
    return {
      status: 200,
      cacheControl: "public, s-maxage=900, stale-while-revalidate=1800",
      body: {
        source: SUBSTACK_HOME_URL,
        feedUrl: SUBSTACK_FEED_URL,
        fetchedAt: new Date(memoryCache.at).toISOString(),
        articles: memoryCache.articles
      }
    };
  }
  try {
    const response = await fetch(SUBSTACK_FEED_URL, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "User-Agent": "TarotItaliaNews/1.0 (+https://www.tarotitalia.com)"
      }
    });
    if (!response.ok) {
      return {
        status: 502,
        body: {
          error: "Feed Substack non disponibile.",
          detail: `HTTP ${response.status}`
        }
      };
    }
    const xml = await response.text();
    const articles = parseSubstackRss(xml);
    memoryCache = { at: now, articles };
    return {
      status: 200,
      cacheControl: "public, s-maxage=900, stale-while-revalidate=1800",
      body: {
        source: SUBSTACK_HOME_URL,
        feedUrl: SUBSTACK_FEED_URL,
        fetchedAt: new Date(now).toISOString(),
        articles
      }
    };
  } catch (error) {
    if (memoryCache) {
      return {
        status: 200,
        cacheControl: "public, s-maxage=60, stale-while-revalidate=600",
        body: {
          source: SUBSTACK_HOME_URL,
          feedUrl: SUBSTACK_FEED_URL,
          fetchedAt: new Date(memoryCache.at).toISOString(),
          articles: memoryCache.articles
        }
      };
    }
    return {
      status: 502,
      body: {
        error: "Impossibile leggere il feed Substack.",
        detail: error instanceof Error ? error.message : String(error)
      }
    };
  }
}

// src/server/vercelEntry.ts
function sendJson(res, status, body) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    const withStatus = res.status(status);
    if (typeof withStatus.json === "function") {
      withStatus.json(body);
      return;
    }
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

// src/server/apiEntries/news.ts
var config = { runtime: "nodejs", maxDuration: 15 };
async function handler(req, res) {
  try {
    const method = (req.method || "GET").toUpperCase();
    if (method !== "GET") {
      res.setHeader("Allow", "GET");
      return sendJson(res, 405, { error: "Metodo non consentito." });
    }
    const result = await getNewsArticles();
    if (result.cacheControl) {
      res.setHeader("Cache-Control", result.cacheControl);
    }
    return sendJson(res, result.status, result.body);
  } catch (error) {
    console.error("api/news handler failed:", error);
    return sendJson(res, 500, {
      error: "Internal server error",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}
export {
  config,
  handler as default
};
