import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  getAuth,
  initializeAuth,
  type Auth,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

/**
 * Explicit local persistence + popup/redirect resolver.
 * After a successful Google popup, the user must survive a reload of
 * `/area-riservata` on www (not bounce back to the login invite).
 */
function createAuth(): Auth {
  try {
    return initializeAuth(app, {
      persistence: browserLocalPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    });
  } catch {
    // HMR / duplicate init — reuse existing Auth instance.
    return getAuth(app);
  }
}

export const auth = createAuth();

export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
