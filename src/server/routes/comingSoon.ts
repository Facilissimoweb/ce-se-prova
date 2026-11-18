import {
  buildClearUnlockCookieHeader,
  buildUnlockSetCookieHeader,
  createUnlockToken,
  isComingSoonActiveForHost,
  isValidUnlockCookie,
  readComingSoonEnv,
  verifyComingSoonPassword,
  type ComingSoonEnv,
} from '../../lib/comingSoon.ts';

export type ComingSoonRouteResult = {
  status: number;
  body: Record<string, unknown>;
  setCookie?: string;
};

function secureCookie(origin: string): boolean {
  return origin.startsWith('https://') || process.env.VERCEL === '1';
}

export function getComingSoonStatus(input: {
  host: string;
  cookieHeader?: string | null;
  env?: ComingSoonEnv;
}): Promise<ComingSoonRouteResult> {
  const env = input.env ?? readComingSoonEnv();
  const active = isComingSoonActiveForHost(input.host, env);
  return isValidUnlockCookie(input.cookieHeader, env).then((unlocked) => ({
    status: 200,
    body: {
      enabled: env.enabled,
      active,
      unlocked: active ? unlocked : true,
      secretPath: env.secretPath,
    },
  }));
}

export async function postComingSoonUnlock(input: {
  password: string;
  origin: string;
  env?: ComingSoonEnv;
}): Promise<ComingSoonRouteResult> {
  const env = input.env ?? readComingSoonEnv();

  if (!env.enabled) {
    return {
      status: 400,
      body: { error: 'Coming Soon non è attivo su questo ambiente.' },
    };
  }

  if (!env.password && !env.passwordHash) {
    return {
      status: 503,
      body: {
        error:
          'Password Coming Soon non configurata. Imposta COMING_SOON_PASSWORD su Vercel.',
      },
    };
  }

  const ok = await verifyComingSoonPassword(input.password, env);
  if (!ok) {
    return {
      status: 401,
      body: { error: 'Password non corretta.' },
    };
  }

  const token = await createUnlockToken(env);
  if (!token) {
    return {
      status: 503,
      body: { error: 'Impossibile creare la sessione di anteprima.' },
    };
  }

  return {
    status: 200,
    body: { ok: true, redirect: '/' },
    setCookie: buildUnlockSetCookieHeader(token, {
      secure: secureCookie(input.origin),
    }),
  };
}

export function postComingSoonLock(input: {
  origin: string;
}): ComingSoonRouteResult {
  return {
    status: 200,
    body: { ok: true },
    setCookie: buildClearUnlockCookieHeader(secureCookie(input.origin)),
  };
}
