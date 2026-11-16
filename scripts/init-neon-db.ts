/**
 * AmanDevs — Neon PostgreSQL Database Initialization Script
 *
 * Usage:
 *   npm run db:init
 *   or: npx tsx scripts/init-neon-db.ts
 *
 * Guarantees:
 *   - Creates the 'inquiries' table and required indexes in Neon PostgreSQL.
 *   - Starts EMPTY: Does NOT import any historical records from data/inquiries.json.
 *   - Leaves data/inquiries.json completely untouched.
 *   - Safe and idempotent: can be executed multiple times without errors or data duplication.
 *   - Verifies the table exists and prints the current record count.
 *   - Never exposes secret connection strings or customer data.
 */

import fsSync from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

function loadEnvLocal(): void {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fsSync.existsSync(envPath)) {
    const raw = fsSync.readFileSync(envPath, "utf-8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^(['"])(.*)\1$/, "$2");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

async function initNeonDatabase(): Promise<void> {
  loadEnvLocal();

  const databaseUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ Database Initialization Aborted: Neither DATABASE_URL nor DATABASE_URL_UNPOOLED is set.");
    console.error("   Please set your Neon PostgreSQL connection string in .env.local or your deployment environment variables.");
    process.exit(1);
  }

  console.log("==================================================");
  console.log("   AmanDevs Neon PostgreSQL Table Initialization");
  console.log("==================================================");

  const sql = neon(databaseUrl);

  // 1. Create table and indexes
  console.log("1. Creating / verifying 'inquiries' table and indexes...");
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
  console.log("   ✅ Table and indexes verified successfully.");

  // 2. Query record count to verify table state
  const totalCountResult = await sql`SELECT COUNT(*)::int AS count FROM inquiries`;
  const totalInDb = totalCountResult[0].count;

  // 3. Verify backup file remains untouched
  const jsonPath = path.join(process.cwd(), "data", "inquiries.json");
  const backupExists = fsSync.existsSync(jsonPath);
  let backupCount = 0;
  if (backupExists) {
    const raw = fsSync.readFileSync(jsonPath, "utf-8");
    const jsonRecords = JSON.parse(raw || "[]");
    backupCount = jsonRecords.length;
  }

  console.log("==================================================");
  console.log("   Initialization Verification Summary");
  console.log("==================================================");
  console.log(`   • Table Status:             'inquiries' ready for production`);
  console.log(`   • Neon Database Records:    ${totalInDb} (Production starts empty with 0 historical imports)`);
  console.log(`   • Historical JSON Backup:   data/inquiries.json untouched (${backupCount} records preserved locally)`);
  console.log(`   • Data Migration Policy:    No historical JSON records imported`);
  console.log("==================================================");
  console.log("🎉 Database initialization completed successfully!");
}

initNeonDatabase().catch((err) => {
  console.error("❌ Unexpected database error:", err instanceof Error ? err.message : err);
  process.exit(1);
});
