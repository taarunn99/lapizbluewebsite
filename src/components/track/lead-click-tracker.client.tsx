"use client";

import { useEffect } from "react";
import type { LeadSource } from "@/lib/leads";
import { trackLead } from "@/lib/track";

/**
 * Logs every lead shaped click on the site from one listener in the layout.
 *
 * WhatsApp deep links, phone and email links, data sheet and certificate
 * downloads: thirty odd anchors across server rendered pages, none of which
 * can carry an onClick of their own. Rather than wrap each one in a client
 * component, one delegated listener reads the href on the way out and decides
 * what it was. Anchors that already report themselves set data-lb-tracked so
 * they are not counted twice.
 */
function classify(a: HTMLAnchorElement): { source: LeadSource; buttonLocation?: string } | null {
  const href = a.getAttribute("href") || "";
  const path = window.location.pathname;

  if (/^(https?:)?\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href) || /^whatsapp:/i.test(href)) {
    if (path === "/quote") return { source: "quote_list_send", buttonLocation: "quote_list" };
    if (/^\/brands\/[^/]+\/[^/]+\/[^/]+$/.test(path)) {
      // Requests for a sheet we do not host are their own thing.
      if (/data sheet|submittal/i.test(decodeURIComponent(href))) return { source: "document_request" };
      return { source: "tds_whatsapp_click" };
    }
    return { source: "whatsapp_click" };
  }
  if (/^tel:/i.test(href)) return { source: "phone_click" };
  if (/^mailto:/i.test(href)) {
    if (path === "/quote") return { source: "quote_list_send", buttonLocation: "quote_list_email" };
    return { source: "email_click" };
  }
  if (/^\/tds\/.+\.pdf$/i.test(href)) return { source: "tds_download" };
  if (/^\/sds\/.+\.pdf$/i.test(href)) return { source: "sds_download" };
  if (/^\/documents\/lapizblue-company-profile\.pdf$/i.test(href)) return { source: "profile_download" };
  if (/^\/certificates\//i.test(href)) return { source: "certificate_download" };
  return null;
}

export default function LeadClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.dataset.lbTracked === "1") return;
      const hit = classify(a);
      if (!hit) return;
      trackLead(hit.source, { targetHref: a.href, buttonLocation: hit.buttonLocation }, a);
    };
    // Capture phase, so a stopPropagation in a component cannot hide a click.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
