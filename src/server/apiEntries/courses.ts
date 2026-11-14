/**
 * Courses group — GET /api/courses.
 * Intentionally avoids vercelAdapter/firebase-admin so cold start stays light.
 * Bundled by scripts/bundle-api.mjs into api/courses.js.
 */
import { getCourses } from '../routes/courses.ts';
import { sendJson } from '../vercelEntry.ts';
import type { NodeLikeReq, NodeLikeRes } from '../nodeHttp.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    if (method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return sendJson(res, 405, { error: 'Metodo non consentito.' });
    }

    const result = await getCourses();
    return sendJson(res, result.status, result.body);
  } catch (error) {
    console.error('api/courses handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
