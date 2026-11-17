import { createPool } from './index.ts';

declare global {
  // eslint-disable-next-line no-var
  var _ennamoSchemaReady: Promise<void> | undefined;
}

function isConnectionFailure(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const code = String((error as { code?: unknown }).code || '');
  if (
    code === 'ECONNREFUSED' ||
    code === 'ENOTFOUND' ||
    code === 'ETIMEDOUT' ||
    code === 'ECONNRESET' ||
    code === 'EAI_AGAIN' ||
    code === '57P01' || // admin_shutdown
    code === '57P03' // cannot_connect_now
  ) {
    return true;
  }
  // node-pg connectionTimeoutMillis often has no errno — match the message.
  const message = String(
    (error as { message?: unknown }).message || error
  ).toLowerCase();
  return (
    message.includes('timeout exceeded when trying to connect') ||
    message.includes('connection terminated due to connection timeout') ||
    message.includes('connect etimedout') ||
    message.includes('could not connect') ||
    message.includes('connection refused') ||
    message.includes('getaddrinfo')
  );
}

function hasDatabaseConfig(): boolean {
  return Boolean(
    process.env.DATABASE_URL?.trim() || process.env.SQL_HOST?.trim()
  );
}

/**
 * Idempotent CREATE TABLE + ALTER for the Ennamo Drizzle schema.
 * Fresh Supabase / empty Postgres gets tables on first request; older AI Studio
 * / Cloud SQL bases get missing booking columns via ALTER.
 *
 * Keep in sync with `sql/bootstrap-schema.sql` and `src/db/schema.ts`.
 *
 * On Vercel: abort after the first connection failure — otherwise repeated
 * timeouts can exceed maxDuration and surface as FUNCTION_INVOCATION_FAILED.
 */
export const SCHEMA_BOOTSTRAP_STATEMENTS: string[] = [
  // --- CREATE (FK order) ---
  `CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    uid text NOT NULL UNIQUE,
    email text NOT NULL,
    display_name text,
    phone_whatsapp text,
    created_at timestamp DEFAULT NOW() NOT NULL,
    updated_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS courses (
    id serial PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    title text NOT NULL,
    subtitle text NOT NULL,
    description text NOT NULL,
    price_eur integer NOT NULL,
    stripe_price_id text NOT NULL,
    lessons_count integer NOT NULL,
    total_hours text NOT NULL,
    level_label text NOT NULL,
    sort_order integer NOT NULL,
    is_published boolean DEFAULT true NOT NULL,
    created_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dispense (
    id serial PRIMARY KEY,
    course_id integer NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module_number text NOT NULL,
    title text NOT NULL,
    subtitle text NOT NULL,
    format text NOT NULL,
    reading_minutes integer NOT NULL,
    content_markdown text NOT NULL,
    key_takeaways text NOT NULL,
    sort_order integer NOT NULL,
    created_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS course_purchases (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id integer NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'active',
    payment_provider text NOT NULL DEFAULT 'stripe_checkout',
    stripe_session_id text,
    amount_paid_eur integer NOT NULL,
    customer_name text NOT NULL,
    customer_phone text,
    purchased_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dispensa_progress (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dispensa_id integer NOT NULL REFERENCES dispense(id) ON DELETE CASCADE,
    completed boolean DEFAULT false NOT NULL,
    personal_notes text DEFAULT '' NOT NULL,
    updated_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS consultation_bookings (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id) ON DELETE SET NULL,
    tariff_id text NOT NULL,
    duration_minutes integer NOT NULL,
    price_eur integer NOT NULL,
    scheduled_date text NOT NULL,
    scheduled_time text NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    phone_whatsapp text NOT NULL,
    session_intent text DEFAULT '' NOT NULL,
    deontology_accepted boolean NOT NULL,
    mode text NOT NULL DEFAULT 'remote',
    status text NOT NULL DEFAULT 'pending_payment',
    stripe_session_id text,
    stripe_payment_intent_id text,
    google_calendar_event_id text,
    paid_at timestamp,
    created_at timestamp DEFAULT NOW() NOT NULL,
    updated_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dialogue_sessions (
    id serial PRIMARY KEY,
    session_key text NOT NULL UNIQUE,
    user_id integer REFERENCES users(id) ON DELETE SET NULL,
    free_trial_started_at timestamp,
    free_trial_expires_at timestamp,
    active_pass_expires_at timestamp,
    active_pack_id text,
    interactions_count integer DEFAULT 0 NOT NULL,
    created_at timestamp DEFAULT NOW() NOT NULL,
    updated_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dialogue_purchases (
    id serial PRIMARY KEY,
    dialogue_session_id integer NOT NULL REFERENCES dialogue_sessions(id) ON DELETE CASCADE,
    user_id integer REFERENCES users(id) ON DELETE SET NULL,
    pack_id text NOT NULL,
    duration_minutes integer NOT NULL,
    price_eur integer NOT NULL,
    stripe_price_id text NOT NULL,
    stripe_session_id text,
    customer_name text DEFAULT '' NOT NULL,
    customer_email text DEFAULT '' NOT NULL,
    expires_at timestamp NOT NULL,
    created_at timestamp DEFAULT NOW() NOT NULL
  )`,

  // --- Legacy ALTER (bases that predate booking Stripe/Calendar columns) ---
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'remote'`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS stripe_session_id text`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS google_calendar_event_id text`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS paid_at timestamp`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS updated_at timestamp DEFAULT NOW() NOT NULL`,

  // --- Indexes (idempotent) ---
  `CREATE UNIQUE INDEX IF NOT EXISTS dispense_course_module_idx
     ON dispense (course_id, module_number)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS course_purchases_user_course_idx
     ON course_purchases (user_id, course_id)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS dispensa_progress_user_dispensa_idx
     ON dispensa_progress (user_id, dispensa_id)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS consultation_bookings_stripe_session_idx
     ON consultation_bookings (stripe_session_id)
     WHERE stripe_session_id IS NOT NULL`,
  `CREATE UNIQUE INDEX IF NOT EXISTS consultation_bookings_active_slot_idx
     ON consultation_bookings (scheduled_date, scheduled_time)
     WHERE status IN ('pending_payment', 'confirmed')`,
];

export async function ensureBookingSchema(): Promise<void> {
  if (!hasDatabaseConfig()) {
    console.error(
      'ensureBookingSchema: skipped (set DATABASE_URL TCP or SQL_HOST)'
    );
    return;
  }

  const pool = createPool();

  for (const sql of SCHEMA_BOOTSTRAP_STATEMENTS) {
    try {
      await pool.query(sql);
    } catch (error) {
      console.error('ensureBookingSchema statement failed:', sql, error);
      if (isConnectionFailure(error)) {
        console.error(
          'ensureBookingSchema: aborting remaining statements (DB unreachable)'
        );
        return;
      }
    }
  }
}

/** Once per isolate — safe for light API entries (no firebase-admin). */
export async function ensureSchemaOnce(): Promise<void> {
  if (!globalThis._ennamoSchemaReady) {
    globalThis._ennamoSchemaReady = ensureBookingSchema().catch((error) => {
      console.error('ensureBookingSchema failed (non-fatal):', error);
    });
  }
  await globalThis._ennamoSchemaReady;
}
