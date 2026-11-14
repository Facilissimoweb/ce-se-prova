import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { cert, getApps, initializeApp, type AppOptions } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

type FirebaseAppletConfig = { projectId: string };

function loadFirebaseConfig(): FirebaseAppletConfig {
  const here = dirname(fileURLToPath(import.meta.url));
  const configPath = join(here, '../../firebase-applet-config.json');
  return JSON.parse(readFileSync(configPath, 'utf8')) as FirebaseAppletConfig;
}

const firebaseConfig = loadFirebaseConfig();

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
        projectId:
          serviceAccount.project_id || firebaseConfig.projectId,
      };
    } catch (error) {
      console.error(
        'FIREBASE_SERVICE_ACCOUNT_JSON non valido — fallback projectId only:',
        error
      );
    }
  }

  // Cloud Run / ADC: projectId alone is enough. On Vercel set FIREBASE_SERVICE_ACCOUNT_JSON.
  return { projectId: firebaseConfig.projectId };
}

if (!getApps().length) {
  initializeApp(buildOptions());
}

export const adminAuth = getAuth();
