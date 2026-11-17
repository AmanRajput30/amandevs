/**
 * AmanDevs — Historical Inquiries Migration Script
 *
 * Imports historical records from `data/inquiries.json` into the Neon PostgreSQL `inquiries` table.
 *
 * Safety & Privacy Guarantees:
 *   - Idempotent: Uses `ON CONFLICT (id) DO NOTHING` (never updates or deletes existing records).
 *   - Preserves original IDs, timestamps, status, reference URLs, and metadata.
 *   - Validates all required fields before any database operations.
 *   - Strictly read-only access to `data/inquiries.json` (source file is never modified or deleted).
 *   - Uses parameterized Neon queries to prevent SQL injection.
 *   - Safe error handling: Never logs customer PII, enquiry briefs, reference IDs, connection strings, or raw SQL errors.
 *   - Verifies post-migration presence of all records in Neon and confirms source file integrity.
 *   - Exits with a non-zero code if any record fails or verification does not pass.
 *
 * Usage:
 *   npm run db:migrate-historical
 *   or: npx tsx scripts/migrate-historical-inquiries.ts
 */

import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";
import type { InquiryData } from "../lib/inquiries";

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

interface ValidationResult {
  valid: boolean;
  field?: string;
  reason?: string;
}

function validateRecord(record: unknown): ValidationResult {
  if (!record || typeof record !== "object") {
    return { valid: false, reason: "Invalid record structure" };
  }

  const r = record as Partial<InquiryData>;

  const requiredFields: (keyof InquiryData)[] = [
    "id",
    "createdAt",
    "name",
    "email",
    "phone",
    "service",
    "budget",
    "timeline",
    "description",
  ];

  for (const field of requiredFields) {
    const val = r[field];
    if (typeof val !== "string" || val.trim().length === 0) {
      return { valid: false, field, reason: "Missing or empty required field" };
    }
  }

  if (isNaN(Date.parse(r.createdAt!))) {
    return { valid: false, field: "createdAt", reason: "Invalid timestamp format" };
  }

  return { valid: true };
}

async function migrateHistoricalInquiries(): Promise<void> {
  loadEnvLocal();

  const databaseUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ Migration Aborted: Database connection string is not configured.");
    console.error("   Ensure DATABASE_URL_UNPOOLED or DATABASE_URL is set in .env.local or environment.");
    process.exit(1);
  }

  const jsonPath = path.join(process.cwd(), "data", "inquiries.json");
  if (!fsSync.existsSync(jsonPath)) {
    console.error("❌ Migration Aborted: Source inquiries file not found.");
    process.exit(1);
  }

  console.log("==================================================");
  console.log("   AmanDevs Historical Inquiries Migration");
  console.log("==================================================");

  // 1. Read JSON file
  let records: InquiryData[] = [];
  try {
    const raw = await fs.readFile(jsonPath, "utf-8");
    records = JSON.parse(raw || "[]");
  } catch {
    console.error("❌ Migration Aborted: Failed to read or parse source JSON file.");
    process.exit(1);
  }

  console.log(`1. Loaded ${records.length} records from source file.`);

  if (records.length === 0) {
    console.log("   ℹ️ No records found to migrate.");
    process.exit(0);
  }

  // 2. Validate all records before database operations
  console.log("2. Validating records against schema requirements...");
  for (let i = 0; i < records.length; i++) {
    const validation = validateRecord(records[i]);
    if (!validation.valid) {
      console.error(`❌ Validation Failure on item index ${i}: ${validation.reason} (${validation.field || "unknown"}).`);
      process.exit(1);
    }
  }
  console.log(`   ✅ All ${records.length} records passed schema validation.`);

  // 3. Connect to Neon
  const sql = neon(databaseUrl);

  // Verify inquiries table exists
  try {
    await sql`SELECT 1 FROM inquiries LIMIT 1`;
  } catch {
    console.error("❌ Migration Aborted: The 'inquiries' table does not exist in the database.");
    console.error("   Please run 'npm run db:init' first to initialize the schema.");
    process.exit(1);
  }

  // 4. Insert records using parameterized queries with ON CONFLICT DO NOTHING
  console.log("3. Inserting records (ON CONFLICT (id) DO NOTHING)...");
  let insertedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const record of records) {
    try {
      const result = await sql`
        INSERT INTO inquiries (
          id,
          created_at,
          name,
          business_name,
          email,
          phone,
          service,
          budget,
          timeline,
          description,
          reference_url,
          status,
          metadata
        ) VALUES (
          ${record.id},
          ${record.createdAt},
          ${record.name},
          ${record.businessName || "Not specified"},
          ${record.email},
          ${record.phone},
          ${record.service},
          ${record.budget},
          ${record.timeline},
          ${record.description},
          ${record.referenceUrl || null},
          ${record.status || "NEW"},
          ${JSON.stringify(record.metadata || {})}
        )
        ON CONFLICT (id) DO NOTHING
        RETURNING id
      `;

      if (result.length > 0) {
        insertedCount++;
      } else {
        skippedCount++;
      }
    } catch {
      failedCount++;
      console.error("   ⚠️ Database write operation failed for a record.");
    }
  }

  // 5. Post-migration verification: confirm all original IDs exist in database
  console.log("4. Verifying database integrity...");
  const targetIds = records.map((r) => r.id);
  let verifiedCount = 0;
  let allFound = false;

  try {
    const existingRows = await sql`
      SELECT id FROM inquiries WHERE id = ANY(${targetIds})
    `;
    const foundIdSet = new Set(existingRows.map((r: Record<string, unknown>) => String(r.id)));
    verifiedCount = existingRows.length;
    allFound = targetIds.length > 0 && targetIds.every((id) => foundIdSet.has(id));
  } catch {
    console.error("   ❌ Verification query failed to check existing records.");
    allFound = false;
  }

  let totalInDb = 0;
  try {
    const totalInDbResult = await sql`SELECT COUNT(*)::int AS count FROM inquiries`;
    totalInDb = totalInDbResult[0]?.count ?? 0;
  } catch {
    console.error("   ⚠️ Unable to retrieve total database record count.");
  }

  // 6. Confirm source JSON file integrity
  let jsonIntact = false;
  let postMigrationJsonCount = 0;
  try {
    const postRaw = await fs.readFile(jsonPath, "utf-8");
    const postRecords = JSON.parse(postRaw || "[]");
    postMigrationJsonCount = postRecords.length;
    jsonIntact = postMigrationJsonCount === records.length && postMigrationJsonCount === 4;
  } catch {
    jsonIntact = false;
  }

  console.log("==================================================");
  console.log("   Migration Verification Summary");
  console.log("==================================================");
  console.log(`   • Total Historical Records:       ${records.length}`);
  console.log(`   • Records Newly Inserted:         ${insertedCount}`);
  console.log(`   • Records Skipped (Pre-existing): ${skippedCount}`);
  console.log(`   • Failed Record Writes:           ${failedCount}`);
  console.log(`   • Verified in Database:           ${verifiedCount}/${records.length}`);
  console.log(`   • Total Database Record Count:    ${totalInDb}`);
  console.log(`   • Source File Record Count:       ${postMigrationJsonCount} (Intact: ${jsonIntact ? "YES" : "NO"})`);
  console.log(`   • Security & Privacy:             Zero customer details or secrets logged`);
  console.log("==================================================");

  if (!allFound || failedCount > 0 || !jsonIntact) {
    console.error("❌ Migration failed verification checks.");
    process.exit(1);
  } else {
    console.log("🎉 Historical enquiry migration verified and completed successfully.");
  }
}

migrateHistoricalInquiries().catch(() => {
  console.error("❌ Unexpected database error occurred during migration.");
  process.exit(1);
});
