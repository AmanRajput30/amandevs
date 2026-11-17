import fs from "fs/promises";
import path from "path";
import { getDb, ensureInquiriesTable } from "./db";

export interface InquiryData {
  id: string;
  createdAt: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  referenceUrl?: string;
  status: "NEW" | "REVIEWED" | "CONTACTED" | "CLOSED";
  metadata?: {
    userAgent?: string;
    ip?: string;
    webhookDispatched?: boolean;
    smtpAdminDispatched?: boolean;
    smtpAckDispatched?: boolean;
    notificationDispatched?: boolean;
  };
}

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

/**
 * Generate a clean human-readable reference ID
 * e.g. AD-202611-8421
 */
export function generateInquiryId(): string {
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `AD-${yearMonth}-${randomSuffix}`;
}

/**
 * Helper to ensure local storage ledger exists (used only for offline local dev fallback)
 */
async function ensureLocalLedgerExists(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(INQUIRIES_FILE);
    } catch {
      await fs.writeFile(INQUIRIES_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("[Inquiry Storage] Failed to initialize local ledger directory:", err);
  }
}

/**
 * Save an inquiry to local JSON ledger (development fallback only)
 */
async function saveInquiryToJson(inquiry: InquiryData): Promise<void> {
  await ensureLocalLedgerExists();
  const raw = await fs.readFile(INQUIRIES_FILE, "utf-8");
  const list: InquiryData[] = JSON.parse(raw || "[]");
  list.unshift(inquiry);
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf-8");
}

/**
 * Read inquiries from local JSON ledger (development fallback only)
 */
async function getInquiriesFromJson(): Promise<InquiryData[]> {
  await ensureLocalLedgerExists();
  const raw = await fs.readFile(INQUIRIES_FILE, "utf-8");
  return JSON.parse(raw || "[]");
}

/**
 * Save an inquiry.
 * Inserts into Neon PostgreSQL when DATABASE_URL is available.
 * Does not fall back to JSON in production.
 */
export async function saveInquiry(inquiry: InquiryData): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL is not configured in production. Cannot persist inquiry.");
    }
    // Local development fallback when DATABASE_URL is intentionally absent
    console.warn("[Inquiry Storage] DATABASE_URL not set. Saving to local JSON ledger for development.");
    await saveInquiryToJson(inquiry);
    return;
  }

  try {
    await ensureInquiriesTable();
    const sql = getDb();
    await sql`
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
        ${inquiry.id},
        ${inquiry.createdAt},
        ${inquiry.name},
        ${inquiry.businessName || "Not specified"},
        ${inquiry.email},
        ${inquiry.phone},
        ${inquiry.service},
        ${inquiry.budget},
        ${inquiry.timeline},
        ${inquiry.description},
        ${inquiry.referenceUrl || null},
        ${inquiry.status || "NEW"},
        ${JSON.stringify(inquiry.metadata || {})}
      )
    `;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown database error";
    console.error("[Database Persistence Error]:", msg);
    // Explicit controlled error without silent JSON fallback in production
    throw new Error("Failed to persist inquiry to database.");
  }
}

/**
 * Retrieve all inquiries ordered by created_at descending.
 */
export async function getInquiries(): Promise<InquiryData[]> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL is not configured in production.");
    }
    return getInquiriesFromJson();
  }

  try {
    await ensureInquiriesTable();
    const sql = getDb();
    const rows = await sql`
      SELECT 
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
      FROM inquiries
      ORDER BY created_at DESC
    `;

    return rows.map((r: Record<string, unknown>) => ({
      id: String(r.id),
      createdAt: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
      name: String(r.name),
      businessName: String(r.business_name || "Not specified"),
      email: String(r.email),
      phone: String(r.phone),
      service: String(r.service),
      budget: String(r.budget),
      timeline: String(r.timeline),
      description: String(r.description),
      referenceUrl: r.reference_url ? String(r.reference_url) : undefined,
      status: (r.status as InquiryData["status"]) || "NEW",
      metadata: typeof r.metadata === "object" && r.metadata !== null ? (r.metadata as InquiryData["metadata"]) : undefined,
    }));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown database error";
    console.error("[Database Query Error]:", msg);
    throw new Error("Failed to retrieve inquiries from database.");
  }
}

/**
 * Dispatch webhook to external automation tools (Slack/Discord/Make/Zapier) if configured
 */
export async function dispatchWebhook(inquiry: InquiryData): Promise<boolean> {
  const webhookUrl = process.env.CONTACT_NOTIFICATION_WEBHOOK;
  if (!webhookUrl) return false;

  try {
    const payload = {
      event: "new_inquiry",
      inquiryId: inquiry.id,
      timestamp: inquiry.createdAt,
      source: "amandevs-eta.vercel.app",
      client: {
        name: inquiry.name,
        businessName: inquiry.businessName,
        email: inquiry.email,
        phone: inquiry.phone,
      },
      project: {
        service: inquiry.service,
        budget: inquiry.budget,
        timeline: inquiry.timeline,
        description: inquiry.description,
        referenceUrl: inquiry.referenceUrl,
      },
      directWhatsApp: `https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}`,
      text: `🚀 *New AmanDevs Project Inquiry [${inquiry.id}]*\n*Client:* ${inquiry.name} (${inquiry.businessName || "N/A"})\n*Email:* ${inquiry.email}\n*Phone:* ${inquiry.phone}\n*Service:* ${inquiry.service}\n*Budget:* ${inquiry.budget}\n*Timeline:* ${inquiry.timeline}\n*Details:* ${inquiry.description}`,
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.ok;
  } catch (err) {
    console.error("[Webhook Dispatch] Failed to send webhook:", err);
    return false;
  }
}
