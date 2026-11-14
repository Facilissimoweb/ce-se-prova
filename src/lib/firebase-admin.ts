import { cert, getApps, initializeApp, type AppOptions, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import firebaseConfig from '../../firebase-applet-config.json';

function buildOptions(): AppOptions {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    try {
      const serviceAccount = JSON.parse(raw) as {
        project_id?: string;
        client_email?: string;
        private_key?: string;
      };
      return {
        credential: cert(serviceAccount as Parameters<typeof cert>[0]),
        projectId: serviceAccount.project_id || firebaseConfig.projectId,
      };
    } catch (error) {
      console.error(
        'FIREBASE_SERVICE_ACCOUNT_JSON non valido — fallback projectId only:',
        error
      );
    }
  }
  return { projectId: firebaseConfig.projectId };
}

let app: App | undefined;
let auth: Auth | undefined;

function ensureApp(): App {
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(buildOptions());
  }
  return app;
}

/** Lazy Auth — do not initialize Firebase at module load (breaks light API bundles). */
export const adminAuth: Auth = new Proxy({} as Auth, {
  get(_target, prop, receiver) {
    if (!auth) {
      auth = getAuth(ensureApp());
    }
    const value = Reflect.get(auth as object, prop, receiver);
    return typeof value === 'function' ? value.bind(auth) : value;
  },
});
