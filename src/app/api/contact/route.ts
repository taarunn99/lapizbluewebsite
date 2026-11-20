// src/app/api/contact/route.ts
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import validator from "validator";
import dns from "dns/promises";
import { logLead, initLeadsTable } from "@/lib/leads";
import { createCrmLead } from "@/lib/zoho-crm";

// Initialize leads table on first request
let leadsTableInitialized = false;

// Rate limiting: track submissions per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10; // max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getClientIP(req: NextRequest): string {
  // Try various headers for the real IP
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP;
  const cfIP = req.headers.get("cf-connecting-ip");
  if (cfIP) return cfIP;
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    // New window
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

function getCountryFromRequest(req: NextRequest): CountryCode {
  // Try to get country from various headers
  const cfCountry = req.headers.get("cf-ipcountry");
  if (cfCountry && cfCountry.length === 2) {
    return cfCountry.toUpperCase() as CountryCode;
  }
  const vercelCountry = req.headers.get("x-vercel-ip-country");
  if (vercelCountry && vercelCountry.length === 2) {
    return vercelCountry.toUpperCase() as CountryCode;
  }
  // Default to UAE
  return "AE";
}

function validatePhone(
  phone: string,
  defaultCountry: CountryCode
): { valid: boolean; normalized?: string; error?: string } {
  if (!phone?.trim()) {
    return { valid: false, error: "Phone number is required" };
  }

  const trimmed = phone.trim();

  // Try parsing with the detected country
  let phoneNumber = parsePhoneNumberFromString(trimmed, defaultCountry);

  // If that didn't work and no + prefix, try with + prefix
  if (!phoneNumber && !trimmed.startsWith("+")) {
    phoneNumber = parsePhoneNumberFromString("+" + trimmed);
  }

  // Special handling for UAE numbers without country code
  if (!phoneNumber && defaultCountry === "AE") {
    // UAE mobile numbers often start with 05x
    if (/^0?5\d{8}$/.test(trimmed.replace(/\D/g, ""))) {
      const digits = trimmed.replace(/\D/g, "");
      const normalized = digits.startsWith("0") ? digits.slice(1) : digits;
      phoneNumber = parsePhoneNumberFromString("+971" + normalized);
    }
  }

  if (!phoneNumber) {
    return { valid: false, error: "Please enter a valid phone number" };
  }

  if (!phoneNumber.isValid()) {
    return { valid: false, error: "Please enter a valid phone number" };
  }

  return { valid: true, normalized: phoneNumber.format("E.164") };
}

async function validateEmail(
  email: string
): Promise<{ valid: boolean; error?: string }> {
  if (!email?.trim()) {
    return { valid: false, error: "Email is required" };
  }

  const trimmed = email.trim().toLowerCase();

  // Basic syntax validation
  if (!validator.isEmail(trimmed)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  // Extract domain and check MX records
  const domain = trimmed.split("@")[1];
  if (!domain) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  try {
    // DNS MX record check with timeout
    const mxPromise = dns.resolveMx(domain);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DNS timeout")), 3000)
    );

    const mxRecords = await Promise.race([mxPromise, timeoutPromise]);
    if (!mxRecords || mxRecords.length === 0) {
      return { valid: false, error: "This email domain cannot receive emails" };
    }
  } catch {
    // If DNS lookup fails, still allow the submission (could be temporary issue)
    // but log it for monitoring
    console.warn(`DNS lookup failed for domain: ${domain}`);
  }

  return { valid: true };
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(req);

    // Check rate limit
    const { allowed, retryAfter } = checkRateLimit(clientIP);
    if (!allowed) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Too many requests. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfter),
          },
        }
      );
    }

    const { name, email, phone, message, honeypot, company, role, emirate, pageUrl, trn, monthlyVolume, attachment, channel } =
      await req.json();
    const kind: "contact_form" | "rfq_form" | "trade_account_form" =
      channel === "trade_account_form" ? "trade_account_form" : channel === "rfq_form" || attachment ? "rfq_form" : "contact_form";

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      // Return success to not alert the bot, but don't send email
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Basic field presence validation
    if (!name?.trim()) {
      return new Response(
        JSON.stringify({ ok: false, error: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!message?.trim() && kind !== "trade_account_form") {
      return new Response(
        JSON.stringify({ ok: false, error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // An attachment arrives as a data URL from the browser, the same way the
    // careers form sends a CV. Capped at 8 MB, so the SMTP relay accepts it.
    let mailAttachment: { filename: string; content: string; encoding: "base64"; contentType: string } | undefined;
    if (attachment?.data) {
      const matches = String(attachment.data).match(/^data:(.+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return new Response(JSON.stringify({ ok: false, error: "Invalid file format" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (matches[2].length > 8 * 1024 * 1024 * 1.37) {
        return new Response(JSON.stringify({ ok: false, error: "File too large. Keep it under 8 MB." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const safeName = String(attachment.name || "attachment").replace(/[^\w.\- ]+/g, "_").slice(0, 120);
      mailAttachment = { filename: safeName, content: matches[2], encoding: "base64", contentType: matches[1] };
    }

    // Validate phone number
    const defaultCountry = getCountryFromRequest(req);
    const phoneResult = validatePhone(phone, defaultCountry);
    if (!phoneResult.valid) {
      return new Response(
        JSON.stringify({ ok: false, error: phoneResult.error }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate email
    const emailResult = await validateEmail(email);
    if (!emailResult.valid) {
      return new Response(
        JSON.stringify({ ok: false, error: emailResult.error }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Configure SMTP transport for Zoho
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.zoho.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    // Send to contact email from env or fallback
    const to = process.env.CONTACT_EMAIL || "adil@lapizblue.com";

    const subject =
      kind === "trade_account_form"
        ? `Trade account application: ${String(company || name).trim()}`
        : kind === "rfq_form"
          ? `BOQ enquiry from ${String(company || name).trim()}`
          : `New enquiry from ${name.trim()}`;
    const text =
      `Name: ${name.trim()}\n` +
      (company ? `Company: ${String(company).trim()}\n` : "") +
      (role ? `Role: ${String(role).trim()}\n` : "") +
      (emirate ? `Emirate: ${String(emirate).trim()}\n` : "") +
      (trn ? `TRN: ${String(trn).trim()}\n` : "") +
      (monthlyVolume ? `Expected monthly volume: ${String(monthlyVolume).trim()}\n` : "") +
      (mailAttachment ? `Attachment: ${mailAttachment.filename}\n` : "") +
      (pageUrl ? `Page: ${String(pageUrl)}\n` : "") +
      `Email: ${email.trim()}\n` +
      `Phone: ${phoneResult.normalized}\n\n` +
      `Message:\n${String(message || "").trim()}\n`;

    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        `"Lapiz Blue Website" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      replyTo: email.trim(), // reply goes to the person who filled the form
      ...(mailAttachment ? { attachments: [mailAttachment] } : {}),
    });

    // Log lead to database (non-blocking, don't fail if DB unavailable)
    try {
      if (!leadsTableInitialized) {
        await initLeadsTable();
        leadsTableInitialized = true;
      }

      const userAgent = req.headers.get("user-agent") || undefined;
      const referrer = req.headers.get("referer") || undefined;
      const country = req.headers.get("cf-ipcountry") || req.headers.get("x-vercel-ip-country") || undefined;

      await logLead({
        source: kind,
        name: name.trim(),
        email: email.trim(),
        phone: phoneResult.normalized,
        message: String(message || "").trim(),
        ipAddress: clientIP,
        userAgent,
        referrer,
        country,
        company: company ? String(company) : undefined,
        role: role ? String(role) : undefined,
        emirate: emirate ? String(emirate) : undefined,
        pageUrl: pageUrl ? String(pageUrl) : undefined,
      });
    } catch (leadError) {
      // Log but don't fail the request
      console.error("Failed to log lead:", leadError);
    }

    // Into the CRM as a Website lead. Also non-blocking: the email has gone.
    await createCrmLead({
      name: name.trim(),
      email: email.trim(),
      phone: phoneResult.normalized,
      company: company ? String(company) : undefined,
      role: role ? String(role) : undefined,
      emirate: emirate ? String(emirate) : undefined,
      message:
        String(message || "").trim() +
        (trn ? `\nTRN: ${String(trn).trim()}` : "") +
        (monthlyVolume ? `\nExpected monthly volume: ${String(monthlyVolume).trim()}` : "") +
        (mailAttachment ? `\nAttachment sent by email: ${mailAttachment.filename}` : ""),
      pageUrl: pageUrl ? String(pageUrl) : undefined,
      channel: kind,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("CONTACT API ERROR DETAIL:", message);
    const isSmtp =
      /smtp|auth|credential|login|password|ECONNREFUSED|ETIMEDOUT/i.test(message);
    return new Response(
      JSON.stringify({
        ok: false,
        error: isSmtp
          ? "Email service temporarily unavailable. Please contact us via WhatsApp."
          : "Server error. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
