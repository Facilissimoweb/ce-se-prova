-- ENN-98 — Tabella appunti liberi (Area Riservata · tab Appunti)
-- Esegui in Supabase → SQL Editor → Run se la tabella non è ancora presente.
-- Idempotente: sicuro rieseguire. Nessun secret in questo file.
-- Allineato a src/db/schema.ts e src/db/ensureBookingSchema.ts.

CREATE TABLE IF NOT EXISTS user_notes (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text DEFAULT '' NOT NULL,
  body text DEFAULT '' NOT NULL,
  created_at timestamp DEFAULT NOW() NOT NULL,
  updated_at timestamp DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS user_notes_user_id_idx
  ON user_notes (user_id);
