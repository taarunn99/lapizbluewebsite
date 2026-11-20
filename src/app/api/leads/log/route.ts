// src/app/api/leads/log/route.ts
import type { NextRequest } from "next/server";
import { logLead, initLeadsTable, isLeadSource } from "@/lib/leads";

// Initialize table on first request (idempotent)
let tableInitialized = false;

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP;
  const cfIP = req.headers.get("cf-connecting-ip");
  if (cfIP) return cfIP;
  return "unknown";
}

function getCountry(req: NextRequest): string | undefined {
  const cfCountry = req.headers.get("cf-ipcountry");
  if (cfCountry) return cfCountry;
  const vercelCountry = req.headers.get("x-vercel-ip-country");
  if (vercelCountry) return vercelCountry;
  return undefined;
}

const str = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;

export async function POST(req: NextRequest) {
  try {
    // Initialize table if needed
    if (!tableInitialized) {
      await initLeadsTable();
      tableInitialized = true;
    }

    const body = await req.json();
    const source = body?.source;

    // Validate source. Every value the site can send is in LEAD_SOURCES, so a
    // 400 here means a component is sending a name nobody registered.
    if (!isLeadSource(source)) {
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid source" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get request metadata
    const ipAddress = getClientIP(req);
    const userAgent = req.headers.get("user-agent") || undefined;
    const referrer = req.headers.get("referer") || undefined;
    const country = getCountry(req);

    // Log the lead
    const result = await logLead({
      source,
      name: str(body.name),
      email: str(body.email),
      phone: str(body.phone),
      message: str(body.message),
      ipAddress,
      userAgent,
      referrer,
      utmSource: str(body.utmSource),
      utmMedium: str(body.utmMedium),
      utmCampaign: str(body.utmCampaign),
      country,
      pageUrl: str(body.pageUrl),
      product: str(body.product),
      brand: str(body.brand),
      company: str(body.company),
      role: str(body.role),
      emirate: str(body.emirate),
      buttonLocation: str(body.buttonLocation),
      targetHref: str(body.targetHref),
    });

    if (!result.success) {
      console.error("Failed to log lead:", result.error);
      return new Response(
        JSON.stringify({ ok: false, error: "Failed to log lead" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, id: result.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Lead log API error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
