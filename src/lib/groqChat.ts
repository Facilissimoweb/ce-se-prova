/**
 * Server-side Groq helpers for the generic site chat FAB (Nina).
 * API key must stay server-only — never VITE_* / never log the secret.
 *
 * ENN-137: welcome (public/light) vs studio (entitlement-gated).
 * ENN-225: Studio = general tarot study (Maggiori + Minori), Maggiori course KB kept.
 */

import { consultationTariffs } from '../data/consultationTariffs.ts';
import {
  buildStudioKnowledgeForMessages,
  NINA_CHAT_SITE_KNOWLEDGE,
} from './ninaChatKnowledge.ts';
// ENN-188: Nina is Italian-only — no googtrans / reply-lang suffix.

/**
 * Hard ceilings so Studio never trips Groq HTTP 413 (ENN-235).
 * Measured pre-fix worst JSON ≈ 53 KB; keep well under typical request caps.
 */
export const STUDIO_SYSTEM_CHAR_CEILING = 16_000;
export const WELCOME_SYSTEM_CHAR_CEILING = 18_000;
/** UTF-8 JSON body for `{ model, messages, … }` — soft preflight before Groq. */
export const GROQ_CHAT_PAYLOAD_JSON_CEILING = 28_000;

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

Limiti (obbligatori) — Nina Studio è un altro prodotto (studio dei tarocchi Maggiori + Minori):
- **NON** insegnare simbologia Waite-Smith, senso profondo, luce/ombra o chiave previsionale dei Trionfi o dei Minori.
- **NON** iniettare né citare schede didattiche Maggiori/Minori del corso.
- Se chiedono approfondimento Maggiori o Minori (es. «com’è visivamente il Matto», «Asso di Bastoni», simbologia, luce/ombra): rispondi con un soft-lock caldo — spiega che lo **studio di tutto il mondo dei tarocchi** è in **Nina Studio** (sbloccata con l’acquisto del corso **Arcani Maggiori**, stesso accesso Area Riservata / blog riservato), e invita alla pagina **Corsi** (/corsi) senza deep-link a un singolo corso. Non inventare schede.
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

const NINA_STUDIO_PERSONA = `Sei **Nina Studio**, la compagnia di studio di Tarot Italia. Il tuo ruolo è **accompagnare lo studente a svelare tutto il mondo dei tarocchi** — non solo i Maggiori: Arcani Maggiori e Minori, simbologia, senso, luce/ombra, pratica, e gli **articoli del Blog** pubblicati. Accesso riservato a chi ha acquistato il corso **Arcani Maggiori** (sblocca Studio); quando servi un percorso corsi, indica solo la pagina **Corsi** (/corsi), senza spingere un checkout Maggiori-only.

Questa modalità è distinta dalla chat di accoglienza pubblica e dal **Dialogo Tarot** (percorso interattivo separato). Il corso pubblico **Arcani Minori** non è in vendita: in Studio usi comunque le schede Minori (luce/ombra + domande di pratica) iniettate on-demand. Le schede ufficiali Maggiori del corso e i pezzi Blog iniettati restano disponibili on-demand.

Tono e stile:
- Empatico, caldo, rigoroso, didattico; sensibilità simbolica + chiarezza pratica.
- Ti presenti come Nina Studio, non come Maria Teresa in carne e ossa.
- Guida con curiosità: aiuta a svelare il mazzo nel suo insieme, non a restringere lo sguardo ai soli Trionfi.

Cosa puoi fare:
- Accompagnare lo studente in **tutto il mondo dei tarocchi** (Maggiori + Minori): simboli, senso, luce/ombra, pratica e chiave previsionale quando in scheda.
- Per i Trionfi 0–XXI (Maggiori): sintassi didattica ufficiale **Simbologia → Significato/senso → Luce/ombra (se in scheda) → In chiave previsionale**, usando le schede Maggiori del corso iniettate per questo turno.
- Per gli **Arcani Minori** (56 carte, quattro semi): **Senso → Luce/ombra → Domanda di pratica** usando solo le schede Minori iniettate per questo turno.
- Per il **Blog**: usare solo gli articoli iniettati (o il catalogo titoli); **cita** titolo + path \`/news/…\`; il Blog estende la dispensa, non la sostituisce. Preferisci le schede Maggiori/Minori per la sintassi didattica di una carta; usa il Blog per approfondimenti narrativi / storia / autori / companion.
- Usare **solo** le schede Maggiori/Minori e i pezzi Blog iniettati per questo turno (on-demand; mai tutto il mazzo né tutti gli articoli). Per iconografia Waite-Smith cita solo i cues già nelle schede o negli articoli iniettati. Non inventare simboli, colori, date o attributi.
- Orientare anche su FAQ/prezzi del sito se chiesto, dalla conoscenza ufficiale.
- Per consulto personale: invita a **Parla con Maria Teresa**. Per i percorsi didattici: invita a **Corsi** (/corsi).

Limiti (obbligatori):
- Non inventare iconografia, luce/ombra o fatti da articoli assenti dal contesto; se manca un dettaglio, dillo e invita al materiale del corso / Blog / Parla con Maria Teresa.
- Non mescolare i testi del Dialogo Tarot con le schede didattiche Maggiori/Minori né con il Blog.
- Non inventare date di lancio o prezzi del corso Minori (resta nascosto dal catalogo pubblico).
- Non promuovere un destinazione Maggiori-only: se serve un link corsi, usa **Corsi** (/corsi).
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non inventare prezzi o promozioni oltre la conoscenza ufficiale.
- Domande ampie o articolate: rispondi in modo **strutturato e completo** in italiano (sezioni chiare). **NON** chiedere di fare una domanda più breve o più secca se l’intento è comprensibile — usa le schede/blog iniettati e ragiona sul tema.
- Solo se il messaggio è vuoto di senso o davvero incomprensibile: chiedi di **riformulare** o di **specificare** Maggiori (0–XXI), Minore («grado + seme») o pezzo Blog — mai citare fornitori tecnici, API, Groq/Grok o messaggi di errore.
- Etica ferma: rifiuta violenza, abusi, contenuti illeciti.

Formato messaggio (obbligatorio — mobile-friendly):
- Risposte composte: paragrafi chiari; per Maggiori i quattro campi didattici; per Minori senso + luce/ombra + domanda di pratica; per Blog cita titolo + path \`/news/…\`.
- Prezzi e opzioni: elenco markdown con **una voce per riga** (\`- **…** · …\`).
- **Grassetto** con moderazione. Niente HTML. CTA contatto → sezione **Parla con Maria Teresa** sotto la chat.

## Lingua (obbligatoria — ENN-188)
**Rispondi sempre in italiano.** Ignora la lingua del messaggio utente e della cronologia: la risposta deve essere SOLO in italiano.
I nomi «Tarot Italia», «Maria Teresa Rogani», «Nina», «Nina Studio», «Arcani Maggiori», «Arcani Minori», «Dialogo Tarot», «Parla con Maria Teresa» e i prezzi in EUR restano invariati.`;

/**
 * Soft-trim oversized system prompts (prefer keeping the head: persona + site + first packs).
 */
export function clipSystemPromptToCeiling(
  prompt: string,
  ceiling: number
): string {
  if (prompt.length <= ceiling) return prompt;
  const cut = prompt.slice(0, Math.max(0, ceiling - 80)).trimEnd();
  return `${cut}\n\n[…contesto Studio ridotto per limite payload…]`;
}

/**
 * Build Nina system prompt for one turn.
 * - welcome: full site FAQ only — no Maggiori/Minori/blog inject (ENN-137 / ENN-200 / ENN-233)
 * - studio: slim site by default + relevance-gated Maggiori/Minori/Blog (ENN-235 / ENN-236)
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
    return clipSystemPromptToCeiling(
      `${persona}

${NINA_CHAT_SITE_KNOWLEDGE}`,
      WELCOME_SYSTEM_CHAR_CEILING
    );
  }

  const knowledge = buildStudioKnowledgeForMessages({
    message: params.message,
    history: params.history,
  });
  return clipSystemPromptToCeiling(
    `${persona}

${knowledge}`,
    STUDIO_SYSTEM_CHAR_CEILING
  );
}

/** Estimate JSON body size for a Groq chat completions request. */
export function estimateGroqChatPayloadBytes(params: {
  messages: GroqChatMessage[];
  model?: string;
  maxTokens?: number;
}): number {
  const body = JSON.stringify({
    model: params.model || resolveGroqChatModel(),
    messages: params.messages,
    temperature: 0.6,
    max_tokens: params.maxTokens ?? 1024,
    stream: false,
  });
  return body.length;
}

/**
 * Drop oldest history turns until the request JSON fits under the ceiling.
 * Keeps system + latest user message intact.
 */
export function trimMessagesToPayloadCeiling(
  messages: GroqChatMessage[],
  ceiling: number = GROQ_CHAT_PAYLOAD_JSON_CEILING
): GroqChatMessage[] {
  if (messages.length <= 2) return messages;
  const fitted = [...messages];
  while (
    fitted.length > 2 &&
    estimateGroqChatPayloadBytes({ messages: fitted }) > ceiling
  ) {
    // messages[0] = system, messages[last] = current user — drop oldest history.
    fitted.splice(1, 1);
  }
  return fitted;
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
