// src/app/api/contact/route.ts
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import validator from "validator";
import dns from "dns/promises";
import { logLead, initLeadsTable } from "@/lib/leads";

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

    const { name, email, phone, message, honeypot } = await req.json();

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

    if (!message?.trim()) {
      return new Response(
        JSON.stringify({ ok: false, error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
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

    const subject = `New enquiry from ${name.trim()}`;
    const text =
      `Name/Company: ${name.trim()}\n` +
      `Email: ${email.trim()}\n` +
      `Phone: ${phoneResult.normalized}\n\n` +
      `Message:\n${message.trim()}\n`;

    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        `"Lapiz Blue Website" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      replyTo: email.trim(), // reply goes to the person who filled the form
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
        source: "contact_form",
        name: name.trim(),
        email: email.trim(),
        phone: phoneResult.normalized,
        message: message.trim(),
        ipAddress: clientIP,
        userAgent,
        referrer,
        country,
      });
    } catch (leadError) {
      // Log but don't fail the request
      console.error("Failed to log lead:", leadError);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
