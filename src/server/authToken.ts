import type { DecodedIdToken } from 'firebase-admin/auth';
import { getAdminAuth } from '../lib/firebase-admin.ts';
import type { ApiUser } from './http.ts';

export function toApiUser(token: DecodedIdToken): ApiUser {
  return {
    uid: token.uid,
    email: token.email,
    name: typeof token.name === 'string' ? token.name : undefined,
  };
}

export async function verifyBearerToken(
  authorization: string | undefined,
  mode: 'required' | 'optional'
): Promise<
  | { ok: true; user: ApiUser | null }
  | { ok: false; status: number; error: string }
> {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    if (mode === 'required') {
      return {
        ok: false,
        status: 401,
        error:
          'Autenticazione richiesta per accedere all’Area Riservata.',
      };
    }
    return { ok: true, user: null };
  }

  const token = authorization.slice('Bearer '.length);

  let adminAuth;
  try {
    adminAuth = await getAdminAuth();
  } catch (error) {
    if (mode === 'optional') {
      return { ok: true, user: null };
    }
    console.error('Firebase Admin init failed:', error);
    return {
      ok: false,
      status: 503,
      error:
        'Servizio autenticazione non disponibile. Riprova tra poco.',
    };
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return { ok: true, user: toApiUser(decoded) };
  } catch (error) {
    if (mode === 'optional') {
      return { ok: true, user: null };
    }
    console.error('Error verifying Firebase ID token:', error);
    return {
      ok: false,
      status: 401,
      error: 'Sessione non valida o scaduta. Effettua nuovamente l’accesso.',
    };
  }
}
