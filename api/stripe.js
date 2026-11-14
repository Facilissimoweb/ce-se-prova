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
var BOOKING_TARIFF_CATALOG = {
  "45m": {
    id: "45m",
    title: "Consulto Essenziale",
    durationMinutes: 45,
    priceEur: 60,
    stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_45M"
  },
  "60m": {
    id: "60m",
    title: "Consulto Evolutivo Completo",
    durationMinutes: 60,
    priceEur: 85,
    stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_60M"
  },
  "90m": {
    id: "90m",
    title: "Sessione Integrata & Ciclo",
    durationMinutes: 90,
    priceEur: 120,
    stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_90M"
  }
};

// src/lib/bookingRules.ts
var EVENING_SLOT_HOUR = 19;
function isEveningSlot(slot) {
  const hour = Number(String(slot).slice(0, 2));
  return Number.isFinite(hour) && hour >= EVENING_SLOT_HOUR;
}
function resolveBookingMode(mode, slot) {
  if (isEveningSlot(slot)) return "remote";
  return mode === "studio" ? "studio" : "remote";
}
function sessionModeLabel(mode, slot) {
  const resolved = resolveBookingMode(mode, slot);
  const base = resolved === "remote" ? "Chiamata vocale WhatsApp" : "Dal vivo a Macerata";
  return isEveningSlot(slot) ? `${base} \xB7 dalle 19:00 solo online` : base;
}

// src/lib/bookingSlots.ts
var BOOKING_TIMEZONE = "Europe/Rome";
var HOUR_SLOTS = Array.from(
  { length: 14 },
  (_, i) => `${String(i + 9).padStart(2, "0")}:00`
);

// src/lib/bookingConfirmTemplates.ts
function fillBookingConfirmHtml(vars) {
  return fillTemplate(BOOKING_CONFIRM_HTML, vars);
}
function fillBookingConfirmText(vars) {
  return fillTemplate(BOOKING_CONFIRM_TEXT, vars);
}
function fillTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = vars[key];
    return value == null ? "" : String(value);
  });
}
function formatBookingDateIt(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre"
  ];
  if (!year || !month || !day || month < 1 || month > 12) return iso;
  return `${day} ${months[month - 1]} ${year}`;
}
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
var BOOKING_CONFIRM_TEXT = `Pagamento ricevuto \u2014 Tarot Italia

{{user_name}}, sono Teresa. Il pagamento \xE8 andato a buon fine. La sessione \xE8 riservata sul tuo spazio.

Consulto: {{session_title}}
Quando: {{booking_date}} \xB7 {{booking_time}}
Modalit\xE0: {{session_mode}}
Importo: \u20AC{{amount}}
Riferimento: {{booking_id}}
Transazione: {{transaction_id}}

Area riservata: {{riservata_url}}
Recesso e assistenza: {{whatsapp_url}}

A presto,
Teresa
Maria Teresa Rogani \xB7 Tarot Italia

{{support_email}} \u2014 ti rispondo personalmente
https://www.tarotitalia.com
`;
var BOOKING_CONFIRM_HTML = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pagamento ricevuto \u2014 Tarot Italia</title>
</head>
<body style="margin:0;padding:0;background-color:#F9F8F6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F9F8F6;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;width:100%;">
          <tr>
            <td align="center" style="padding:0 0 28px 0;">
              <p style="margin:0;font-family:Georgia,serif;font-size:18px;letter-spacing:0.14em;text-transform:uppercase;color:#2B2523;">Tarot Italia</p>
              <p style="margin:10px 0 0 0;font-family:Arial,sans-serif;font-size:13px;color:#7A8B78;">di Maria Teresa Rogani, operatore olistico</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 8px 0;font-family:Arial,sans-serif;font-size:16px;line-height:1.65;color:#2B2523;">
              <p style="margin:0 0 18px 0;font-family:Georgia,serif;font-size:22px;">Pagamento ricevuto</p>
              <p style="margin:0 0 16px 0;">{{user_name}}, sono Teresa. Il pagamento \xE8 andato a buon fine. La sessione \xE8 riservata sul tuo spazio.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 28px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F1F0EC;border:1px solid #7A8B78;">
                <tr>
                  <td style="padding:22px 20px;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#2B2523;">
                    <p style="margin:0 0 14px 0;font-family:Georgia,serif;font-size:15px;">Dettagli della sessione</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Consulto</span><br />{{session_title}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Quando</span><br />{{booking_date}} \xB7 {{booking_time}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Modalit\xE0</span><br />{{session_mode}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Importo</span><br />\u20AC{{amount}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Riferimento</span><br />{{booking_id}}</p>
                    <p style="margin:0;"><span style="color:#7A8B78;">Transazione</span><br />{{transaction_id}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 0 28px 0;">
              <a href="{{riservata_url}}" style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;color:#F9F8F6;background-color:#2B2523;">Area Riservata</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 36px 0;font-family:Georgia,serif;font-size:16px;color:#2B2523;">
              <p style="margin:0 0 6px 0;font-style:italic;">A presto,</p>
              <p style="margin:0;">Teresa</p>
              <p style="margin:6px 0 0 0;font-family:Arial,sans-serif;font-size:13px;color:#7A8B78;">Maria Teresa Rogani \xB7 Tarot Italia</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-family:Arial,sans-serif;font-size:12px;color:#7A8B78;">
              <a href="{{whatsapp_url}}" style="color:#7A8B78;">Recesso e assistenza</a>
              \xB7 <a href="mailto:{{support_email}}" style="color:#7A8B78;">{{support_email}}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// src/lib/googleCalendar.ts
import { createSign } from "crypto";
var CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
function calendarId() {
  return process.env.GOOGLE_CALENDAR_ID?.trim() || process.env.GOOGLE_CALENDAR_EMAIL?.trim() || "primary";
}
async function googleAccessToken() {
  const refresh = process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim() || process.env.GOOGLE_CALENDAR_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
  if (refresh && clientId && clientSecret) {
    const res2 = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh,
        client_id: clientId,
        client_secret: clientSecret
      })
    });
    const data2 = await res2.json();
    if (!res2.ok || !data2.access_token) {
      console.error("Google OAuth token", res2.status, data2);
      return null;
    }
    return data2.access_token;
  }
  const email = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  if (!email || !key) return null;
  const now = Math.floor(Date.now() / 1e3);
  const header = Buffer.from(
    JSON.stringify({ alg: "RS256", typ: "JWT" })
  ).toString("base64url");
  const claim = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: CALENDAR_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600
    })
  ).toString("base64url");
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(key).toString("base64url");
  const assertion = `${unsigned}.${signature}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    console.error("Google service account token", res.status, data);
    return null;
  }
  return data.access_token;
}
function addMinutes(day, slot, minutes) {
  const [hour, minute] = slot.split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  const pad = (n) => String(n).padStart(2, "0");
  const daysAhead = Math.floor(total / (24 * 60));
  const mins = (total % (24 * 60) + 24 * 60) % (24 * 60);
  const endH = Math.floor(mins / 60);
  const endM = mins % 60;
  if (!daysAhead) return `${day}T${pad(endH)}:${pad(endM)}:00`;
  const [year, month, date] = day.split("-").map(Number);
  const next = new Date(year, month - 1, date + daysAhead);
  return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}T${pad(endH)}:${pad(endM)}:00`;
}
async function createGoogleCalendarEvent(booking) {
  const token = await googleAccessToken();
  if (!token) {
    console.error(
      "Google Calendar skipped \u2014 missing OAuth or service account secrets"
    );
    return null;
  }
  const start = `${booking.day}T${booking.slot}:00`;
  const end = addMinutes(booking.day, booking.slot, booking.minutes);
  const body = {
    summary: `Tarot Italia \xB7 ${booking.title} \xB7 ${booking.guestName}`,
    description: [
      booking.title,
      `Quando: ${booking.day} \xB7 ${booking.slot}`,
      `Modalit\xE0: ${booking.modeLabel}`,
      `Recapito: ${booking.phone}`,
      booking.customerEmail ? `Email: ${booking.customerEmail}` : "",
      `Riferimento: ${booking.id}`
    ].filter(Boolean).join("\n"),
    start: { dateTime: start, timeZone: BOOKING_TIMEZONE },
    end: { dateTime: end, timeZone: BOOKING_TIMEZONE },
    transparency: "opaque",
    status: "confirmed",
    reminders: { useDefault: true }
  };
  const id = calendarId();
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?sendUpdates=none`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );
  if (!res.ok) {
    console.error("Google Calendar insert", res.status, await res.text());
    return null;
  }
  const data = await res.json();
  return data.id ?? null;
}

// src/lib/zohoMail.ts
import nodemailer from "nodemailer";
function zohoConfigured() {
  const user = process.env.ZOHO_EMAIL?.trim();
  const pass = process.env.ZOHO_PASSWORD;
  if (!user || !pass) return null;
  const host = process.env.ZOHO_SMTP_HOST?.trim() || "smtp.zoho.eu";
  const port = Number(process.env.ZOHO_SMTP_PORT || "465");
  return { user, pass, host, port: Number.isFinite(port) ? port : 465 };
}
function isZohoMailConfigured() {
  return Boolean(zohoConfigured());
}
async function sendZohoMails(messages) {
  const cfg = zohoConfigured();
  if (!cfg) {
    throw new Error("ZOHO_NOT_CONFIGURED");
  }
  const fromAddress = process.env.ZOHO_FROM_EMAIL?.trim() || cfg.user;
  const fromName = process.env.ZOHO_FROM_NAME?.trim() || "Maria Teresa Rogani \xB7 Tarot Italia";
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 2e4,
    greetingTimeout: 2e4,
    socketTimeout: 3e4
  });
  try {
    for (const message of messages) {
      await transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        replyTo: message.replyTo || fromAddress,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html
      });
    }
  } finally {
    transporter.close();
  }
}

// src/lib/bookingFulfillment.ts
async function fulfillConfirmedBooking(row, extras) {
  const mode = resolveBookingMode(
    String(row.mode || "remote"),
    row.scheduledTime
  );
  const modeLabel = sessionModeLabel(mode, row.scheduledTime);
  const tariff = row.tariffId in BOOKING_TARIFF_CATALOG ? BOOKING_TARIFF_CATALOG[row.tariffId] : null;
  const title = tariff?.title || `Consulto ${row.durationMinutes} minuti`;
  try {
    await sendBookingMails(row, {
      ...extras,
      title,
      modeLabel
    });
  } catch (error) {
    console.error("booking mail", error);
  }
  let calendarEventId = null;
  try {
    calendarEventId = await createGoogleCalendarEvent({
      id: row.id,
      title,
      day: row.scheduledDate,
      slot: row.scheduledTime,
      minutes: row.durationMinutes,
      modeLabel,
      guestName: row.fullName,
      phone: row.phoneWhatsapp,
      customerEmail: extras.customerEmail || row.email
    });
  } catch (error) {
    console.error("booking calendar", error);
  }
  return { calendarEventId };
}
async function sendBookingMails(row, extras) {
  if (!isZohoMailConfigured()) {
    console.error("Missing ZOHO secrets \u2014 booking mail skipped");
    return;
  }
  const site = (process.env.APP_URL?.trim() || process.env.SITE_URL?.trim() || "https://www.tarotitalia.com").replace(/\/$/, "");
  const supportEmail = process.env.ZOHO_FROM_EMAIL?.trim() || process.env.ZOHO_EMAIL?.trim() || "info@tarotitalia.com";
  const studioTo = process.env.ZOHO_STUDIO_EMAIL?.trim() || supportEmail;
  const whatsappUrl = process.env.WHATSAPP_ASSIST_URL?.trim() || "https://wa.me/393791038253";
  const euros = extras.amountCents != null && extras.amountCents >= 0 ? extras.amountCents / 100 : row.priceEur;
  const amount = Number.isFinite(euros) ? euros.toLocaleString("it-IT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }) : String(row.priceEur);
  const vars = {
    user_name: row.fullName.trim() || "Gentile",
    user_email: extras.customerEmail || row.email,
    session_title: extras.title,
    session_mode: extras.modeLabel,
    booking_date: formatBookingDateIt(row.scheduledDate),
    booking_time: row.scheduledTime,
    booking_id: String(row.id),
    transaction_id: extras.transactionId || "\u2014",
    amount,
    phone: row.phoneWhatsapp,
    riservata_url: `${site}/area-riservata`,
    whatsapp_url: whatsappUrl,
    support_email: supportEmail
  };
  const htmlVars = {
    ...vars,
    user_name: escapeHtml(vars.user_name),
    user_email: escapeHtml(vars.user_email),
    session_title: escapeHtml(vars.session_title),
    session_mode: escapeHtml(vars.session_mode),
    booking_date: escapeHtml(vars.booking_date),
    booking_time: escapeHtml(vars.booking_time),
    booking_id: escapeHtml(vars.booking_id),
    transaction_id: escapeHtml(vars.transaction_id),
    amount: escapeHtml(vars.amount),
    phone: escapeHtml(vars.phone),
    riservata_url: escapeHtml(vars.riservata_url),
    whatsapp_url: escapeHtml(vars.whatsapp_url),
    support_email: escapeHtml(vars.support_email)
  };
  const messages = [];
  if (vars.user_email) {
    messages.push({
      to: vars.user_email,
      subject: `Pagamento ricevuto \u2014 ${vars.booking_date} \xB7 ${vars.booking_time}`,
      text: fillBookingConfirmText(vars),
      html: fillBookingConfirmHtml(htmlVars),
      replyTo: supportEmail
    });
  }
  const studioText = [
    "Nuova prenotazione confermata \u2014 Tarot Italia",
    `Nome: ${vars.user_name}`,
    `Email: ${vars.user_email || "\u2014"}`,
    `Recapito: ${vars.phone}`,
    `Sessione: ${vars.session_title}`,
    `Quando: ${vars.booking_date} \xB7 ${vars.booking_time}`,
    `Modalit\xE0: ${vars.session_mode}`,
    `Totale: \u20AC${amount}`,
    `Riferimento: ${vars.booking_id}`,
    `Transazione: ${vars.transaction_id}`
  ].join("\n");
  messages.push({
    to: studioTo,
    subject: `Nuova prenotazione \u2014 ${vars.user_name} \xB7 ${vars.booking_date} ${vars.booking_time}`,
    text: studioText,
    html: `<div style="font-family:Georgia,serif;color:#2B2523;background:#F9F8F6;padding:28px"><p>${escapeHtml(studioText).replaceAll("\n", "<br>")}</p></div>`,
    replyTo: vars.user_email || supportEmail
  });
  await sendZohoMails(messages);
}

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
async function cancelPendingBooking(bookingId) {
  const result = await db.update(consultationBookings).set({ status: "cancelled", updatedAt: /* @__PURE__ */ new Date() }).where(
    and(
      eq(consultationBookings.id, bookingId),
      eq(consultationBookings.status, "pending_payment")
    )
  ).returning();
  return result[0] ?? null;
}
async function getBookingById(bookingId) {
  const rows = await db.select().from(consultationBookings).where(eq(consultationBookings.id, bookingId)).limit(1);
  return rows[0] ?? null;
}
async function getBookingByStripeSessionId(stripeSessionId) {
  const rows = await db.select().from(consultationBookings).where(eq(consultationBookings.stripeSessionId, stripeSessionId)).limit(1);
  return rows[0] ?? null;
}
async function confirmConsultationBooking(params) {
  let booking = params.stripeSessionId != null ? await getBookingByStripeSessionId(params.stripeSessionId) : null;
  if (!booking && params.bookingId != null) {
    booking = await getBookingById(params.bookingId);
  }
  if (!booking) {
    throw new Error("Prenotazione non trovata.");
  }
  if (booking.status === "confirmed") {
    return { booking, fulfilled: false };
  }
  if (booking.status === "cancelled" && !params.stripeSessionId) {
    throw new Error("Prenotazione annullata.");
  }
  const updated = await db.update(consultationBookings).set({
    status: "confirmed",
    stripeSessionId: params.stripeSessionId || booking.stripeSessionId,
    stripePaymentIntentId: params.transactionId || booking.stripePaymentIntentId,
    paidAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    mode: resolveBookingMode(booking.mode || "remote", booking.scheduledTime)
  }).where(
    and(
      eq(consultationBookings.id, booking.id),
      or(
        eq(consultationBookings.status, "pending_payment"),
        eq(consultationBookings.status, "cancelled")
      )
    )
  ).returning();
  const confirmed = updated[0];
  if (!confirmed) {
    const again = await getBookingById(booking.id);
    if (again?.status === "confirmed") {
      return { booking: again, fulfilled: false };
    }
    throw new Error("Impossibile confermare la prenotazione.");
  }
  const { calendarEventId } = await fulfillConfirmedBooking(confirmed, {
    customerEmail: params.customerEmail || confirmed.email,
    transactionId: params.transactionId || params.stripeSessionId || confirmed.stripeSessionId || String(confirmed.id),
    amountCents: params.amountCents
  });
  if (calendarEventId) {
    const withEvent = await db.update(consultationBookings).set({
      googleCalendarEventId: calendarEventId,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(consultationBookings.id, confirmed.id)).returning();
    return { booking: withEvent[0] ?? confirmed, fulfilled: true };
  }
  return { booking: confirmed, fulfilled: true };
}
var FREE_TRIAL_SECONDS = 300;
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
function computeDialogueStatus(row, now) {
  const nowMs = now.getTime();
  const paidExpiryMs = row.activePassExpiresAt ? row.activePassExpiresAt.getTime() : 0;
  const freeExpiryMs = row.freeTrialExpiresAt ? row.freeTrialExpiresAt.getTime() : 0;
  let mode = "ready";
  let remainingSeconds = FREE_TRIAL_SECONDS;
  let expiresAtIso = null;
  if (paidExpiryMs > nowMs) {
    mode = "paid_pass";
    remainingSeconds = Math.max(0, Math.ceil((paidExpiryMs - nowMs) / 1e3));
    expiresAtIso = row.activePassExpiresAt.toISOString();
  } else if (row.freeTrialStartedAt && row.freeTrialExpiresAt) {
    if (freeExpiryMs > nowMs) {
      mode = "free_trial";
      remainingSeconds = Math.max(0, Math.ceil((freeExpiryMs - nowMs) / 1e3));
      expiresAtIso = row.freeTrialExpiresAt.toISOString();
    } else {
      mode = "expired";
      remainingSeconds = 0;
      expiresAtIso = row.freeTrialExpiresAt.toISOString();
    }
  }
  return {
    sessionKey: row.sessionKey,
    mode,
    remainingSeconds,
    freeTrialSecondsTotal: FREE_TRIAL_SECONDS,
    freeTrialUsed: Boolean(row.freeTrialStartedAt),
    activePackId: mode === "paid_pass" ? row.activePackId ?? null : null,
    expiresAtIso,
    interactionsCount: row.interactionsCount,
    serverTimeIso: now.toISOString()
  };
}
async function resolveOrCreateDialogueSession(params) {
  let dbUserId = null;
  if (params.uid) {
    const dbUser = await getOrCreateUser(
      params.uid,
      params.authEmail || "",
      params.authName ?? null
    );
    dbUserId = dbUser.id;
  }
  if (dbUserId) {
    const userSessionRows = await db.select().from(dialogueSessions).where(eq(dialogueSessions.userId, dbUserId)).orderBy(desc(dialogueSessions.updatedAt)).limit(1);
    if (userSessionRows[0]) {
      return { session: userSessionRows[0], dbUserId };
    }
  }
  const existingByKey = await db.select().from(dialogueSessions).where(eq(dialogueSessions.sessionKey, params.sessionKey)).limit(1);
  if (existingByKey[0]) {
    if (dbUserId && !existingByKey[0].userId) {
      const updated = await db.update(dialogueSessions).set({ userId: dbUserId, updatedAt: /* @__PURE__ */ new Date() }).where(eq(dialogueSessions.id, existingByKey[0].id)).returning();
      return { session: updated[0], dbUserId };
    }
    return { session: existingByKey[0], dbUserId };
  }
  const created = await db.insert(dialogueSessions).values({
    sessionKey: params.sessionKey,
    userId: dbUserId,
    interactionsCount: 0
  }).returning();
  return { session: created[0], dbUserId };
}
async function unlockDialogueTimePack(params) {
  const pack = DIALOGUE_PACK_CATALOG[params.packId];
  if (!pack) {
    throw new Error("Pacchetto temporale non valido.");
  }
  const stripeSessionId = params.stripeSessionId.trim();
  if (!stripeSessionId) {
    throw new Error("Pagamento Stripe richiesto per attivare il pass.");
  }
  const { session, dbUserId } = await resolveOrCreateDialogueSession({
    sessionKey: params.sessionKey,
    uid: params.uid,
    authEmail: params.authEmail,
    authName: params.authName || params.customerName
  });
  const existingPurchase = await db.select().from(dialoguePurchases).where(eq(dialoguePurchases.stripeSessionId, stripeSessionId)).limit(1);
  if (existingPurchase[0]) {
    const now2 = /* @__PURE__ */ new Date();
    if (existingPurchase[0].expiresAt.getTime() > now2.getTime() && (!session.activePassExpiresAt || session.activePassExpiresAt.getTime() < existingPurchase[0].expiresAt.getTime())) {
      const refreshed = await db.update(dialogueSessions).set({
        activePassExpiresAt: existingPurchase[0].expiresAt,
        activePackId: existingPurchase[0].packId,
        updatedAt: now2
      }).where(eq(dialogueSessions.id, session.id)).returning();
      return {
        status: computeDialogueStatus(refreshed[0] ?? session, now2),
        purchase: existingPurchase[0]
      };
    }
    return {
      status: computeDialogueStatus(session, /* @__PURE__ */ new Date()),
      purchase: existingPurchase[0]
    };
  }
  const now = /* @__PURE__ */ new Date();
  const baseMs = session.activePassExpiresAt && session.activePassExpiresAt.getTime() > now.getTime() ? session.activePassExpiresAt.getTime() : now.getTime();
  const newExpiresAt = new Date(baseMs + pack.durationMinutes * 60 * 1e3);
  const updatedSessionRows = await db.update(dialogueSessions).set({
    activePassExpiresAt: newExpiresAt,
    activePackId: pack.id,
    updatedAt: now
  }).where(eq(dialogueSessions.id, session.id)).returning();
  const purchaseRows = await db.insert(dialoguePurchases).values({
    dialogueSessionId: session.id,
    userId: dbUserId,
    packId: pack.id,
    durationMinutes: pack.durationMinutes,
    priceEur: pack.priceEur,
    stripePriceId: pack.stripePriceId,
    stripeSessionId,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    expiresAt: newExpiresAt
  }).returning();
  const updatedSession = updatedSessionRows[0] ?? session;
  return {
    status: computeDialogueStatus(updatedSession, now),
    purchase: purchaseRows[0]
  };
}

// src/lib/stripe.ts
import { createHmac, timingSafeEqual } from "crypto";
function constructWebhookEvent(rawBody, signatureHeader) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret || secret.startsWith("MY_")) {
    throw new Error("STRIPE_WEBHOOK_NOT_CONFIGURED");
  }
  if (!signatureHeader) {
    throw new Error("STRIPE_WEBHOOK_SIGNATURE_MISSING");
  }
  const parts = signatureHeader.split(",").map((p) => p.trim());
  const timestampPart = parts.find((p) => p.startsWith("t="));
  const signatures = parts.filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  if (!timestampPart || signatures.length === 0) {
    throw new Error("STRIPE_WEBHOOK_SIGNATURE_INVALID");
  }
  const timestamp2 = timestampPart.slice(2);
  const payload = typeof rawBody === "string" ? rawBody : rawBody.toString("utf8");
  const signedPayload = `${timestamp2}.${payload}`;
  const expected = createHmac("sha256", secret).update(signedPayload, "utf8").digest("hex");
  const expectedBuf = Buffer.from(expected, "utf8");
  const valid = signatures.some((sig) => {
    const sigBuf = Buffer.from(sig, "utf8");
    return sigBuf.length === expectedBuf.length && timingSafeEqual(sigBuf, expectedBuf);
  });
  if (!valid) {
    throw new Error("STRIPE_WEBHOOK_SIGNATURE_MISMATCH");
  }
  const ageSeconds = Math.abs(Date.now() / 1e3 - Number(timestamp2));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) {
    throw new Error("STRIPE_WEBHOOK_TIMESTAMP_STALE");
  }
  return JSON.parse(payload);
}

// src/server/activations.ts
async function fulfillPaidCheckoutSession(sessionObj) {
  if (sessionObj.payment_status !== "paid" || !sessionObj.id) return;
  const meta = sessionObj.metadata || {};
  const itemType = meta.itemType;
  if (itemType === "dialogue") {
    const packId = meta.packId;
    const sessionKey = String(meta.sessionKey || "").trim();
    if (sessionKey && packId in DIALOGUE_PACK_CATALOG) {
      await unlockDialogueTimePack({
        sessionKey,
        packId,
        customerName: String(meta.customerName || "Ospite Tarot Italia"),
        customerEmail: String(
          meta.customerEmail || sessionObj.customer_email || ""
        ),
        stripeSessionId: sessionObj.id,
        uid: meta.firebaseUserId || null,
        authEmail: meta.customerEmail || sessionObj.customer_email || null,
        authName: meta.customerName || null
      });
    } else {
      console.error("Webhook dialogue: metadata incompleti", meta);
    }
    return;
  }
  if (itemType === "course" && meta.firebaseUserId && meta.courseSlug) {
    await enrollUserInCourse({
      uid: String(meta.firebaseUserId),
      email: String(meta.customerEmail || sessionObj.customer_email || ""),
      displayName: meta.customerName || null,
      courseSlug: String(meta.courseSlug || ""),
      customerName: String(meta.customerName || "Corsista"),
      customerPhone: meta.customerPhone ? String(meta.customerPhone) : void 0,
      stripeSessionId: sessionObj.id
    });
    return;
  }
  if (itemType === "consultation") {
    const bookingId = Number(meta.bookingId || 0);
    if (bookingId || sessionObj.id) {
      await confirmConsultationBooking({
        bookingId: bookingId || void 0,
        stripeSessionId: sessionObj.id,
        transactionId: sessionObj.id,
        amountCents: typeof sessionObj.amount_total === "number" ? sessionObj.amount_total : null,
        customerEmail: meta.customerEmail || sessionObj.customer_email || null
      });
    } else {
      console.error("Webhook consultation: metadata incompleti", meta);
    }
  }
}
async function processStripeWebhook(rawBody, signatureHeader) {
  const event = constructWebhookEvent(rawBody, signatureHeader);
  if (event.type === "checkout.session.completed") {
    await fulfillPaidCheckoutSession(event.data.object);
  }
  if (event.type === "checkout.session.expired") {
    const sessionObj = event.data.object;
    const meta = sessionObj.metadata || {};
    if (meta.itemType === "consultation") {
      const bookingId = Number(meta.bookingId || 0);
      if (bookingId) {
        await cancelPendingBooking(bookingId);
      }
    }
  }
}

// src/server/http.ts
function json(status, body) {
  return { status, body };
}

// src/server/routes/stripeWebhook.ts
async function postStripeWebhook(params) {
  try {
    await processStripeWebhook(params.rawBody, params.signatureHeader);
    return json(200, { received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    const msg = error instanceof Error ? error.message : "";
    if (msg.startsWith("STRIPE_WEBHOOK_")) {
      return json(400, { error: "Webhook non valido." });
    }
    return json(500, { error: "Errore elaborazione webhook." });
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
async function readRawBody(req) {
  if (Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === "string") {
    return Buffer.from(req.body, "utf8");
  }
  if (req.body && typeof req.body === "object") {
    return Buffer.from(JSON.stringify(req.body), "utf8");
  }
  if (typeof req.on !== "function") {
    return Buffer.alloc(0);
  }
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", (error) => reject(error));
  });
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
function methodNotAllowed(res, allowed) {
  res.setHeader("Allow", allowed.join(", "));
  sendJson(res, 405, { error: "Metodo non consentito." });
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

// src/server/apiEntries/stripe.ts
var config = {
  runtime: "nodejs",
  api: { bodyParser: false },
  maxDuration: 30
};
async function handler(req, res) {
  try {
    const method = (req.method || "GET").toUpperCase();
    const path = groupSubpath(req, "stripe");
    await ensureSchemaOnce();
    if (path === "webhook") {
      if (method !== "POST") return methodNotAllowed(res, ["POST"]);
      const rawBody = await readRawBody(req);
      const signatureHeader = typeof req.headers["stripe-signature"] === "string" ? req.headers["stripe-signature"] : Array.isArray(req.headers["stripe-signature"]) ? req.headers["stripe-signature"][0] : void 0;
      return sendApiResult(
        res,
        await postStripeWebhook({
          rawBody,
          signatureHeader
        })
      );
    }
    return sendJson2(res, 404, { error: "Not found", path, method });
  } catch (error) {
    console.error("api/stripe handler failed:", error);
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
