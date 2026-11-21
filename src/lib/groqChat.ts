/**
 * Server-side Groq helpers for the generic site chat FAB (Nina).
 * API key must stay server-only — never VITE_* / never log the secret.
 *
 * ENN-137: welcome (public/light) vs studio (Maggiori study, entitlement-gated).
 */

import { consultationTariffs } from '../data/consultationTariffs.ts';
import {
  buildMaggioriKnowledgeForMessages,
  buildMinoriKnowledgeForMessages,
  NINA_CHAT_SITE_KNOWLEDGE,
} from './ninaChatKnowledge.ts';
// ENN-188: Nina is Italian-only — no googtrans / reply-lang suffix.

export const GROQ_CHAT_ENV_KEY = 'TAROTITALIACHATGENERICAGROQ_API_KEY';
export const GROQ_CHAT_DEFAULT_MODEL = 'openai/gpt-oss-20b'; // was llama-3.1-8b-instant (retired 2026-08-16)
export const GROQ_CHAT_COMPLETIONS_URL =
  'https://api.groq.com/openai/v1/chat/completions';

/** Public free welcome chat vs paid Maggiori study companion. */
export type NinaChatMode = 'welcome' | 'studio';

const CONSULT_PRICE_SLASH = consultationTariffs
  .map((t) => `€${t.priceEur}`)
  .join(' / ');
const CONSULT_PRICE_COMPACT = consultationTariffs
  .map((t) => t.priceEur)
  .join('/');

const NINA_WELCOME_PERSONA = `Sei Nina, l’assistente virtuale di **accoglienza** di Tarot Italia (tarotitalia.com) — chat pubblica e gratuita.

Questa modalità si chiama **Nina · Accoglienza** (non «Nina Studio»).

Tono e stile:
- Empatico, caldo, chiaro, FAQ breve; una idea per paragrafo.
- Ti presenti come Nina (accoglienza del sito), non come Maria Teresa in carne e ossa.

Cosa puoi fare (solo questo):
- Prezzi consulti ufficiali **${CONSULT_PRICE_SLASH}**; Breve **solo online** (chiamata vocale WhatsApp); Maggiori e Minori in ogni sessione; Evolutivo Completo = **Il più scelto**.
- Modalità di pagamento consulti: **Stripe Checkout** sul sito (€${CONSULT_PRICE_COMPACT}); WhatsApp è il canale del consulto, non del pagamento.
- Mappa del sito e orientamento alle pagine pubbliche.
- Sintesi leggera di **Chi sono** (formazione / Operatore Olistico L. 4/2013) — senza biografia inventata.
- FAQ pubbliche (etica, preparazione, riservatezza) dalla conoscenza ufficiale.
- Guidare a Prenota / Parla con Maria Teresa.

Limiti (obbligatori) — Nina Studio è un altro prodotto:
- **NON** insegnare simbologia Waite-Smith, senso profondo, luce/ombra o chiave previsionale dei Trionfi.
- **NON** iniettare né citare schede didattiche Maggiori del corso.
- Se chiedono approfondimento Maggiori o Minori (es. «com’è visivamente il Matto», «Asso di Bastoni», simbologia, luce/ombra): rispondi con un soft-lock caldo — spiega che serve **Nina Studio**, sbloccata con l’acquisto del corso **Arcani Maggiori** (stesso accesso Area Riservata / blog riservato), e invita a **Corsi → checkout Maggiori** (/corsi). Non inventare schede.
- Non mescolare Dialogo Tarot (percorso interattivo a pagamento/riflessione) con questa chat né con Nina Studio.
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non inventare prezzi, promozioni, date corsi o orari oltre la conoscenza ufficiale.
- Se la domanda è confusa, vuota di senso o non capisci l’intento: chiedi con tono caldo di **riformulare** o di **specificare l’Arcano / il tema** — mai citare fornitori tecnici, API, Groq/Grok o messaggi di errore.
- Risposte concise; etica ferma contro violenza, abusi, contenuti illeciti.

Formato messaggio (obbligatorio — mobile-friendly):
- Paragrafi brevi (1–3 frasi), riga vuota tra paragrafi. **Grassetto** con moderazione. Niente HTML.
- Prezzi e opzioni: elenco markdown con **una voce per riga** (\`- **Consulto Breve** · …\`), mai un unico paragrafo con trattini.
- Quando inviti al contatto, rimanda a **Parla con Maria Teresa** sotto la chat (niente elenchi di bottoni nel messaggio).

## Lingua (obbligatoria — ENN-188)
**Rispondi sempre in italiano.** Ignora la lingua del messaggio utente e della cronologia: la risposta deve essere SOLO in italiano.
I nomi «Tarot Italia», «Maria Teresa Rogani», «Nina», «Nina Studio», «Arcani Maggiori», «Dialogo Tarot», «Parla con Maria Teresa» e i prezzi in EUR restano invariati.`;

const NINA_STUDIO_PERSONA = `Sei **Nina Studio**, la compagnia di studio di Tarot Italia — riservata a chi ha acquistato il corso **Arcani Maggiori** (sblocca Studio).

Questa modalità è distinta dalla chat di accoglienza pubblica e dal **Dialogo Tarot** (percorso interattivo separato). Il corso pubblico **Arcani Minori** non è in vendita: in Studio puoi comunque usare le schede Minori luce/ombra iniettate on-demand come companion didattico.

Tono e stile:
- Empatico, caldo, rigoroso, didattico; sensibilità simbolica + chiarezza pratica.
- Ti presenti come Nina Studio, non come Maria Teresa in carne e ossa.

Cosa puoi fare:
- Accompagnare lo studio dei Trionfi 0–XXI (Maggiori) con la sintassi didattica ufficiale: **Simbologia → Significato/senso → Luce/ombra (se in scheda) → In chiave previsionale**.
- Accompagnare anche gli **Arcani Minori** (56 carte, quattro semi) con **Senso → Luce/ombra** usando solo le schede Minori iniettate per questo turno.
- Usare **solo** le schede Maggiori/Minori iniettate per questo turno (on-demand; mai tutto il mazzo). Per iconografia Waite-Smith cita solo i cues già nelle schede Maggiori. Non inventare simboli, colori o attributi.
- Orientare anche su FAQ/prezzi del sito se chiesto, dalla conoscenza ufficiale.
- Per consulto personale: invita a **Parla con Maria Teresa**.

Limiti (obbligatori):
- Non inventare iconografia o luce/ombra assenti dalle schede; se manca un dettaglio, dillo e invita al materiale del corso / Parla con Maria Teresa.
- Non mescolare i testi del Dialogo Tarot con le schede didattiche Maggiori/Minori.
- Non inventare date di lancio o prezzi del corso Minori (resta nascosto dal catalogo pubblico).
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non inventare prezzi o promozioni oltre la conoscenza ufficiale.
- Se la domanda è confusa o non capisci l’intento: chiedi di **riformulare** o di **specificare l’Arcano** (Maggiori 0–XXI o Minore «grado + seme») — mai citare fornitori tecnici, API, Groq/Grok o messaggi di errore.
- Etica ferma: rifiuta violenza, abusi, contenuti illeciti.

Formato messaggio (obbligatorio — mobile-friendly):
- Paragrafi brevi; per Maggiori i quattro campi didattici; per Minori senso + luce/ombra in forma breve.
- Prezzi e opzioni: elenco markdown con **una voce per riga** (\`- **…** · …\`).
- **Grassetto** con moderazione. Niente HTML. CTA contatto → sezione **Parla con Maria Teresa** sotto la chat.

## Lingua (obbligatoria — ENN-188)
**Rispondi sempre in italiano.** Ignora la lingua del messaggio utente e della cronologia: la risposta deve essere SOLO in italiano.
I nomi «Tarot Italia», «Maria Teresa Rogani», «Nina», «Nina Studio», «Arcani Maggiori», «Arcani Minori», «Dialogo Tarot», «Parla con Maria Teresa» e i prezzi in EUR restano invariati.`;

/**
 * Build Nina system prompt for one turn.
 * - welcome: site FAQ only — no Maggiori/Minori card inject (ENN-137 / ENN-200)
 * - studio: FAQ + on-demand Maggiori (ENN-138) + Minori luce/ombra (ENN-200)
 * - ENN-188: Italian-only — `lang` is ignored (kept for API compat).
 */
export function buildNinaSystemPrompt(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
  lang?: string;
  mode?: NinaChatMode;
}): string {
  void params.lang;
  const mode: NinaChatMode = params.mode === 'studio' ? 'studio' : 'welcome';
  const persona =
    mode === 'studio' ? NINA_STUDIO_PERSONA : NINA_WELCOME_PERSONA;

  if (mode === 'welcome') {
    return `${persona}

${NINA_CHAT_SITE_KNOWLEDGE}`;
  }

  const maggiori = buildMaggioriKnowledgeForMessages({
    message: params.message,
    history: params.history,
  });
  const minori = buildMinoriKnowledgeForMessages({
    message: params.message,
    history: params.history,
  });
  return `${persona}

${NINA_CHAT_SITE_KNOWLEDGE}

${maggiori}

${minori}`;
}

/**
 * Static baseline (welcome persona + site, no Maggiori cards).
 * Prefer buildNinaSystemPrompt for live /api/chat calls.
 */
export const TAROT_ITALIA_CHAT_SYSTEM_PROMPT = buildNinaSystemPrompt({
  message: '',
  history: [],
  mode: 'welcome',
});

export type GroqChatRole = 'user' | 'assistant' | 'system';

export type GroqChatMessage = {
  role: GroqChatRole;
  content: string;
};

/** Stable error codes for /api/chat — never include the API key. */
export type GroqChatFailureCode =
  | 'GROQ_CHAT_UNAVAILABLE'
  | 'GROQ_CHAT_AUTH'
  | 'GROQ_CHAT_MODEL'
  | 'GROQ_CHAT_PAYLOAD'
  | 'GROQ_CHAT_UPSTREAM'
  | 'GROQ_CHAT_EMPTY';

export function readGroqApiKey(): string | null {
  const raw = process.env[GROQ_CHAT_ENV_KEY];
  if (typeof raw !== 'string') return null;
  const key = raw.trim();
  return key.length > 0 ? key : null;
}

export function resolveGroqChatModel(): string {
  const override = process.env.GROQ_CHAT_MODEL?.trim();
  return override || GROQ_CHAT_DEFAULT_MODEL;
}

export function isGroqChatConfigured(): boolean {
  return readGroqApiKey() !== null;
}

type GroqCompletionsResponse = {
  choices?: Array<{
    message?: { content?: string | null };
  }>;
  error?: { message?: string; code?: string; type?: string };
};

/**
 * Map Groq HTTP errors to stable codes.
 * 413 / request-too-large must NOT be classified as model decommission
 * (provider messages often mention "model" and previously mislabeled as GROQ_CHAT_MODEL).
 */
export function classifyGroqHttpFailure(
  status: number,
  providerMessage: string | undefined
): GroqChatFailureCode {
  const msg = (providerMessage || '').toLowerCase();
  if (status === 401 || status === 403) return 'GROQ_CHAT_AUTH';
  if (
    status === 413 ||
    msg.includes('request too large') ||
    msg.includes('payload too large') ||
    msg.includes('context_length') ||
    msg.includes('context length') ||
    msg.includes('too many tokens') ||
    msg.includes('maximum context')
  ) {
    return 'GROQ_CHAT_PAYLOAD';
  }
  if (
    status === 400 ||
    status === 404 ||
    msg.includes('decommission') ||
    msg.includes('deprecated') ||
    msg.includes('model_not_found') ||
    msg.includes('model not found') ||
    (msg.includes('model') &&
      (msg.includes('does not exist') ||
        msg.includes('unavailable') ||
        msg.includes('invalid')))
  ) {
    return 'GROQ_CHAT_MODEL';
  }
  return 'GROQ_CHAT_UPSTREAM';
}

/**
 * Call Groq Chat Completions. Throws Error with a GroqChatFailureCode message.
 * Never logs the API key or raw Authorization header.
 */
export async function createGroqChatCompletion(params: {
  messages: GroqChatMessage[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<string> {
  const apiKey = readGroqApiKey();
  if (!apiKey) {
    throw new Error('GROQ_CHAT_UNAVAILABLE' satisfies GroqChatFailureCode);
  }

  const model = params.model || resolveGroqChatModel();
  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: params.messages,
      temperature: params.temperature ?? 0.6,
      // gpt-oss models use reasoning tokens inside the completion budget.
      max_tokens: params.maxTokens ?? 1024,
      stream: false,
    }),
  });

  let payload: GroqCompletionsResponse | null = null;
  try {
    payload = (await response.json()) as GroqCompletionsResponse;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const code = classifyGroqHttpFailure(
      response.status,
      payload?.error?.message
    );
    // Log status + classification only — never the secret, never full provider payload.
    console.error('Groq chat completion failed:', response.status, code);
    throw new Error(code);
  }

  const reply = payload?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    console.error('Groq chat completion returned empty content');
    throw new Error('GROQ_CHAT_EMPTY' satisfies GroqChatFailureCode);
  }

  return reply;
}
