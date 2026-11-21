// Every page on the site with its title, meta description, canonical and H1,
// written to an xlsx the owner can read.
// Usage: node scripts/meta-report.mjs [out.xlsx]
import fs from 'node:fs';
const LOCAL = process.env.LOCAL || 'http://localhost:3210';
const LIVE = process.env.LIVE || 'https://www.lapizblue.com';
const out = process.argv[2] || `${process.env.HOME}/Downloads/lapizblue-meta-report.xlsx`;

const pick = (h, re) => (h.match(re) || [])[1]?.replace(/&amp;/g, '&').replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() || '';
async function page(u) {
  for (let i = 0; i < 2; i++) {
    try {
      const r = await fetch(u, { headers: { 'user-agent': 'lapiz-meta-report' } });
      if (r.status === 404) return { status: 404 };
      if (!r.ok) { if (i) return { status: r.status }; continue; }
      const h = await r.text();
      return {
        status: 200,
        title: pick(h, /<title>([^<]*)<\/title>/),
        desc: pick(h, /<meta name="description" content="([^"]*)"/),
        canonical: pick(h, /<link rel="canonical" href="([^"]*)"/),
        h1: pick(h, /<h1[^>]*>([\s\S]*?)<\/h1>/)?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
        robots: pick(h, /<meta name="robots" content="([^"]*)"/),
      };
    } catch { if (i) return { status: 0 }; }
  }
  return { status: 0 };
}
async function urls(origin) {
  const seen = new Set(); const out = []; const q = [`${origin}/sitemap.xml`, `${origin}/sitemaps.xml`];
  while (q.length) {
    const sm = q.shift(); let t = '';
    try { const r = await fetch(sm); if (!r.ok) continue; t = await r.text(); } catch { continue; }
    for (const m of t.matchAll(/<loc>([^<]+)<\/loc>/g)) { const u = m[1]; if (seen.has(u)) continue; seen.add(u); if (u.endsWith('.xml')) q.push(u); else out.push(u); }
  }
  return out.sort();
}

const list = await urls(LOCAL);
console.log(`reading ${list.length} pages`);
const rows = []; const q = [...list]; let done = 0;
await Promise.all(Array.from({ length: 12 }, async () => {
  while (q.length) {
    const u = q.shift(); const path = new URL(u).pathname;
    const [b, live] = await Promise.all([page(LOCAL + path), page(LIVE + path)]);
    done++; if (done % 150 === 0) console.log(`  ${done}/${list.length}`);
    rows.push({
      path,
      section: path === '/' ? 'home' : path.split('/')[1],
      title: b.title, titleLength: (b.title || '').length,
      description: b.desc, descriptionLength: (b.desc || '').length,
      h1: b.h1, canonical: b.canonical, robots: b.robots,
      live: live.status === 200 ? 'live' : 'new',
      changedFromLive: live.status === 200 && (live.title !== b.title || live.desc !== b.desc) ? 'YES' : '',
      liveTitle: live.status === 200 ? live.title : '',
      liveDescription: live.status === 200 ? live.desc : '',
    });
  }
}));
rows.sort((a, b) => a.path.localeCompare(b.path));
fs.writeFileSync('/tmp/meta-rows.json', JSON.stringify(rows));
console.log(`collected ${rows.length} rows, ${rows.filter((r) => r.changedFromLive).length} changed from live`);
console.log(out);
