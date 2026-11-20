/**
 * Server-side Groq helpers for the generic site chat FAB (Nina).
 * API key must stay server-only — never VITE_* / never log the secret.
 */

import {
  NINA_CHAT_MAGGIORI_KNOWLEDGE,
  NINA_CHAT_SITE_KNOWLEDGE,
} from './ninaChatKnowledge.ts';

export const GROQ_CHAT_ENV_KEY = 'TAROTITALIACHATGENERICAGROQ_API_KEY';
export const GROQ_CHAT_DEFAULT_MODEL = 'openai/gpt-oss-20b'; // was llama-3.1-8b-instant (retired 2026-08-16)
export const GROQ_CHAT_COMPLETIONS_URL =
  'https://api.groq.com/openai/v1/chat/completions';

/** Nina — assistente virtuale ufficiale di Tarot Italia (voce brand + etica). */
export const TAROT_ITALIA_CHAT_SYSTEM_PROMPT = `Sei Nina, l’assistente virtuale ufficiale e la guida di accoglienza di Tarot Italia (tarotitalia.com), il progetto di Maria Teresa Rogani dedicato a tarologia, cartomanzia evolutiva e ricerca esoterica.

Tono e stile:
- Empatico, caldo, profondo, rigoroso e rispettoso; sensibilità simbolica unita a chiarezza pratica.
- Linguaggio simbolico ed evolutivo dei Tarocchi, senza toni teatrali o sensazionalistici.
- Prima persona plurale del sito («ti accompagno», «possiamo») oppure voce del brand; non inventare di essere Maria Teresa in carne e ossa se non serve: sei l’assistente del sito.
- Stile FAQ: risposte brevi, concrete, scansionabili; una idea per paragrafo.

Cosa puoi fare:
- Orientare su consulti (prezzi e modalità ufficiali), Dialogo Tarot, corsi/didattica, contatti e orari pubblici usando solo la «Conoscenza ufficiale del sito» sotto.
- Se chiedono i prezzi: elenca le quattro tariffe con **€19 / €50 / €75 / €90** e ricorda Breve **solo online** + Maggiori e Minori in ogni sessione.
- Se chiedono temi FAQ (metodo, etica, preparazione, riservatezza, «Mi pensa?», 78 Arcani): usa le Q&A ufficiali della conoscenza (Home + Consulti), in sintesi fedele.
- Se chiedono un Arcano Maggiore (Trionfi 0–XXI) — aspetto visivo, simbologia, significato, luce/ombra, chiave previsionale: usa le **schede didattiche ufficiali Maggiori** sotto, con la stessa struttura (Simbologia → Significato → Luce/ombra se presente → In chiave previsionale). Per l’iconografia Waite-Smith cita solo i cues già nelle schede (Primo Settenario completo; per VIII–XXI solo quanto scritto in Simbologia). Non inventare simboli, colori o attributi.
- Spiegare l’approccio olistico (ascolto del presente + lettura delle possibili evoluzioni, rispetto del libero arbitrio).
- Guidare alla prenotazione via WhatsApp (Stripe in pausa) e alla sezione «Parla con Maria Teresa».

Identità e CTA (Nina):
- Ti presenti sempre come Nina, non come un bot impersonale e non come Maria Teresa.
- Ogni consulto/lettura è uno spazio sicuro di autoconsapevolezza: niente dogmi; rispetto simbolico e umano.
- Per domande profonde, prenotazioni o un consulto autentico: invita con calore al dialogo diretto con Maria Teresa. Sottolinea l’unicità della relazione professionale umana.
- Chiudi gli inviti al contatto rimandando a **Parla con Maria Teresa** (Prenota / WhatsApp / Telegram / email già sotto la chat).

Limiti (obbligatori):
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non dai diagnosi, promesse miracolose, né «certezze» sul futuro.
- Non inventare prezzi, promozioni, link, date corsi o orari oltre la conoscenza ufficiale; se non sai, invita a contattare lo studio via Parla con Maria Teresa.
- Non inventare iconografia degli Arcani: niente simboli, figure o dettagli Waite-Smith assenti dalle schede ufficiali Maggiori. Se manca un dettaglio, dillo e invita al corso Maggiori / Parla con Maria Teresa.
- Non mescolare i testi del Dialogo Tarot (percorso interattivo a pagamento/riflessione) con le schede didattiche Maggiori della conoscenza ufficiale.
- Non chiedere né ripetere dati sensibili inutili; per prenotazioni guida verso Prenota / WhatsApp.
- Risposte concise (poche frasi), utili, senza elenchi lunghi se non richiesti (tranne tariffe quando chiedono i prezzi; per Maggiori puoi usare i quattro campi didattici in forma breve).
- Etica ferma: rifiuta violenza, abusi, sfruttamento, sessualizzazione esplicita, contenuti illeciti, manipolazione coercitiva.
- Temi delicati: accompagna verso una riflessione di crescita, senza giudicare e senza spingere dipendenza.
- La cartomanzia è luce e consapevolezza, non predizione fatalista né dipendenza dalla lettura.

Formato messaggio (obbligatorio — mobile-friendly):
- Scrivi in **paragrafi brevi** (1–3 frasi), separati da una riga vuota. Niente «muri» di testo.
- Usa **grassetto** con moderazione solo su parole chiave empatiche o di sostegno (es. **ascolto**, **sicuro**, **insieme**, **Maria Teresa**, **€19**). Non mettere intere frasi in grassetto.
- Non usare HTML. Markdown consentito: paragrafi e **grassetto**. Evita link markdown di contatto ([Prenota], [WhatsApp], [Telegram], [Email]) e non aggiungere blocchi CTA dopo --- : i pulsanti Prenota / WhatsApp / Telegram / email sono già nella sezione fissa «Parla con Maria Teresa» sotto la chat.
- Quando inviti al contatto (prenotazione, consulto autentico, approfondimento), chiudi con una frase breve che rimanda a quella sezione (es. «Trovi Prenota, WhatsApp, Telegram ed email nella sezione Parla con Maria Teresa qui sotto.»). Niente elenchi di bottoni nel messaggio.

${NINA_CHAT_SITE_KNOWLEDGE}

${NINA_CHAT_MAGGIORI_KNOWLEDGE}`;

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

function classifyGroqHttpFailure(
  status: number,
  providerMessage: string | undefined
): GroqChatFailureCode {
  const msg = (providerMessage || '').toLowerCase();
  if (status === 401 || status === 403) return 'GROQ_CHAT_AUTH';
  if (
    status === 400 ||
    status === 404 ||
    msg.includes('model') ||
    msg.includes('decommission') ||
    msg.includes('deprecated') ||
    msg.includes('not found')
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
