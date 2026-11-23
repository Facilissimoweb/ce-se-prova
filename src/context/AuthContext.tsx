import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import {
  googleSignInErrorMessage,
  preferGoogleRedirectSignIn,
  shouldFallbackGoogleRedirect,
} from '../lib/googleSignIn';
import {
  RESERVED_DEMO_UID,
  isReservedDemoRequested,
} from '../lib/reservedDemo';
import { notifyGoogleTranslateRefresh } from '../lib/googleTranslateRuntime';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Minimal stand-in for local Area Riservata demos (DEV + ?demo_reserved=1). */
function buildReservedDemoAuthUser(): User {
  return {
    uid: RESERVED_DEMO_UID,
    email: 'demo@tarotitalia.local',
    displayName: 'Demo Corsista',
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: '',
    tenantId: null,
    delete: async () => undefined,
    getIdToken: async () => 'demo-reserved-token',
    getIdTokenResult: async () =>
      ({
        token: 'demo-reserved-token',
        expirationTime: '',
        issuedAtTime: '',
        authTime: '',
        signInProvider: 'custom',
        signInSecondFactor: null,
        claims: {},
      }) as Awaited<ReturnType<User['getIdTokenResult']>>,
    reload: async () => undefined,
    toJSON: () => ({}),
    phoneNumber: null,
    photoURL: null,
    providerId: 'firebase',
  } as User;
}

function authErrorCode(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    return String((err as { code?: string }).code || '');
  }
  return '';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (isReservedDemoRequested()) {
      setUser(buildReservedDemoAuthUser());
      setLoading(false);
      return;
    }

    let cancelled = false;

    // Complete desktop redirect return (ENN-238) before/alongside auth listener.
    void getRedirectResult(auth)
      .then((result) => {
        if (cancelled || !result?.user) return;
        setUser(result.user);
        notifyGoogleTranslateRefresh();
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const code = authErrorCode(err);
        if (code && code !== 'auth/popup-closed-by-user') {
          setAuthError(googleSignInErrorMessage(code));
        }
      });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      // Post-login React mounts (Area Personale / corsi) need a GT re-scan (ENN-148).
      notifyGoogleTranslateRefresh();
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<User | null> => {
    setAuthError(null);
    try {
      // Desktop: full-page redirect avoids popup blockers / partitioned cookies.
      if (preferGoogleRedirectSignIn()) {
        await signInWithRedirect(auth, googleAuthProvider);
        return null;
      }

      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
      notifyGoogleTranslateRefresh();
      return result.user;
    } catch (err: unknown) {
      const code = authErrorCode(err);

      if (shouldFallbackGoogleRedirect(code)) {
        try {
          await signInWithRedirect(auth, googleAuthProvider);
          return null;
        } catch (redirectErr: unknown) {
          setAuthError(googleSignInErrorMessage(authErrorCode(redirectErr) || code));
          return null;
        }
      }

      setAuthError(googleSignInErrorMessage(code));
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthError(null);
    await signOut(auth);
  }, []);

  // Stable identity so consumers (useReservedArea, booking, dialogue) do not
  // recreate fetch callbacks on every AuthProvider render.
  const getIdToken = useCallback(async (): Promise<string | null> => {
    if (user?.uid === RESERVED_DEMO_UID) return 'demo-reserved-token';
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    return currentUser.getIdToken();
  }, [user?.uid]);

  const value = useMemo(
    () => ({
      user,
      loading,
      authError,
      clearAuthError,
      signInWithGoogle,
      logout,
      getIdToken,
    }),
    [
      user,
      loading,
      authError,
      clearAuthError,
      signInWithGoogle,
      logout,
      getIdToken,
    ]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve essere utilizzato dentro AuthProvider.');
  }
  return ctx;
}
