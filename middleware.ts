/**
 * Vercel Routing Middleware — Coming Soon gate (ENN-93).
 *
 * Vite SPA (not Next.js). Helpers from `@vercel/functions` on Node runtime.
 * Gate logic is inlined (no ./src imports) so the Vercel middleware bundler
 * cannot fail resolving TypeScript path/extension imports — that previously
 * contributed to MIDDLEWARE_INVOCATION_FAILED on www.
 *
 * Keep behaviour in sync with src/lib/comingSoon.ts (Express + unlock API).
 */
import { next, rewrite } from '@vercel/functions';

export const config = {
  matcher: ['/((?!api(?:/|$)|.*\\.[^/]+$).*)'],
  runtime: 'nodejs',
};

const COOKIE = 'ti_atelier_unlock';
const DEFAULT_PATH = '/preview-atelier';
const TOKEN_PAYLOAD = 'tarot-italia-atelier-v1';
const PRODUCTION_HOSTS = new Set(['www.tarotitalia.com', 'tarotitalia.com']);

type GateEnv = {
  enabled: boolean;
  allHosts: boolean;
  secretPath: string;
  password: string;
  passwordHash: string;
};

function envOf(): GateEnv {
  const e = process.env;
  const raw = (e.COMING_SOON_SECRET_PATH || DEFAULT_PATH).trim();
  const secretPath = normalizePath(raw || DEFAULT_PATH);
  return {
    enabled: e.COMING_SOON_ENABLED === 'true',
    allHosts: e.COMING_SOON_ALL_HOSTS === 'true',
    secretPath,
    password: (e.COMING_SOON_PASSWORD || '').trim(),
    passwordHash: (e.COMING_SOON_PASSWORD_HASH || '').trim().toLowerCase(),
  };
}

function normalizePath(pathname: string): string {
  const raw = (pathname.split('?')[0].split('#')[0] || '/').trim() || '/';
  if (raw === '/') return '/';
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`;
  return withSlash.replace(/\/+$/, '').toLowerCase() || '/';
}

function hostWithoutPort(hostHeader: string): string {
  return hostHeader.trim().toLowerCase().replace(/:\d+$/, '');
}

function isActive(hostHeader: string, env: GateEnv): boolean {
  if (!env.enabled) return false;
  if (env.allHosts) return true;
  return PRODUCTION_HOSTS.has(hostWithoutPort(hostHeader));
}

function isAllowlisted(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (path === '/coming-soon.html') return true;
  if (path.startsWith('/api')) return true;
  if (path.startsWith('/brand')) return true;
  if (path.startsWith('/assets')) return true;
  if (
    path.startsWith('/@') ||
    path.startsWith('/node_modules') ||
    path.startsWith('/src') ||
    path.startsWith('/__vite')
  ) {
    return true;
  }
  if (
    path === '/robots.txt' ||
    path === '/sitemap.xml' ||
    path === '/llms.txt' ||
    path === '/llms-full.txt' ||
    path === '/privacy.html' ||
    path === '/favicon.ico'
  ) {
    return true;
  }
  const last = path.split('/').pop() || '';
  if (last.includes('.') && !last.startsWith('.')) return true;
  return false;
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(message)
  );
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function signingMaterial(env: GateEnv): string | null {
  if (env.password) return `pwd:${env.password}`;
  if (env.passwordHash) return `hash:${env.passwordHash}`;
  return null;
}

async function isValidUnlockCookie(
  cookieHeader: string | null,
  env: GateEnv
): Promise<boolean> {
  const material = signingMaterial(env);
  if (!material) return false;
  const expected = await hmacSha256Hex(material, TOKEN_PAYLOAD);
  const raw = cookieHeader || '';
  const match = raw
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${COOKIE}=`));
  if (!match) return false;
  const value = match.slice(COOKIE.length + 1).trim();
  return timingSafeEqualString(value, expected);
}

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
    const env = envOf();
    const host = requestHost(request, url);

    if (!isActive(host, env)) {
      return next();
    }

    if (isAllowlisted(url.pathname)) {
      return next();
    }

    if (await isValidUnlockCookie(request.headers.get('cookie'), env)) {
      return next();
    }

    if (normalizePath(url.pathname) === env.secretPath) {
      return comingSoonRewrite(request, true);
    }

    return comingSoonRewrite(request, false);
  } catch (err) {
    console.error('[coming-soon] middleware failed', err);
    try {
      const url = new URL(request.url);
      const env = envOf();
      if (isActive(requestHost(request, url), env)) {
        return comingSoonRewrite(request, false);
      }
    } catch {
      /* ignore */
    }
    return next();
  }
}
