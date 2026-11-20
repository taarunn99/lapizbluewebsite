/**
 * Website enquiries into Zoho CRM as Leads, so the lead mix can be read in
 * the CRM rather than guessed.
 *
 * Server only. Uses a long lived refresh token to mint a short lived access
 * token on each cold start, which is the only flow Zoho offers for a server
 * with no user present. With the three variables unset the call is a no-op
 * that logs once, so a missing credential never fails an enquiry.
 *
 * Variables (Vercel project settings):
 *   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN
 *   ZOHO_ACCOUNTS_URL  default https://accounts.zoho.com
 *   ZOHO_API_URL       default https://www.zohoapis.com
 *   ZOHO_LEAD_SOURCE   default Website (must exist in the Lead Source picklist)
 */

export interface CrmLeadInput {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  emirate?: string;
  message?: string;
  pageUrl?: string;
  product?: string;
  brand?: string;
  /** Which form it came from, written into the description. */
  channel: "contact_form" | "rfq_form" | "trade_account_form";
}

let cached: { token: string; expiresAt: number } | null = null;
let warned = false;

function configured(): boolean {
  return Boolean(
    process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET && process.env.ZOHO_REFRESH_TOKEN,
  );
}

async function accessToken(): Promise<string> {
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;
  const accounts = process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com";
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
  });
  const res = await fetch(`${accounts}/oauth/v2/token`, { method: "POST", body });
  const json = (await res.json()) as { access_token?: string; expires_in?: number; error?: string };
  if (!res.ok || !json.access_token) {
    throw new Error(`Zoho token refresh failed: ${json.error || res.status}`);
  }
  cached = { token: json.access_token, expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000 };
  return cached.token;
}

/** Zoho wants a surname. Take the last word, or the whole thing if there is one. */
function splitName(full: string): { first?: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { last: parts[0] };
  return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] };
}

export async function createCrmLead(
  input: CrmLeadInput,
): Promise<{ ok: boolean; id?: string; skipped?: boolean; error?: string }> {
  if (!configured()) {
    if (!warned) {
      console.warn("Zoho CRM not configured; website leads are logged to Postgres only.");
      warned = true;
    }
    return { ok: false, skipped: true };
  }
  try {
    const token = await accessToken();
    const api = process.env.ZOHO_API_URL || "https://www.zohoapis.com";
    const { first, last } = splitName(input.name || "Website enquiry");

    const lines = [
      input.message?.trim() || "",
      "",
      `Channel: ${input.channel}`,
      input.role ? `Role: ${input.role}` : "",
      input.emirate ? `Emirate: ${input.emirate}` : "",
      input.product ? `Product: ${input.product}` : "",
      input.brand ? `Brand: ${input.brand}` : "",
      input.pageUrl ? `Page: ${input.pageUrl}` : "",
    ].filter((l, i) => l !== "" || i === 1);

    const record: Record<string, unknown> = {
      Last_Name: last,
      First_Name: first,
      Company: input.company?.trim() || input.name.trim(),
      Email: input.email || undefined,
      Phone: input.phone || undefined,
      Designation: input.role || undefined,
      Lead_Source: process.env.ZOHO_LEAD_SOURCE || "Website",
      Description: lines.join("\n").trim(),
    };
    for (const k of Object.keys(record)) if (record[k] === undefined) delete record[k];

    const res = await fetch(`${api}/crm/v7/Leads`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [record], trigger: ["workflow"] }),
    });
    const json = (await res.json()) as {
      data?: { code: string; details?: { id?: string }; message?: string }[];
    };
    const row = json.data?.[0];
    if (!res.ok || !row || row.code !== "SUCCESS") {
      const msg = row?.message || `HTTP ${res.status}`;
      console.error("Zoho CRM lead not created:", msg, JSON.stringify(json).slice(0, 500));
      return { ok: false, error: msg };
    }
    return { ok: true, id: row.details?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Zoho CRM error:", msg);
    return { ok: false, error: msg };
  }
}
