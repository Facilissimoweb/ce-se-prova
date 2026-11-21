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
  looksLikeDeepMinoriStudy,
  ninaStudioSoftLockReply,
} from '../../lib/ninaChatKnowledge.ts';
import {
  looksLikeNinaProviderLeak,
  ninaSoftOutageCopy,
  ninaStudioGateCopy,
  ninaUnclearIntentReply,
} from '../../lib/ninaReplyLang.ts';
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
  authorization: string | undefined,
  lang?: string
): Promise<ApiResult | null> {
  const gate = ninaStudioGateCopy(lang);

  if (isDevDemoStudioAuth(authorization)) {
    return null;
  }

  const auth = await verifyBearerToken(authorization, 'required');
  if (!auth.ok) {
    // Prefer GT-localized gate copy (ENN-143); auth.error stays Italian for logs.
    if (auth.error) {
      console.warn('Nina Studio auth denied:', auth.error);
    }
    return json(auth.status, {
      available: true,
      code: 'studio_auth',
      error: gate.studioAuth,
    });
  }

  const user = auth.user;
  if (!user?.uid) {
    return json(401, {
      available: true,
      code: 'studio_auth',
      error: gate.studioAuth,
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
      error: gate.studioLockedDemo,
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
        error: gate.studioLocked,
        checkoutPath: '/corsi#checkout',
      });
    }
    return null;
  } catch (error) {
    console.error('Nina Studio entitlement check failed:', error);
    return json(503, {
      available: true,
      code: 'studio_entitlement',
      error: gate.studioEntitlement,
    });
  }
}

/**
 * ENN-152 — user-facing failure copy never names Groq/Grok or env keys.
 * Provider detail stays in console.error for Maria’s logs only.
 *
 * - empty/confused → 200 reply asking to rephrase (unclear intent)
 * - payload too large → soft “riformula / specifica un Arcano”
 * - real outage (key/auth/model/upstream) → short soft message
 */
function chatFailureResponse(
  code: GroqChatFailureCode | string,
  lang?: string
): ApiResult {
  const outage = ninaSoftOutageCopy(lang);

  switch (code) {
    case 'GROQ_CHAT_UNAVAILABLE':
      console.error(
        'Nina chat unavailable: missing TAROTITALIACHATGENERICAGROQ_API_KEY (Maria logs only)'
      );
      return json(503, {
        available: false,
        code: 'missing_key',
        error: outage.unavailable,
      });
    case 'GROQ_CHAT_AUTH':
      console.error(
        'Nina chat auth failure vs Groq (Maria logs only) — check TAROTITALIACHATGENERICAGROQ_API_KEY'
      );
      return json(502, {
        available: true,
        code: 'auth',
        error: outage.temporary,
      });
    case 'GROQ_CHAT_MODEL':
      console.error(
        'Nina chat model failure (Maria logs only) — check GROQ_CHAT_MODEL / default'
      );
      return json(502, {
        available: true,
        code: 'model',
        error: outage.temporary,
      });
    case 'GROQ_CHAT_PAYLOAD':
      return json(502, {
        available: true,
        code: 'payload',
        error: outage.tooBroad,
      });
    case 'GROQ_CHAT_EMPTY':
      // Treat empty/confused model output as unclear intent — Nina voice, not an outage banner.
      return json(200, {
        available: true,
        code: 'unclear',
        reply: ninaUnclearIntentReply(lang),
      });
    default:
      console.error('Nina chat upstream failure (Maria logs only):', code);
      return json(502, {
        available: true,
        code: 'upstream',
        error: outage.temporary,
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
  // ENN-188: force Italian — ignore client/googtrans lang (do not re-enable GT).
  const lang = 'it';

  // Entitlement / soft-lock before Groq — works even if the key is missing.
  if (mode === 'studio') {
    const denied = await assertNinaStudioAccess(authorization, lang);
    if (denied) return denied;
  } else if (
    looksLikeDeepMaggioriStudy({ message, history }) ||
    looksLikeDeepMinoriStudy({ message, history })
  ) {
    // Deterministic soft lock — no Maggiori/Minori cards, no Groq spend on jailbreaks.
    // ENN-200: Minori Studio knowledge is companion-only (Maggiori entitlement).
    return json(200, {
      available: true,
      mode: 'welcome',
      locked: true,
      code: 'studio_locked',
      reply: ninaStudioSoftLockReply(lang),
      checkoutPath: '/corsi#checkout',
    });
  }

  if (!isGroqChatConfigured()) {
    return chatFailureResponse('GROQ_CHAT_UNAVAILABLE', lang);
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
    if (looksLikeNinaProviderLeak(reply)) {
      console.error(
        'Nina reply looked like provider/API leak — replaced with unclear rephrase (Maria logs only)'
      );
      return json(200, {
        available: true,
        mode,
        code: 'unclear',
        reply: ninaUnclearIntentReply(lang),
      });
    }
    return json(200, { available: true, mode, reply });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    if (code.startsWith('GROQ_CHAT_')) {
      return chatFailureResponse(code, lang);
    }
    console.error('postChatMessage failed:', code || error);
    return chatFailureResponse('GROQ_CHAT_UPSTREAM', lang);
  }
}
