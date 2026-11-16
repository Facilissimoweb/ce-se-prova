import {
  createGroqChatCompletion,
  isGroqChatConfigured,
  resolveGroqChatModel,
  TAROT_ITALIA_CHAT_SYSTEM_PROMPT,
  type GroqChatFailureCode,
  type GroqChatMessage,
} from '../../lib/groqChat.ts';
import { json, type ApiResult } from '../http.ts';

const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_TURNS = 12;

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

export async function postChatMessage(body: Record<string, unknown>): Promise<ApiResult> {
  if (!isGroqChatConfigured()) {
    return chatFailureResponse('GROQ_CHAT_UNAVAILABLE');
  }

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

  const history = asHistory(body.history);
  const messages: GroqChatMessage[] = [
    { role: 'system', content: TAROT_ITALIA_CHAT_SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: message },
  ];

  try {
    const reply = await createGroqChatCompletion({ messages });
    return json(200, { available: true, reply });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    if (code.startsWith('GROQ_CHAT_')) {
      return chatFailureResponse(code);
    }
    console.error('postChatMessage failed:', code || error);
    return chatFailureResponse('GROQ_CHAT_UPSTREAM');
  }
}
