// Compare the <title> and meta description of every page in the local build
// against the live site, for every URL that exists on both.
// Usage: node scripts/title-diff.mjs [limit]
const LIVE = process.env.LIVE || 'https://www.lapizblue.com';
const LOCAL = process.env.LOCAL || 'http://localhost:3210';
const limit = Number(process.argv[2] || 0);

async function get(u) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const r = await fetch(u, { headers: { 'user-agent': 'lapiz-title-diff' } });
      if (r.status === 404) return { status: 404 };
      if (!r.ok) { if (attempt) return { status: r.status }; continue; }
      const h = await r.text();
      return {
        status: 200,
        title: (h.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim(),
        desc: (h.match(/<meta name="description" content="([^"]*)"/) || [])[1]?.trim(),
      };
    } catch (e) { if (attempt) return { error: String(e).slice(0, 60) }; }
  }
  return { error: 'retry failed' };
}

async function urlsFrom(origin) {
  const seen = new Set();
  const out = [];
  const queue = [`${origin}/sitemap.xml`, `${origin}/sitemaps.xml`];
  while (queue.length) {
    const sm = queue.shift();
    let text = '';
    try { const r = await fetch(sm); if (!r.ok) continue; text = await r.text(); } catch { continue; }
    for (const m of text.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const u = m[1];
      if (seen.has(u)) continue;
      seen.add(u);
      if (u.endsWith('.xml')) queue.push(u); else out.push(u);
    }
  }
  return out;
}

let urls = await urlsFrom(LOCAL);
if (limit) urls = urls.slice(0, limit);
console.log(`checking ${urls.length} URLs from the local sitemaps against ${LIVE}`);

const diffs = []; const onlyLocal = []; let done = 0;
const queue = [...urls];
await Promise.all(Array.from({ length: 12 }, async () => {
  while (queue.length) {
    const u = queue.shift();
    const path = new URL(u).pathname;
    const [live, local] = await Promise.all([get(LIVE + path), get(LOCAL + path)]);
    done++;
    if (done % 150 === 0) console.log(`  ${done}/${urls.length}`);
    if (live.status === 404 || live.error) { onlyLocal.push(path); continue; }
    if (live.status !== 200 || local.status !== 200) continue;
    if (live.title !== local.title) diffs.push(`TITLE ${path}\n   live:  ${live.title}\n   local: ${local.title}`);
    if (live.desc !== local.desc) diffs.push(`DESC  ${path}\n   live:  ${live.desc}\n   local: ${local.desc}`);
  }
}));
console.log(`\n${diffs.length} differences on pages that exist live, ${onlyLocal.length} pages are new (not live yet)`);
for (const d of diffs.slice(0, 60)) console.log(d);
