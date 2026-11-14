import { createPool } from './index.ts';

/**
 * Idempotent ALTER for booking columns used by Zoho/Google/Stripe flow.
 * AI Studio / Cloud SQL may already have the base table without these fields.
 */
export async function ensureBookingSchema(): Promise<void> {
  const pool = createPool();
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
       WHERE status IN ('pending_payment', 'confirmed')`,
  ];

  for (const sql of statements) {
    try {
      await pool.query(sql);
    } catch (error) {
      console.error('ensureBookingSchema statement failed:', sql, error);
    }
  }
}
