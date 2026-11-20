/**
 * Official-site knowledge for Nina (Groq system prompt).
 * Mirror of public copy from siteContent / booking / corsi — do not invent FAQ or prices.
 * Maggiori cards: compiled FROM Area Personale didactic sources (ENN-147) —
 * dispensa + schede visive + approfondimenti — not a hand KB, not Dialogo Tarot.
 * Inject only matched Trionfi per request (ENN-138). When knowledge changes:
 * `npx tsx scripts/build-nina-maggiori-cards.ts` then `npm run build:api`.
 */

import { NINA_MAGGIORI_CARDS_GENERATED } from '../data/ninaMaggioriCards.generated.ts';
import { ninaStudioSoftLockReply } from './ninaReplyLang.ts';

/** Fatti pubblici e FAQ del sito (copy ufficiale, fedele). */
export const NINA_CHAT_SITE_KNOWLEDGE = `Conoscenza ufficiale del sito (fonte: copy pubblico Tarot Italia — usa SOLO questi fatti; stile FAQ breve e caldo; per prezzi e FAQ cita le risposte qui sotto, senza inventare):

## Consulti — introduzione ufficiale
Quattro durate calibrate per profondità differenti. In ogni sessione leggo Arcani Maggiori e Minori: online in chiamata vocale riservata, oppure di persona a Macerata (Via Crispi 37) su appuntamento — il Consulto Breve è solo online.

Accoglienza: Che tu arrivi con una domanda immediata e sincera — anche semplice o legata agli affetti, come «Mi pensa?» — o con il bisogno di fare chiarezza su un passaggio complesso, i miei consulti nascono per trasformare il caos in cosmos. Integro la lettura viva della cartomanzia pura con la tarologia evolutiva attraverso tutti i 78 Arcani, Maggiori e Minori.

Non è richiesta alcuna conoscenza preliminare delle carte: ti guido passo dopo passo tra archetipi, motivazioni e chiavi di lettura pratiche perché tu possa uscire con una visione rinnovata e riprendere in mano le redini del tuo percorso. I consulti online si svolgono esclusivamente in modalità chiamata vocale, per favorire ascolto profondo e concentrazione.

Etica consulti: ogni consulto offre una lettura chiara del presente e delle tendenze future nel rispetto del libero arbitrio. Nessuna promessa miracolistica o sostituzione di pareri medici e legali.

## Tariffe consulti (prezzi correnti, EUR)
In **ogni** sessione Maria Teresa legge **Arcani Maggiori e Minori**.

- **Consulto Breve** · 20 min · **€19** · **solo online** (chiamata vocale) · Solo online · Domanda rapida
  Venti minuti solo online per una domanda chiara e un orientamento rapido, con lettura di Arcani Maggiori e Minori.
  Include: 20 minuti di dialogo individuale solo online (chiamata vocale); Lettura con Arcani Maggiori e Minori su un tema puntuale; Indicazioni pratiche via email o WhatsApp.

- **Consulto Essenziale** · 45 min · **€50** · online o di persona · Più domande · Chiarezza immediata
  Un incontro mirato per approfondire più domande sul presente, con chiarezza simbolica ed equilibrio.
  Include: 45 minuti di dialogo individuale (online o di persona); Lettura con Arcani Maggiori e Minori su più domande; Sintesi scritta dei punti emersi via email o WhatsApp.

- **Consulto Evolutivo Completo** · 60 min · **€75** · online o di persona a Macerata · Consigliato · Analisi approfondita (percorso consigliato)
  Il percorso consigliato per esplorare radici, risorse interiori e possibili direzioni di trasformazione consapevole.
  Include: 60 minuti di sessione individuale in chiamata vocale o di persona a Macerata; Lettura combinata di Arcani Maggiori e Minori; Mappa delle domande maieutiche per le settimane successive.

- **Sessione Integrata** · 90 min · **€90** · online o di persona a Macerata · Ciclo annuale · Massima profondità
  Incontro esteso dedicato a momenti di svolta, bilanci di ciclo annuale o lavoro articolato su più ambiti di vita.
  Include: 90 minuti di dialogo olistico in chiamata vocale o di persona a Macerata; Lettura completa con Arcani Maggiori e Minori (dodici case o doppio confronto); Follow-up scritto entro 48 ore tramite canale riservato.

## Modalità, orari e sedute (Europe/Rome)
- Slot pubblici tipici: dalle 09:00 alle 20:00.
- Online = chiamata vocale riservata (WhatsApp).
- Di persona: Via Crispi 37, 62100 Macerata, su appuntamento — disponibili fino alle 18:00; **dalle 19:00 solo online**.
- Il **Consulto Breve** non è disponibile di persona (solo online).

## Prenotazione e pagamento (copy Prenota)
Scegli durata, giorno e orario: in ogni sessione Maria Teresa legge Arcani Maggiori e Minori. Poi inviaci la richiesta su WhatsApp e riceverai le indicazioni per il pagamento. Il Consulto Breve è solo online.

Per ora il pagamento online è in pausa. Invia la prenotazione su WhatsApp: riceverai da Maria Teresa le modalità di pagamento e la conferma dello slot.

- Contatti pubblici: WhatsApp / Telegram / telefono 379 103 82 53 · email info@tarotitalia.com.
- Non promettere checkout Stripe attivo: il pagamento online è in pausa.

## Corsi / didattica (copy ufficiale pagina Corsi)
Pagina Corsi attiva: tre percorsi acquistabili singolarmente — Arcani Maggiori (€ 190), Arcani Minori (€ 210), Metodi di Stesura (€ 240).
Catalogo, programma e form iscrizione sono disponibili su /corsi. I materiali didattici dettagliati possono ancora essere in distribuzione progressiva («Didattica in arrivo» sulle card).
Non inventare date di partenza o promozioni non presenti sul sito; per prezzi e iscrizione rinvia alla pagina Corsi o a «Parla con Maria Teresa».

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
- **Corsi** — Maggiori (€190), Minori (€210), Metodi di Stesura (€240); checkout Maggiori su /corsi
- **Blog / News** — articoli (alcuni approfondimenti Maggiori riservati ai corsisti)
- **Contatti** — email, telefono, mappa Macerata
- **Prenota** — richiesta appuntamento via WhatsApp (Stripe in pausa per i consulti)
- **Area Riservata** — dispense e percorsi dopo acquisto / accesso Google

## Chi sono (sintesi leggera)
Maria Teresa Rogani · Operatore Olistico (L. 4/2013). Formazione in comunicazione visiva / Accademia di Belle Arti; sguardo su composizione, colore e simboli nel contesto storico e iconografico. Integra tarologia esoterica, tradizione Rider-Waite-Smith e pratiche olistiche di ascolto. Per il racconto completo: pagina **Chi sono**.

## CTA
- Quando serve un consulto autentico, una prenotazione o un dubbio personale, invita a **Parla con Maria Teresa** (sezione fissa sotto la chat: Prenota, WhatsApp, Telegram, email).
- Non aggiungere blocchi CTA markdown né elenchi di bottoni nel messaggio.`;

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

const MAX_INJECTED_CARDS = 3;

/**
 * Soft-lock copy when welcome chat asks for deep Maggiori study (ENN-137).
 * Prefer `ninaStudioSoftLockReply(lang)` so GT browsing language is respected (ENN-143).
 */
export const NINA_STUDIO_SOFT_LOCK_REPLY = ninaStudioSoftLockReply('it');

export { ninaStudioSoftLockReply };

function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

const DEEP_STUDY_CUES =
  /\b(simbolog\w*|iconograf\w*|waite|smith|luce\s*\/?\s*ombra|ombra|prevision\w*|senso\s+profond|significat\w*|scheda\s+visiv|trionf\w*|arcano\s+maggior|maggiori\s+didatt)/;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Match Trionfi mentioned in user/history text (aliases + roman/id cues).
 * Caps at MAX_INJECTED_CARDS to keep Groq payload under limit.
 * Aliases use word-ish boundaries so «papa» does not match «papessa».
 */
export function selectMaggioriCardsForText(text: string): NinaMaggioriCard[] {
  const hay = normalizeForMatch(text);
  if (!hay.trim()) return [];

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
    if (matched.length >= MAX_INJECTED_CARDS) break;
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
