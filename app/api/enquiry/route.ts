export const runtime = "nodejs";

import { NextResponse } from "next/server";
import {
  generateInquiryId,
  saveInquiry,
  getInquiries,
  dispatchWebhook,
  type InquiryData,
} from "@/lib/inquiries";

// In-memory IP rate limiter: max 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < windowMs);
  if (valid.length >= limit) {
    rateLimitMap.set(ip, valid);
    return true;
  }
  valid.push(now);
  rateLimitMap.set(ip, valid);
  return false;
}

function sanitize(str: string | undefined | null): string {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, "").trim();
}

export async function POST(request: Request) {
  try {
    // 1. Payload size check (prevent large payload flooding)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 32768) {
      return NextResponse.json(
        { error: "Payload exceeds acceptable size limits (32KB)." },
        { status: 413 }
      );
    }

    // 2. IP Rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many requests from your connection. Please reach out directly on WhatsApp (+91 73690 83321) or try again in a few minutes.",
        },
        { status: 429 }
      );
    }

    const data = await request.json();
    const {
      _hp, // Honeypot field: automated bots fill this
      mode = "full", // "quick" | "full"
      name,
      businessName,
      email,
      phone,
      service,
      budget,
      timeline,
      description,
      referenceUrl,
    } = data;

    // 3. Spam Protection (Honeypot)
    if (_hp && typeof _hp === "string" && _hp.trim().length > 0) {
      // Return a simulated success to confuse bot crawlers without persisting spam
      return NextResponse.json({
        success: true,
        inquiryId: "AD-SPAM-FILTERED",
        message: "Enquiry submitted successfully.",
      });
    }

    // 4. Input Sanitization
    const cleanName = sanitize(name);
    const cleanBusiness = sanitize(businessName) || "Not specified";
    const cleanEmail = sanitize(email).toLowerCase();
    const cleanPhone = (phone || "").toString().replace(/[^0-9+]/g, "");
    const cleanService = sanitize(service) || "Business Website Development";
    const cleanBudget = sanitize(budget) || "₹15,000 – ₹29,999 (Business Tier)";
    const cleanTimeline = sanitize(timeline) || "Within 1 Month";
    const cleanDescription = sanitize(description);
    const cleanReference = sanitize(referenceUrl);

    // 5. Validation Logic based on mode
    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!cleanPhone || cleanPhone.length < 8) {
      return NextResponse.json(
        { error: "Please provide a valid phone or WhatsApp number (at least 8 digits)." },
        { status: 400 }
      );
    }

    let finalEmail = cleanEmail;
    let finalDescription = cleanDescription;

    if (mode === "quick") {
      // In quick callback mode, description and email can be inferred if omitted
      if (!finalEmail) {
        finalEmail = `${cleanPhone.replace(/[^0-9]/g, "")}@client-callback.amandevs-eta.vercel.app`;
      }
      if (!finalDescription) {
        finalDescription = `Quick callback requested for: ${cleanService}. Direct phone/WhatsApp: ${cleanPhone}`;
      }
    } else {
      // Full qualification mode requires valid email and project brief
      if (!finalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)) {
        return NextResponse.json(
          { error: "Please provide a valid email address so we can reply." },
          { status: 400 }
        );
      }

      if (!finalDescription || finalDescription.length < 10) {
        return NextResponse.json(
          { error: "Please share a short brief of your project (minimum 10 characters)." },
          { status: 400 }
        );
      }
    }

    // Extract user agent metadata
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const inquiryId = generateInquiryId();
    const primarySupportEmail = process.env.SUPPORT_EMAIL || "hello@amandevs.run.place";

    const inquiryRecord: InquiryData = {
      id: inquiryId,
      createdAt: new Date().toISOString(),
      name: cleanName,
      businessName: cleanBusiness,
      email: finalEmail,
      phone: cleanPhone,
      service: cleanService,
      budget: cleanBudget,
      timeline: cleanTimeline,
      description: finalDescription,
      referenceUrl: cleanReference,
      status: "NEW",
      metadata: {
        userAgent,
        ip,
        webhookDispatched: false,
      },
    };

    // 6. SAVE TO PERSISTENT STORAGE
    try {
      await saveInquiry(inquiryRecord);
    } catch (storageErr) {
      console.error("[Inquiry Storage Failure]:", storageErr);
      return NextResponse.json(
        {
          error:
            "Unable to record enquiry. Please contact us directly via WhatsApp (+91 73690 83321) or email hello@amandevs.run.place.",
        },
        { status: 500 }
      );
    }

    // 7. Dispatch Webhook (if configured)
    const webhookSent = await dispatchWebhook(inquiryRecord);
    if (inquiryRecord.metadata) {
      inquiryRecord.metadata.webhookDispatched = webhookSent;
    }

    console.log(
      `[AmanDevs] ✅ Commercial Inquiry Logged [${mode.toUpperCase()}]: ${inquiryId} from ${inquiryRecord.name} (${inquiryRecord.phone})`
    );

    return NextResponse.json({
      success: true,
      inquiryId,
      message: `Your project enquiry has been logged under Reference #${inquiryId}. Aman Raj will review your brief and follow up with you.`,
      supportEmail: primarySupportEmail,
      inquiry: {
        id: inquiryId,
        name: inquiryRecord.name,
        service: inquiryRecord.service,
        createdAt: inquiryRecord.createdAt,
      },
    });
  } catch (err: unknown) {
    console.error("[Inquiry API Unexpected Error]:", err);
    return NextResponse.json(
      {
        error:
          "Unable to process enquiry. Please message us directly via WhatsApp (+91 73690 83321) or email hello@amandevs.run.place.",
      },
      { status: 500 }
    );
  }
}

// Administrative inquiry audit endpoint (protected by ADMIN_SECRET_KEY)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("key");

  const configuredSecret = process.env.ADMIN_SECRET_KEY;
  if (!configuredSecret || secret !== configuredSecret) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const list = await getInquiries();
  return NextResponse.json({ total: list.length, inquiries: list });
}
