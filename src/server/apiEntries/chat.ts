/**
 * Generic site chat (Groq) — GET status, POST message.
 * Bundled by scripts/bundle-api.mjs into api/chat.js.
 *
 * ENN-137: welcome mode stays light; studio mode verifies Maggiori purchase
 * via Bearer + course_purchases (firebase-admin / pg stay external).
 * Auth is only exercised on studio POSTs — welcome path does not call Firebase.
 */
import { getChatStatus, postChatMessage } from '../routes/chat.ts';
import {
  readBodyObject,
  sendJson,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../nodeHttp.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

function readAuthorization(req: NodeLikeReq): string | undefined {
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (key.toLowerCase() !== 'authorization') continue;
    const raw = Array.isArray(value) ? value[0] : value;
    const trimmed = raw?.trim();
    return trimmed || undefined;
  }
  return undefined;
}

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();

    if (method === 'GET') {
      const result = getChatStatus();
      return sendJson(res, result.status, result.body);
    }

    if (method === 'POST') {
      const result = await postChatMessage({
        body: readBodyObject(req),
        authorization: readAuthorization(req),
      });
      return sendJson(res, result.status, result.body);
    }

    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'Metodo non consentito.' });
  } catch (error) {
    console.error('api/chat handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
