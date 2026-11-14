/**
 * Courses group — GET /api/courses.
 * Static imports so Vercel bundles src/ (dynamic import() of .ts is not packaged).
 */
import { getCourses } from '../src/server/routes/courses.ts';
import {
  ensureSchemaOnce,
  methodNotAllowed,
  sendApiResult,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../src/server/vercelAdapter.ts';
import { sendJson } from '../src/server/vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    if (method !== 'GET') return methodNotAllowed(res, ['GET']);

    await ensureSchemaOnce();
    return sendApiResult(res, await getCourses());
  } catch (error) {
    console.error('api/courses handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
