import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// 1. Utenti autenticati (sincronizzati con Firebase Auth UID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  phoneWhatsapp: text('phone_whatsapp'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2. Catalogo Percorsi Didattici a Pagamento (Arcani Maggiori, Arcani Minori, Metodi di Stesura)
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  description: text('description').notNull(),
  priceEur: integer('price_eur').notNull(),
  stripePriceId: text('stripe_price_id').notNull(),
  lessonsCount: integer('lessons_count').notNull(),
  totalHours: text('total_hours').notNull(),
  levelLabel: text('level_label').notNull(),
  sortOrder: integer('sort_order').notNull(),
  isPublished: boolean('is_published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Dispense formulate per ciascun percorso (riservate agli acquirenti)
export const dispense = pgTable(
  'dispense',
  {
    id: serial('id').primaryKey(),
    courseId: integer('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    moduleNumber: text('module_number').notNull(),
    title: text('title').notNull(),
    subtitle: text('subtitle').notNull(),
    format: text('format').notNull(),
    readingMinutes: integer('reading_minutes').notNull(),
    contentMarkdown: text('content_markdown').notNull(),
    keyTakeaways: text('key_takeaways').notNull(), // JSON array string
    sortOrder: integer('sort_order').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('dispense_course_module_idx').on(table.courseId, table.moduleNumber),
  ]
);

// 4. Acquisti & Iscrizioni ai Corsi (abilitano l'accesso alle dispense nell'Area Riservata)
export const coursePurchases = pgTable(
  'course_purchases',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    courseId: integer('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    status: text('status').notNull().default('active'), // 'active' | 'pending_payment' | 'revoked'
    paymentProvider: text('payment_provider').notNull().default('stripe_checkout'),
    stripeSessionId: text('stripe_session_id'),
    amountPaidEur: integer('amount_paid_eur').notNull(),
    customerName: text('customer_name').notNull(),
    customerPhone: text('customer_phone'),
    purchasedAt: timestamp('purchased_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('course_purchases_user_course_idx').on(table.userId, table.courseId),
  ]
);

// 5. Avanzamento studio e appunti personali sulle singole dispense
export const dispensaProgress = pgTable(
  'dispensa_progress',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    dispensaId: integer('dispensa_id')
      .references(() => dispense.id, { onDelete: 'cascade' })
      .notNull(),
    completed: boolean('completed').default(false).notNull(),
    personalNotes: text('personal_notes').default('').notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('dispensa_progress_user_dispensa_idx').on(table.userId, table.dispensaId),
  ]
);

// 6. Prenotazioni Consulti (visibili nello storico dell'Area Riservata)
export const consultationBookings = pgTable('consultation_bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  tariffId: text('tariff_id').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  priceEur: integer('price_eur').notNull(),
  scheduledDate: text('scheduled_date').notNull(),
  scheduledTime: text('scheduled_time').notNull(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phoneWhatsapp: text('phone_whatsapp').notNull(),
  sessionIntent: text('session_intent').default('').notNull(),
  deontologyAccepted: boolean('deontology_accepted').notNull(),
  status: text('status').notNull().default('confirmed'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 7. Sessioni temporali Dialogo Tarot (traccia i 5 minuti gratuiti e i pass a tempo lato server)
export const dialogueSessions = pgTable('dialogue_sessions', {
  id: serial('id').primaryKey(),
  sessionKey: text('session_key').notNull().unique(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  freeTrialStartedAt: timestamp('free_trial_started_at'),
  freeTrialExpiresAt: timestamp('free_trial_expires_at'),
  activePassExpiresAt: timestamp('active_pass_expires_at'),
  activePackId: text('active_pack_id'),
  interactionsCount: integer('interactions_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 8. Acquisti pacchetti a tempo per il Dialogo Tarot
export const dialoguePurchases = pgTable('dialogue_purchases', {
  id: serial('id').primaryKey(),
  dialogueSessionId: integer('dialogue_session_id')
    .references(() => dialogueSessions.id, { onDelete: 'cascade' })
    .notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  packId: text('pack_id').notNull(), // '5m' | '10m' | '15m'
  durationMinutes: integer('duration_minutes').notNull(),
  priceEur: integer('price_eur').notNull(),
  stripePriceId: text('stripe_price_id').notNull(),
  stripeSessionId: text('stripe_session_id'),
  customerName: text('customer_name').default('').notNull(),
  customerEmail: text('customer_email').default('').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relazioni Drizzle
export const usersRelations = relations(users, ({ many }) => ({
  purchases: many(coursePurchases),
  dispensaProgress: many(dispensaProgress),
  bookings: many(consultationBookings),
  dialogueSessions: many(dialogueSessions),
  dialoguePurchases: many(dialoguePurchases),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  dispense: many(dispense),
  purchases: many(coursePurchases),
}));

export const dispenseRelations = relations(dispense, ({ one, many }) => ({
  course: one(courses, {
    fields: [dispense.courseId],
    references: [courses.id],
  }),
  progressRecords: many(dispensaProgress),
}));

export const coursePurchasesRelations = relations(coursePurchases, ({ one }) => ({
  user: one(users, {
    fields: [coursePurchases.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [coursePurchases.courseId],
    references: [courses.id],
  }),
}));

export const dispensaProgressRelations = relations(dispensaProgress, ({ one }) => ({
  user: one(users, {
    fields: [dispensaProgress.userId],
    references: [users.id],
  }),
  dispensa: one(dispense, {
    fields: [dispensaProgress.dispensaId],
    references: [dispense.id],
  }),
}));

export const consultationBookingsRelations = relations(consultationBookings, ({ one }) => ({
  user: one(users, {
    fields: [consultationBookings.userId],
    references: [users.id],
  }),
}));

export const dialogueSessionsRelations = relations(dialogueSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [dialogueSessions.userId],
    references: [users.id],
  }),
  purchases: many(dialoguePurchases),
}));

export const dialoguePurchasesRelations = relations(dialoguePurchases, ({ one }) => ({
  session: one(dialogueSessions, {
    fields: [dialoguePurchases.dialogueSessionId],
    references: [dialogueSessions.id],
  }),
  user: one(users, {
    fields: [dialoguePurchases.userId],
    references: [users.id],
  }),
}));
