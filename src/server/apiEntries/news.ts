/**
 * News group — GET /api/news (articoli da content/blog via blogPosts.generated).
 * Bundled by scripts/bundle-api.mjs into api/news.js.
 */
import { getNewsArticles } from '../routes/news.ts';
import { sendJson } from '../vercelEntry.ts';
import type { NodeLikeReq, NodeLikeRes } from '../nodeHttp.ts';

export const config = { runtime: 'nodejs', maxDuration: 15 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    if (method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return sendJson(res, 405, { error: 'Metodo non consentito.' });
    }

    const result = await getNewsArticles();
    if (result.cacheControl) {
      res.setHeader('Cache-Control', result.cacheControl);
    }
    return sendJson(res, result.status, result.body);
  } catch (error) {
    console.error('api/news handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
