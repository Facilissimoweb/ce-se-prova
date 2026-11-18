/**
 * Coming Soon unlock — GET status, POST unlock, POST lock.
 * Bundled by scripts/bundle-api.mjs into api/coming-soon.js.
 * Keep free of firebase/pg (Hobby cold-start friendly).
 */
import {
  getComingSoonStatus,
  postComingSoonLock,
  postComingSoonUnlock,
} from '../routes/comingSoon.ts';
import {
  queryString,
  readBodyObject,
  readHeader,
  requestOrigin,
  sendJson,
  type NodeLikeReq,
  type NodeLikeRes,
} from '../nodeHttp.ts';

export const config = { runtime: 'nodejs', maxDuration: 10 };

function requestHost(req: NodeLikeReq): string {
  return (
    readHeader(req, 'x-forwarded-host') ||
    readHeader(req, 'host') ||
    'localhost'
  );
}

function subpath(req: NodeLikeReq): string {
  const fromQuery = queryString(req.query?.__path).replace(/^\/+/, '');
  if (fromQuery) return fromQuery.toLowerCase();
  const url = req.url || '';
  const pathOnly = url.split('?')[0] || '';
  const marker = '/api/coming-soon';
  const idx = pathOnly.toLowerCase().indexOf(marker);
  if (idx >= 0) {
    return pathOnly
      .slice(idx + marker.length)
      .replace(/^\/+/, '')
      .toLowerCase();
  }
  return '';
}

export default async function handler(req: NodeLikeReq, res: NodeLikeRes) {
  try {
    const method = (req.method || 'GET').toUpperCase();
    const path = subpath(req);
    const origin = requestOrigin(req);

    if (method === 'GET' && (path === '' || path === 'status')) {
      const result = await getComingSoonStatus({
        host: requestHost(req),
        cookieHeader: readHeader(req, 'cookie'),
      });
      return sendJson(res, result.status, result.body);
    }

    if (method === 'POST' && (path === '' || path === 'unlock')) {
      const body = readBodyObject(req);
      const password =
        typeof body.password === 'string' ? body.password : '';
      const result = await postComingSoonUnlock({ password, origin });
      if (result.setCookie) {
        res.setHeader('Set-Cookie', result.setCookie);
      }
      return sendJson(res, result.status, result.body);
    }

    if (method === 'POST' && path === 'lock') {
      const result = postComingSoonLock({ origin });
      if (result.setCookie) {
        res.setHeader('Set-Cookie', result.setCookie);
      }
      return sendJson(res, result.status, result.body);
    }

    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'Metodo non consentito.' });
  } catch (error) {
    console.error('api/coming-soon handler failed:', error);
    return sendJson(res, 500, {
      error: 'Internal server error',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
