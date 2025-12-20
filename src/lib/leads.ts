// src/lib/leads.ts
import { sql } from "@vercel/postgres";

export type LeadSource = "contact_form" | "whatsapp_click";

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
}

/**
 * Initialize the leads table if it doesn't exist
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
    return { success: true };
  } catch (error) {
    console.error("Failed to initialize leads table:", error);
    return { success: false, error };
  }
}

/**
 * Log a lead to the database
 */
export async function logLead(data: LeadData): Promise<{ success: boolean; id?: number; error?: unknown }> {
  try {
    const result = await sql`
      INSERT INTO leads (
        source,
        name,
        email,
        phone,
        message,
        ip_address,
        user_agent,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        country,
        page_url
      ) VALUES (
        ${data.source},
        ${data.name || null},
        ${data.email || null},
        ${data.phone || null},
        ${data.message || null},
        ${data.ipAddress || null},
        ${data.userAgent || null},
        ${data.referrer || null},
        ${data.utmSource || null},
        ${data.utmMedium || null},
        ${data.utmCampaign || null},
        ${data.country || null},
        ${data.pageUrl || null}
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
