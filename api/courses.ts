/**
 * Courses group — GET /api/courses.
 * Lazy-imports shared server code so load failures return JSON detail, not FUNCTION_INVOCATION_FAILED.
 */
import { sendJson, type EntryReq, type EntryRes } from '../src/server/vercelEntry.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: EntryReq, res: EntryRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();

    if (method !== 'GET') {
      res.statusCode = 405;
      res.setHeader('Allow', 'GET');
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ error: 'Metodo non consentito.' }));
      return;
    }

    const adapter = await import('../src/server/vercelAdapter.ts');
    await adapter.ensureSchemaOnce();
    const { getCourses } = await import('../src/server/routes/courses.ts');
    return adapter.sendApiResult(res as never, await getCourses());
  } catch (error) {
    console.error('api/courses handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
