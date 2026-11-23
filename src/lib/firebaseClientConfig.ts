/**
 * Firebase web client config (ENN-247).
 *
 * Base values live in `firebase-applet-config.json`. Production can override
 * `authDomain` via `VITE_FIREBASE_AUTH_DOMAIN` (e.g. `auth.tarotitalia.com`)
 * after Firebase Hosting custom domain + Google OAuth URIs are live.
 *
 * Until that env is set, the SDK keeps the default `*.firebaseapp.com` host
 * so local/dev and current Production login stay unbroken.
 */
import baseConfig from '../../firebase-applet-config.json';

export const DEFAULT_FIREBASE_AUTH_DOMAIN =
  'gen-lang-client-0853491667.firebaseapp.com';

type FirebaseWebConfig = {
  projectId: string;
  appId: string;
  apiKey: string;
  authDomain: string;
  storageBucket: string;
  messagingSenderId: string;
  measurementId?: string;
};

function normalizeAuthDomain(value: string | undefined | null): string {
  const raw = String(value || '')
    .trim()
    .toLowerCase()
    // Accept accidental full URLs from Console copy-paste.
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '');
  return raw;
}

/**
 * Resolve authDomain: env override → JSON → known firebaseapp fallback.
 * Pure helper so Node asserts can pass a fake env without Vite.
 */
export function resolveFirebaseAuthDomain(
  envAuthDomain?: string | null,
  jsonAuthDomain: string = String(
    (baseConfig as { authDomain?: string }).authDomain || ''
  )
): string {
  const fromEnv = normalizeAuthDomain(envAuthDomain);
  if (fromEnv) return fromEnv;
  const fromJson = normalizeAuthDomain(jsonAuthDomain);
  if (fromJson) return fromJson;
  return DEFAULT_FIREBASE_AUTH_DOMAIN;
}

function readViteAuthDomainOverride(): string | undefined {
  try {
    // Vite inlines import.meta.env.VITE_* at build time.
    const value = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
    return typeof value === 'string' ? value : undefined;
  } catch {
    return undefined;
  }
}

/** Full client config for `initializeApp` (SPA). */
export function getFirebaseWebConfig(): FirebaseWebConfig {
  const authDomain = resolveFirebaseAuthDomain(readViteAuthDomainOverride());
  return {
    projectId: baseConfig.projectId,
    appId: baseConfig.appId,
    apiKey: baseConfig.apiKey,
    authDomain,
    storageBucket: baseConfig.storageBucket,
    messagingSenderId: baseConfig.messagingSenderId,
    measurementId: baseConfig.measurementId || undefined,
  };
}

/** Auth host used by Google consent / popup helper iframe. */
export function getFirebaseAuthDomain(): string {
  return getFirebaseWebConfig().authDomain;
}
