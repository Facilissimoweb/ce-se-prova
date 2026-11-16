// src/lib/groqChat.ts
var GROQ_CHAT_ENV_KEY = "TAROTITALIACHATGENERICAGROQ_API_KEY";
var GROQ_CHAT_DEFAULT_MODEL = "llama-3.1-8b-instant";
var GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
var TAROT_ITALIA_CHAT_SYSTEM_PROMPT = `Sei l\u2019assistente di chat del sito Tarot Italia (tarotitalia.com), lo spazio di Maria Teresa Rogani, Operatore Olistico \xB7 Lettura Simbolica ed Evolutiva.

Tono e stile:
- Italiano chiaro, caldo, rispettoso e professionale.
- Linguaggio simbolico ed evolutivo dei Tarocchi, senza toni teatrali o sensazionalistici.
- Prima persona plurale del sito (\xABti accompagno\xBB, \xABpossiamo\xBB) oppure voce del brand; non inventare di essere Maria Teresa in carne e ossa se non serve: sei l\u2019assistente del sito.

Cosa puoi fare:
- Orientare su consulti, Dialogo Tarot, corsi, contatti e orari pubblici.
- Spiegare l\u2019approccio olistico (ascolto del presente + lettura delle possibili evoluzioni, rispetto del libero arbitrio).
- Suggerire di scrivere su WhatsApp, Telegram o email (info@tarotitalia.com) oppure di usare Prenota per un consulto.

Limiti (obbligatori):
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non dai diagnosi, promesse miracolose, n\xE9 \xABcertezze\xBB sul futuro.
- Non inventare prezzi, promozioni, link o orari non presenti nelle informazioni pubbliche; se non sai, invita a contattare lo studio.
- Non chiedere n\xE9 ripetere dati sensibili inutili; per prenotazioni guida verso Prenota / WhatsApp.
- Risposte concise (poche frasi), utili, senza elenchi lunghi se non richiesti.`;
function readGroqApiKey() {
  const raw = process.env[GROQ_CHAT_ENV_KEY];
  if (typeof raw !== "string") return null;
  const key = raw.trim();
  return key.length > 0 ? key : null;
}
function resolveGroqChatModel() {
  const override = process.env.GROQ_CHAT_MODEL?.trim();
  return override || GROQ_CHAT_DEFAULT_MODEL;
}
function isGroqChatConfigured() {
  return readGroqApiKey() !== null;
}
async function createGroqChatCompletion(params) {
  const apiKey = readGroqApiKey();
  if (!apiKey) {
    throw new Error("GROQ_CHAT_UNAVAILABLE");
  }
  const model = params.model || resolveGroqChatModel();
  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: params.messages,
      temperature: params.temperature ?? 0.6,
      max_tokens: params.maxTokens ?? 512,
      stream: false
    })
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok) {
    console.error(
      "Groq chat completion failed:",
      response.status,
      payload?.error?.message ? "(provider error)" : "(no body)"
    );
    throw new Error("GROQ_CHAT_UPSTREAM");
  }
  const reply = payload?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    console.error("Groq chat completion returned empty content");
    throw new Error("GROQ_CHAT_EMPTY");
  }
  return reply;
}

// src/server/http.ts
function json(status, body) {
  return { status, body };
}

// src/server/routes/chat.ts
var MAX_MESSAGE_CHARS = 2e3;
var MAX_HISTORY_TURNS = 12;
function getChatStatus() {
  const available = isGroqChatConfigured();
  const body = available ? { available: true, model: resolveGroqChatModel() } : { available: false };
  return json(200, body);
}
function asHistory(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = item.role;
    const content = item.content;
    if ((role === "user" || role === "assistant") && typeof content === "string" && content.trim()) {
      out.push({ role, content: content.trim().slice(0, MAX_MESSAGE_CHARS) });
    }
    if (out.length >= MAX_HISTORY_TURNS) break;
  }
  return out;
}
async function postChatMessage(body) {
  if (!isGroqChatConfigured()) {
    return json(503, {
      available: false,
      error: "La chat assistita non \xE8 ancora attiva. Puoi scrivermi su WhatsApp, Telegram o email."
    });
  }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return json(400, { error: "Scrivi un messaggio per continuare." });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return json(400, {
      error: `Il messaggio \xE8 troppo lungo (max ${MAX_MESSAGE_CHARS} caratteri).`
    });
  }
  const history = asHistory(body.history);
  const messages = [
    { role: "system", content: TAROT_ITALIA_CHAT_SYSTEM_PROMPT },
    ...history,
    { role: "user", content: message }
  ];
  try {
    const reply = await createGroqChatCompletion({ messages });
    return json(200, { available: true, reply });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (code === "GROQ_CHAT_UNAVAILABLE") {
      return json(503, {
        available: false,
        error: "La chat assistita non \xE8 ancora attiva. Puoi scrivermi su WhatsApp, Telegram o email."
      });
    }
    console.error("postChatMessage failed:", code || error);
    return json(502, {
      available: true,
      error: "Non riesco a rispondere in questo momento. Riprova tra poco oppure usa WhatsApp, Telegram o email."
    });
  }
}

// src/server/nodeHttp.ts
function sendJson(res, status, body) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    res.status(status).json(body);
    return;
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}
function readBodyObject(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === "string" && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

// src/server/apiEntries/chat.ts
var config = { runtime: "nodejs", maxDuration: 30 };
async function handler(req, res) {
  try {
    const method = (req.method || "GET").toUpperCase();
    if (method === "GET") {
      const result = getChatStatus();
      return sendJson(res, result.status, result.body);
    }
    if (method === "POST") {
      const result = await postChatMessage(readBodyObject(req));
      return sendJson(res, result.status, result.body);
    }
    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { error: "Metodo non consentito." });
  } catch (error) {
    console.error("api/chat handler failed:", error);
    return sendJson(res, 500, {
      error: "Internal server error",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}
export {
  config,
  handler as default
};
