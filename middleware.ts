/**
 * Vercel Edge Middleware — Coming Soon gate (ENN-92).
 * Visitors on www (or all hosts when COMING_SOON_ALL_HOSTS=true) see Coming Soon
 * until they unlock via secret path + password (httpOnly cookie).
 */
import { next, rewrite } from '@vercel/edge';
import {
  isComingSoonActiveForHost,
  isComingSoonAllowlistedPath,
  isComingSoonSecretPath,
  isValidUnlockCookie,
  readComingSoonEnv,
} from './src/lib/comingSoon.ts';

export const config = {
  // Skip /api/* and any path with a file extension (static assets).
  matcher: ['/((?!api(?:/|$)|.*\\.[^/]+$).*)'],
};

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const env = readComingSoonEnv();
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    url.host;

  if (!isComingSoonActiveForHost(host, env)) {
    return next();
  }

  if (isComingSoonAllowlistedPath(url.pathname)) {
    return next();
  }

  const cookie = request.headers.get('cookie');
  if (await isValidUnlockCookie(cookie, env)) {
    return next();
  }

  if (isComingSoonSecretPath(url.pathname, env)) {
    const unlockUrl = new URL('/coming-soon.html', url.origin);
    unlockUrl.searchParams.set('mode', 'unlock');
    return rewrite(unlockUrl);
  }

  return rewrite(new URL('/coming-soon.html', url.origin));
}
