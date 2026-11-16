import fs from "fs/promises";
import path from "path";

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
    notificationDispatched?: boolean;
    webhookDispatched?: boolean;
    smtpAdminDispatched?: boolean;
    smtpAckDispatched?: boolean;
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
 * Ensure storage directory and inquiries ledger exist
 */
async function ensureLedgerExists(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(INQUIRIES_FILE);
    } catch {
      await fs.writeFile(INQUIRIES_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("[Inquiry Storage] Failed to initialize ledger directory:", err);
  }
}

/**
 * Save an inquiry to persistent storage
 */
export async function saveInquiry(inquiry: InquiryData): Promise<void> {
  await ensureLedgerExists();
  try {
    const raw = await fs.readFile(INQUIRIES_FILE, "utf-8");
    const list: InquiryData[] = JSON.parse(raw || "[]");
    list.unshift(inquiry);
    // Persist pretty-printed JSON
    await fs.writeFile(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("[Inquiry Storage] Error writing to inquiries.json:", err);
  }
}

/**
 * Retrieve all inquiries (for administrative audit)
 */
export async function getInquiries(): Promise<InquiryData[]> {
  await ensureLedgerExists();
  try {
    const raw = await fs.readFile(INQUIRIES_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("[Inquiry Storage] Error reading inquiries.json:", err);
    return [];
  }
}

/**
 * Dispatch notification email via Resend API if configured
 */
export async function sendNotificationEmail(inquiry: InquiryData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEAD_RECEIVER_EMAIL || process.env.SUPPORT_EMAIL || "hello@amandevs.run.place";

  if (!apiKey) {
    return false;
  }

  try {
    // 1. Send notification to AmanDevs Studio Inbox (hello@amandevs.run.place)
    const adminEmailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 12px; background-color: #fafafa;">
        <div style="border-bottom: 2px solid #101014; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #101014;">🚀 New Commercial Lead [${inquiry.id}]</h2>
          <p style="margin: 4px 0 0; color: #666; font-size: 13px;">Received via AmanDevs Studio (amandevs.run.place)</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Client Name:</strong></td>
            <td style="padding: 8px 0; color: #101014;"><strong>${inquiry.name}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Business / Brand:</strong></td>
            <td style="padding: 8px 0; color: #101014;">${inquiry.businessName || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${inquiry.email}" style="color: #8B75FF;">${inquiry.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>WhatsApp / Phone:</strong></td>
            <td style="padding: 8px 0;"><a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}" style="color: #059669; font-weight: bold;">${inquiry.phone} (Click to WhatsApp)</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Service Required:</strong></td>
            <td style="padding: 8px 0; color: #101014;"><strong>${inquiry.service}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Budget Range:</strong></td>
            <td style="padding: 8px 0; color: #101014;">${inquiry.budget}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Target Timeline:</strong></td>
            <td style="padding: 8px 0; color: #101014;">${inquiry.timeline}</td>
          </tr>
          ${inquiry.referenceUrl ? `
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Reference Site:</strong></td>
            <td style="padding: 8px 0;"><a href="${inquiry.referenceUrl}" target="_blank" style="color: #8B75FF;">${inquiry.referenceUrl}</a></td>
          </tr>
          ` : ""}
        </table>

        <div style="background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 8px; color: #101014; font-size: 13px; text-transform: uppercase;">Project Brief:</h4>
          <p style="margin: 0; color: #333; line-height: 1.5; font-size: 14px; white-space: pre-wrap;">${inquiry.description}</p>
        </div>

        <div style="border-top: 1px solid #e5e5e5; padding-top: 12px; font-size: 12px; color: #888;">
          Sent to primary inbox: <strong>${recipient}</strong> · Reference: ${inquiry.id}
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `AmanDevs Leads <hello@amandevs.run.place>`,
        to: [recipient],
        subject: `[AmanDevs Inquiry] ${inquiry.service} — ${inquiry.name} (${inquiry.businessName || "New Lead"})`,
        html: adminEmailHtml,
        reply_to: inquiry.email,
      }),
    });

    return res.ok;
  } catch (err) {
    console.error("[Email Notification] Failed to send via Resend:", err);
    return false;
  }
}

/**
 * Dispatch webhook to external automation tools (Slack/Discord/Make/Zapier)
 */
export async function dispatchWebhook(inquiry: InquiryData): Promise<boolean> {
  const webhookUrl = process.env.CONTACT_NOTIFICATION_WEBHOOK;
  if (!webhookUrl) return false;

  try {
    const payload = {
      event: "new_inquiry",
      inquiryId: inquiry.id,
      timestamp: inquiry.createdAt,
      source: "amandevs.run.place",
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
