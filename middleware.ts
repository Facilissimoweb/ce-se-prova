/**
 * Vercel Routing Middleware — Coming Soon gate (ENN-93).
 *
 * Vite SPA on Vercel (not Next.js): use `@vercel/functions` helpers on the
 * Node.js routing-middleware runtime. Do not use `@vercel/edge` / NextRequest.
 * Shared gate helpers live in src/lib/comingSoon (Web Crypto only — no Node fs).
 */
import { next, rewrite } from '@vercel/functions';
import {
  isComingSoonActiveForHost,
  isComingSoonAllowlistedPath,
  isComingSoonSecretPath,
  isValidUnlockCookie,
  readComingSoonEnv,
} from './src/lib/comingSoon';

export const config = {
  // Skip /api/* and any path with a file extension (static assets).
  matcher: ['/((?!api(?:/|$)|.*\\.[^/]+$).*)'],
  // Match Vite + serverless Node; Edge helpers from @vercel/edge caused
  // MIDDLEWARE_INVOCATION_FAILED on Production www.
  runtime: 'nodejs',
};

function requestHost(request: Request, url: URL): string {
  return (
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    url.host
  );
}

function comingSoonRewrite(request: Request, unlock: boolean): Response {
  const dest = new URL('/coming-soon.html', request.url);
  if (unlock) dest.searchParams.set('mode', 'unlock');
  return rewrite(dest);
}

export default async function middleware(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const env = readComingSoonEnv();
    const host = requestHost(request, url);

    if (!isComingSoonActiveForHost(host, env)) {
      return next();
    }

    if (isComingSoonAllowlistedPath(url.pathname)) {
      return next();
    }

    if (await isValidUnlockCookie(request.headers.get('cookie'), env)) {
      return next();
    }

    if (isComingSoonSecretPath(url.pathname, env)) {
      return comingSoonRewrite(request, true);
    }

    return comingSoonRewrite(request, false);
  } catch (err) {
    console.error('[coming-soon] middleware failed', err);
    // Never 500 the whole site: if the gate is on, show Coming Soon; else pass through.
    try {
      const url = new URL(request.url);
      const env = readComingSoonEnv();
      if (isComingSoonActiveForHost(requestHost(request, url), env)) {
        return comingSoonRewrite(request, false);
      }
    } catch {
      /* ignore secondary failure */
    }
    return next();
  }
}
