#!/usr/bin/env node
// Release gate: scan every prerendered HTML page in .next/server/app for
// <img> tags with a missing or empty alt attribute. Groups offenders by
// image src so fixes target components, not pages. Run after npm run build:
//   node scripts/audit-alts.mjs
// Exit code 1 if any offender is found - keep at 0 before every deploy.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP_DIR = join(ROOT, ".next/server/app");

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = htmlFiles(APP_DIR).filter(
  (f) => !f.includes("_global-error") && !f.includes("_not-found")
);
if (files.length === 0) {
  console.error("No prerendered HTML found - run `npm run build` first.");
  process.exit(1);
}

// src -> { pages: Set, sample: string }
const offenders = new Map();
let totalImgs = 0;

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const page = relative(APP_DIR, file).replace(/\.html$/, "");
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    totalImgs++;
    const tag = m[0];
    const altMatch = tag.match(/\balt=(?:"([^"]*)"|'([^']*)')/i);
    const alt = altMatch ? (altMatch[1] ?? altMatch[2]) : null;
    if (alt === null || alt.trim() === "") {
      const srcMatch = tag.match(/\bsrc=(?:"([^"]*)"|'([^']*)')/i);
      let src = (srcMatch && (srcMatch[1] ?? srcMatch[2])) || "<no src>";
      // normalize next/image optimizer URLs to the underlying asset
      const urlParam = src.match(/[?&]url=([^&]+)/);
      if (urlParam) src = decodeURIComponent(urlParam[1]);
      if (!offenders.has(src)) offenders.set(src, { pages: new Set(), missing: alt === null });
      offenders.get(src).pages.add(page);
    }
  }
}

console.log(`Scanned ${files.length} pages, ${totalImgs} <img> tags.`);
if (offenders.size === 0) {
  console.log("0 offenders - every image has a non-empty alt.");
  process.exit(0);
}

console.log(`\n${offenders.size} offender image(s):\n`);
const sorted = [...offenders.entries()].sort((a, b) => b[1].pages.size - a[1].pages.size);
for (const [src, info] of sorted) {
  const kind = info.missing ? "MISSING alt" : "EMPTY alt";
  console.log(`[${kind}] ${src}`);
  console.log(`  on ${info.pages.size} page(s): ${[...info.pages].slice(0, 5).join(", ")}${info.pages.size > 5 ? ", ..." : ""}\n`);
}
process.exit(1);
