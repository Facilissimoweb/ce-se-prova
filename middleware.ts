/**
 * Vercel Routing Middleware — Coming Soon gate (ENN-93/94).
 *
 * Vite SPA (not Next.js). Helpers from `@vercel/functions` on Node runtime.
 * Gate logic is inlined (no ./src imports) so the Vercel middleware bundler
 * cannot fail resolving TypeScript path/extension imports.
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
const FRIENDLY_PATH = '/admin/com';
const BUILTIN_UNLOCK_PATHS = [DEFAULT_PATH, FRIENDLY_PATH];
const TOKEN_PAYLOAD = 'tarot-italia-atelier-v1';
const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 30;
const PRODUCTION_HOSTS = new Set(['www.tarotitalia.com', 'tarotitalia.com']);

type GateEnv = {
  enabled: boolean;
  allHosts: boolean;
  secretPath: string;
  password: string;
  passwordHash: string;
  unlockToken: string;
};

/** Reject non-paths (e.g. pasted API keys). Never log the raw value. */
function resolveSecretPath(rawPath: string): string {
  const trimmed = (rawPath || '').trim();
  if (!trimmed) return DEFAULT_PATH;
  if (
    !trimmed.startsWith('/') ||
    /\s/.test(trimmed) ||
    trimmed.length > 128 ||
    /^(sk|pk|rk|whsec)_/i.test(trimmed)
  ) {
    console.warn(
      '[coming-soon] COMING_SOON_SECRET_PATH is not a valid URL path; using default /preview-atelier'
    );
    return DEFAULT_PATH;
  }
  const normalized = normalizePath(trimmed);
  if (normalized === '/') return DEFAULT_PATH;
  return normalized;
}

function envOf(): GateEnv {
  const e = process.env;
  return {
    enabled: e.COMING_SOON_ENABLED === 'true',
    allHosts: e.COMING_SOON_ALL_HOSTS === 'true',
    secretPath: resolveSecretPath(e.COMING_SOON_SECRET_PATH || ''),
    password: (e.COMING_SOON_PASSWORD || '').trim(),
    passwordHash: (e.COMING_SOON_PASSWORD_HASH || '').trim().toLowerCase(),
    unlockToken: (e.COMING_SOON_UNLOCK_TOKEN || '').trim(),
  };
}

function normalizePath(pathname: string): string {
  const raw = (pathname.split('?')[0].split('#')[0] || '/').trim() || '/';
  if (raw === '/') return '/';
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`;
  return withSlash.replace(/\/+$/, '').toLowerCase() || '/';
}

function unlockPaths(env: GateEnv): string[] {
  const paths = new Set(BUILTIN_UNLOCK_PATHS.map(normalizePath));
  paths.add(normalizePath(env.secretPath));
  return [...paths];
}

function isUnlockPath(pathname: string, env: GateEnv): boolean {
  return unlockPaths(env).includes(normalizePath(pathname));
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
  if (env.unlockToken) return `tok:${env.unlockToken}`;
  return null;
}

async function cookieValue(env: GateEnv): Promise<string | null> {
  const material = signingMaterial(env);
  if (!material) return null;
  return hmacSha256Hex(material, TOKEN_PAYLOAD);
}

async function isValidUnlockCookie(
  cookieHeader: string | null,
  env: GateEnv
): Promise<boolean> {
  const expected = await cookieValue(env);
  if (!expected) return false;
  const raw = cookieHeader || '';
  const match = raw
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${COOKIE}=`));
  if (!match) return false;
  const value = match.slice(COOKIE.length + 1).trim();
  return timingSafeEqualString(value, expected);
}

function linkTokenMatches(url: URL, env: GateEnv): boolean {
  if (!env.unlockToken) return false;
  const candidate = (
    url.searchParams.get('t') ||
    url.searchParams.get('token') ||
    ''
  ).trim();
  if (!candidate) return false;
  return timingSafeEqualString(candidate, env.unlockToken);
}

function requestHost(request: Request, url: URL): string {
  return (
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    url.host
  );
}

function comingSoonRewrite(request: Request): Response {
  return rewrite(new URL('/coming-soon.html', request.url));
}

function unlockRedirect(request: Request, cookie: string): Response {
  const secure =
    request.url.startsWith('https:') || process.env.VERCEL === '1';
  const parts = [
    `${COOKIE}=${cookie}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${COOKIE_MAX_AGE_SEC}`,
  ];
  if (secure) parts.push('Secure');
  const headers = new Headers();
  headers.set('Location', new URL('/', request.url).toString());
  headers.set('Set-Cookie', parts.join('; '));
  headers.set('Cache-Control', 'no-store');
  return new Response(null, { status: 302, headers });
}

/**
 * Serve Coming Soon HTML with unlock UI enabled (password backup).
 * Rewrite to `?mode=unlock` does NOT change window.location (ENN-94).
 */
async function comingSoonUnlockResponse(request: Request): Promise<Response> {
  const htmlUrl = new URL('/coming-soon.html', request.url);
  const upstream = await fetch(htmlUrl);
  if (!upstream.ok) {
    return Response.redirect(
      new URL('/coming-soon.html?mode=unlock', request.url),
      302
    );
  }
  let html = await upstream.text();
  // Only inspect the <body> tag — the same strings appear in CSS/JS source.
  if (!/<body[^>]*data-coming-soon-mode\s*=\s*["']unlock["']/i.test(html)) {
    html = html.replace(
      /<body([^>]*)>/i,
      '<body$1 class="is-unlock" data-coming-soon-mode="unlock">'
    );
  }
  html = html.replace(
    /(<div\s+class="unlock-panel"[^>]*?)\s+hidden([^>]*>)/i,
    '$1$2'
  );
  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
    },
  });
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

    if (isUnlockPath(url.pathname, env)) {
      // One-click unlock: /admin/com?t=<COMING_SOON_UNLOCK_TOKEN>
      if (linkTokenMatches(url, env)) {
        const cookie = await cookieValue(env);
        if (cookie) {
          return unlockRedirect(request, cookie);
        }
      }
      // Password form backup (no token / wrong token / token unset)
      return comingSoonUnlockResponse(request);
    }

    return comingSoonRewrite(request);
  } catch (err) {
    console.error('[coming-soon] middleware failed', err);
    try {
      const url = new URL(request.url);
      const env = envOf();
      if (isActive(requestHost(request, url), env)) {
        return comingSoonRewrite(request);
      }
    } catch {
      /* ignore */
    }
    return next();
  }
}
