import {
  createGroqChatCompletion,
  isGroqChatConfigured,
  resolveGroqChatModel,
  TAROT_ITALIA_CHAT_SYSTEM_PROMPT,
  type GroqChatMessage,
} from '../../lib/groqChat.ts';
import { json, type ApiResult } from '../http.ts';

const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_TURNS = 12;

export type ChatStatusBody = {
  available: boolean;
  model?: string;
};

export function getChatStatus(): ApiResult {
  const available = isGroqChatConfigured();
  const body: ChatStatusBody = available
    ? { available: true, model: resolveGroqChatModel() }
    : { available: false };
  return json(200, body);
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

export async function postChatMessage(body: Record<string, unknown>): Promise<ApiResult> {
  if (!isGroqChatConfigured()) {
    return json(503, {
      available: false,
      error:
        'La chat assistita non è ancora attiva. Puoi scrivermi su WhatsApp, Telegram o email.',
    });
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
    if (code === 'GROQ_CHAT_UNAVAILABLE') {
      return json(503, {
        available: false,
        error:
          'La chat assistita non è ancora attiva. Puoi scrivermi su WhatsApp, Telegram o email.',
      });
    }
    console.error('postChatMessage failed:', code || error);
    return json(502, {
      available: true,
      error:
        'Non riesco a rispondere in questo momento. Riprova tra poco oppure usa WhatsApp, Telegram o email.',
    });
  }
}
