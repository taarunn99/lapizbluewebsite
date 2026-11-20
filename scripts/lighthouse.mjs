/*
  Lighthouse, mobile and desktop, on the pages that matter, through an HTTP/2
  proxy so the numbers are what Vercel serves and not what `next start` does
  over HTTP/1.1.

  Expects a fresh `next start -p 3210` (kill the old one after every build; a
  stale one serves CSS as 404 and scores an unstyled page). Uses Playwright's
  Chromium headless shell. Fails if accessibility, best practices or SEO are
  under 100 on any page, or if performance drops below the recorded floor in
  lighthouse-baseline.json. `--baseline` rewrites that file.

  Usage: node scripts/lighthouse.mjs [--baseline] [--only /path,/path]
*/
import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http2 from 'node:http2';
import http from 'node:http';

const root = process.cwd();
const args = process.argv.slice(2);
const writeBaseline = args.includes('--baseline');
const onlyArg = args[args.indexOf('--only') + 1];
const PAGES = (args.includes('--only') && onlyArg ? onlyArg.split(',') : [
  '/', '/brands', '/brands/mapei', '/brands/kerakoll', '/brands/weber/sealants', '/trade-account', '/credentials', '/contact',
  '/blog', '/brands/mapei/tile-adhesives-and-grouts/kerabond-t',
]);
const UPSTREAM = process.env.UPSTREAM || 'http://localhost:3210';
const PORT = 3443;
const baselinePath = path.join(root, 'lighthouse-baseline.json');

// Chrome: Playwright's headless shell.
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  const dirs = fs.existsSync(cache) ? fs.readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell') || d.startsWith('chromium-')) : [];
  for (const d of dirs.sort().reverse()) {
    const candidates = [
      path.join(cache, d, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'),
      path.join(cache, d, 'chrome-headless-shell-mac/chrome-headless-shell'),
      path.join(cache, d, 'chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium'),
      path.join(cache, d, 'chrome-mac/Chromium.app/Contents/MacOS/Chromium'),
    ];
    for (const c of candidates) if (fs.existsSync(c)) return c;
  }
  throw new Error('No Chromium found; set CHROME_PATH');
}

// Self signed cert for the proxy, made once in the OS temp dir.
function cert() {
  const dir = path.join(os.tmpdir(), 'lapiz-lh');
  fs.mkdirSync(dir, { recursive: true });
  const key = path.join(dir, 'key.pem'), crt = path.join(dir, 'cert.pem');
  if (!fs.existsSync(key) || !fs.existsSync(crt)) {
    execSync(`openssl req -x509 -newkey rsa:2048 -nodes -keyout "${key}" -out "${crt}" -days 365 -subj "/CN=localhost" 2>/dev/null`);
  }
  return { key: fs.readFileSync(key), cert: fs.readFileSync(crt) };
}

// HTTP/2 reverse proxy. Hardened: every stream and session error is caught.
function startProxy() {
  const up = new URL(UPSTREAM);
  const server = http2.createSecureServer({ ...cert(), allowHTTP1: true });
  server.on('error', (e) => console.error('proxy error', e.message));
  server.on('session', (s) => s.on('error', () => {}));
  server.on('stream', (stream, headers) => {
    stream.on('error', () => {});
    const req = http.request(
      { hostname: up.hostname, port: up.port, path: headers[':path'], method: headers[':method'], headers: { host: `${up.hostname}:${up.port}`, 'accept-encoding': headers['accept-encoding'] || 'gzip, br', accept: headers.accept || '*/*', 'user-agent': headers['user-agent'] || 'lighthouse' } },
      (res) => {
        const h = { ':status': res.statusCode };
        for (const [k, v] of Object.entries(res.headers)) if (!['connection', 'transfer-encoding', 'keep-alive'].includes(k)) h[k] = v;
        try { stream.respond(h); } catch { return; }
        res.on('error', () => {});
        res.pipe(stream);
      },
    );
    req.on('error', () => { try { stream.respond({ ':status': 502 }); stream.end(); } catch {} });
    stream.pipe(req);
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, () => resolve(server));
  });
}

function runLighthouse(url, preset, chrome) {
  return new Promise((resolve, reject) => {
    const out = path.join(os.tmpdir(), `lh-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
    const a = ['-y', 'lighthouse@latest', url, '--output=json', `--output-path=${out}`, '--quiet',
      '--chrome-flags=--headless=new --no-sandbox --ignore-certificate-errors --disable-gpu',
      '--only-categories=performance,accessibility,best-practices,seo'];
    if (preset === 'desktop') a.push('--preset=desktop');
    const p = spawn('npx', a, { env: { ...process.env, CHROME_PATH: chrome }, stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (code) => {
      if (code !== 0 || !fs.existsSync(out)) return reject(new Error(`lighthouse failed for ${url} (${preset}): ${err.slice(-400)}`));
      const j = JSON.parse(fs.readFileSync(out, 'utf8'));
      fs.unlinkSync(out);
      const c = j.categories;
      resolve({
        performance: Math.round(c.performance.score * 100),
        accessibility: Math.round(c.accessibility.score * 100),
        bestPractices: Math.round(c['best-practices'].score * 100),
        seo: Math.round(c.seo.score * 100),
        lcp: Math.round(j.audits['largest-contentful-paint'].numericValue),
        cls: Number(j.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
        tbt: Math.round(j.audits['total-blocking-time'].numericValue),
        failing: Object.values(j.audits).filter((x) => x.score !== null && x.score < 1 && x.scoreDisplayMode === 'binary' && ['accessibility', 'best-practices', 'seo'].some((cat) => c[cat].auditRefs.some((r) => r.id === x.id))).map((x) => x.id),
      });
    });
  });
}

const chrome = findChrome();
// A stale server serves stylesheets as 404 and Lighthouse scores an unstyled page; refuse to run in that state.
const html = await (await fetch(`${UPSTREAM}/`)).text();
const css = html.match(/href="(\/_next\/static\/[^"]+\.css)"/)?.[1];
if (css) {
  const r = await fetch(`${UPSTREAM}${css}`);
  if (r.status !== 200 || !/text\/css/.test(r.headers.get('content-type') || '')) throw new Error('CSS chunk is not served; restart next start after the build');
}

const baseline = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')) : {};
const results = {};
let bad = 0;
for (const page of PAGES) {
  results[page] = {};
  for (const preset of ['mobile', 'desktop']) {
    // The proxy does not survive a second Lighthouse session: new one per run.
    const proxy = await startProxy();
    try {
      const r = await runLighthouse(`https://localhost:${PORT}${page}`, preset, chrome);
      results[page][preset] = r;
      const floor = baseline[page]?.[preset]?.performance;
      const perfDrop = floor != null && r.performance < floor;
      const notPerfect = r.accessibility < 100 || r.bestPractices < 100 || r.seo < 100;
      if (notPerfect || perfDrop) bad++;
      console.log(`${preset.padEnd(7)} ${page.padEnd(52)} perf ${String(r.performance).padStart(3)}${floor != null ? ` (floor ${floor})` : ''}  a11y ${r.accessibility}  bp ${r.bestPractices}  seo ${r.seo}  LCP ${r.lcp}ms CLS ${r.cls} TBT ${r.tbt}ms${r.failing.length ? '  failing: ' + r.failing.join(', ') : ''}${perfDrop ? '  PERF DROP' : ''}`);
    } finally {
      await new Promise((res) => proxy.close(() => res()));
    }
  }
}
if (writeBaseline) {
  const slim = {};
  for (const [p, v] of Object.entries(results)) slim[p] = { mobile: { performance: v.mobile.performance }, desktop: { performance: v.desktop.performance } };
  fs.writeFileSync(baselinePath, JSON.stringify({ captured: new Date().toISOString(), ...slim }, null, 2) + '\n');
  console.log(`\nbaseline written for ${PAGES.length} pages`);
}
if (bad) {
  console.error(`\n${bad} run(s) below target`);
  process.exit(1);
}
console.log('\nevery page at 100 on accessibility, best practices and SEO; performance at or above the floor');
