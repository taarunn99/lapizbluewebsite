#!/usr/bin/env node
// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam,
// Naver all share the endpoint). Run after each deploy that adds or changes
// pages: npm run indexnow
//
// The key file must be live at https://www.lapizblue.com/<KEY>.txt before
// this succeeds - it ships from public/ in this repo.

const HOST = "www.lapizblue.com";
const KEY = "f717b65d81fbbe861daf74901af4e3d5";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;

const keyRes = await fetch(KEY_LOCATION);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`Key file not live yet at ${KEY_LOCATION} (status ${keyRes.status}). Deploy first, then re-run.`);
  process.exit(1);
}

const sitemapRes = await fetch(SITEMAP);
if (!sitemapRes.ok) {
  console.error(`Could not fetch sitemap (status ${sitemapRes.status})`);
  process.exit(1);
}
const xml = await sitemapRes.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (urls.length === 0) {
  console.error("No URLs found in sitemap");
  process.exit(1);
}

// Also expand the per brand TDS sitemap index at /sitemaps.xml, if deployed.
const indexRes = await fetch(`https://${HOST}/sitemaps.xml`);
if (indexRes.ok) {
  const indexXml = await indexRes.text();
  const segments = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  for (const segment of segments) {
    const segRes = await fetch(segment);
    if (!segRes.ok) continue;
    const segXml = await segRes.text();
    for (const m of segXml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const url = m[1].trim();
      if (!urls.includes(url)) urls.push(url);
    }
  }
}
console.log(`Submitting ${urls.length} URLs from ${SITEMAP} plus TDS segments`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }),
});

console.log(`IndexNow response: ${res.status} ${res.statusText}`);
if (res.status === 200 || res.status === 202) {
  console.log("Submitted successfully. Bing picks these up within hours to a few days.");
} else {
  console.error(await res.text());
  process.exit(1);
}
