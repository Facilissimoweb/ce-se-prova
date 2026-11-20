import type { CookieConsentPreferences } from '../types/handoff';

/** Bumped for marketing / third-party (Google Translate) category — ENN-140. */
export const COOKIE_CONSENT_STORAGE_KEY = 'tarot_italia_cookie_consent_v2';
/** Legacy key from ENN-136 era (necessary / functional / analytics only). */
export const COOKIE_CONSENT_STORAGE_KEY_V1 = 'tarot_italia_cookie_consent_v1';

export const COOKIE_CONSENT_EVENT = 'tarot-italia-cookie-consent';

export const DEFAULT_COOKIE_PREFS: CookieConsentPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  updatedAtIso: '',
};

function normalizePrefs(
  parsed: Partial<CookieConsentPreferences>
): CookieConsentPreferences | null {
  if (
    typeof parsed.functional !== 'boolean' ||
    typeof parsed.analytics !== 'boolean'
  ) {
    return null;
  }
  return {
    necessary: true,
    functional: parsed.functional,
    analytics: parsed.analytics,
    marketing:
      typeof parsed.marketing === 'boolean' ? parsed.marketing : false,
    updatedAtIso:
      typeof parsed.updatedAtIso === 'string' ? parsed.updatedAtIso : '',
  };
}

export function loadSavedCookiePreferences(): CookieConsentPreferences | null {
  try {
    const raw =
      window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) ||
      window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY_V1);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsentPreferences>;
    return normalizePrefs(parsed);
  } catch {
    return null;
  }
}

export function saveCookiePreferences(
  prefs: Omit<CookieConsentPreferences, 'necessary' | 'updatedAtIso'> & {
    updatedAtIso?: string;
  }
): CookieConsentPreferences {
  const next: CookieConsentPreferences = {
    necessary: true,
    functional: prefs.functional,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    updatedAtIso: prefs.updatedAtIso || new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify(next)
    );
    // Drop legacy key so loaders do not resurrect pre-marketing consent.
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY_V1);
  } catch {
    // Ignore storage quota errors in restricted sandboxes
  }
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_EVENT, { detail: next })
  );
  return next;
}

export function subscribeCookieConsent(
  listener: (prefs: CookieConsentPreferences | null) => void
): () => void {
  const onEvent = (event: Event) => {
    const detail = (event as CustomEvent<CookieConsentPreferences>).detail;
    listener(detail ?? loadSavedCookiePreferences());
  };
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === COOKIE_CONSENT_STORAGE_KEY ||
      event.key === COOKIE_CONSENT_STORAGE_KEY_V1
    ) {
      listener(loadSavedCookiePreferences());
    }
  };
  window.addEventListener(COOKIE_CONSENT_EVENT, onEvent);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, onEvent);
    window.removeEventListener('storage', onStorage);
  };
}
