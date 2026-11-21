/* Prints runtime errors on a 3D bench page. Usage: node scripts/bench-errors.mjs <url> */
import { chromium } from 'playwright';
const url = process.argv[2];
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1300, height: 1000 } });
const errs = [];
p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message + '\n' + (e.stack || '').split('\n').slice(0, 4).join('\n')));
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 400)); });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(3000);
const ready = await p.$eval('[data-ready]', (e) => e.dataset.ready).catch(() => 'no data-ready element');
console.log('ready:', ready);
console.log(errs.join('\n') || 'no errors');
await b.close();
