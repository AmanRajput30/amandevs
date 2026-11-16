import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cachedSql: NeonQueryFunction<false, false> | null = null;
let tableEnsured = false;

/**
 * Returns an authenticated Neon serverless SQL client.
 * Connects using process.env.DATABASE_URL.
 */
export function getDb(): NeonQueryFunction<false, false> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not defined.");
  }
  if (!cachedSql) {
    cachedSql = neon(databaseUrl);
  }
  return cachedSql;
}

/**
 * Ensure inquiries table and indexes exist in PostgreSQL.
 * Safe to call repeatedly; caches after first successful execution in the process.
 */
export async function ensureInquiriesTable(): Promise<void> {
  if (tableEnsured) return;
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id VARCHAR(32) PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name VARCHAR(255) NOT NULL,
      business_name VARCHAR(255) DEFAULT 'Not specified',
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      service VARCHAR(255) NOT NULL,
      budget VARCHAR(100) NOT NULL,
      timeline VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      reference_url TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'NEW',
      metadata JSONB DEFAULT '{}'::jsonb
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status)`;
  tableEnsured = true;
}
