/**
 * Public brand origin for share / canonical / OG (ENN-244).
 * Never emit *.vercel.app — Production prefer https://tarotitalia.com.
 */

export const PRODUCTION_SITE_ORIGIN = 'https://tarotitalia.com';

export function isVercelAppOrigin(value: string): boolean {
  try {
    const host = new URL(
      value.includes('://') ? value : `https://${value}`
    ).hostname.toLowerCase();
    return host === 'vercel.app' || host.endsWith('.vercel.app');
  } catch {
    return /\.vercel\.app$/i.test(value.replace(/\/$/, ''));
  }
}

function normalizeOrigin(raw: string): string {
  try {
    return new URL(raw).origin;
  } catch {
    return raw.replace(/\/$/, '');
  }
}

/**
 * Resolve the public site origin for absolute SEO / share URLs.
 * Prefer a non-vercel `VITE_SITE_ORIGIN`, then a non-vercel runtime host,
 * else the brand canonical. Never returns *.vercel.app.
 */
export function resolveClientSiteOrigin(options: {
  envOrigin?: string | null;
  windowOrigin?: string | null;
}): string {
  const fromEnv = options.envOrigin?.trim();
  if (fromEnv && !isVercelAppOrigin(fromEnv)) {
    return normalizeOrigin(fromEnv);
  }
  const fromWindow = options.windowOrigin?.trim();
  if (fromWindow && !isVercelAppOrigin(fromWindow)) {
    return normalizeOrigin(fromWindow);
  }
  return PRODUCTION_SITE_ORIGIN;
}

/**
 * Build an absolute public URL. If `urlOrPath` is already absolute but on
 * *.vercel.app, rewrite to the brand origin (keeps path/query/hash).
 */
export function toPublicAbsoluteUrl(
  urlOrPath: string,
  origin: string = PRODUCTION_SITE_ORIGIN
): string {
  const base = (origin || PRODUCTION_SITE_ORIGIN).replace(/\/$/, '');
  try {
    if (!/^https?:\/\//i.test(urlOrPath)) {
      const parsed = new URL(urlOrPath, `${base}/`);
      return `${base}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
    const parsed = new URL(urlOrPath);
    const publicOrigin = isVercelAppOrigin(parsed.origin)
      ? PRODUCTION_SITE_ORIGIN
      : parsed.origin;
    return `${publicOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    const path = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
    return `${base}${path}`;
  }
}
