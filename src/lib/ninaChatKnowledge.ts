/**
 * Official-site knowledge for Nina (Groq system prompt).
 * Mirror of public copy from siteContent / booking / corsi — do not invent FAQ or prices.
 * Maggiori cards: compiled FROM Area Personale didactic sources (ENN-147) —
 * dispensa + schede visive + approfondimenti — not a hand KB, not Dialogo Tarot.
 * Minori cards: compiled FROM Maria’s packs (ENN-200 luce/ombra + ENN-201 domande) —
 * content/nina/arcani-minori-luce-ombra.md + arcani-minori-domande.md —
 * Studio companion only; public Minori catalog stays hidden.
 * Blog pack: compiled FROM content/blog draft:false posts (ENN-233) — Studio only;
 * gated Maggiori bodies included because Studio unlock = Maggiori entitlement.
 * Inject only matched cards/posts per request (ENN-138 / ENN-200 / ENN-201 / ENN-233).
 * When knowledge changes: `npm run build:blog` + nina card/blog scripts, then `npm run build:api`.
 */

import {
  consultationTariffs,
  formatConsultTariffsMarkdownDetails,
  formatConsultTariffsMarkdownList,
} from '../data/consultationTariffs.ts';
import {
  NINA_BLOG_CATALOG,
  NINA_BLOG_POSTS_GENERATED,
  type NinaBlogPostGenerated,
} from '../data/ninaBlogPosts.generated.ts';
import { NINA_MAGGIORI_CARDS_GENERATED } from '../data/ninaMaggioriCards.generated.ts';
import {
  NINA_MINORI_CARDS_GENERATED,
  NINA_MINORI_DOMANDE_INTRO,
  NINA_MINORI_INTRO,
  NINA_MINORI_PRATICA,
  NINA_MINORI_SUIT_FRAMES,
  type NinaMinoriCardGenerated,
  type NinaMinoriSuitFrameGenerated,
} from '../data/ninaMinoriCards.generated.ts';
import { ninaStudioSoftLockReply } from './ninaReplyLang.ts';

const CONSULT_PRICE_LIST = consultationTariffs
  .map((t) => `€${t.priceEur}`)
  .join(' / ');

/** Fatti pubblici e FAQ del sito (copy ufficiale, fedele). */
export const NINA_CHAT_SITE_KNOWLEDGE = `Conoscenza ufficiale del sito (fonte: copy pubblico Tarot Italia — usa SOLO questi fatti; stile FAQ breve e caldo; per prezzi e FAQ cita le risposte qui sotto, senza inventare):

## Consulti — introduzione ufficiale
Quattro durate calibrate per profondità differenti. In ogni sessione leggo Arcani Maggiori e Minori: online in chiamata vocale riservata, oppure di persona a Macerata (Via Crispi 37) su appuntamento — il Consulto Breve è solo online (chiamata vocale WhatsApp).

Accoglienza: Che tu arrivi con una domanda immediata e sincera — anche semplice o legata agli affetti, come «Mi pensa?» — o con il bisogno di fare chiarezza su un passaggio complesso, i miei consulti nascono per trasformare il caos in cosmos. Integro la lettura viva della cartomanzia pura con la tarologia evolutiva attraverso tutti i 78 Arcani, Maggiori e Minori.

Non è richiesta alcuna conoscenza preliminare delle carte: ti guido passo dopo passo tra archetipi, motivazioni e chiavi di lettura pratiche perché tu possa uscire con una visione rinnovata e riprendere in mano le redini del tuo percorso. I consulti online si svolgono esclusivamente in modalità chiamata vocale, per favorire ascolto profondo e concentrazione.

Etica consulti: ogni consulto offre una lettura chiara del presente e delle tendenze future nel rispetto del libero arbitrio. Nessuna promessa miracolistica o sostituzione di pareri medici e legali.

## Tariffe consulti (prezzi correnti, EUR, IVA inclusa)
In **ogni** sessione Maria Teresa legge **Arcani Maggiori e Minori**.
Quando elenchi le tariffe in chat, usa SEMPRE un elenco markdown con **una riga per voce** (mai un paragrafo unico con trattini):

${formatConsultTariffsMarkdownList()}

Dettaglio (usa solo se chiesto; in elenco resta una riga per voce):
${formatConsultTariffsMarkdownDetails()}

## Modalità, orari e sedute (Europe/Rome)
- Slot pubblici tipici: dalle 09:00 alle 20:00.
- Online = chiamata vocale riservata (WhatsApp).
- Di persona: Via Crispi 37, 62100 Macerata, su appuntamento — disponibili fino alle 18:00; **dalle 19:00 solo online**.
- Il **Consulto Breve** non è disponibile di persona (solo chiamata vocale WhatsApp).

## Prenotazione e pagamento (copy Prenota)
Scegli durata, giorno e orario: in ogni sessione Maria Teresa legge Arcani Maggiori e Minori. Paga online con Stripe Checkout sul sito; il consulto si svolge su WhatsApp. Il Consulto Breve è solo online.

- Contatti pubblici: WhatsApp / Telegram / telefono 379 103 82 53 · email info@tarotitalia.com.
- Checkout Stripe attivo per i consulti (${CONSULT_PRICE_LIST}). WhatsApp = canale del consulto, non del pagamento.

## Corsi / didattica (copy ufficiale pagina Corsi)
Questa settimana in offerta pubblica solo Arcani Maggiori a € 69 (listino € 149 barrato; prima € 190). Include Nina Studio (chat riservata di studio) a vita. Arcani Minori e Metodi di Stesura non sono in vendita pubblica — restano in preparazione (nascosti dal catalogo pubblico).
Catalogo, programma e form iscrizione Maggiori su /corsi. Rate Klarna possibili in Stripe Checkout; pagamento sicuro via Stripe.
Non inventare date di partenza, prezzi Minori/Metodi, o promozioni non presenti sul sito; per prezzi e iscrizione rinvia alla pagina Corsi o a «Parla con Maria Teresa».

## FAQ Home — Domande Frequenti su Approccio ed Etica
(Rispondi fedelmente a queste Q&A quando pertinenti.)

D1. In che modo i Tarocchi di Tarot Italia leggono il presente e prevedono il futuro?
R1. Nel metodo di Tarot Italia gli Arcani illuminano le dinamiche attuali e tracciano le linee previsionali degli sviluppi futuri. La lettura previsionale individua scenari, opportunità e snodi in arrivo rispettando sempre il tuo libero arbitrio, così da permetterti scelte lucide e consapevoli.

D2. Qual è l’ambito di un Operatore Olistico ai sensi della Legge 4/2013?
R2. Maria Teresa Rogani opera come Operatore Olistico disciplinato ai sensi della Legge 4/2013 sulle professioni non organizzate. La consulenza offre ascolto empatico, lettura simbolica e previsionale e stimoli di consapevolezza interiore, senza mai sostituirsi a medici, psicoterapeuti, psichiatri o consulenti legali.

D3. Quali richieste sono escluse per etica professionale?
R3. Non vengono formulate diagnosi o indicazioni sanitarie, pronostici su patologie o decessi, né consulenze legali o finanziarie vincolanti. Sono inoltre categoricamente esclusi rituali magici, legamenti o promesse di risultati garantiti.

D4. Come prepararsi a un consulto da 20, 45, 60 o 90 minuti?
R4. È sufficiente portare una o più domande chiare sul tuo percorso presente o sugli sviluppi futuri — in ambito professionale, creativo o relazionale. I consulti online avvengono esclusivamente in chiamata vocale riservata: dopo la prenotazione riceverai tutte le indicazioni per collegarti oppure l’indirizzo di Via Crispi 37 a Macerata per l’incontro di persona.

D5. I temi condivisi durante l’incontro restano confidenziali?
R5. Sì. Ogni dialogo si svolge nel rispetto della massima riservatezza professionale: le sessioni non vengono registrate né condivise con terzi e i dati di prenotazione sono trattati esclusivamente per gestire l’appuntamento.

## FAQ Consulti — Domande sul Metodo e sullo Svolgimento del Consulto
(Rispondi fedelmente a queste Q&A quando pertinenti.)

D1. Che differenza c’è tra la cartomanzia tradizionale e il mio metodo?
R1. La cartomanzia tradizionale cerca spesso risposte meccaniche e a tenuta stagna (sì, no, quando). Il mio approccio è un ibrido che integra sia la cartomanzia pura che la tarologia evolutiva: utilizzo i 78 Arcani (tra Maggiori e Minori) non per inchiodarti a un futuro immobile, ma per trasformare il caos in cosmos, dando alla stesa una piega molto più riflessiva e profonda rispetto all’immediatezza di una risposta statica.

D2. Ha senso fare una domanda semplice o legata agli affetti, come «Mi pensa?»
R2. Assolutamente sì. Spesso si parte da un interrogativo immediato o impulsivo tipico della cartomanzia per scavare in profondità. Da una domanda sugli affetti inizio a tracciare dinamiche, motivazioni e chiavi di lettura per nulla banali, restituendo alla situazione una prospettiva riflessiva e la sua reale complessità.

D3. Qual è il ruolo dei 78 Arcani durante una sessione?
R3. I 78 Arcani — comprensivi sia di Arcani Maggiori che di Minori — agiscono come icone, archetipi e specchi della tua interiorità. Non sono entità che decidono per te, ma messaggeri e narratori che ti accompagnano nell’esplorazione della tua narrazione più autentica, in uno spazio sicuro e privo di giudizio.

D4. Cosa devo aspettarmi alla fine di una consulenza?
R4. Di uscire con una visione rinnovata. Più che risposte preconfezionate, riceverai tracce, chiavi di lettura e consapevolezze pratiche per rimettere ordine nel tuo vissuto e riprendere in mano le redini del tuo percorso con maggiore chiarezza.

D5. Come si svolge la lettura, e mi serve una conoscenza preliminare?
R5. Non è richiesta alcuna conoscenza preliminare della simbologia o del linguaggio degli arcani. Lavoro integrando la lettura viva della cartomanzia con un percorso di riflessione profonda: ti accolgo esattamente dove ti trovi, guidandoti passo dopo passo attraverso le immagini per decifrare la tua storia. I consulti online avvengono esclusivamente in modalità chiamata vocale.

## Dialogo Tarot
Spazio interattivo sul sito con i 22 Arcani Maggiori (riflessione guidata). Non sostituisce un consulto umano con Maria Teresa. Non mescolare i testi del Dialogo Tarot con le schede didattiche Maggiori: sono percorsi distinti. Dialogo Tarot ≠ Nina Studio ≠ chat di accoglienza.

## Mappa del sito (orientamento)
- **Home** — panoramica, consulti, didattica
- **Chi sono** — percorso di Maria Teresa Rogani
- **Consulti** — tariffe e modalità
- **Dialogo Tarot** — percorso interattivo 22 Maggiori (separato da Nina)
- **Corsi** — Maggiori €69 (listino €149 barrato) + Nina Studio; checkout su /corsi. Minori/Metodi nascosti (in preparazione).
- **Blog / News** — articoli (alcuni approfondimenti Maggiori riservati ai corsisti)
- **Contatti** — email, telefono, mappa Macerata
- **Prenota** — slot + pagamento Stripe Checkout; consulto su WhatsApp
- **Area Riservata** — dispense e percorsi dopo acquisto / accesso Google

## Chi sono (sintesi leggera)
Maria Teresa Rogani · Operatore Olistico (L. 4/2013). Formazione in comunicazione visiva / Accademia di Belle Arti; sguardo su composizione, colore e simboli nel contesto storico e iconografico. Integra tarologia esoterica, tradizione Rider-Waite-Smith e pratiche olistiche di ascolto. Per il racconto completo: pagina **Chi sono**.

## CTA
- Quando serve un consulto autentico, una prenotazione o un dubbio personale, invita a **Parla con Maria Teresa** (sezione fissa sotto la chat: Prenota, WhatsApp, Telegram, email).
- Non aggiungere blocchi CTA markdown né elenchi di bottoni nel messaggio.`;

/**
 * Slim site stub for Nina Studio (ENN-235): prices + booking + CTA only.
 * Full FAQ (~12k) is injected only when the ask looks like site/prezzi/FAQ.
 */
export const NINA_CHAT_SITE_KNOWLEDGE_STUDIO_SLIM = `Conoscenza ufficiale del sito (sintesi Studio — usa SOLO questi fatti; per FAQ lunghe rinvia alle pagine pubbliche):

## Tariffe consulti (EUR, IVA inclusa)
In ogni sessione Maria Teresa legge Arcani Maggiori e Minori. Elenco markdown, una riga per voce:

${formatConsultTariffsMarkdownList()}

- Online = chiamata vocale WhatsApp; di persona Via Crispi 37, Macerata (Breve solo online).
- Pagamento consulti: Stripe Checkout sul sito; WhatsApp = canale del consulto, non del pagamento.
- Contatti: 379 103 82 53 · info@tarotitalia.com.

## Corsi
Arcani Maggiori in offerta pubblica (€69 / listino €149) include Nina Studio a vita. Minori/Metodi nascosti (in preparazione). Link: **/corsi**.

## Orientamento
Dialogo Tarot ≠ Nina Studio ≠ chat di accoglienza. CTA: **Parla con Maria Teresa** sotto la chat (niente elenchi di bottoni nel messaggio).`;

function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const SITE_FAQ_ASK_CUES =
  /\b(prezz\w*|tariff\w*|cost\w*|euro|faq|domande?\s+frequent|prenot\w*|orari|pagamento|stripe|whatsapp|telegram|consult\w*|chi\s+sono|etica|riservatezz\w*|macerata|via\s+crispi|corsi?\b|klarna)\b/;

/** True when Studio should load the full public FAQ instead of the slim stub. */
export function looksLikeSiteFaqAsk(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
}): boolean {
  const parts = [params.message];
  for (const turn of (params.history ?? []).slice(-2)) {
    if (typeof turn.content === 'string' && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  return SITE_FAQ_ASK_CUES.test(normalizeForMatch(parts.join('\n')));
}

/** Site knowledge block for the current Studio turn (slim by default). */
export function selectSiteKnowledgeForStudio(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
}): string {
  return looksLikeSiteFaqAsk(params)
    ? NINA_CHAT_SITE_KNOWLEDGE
    : NINA_CHAT_SITE_KNOWLEDGE_STUDIO_SLIM;
}

/** One-liner when no Maggiori/Minori/blog pack is loaded this turn (ENN-235). */
const NINA_STUDIO_ON_DEMAND_HINT = `## Materiale Studio (on-demand)
Schede **Maggiori** (0–XXI), **Minori** (luce/ombra + domanda) e pezzi **Blog** (\`/news/…\`) si caricano nominando carta, seme+grado o articolo. Non inventare Waite o fatti assenti dal contesto.`;

export type NinaMaggioriCard = {
  id: number;
  roman: string;
  title: string;
  /** Keywords / aliases for on-demand matching (lowercase, no accents required). */
  aliases: string[];
  /** Compact card body: simbologia → senso → luce/ombra|pratica → previsione. */
  body: string;
};

/**
 * Compact Maggiori cards (Trionfi 0–XXI) compiled from Area Personale sources
 * (ENN-147). See scripts/build-nina-maggiori-cards.ts.
 */
export const NINA_MAGGIORI_CARDS: readonly NinaMaggioriCard[] =
  NINA_MAGGIORI_CARDS_GENERATED;

/** Always-on Maggiori framing (no per-card bodies) — keeps payload small. */
export const NINA_CHAT_MAGGIORI_FRAME = `## Arcani Maggiori — schede didattiche ufficiali (Trionfi 0–XXI)

Fonte: dispensa Area Personale Tarot Italia + schede visive Waite-Smith (0–VII) + approfondimenti Terzo Settenario dove presenti. Usa SOLO le schede iniettate sotto (se presenti). Non inventare iconografia Waite assente. Non mescolare con Dialogo Tarot.

Struttura risposta (quando chiedono un Arcano Maggiore — aspetto visivo, simbologia, significato, luce/ombra, previsione):
1. **Simbologia** (+ cues Waite se in scheda)
2. **Significato / senso**
3. **Luce / ombra** o **Pratica corso** — solo se presenti; altrimenti non inventarli
4. **In chiave previsionale**
Tono: caldo, rigoroso, Tarot Italia. Per approfondimenti: **Parla con Maria Teresa** / corso Maggiori.

Architettura: 22 lame (0–XXI). Primo (0–VII) identità; Secondo (VIII–XIV) prova etica; Terzo (XV–XXI) Ombra e compiutezza.
Elenco: 0 Matto · I Bagatto · II Papessa · III Imperatrice · IV Imperatore · V Papa · VI Amanti · VII Carro · VIII Giustizia · IX Eremita · X Ruota · XI Forza · XII Appeso · XIII Morte · XIV Temperanza · XV Diavolo · XVI Torre · XVII Stelle · XVIII Luna · XIX Sole · XX Giudizio · XXI Mondo.
Se manca la scheda dettagliata nel contesto, chiedi quale Trionfo (0–XXI) e non inventare dettagli Waite.`;

/** Soft default; Studio budget may tighten further when blog also hits. */
const MAX_INJECTED_CARDS = 3;
/** Hard Studio ceiling when Maggiori + blog/minori compete for tokens (ENN-235). */
const MAX_INJECTED_CARDS_BUDGETED = 2;

/**
 * Soft-lock copy when welcome chat asks for deep Maggiori study (ENN-137).
 * ENN-188: Italian-only (lang ignored).
 */
export const NINA_STUDIO_SOFT_LOCK_REPLY = ninaStudioSoftLockReply('it');

export { ninaStudioSoftLockReply };

const DEEP_STUDY_CUES =
  /\b(simbolog\w*|iconograf\w*|waite|smith|luce\s*\/?\s*ombra|ombra|prevision\w*|senso\s+profond|significat\w*|scheda\s+visiv|trionf\w*|arcano\s+maggior|maggiori\s+didatt)/;

/**
 * Match Trionfi mentioned in user/history text (aliases + roman/id cues).
 * Caps at MAX_INJECTED_CARDS (or `maxCards`) to keep Groq payload under limit.
 * Aliases use word-ish boundaries so «papa» does not match «papessa».
 */
export function selectMaggioriCardsForText(
  text: string,
  maxCards: number = MAX_INJECTED_CARDS
): NinaMaggioriCard[] {
  const hay = normalizeForMatch(text);
  if (!hay.trim()) return [];
  const cap = Math.max(1, Math.min(maxCards, MAX_INJECTED_CARDS));

  const matched: NinaMaggioriCard[] = [];
  for (const card of NINA_MAGGIORI_CARDS) {
    const hit = card.aliases.some((alias) => {
      const needle = normalizeForMatch(alias);
      if (!needle) return false;
      // Multi-word aliases: substring is fine after NFD normalize.
      if (needle.includes(' ')) return hay.includes(needle);
      return new RegExp(
        `(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`
      ).test(hay);
    });
    // Also match "arcano 0", "trionfo VII", "lama XVI" style cues.
    // Use full words (lama|lame) — not lame? — so «parlami» does not match Bagatto (I).
    const romanCue = new RegExp(
      `(?:^|[^a-z0-9])(?:arcano|trionfo|lama|lame|carta)\\s*(?:n[°o.]?\\s*)?(?:${escapeRegExp(card.roman.toLowerCase())}|${card.id})(?:[^a-z0-9]|$)`
    );
    if (hit || romanCue.test(hay)) {
      matched.push(card);
    }
    if (matched.length >= cap) break;
  }
  return matched;
}

/** Format selected cards (or empty notice) for system prompt injection. */
export function formatMaggioriKnowledgeForCards(
  cards: readonly NinaMaggioriCard[]
): string {
  if (cards.length === 0) {
    return `${NINA_CHAT_MAGGIORI_FRAME}

(Nessuna scheda Trionfo iniettata in questo turno: se chiedono un Arcano specifico, rispondi in sintesi dall’elenco e invita a nominare il Trionfo, oppure usa solo quanto già detto in chat senza inventare Waite.)`;
  }
  return `${NINA_CHAT_MAGGIORI_FRAME}

### Schede iniettate per questa conversazione
${cards.map((c) => c.body).join('\n\n')}`;
}

/**
 * Build Maggiori knowledge block for the current turn.
 * Scans the latest user message plus recent history for Trionfo keywords.
 */
export function buildMaggioriKnowledgeForMessages(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
}): string {
  const parts = [params.message];
  const history = params.history ?? [];
  // Prefer recent turns (last few) so follow-ups like «e la simbologia?» keep context.
  for (const turn of history.slice(-6)) {
    if (typeof turn.content === 'string' && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  const cards = selectMaggioriCardsForText(parts.join('\n'));
  return formatMaggioriKnowledgeForCards(cards);
}

/**
 * Welcome-mode soft lock: named Trionfo and/or deep study cues
 * (simbologia / Waite / luce-ombra / previsione). ENN-137.
 */
export function looksLikeDeepMaggioriStudy(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
}): boolean {
  const parts = [params.message];
  for (const turn of (params.history ?? []).slice(-4)) {
    if (typeof turn.content === 'string' && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  const hay = normalizeForMatch(parts.join('\n'));
  if (!hay.trim()) return false;
  const named = selectMaggioriCardsForText(hay).length > 0;
  const deepCue = DEEP_STUDY_CUES.test(hay);
  // Named Trionfo alone is enough (visual / meaning asks); deep cues alone too.
  return named || deepCue;
}

/**
 * Full Maggiori dump (all 22 slim cards) — for smoke/tests only, not every chat call.
 * @deprecated Prefer buildMaggioriKnowledgeForMessages for live prompts.
 */
export function buildAllMaggioriKnowledge(): string {
  return formatMaggioriKnowledgeForCards(NINA_MAGGIORI_CARDS);
}

/** @deprecated Use buildMaggioriKnowledgeForMessages — kept for rebuild/smoke compatibility. */
export const NINA_CHAT_MAGGIORI_KNOWLEDGE = buildAllMaggioriKnowledge();

/* -------------------------------------------------------------------------- */
/* ENN-200 — Arcani Minori (luce/ombra) on-demand for Nina Studio              */
/* -------------------------------------------------------------------------- */

export type NinaMinoriCard = NinaMinoriCardGenerated;
export type NinaMinoriSuitFrame = NinaMinoriSuitFrameGenerated;

export const NINA_MINORI_CARDS: readonly NinaMinoriCard[] =
  NINA_MINORI_CARDS_GENERATED;

/** Always-on Minori framing (no per-card bodies) — keeps payload small. */
export const NINA_CHAT_MINORI_FRAME = `## Arcani Minori — schede luce/ombra + domande (Studio)

Fonte: pack didattico italiano Tarot Italia (ENN-200 luce/ombra + ENN-201 domande di pratica). Usa SOLO le schede Minori iniettate sotto (se presenti). Non inventare simbologia Waite assente dal pack. Il corso pubblico **Arcani Minori** non è in vendita: questa è conoscenza companion in Nina Studio per chi ha Maggiori.

${NINA_MINORI_INTRO.slice(0, 360)}…

Domande di pratica (come usarle): ${NINA_MINORI_DOMANDE_INTRO.slice(0, 280)}…

Struttura risposta (quando chiedono un Minore — senso, luce/ombra, domanda di pratica):
1. **Senso** (seme / energia quotidiana)
2. **Luce / ombra**
3. **Domanda** di pratica/consulto (se in scheda) — apri consapevolezza, non chiudere in sentenza
4. Se utile: ${NINA_MINORI_PRATICA.slice(0, 180)}…
Tono: caldo, rigoroso, Tarot Italia. Semi: Bastoni · Coppe · Spade · Denari (Pentacoli). Ranks: Asso–10 + Fante, Cavallo, Regina, Re.
Se manca la scheda nel contesto, chiedi quale carta (es. «Asso di Bastoni») e non inventare dettagli.`;

const MAX_INJECTED_MINORI = 3;

/**
 * Match Minori by suit+rank aliases (e.g. «asso di bastoni», «regina di spade»).
 * Caps at MAX_INJECTED_MINORI. Does not dump a whole suit of 14.
 */
export function selectMinoriCardsForText(text: string): NinaMinoriCard[] {
  const hay = normalizeForMatch(text);
  if (!hay.trim()) return [];

  const matched: NinaMinoriCard[] = [];
  const seen = new Set<string>();
  for (const card of NINA_MINORI_CARDS) {
    const hit = card.aliases.some((alias) => {
      const needle = normalizeForMatch(alias);
      if (!needle) return false;
      if (needle.includes(' ')) return hay.includes(needle);
      return new RegExp(
        `(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`
      ).test(hay);
    });
    if (hit && !seen.has(card.id)) {
      seen.add(card.id);
      matched.push(card);
    }
    if (matched.length >= MAX_INJECTED_MINORI) break;
  }
  return matched;
}

/** Suit-only frames when the user names a suit without a specific rank (max 2). */
export function selectMinoriSuitFramesForText(
  text: string
): NinaMinoriSuitFrame[] {
  const hay = normalizeForMatch(text);
  if (!hay.trim()) return [];
  // If specific cards already match, skip suit-only inject (cards carry suit senso).
  if (selectMinoriCardsForText(hay).length > 0) return [];

  // Avoid injecting from Maggiori tool lists («bastoni, coppe, spade e denari» on Bagatto)
  // unless the ask is clearly about a Minori suit / luce-ombra / seme.
  const suitStudyCue =
    /\b(arcani?\s+minori|minori|seme|semi|luce|ombra|domanda|domande|pentacol)\b/.test(
      hay
    ) ||
    /\b(?:parla(?:mi)?|spiega(?:mi)?|racconta(?:mi)?|cosa\s+(?:sono|significano)|approfond)\b/.test(
      hay
    );

  const matched: NinaMinoriSuitFrame[] = [];
  for (const suit of NINA_MINORI_SUIT_FRAMES) {
    const hit = suit.aliases.some((alias) => {
      const needle = normalizeForMatch(alias);
      if (!needle || needle.length < 4) return false; // skip «cup» / «re»-like shorts
      return new RegExp(
        `(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`
      ).test(hay);
    });
    if (hit && suitStudyCue) {
      matched.push(suit);
    }
    if (matched.length >= 2) break;
  }
  return matched;
}

export function formatMinoriKnowledgeForCards(
  cards: readonly NinaMinoriCard[],
  suitFrames: readonly NinaMinoriSuitFrame[] = []
): string {
  if (cards.length === 0 && suitFrames.length === 0) {
    return `${NINA_CHAT_MINORI_FRAME}

(Nessuna scheda Minore iniettata in questo turno: se chiedono un Minore specifico, invita a nominare seme + grado — es. «3 di Coppe» — senza inventare.)`;
  }
  const parts = [NINA_CHAT_MINORI_FRAME, '', '### Schede Minori iniettate per questa conversazione'];
  if (suitFrames.length > 0) {
    parts.push(suitFrames.map((s) => s.body).join('\n\n'));
  }
  if (cards.length > 0) {
    parts.push(cards.map((c) => c.body).join('\n\n'));
  }
  return parts.join('\n');
}

export function buildMinoriKnowledgeForMessages(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
}): string {
  const parts = [params.message];
  const history = params.history ?? [];
  for (const turn of history.slice(-6)) {
    if (typeof turn.content === 'string' && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  const hay = parts.join('\n');
  const cards = selectMinoriCardsForText(hay);
  const suits = selectMinoriSuitFramesForText(hay);
  return formatMinoriKnowledgeForCards(cards, suits);
}

const DEEP_MINORI_CUES =
  /\b(arcani?\s+minori|minori\s+didatt|luce\s*\/?\s*ombra|domande?\s+(sui\s+)?minori|domanda\s+di\s+pratica|asso\s+di\s+(bastoni|coppe|spade|denari|pentacol)|(?:fante|cavallo|regina|re|\d{1,2}|due|tre|quattro|cinque|sei|sette|otto|nove|dieci)\s+di\s+(bastoni|coppe|spade|denari|pentacol))/;

/**
 * Welcome soft-lock: named Minore and/or deep Minori study cues (ENN-200).
 * Studio remains gated by Maggiori entitlement.
 */
export function looksLikeDeepMinoriStudy(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
}): boolean {
  const parts = [params.message];
  for (const turn of (params.history ?? []).slice(-4)) {
    if (typeof turn.content === 'string' && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  const hay = normalizeForMatch(parts.join('\n'));
  if (!hay.trim()) return false;
  if (selectMinoriCardsForText(hay).length > 0) return true;
  return DEEP_MINORI_CUES.test(hay);
}

/* -------------------------------------------------------------------------- */
/* ENN-233 — Blog articles (published draft:false) for Nina Studio             */
/* -------------------------------------------------------------------------- */

export type NinaBlogPost = NinaBlogPostGenerated;

export const NINA_BLOG_POSTS: readonly NinaBlogPost[] =
  NINA_BLOG_POSTS_GENERATED;

function formatBlogCatalogIndex(): string {
  if (NINA_BLOG_CATALOG.length === 0) {
    return '(Nessun articolo blog pubblicato in pack.)';
  }
  return NINA_BLOG_CATALOG.map((entry) => {
    const cat = entry.category ? ` · ${entry.category}` : '';
    const gate = entry.gated ? ' · Maggiori' : '';
    return `- **${entry.title}**${cat}${gate} — ${entry.cite}`;
  }).join('\n');
}

/** Always-on blog framing + catalog (titles/paths only). Bodies on-demand. */
export const NINA_CHAT_BLOG_FRAME = `## Blog Tarot Italia — articoli pubblicati (Studio)

Fonte: \`content/blog/\` compilato a build (\`draft: false\` only). Gli articoli **gated** Maggiori sono inclusi perché Nina Studio è sbloccata con l’acquisto Maggiori. Il Blog **estende** la dispensa, non la sostituisce.

Usa SOLO i pezzi iniettati sotto (se presenti) e il catalogo titoli. **Cita** titolo + path \`/news/…\`. Non inventare fatti storici, date, biografie o iconografia assenti dal pack. Se manca il pezzo, invita a nominare titolo/categoria o a leggere l’articolo sul Blog.

Catalogo (titolo · categoria · path):
${formatBlogCatalogIndex()}`;

/** Blog is denser than cards — inject at most 2 compact bodies; often 1 under budget. */
const MAX_INJECTED_BLOG = 2;
const MAX_INJECTED_BLOG_BUDGETED = 1;

const BLOG_STUDY_CUES =
  /\b(blog|articolo|articoli|approfondiment\w*|pixie|pamela|colman\s+smith|rider[\s-]?waite|origine\s+segreta|golden\s+dawn|news\/)/;

/** Single-token arcana names Maggiori cards already cover — need blog cue or stronger alias. */
const WEAK_ARCANA_ALIAS = new Set([
  'matto',
  'bagatto',
  'mago',
  'giustizia',
  'papessa',
  'imperatrice',
  'imperatore',
  'papa',
  'amanti',
  'carro',
  'eremita',
  'diavolo',
  'torre',
  'luna',
  'sole',
  'mondo',
]);

/**
 * Match published blog posts by title/slug/tag aliases + light study cues.
 * Caps at MAX_INJECTED_BLOG. Weak single-token Maggiori overlaps alone do not inject
 * (schede Maggiori remain primary for «com’è il Matto?»); blog cue or stronger alias does.
 */
export function selectBlogPostsForText(
  text: string,
  maxPosts: number = MAX_INJECTED_BLOG
): NinaBlogPost[] {
  const hay = normalizeForMatch(text);
  if (!hay.trim()) return [];
  const blogCue = BLOG_STUDY_CUES.test(hay);
  const cap = Math.max(1, Math.min(maxPosts, MAX_INJECTED_BLOG));

  const scored: Array<{ post: NinaBlogPost; score: number; strong: boolean }> =
    [];
  for (const post of NINA_BLOG_POSTS) {
    let score = 0;
    let strong = false;
    for (const alias of post.aliases) {
      const needle = normalizeForMatch(alias);
      if (!needle || needle.length < 3) continue;
      let hit = false;
      if (needle.includes(' ') || needle.includes('-')) {
        hit = hay.includes(needle.replace(/-/g, ' ')) || hay.includes(needle);
      } else {
        hit = new RegExp(
          `(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`
        ).test(hay);
      }
      if (!hit) continue;
      score += Math.min(needle.length, 24);
      const isWeakArcana =
        !needle.includes(' ') &&
        !needle.includes('-') &&
        WEAK_ARCANA_ALIAS.has(needle);
      if (!isWeakArcana) strong = true;
    }
    if (score <= 0) continue;
    // Drop Maggiori-only weak hits unless the user asked for blog/approfondimento.
    if (!strong && !blogCue) continue;
    scored.push({ post, score, strong });
  }

  scored.sort((a, b) => b.score - a.score);
  let picked = scored.slice(0, cap).map((s) => s.post);

  // Category-only ask («parlami degli articoli Autori / Storia») when no title hit.
  if (picked.length === 0 && blogCue) {
    const byCategory = NINA_BLOG_POSTS.filter((p) => {
      if (!p.category) return false;
      const cat = normalizeForMatch(p.category);
      return cat.length >= 4 && hay.includes(cat);
    });
    picked = byCategory.slice(0, cap);
  }

  return picked;
}

export function formatBlogKnowledgeForPosts(
  posts: readonly NinaBlogPost[]
): string {
  if (posts.length === 0) {
    return `${NINA_CHAT_BLOG_FRAME}

(Nessun corpo articolo iniettato in questo turno: se chiedono un pezzo del Blog, invita a nominare titolo, categoria o path \`/news/…\` e usa solo il catalogo — senza inventare.)`;
  }
  const bodies = posts
    .map(
      (p) =>
        `### ${p.title}\n- **Fonte**: Blog · ${p.cite}${p.gated ? ' (Maggiori)' : ''}\n- **Sintesi pack**: ${p.body}`
    )
    .join('\n\n');
  return `${NINA_CHAT_BLOG_FRAME}

### Articoli iniettati per questa conversazione
${bodies}`;
}

export function buildBlogKnowledgeForMessages(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
}): string {
  const parts = [params.message];
  const history = params.history ?? [];
  for (const turn of history.slice(-6)) {
    if (typeof turn.content === 'string' && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  const posts = selectBlogPostsForText(parts.join('\n'));
  return formatBlogKnowledgeForPosts(posts);
}

function collectRecentHay(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
  historyWindow?: number;
}): string {
  const parts = [params.message];
  const history = params.history ?? [];
  const window = params.historyWindow ?? 4;
  for (const turn of history.slice(-window)) {
    if (typeof turn.content === 'string' && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  return parts.join('\n');
}

/**
 * Coordinated Studio knowledge for one Groq turn (ENN-235 / ENN-236).
 * - Slim site FAQ by default; full FAQ only on prezzi/FAQ cues.
 * - Maggiori / Minori / Blog frames only when relevant (no triple empty dump).
 * - Prefer card bodies over blog; blog max 1 excerpt when cards also hit.
 */
export function buildStudioKnowledgeForMessages(params: {
  message: string;
  history?: Array<{ role: string; content: string }>;
}): string {
  const hay = collectRecentHay(params);
  const hayNorm = normalizeForMatch(hay);

  const blogCue = BLOG_STUDY_CUES.test(hayNorm);
  // Frame cues omit bare «waite/smith» so Autori/Pixie blog asks do not pull Maggiori frame.
  const maggioriFrameCue =
    /\b(simbolog\w*|iconograf\w*|luce\s*\/?\s*ombra|prevision\w*|trionf\w*|arcano\s+maggior|arcani?\s+maggior|maggiori|matto|bagatto|papessa|imperatr|imperator|papa|amanti|carro|giustizia|eremita|ruota|forza|appeso|morte|temperanza|diavolo|torre|stelle|luna|sole|giudizio|mondo)\b/.test(
      hayNorm
    );
  const minoriCue =
    DEEP_MINORI_CUES.test(hayNorm) ||
    /\b(minori|bastoni|coppe|spade|denari|pentacol|asso|fante|cavallo|regina)\b/.test(
      hayNorm
    );

  let maggioriCards = selectMaggioriCardsForText(hay);
  const minoriCards = selectMinoriCardsForText(hay);
  const minoriSuits = selectMinoriSuitFramesForText(hay);
  const hasCardBodies =
    maggioriCards.length > 0 ||
    minoriCards.length > 0 ||
    minoriSuits.length > 0;

  const blogCap = hasCardBodies
    ? MAX_INJECTED_BLOG_BUDGETED
    : MAX_INJECTED_BLOG;
  const blogPosts = selectBlogPostsForText(hay, blogCap);

  if (blogPosts.length > 0 && maggioriCards.length > MAX_INJECTED_CARDS_BUDGETED) {
    maggioriCards = selectMaggioriCardsForText(
      hay,
      MAX_INJECTED_CARDS_BUDGETED
    );
  }

  const wantMaggiori = maggioriCards.length > 0 || maggioriFrameCue;
  const wantMinori =
    minoriCards.length > 0 || minoriSuits.length > 0 || minoriCue;
  const wantBlog = blogPosts.length > 0 || blogCue;

  const blocks: string[] = [selectSiteKnowledgeForStudio(params)];

  if (wantMaggiori) {
    blocks.push(formatMaggioriKnowledgeForCards(maggioriCards));
  }
  if (wantMinori) {
    blocks.push(formatMinoriKnowledgeForCards(minoriCards, minoriSuits));
  }
  if (wantBlog) {
    blocks.push(formatBlogKnowledgeForPosts(blogPosts));
  }
  if (!wantMaggiori && !wantMinori && !wantBlog) {
    blocks.push(NINA_STUDIO_ON_DEMAND_HINT);
  }

  return blocks.join('\n\n');
}
