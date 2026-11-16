import nodemailer, { type Transporter } from "nodemailer";
import type { InquiryData } from "@/lib/inquiries";

/**
 * HTML Escaper to prevent HTML injection in emails
 */
export function escapeHtml(str: string | undefined | null): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Determine if an email address is a genuine client email address
 * (excluding internally synthesized callback placeholders)
 */
export function isRealClientEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  if (clean.includes("@client-callback.amandevs.run.place")) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
}

/**
 * Singleton SMTP Transporter for Zoho
 */
let cachedTransporter: Transporter | null = null;

export function getSmtpTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST || "smtp.zoho.in";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const rawPass = process.env.SMTP_PASS;

  if (!user || !rawPass) {
    return null;
  }

  if (!cachedTransporter) {
    // Zoho app passwords are often provided with spaces (e.g. "MTuj gsv8 6igz")
    // SMTP authentication requires either the raw string or without spaces.
    // We clean leading/trailing spaces; for app passwords, we try the trimmed version.
    const pass = rawPass.trim();

    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: user.trim(),
        pass: pass,
      },
      connectionTimeout: 10000,
      socketTimeout: 15000,
      tls: {
        rejectUnauthorized: true,
      },
    });
  }

  return cachedTransporter;
}

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send Admin Lead Notification Email to LEAD_RECEIVER_EMAIL
 */
export async function sendAdminNotificationEmail(
  inquiry: InquiryData
): Promise<EmailDispatchResult> {
  const transporter = getSmtpTransporter();
  const receiver =
    process.env.LEAD_RECEIVER_EMAIL ||
    process.env.SUPPORT_EMAIL ||
    "hello@amandevs.run.place";
  const fromUser = process.env.SMTP_FROM || process.env.SMTP_USER || "hello@amandevs.run.place";
  const fromAddress = `"AmanDevs Studio" <${fromUser}>`;

  if (!transporter) {
    return {
      success: false,
      error: "SMTP credentials not configured in environment.",
    };
  }

  const safeId = escapeHtml(inquiry.id);
  const safeName = escapeHtml(inquiry.name);
  const safeBusiness = escapeHtml(inquiry.businessName || "Not specified");
  const safeEmail = escapeHtml(inquiry.email);
  const safePhone = escapeHtml(inquiry.phone);
  const safeService = escapeHtml(inquiry.service);
  const safeBudget = escapeHtml(inquiry.budget);
  const safeTimeline = escapeHtml(inquiry.timeline);
  const safeDescription = escapeHtml(inquiry.description);
  const safeReferenceUrl = escapeHtml(inquiry.referenceUrl);
  const dateFormatted = new Date(inquiry.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const replyTo = isRealClientEmail(inquiry.email) ? inquiry.email : undefined;

  // Plain Text Alternative
  const textContent = `
========================================
NEW COMMERCIAL LEAD [${inquiry.id}]
AmanDevs Digital Studio (amandevs.run.place)
========================================

Reference ID:      ${inquiry.id}
Client Name:       ${inquiry.name}
Business / Brand:  ${inquiry.businessName || "Not specified"}
Customer Email:    ${inquiry.email}
WhatsApp / Phone:  ${inquiry.phone}
Requested Service: ${inquiry.service}
Budget Range:      ${inquiry.budget}
Target Timeline:   ${inquiry.timeline}
Reference URL:     ${inquiry.referenceUrl || "None provided"}
Date & Time:       ${dateFormatted}

----------------------------------------
Project Brief:
----------------------------------------
${inquiry.description}

Direct WhatsApp Link: https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}
========================================
`.trim();

  // Premium AmanDevs HTML Email
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Commercial Lead [${safeId}]</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B120E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
  <div style="max-width: 640px; margin: 32px auto; background-color: #000000; border: 1px solid rgba(210, 249, 70, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
    
    <!-- Header Banner -->
    <div style="background-color: #0B120E; border-bottom: 2px solid #D2F946; padding: 24px 32px;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF;">
          AmanDevs<span style="color: #D2F946;">.</span>
        </span>
        <span style="font-family: monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; background-color: rgba(210, 249, 70, 0.15); color: #D2F946; border: 1px solid rgba(210, 249, 70, 0.3); padding: 4px 10px; border-radius: 999px;">
          Reference #${safeId}
        </span>
      </div>
      <h1 style="margin: 16px 0 4px; font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">
        New Commercial Project Enquiry
      </h1>
      <p style="margin: 0; font-size: 13px; color: rgba(255, 255, 255, 0.65);">
        Received via amandevs.run.place · ${dateFormatted}
      </p>
    </div>

    <!-- Body Content -->
    <div style="padding: 32px;">
      
      <!-- Key Specs Table -->
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); width: 140px;">Client Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #FFFFFF; font-weight: 700;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);">Business / Brand</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #FFFFFF;">${safeBusiness}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);">WhatsApp / Phone</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
            <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}" style="color: #D2F946; text-decoration: none; font-weight: 700;">
              ${safePhone} (Click to Chat) →
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);">Customer Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
            <a href="mailto:${safeEmail}" style="color: #FFFFFF; text-decoration: underline;">
              ${safeEmail}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);">Requested Service</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #D2F946; font-weight: 700;">${safeService}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);">Budget Range</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #FFFFFF;">${safeBudget}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);">Target Timeline</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #FFFFFF;">${safeTimeline}</td>
        </tr>
        ${
          inquiry.referenceUrl
            ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);">Reference URL</td>
          <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
            <a href="${safeReferenceUrl}" target="_blank" style="color: #D2F946; text-decoration: underline;">
              ${safeReferenceUrl}
            </a>
          </td>
        </tr>
        `
            : ""
        }
      </table>

      <!-- Project Brief Box -->
      <div style="background-color: #0B120E; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; color: rgba(255,255,255,0.5); letter-spacing: 0.5px;">
          Project Brief / Client Scope:
        </span>
        <p style="margin: 8px 0 0; font-size: 14px; line-height: 1.6; color: #FFFFFF; white-space: pre-wrap;">${safeDescription}</p>
      </div>

      <!-- Quick Action Buttons -->
      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}" style="display: inline-block; background-color: #D2F946; color: #000000; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 20px; border-radius: 999px;">
          Reply via WhatsApp →
        </a>
        ${
          isRealClientEmail(inquiry.email)
            ? `
        <a href="mailto:${safeEmail}?subject=Re:%20AmanDevs%20Project%20Enquiry%20[${safeId}]" style="display: inline-block; background-color: rgba(255,255,255,0.1); color: #FFFFFF; font-weight: 600; font-size: 13px; text-decoration: none; padding: 12px 20px; border-radius: 999px;">
          Reply via Email
        </a>
        `
            : ""
        }
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #0B120E; border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 16px 32px; font-size: 12px; color: rgba(255, 255, 255, 0.5);">
      Delivered via Zoho SMTP to <strong>${escapeHtml(receiver)}</strong> · AmanDevs Digital Studio
    </div>

  </div>
</body>
</html>
`.trim();

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: receiver,
      replyTo: replyTo,
      subject: `[AmanDevs Lead #${inquiry.id}] ${inquiry.service} — ${inquiry.name}`,
      text: textContent,
      html: htmlContent,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Zoho SMTP Error] Failed to send admin notification: ${errorMsg}`);
    return {
      success: false,
      error: errorMsg,
    };
  }
}

/**
 * Send Customer Acknowledgement Email (if client provided a valid email)
 */
export async function sendCustomerAcknowledgementEmail(
  inquiry: InquiryData
): Promise<EmailDispatchResult> {
  if (!isRealClientEmail(inquiry.email)) {
    return {
      success: false,
      error: "No valid client email provided (quick callback mode).",
    };
  }

  const transporter = getSmtpTransporter();
  const fromUser = process.env.SMTP_FROM || process.env.SMTP_USER || "hello@amandevs.run.place";
  const fromAddress = `"AmanDevs Digital Studio" <${fromUser}>`;

  if (!transporter) {
    return {
      success: false,
      error: "SMTP credentials not configured in environment.",
    };
  }

  const safeId = escapeHtml(inquiry.id);
  const safeName = escapeHtml(inquiry.name);
  const safeService = escapeHtml(inquiry.service);

  const textContent = `
Hello ${inquiry.name},

Thank you for reaching out to AmanDevs Digital Studio. We have received your project enquiry regarding "${inquiry.service}".

Your reference number for this enquiry is: ${inquiry.id}

Founder and lead developer Aman Raj will personally review your brief and get back to you within 24 hours with an actionable scope, transparent pricing, and timeline.

If you have urgent questions or prefer discussing your requirements immediately, you can also reach Aman directly on WhatsApp:
https://wa.me/917369083321

Best regards,
Aman Raj
Founder & Lead Developer
AmanDevs Digital Studio
Website: https://amandevs.run.place
Email: hello@amandevs.run.place
WhatsApp: +91 73690 83321
`.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We received your project enquiry — AmanDevs</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B120E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
  <div style="max-width: 600px; margin: 32px auto; background-color: #000000; border: 1px solid rgba(210, 249, 70, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
    
    <!-- Header -->
    <div style="background-color: #0B120E; border-bottom: 2px solid #D2F946; padding: 24px 32px;">
      <span style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF;">
        AmanDevs<span style="color: #D2F946;">.</span>
      </span>
      <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.65);">
        Independent Digital Development Studio
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">
        We received your project enquiry
      </h2>

      <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85);">
        Hello <strong>${safeName}</strong>,
      </p>

      <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85);">
        Thank you for getting in touch with AmanDevs. Your project enquiry for <strong>${safeService}</strong> has been logged in our system.
      </p>

      <!-- Reference Box -->
      <div style="background-color: #0B120E; border: 1px solid rgba(210, 249, 70, 0.3); border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
        <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; color: rgba(255, 255, 255, 0.5); letter-spacing: 0.5px;">
          Enquiry Reference ID:
        </span>
        <p style="margin: 4px 0 0; font-family: monospace; font-size: 18px; font-weight: 700; color: #D2F946;">
          ${safeId}
        </p>
      </div>

      <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85);">
        Founder and lead developer <strong>Aman Raj</strong> will review your requirements personally and respond within <strong>24 hours</strong> with clear pricing, milestones, and timeline suggestions.
      </p>

      <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85);">
        If your project is urgent or you would prefer a direct conversation right away, feel free to chat with Aman directly on WhatsApp:
      </p>

      <a href="https://wa.me/917369083321?text=${encodeURIComponent(
        `Hello Aman, I submitted an enquiry for ${inquiry.service} (Ref #${inquiry.id}). Let's connect!`
      )}" style="display: inline-block; background-color: #D2F946; color: #000000; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 999px;">
        Chat on WhatsApp (+91 73690 83321) →
      </a>
    </div>

    <!-- Footer -->
    <div style="background-color: #0B120E; border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 20px 32px; font-size: 12px; color: rgba(255, 255, 255, 0.5); line-height: 1.6;">
      <p style="margin: 0 0 4px; color: #FFFFFF; font-weight: 600;">AmanDevs Digital Studio · Founder: Aman Raj</p>
      <p style="margin: 0;">Website: <a href="https://amandevs.run.place" style="color: #D2F946; text-decoration: none;">amandevs.run.place</a> · Email: <a href="mailto:hello@amandevs.run.place" style="color: #D2F946; text-decoration: none;">hello@amandevs.run.place</a></p>
    </div>

  </div>
</body>
</html>
`.trim();

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: inquiry.email,
      replyTo: fromUser,
      subject: `We received your project enquiry — AmanDevs`,
      text: textContent,
      html: htmlContent,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Zoho SMTP Error] Failed to send customer acknowledgement: ${errorMsg}`);
    return {
      success: false,
      error: errorMsg,
    };
  }
}
