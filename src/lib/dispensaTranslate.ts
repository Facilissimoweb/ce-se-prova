/**
 * ENN-145 — Auto-translate Maggiori dispensa Markdown (IT → googtrans target)
 * via the same Groq key as Nina (`TAROTITALIACHATGENERICAGROQ_API_KEY`).
 * Intentionally does NOT import groqChat.ts (avoids Maggiori knowledge in reserved bundle).
 */

import {
  isNinaDefaultLang,
  ninaReplyLangLabel,
  normalizeNinaLang,
} from './ninaReplyLang.ts';

const GROQ_CHAT_ENV_KEY = 'TAROTITALIACHATGENERICAGROQ_API_KEY';
const GROQ_CHAT_COMPLETIONS_URL =
  'https://api.groq.com/openai/v1/chat/completions';
const GROQ_CHAT_DEFAULT_MODEL = 'openai/gpt-oss-20b';
const MAX_CHUNK_CHARS = 6000;

function readGroqApiKey(): string | null {
  const raw = process.env[GROQ_CHAT_ENV_KEY];
  if (typeof raw !== 'string') return null;
  const key = raw.trim();
  return key.length > 0 ? key : null;
}

function resolveGroqModel(): string {
  return process.env.GROQ_CHAT_MODEL?.trim() || GROQ_CHAT_DEFAULT_MODEL;
}

export function isDispensaTranslateConfigured(): boolean {
  return readGroqApiKey() !== null;
}

function splitMarkdownChunks(markdown: string): string[] {
  const text = markdown.trim();
  if (text.length <= MAX_CHUNK_CHARS) return [text];

  const parts: string[] = [];
  let rest = text;
  while (rest.length > MAX_CHUNK_CHARS) {
    const window = rest.slice(0, MAX_CHUNK_CHARS);
    const breakAt = Math.max(
      window.lastIndexOf('\n\n'),
      window.lastIndexOf('\n## '),
      window.lastIndexOf('\n### ')
    );
    const cut = breakAt > MAX_CHUNK_CHARS * 0.4 ? breakAt : MAX_CHUNK_CHARS;
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}

async function groqTranslateChunk(
  chunk: string,
  lang: string,
  label: string
): Promise<string> {
  const apiKey = readGroqApiKey();
  if (!apiKey) {
    throw new Error('GROQ_CHAT_UNAVAILABLE');
  }

  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: resolveGroqModel(),
      temperature: 0.15,
      max_tokens: 8192,
      stream: false,
      messages: [
        {
          role: 'system',
          content: `You are a professional translator for Tarot Italia course handouts.
Translate Italian Markdown into ${label} (\`${lang}\`).
Rules:
- Preserve Markdown structure (# ## ### headings, lists, **bold**, blank lines).
- Keep proper names unchanged: Tarot Italia, Maria Teresa Rogani, Arcani Maggiori, Waite-Smith, Nina, Dialogo Tarot.
- Keep Roman numerals and module numbers (0–XXI, Modulo 01, etc.).
- Do not add commentary, prefaces, or wrap the result in code fences.
- Output ONLY the translated Markdown.`,
        },
        { role: 'user', content: chunk },
      ],
    }),
  });

  type GroqPayload = {
    choices?: Array<{ message?: { content?: string | null } }>;
    error?: { message?: string };
  };
  let payload: GroqPayload | null = null;
  try {
    payload = (await response.json()) as GroqPayload;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    console.error(
      'Dispensa Groq translate failed:',
      response.status,
      payload?.error?.message || ''
    );
    throw new Error('GROQ_CHAT_UPSTREAM');
  }

  const reply = payload?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    throw new Error('GROQ_CHAT_EMPTY');
  }
  return reply;
}

/**
 * Translate Italian Markdown into the active Google Translate language.
 * When lang is Italian, returns the source unchanged (no Groq call).
 * Always expects Italian input — never curated EN markdown (ENN-154).
 */
export async function translateDispensaMarkdown(
  italianMarkdown: string,
  targetLang?: string | null
): Promise<{ markdown: string; lang: string; translated: boolean }> {
  const lang = normalizeNinaLang(targetLang);
  if (isNinaDefaultLang(lang)) {
    return { markdown: italianMarkdown, lang: 'it', translated: false };
  }

  const label = ninaReplyLangLabel(lang);
  const chunks = splitMarkdownChunks(italianMarkdown);
  const translatedChunks: string[] = [];

  for (const chunk of chunks) {
    translatedChunks.push(await groqTranslateChunk(chunk, lang, label));
  }

  return {
    markdown: translatedChunks.join('\n\n'),
    lang,
    translated: true,
  };
}

export type DispensaChromeFields = {
  title: string;
  subtitle: string;
  courseTitle: string;
};

/**
 * Translate PDF chrome (title / subtitle / course) from Italian so branded
 * HTML does not leave fixed IT headings when body is auto-translated.
 */
export async function translateDispensaChrome(
  chrome: DispensaChromeFields,
  targetLang?: string | null
): Promise<DispensaChromeFields> {
  const lang = normalizeNinaLang(targetLang);
  if (isNinaDefaultLang(lang)) return chrome;

  const label = ninaReplyLangLabel(lang);
  const payload = [
    `TITLE: ${chrome.title}`,
    `SUBTITLE: ${chrome.subtitle || ''}`,
    `COURSE: ${chrome.courseTitle || ''}`,
  ].join('\n');

  const reply = await groqTranslateChunk(payload, lang, label);
  const pick = (key: string, fallback: string) => {
    const re = new RegExp(`^${key}:\\s*(.*)$`, 'im');
    const m = reply.match(re);
    const value = m?.[1]?.trim();
    return value || fallback;
  };

  return {
    title: pick('TITLE', chrome.title),
    subtitle: pick('SUBTITLE', chrome.subtitle),
    courseTitle: pick('COURSE', chrome.courseTitle),
  };
}
