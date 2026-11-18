/**
 * Coming Soon gate (ENN-92) — shared helpers for Edge middleware, Express, and unlock API.
 * Cookie is httpOnly; password stays server-side only (never VITE_*).
 */

export const COMING_SOON_COOKIE = 'ti_atelier_unlock';
export const COMING_SOON_DEFAULT_PATH = '/preview-atelier';
export const COMING_SOON_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 days
const TOKEN_PAYLOAD = 'tarot-italia-atelier-v1';

const PRODUCTION_HOSTS = new Set([
  'www.tarotitalia.com',
  'tarotitalia.com',
]);

export type ComingSoonEnv = {
  enabled: boolean;
  allHosts: boolean;
  secretPath: string;
  password: string;
  passwordHash: string;
};

export function readComingSoonEnv(
  env: Record<string, string | undefined> = process.env as Record<
    string,
    string | undefined
  >
): ComingSoonEnv {
  const rawPath = (env.COMING_SOON_SECRET_PATH || COMING_SOON_DEFAULT_PATH).trim();
  const secretPath = normalizePath(rawPath || COMING_SOON_DEFAULT_PATH);
  return {
    enabled: env.COMING_SOON_ENABLED === 'true',
    allHosts: env.COMING_SOON_ALL_HOSTS === 'true',
    secretPath,
    password: (env.COMING_SOON_PASSWORD || '').trim(),
    passwordHash: (env.COMING_SOON_PASSWORD_HASH || '').trim().toLowerCase(),
  };
}

export function normalizePath(pathname: string): string {
  const raw = (pathname.split('?')[0].split('#')[0] || '/').trim() || '/';
  if (raw === '/') return '/';
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`;
  return withSlash.replace(/\/+$/, '').toLowerCase() || '/';
}

export function hostWithoutPort(hostHeader: string): string {
  return hostHeader.trim().toLowerCase().replace(/:\d+$/, '');
}

/** Gate active for this host when COMING_SOON_ENABLED=true. */
export function isComingSoonActiveForHost(
  hostHeader: string,
  env: ComingSoonEnv = readComingSoonEnv()
): boolean {
  if (!env.enabled) return false;
  if (env.allHosts) return true;
  const host = hostWithoutPort(hostHeader);
  return PRODUCTION_HOSTS.has(host);
}

/**
 * Paths that must pass the gate without a cookie (API, static, SEO, unlock page asset).
 * Document navigations (SPA routes) are NOT allowlisted.
 */
export function isComingSoonAllowlistedPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (path === '/coming-soon.html') return true;
  if (path.startsWith('/api')) return true;
  if (path.startsWith('/brand')) return true;
  if (path.startsWith('/assets')) return true;
  // Vite / tooling (local npm run dev) — never gate HMR or module graph
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
  // Static files with an extension (js/css/images/fonts/maps…)
  const last = path.split('/').pop() || '';
  if (last.includes('.') && !last.startsWith('.')) return true;
  return false;
}

export function isComingSoonSecretPath(
  pathname: string,
  env: ComingSoonEnv = readComingSoonEnv()
): boolean {
  return normalizePath(pathname) === env.secretPath;
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
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

/** Material used to sign the unlock cookie (password or hash must be set). */
function cookieSigningMaterial(env: ComingSoonEnv): string | null {
  if (env.password) return `pwd:${env.password}`;
  if (env.passwordHash) return `hash:${env.passwordHash}`;
  return null;
}

export async function createUnlockToken(
  env: ComingSoonEnv = readComingSoonEnv()
): Promise<string | null> {
  const material = cookieSigningMaterial(env);
  if (!material) return null;
  return hmacSha256Hex(material, TOKEN_PAYLOAD);
}

export async function isValidUnlockCookie(
  cookieHeader: string | null | undefined,
  env: ComingSoonEnv = readComingSoonEnv()
): Promise<boolean> {
  const expected = await createUnlockToken(env);
  if (!expected) return false;
  const raw = cookieHeader || '';
  const match = raw
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${COMING_SOON_COOKIE}=`));
  if (!match) return false;
  const value = match.slice(COMING_SOON_COOKIE.length + 1).trim();
  return timingSafeEqualString(value, expected);
}

export async function verifyComingSoonPassword(
  password: string,
  env: ComingSoonEnv = readComingSoonEnv()
): Promise<boolean> {
  const candidate = password.trim();
  if (!candidate) return false;

  if (env.passwordHash) {
    const digest = await sha256Hex(candidate);
    return timingSafeEqualString(digest, env.passwordHash);
  }
  if (env.password) {
    return timingSafeEqualString(candidate, env.password);
  }
  return false;
}

export function buildUnlockSetCookieHeader(
  token: string,
  opts: { secure: boolean; maxAgeSec?: number } = { secure: true }
): string {
  const maxAge = opts.maxAgeSec ?? COMING_SOON_COOKIE_MAX_AGE_SEC;
  const parts = [
    `${COMING_SOON_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ];
  if (opts.secure) parts.push('Secure');
  return parts.join('; ');
}

export function buildClearUnlockCookieHeader(secure: boolean): string {
  const parts = [
    `${COMING_SOON_COOKIE}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}
