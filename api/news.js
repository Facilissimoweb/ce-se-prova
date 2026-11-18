// src/data/blogPosts.generated.ts
var BLOG_POSTS = [
  {
    "id": "benvenuto-nel-blog",
    "slug": "benvenuto-nel-blog",
    "title": "Benvenuto nel Blog di Tarot Italia",
    "description": "Un piccolo scritto di prova per presentare il nuovo Blog ospitato sul sito \u2014 Maria pu\xF2 sostituirlo con i suoi articoli.",
    "cover": null,
    "draft": false,
    "publishedAt": "2026-11-18T12:00:00.000Z",
    "body": "Questo \xE8 un **articolo di esempio**. Serve solo a mostrare come funziona il Blog sul sito: niente Substack, solo file nel repository.\n\nQuando Maria Teresa pubblica un nuovo pezzo, basta aggiungere (o sostituire) un file Markdown in `content/blog/`, compilare il frontmatter e fare deploy. Questo testo pu\xF2 sparire quando arriva il primo articolo \xABvero\xBB.\n\n## Cosa troverai qui\n\n- Riflessioni su tarologia e simboli\n- Note sul percorso evolutivo\n- Aggiornamenti dalla pratica di Tarot Italia\n\nGrazie per essere passata di qui. Torna presto: lo spazio si riempir\xE0 degli scritti di Maria Teresa.",
    "sourceFile": "content/blog/benvenuto-nel-blog.md"
  },
  {
    "id": "ascoltare-gli-arcani",
    "slug": "ascoltare-gli-arcani",
    "title": "Ascoltare gli Arcani senza fretta",
    "description": "Secondo articolo di esempio \u2014 una nota breve sulla lettura lenta dei Tarocchi. Sostituibile liberamente.",
    "cover": null,
    "draft": false,
    "publishedAt": "2026-11-17T12:00:00.000Z",
    "body": "Secondo **campione** del Blog in-repo. Puoi cancellarlo o riscriverlo interamente: non \xE8 contenuto ufficiale definitivo.\n\nNella lettura, la fretta chiude lo spazio in cui il simbolo parla. Meglio una domanda chiara, un mazzo ordinato e qualche minuto di silenzio prima di girare le carte.\n\n### Una pratica semplice\n\n1. Scrivi la domanda in una frase.\n2. Respira tre volte.\n3. Estrai solo le carte necessarie \u2014 non di pi\xF9.\n\nIl Blog ospiter\xE0 pezzi come questo, pubblicati con un commit. Nessuna piattaforma esterna da sincronizzare.",
    "sourceFile": "content/blog/ascoltare-gli-arcani.md"
  }
];

// src/lib/appPaths.ts
function pathForBlogPost(slug) {
  return `/news/${encodeURIComponent(slug)}`;
}

// src/lib/blogPosts.ts
function listPublishedBlogPosts() {
  return BLOG_POSTS.filter((post) => !post.draft);
}
function blogPostToNewsArticle(post) {
  return {
    id: post.id,
    title: post.title,
    link: pathForBlogPost(post.slug),
    publishedAt: post.publishedAt,
    summary: post.description,
    imageUrl: post.cover
  };
}
function listNewsArticlesFromBlog() {
  return listPublishedBlogPosts().map(blogPostToNewsArticle);
}

// src/server/routes/news.ts
async function getNewsArticles() {
  const articles = listNewsArticlesFromBlog();
  return {
    status: 200,
    cacheControl: "public, s-maxage=300, stale-while-revalidate=600",
    body: {
      source: "content/blog",
      feedUrl: null,
      fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
      articles
    }
  };
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
