import {
  buildClearUnlockCookieHeader,
  buildUnlockSetCookieHeader,
  createUnlockToken,
  isComingSoonActiveForHost,
  isComingSoonOwnerEmail,
  listComingSoonOwnerEmails,
  listComingSoonUnlockPaths,
  readComingSoonEnv,
  isValidUnlockCookie,
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
      unlockPaths: listComingSoonUnlockPaths(env),
      unlockLinkConfigured: Boolean(env.unlockToken),
      passwordConfigured: Boolean(env.password || env.passwordHash),
      googleOwnerUnlock: true,
      ownerEmailCount: listComingSoonOwnerEmails(env).length,
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
          'Password Coming Soon non configurata. Usa «Entra con Google» oppure imposta COMING_SOON_UNLOCK_TOKEN.',
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

  let hostname: string | undefined;
  try {
    hostname = new URL(input.origin).hostname;
  } catch {
    hostname = undefined;
  }

  return {
    status: 200,
    body: { ok: true, redirect: '/', method: 'password' },
    setCookie: buildUnlockSetCookieHeader(token, {
      secure: secureCookie(input.origin),
      hostname,
    }),
  };
}

/**
 * Owner Google unlock (ENN-95): verify Firebase ID token, allowlist email,
 * set the same httpOnly unlock cookie. Dynamically loads firebase-admin.
 */
export async function postComingSoonUnlockWithGoogle(input: {
  idToken: string;
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

  const idToken = input.idToken.trim();
  if (!idToken) {
    return {
      status: 400,
      body: { error: 'Token Google mancante.' },
    };
  }

  let email: string | undefined;
  try {
    const { getAdminAuth } = await import('../../lib/firebase-admin.ts');
    const adminAuth = await getAdminAuth();
    const decoded = await adminAuth.verifyIdToken(idToken);
    email = decoded.email;
  } catch (error) {
    console.error('[coming-soon] Google unlock verify failed:', error);
    return {
      status: 401,
      body: {
        error:
          'Accesso Google non valido o scaduto. Riprova con «Entra con Google».',
      },
    };
  }

  if (!isComingSoonOwnerEmail(email, env)) {
    return {
      status: 403,
      body: {
        error:
          'Questo account Google non è autorizzato ad aprire l’anteprima.',
      },
    };
  }

  const token = await createUnlockToken(env);
  if (!token) {
    return {
      status: 503,
      body: {
        error:
          'Impossibile creare la sessione di anteprima. Controlla FIREBASE_SERVICE_ACCOUNT_JSON su Vercel.',
      },
    };
  }

  let hostname: string | undefined;
  try {
    hostname = new URL(input.origin).hostname;
  } catch {
    hostname = undefined;
  }

  return {
    status: 200,
    body: {
      ok: true,
      redirect: '/',
      method: 'google',
      email: (email || '').toLowerCase(),
    },
    setCookie: buildUnlockSetCookieHeader(token, {
      secure: secureCookie(input.origin),
      hostname,
    }),
  };
}

export function postComingSoonLock(input: {
  origin: string;
}): ComingSoonRouteResult {
  let hostname: string | undefined;
  try {
    hostname = new URL(input.origin).hostname;
  } catch {
    hostname = undefined;
  }
  return {
    status: 200,
    body: { ok: true },
    setCookie: buildClearUnlockCookieHeader(
      secureCookie(input.origin),
      hostname
    ),
  };
}
