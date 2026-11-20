/**
 * One place every lead signal goes through.
 *
 * `trackLead` writes a row to /api/leads/log and pushes the same facts to the
 * GTM dataLayer, with keepalive so a click that leaves the page still lands.
 * Nothing here may throw into the caller: an enquiry must never be blocked by
 * its own measurement.
 *
 * Page context (which product, which brand) is read from `data-lb-product` and
 * `data-lb-brand` on the nearest ancestor, falling back to the page's <main>,
 * so a component deep in a product page need not be told what page it is on.
 */
import type { LeadSource } from "@/lib/leads";

export interface TrackExtra {
  product?: string;
  brand?: string;
  buttonLocation?: string;
  targetHref?: string;
  message?: string;
  company?: string;
  role?: string;
  emirate?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const isBrowser = () => typeof window !== "undefined";

/** Where the click happened, from the path, for the location column. */
export function locationFromPath(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname === "/quote") return "quote_list";
  if (pathname === "/contact") return "contact";
  if (pathname.startsWith("/blog/")) return "guide";
  if (pathname.startsWith("/tools/")) return "tools";
  if (/^\/brands\/[^/]+\/[^/]+\/[^/]+$/.test(pathname)) return "tds_page";
  if (/^\/brands\/[^/]+\/[^/]+$/.test(pathname)) return "line_page";
  if (/^\/brands\/[^/]+$/.test(pathname)) return "brand_page";
  if (/-dubai$/.test(pathname)) return "hub_page";
  return pathname.replace(/^\//, "").replace(/\//g, "_") || "page";
}

export function pageContext(from?: Element | null): { product?: string; brand?: string } {
  if (!isBrowser()) return {};
  const el =
    (from?.closest("[data-lb-product],[data-lb-brand]") as HTMLElement | null) ??
    (document.querySelector("[data-lb-product],[data-lb-brand]") as HTMLElement | null);
  return {
    product: el?.dataset.lbProduct || undefined,
    brand: el?.dataset.lbBrand || undefined,
  };
}

export function trackLead(source: LeadSource, extra: TrackExtra = {}, from?: Element | null): void {
  if (!isBrowser()) return;
  try {
    const ctx = pageContext(from);
    const params = new URLSearchParams(window.location.search);
    const payload = {
      source,
      pageUrl: window.location.href,
      buttonLocation: extra.buttonLocation ?? locationFromPath(window.location.pathname),
      product: extra.product ?? ctx.product,
      brand: extra.brand ?? ctx.brand,
      targetHref: extra.targetHref,
      message: extra.message,
      company: extra.company,
      role: extra.role,
      emirate: extra.emirate,
      name: extra.name,
      email: extra.email,
      phone: extra.phone,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };

    fetch("/api/leads/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify(payload),
    }).catch(() => {});

    const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    // The two original event names stay exactly as they were, because the Ads
    // conversions in GTM are keyed on them. Everything else reports as itself.
    const event =
      source === "whatsapp_click" || source === "tds_whatsapp_click" ? "whatsapp_click" : source;
    w.dataLayer.push({
      event,
      lead_source: source,
      contact_method: event === "whatsapp_click" ? "whatsapp" : undefined,
      button_location: payload.buttonLocation,
      product: payload.product,
      brand: payload.brand,
      target_href: payload.targetHref,
    });
  } catch {
    // measurement never blocks the enquiry
  }
}
