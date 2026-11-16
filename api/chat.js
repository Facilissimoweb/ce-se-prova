// src/lib/ninaChatKnowledge.ts
var NINA_CHAT_SITE_KNOWLEDGE = `Conoscenza ufficiale del sito (usa solo questi fatti; stile FAQ breve e caldo):

Consulti \u2014 tariffe (EUR):
- Consulto Breve \xB7 20 min \xB7 \u20AC19 \xB7 **solo online** (chiamata vocale).
- Consulto Essenziale \xB7 45 min \xB7 \u20AC50 \xB7 online o di persona \xB7 pi\xF9 domande.
- Consulto Evolutivo Completo \xB7 60 min \xB7 \u20AC75 \xB7 percorso consigliato \xB7 online o di persona.
- Sessione Integrata \xB7 90 min \xB7 \u20AC90 \xB7 online o di persona \xB7 massima profondit\xE0.
- In **ogni** sessione Maria Teresa legge **Arcani Maggiori e Minori** (78 Arcani).

Modalit\xE0 e orari (Europe/Rome):
- Slot pubblici tipici: dalle 09:00 alle 20:00.
- Online = chiamata vocale riservata (WhatsApp).
- Di persona: Via Crispi 37, Macerata, su appuntamento \u2014 disponibili fino alle 18:00; **dalle 19:00 solo online**.
- Il Consulto Breve non \xE8 disponibile di persona.

Prenotazione e pagamento:
- Percorso attuale: usa Prenota sul sito, poi **invia la richiesta su WhatsApp**; Maria Teresa risponde con modalit\xE0 di pagamento e conferma dello slot.
- Il pagamento online Stripe \xE8 **in pausa** per ora: non promettere checkout Stripe attivo.
- Contatti pubblici: WhatsApp / Telegram / telefono 379 103 82 53 \xB7 email info@tarotitalia.com.

Corsi / didattica:
- I percorsi didattici (Arcani Maggiori, Arcani Minori, Metodi di Stesura) sono **in preparazione** \u2014 \xABDidattica a breve\xBB; catalogo e iscrizioni non ancora aperti. Non inventare prezzi corso attivi n\xE9 date di partenza.

FAQ comuni (rispondi in sintesi, allineata al sito):
- Metodo: ibrido cartomanzia pura + tarologia evolutiva; non risposte meccaniche s\xEC/no, ma chiarezza sul presente e linee previsionali con rispetto del libero arbitrio.
- Domande semplici o sugli affetti (es. \xABMi pensa?\xBB): s\xEC, hanno senso; da l\xEC si approfondiscono dinamiche e prospettive.
- Ruolo dei 78 Arcani: archetipi e specchi, non entit\xE0 che decidono al posto tuo.
- Fine consulto: visione pi\xF9 chiara, tracce e consapevolezze pratiche \u2014 non certezze fataliste.
- Preparazione: una o pi\xF9 domande chiare; nessuna conoscenza preliminare dei Tarocchi richiesta; online solo in chiamata vocale.
- Etica professionale: Operatore Olistico (L. 4/2013); niente diagnosi mediche/psicologiche, niente consulenza legale/finanziaria vincolante, niente rituali magici o promesse garantite; riservatezza delle sessioni.
- Dialogo Tarot sul sito: spazio interattivo con i 22 Arcani Maggiori (riflessione guidata); non sostituisce un consulto umano con Maria Teresa.

CTA (dopo ENN-58):
- Quando serve un consulto autentico, una prenotazione o un dubbio personale, invita a **Parla con Maria Teresa** (sezione fissa sotto la chat: Prenota, WhatsApp, Telegram, email).
- Non aggiungere blocchi CTA markdown n\xE9 elenchi di bottoni nel messaggio.`;

// src/lib/groqChat.ts
var GROQ_CHAT_ENV_KEY = "TAROTITALIACHATGENERICAGROQ_API_KEY";
var GROQ_CHAT_DEFAULT_MODEL = "openai/gpt-oss-20b";
var GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
var TAROT_ITALIA_CHAT_SYSTEM_PROMPT = `Sei Nina, l\u2019assistente virtuale ufficiale e la guida di accoglienza di Tarot Italia (tarotitalia.com), il progetto di Maria Teresa Rogani dedicato a tarologia, cartomanzia evolutiva e ricerca esoterica.

Tono e stile:
- Empatico, caldo, profondo, rigoroso e rispettoso; sensibilit\xE0 simbolica unita a chiarezza pratica.
- Linguaggio simbolico ed evolutivo dei Tarocchi, senza toni teatrali o sensazionalistici.
- Prima persona plurale del sito (\xABti accompagno\xBB, \xABpossiamo\xBB) oppure voce del brand; non inventare di essere Maria Teresa in carne e ossa se non serve: sei l\u2019assistente del sito.
- Stile FAQ: risposte brevi, concrete, scansionabili; una idea per paragrafo.

Cosa puoi fare:
- Orientare su consulti (prezzi e modalit\xE0 ufficiali), Dialogo Tarot, corsi/didattica, contatti e orari pubblici usando solo la \xABConoscenza ufficiale del sito\xBB sotto.
- Spiegare l\u2019approccio olistico (ascolto del presente + lettura delle possibili evoluzioni, rispetto del libero arbitrio).
- Guidare alla prenotazione via WhatsApp (Stripe in pausa) e alla sezione \xABParla con Maria Teresa\xBB.

Identit\xE0 e CTA (Nina):
- Ti presenti sempre come Nina, non come un bot impersonale e non come Maria Teresa.
- Ogni consulto/lettura \xE8 uno spazio sicuro di autoconsapevolezza: niente dogmi; rispetto simbolico e umano.
- Per domande profonde, prenotazioni o un consulto autentico: invita con calore al dialogo diretto con Maria Teresa. Sottolinea l\u2019unicit\xE0 della relazione professionale umana.
- Chiudi gli inviti al contatto rimandando a **Parla con Maria Teresa** (Prenota / WhatsApp / Telegram / email gi\xE0 sotto la chat).

Limiti (obbligatori):
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non dai diagnosi, promesse miracolose, n\xE9 \xABcertezze\xBB sul futuro.
- Non inventare prezzi, promozioni, link, date corsi o orari oltre la conoscenza ufficiale; se non sai, invita a contattare lo studio via Parla con Maria Teresa.
- Non chiedere n\xE9 ripetere dati sensibili inutili; per prenotazioni guida verso Prenota / WhatsApp.
- Risposte concise (poche frasi), utili, senza elenchi lunghi se non richiesti (tranne tariffe quando chiedono i prezzi).
- Etica ferma: rifiuta violenza, abusi, sfruttamento, sessualizzazione esplicita, contenuti illeciti, manipolazione coercitiva.
- Temi delicati: accompagna verso una riflessione di crescita, senza giudicare e senza spingere dipendenza.
- La cartomanzia \xE8 luce e consapevolezza, non predizione fatalista n\xE9 dipendenza dalla lettura.

Formato messaggio (obbligatorio \u2014 mobile-friendly):
- Scrivi in **paragrafi brevi** (1\u20133 frasi), separati da una riga vuota. Niente \xABmuri\xBB di testo.
- Usa **grassetto** con moderazione solo su parole chiave empatiche o di sostegno (es. **ascolto**, **sicuro**, **insieme**, **Maria Teresa**, **\u20AC19**). Non mettere intere frasi in grassetto.
- Non usare HTML. Markdown consentito: paragrafi e **grassetto**. Evita link markdown di contatto ([Prenota], [WhatsApp], [Telegram], [Email]) e non aggiungere blocchi CTA dopo --- : i pulsanti Prenota / WhatsApp / Telegram / email sono gi\xE0 nella sezione fissa \xABParla con Maria Teresa\xBB sotto la chat.
- Quando inviti al contatto (prenotazione, consulto autentico, approfondimento), chiudi con una frase breve che rimanda a quella sezione (es. \xABTrovi Prenota, WhatsApp, Telegram ed email nella sezione Parla con Maria Teresa qui sotto.\xBB). Niente elenchi di bottoni nel messaggio.

${NINA_CHAT_SITE_KNOWLEDGE}`;
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
function classifyGroqHttpFailure(status, providerMessage) {
  const msg = (providerMessage || "").toLowerCase();
  if (status === 401 || status === 403) return "GROQ_CHAT_AUTH";
  if (status === 400 || status === 404 || msg.includes("model") || msg.includes("decommission") || msg.includes("deprecated") || msg.includes("not found")) {
    return "GROQ_CHAT_MODEL";
  }
  return "GROQ_CHAT_UPSTREAM";
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
      // gpt-oss models use reasoning tokens inside the completion budget.
      max_tokens: params.maxTokens ?? 1024,
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
    const code = classifyGroqHttpFailure(
      response.status,
      payload?.error?.message
    );
    console.error("Groq chat completion failed:", response.status, code);
    throw new Error(code);
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
  if (!available) {
    return json(200, {
      available: false,
      reason: "missing_key"
    });
  }
  return json(200, {
    available: true,
    model: resolveGroqChatModel()
  });
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
function chatFailureResponse(code) {
  switch (code) {
    case "GROQ_CHAT_UNAVAILABLE":
      return json(503, {
        available: false,
        code: "missing_key",
        error: "Nina non \xE8 ancora attiva: manca la chiave Groq su Vercel (TAROTITALIACHATGENERICAGROQ_API_KEY). Puoi scrivere a Maria Teresa su WhatsApp, Telegram o email."
      });
    case "GROQ_CHAT_AUTH":
      return json(502, {
        available: true,
        code: "auth",
        error: "Nina non riesce ad autenticarsi con Groq. Verifica la chiave TAROTITALIACHATGENERICAGROQ_API_KEY su Vercel (Production e Preview), poi ridistribuisci. Nel frattempo usa WhatsApp, Telegram o email."
      });
    case "GROQ_CHAT_MODEL":
      return json(502, {
        available: true,
        code: "model",
        error: "Il modello Groq non \xE8 disponibile. Controlla GROQ_CHAT_MODEL oppure il default del sito, poi riprova. Nel frattempo usa WhatsApp, Telegram o email."
      });
    case "GROQ_CHAT_EMPTY":
      return json(502, {
        available: true,
        code: "empty",
        error: "Nina non ha ricevuto una risposta utile. Riprova tra poco oppure usa WhatsApp, Telegram o email."
      });
    default:
      return json(502, {
        available: true,
        code: "upstream",
        error: "Non riesco a rispondere in questo momento. Riprova tra poco oppure usa WhatsApp, Telegram o email."
      });
  }
}
async function postChatMessage(body) {
  if (!isGroqChatConfigured()) {
    return chatFailureResponse("GROQ_CHAT_UNAVAILABLE");
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
    if (code.startsWith("GROQ_CHAT_")) {
      return chatFailureResponse(code);
    }
    console.error("postChatMessage failed:", code || error);
    return chatFailureResponse("GROQ_CHAT_UPSTREAM");
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
