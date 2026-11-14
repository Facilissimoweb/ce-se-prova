var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/db/repository.ts
import { and, asc, desc, eq, gte, inArray, lte, ne, or } from "drizzle-orm";

// src/db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  consultationBookings: () => consultationBookings,
  consultationBookingsRelations: () => consultationBookingsRelations,
  coursePurchases: () => coursePurchases,
  coursePurchasesRelations: () => coursePurchasesRelations,
  courses: () => courses,
  coursesRelations: () => coursesRelations,
  dialoguePurchases: () => dialoguePurchases,
  dialoguePurchasesRelations: () => dialoguePurchasesRelations,
  dialogueSessions: () => dialogueSessions,
  dialogueSessionsRelations: () => dialogueSessionsRelations,
  dispensaProgress: () => dispensaProgress,
  dispensaProgressRelations: () => dispensaProgressRelations,
  dispense: () => dispense,
  dispenseRelations: () => dispenseRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex
} from "drizzle-orm/pg-core";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(),
  email: text("email").notNull(),
  displayName: text("display_name"),
  phoneWhatsapp: text("phone_whatsapp"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  priceEur: integer("price_eur").notNull(),
  stripePriceId: text("stripe_price_id").notNull(),
  lessonsCount: integer("lessons_count").notNull(),
  totalHours: text("total_hours").notNull(),
  levelLabel: text("level_label").notNull(),
  sortOrder: integer("sort_order").notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var dispense = pgTable(
  "dispense",
  {
    id: serial("id").primaryKey(),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    moduleNumber: text("module_number").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle").notNull(),
    format: text("format").notNull(),
    readingMinutes: integer("reading_minutes").notNull(),
    contentMarkdown: text("content_markdown").notNull(),
    keyTakeaways: text("key_takeaways").notNull(),
    // JSON array string
    sortOrder: integer("sort_order").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("dispense_course_module_idx").on(table.courseId, table.moduleNumber)
  ]
);
var coursePurchases = pgTable(
  "course_purchases",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    status: text("status").notNull().default("active"),
    // 'active' | 'pending_payment' | 'revoked'
    paymentProvider: text("payment_provider").notNull().default("stripe_checkout"),
    stripeSessionId: text("stripe_session_id"),
    amountPaidEur: integer("amount_paid_eur").notNull(),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone"),
    purchasedAt: timestamp("purchased_at").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("course_purchases_user_course_idx").on(table.userId, table.courseId)
  ]
);
var dispensaProgress = pgTable(
  "dispensa_progress",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    dispensaId: integer("dispensa_id").references(() => dispense.id, { onDelete: "cascade" }).notNull(),
    completed: boolean("completed").default(false).notNull(),
    personalNotes: text("personal_notes").default("").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("dispensa_progress_user_dispensa_idx").on(table.userId, table.dispensaId)
  ]
);
var consultationBookings = pgTable(
  "consultation_bookings",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "set null"
    }),
    tariffId: text("tariff_id").notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    priceEur: integer("price_eur").notNull(),
    scheduledDate: text("scheduled_date").notNull(),
    scheduledTime: text("scheduled_time").notNull(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phoneWhatsapp: text("phone_whatsapp").notNull(),
    sessionIntent: text("session_intent").default("").notNull(),
    deontologyAccepted: boolean("deontology_accepted").notNull(),
    mode: text("mode").notNull().default("remote"),
    // studio | remote
    status: text("status").notNull().default("pending_payment"),
    stripeSessionId: text("stripe_session_id"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    googleCalendarEventId: text("google_calendar_event_id"),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
  },
  (table) => [
    uniqueIndex("consultation_bookings_stripe_session_idx").on(
      table.stripeSessionId
    )
  ]
);
var dialogueSessions = pgTable("dialogue_sessions", {
  id: serial("id").primaryKey(),
  sessionKey: text("session_key").notNull().unique(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  freeTrialStartedAt: timestamp("free_trial_started_at"),
  freeTrialExpiresAt: timestamp("free_trial_expires_at"),
  activePassExpiresAt: timestamp("active_pass_expires_at"),
  activePackId: text("active_pack_id"),
  interactionsCount: integer("interactions_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var dialoguePurchases = pgTable("dialogue_purchases", {
  id: serial("id").primaryKey(),
  dialogueSessionId: integer("dialogue_session_id").references(() => dialogueSessions.id, { onDelete: "cascade" }).notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  packId: text("pack_id").notNull(),
  // '5m' | '10m' | '15m'
  durationMinutes: integer("duration_minutes").notNull(),
  priceEur: integer("price_eur").notNull(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeSessionId: text("stripe_session_id"),
  customerName: text("customer_name").default("").notNull(),
  customerEmail: text("customer_email").default("").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var usersRelations = relations(users, ({ many }) => ({
  purchases: many(coursePurchases),
  dispensaProgress: many(dispensaProgress),
  bookings: many(consultationBookings),
  dialogueSessions: many(dialogueSessions),
  dialoguePurchases: many(dialoguePurchases)
}));
var coursesRelations = relations(courses, ({ many }) => ({
  dispense: many(dispense),
  purchases: many(coursePurchases)
}));
var dispenseRelations = relations(dispense, ({ one, many }) => ({
  course: one(courses, {
    fields: [dispense.courseId],
    references: [courses.id]
  }),
  progressRecords: many(dispensaProgress)
}));
var coursePurchasesRelations = relations(coursePurchases, ({ one }) => ({
  user: one(users, {
    fields: [coursePurchases.userId],
    references: [users.id]
  }),
  course: one(courses, {
    fields: [coursePurchases.courseId],
    references: [courses.id]
  })
}));
var dispensaProgressRelations = relations(dispensaProgress, ({ one }) => ({
  user: one(users, {
    fields: [dispensaProgress.userId],
    references: [users.id]
  }),
  dispensa: one(dispense, {
    fields: [dispensaProgress.dispensaId],
    references: [dispense.id]
  })
}));
var consultationBookingsRelations = relations(consultationBookings, ({ one }) => ({
  user: one(users, {
    fields: [consultationBookings.userId],
    references: [users.id]
  })
}));
var dialogueSessionsRelations = relations(dialogueSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [dialogueSessions.userId],
    references: [users.id]
  }),
  purchases: many(dialoguePurchases)
}));
var dialoguePurchasesRelations = relations(dialoguePurchases, ({ one }) => ({
  session: one(dialogueSessions, {
    fields: [dialoguePurchases.dialogueSessionId],
    references: [dialogueSessions.id]
  }),
  user: one(users, {
    fields: [dialoguePurchases.userId],
    references: [users.id]
  })
}));

// src/db/index.ts
function poolMax() {
  if (process.env.SQL_POOL_MAX) {
    return Number(process.env.SQL_POOL_MAX) || 1;
  }
  if (process.env.VERCEL) return 1;
  return 10;
}
function sslOption() {
  if (process.env.SQL_SSL === "false") return void 0;
  if (process.env.SQL_SSL === "true" || process.env.DATABASE_URL) {
    return { rejectUnauthorized: false };
  }
  return void 0;
}
var createPool = () => {
  if (!global._postgresPool) {
    const connectionString = process.env.DATABASE_URL?.trim();
    const config2 = {
      max: poolMax(),
      connectionTimeoutMillis: 15e3,
      ssl: sslOption()
    };
    if (connectionString) {
      config2.connectionString = connectionString;
    } else {
      const host = process.env.SQL_HOST;
      config2.host = host;
      config2.user = process.env.SQL_USER;
      config2.password = process.env.SQL_PASSWORD;
      config2.database = process.env.SQL_DB_NAME;
    }
    global._postgresPool = new Pool(config2);
    global._postgresPool.on("error", (err) => {
      console.error("Unexpected error on idle SQL pool client:", err);
    });
  }
  return global._postgresPool;
};
var pool = createPool();
var db = drizzle(pool, { schema: schema_exports });

// src/db/seedData.ts
var COURSE_SEED_CATALOG = [
  {
    slug: "arcani-maggiori",
    title: "Arcani Maggiori",
    subtitle: "Il Viaggio Archetipico da 0 a XXI \xB7 Presente e Previsione",
    description: "Studio approfondito dei 22 Trionfi: iconografia tradizionale, struttura numerologica, lettura in luce e ombra e interpretazione previsionale delle grandi svolte.",
    priceEur: 190,
    stripePriceId: process.env.STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI || "STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI",
    lessonsCount: 12,
    totalHours: "8h 30m video",
    levelLabel: "Livello Base e Intermedio",
    sortOrder: 1,
    dispense: [
      {
        moduleNumber: "01",
        title: "Struttura del Mazzo e Primo Settenario (0 \u2013 VII)",
        subtitle: "Dal potenziale originario del Matto alla direzione del Carro",
        format: "Dispensa PDF + Scheda Archetipica",
        readingMinutes: 22,
        keyTakeaways: [
          "Il Matto (0) come soglia fuori dal numero e principio di libert\xE0.",
          "Polarit\xE0 attiva e ricettiva tra Il Bagatto (I) e La Papessa (II).",
          "Lettura previsionale del Carro (VII): accelerazione, spostamenti e vittoria disciplinata."
        ],
        contentMarkdown: `## Il Primo Settenario: Identit\xE0 e Radicamento nel Mondo

I primi sette Arcani Maggiori descrivono la formazione della coscienza individuale e la capacit\xE0 di agire nella realt\xE0 concreta.

### 1. Il Matto (0) e l'inizio non condizionato
Quando compare in lettura, segnala uno slancio genuino, una partenza imminente o un salto di fiducia ancora privo di schema rigido. In chiave previsionale anticipa un cambiamento improvviso di rotta o una novit\xE0 che richiede coraggio.

### 2. La diade creativa: Bagatto (I) e Papessa (II)
- **Il Bagatto**: strumenti sul tavolo, iniziativa immediata, talento da mettere all'opera nei prossimi giorni.
- **La Papessa**: gestazione silenziosa, verit\xE0 intuita prima che detta, attesa fertile.

### 3. Imperatrice (III), Imperatore (IV), Papa (V), Innamorati (VI) e Carro (VII)
Dal fiorire creativo alla struttura, fino al patto etico (V), alla scelta del cuore (VI) e al movimento deciso del Carro (VII), che in previsione indica sblocco rapido di trattative o viaggi.`
      },
      {
        moduleNumber: "02",
        title: "Secondo Settenario: Prove Interiori e Destino (VIII \u2013 XIV)",
        subtitle: "Giustizia, Eremita, Ruota della Fortuna e Temperanza",
        format: "Dispensa PDF + Mappa Cicli",
        readingMinutes: 25,
        keyTakeaways: [
          "La Giustizia (VIII/XI) e il bilancio oggettivo di accordi e contratti.",
          "L\u2019Eremita (IX) come ricerca della lanterna interiore e maturit\xE0 dei tempi.",
          "La Ruota della Fortuna (X) e la Temperanza (XIV): leggere il cambio di stagione."
        ],
        contentMarkdown: `## Il Secondo Settenario: Il Confronto con la Legge del Tempo

In questa fascia centrale degli Arcani Maggiori il consultante impara a distinguere ci\xF2 che dipende dalla volont\xE0 da ci\xF2 che appartiene ai cicli pi\xF9 ampi.

### La Giustizia e La Forza
La Giustizia chiede chiarezza contrattuale e coerenza morale; sul piano futuro anticipa firme, verifiche o riequilibri meritati. La Forza sostituisce la durezza con la padronanza calma dell'istinto.

### L'Eremita (IX) e La Ruota (X)
- **L'Eremita**: invita a non forzare i tempi; mostra un periodo di discernimento che precede una decisione stabile.
- **La Ruota della Fortuna**: segnala una svolta esterna imminente, un ritorno ciclico o un'opportunit\xE0 che chiede prontezza.

### Appeso (XII), Arcano XIII e Temperanza (XIV)
L'Appeso sospende l'azione per cambiare sguardo; l'Arcano XIII chiude ci\xF2 che ha esaurito la sua funzione; la Temperanza ricompone gli opposti con misura e guarigione graduale.`
      },
      {
        moduleNumber: "03",
        title: "Terzo Settenario: Ombra, Luce e Compimento (XV \u2013 XXI)",
        subtitle: "Dal Diavolo e la Torre fino alle Stelle, Sole e Mondo",
        format: "Dispensa PDF + Atlante Simbolico",
        readingMinutes: 28,
        keyTakeaways: [
          "Leggere Il Diavolo (XV) e La Torre (XVI) senza fatalismo ma come verit\xE0 liberatorie.",
          "Le Stelle (XVII) e La Luna (XVIII): discernere speranza autentica da proiezione.",
          "Il Sole (XIX), Il Giudizio (XX) e Il Mondo (XXI) nelle previsioni di realizzazione."
        ],
        contentMarkdown: `## Il Terzo Settenario: La Trasformazione Profonda

Gli ultimi sette Arcani conducono oltre i legami dell'ego verso una visione aperta e integrata.

### Ombra e Rottura Costruttiva (XV \u2013 XVI)
Il Diavolo porta alla luce attaccamenti, desideri intensi o accordi squilibrati. La Torre non punisce: abbatte costruzioni ormai fragili per liberare spazio autentico nel futuro prossimo.

### Le Luci del Cielo (XVII \u2013 XIX)
- **Le Stelle**: protezione, vocazione limpida, fidatezza dei progetti a medio termine.
- **La Luna**: sogni, memorie familiari, zone non ancora chiarite dove muoversi con cautela.
- **Il Sole**: chiarezza meridiana, riconoscimento pubblico, intesa affettiva e riuscita concreta.

### Rinascita e Sintesi (XX \u2013 XXI)
Il Giudizio annuncia una chiamata o notizia decisiva; Il Mondo sancisce il compimento di un ciclo e l'apertura di un nuovo orizzonte.`
      },
      {
        moduleNumber: "04",
        title: "Dialoghi tra Arcani e Formulazione Previsionale Etica",
        subtitle: "Combinazioni binarie, libero arbitrio e codice deontologico",
        format: "Quaderno Esercizi + Casi Studio",
        readingMinutes: 20,
        keyTakeaways: [
          "Come il secondo Arcano orienta la direzione evolutiva del primo.",
          "Linguaggio deontologico per esprimere scenari futuri senza togliere autonomia.",
          "Protocollo di verifica su amore, lavoro e scelte personali."
        ],
        contentMarkdown: `## Combinare Due Arcani Maggiori in Chiave Previsionale

Una carta isolata descrive un archetipo; due carte accostate mostrano un movimento nel tempo.

### Regola della Direzione (Carta A \u2192 Carta B)
1. **Carta A** fotografa la radice attiva nel presente.
2. **Carta B** mostra dove converge l'energia nei mesi successivi se il consultante mantiene la rotta.

### Esempio Pratico
- **Eremita + Carro**: dopo una fase di studio riservato o attesa riflessiva, arriva una ripartenza veloce con obiettivi definiti.
- **Torre + Stelle**: una ristrutturazione improvvisa libera risorse per un progetto pi\xF9 fedele alla propria vocazione.

### Confine Etico (Legge 4/2013)
La previsione olistica traccia tendenze reali e punti di snodo lasciando sempre al consultante la responsabilit\xE0 delle proprie scelte; restano escluse diagnosi mediche o pronostici sanitari.`
      }
    ]
  },
  {
    slug: "arcani-minori",
    title: "Arcani Minori",
    subtitle: "I Quattro Semi, Numerologia 1\u201310 e Carte di Corte",
    description: "Dall\u2019intuizione alla precisione quotidiana: padroneggia i 56 Arcani Minori per leggere tempi, persone coinvolte, dinamiche lavorative, sentimentali e materiali.",
    priceEur: 210,
    stripePriceId: process.env.STRIPE_PRICE_ID_CORSO_ARCANI_MINORI || "STRIPE_PRICE_ID_CORSO_ARCANI_MINORI",
    lessonsCount: 14,
    totalHours: "9h 45m video",
    levelLabel: "Livello Intermedio",
    sortOrder: 2,
    dispense: [
      {
        moduleNumber: "01",
        title: "Atlante dei Quattro Semi ed Elementi",
        subtitle: "Bastoni, Coppe, Spade e Denari nella vita concreta",
        format: "Atlante PDF + Schede Elementali",
        readingMinutes: 20,
        keyTakeaways: [
          "Riconoscere a colpo d\u2019occhio la prevalenza di un seme nella stesa.",
          "Corrispondenza tra Elemento, stagione previsionale e velocit\xE0 degli eventi.",
          "Compensare un seme assente per leggere ci\xF2 che manca nella situazione."
        ],
        contentMarkdown: `## I Quattro Semi: La Trama del Quotidiano

Se gli Arcani Maggiori segnano i grandi capitoli del destino, i 56 Arcani Minori mostrano come gli eventi prendono forma giorno per giorno.

### Quadro Elementale
- **Bastoni (Fuoco \xB7 Primavera)**: iniziativa, impresa, passione, spostamenti e ritmo rapido.
- **Coppe (Acqua \xB7 Estate)**: legami affettivi, ascolto, famiglia, sensibilit\xE0 e fiducia.
- **Spade (Aria \xB7 Autunno)**: pensiero strategico, decisioni nette, confini, documenti e chiarezza verbale.
- **Denari (Terra \xB7 Inverno)**: lavoro stabile, entrate economiche, casa, salute quotidiana e maturazione lenta.`
      },
      {
        moduleNumber: "02",
        title: "Numerologia dall\u2019Asso al Dieci per Seme",
        subtitle: "Leggere i gradi di sviluppo di ogni progetto o legame",
        format: "Dispensa Numerologica PDF",
        readingMinutes: 26,
        keyTakeaways: [
          "Assi e Due: nascita dell\u2019impulso e prima scelta relazionale o operativa.",
          "Cinque e Sette: snodi di verifica, attrito costruttivo e perseveranza.",
          "Nove e Dieci: raccolta autonoma e compimento di un intero ciclo."
        ],
        contentMarkdown: `## La Scala Numerica nei Tarocchi Minori

Comprendere la logica dei numeri da 1 a 10 evita di dover memorizzare meccanicamente 40 significati isolati.

### Le Fasi del Ciclo 1\u201310
- **1 (Asso)**: seme puro, occasione nuova nel dominio del seme.
- **2 \u2013 3**: dualit\xE0/accordo (2) e prima espansione visibile (3).
- **4**: consolidamento, pausa protettiva o struttura stabile.
- **5**: sfida dinamica, confronto o perdita di un vecchio equilibrio necessario a crescere.
- **6**: armonia ritrovata, scambio equo, passaggio di transizione.
- **7 \u2013 8**: prova di discernimento (7) e accelerazione/maestria (8).
- **9 \u2013 10**: culmine individuale (9) e saturazione/nuovo inizio del ciclo (10).`
      },
      {
        moduleNumber: "03",
        title: "Le 16 Figure di Corte: Ritratti e Ruoli",
        subtitle: "Fanti, Cavalieri, Regine e Re nella lettura reale",
        format: "Schede Personaggi PDF",
        readingMinutes: 24,
        keyTakeaways: [
          "Distinguere quando una Figura indica una persona esterna o una qualit\xE0 interiore.",
          "I Fanti come messaggi imminenti, studi o notizie in arrivo.",
          "Cavalieri (movimento), Regine (cura e padronanza interna) e Re (autorit\xE0)."
        ],
        contentMarkdown: `## Decifrare le Figure di Corte Senza Ambiguit\xE0

Le Carte di Corte rappresentano spesso il punto pi\xF9 temuto da chi inizia: in questa dispensa le trasformiamo in alleate chiarissime.

### I Quattro Ranghi
1. **Fanti**: principianti curiosi, messaggi scritti, convocazioni o proposte fresche.
2. **Cavalieri**: movimento in atto, arrivi, cambi rapidi di stato (Spade/Bastoni velocissimi; Coppe romantico; Denari costante).
3. **Regine**: governo ricettivo, intelligenza emotiva o pratica gi\xE0 maturata.
4. **Re**: decisione responsabile, guida professionale, consolidamento di posizione.`
      },
      {
        moduleNumber: "04",
        title: "Integrazione Maggiori + Minori e Tempistiche",
        subtitle: "Calibrare settimane, mesi e azioni concrete nelle previsioni",
        format: "Protocollo Previsionale PDF",
        readingMinutes: 22,
        keyTakeaways: [
          "Usare gli Arcani Minori come lente di dettaglio attorno a un Arcano Maggiore.",
          "Indicatori di tempo rapido (Bastoni/Spade) vs maturazione graduale (Coppe/Denari).",
          "Sintesi di stese miste su temi lavorativi e relazionali."
        ],
        contentMarkdown: `## La Lettura Integrata a 78 Carte

Un Arcano Maggiore indica *che cosa* sta maturando a livello profondo; l'Arcano Minore adiacente specifica *come* e *in quali tempi* si manifesta.

### Esempio di Lettura Combinata
- **Il Sole + Asso di Denari**: opportunit\xE0 concreta di contratto, nuova entrata economica o avvio solido entro poche settimane.
- **La Giustizia + Tre di Spade**: chiarezza necessaria dopo una parola non detta; l'equilibrio torna scegliendo trasparenza.`
      }
    ]
  },
  {
    slug: "metodi-stesura",
    title: "Metodi di Stesura",
    subtitle: "Architetture di Lettura, Sintesi ed Etica del Consulto",
    description: "Dalla domanda alla narrazione coerente: impara a scegliere la geometria di stesa pi\xF9 adatta, collegare le carte tra loro e condurre un consulto professionale.",
    priceEur: 240,
    stripePriceId: process.env.STRIPE_PRICE_ID_CORSO_METODI_STESURA || "STRIPE_PRICE_ID_CORSO_METODI_STESURA",
    lessonsCount: 10,
    totalHours: "7h 30m video",
    levelLabel: "Livello Avanzato & Pratica",
    sortOrder: 3,
    dispense: [
      {
        moduleNumber: "01",
        title: "L\u2019Arte della Domanda e Patto Deontologico",
        subtitle: "Trasformare quesiti chiusi in domande generative e verificabili",
        format: "Guida Operativa PDF",
        readingMinutes: 18,
        keyTakeaways: [
          "Perch\xE9 evitare domande binarie rigide (\u201Cs\xEC/no\u201D) che spengono il dialogo.",
          "Struttura del patto iniziale con il consultante secondo la Legge 4/2013.",
          "Rituale sobrio di centratura prima di estrarre le carte."
        ],
        contentMarkdown: `## Prima delle Carte: Formulare la Domanda Giusta

La precisione di una stesa nasce prima ancora di mescolare il mazzo: una domanda confusa produce risposte confuse.

### Riformulazione Pratica
- **Invece di**: "Andr\xE0 bene il progetto?"
- **Formula**: "Quali risorse sostengono questo progetto oggi e quale direzione evolutiva mostrano i prossimi tre mesi?"

### Apertura del Consulto
Spiegare in modo sobrio che la lettura illumina il presente e traccia le tendenze future rispettando sempre la libert\xE0 di azione della persona crea immediatamente fiducia e serenit\xE0.`
      },
      {
        moduleNumber: "02",
        title: "Stese Essenziali (3 e 5 Carte) e Linea Temporale",
        subtitle: "Schemi rapidi ad alta leggibilit\xE0 per consulti da 45 minuti",
        format: "Quaderno Schemi PDF",
        readingMinutes: 20,
        keyTakeaways: [
          "Stesa a 3 carte: Radice \xB7 Nodo Attuale \xB7 Tendenza Futura.",
          "Stesa del Bivio a 5 carte per confrontare due scelte lavorative o affettive.",
          "Evitare la sovrapposizione di carte extra non necessarie."
        ],
        contentMarkdown: `## Geometrie Essenziali ad Alta Chiarezza

Non serve estrarre dieci carte quando una domanda chiede decisione immediata.

### 1. Stesa a 3 Carte (Presente \u2192 Futuro)
1. Stato attuale e radice emotiva/pratica.
2. Ostacolo o leva decisiva del momento.
3. Direzione previsionale pi\xF9 probabile e consiglio operativo.

### 2. Stesa del Bivio (5 Carte)
Carta 1 al centro (il consultante), poi due rami paralleli (2-3 per l'Opzione A, 4-5 per l'Opzione B) per confrontare serenamente fatiche e frutti di ciascuna scelta.`
      },
      {
        moduleNumber: "03",
        title: "La Croce Celtica a 10 Carte nel Metodo Tarot Italia",
        subtitle: "Lettura stratificata di contesto, influenze e sviluppo futuro",
        format: "Mappa Posizioni PDF + Caso Reale",
        readingMinutes: 30,
        keyTakeaways: [
          "Significato esatto delle 6 posizioni della Croce centrale e delle 4 del Bastone.",
          "Come leggere la Carta 2 (l\u2019attraversamento) non solo come blocco ma come stimolo.",
          "Collegare la Posizione 6 (futuro prossimo) alla Posizione 10 (esito di ciclo)."
        ],
        contentMarkdown: `## La Croce Celtica: Architettura Classica

La Croce Celtica rimane lo strumento pi\xF9 completo per sviscerare una questione articolata in un consulto da 60 minuti.

### La Croce (Posizioni 1\u20136)
1. Il cuore del presente.
2. Ci\xF2 che attraversa o sfida la situazione.
3. L'obiettivo consapevole.
4. La radice profonda / memoria inconscia.
5. Il passato recente che si sta chiudendo.
6. Il futuro prossimo in avvicinamento.

### Il Bastone Verticale (Posizioni 7\u201310)
7. Atteggiamento del consultante \xB7 8. Ambiente e persone attorno \xB7 9. Timori o attese \xB7 10. Sintesi evolutiva finale.`
      },
      {
        moduleNumber: "04",
        title: "La Ruota delle 12 Case e Sintesi Scritta Finale",
        subtitle: "Mappatura annuale completa e restituzione professionale",
        format: "Template Sintesi + Ruota 12 Case",
        readingMinutes: 25,
        keyTakeaways: [
          "Distribuire le 12 aree di vita (identit\xE0, risorse, casa, amore, lavoro, visione).",
          "Individuare le carte ponte che collegano ambiti distanti.",
          "Redigere la sintesi scritta post-consulto chiara, empatica e senza tecnicismi inutili."
        ],
        contentMarkdown: `## La Ruota Annuale e l'Arte della Restituzione

Nella sessione integrata da 90 minuti la Ruota delle 12 Case offre una bussola completa per i dodici mesi successivi.

### Struttura della Sintesi Finale
1. **Filo Rosso**: il tema centrale emerso trasversalmente tra le carte.
2. **Punti di Forza**: le risorse gi\xE0 attive su cui appoggiarsi subito.
3. **Snodi Previsionali**: i mesi o passaggi chiave che richiedono attenzione o slancio.
4. **Tre Domande Maieutiche**: spunti concreti che il consultante porta con s\xE9 dopo l'incontro.`
      }
    ]
  }
];

// src/lib/paymentCatalog.ts
var COURSE_STRIPE_PRICE_ENV = {
  "arcani-maggiori": "STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI",
  "arcani-minori": "STRIPE_PRICE_ID_CORSO_ARCANI_MINORI",
  "metodi-stesura": "STRIPE_PRICE_ID_CORSO_METODI_STESURA"
};
function courseStripePriceAnnotation(slug) {
  return COURSE_STRIPE_PRICE_ENV[slug] || `STRIPE_PRICE_ID_CORSO_${slug}`;
}

// src/lib/bookingSlots.ts
var HOUR_SLOTS = Array.from(
  { length: 14 },
  (_, i) => `${String(i + 9).padStart(2, "0")}:00`
);

// src/lib/zohoMail.ts
import nodemailer from "nodemailer";

// src/db/repository.ts
var seedPromise = null;
async function ensureCatalogSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      try {
        for (const item of COURSE_SEED_CATALOG) {
          const inserted = await db.insert(courses).values({
            slug: item.slug,
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            priceEur: item.priceEur,
            stripePriceId: item.stripePriceId,
            lessonsCount: item.lessonsCount,
            totalHours: item.totalHours,
            levelLabel: item.levelLabel,
            sortOrder: item.sortOrder,
            isPublished: true
          }).onConflictDoUpdate({
            target: courses.slug,
            set: {
              title: item.title,
              subtitle: item.subtitle,
              description: item.description,
              priceEur: item.priceEur,
              stripePriceId: item.stripePriceId,
              lessonsCount: item.lessonsCount,
              totalHours: item.totalHours,
              levelLabel: item.levelLabel,
              sortOrder: item.sortOrder
            }
          }).returning();
          const courseRow = inserted[0];
          if (!courseRow) continue;
          for (let i = 0; i < item.dispense.length; i++) {
            const d = item.dispense[i];
            await db.insert(dispense).values({
              courseId: courseRow.id,
              moduleNumber: d.moduleNumber,
              title: d.title,
              subtitle: d.subtitle,
              format: d.format,
              readingMinutes: d.readingMinutes,
              contentMarkdown: d.contentMarkdown,
              keyTakeaways: JSON.stringify(d.keyTakeaways),
              sortOrder: i + 1
            }).onConflictDoUpdate({
              target: [dispense.courseId, dispense.moduleNumber],
              set: {
                title: d.title,
                subtitle: d.subtitle,
                format: d.format,
                readingMinutes: d.readingMinutes,
                contentMarkdown: d.contentMarkdown,
                keyTakeaways: JSON.stringify(d.keyTakeaways),
                sortOrder: i + 1
              }
            });
          }
        }
      } catch (error) {
        seedPromise = null;
        console.error("Catalog seeding failed:", error);
        throw new Error("Impossibile inizializzare il catalogo corsi e dispense.", {
          cause: error
        });
      }
    })();
  }
  return seedPromise;
}
async function getOrCreateUser(uid, email, displayName) {
  try {
    const result = await db.insert(users).values({
      uid,
      email,
      displayName: displayName ?? null
    }).onConflictDoUpdate({
      target: users.uid,
      set: {
        email,
        ...displayName ? { displayName } : {},
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return result[0];
  } catch (error) {
    console.error("Failed to upsert user:", error);
    throw new Error("Errore durante la sincronizzazione del profilo utente.", {
      cause: error
    });
  }
}
async function getReservedAreaOverview(uid, email, displayName) {
  await ensureCatalogSeeded();
  try {
    const dbUser = await getOrCreateUser(uid, email, displayName);
    const allCourses = await db.select().from(courses).where(eq(courses.isPublished, true)).orderBy(asc(courses.sortOrder));
    const userPurchases = await db.select().from(coursePurchases).where(
      and(
        eq(coursePurchases.userId, dbUser.id),
        eq(coursePurchases.status, "active")
      )
    );
    const unlockedCourseIds = userPurchases.map((p) => p.courseId);
    const allOutlineDispense = await db.select({
      id: dispense.id,
      courseId: dispense.courseId,
      moduleNumber: dispense.moduleNumber,
      title: dispense.title,
      subtitle: dispense.subtitle,
      format: dispense.format,
      readingMinutes: dispense.readingMinutes,
      sortOrder: dispense.sortOrder
    }).from(dispense).orderBy(asc(dispense.sortOrder));
    const unlockedDispenseRows = unlockedCourseIds.length > 0 ? await db.select().from(dispense).where(inArray(dispense.courseId, unlockedCourseIds)).orderBy(asc(dispense.sortOrder)) : [];
    const progressRows = unlockedDispenseRows.length > 0 ? await db.select().from(dispensaProgress).where(eq(dispensaProgress.userId, dbUser.id)) : [];
    const progressByDispensaId = new Map(
      progressRows.map((row) => [row.dispensaId, row])
    );
    const userBookings = await db.select().from(consultationBookings).where(eq(consultationBookings.userId, dbUser.id)).orderBy(desc(consultationBookings.createdAt));
    const userDialoguePasses = await db.select().from(dialoguePurchases).where(eq(dialoguePurchases.userId, dbUser.id)).orderBy(desc(dialoguePurchases.createdAt));
    return {
      user: {
        id: dbUser.id,
        uid: dbUser.uid,
        email: dbUser.email,
        displayName: dbUser.displayName,
        phoneWhatsapp: dbUser.phoneWhatsapp
      },
      courses: allCourses.map((course) => {
        const purchase = userPurchases.find((p) => p.courseId === course.id);
        const isUnlocked = Boolean(purchase);
        const outline = allOutlineDispense.filter((d) => d.courseId === course.id);
        const fullDispense = unlockedDispenseRows.filter((d) => d.courseId === course.id).map((d) => {
          const prog = progressByDispensaId.get(d.id);
          let parsedTakeaways = [];
          try {
            parsedTakeaways = JSON.parse(d.keyTakeaways);
          } catch {
            parsedTakeaways = [];
          }
          return {
            ...d,
            keyTakeaways: parsedTakeaways,
            completed: prog?.completed ?? false,
            personalNotes: prog?.personalNotes ?? ""
          };
        });
        return {
          ...course,
          isUnlocked,
          purchasedAt: purchase?.purchasedAt ?? null,
          amountPaidEur: purchase?.amountPaidEur ?? null,
          dispenseCount: outline.length,
          dispenseOutline: outline,
          unlockedDispense: fullDispense
        };
      }),
      bookings: userBookings,
      dialoguePasses: userDialoguePasses.map((p) => ({
        id: p.id,
        packId: p.packId,
        durationMinutes: p.durationMinutes,
        priceEur: p.priceEur,
        expiresAt: p.expiresAt.toISOString(),
        createdAt: p.createdAt.toISOString()
      }))
    };
  } catch (error) {
    console.error("Failed to load reserved area overview:", error);
    throw new Error("Impossibile recuperare i dati dell\u2019Area Riservata.", {
      cause: error
    });
  }
}
async function findCourseBySlug(courseSlug) {
  await ensureCatalogSeeded();
  const courseRows = await db.select().from(courses).where(eq(courses.slug, courseSlug)).limit(1);
  return courseRows[0] ?? null;
}
async function findCoursePurchaseByStripeSession(stripeSessionId) {
  const rows = await db.select().from(coursePurchases).where(eq(coursePurchases.stripeSessionId, stripeSessionId)).limit(1);
  return rows[0] ?? null;
}
async function enrollUserInCourse(params) {
  await ensureCatalogSeeded();
  try {
    const stripeSessionId = params.stripeSessionId.trim();
    if (!stripeSessionId) {
      throw new Error("Pagamento Stripe richiesto per attivare il percorso.");
    }
    const existingBySession = await findCoursePurchaseByStripeSession(stripeSessionId);
    if (existingBySession && existingBySession.status === "active") {
      const courseRows = await db.select().from(courses).where(eq(courses.id, existingBySession.courseId)).limit(1);
      return {
        purchase: existingBySession,
        course: courseRows[0] ?? null,
        alreadyActive: true
      };
    }
    const dbUser = await getOrCreateUser(
      params.uid,
      params.email,
      params.displayName || params.customerName
    );
    if (params.customerPhone) {
      await db.update(users).set({
        phoneWhatsapp: params.customerPhone,
        displayName: params.customerName || dbUser.displayName,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(users.id, dbUser.id));
    }
    const targetCourse = await findCourseBySlug(params.courseSlug);
    if (!targetCourse) {
      throw new Error("Percorso didattico non trovato.");
    }
    const purchaseResult = await db.insert(coursePurchases).values({
      userId: dbUser.id,
      courseId: targetCourse.id,
      status: "active",
      paymentProvider: "stripe_checkout",
      stripeSessionId,
      amountPaidEur: targetCourse.priceEur,
      customerName: params.customerName,
      customerPhone: params.customerPhone ?? null
    }).onConflictDoUpdate({
      target: [coursePurchases.userId, coursePurchases.courseId],
      set: {
        status: "active",
        stripeSessionId,
        paymentProvider: "stripe_checkout",
        amountPaidEur: targetCourse.priceEur,
        customerName: params.customerName,
        purchasedAt: /* @__PURE__ */ new Date(),
        ...params.customerPhone ? { customerPhone: params.customerPhone } : {}
      }
    }).returning();
    return {
      purchase: purchaseResult[0],
      course: targetCourse,
      alreadyActive: false
    };
  } catch (error) {
    console.error("Failed to enroll user in course:", error);
    if (error instanceof Error && (error.message === "Percorso didattico non trovato." || error.message === "Pagamento Stripe richiesto per attivare il percorso.")) {
      throw error;
    }
    throw new Error(
      "Errore durante la registrazione dell\u2019acquisto del percorso.",
      { cause: error }
    );
  }
}
async function updateDispensaProgress(params) {
  await ensureCatalogSeeded();
  try {
    const dbUser = await getOrCreateUser(params.uid, params.email);
    const dispensaRows = await db.select().from(dispense).where(eq(dispense.id, params.dispensaId)).limit(1);
    const targetDispensa = dispensaRows[0];
    if (!targetDispensa) {
      throw new Error("Dispensa non trovata.");
    }
    const purchaseRows = await db.select().from(coursePurchases).where(
      and(
        eq(coursePurchases.userId, dbUser.id),
        eq(coursePurchases.courseId, targetDispensa.courseId),
        eq(coursePurchases.status, "active")
      )
    ).limit(1);
    if (!purchaseRows[0]) {
      throw new Error("Acquisto richiesto per accedere a questa dispensa.");
    }
    const existingRows = await db.select().from(dispensaProgress).where(
      and(
        eq(dispensaProgress.userId, dbUser.id),
        eq(dispensaProgress.dispensaId, targetDispensa.id)
      )
    ).limit(1);
    const existing = existingRows[0];
    const nextCompleted = typeof params.completed === "boolean" ? params.completed : existing?.completed ?? false;
    const nextNotes = typeof params.personalNotes === "string" ? params.personalNotes : existing?.personalNotes ?? "";
    const saved = await db.insert(dispensaProgress).values({
      userId: dbUser.id,
      dispensaId: targetDispensa.id,
      completed: nextCompleted,
      personalNotes: nextNotes,
      updatedAt: /* @__PURE__ */ new Date()
    }).onConflictDoUpdate({
      target: [dispensaProgress.userId, dispensaProgress.dispensaId],
      set: {
        completed: nextCompleted,
        personalNotes: nextNotes,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return saved[0];
  } catch (error) {
    console.error("Failed to update dispensa progress:", error);
    if (error instanceof Error && (error.message === "Dispensa non trovata." || error.message === "Acquisto richiesto per accedere a questa dispensa.")) {
      throw error;
    }
    throw new Error("Errore durante il salvataggio degli appunti di studio.", {
      cause: error
    });
  }
}
var DIALOGUE_PACK_CATALOG = {
  "5m": {
    id: "5m",
    title: "Pass Rapido \xB7 5 Minuti",
    durationMinutes: 5,
    priceEur: 3,
    stripePriceId: process.env.STRIPE_PRICE_ID_DIALOGO_5M || "STRIPE_PRICE_ID_DIALOGO_5M"
  },
  "10m": {
    id: "10m",
    title: "Pass Luce \xB7 10 Minuti",
    durationMinutes: 10,
    priceEur: 5,
    stripePriceId: process.env.STRIPE_PRICE_ID_DIALOGO_10M || "STRIPE_PRICE_ID_DIALOGO_10M"
  },
  "15m": {
    id: "15m",
    title: "Pass Cosmos \xB7 15 Minuti",
    durationMinutes: 15,
    priceEur: 7,
    stripePriceId: process.env.STRIPE_PRICE_ID_DIALOGO_15M || "STRIPE_PRICE_ID_DIALOGO_15M"
  }
};

// src/lib/stripe.ts
function stripeSecretKey() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key || key.startsWith("MY_") || key.length < 10) {
    return null;
  }
  return key;
}
function isStripeConfigured() {
  return Boolean(stripeSecretKey());
}
function allowDirectUnlock() {
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  return process.env.ALLOW_DIRECT_UNLOCK === "true";
}
function resolveStripePriceId(envOrAnnotation) {
  if (!envOrAnnotation) return null;
  const trimmed = envOrAnnotation.trim();
  if (trimmed.startsWith("price_")) return trimmed;
  const fromEnv = process.env[trimmed]?.trim();
  if (fromEnv && fromEnv.startsWith("price_")) return fromEnv;
  return null;
}
async function createCheckoutSession(params) {
  const stripeKey = stripeSecretKey();
  if (!stripeKey) {
    throw new Error("STRIPE_NOT_CONFIGURED");
  }
  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("customer_email", params.customerEmail);
  form.set("success_url", params.successUrl);
  form.set("cancel_url", params.cancelUrl);
  form.set("line_items[0][quantity]", String(params.lineItem.quantity ?? 1));
  if ("priceId" in params.lineItem) {
    form.set("line_items[0][price]", params.lineItem.priceId);
  } else {
    const { priceData } = params.lineItem;
    form.set("line_items[0][price_data][currency]", priceData.currency);
    form.set(
      "line_items[0][price_data][unit_amount]",
      String(priceData.unitAmountCents)
    );
    form.set(
      "line_items[0][price_data][product_data][name]",
      priceData.productName
    );
    if (priceData.productDescription) {
      form.set(
        "line_items[0][price_data][product_data][description]",
        priceData.productDescription
      );
    }
  }
  for (const [key, value] of Object.entries(params.metadata)) {
    if (value != null && value !== "") {
      form.set(`metadata[${key}]`, value);
    }
  }
  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form.toString()
  });
  const stripeData = await stripeRes.json();
  if (!stripeRes.ok || !stripeData.id || !stripeData.url) {
    console.error("Stripe checkout session create failed:", stripeData.error);
    throw new Error("STRIPE_CHECKOUT_CREATE_FAILED");
  }
  return { id: stripeData.id, url: stripeData.url };
}
async function retrieveCheckoutSession(sessionId) {
  const stripeKey = stripeSecretKey();
  if (!stripeKey) {
    throw new Error("STRIPE_NOT_CONFIGURED");
  }
  const verifyRes = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: { Authorization: `Bearer ${stripeKey}` }
    }
  );
  const sessionObj = await verifyRes.json();
  if (!verifyRes.ok) {
    console.error("Stripe session retrieve failed:", sessionObj.error);
    throw new Error("STRIPE_SESSION_RETRIEVE_FAILED");
  }
  return sessionObj;
}
async function assertCheckoutPaid(sessionId) {
  const session = await retrieveCheckoutSession(sessionId);
  if (session.payment_status !== "paid") {
    throw new Error("STRIPE_PAYMENT_NOT_PAID");
  }
  return session;
}
function checkoutLineItemFromCatalog(params) {
  const priceId = resolveStripePriceId(params.stripePriceIdAnnotation);
  if (priceId) {
    return { priceId, quantity: 1 };
  }
  return {
    priceData: {
      currency: "eur",
      unitAmountCents: Math.round(params.priceEur * 100),
      productName: params.productName,
      productDescription: params.productDescription
    },
    quantity: 1
  };
}

// src/server/activations.ts
async function activateCourseFromPaidSession(params) {
  const session = await assertCheckoutPaid(params.stripeSessionId);
  const meta = session.metadata || {};
  if (meta.itemType && meta.itemType !== "course") {
    throw new Error("STRIPE_WRONG_ITEM_TYPE");
  }
  const courseSlug = String(
    meta.courseSlug || params.fallbackCourseSlug || ""
  ).trim();
  const customerName = String(
    meta.customerName || params.fallbackCustomerName || params.displayName || "Corsista"
  ).trim();
  const customerPhone = meta.customerPhone ? String(meta.customerPhone).trim() : params.fallbackCustomerPhone;
  if (!courseSlug) {
    throw new Error("Metadati pagamento incompleti.");
  }
  return enrollUserInCourse({
    uid: params.uid,
    email: params.email,
    displayName: params.displayName,
    courseSlug,
    customerName,
    customerPhone,
    stripeSessionId: params.stripeSessionId
  });
}

// src/server/http.ts
var SAFE_CLIENT_ERRORS = /* @__PURE__ */ new Set([
  "Percorso didattico non trovato.",
  "Dispensa non trovata.",
  "Acquisto richiesto per accedere a questa dispensa.",
  "Tariffa consulto non valida.",
  "Pacchetto temporale non valido.",
  "Pagamento Stripe richiesto per attivare il percorso.",
  "Pagamento Stripe richiesto per attivare il pass.",
  "SLOT_TAKEN",
  "Prenotazione non trovata.",
  "Prenotazione annullata."
]);
function json(status, body) {
  return { status, body };
}
function mapSafeError(error, fallback, statusHints) {
  const msg = error instanceof Error ? error.message : "";
  if (statusHints?.notFound && msg.includes(statusHints.notFound)) {
    return json(404, { error: msg });
  }
  if (statusHints?.forbidden && msg.includes(statusHints.forbidden)) {
    return json(403, { error: msg });
  }
  if (statusHints?.paymentRequired && msg.includes(statusHints.paymentRequired)) {
    return json(402, { error: msg });
  }
  if (SAFE_CLIENT_ERRORS.has(msg)) {
    const status = msg.includes("non trov") ? 404 : msg.includes("richiesto") ? 402 : 400;
    return json(status, { error: msg });
  }
  console.error(fallback, error);
  return json(500, { error: fallback });
}

// src/server/routes/reserved.ts
async function getReservedOverview(user) {
  try {
    if (!user.uid) {
      return json(401, { error: "Identit\xE0 utente non valida." });
    }
    const overview = await getReservedAreaOverview(
      user.uid,
      user.email || "",
      user.name ?? null
    );
    return json(200, overview);
  } catch (error) {
    return mapSafeError(error, "Impossibile aprire l\u2019Area Riservata.");
  }
}
async function postReservedEnroll(params) {
  try {
    const { user, body, origin } = params;
    const email = user.email || String(body.email || "");
    const displayName = user.name ?? null;
    if (!user.uid || !email) {
      return json(401, { error: "Autenticazione richiesta." });
    }
    const courseSlug = String(body.courseSlug || "").trim();
    const customerName = String(
      body.customerName || displayName || ""
    ).trim();
    const customerPhone = body.customerPhone ? String(body.customerPhone).trim() : void 0;
    const stripeSessionId = body.stripeSessionId ? String(body.stripeSessionId).trim() : "";
    if (!courseSlug || !customerName) {
      return json(400, {
        error: "Dati del percorso o nominativo mancanti."
      });
    }
    const course = await findCourseBySlug(courseSlug);
    if (!course) {
      return json(404, { error: "Percorso didattico non trovato." });
    }
    if (stripeSessionId) {
      const result = await activateCourseFromPaidSession({
        uid: user.uid,
        email,
        displayName,
        stripeSessionId,
        fallbackCourseSlug: courseSlug,
        fallbackCustomerName: customerName,
        fallbackCustomerPhone: customerPhone
      });
      return json(201, { mode: "enrolled", ...result });
    }
    if (isStripeConfigured()) {
      const priceAnnotation = course.stripePriceId || courseStripePriceAnnotation(course.slug);
      const checkout = await createCheckoutSession({
        customerEmail: email,
        successUrl: `${origin}/area-riservata?course_stripe_session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/area-riservata?checkout=cancel&item=course`,
        lineItem: checkoutLineItemFromCatalog({
          stripePriceIdAnnotation: priceAnnotation,
          priceEur: course.priceEur,
          productName: `Tarot Italia \xB7 ${course.title}`,
          productDescription: course.subtitle
        }),
        metadata: {
          itemType: "course",
          courseSlug: course.slug,
          customerName,
          customerEmail: email,
          customerPhone: customerPhone || "",
          firebaseUserId: user.uid
        }
      });
      return json(200, {
        mode: "stripe_redirect",
        checkoutUrl: checkout.url,
        stripeSessionId: checkout.id
      });
    }
    if (allowDirectUnlock()) {
      const result = await enrollUserInCourse({
        uid: user.uid,
        email,
        displayName,
        courseSlug,
        customerName,
        customerPhone,
        stripeSessionId: `cs_dev_course_${course.slug}_${Date.now()}`
      });
      return json(201, { mode: "direct_unlock", ...result });
    }
    return json(503, {
      error: "Pagamenti Stripe non configurati. Imposta STRIPE_SECRET_KEY (e i Price ID) oppure, solo in sviluppo, ALLOW_DIRECT_UNLOCK=true."
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";
    if (msg === "STRIPE_PAYMENT_NOT_PAID") {
      return json(402, { error: "Pagamento Stripe non ancora confermato." });
    }
    if (msg === "Metadati pagamento incompleti." || msg === "STRIPE_WRONG_ITEM_TYPE") {
      return json(400, { error: "Metadati pagamento incompleti." });
    }
    return mapSafeError(error, "Errore nella registrazione del percorso.", {
      notFound: "non trovato"
    });
  }
}
async function postReservedConfirmStripe(params) {
  try {
    const { user, body } = params;
    const email = user.email || "";
    const stripeSessionId = String(body.stripeSessionId || "").trim();
    if (!user.uid || !email) {
      return json(401, { error: "Autenticazione richiesta." });
    }
    if (!stripeSessionId || !isStripeConfigured()) {
      return json(400, { error: "Sessione Stripe non verificabile." });
    }
    const result = await activateCourseFromPaidSession({
      uid: user.uid,
      email,
      displayName: user.name ?? null,
      stripeSessionId
    });
    return json(200, { mode: "enrolled", ...result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";
    if (msg === "STRIPE_PAYMENT_NOT_PAID") {
      return json(402, { error: "Pagamento Stripe non ancora confermato." });
    }
    return mapSafeError(error, "Errore nella verifica del pagamento corso.");
  }
}
async function putDispensaProgress(params) {
  try {
    const { user, dispensaId, body } = params;
    if (!user.uid) {
      return json(401, { error: "Autenticazione richiesta." });
    }
    if (!Number.isInteger(dispensaId) || dispensaId <= 0) {
      return json(400, { error: "Identificativo dispensa non valido." });
    }
    const completed = typeof body.completed === "boolean" ? body.completed : void 0;
    const personalNotes = typeof body.personalNotes === "string" ? body.personalNotes : void 0;
    const updated = await updateDispensaProgress({
      uid: user.uid,
      email: user.email || "",
      dispensaId,
      completed,
      personalNotes
    });
    return json(200, { progress: updated });
  } catch (error) {
    return mapSafeError(error, "Errore nel salvataggio del progresso.", {
      notFound: "non trovata",
      forbidden: "Acquisto richiesto"
    });
  }
}

// src/db/ensureBookingSchema.ts
async function ensureBookingSchema() {
  const pool2 = createPool();
  const statements = [
    `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'remote'`,
    `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS stripe_session_id text`,
    `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text`,
    `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS google_calendar_event_id text`,
    `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS paid_at timestamp`,
    `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS updated_at timestamp DEFAULT NOW() NOT NULL`,
    `CREATE UNIQUE INDEX IF NOT EXISTS consultation_bookings_stripe_session_idx
       ON consultation_bookings (stripe_session_id)
       WHERE stripe_session_id IS NOT NULL`,
    `CREATE UNIQUE INDEX IF NOT EXISTS consultation_bookings_active_slot_idx
       ON consultation_bookings (scheduled_date, scheduled_time)
       WHERE status IN ('pending_payment', 'confirmed')`
  ];
  for (const sql of statements) {
    try {
      await pool2.query(sql);
    } catch (error) {
      console.error("ensureBookingSchema statement failed:", sql, error);
    }
  }
}

// src/lib/firebase-admin.ts
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// firebase-applet-config.json
var firebase_applet_config_default = {
  projectId: "gen-lang-client-0720467504",
  appId: "1:1047401794154:web:aa75f229bfcf6d7cd89813",
  apiKey: "AIzaSyA_dxXXBJWBWJBx5pQ68xlUhvSKmI_ki9Q",
  authDomain: "gen-lang-client-0720467504.firebaseapp.com",
  storageBucket: "gen-lang-client-0720467504.firebasestorage.app",
  messagingSenderId: "1047401794154",
  measurementId: "",
  oAuthClientId: "1047401794154-fdg833gsf1h9bken88krg5ge383j9sa5.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

// src/lib/firebase-admin.ts
function buildOptions() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    try {
      const serviceAccount = JSON.parse(raw);
      return {
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id || firebase_applet_config_default.projectId
      };
    } catch (error) {
      console.error(
        "FIREBASE_SERVICE_ACCOUNT_JSON non valido \u2014 fallback projectId only:",
        error
      );
    }
  }
  return { projectId: firebase_applet_config_default.projectId };
}
if (!getApps().length) {
  initializeApp(buildOptions());
}
var adminAuth = getAuth();

// src/server/authToken.ts
function toApiUser(token) {
  return {
    uid: token.uid,
    email: token.email,
    name: typeof token.name === "string" ? token.name : void 0
  };
}
async function verifyBearerToken(authorization, mode) {
  if (!authorization || !authorization.startsWith("Bearer ")) {
    if (mode === "required") {
      return {
        ok: false,
        status: 401,
        error: "Autenticazione richiesta per accedere all\u2019Area Riservata."
      };
    }
    return { ok: true, user: null };
  }
  const token = authorization.slice("Bearer ".length);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return { ok: true, user: toApiUser(decoded) };
  } catch (error) {
    if (mode === "optional") {
      return { ok: true, user: null };
    }
    console.error("Error verifying Firebase ID token:", error);
    return {
      ok: false,
      status: 401,
      error: "Sessione non valida o scaduta. Effettua nuovamente l\u2019accesso."
    };
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
function readHeader(req, name) {
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (key.toLowerCase() !== target) continue;
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  }
  return "";
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
function requestOrigin(req) {
  const proto = readHeader(req, "x-forwarded-proto") || "https";
  const host = readHeader(req, "x-forwarded-host") || readHeader(req, "host");
  if (host) {
    return `${proto}://${host}`.replace(/\/$/, "");
  }
  const origin = readHeader(req, "origin");
  if (origin) return origin.replace(/\/$/, "");
  return (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
}

// src/server/vercelAdapter.ts
async function ensureSchemaOnce() {
  if (!globalThis._ennamoSchemaReady) {
    globalThis._ennamoSchemaReady = ensureBookingSchema().catch((error) => {
      console.error("ensureBookingSchema failed (non-fatal):", error);
    });
  }
  await globalThis._ennamoSchemaReady;
}
function sendApiResult(res, result) {
  sendJson(res, result.status, result.body);
}
async function requireUser(req, res) {
  const auth = await verifyBearerToken(
    readHeaderSafe(req, "authorization") || void 0,
    "required"
  );
  if (!auth.ok) {
    sendJson(res, auth.status, { error: auth.error });
    return null;
  }
  return auth.user;
}
function methodNotAllowed(res, allowed) {
  res.setHeader("Allow", allowed.join(", "));
  sendJson(res, 405, { error: "Metodo non consentito." });
}
function readHeaderSafe(req, name) {
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (key.toLowerCase() !== target) continue;
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  }
  return "";
}

// src/server/vercelEntry.ts
function sendJson2(res, status, body) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    const withStatus = res.status(status);
    if (typeof withStatus.json === "function") {
      withStatus.json(body);
      return;
    }
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}
function groupSubpath(req, prefix) {
  const fromQuery = req.query?.__path;
  if (typeof fromQuery === "string" && fromQuery.trim()) {
    return fromQuery.replace(/^\/+|\/+$/g, "");
  }
  if (Array.isArray(fromQuery) && fromQuery[0]) {
    return String(fromQuery[0]).replace(/^\/+|\/+$/g, "");
  }
  const headerPath = (typeof req.headers?.["x-forwarded-uri"] === "string" ? req.headers["x-forwarded-uri"] : void 0) || (typeof req.headers?.["x-invoke-path"] === "string" ? req.headers["x-invoke-path"] : void 0) || (typeof req.headers?.["x-matched-path"] === "string" ? req.headers["x-matched-path"] : void 0);
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const raw of [headerPath, req.url, ""]) {
    if (!raw) continue;
    const pathname = String(raw).split("?")[0] || "";
    const cleaned = pathname.replace(new RegExp(`^/?api/${escaped}/?`, "i"), "").replace(new RegExp(`^/?api/${escaped}$`, "i"), "").replace(/^\/+|\/+$/g, "");
    if (cleaned && cleaned !== prefix) return cleaned;
  }
  return "";
}

// src/server/apiEntries/reserved.ts
var config = { runtime: "nodejs", maxDuration: 30 };
async function handler(req, res) {
  try {
    const method = (req.method || "GET").toUpperCase();
    const path = groupSubpath(req, "reserved");
    await ensureSchemaOnce();
    if (path === "overview") {
      if (method !== "GET") return methodNotAllowed(res, ["GET"]);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(res, await getReservedOverview(user));
    }
    if (path === "enroll") {
      if (method !== "POST") return methodNotAllowed(res, ["POST"]);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(
        res,
        await postReservedEnroll({
          user,
          body: readBodyObject(req),
          origin: requestOrigin(req)
        })
      );
    }
    if (path === "confirm-stripe") {
      if (method !== "POST") return methodNotAllowed(res, ["POST"]);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(
        res,
        await postReservedConfirmStripe({
          user,
          body: readBodyObject(req)
        })
      );
    }
    const dispensaProgress2 = path.match(/^dispense\/([^/]+)\/progress$/);
    if (dispensaProgress2) {
      if (method !== "PUT") return methodNotAllowed(res, ["PUT"]);
      const user = await requireUser(req, res);
      if (!user) return;
      return sendApiResult(
        res,
        await putDispensaProgress({
          user,
          dispensaId: Number(dispensaProgress2[1]),
          body: readBodyObject(req)
        })
      );
    }
    return sendJson2(res, 404, { error: "Not found", path, method });
  } catch (error) {
    console.error("api/reserved handler failed:", error);
    return sendJson2(res, 500, {
      error: "Internal server error",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}
export {
  config,
  handler as default
};
