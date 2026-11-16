import { createPool } from './index.ts';

function isConnectionFailure(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const code = String((error as { code?: unknown }).code || '');
  return (
    code === 'ECONNREFUSED' ||
    code === 'ENOTFOUND' ||
    code === 'ETIMEDOUT' ||
    code === 'ECONNRESET' ||
    code === 'EAI_AGAIN' ||
    code === '57P01' || // admin_shutdown
    code === '57P03' // cannot_connect_now
  );
}

/**
 * Idempotent ALTER for booking columns used by Zoho/Google/Stripe flow.
 * AI Studio / Cloud SQL may already have the base table without these fields.
 *
 * On Vercel: if Postgres is unreachable, abort after the first connection
 * failure — otherwise 8× connectionTimeout can exceed maxDuration and surface
 * as FUNCTION_INVOCATION_FAILED on /api/dialogue and /api/bookings.
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
      if (isConnectionFailure(error)) {
        console.error(
          'ensureBookingSchema: aborting remaining statements (DB unreachable)'
        );
        return;
      }
    }
  }
}
