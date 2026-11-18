/**
 * Firebase Admin Auth — lazy dynamic import.
 *
 * Never static-import `firebase-admin/*` from Vercel API entries. A top-level
 * import crashes the function as FUNCTION_INVOCATION_FAILED (plain text) before
 * the handler can return JSON (same pattern as ENN-64 / ENN-76 on bookings).
 */
import type { App, AppOptions } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import firebaseConfig from '../../firebase-applet-config.json';

let app: App | undefined;
let auth: Auth | undefined;
let initPromise: Promise<Auth> | undefined;

function buildOptions(
  certFn: typeof import('firebase-admin/app').cert
): AppOptions {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    try {
      const serviceAccount = JSON.parse(raw) as {
        project_id?: string;
        client_email?: string;
        private_key?: string;
      };
      return {
        credential: certFn(serviceAccount as Parameters<typeof certFn>[0]),
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

/** Load firebase-admin only on first auth call (inside the request handler). */
export async function getAdminAuth(): Promise<Auth> {
  if (auth) return auth;
  if (!initPromise) {
    initPromise = (async () => {
      const [{ cert, getApps, initializeApp }, { getAuth }] = await Promise.all([
        import('firebase-admin/app'),
        import('firebase-admin/auth'),
      ]);
      if (!app) {
        app = getApps().length
          ? getApps()[0]!
          : initializeApp(buildOptions(cert));
      }
      auth = getAuth(app);
      return auth;
    })().catch((error) => {
      initPromise = undefined;
      throw error;
    });
  }
  return initPromise;
}
