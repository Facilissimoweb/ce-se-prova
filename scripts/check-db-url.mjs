/**
 * Sanity checks for DATABASE_URL helpers (ENN-89).
 * Run: npx tsx scripts/check-db-url.mjs
 */
import assert from 'node:assert/strict';
import {
  describeDatabaseUrl,
  normalizeDatabaseUrl,
} from '../src/db/databaseUrl.ts';

const pooler =
  'postgresql://postgres.proj:p%40ss@aws-0-eu-central-1.pooler.supabase.com:6543/postgres';
const normalized = normalizeDatabaseUrl(pooler);
assert.match(normalized, /pgbouncer=true/);
const desc = describeDatabaseUrl(normalized);
assert.equal(desc.port, '6543');
assert.equal(desc.looksLikeSupabasePooler, true);
assert.equal(desc.looksLikeTransactionPooler, true);
assert.equal(desc.looksLikeSupabaseDirect, false);
assert.equal(desc.host.includes('pooler'), true);

const direct =
  'postgresql://postgres:p@db.abcdefghijklmnop.supabase.co:5432/postgres';
const directDesc = describeDatabaseUrl(direct);
assert.equal(directDesc.looksLikeSupabaseDirect, true);
assert.equal(directDesc.looksLikeTransactionPooler, false);
// normalize must NOT silently rewrite Direct → Pooler
assert.equal(normalizeDatabaseUrl(direct), direct);

console.log('check-db-url: ok');
