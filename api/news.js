// src/server/routes/news.ts
async function getNewsArticles() {
  const articles = [];
  return {
    status: 200,
    cacheControl: "public, s-maxage=300, stale-while-revalidate=600",
    body: {
      source: null,
      feedUrl: null,
      fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
      articles,
      status: "placeholder",
      message: "Nuovi articoli in arrivo"
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
