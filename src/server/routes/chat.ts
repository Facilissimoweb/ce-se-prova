import {
  buildNinaSystemPrompt,
  createGroqChatCompletion,
  isGroqChatConfigured,
  resolveGroqChatModel,
  type GroqChatFailureCode,
  type GroqChatMessage,
  type NinaChatMode,
} from '../../lib/groqChat.ts';
import {
  looksLikeDeepMaggioriStudy,
  NINA_STUDIO_SOFT_LOCK_REPLY,
} from '../../lib/ninaChatKnowledge.ts';
import { verifyBearerToken } from '../authToken.ts';
import { json, type ApiResult } from '../http.ts';

const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_TURNS = 12;
const MAGGIORI_COURSE_SLUG = 'arcani-maggiori';
/** Mirrors `RESERVED_DEMO_UID` / demo token in reservedDemo (client-only module). */
const DEMO_RESERVED_UID = 'demo-reserved-enn103';
const DEMO_RESERVED_TOKEN = 'demo-reserved-token';

export type ChatStatusBody = {
  available: boolean;
  model?: string;
  /** Present when available=false so the FAB can show a clear reason. */
  reason?: 'missing_key';
};

export function getChatStatus(): ApiResult {
  const available = isGroqChatConfigured();
  if (!available) {
    return json(200, {
      available: false,
      reason: 'missing_key',
    } satisfies ChatStatusBody);
  }
  return json(200, {
    available: true,
    model: resolveGroqChatModel(),
  } satisfies ChatStatusBody);
}

function asHistory(
  raw: unknown
): Array<{ role: 'user' | 'assistant'; content: string }> {
  if (!Array.isArray(raw)) return [];
  const out: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (
      (role === 'user' || role === 'assistant') &&
      typeof content === 'string' &&
      content.trim()
    ) {
      out.push({ role, content: content.trim().slice(0, MAX_MESSAGE_CHARS) });
    }
    if (out.length >= MAX_HISTORY_TURNS) break;
  }
  return out;
}

function parseMode(raw: unknown): NinaChatMode {
  return raw === 'studio' ? 'studio' : 'welcome';
}

/** Local Area Riservata demo token — DEV / ALLOW_DIRECT_UNLOCK only. */
function isDevDemoStudioAuth(authorization: string | undefined): boolean {
  if (!authorization || !authorization.startsWith('Bearer ')) return false;
  const token = authorization.slice('Bearer '.length).trim();
  if (token !== DEMO_RESERVED_TOKEN) return false;
  return (
    process.env.NODE_ENV !== 'production' ||
    process.env.ALLOW_DIRECT_UNLOCK === 'true'
  );
}

/**
 * Server-side Maggiori entitlement for Nina Studio.
 * Same signal as gated blog / overview `isUnlocked` (active course_purchases).
 * Returns null when access is OK; otherwise an ApiResult to send.
 */
async function assertNinaStudioAccess(
  authorization: string | undefined
): Promise<ApiResult | null> {
  if (isDevDemoStudioAuth(authorization)) {
    return null;
  }

  const auth = await verifyBearerToken(authorization, 'required');
  if (!auth.ok) {
    return json(auth.status, {
      available: true,
      code: 'studio_auth',
      error:
        auth.error ||
        'Per Nina Studio accedi con Google (stesso account dell’Area Riservata).',
    });
  }

  const user = auth.user;
  if (!user?.uid) {
    return json(401, {
      available: true,
      code: 'studio_auth',
      error:
        'Per Nina Studio accedi con Google (stesso account dell’Area Riservata).',
    });
  }

  // Demo uid should not appear on production Firebase tokens; belt-and-suspenders.
  if (user.uid === DEMO_RESERVED_UID) {
    if (
      process.env.NODE_ENV !== 'production' ||
      process.env.ALLOW_DIRECT_UNLOCK === 'true'
    ) {
      return null;
    }
    return json(403, {
      available: true,
      code: 'studio_locked',
      error:
        'Nina Studio è riservata a chi ha acquistato Arcani Maggiori. Apri Corsi per il checkout.',
      checkoutPath: '/corsi#checkout',
    });
  }

  try {
    const { userOwnsCourse } = await import('../../db/repository.ts');
    const owns = await userOwnsCourse({
      uid: user.uid,
      email: user.email || '',
      displayName: user.name ?? null,
      courseSlug: MAGGIORI_COURSE_SLUG,
    });
    if (!owns) {
      return json(403, {
        available: true,
        code: 'studio_locked',
        error:
          'Nina Studio si sblocca con l’acquisto del corso Arcani Maggiori (stesso accesso dell’Area Riservata). Trovi il checkout su Corsi.',
        checkoutPath: '/corsi#checkout',
      });
    }
    return null;
  } catch (error) {
    console.error('Nina Studio entitlement check failed:', error);
    return json(503, {
      available: true,
      code: 'studio_entitlement',
      error:
        'Non riesco a verificare l’accesso a Nina Studio in questo momento. Riprova tra poco oppure apri l’Area Riservata.',
    });
  }
}

function chatFailureResponse(code: GroqChatFailureCode | string): ApiResult {
  switch (code) {
    case 'GROQ_CHAT_UNAVAILABLE':
      return json(503, {
        available: false,
        code: 'missing_key',
        error:
          'Nina non è ancora attiva: manca la chiave Groq su Vercel (TAROTITALIACHATGENERICAGROQ_API_KEY). Puoi scrivere a Maria Teresa su WhatsApp, Telegram o email.',
      });
    case 'GROQ_CHAT_AUTH':
      return json(502, {
        available: true,
        code: 'auth',
        error:
          'Nina non riesce ad autenticarsi con Groq. Verifica la chiave TAROTITALIACHATGENERICAGROQ_API_KEY su Vercel (Production e Preview), poi ridistribuisci. Nel frattempo usa WhatsApp, Telegram o email.',
      });
    case 'GROQ_CHAT_MODEL':
      return json(502, {
        available: true,
        code: 'model',
        error:
          'Il modello Groq non è disponibile. Controlla GROQ_CHAT_MODEL oppure il default del sito, poi riprova. Nel frattempo usa WhatsApp, Telegram o email.',
      });
    case 'GROQ_CHAT_PAYLOAD':
      return json(502, {
        available: true,
        code: 'payload',
        error:
          'La richiesta a Nina è troppo ampia per il modello. Prova una domanda più breve o specifica un solo Arcano, poi riprova. Nel frattempo usa WhatsApp, Telegram o email.',
      });
    case 'GROQ_CHAT_EMPTY':
      return json(502, {
        available: true,
        code: 'empty',
        error:
          'Nina non ha ricevuto una risposta utile. Riprova tra poco oppure usa WhatsApp, Telegram o email.',
      });
    default:
      return json(502, {
        available: true,
        code: 'upstream',
        error:
          'Non riesco a rispondere in questo momento. Riprova tra poco oppure usa WhatsApp, Telegram o email.',
      });
  }
}

export async function postChatMessage(params: {
  body: Record<string, unknown>;
  authorization?: string;
}): Promise<ApiResult> {
  const { body, authorization } = params;

  const message =
    typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return json(400, { error: 'Scrivi un messaggio per continuare.' });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return json(400, {
      error: `Il messaggio è troppo lungo (max ${MAX_MESSAGE_CHARS} caratteri).`,
    });
  }

  const mode = parseMode(body.mode);
  const history = asHistory(body.history);
  const lang =
    typeof body.lang === 'string' ? body.lang.trim().toLowerCase() : 'it';

  // Entitlement / soft-lock before Groq — works even if the key is missing.
  if (mode === 'studio') {
    const denied = await assertNinaStudioAccess(authorization);
    if (denied) return denied;
  } else if (looksLikeDeepMaggioriStudy({ message, history })) {
    // Deterministic soft lock — no Maggiori cards, no Groq spend on jailbreaks.
    return json(200, {
      available: true,
      mode: 'welcome',
      locked: true,
      code: 'studio_locked',
      reply: NINA_STUDIO_SOFT_LOCK_REPLY,
      checkoutPath: '/corsi#checkout',
    });
  }

  if (!isGroqChatConfigured()) {
    return chatFailureResponse('GROQ_CHAT_UNAVAILABLE');
  }

  const systemPrompt = buildNinaSystemPrompt({
    message,
    history,
    lang,
    mode,
  });
  const messages: GroqChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: message },
  ];

  try {
    const reply = await createGroqChatCompletion({ messages });
    return json(200, { available: true, mode, reply });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    if (code.startsWith('GROQ_CHAT_')) {
      return chatFailureResponse(code);
    }
    console.error('postChatMessage failed:', code || error);
    return chatFailureResponse('GROQ_CHAT_UPSTREAM');
  }
}
