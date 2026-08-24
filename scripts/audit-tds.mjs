/*
  Post-build release gate for TDS product pages, in the style of
  audit-alts.mjs. For every prerendered TDS page: exactly one h1, zero em or
  en dashes, zero "Grani Marmo", every ld+json block parses with the expected
  types, and the TDS download href points at a file that exists in public/.
  Site-wide, the h1 and dash checks run report-only on non TDS pages so legacy
  pages cannot block a deploy before their own cleanup pass.

  Usage: node scripts/audit-tds.mjs
*/
import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), '.next', 'server', 'app');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const manifest = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data', 'manifest.json'), 'utf8')
);
const shippable = manifest.filter(
  (r) =>
    (r.page_status === 'generated' || r.page_status === 'live') &&
    r.tds.status === 'verified'
);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

if (!fs.existsSync(APP_DIR)) {
  console.error('No prerendered HTML found. Run npm run build first.');
  process.exit(1);
}

const htmlFiles = walk(APP_DIR).filter(
  (f) => !f.includes('_global-error') && !f.includes('_not-found')
);

const tdsPages = new Set(
  shippable.map((r) =>
    path.join(APP_DIR, 'brands', r.brand, r.product_line, `${r.slug}.html`)
  )
);

let hardFailures = 0;
let reportOnly = 0;

for (const rec of shippable) {
  const pagePath = path.join(
    APP_DIR, 'brands', rec.brand, rec.product_line, `${rec.slug}.html`
  );
  if (!fs.existsSync(pagePath)) {
    console.error(`FAIL ${rec.slug}: page not prerendered at ${pagePath}`);
    hardFailures++;
    continue;
  }
  const html = fs.readFileSync(pagePath, 'utf8');
  const rel = path.relative(APP_DIR, pagePath);

  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) {
    console.error(`FAIL ${rel}: ${h1Count} h1 elements (must be exactly 1)`);
    hardFailures++;
  }
  if (/[–—]/.test(html)) {
    console.error(`FAIL ${rel}: contains em or en dashes`);
    hardFailures++;
  }
  if (/grani\s*marmo/i.test(html)) {
    console.error(`FAIL ${rel}: mentions Grani Marmo`);
    hardFailures++;
  }

  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const types = [];
  for (const block of ldBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      types.push(parsed['@type']);
    } catch {
      console.error(`FAIL ${rel}: ld+json block does not parse`);
      hardFailures++;
    }
  }
  for (const required of ['BreadcrumbList', 'Product']) {
    if (!types.includes(required)) {
      console.error(`FAIL ${rel}: missing ${required} schema (found: ${types.join(', ')})`);
      hardFailures++;
    }
  }

  const pdfPath = path.join(PUBLIC_DIR, rec.tds.local_path.replace(/^\//, ''));
  if (!html.includes(`href="${rec.tds.local_path}"`)) {
    console.error(`FAIL ${rel}: TDS download link ${rec.tds.local_path} not in HTML`);
    hardFailures++;
  }
  if (!fs.existsSync(pdfPath)) {
    console.error(`FAIL ${rel}: hosted PDF missing at ${pdfPath}`);
    hardFailures++;
  }
}

for (const file of htmlFiles) {
  if (tdsPages.has(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(APP_DIR, file);
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) {
    console.warn(`report-only ${rel}: ${h1Count} h1 elements`);
    reportOnly++;
  }
  if (/[–—]/.test(html)) {
    console.warn(`report-only ${rel}: em or en dashes present`);
    reportOnly++;
  }
  if (/grani\s*marmo/i.test(html)) {
    console.warn(`report-only ${rel}: Grani Marmo mention`);
    reportOnly++;
  }
}

console.log(
  `\nTDS audit: ${shippable.length} pages checked, ${hardFailures} hard failures, ${reportOnly} report-only notes on legacy pages.`
);
process.exit(hardFailures > 0 ? 1 : 0);
