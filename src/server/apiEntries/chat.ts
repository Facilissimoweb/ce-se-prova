/**
 * Generic site chat (Groq) — GET status, POST message.
 * Bundled by scripts/bundle-api.mjs into api/chat.js.
 * Keep this free of firebase/pg imports (same pattern as news).
 */
import { getChatStatus, postChatMessage } from '../routes/chat.ts';
import {
  readBodyObject,
  sendJson,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../nodeHttp.ts';

export const config = { runtime: 'nodejs', maxDuration: 30 };

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();

    if (method === 'GET') {
      const result = getChatStatus();
      return sendJson(res, result.status, result.body);
    }

    if (method === 'POST') {
      const result = await postChatMessage(readBodyObject(req));
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
