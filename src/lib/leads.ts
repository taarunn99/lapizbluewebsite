// src/lib/leads.ts
import { sql } from "@vercel/postgres";

/**
 * Every way an enquiry can start on this site.
 *
 * The first two are the original pair. The rest were added in November 2026
 * because the project shaped paths (a data sheet download, a BOQ clause copied,
 * a quote list sent) were firing nothing, so the lead mix looked more retail
 * than it was. A row here is a signal of intent, not a person: most rows carry
 * no name, and that is fine.
 */
export const LEAD_SOURCES = [
  "contact_form",
  "rfq_form",
  "trade_account_form",
  "whatsapp_click",
  "tds_whatsapp_click",
  "quote_list_send",
  "tds_download",
  "sds_download",
  "document_request",
  "boq_copy",
  "boq_download",
  "calculator_use",
  "phone_click",
  "email_click",
  "profile_download",
  "certificate_download",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export const isLeadSource = (v: unknown): v is LeadSource =>
  typeof v === "string" && (LEAD_SOURCES as readonly string[]).includes(v);

export interface LeadData {
  source: LeadSource;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  country?: string;
  pageUrl?: string;
  /** Product and brand the click was about, where the page knows them. */
  product?: string;
  brand?: string;
  /** Who is asking, when a form collected it. This is what the lead mix is measured on. */
  company?: string;
  role?: string;
  emirate?: string;
  /** Where on the page the click happened: floating, tds_page, brand_page, quote_list. */
  buttonLocation?: string;
  /** The href that was followed, for downloads and WhatsApp deep links. */
  targetHref?: string;
}

/**
 * Create the table if it is missing, and add the columns the first version did
 * not have. Both are idempotent, so this is safe to run on every cold start.
 */
export async function initLeadsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW(),
        source VARCHAR(50) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        message TEXT,
        ip_address VARCHAR(50),
        user_agent TEXT,
        referrer TEXT,
        utm_source VARCHAR(100),
        utm_medium VARCHAR(100),
        utm_campaign VARCHAR(100),
        country VARCHAR(10),
        page_url TEXT
      )
    `;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS product VARCHAR(255)`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS brand VARCHAR(100)`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS company VARCHAR(255)`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS role VARCHAR(100)`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS emirate VARCHAR(50)`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS button_location VARCHAR(50)`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS target_href TEXT`;
    return { success: true };
  } catch (error) {
    console.error("Failed to initialize leads table:", error);
    return { success: false, error };
  }
}

const clip = (v: string | undefined, max: number) =>
  v == null || v === "" ? null : String(v).slice(0, max);

/**
 * Log a lead to the database
 */
export async function logLead(data: LeadData): Promise<{ success: boolean; id?: number; error?: unknown }> {
  try {
    const result = await sql`
      INSERT INTO leads (
        source, name, email, phone, message,
        ip_address, user_agent, referrer,
        utm_source, utm_medium, utm_campaign,
        country, page_url,
        product, brand, company, role, emirate, button_location, target_href
      ) VALUES (
        ${data.source},
        ${clip(data.name, 255)},
        ${clip(data.email, 255)},
        ${clip(data.phone, 50)},
        ${clip(data.message, 8000)},
        ${clip(data.ipAddress, 50)},
        ${clip(data.userAgent, 1000)},
        ${clip(data.referrer, 2000)},
        ${clip(data.utmSource, 100)},
        ${clip(data.utmMedium, 100)},
        ${clip(data.utmCampaign, 100)},
        ${clip(data.country, 10)},
        ${clip(data.pageUrl, 2000)},
        ${clip(data.product, 255)},
        ${clip(data.brand, 100)},
        ${clip(data.company, 255)},
        ${clip(data.role, 100)},
        ${clip(data.emirate, 50)},
        ${clip(data.buttonLocation, 50)},
        ${clip(data.targetHref, 2000)}
      )
      RETURNING id
    `;
    return { success: true, id: result.rows[0]?.id };
  } catch (error) {
    console.error("Failed to log lead:", error);
    return { success: false, error };
  }
}

/**
 * Get lead statistics by source
 */
export async function getLeadStats() {
  try {
    const result = await sql`
      SELECT
        source,
        COUNT(*) as count,
        DATE(created_at) as date
      FROM leads
      GROUP BY source, DATE(created_at)
      ORDER BY date DESC
      LIMIT 100
    `;
    return { success: true, stats: result.rows };
  } catch (error) {
    console.error("Failed to get lead stats:", error);
    return { success: false, error };
  }
}
