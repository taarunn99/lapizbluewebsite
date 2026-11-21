// Compare every live page's <title> and meta description against the local build.
// Usage: node scripts/title-diff.mjs [limit]
const LIVE = 'https://www.lapizblue.com';
const LOCAL = process.env.LOCAL || 'http://localhost:3210';
const limit = Number(process.argv[2] || 0);

const get = async (u) => { try { const r = await fetch(u, { headers: { 'user-agent': 'lapiz-title-diff' } }); if (!r.ok) return { status: r.status }; const h = await r.text(); return { status: 200, title: (h.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim(), desc: (h.match(/<meta name="description" content="([^"]*)"/) || [])[1]?.trim() }; } catch (e) { return { error: String(e).slice(0, 60) }; } };

const sm = await (await fetch(`${LIVE}/sitemap.xml`)).text();
let urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.some((u) => u.endsWith('.xml'))) {
  const parts = urls.filter((u) => u.endsWith('.xml'));
  urls = urls.filter((u) => !u.endsWith('.xml'));
  for (const p of parts) { const t = await (await fetch(p)).text(); urls.push(...[...t.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])); }
}
urls = [...new Set(urls)];
if (limit) urls = urls.slice(0, limit);
console.log(`checking ${urls.length} live URLs`);

const diffs = []; const missing = []; let done = 0;
const queue = [...urls];
await Promise.all(Array.from({ length: 12 }, async () => {
  while (queue.length) {
    const u = queue.shift();
    const path = new URL(u).pathname;
    const [a, b] = await Promise.all([get(u), get(LOCAL + path)]);
    done++;
    if (done % 100 === 0) console.log(`  ${done}/${urls.length}`);
    if (a.status !== 200) continue;
    if (b.status !== 200) { missing.push(`${path} local ${b.status || b.error}`); continue; }
    if (a.title !== b.title) diffs.push(`TITLE ${path}\n   live:  ${a.title}\n   local: ${b.title}`);
    if (a.desc !== b.desc) diffs.push(`DESC  ${path}\n   live:  ${a.desc}\n   local: ${b.desc}`);
  }
}));
console.log(`\n${diffs.length} title or description differences, ${missing.length} pages missing locally`);
for (const d of diffs.slice(0, 40)) console.log(d);
for (const m of missing.slice(0, 20)) console.log(m);
