/**
 * Express Coming Soon gate (local `npm run dev` / `npm start`).
 * Mirrors Vercel Routing `middleware.ts` so Maria can test unlock without deploying.
 */
import fs from 'fs';
import path from 'path';
import type { NextFunction, Request, Response } from 'express';
import {
  buildUnlockSetCookieHeader,
  createUnlockToken,
  isComingSoonActiveForHost,
  isComingSoonAllowlistedPath,
  isComingSoonSecretPath,
  isValidUnlockCookie,
  readComingSoonEnv,
  readComingSoonLinkToken,
  verifyComingSoonUnlockLinkToken,
} from '../lib/comingSoon.ts';

function sendComingSoonHtml(
  res: Response,
  htmlPath: string,
  unlock: boolean
): void {
  fs.readFile(htmlPath, 'utf8', (err, html) => {
    if (err) {
      res
        .status(503)
        .type('text/plain')
        .send('Coming Soon temporaneamente non disponibile.');
      return;
    }
    let body = html;
    if (unlock) {
      // Ensure unlock form shows even without client JS (?mode= / rewrite).
      body = body.replace(
        /<body([^>]*)>/i,
        '<body$1 class="is-unlock" data-coming-soon-mode="unlock">'
      );
      body = body.replace(
        /(<div\s+class="unlock-panel"[^>]*?)\s+hidden([^>]*>)/i,
        '$1$2'
      );
    }
    res.status(200).type('html').send(body);
  });
}

/**
 * @param comingSoonHtmlPath Absolute path to public/coming-soon.html (dev) or dist copy (prod).
 */
export function createComingSoonGate(comingSoonHtmlPath: string) {
  return async function comingSoonGate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const env = readComingSoonEnv();
    const host =
      (req.headers['x-forwarded-host'] as string | undefined) ||
      req.headers.host ||
      'localhost';

    if (!isComingSoonActiveForHost(host, env)) {
      return next();
    }

    const pathname = req.path || '/';
    if (isComingSoonAllowlistedPath(pathname)) {
      return next();
    }

    if (await isValidUnlockCookie(req.headers.cookie, env)) {
      return next();
    }

    if (!fs.existsSync(comingSoonHtmlPath)) {
      console.error('Coming Soon HTML missing:', comingSoonHtmlPath);
      return res
        .status(503)
        .type('text/plain')
        .send('Coming Soon non configurato (manca coming-soon.html).');
    }

    if (isComingSoonSecretPath(pathname, env)) {
      const linkToken = readComingSoonLinkToken(
        new URL(req.originalUrl || req.url, 'http://localhost').searchParams
      );
      if (verifyComingSoonUnlockLinkToken(linkToken, env)) {
        const cookieToken = await createUnlockToken(env);
        if (cookieToken) {
          const secure =
            Boolean(req.secure) ||
            String(req.headers['x-forwarded-proto'] || '') === 'https' ||
            process.env.VERCEL === '1';
          const hostname = String(req.hostname || '');
          res.setHeader(
            'Set-Cookie',
            buildUnlockSetCookieHeader(cookieToken, { secure, hostname })
          );
          const redirectTo =
            hostname.toLowerCase() === 'tarotitalia.com'
              ? 'https://www.tarotitalia.com/'
              : '/';
          return res.redirect(302, redirectTo);
        }
      }
      return sendComingSoonHtml(res, comingSoonHtmlPath, true);
    }

    // Only gate browser document navigations. Module/fetch requests (Vite, XHR)
    // continue so the unlocked SPA and tooling keep working.
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return res.status(401).json({ error: 'Sito in anteprima — accesso riservato.' });
    }

    const accept = String(req.headers.accept || '');
    const looksLikeDocument =
      accept.includes('text/html') ||
      accept.includes('application/xhtml+xml') ||
      accept === '' ||
      accept === '*/*';
    if (!looksLikeDocument) {
      return next();
    }

    return sendComingSoonHtml(res, comingSoonHtmlPath, false);
  };
}

export function resolveComingSoonHtmlPath(repoRoot: string): string {
  const distCopy = path.join(repoRoot, 'dist', 'coming-soon.html');
  const publicCopy = path.join(repoRoot, 'public', 'coming-soon.html');
  if (process.env.NODE_ENV === 'production' && fs.existsSync(distCopy)) {
    return distCopy;
  }
  return publicCopy;
}
