/**
 * Check that each resolved sheet really is the product we think it is.
 *
 * The slugs came from fuzzy matching our stock list against Mapei's own
 * catalogue, which is a good guess and no more. "Mapegrout Rapido" matched
 * mapegrout-rapid, "Eco Prim PU 1K Turbo" matched ec-prim-pu-1k-turbo, and
 * both look right; "Quartz" matched four different grain sizes and one of
 * them is wrong. The only thing that settles it is the name printed on page
 * one of the sheet, which is what the site's own registrar gate reads.
 *
 *   npx tsx scripts/verify-resolved.ts <resolved.json ...> <out.json>
 */
import fs from 'node:fs';
import { getDocumentProxy, extractText } from 'unpdf';
import { verifyNameInPageText } from './lib/verify';
import { fixLigatures } from './lib/spec-maps';

const args = process.argv.slice(2);
const OUT = args.pop()!;
const rows = args.flatMap((f) => JSON.parse(fs.readFileSync(f, 'utf8')) as Record<string, unknown>[]);

const out: Record<string, unknown>[] = [];
let n = 0;

async function main() {
for (const r of rows) {
  const hit = r.hit as { sheet: string; slug: string; region: string } | null;
  n += 1;
  if (!hit) {
    out.push({ ...r, verdict: 'no sheet anywhere' });
    continue;
  }
  let page1 = '';
  try {
    const res = await fetch(hit.sheet, { signal: AbortSignal.timeout(40000) });
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.subarray(0, 4).toString() !== '%PDF') throw new Error('not a PDF');
    const pdf = await getDocumentProxy(new Uint8Array(buf));
    const { text } = await extractText(pdf, { mergePages: false });
    page1 = fixLigatures(Array.isArray(text) ? text[0] : String(text));
  } catch (e) {
    out.push({ ...r, verdict: 'could not read', error: (e as Error).message });
    console.log(`${String(n).padStart(3)}  ERROR  ${String(r.name).slice(0, 36)}`);
    continue;
  }

  const name = String(r.name);
  const check = verifyNameInPageText(name, page1);
  // The printed title, for a human to read when the score is low.
  const title = page1.split('\n').map((l) => l.trim()).filter(Boolean).slice(0, 4).join(' ').slice(0, 70);
  const verdict =
    check.score >= 90 && !check.suffixTrap
      ? 'confirmed'
      : check.suffixTrap
        ? 'variant suffix, needs a person'
        : check.score >= 60
          ? 'close, needs a person'
          : 'wrong product';
  out.push({ ...r, score: check.score, printed: title, verdict });
  console.log(
    `${String(n).padStart(3)}  ${verdict.padEnd(28)} ${String(check.score).padStart(3)}  ${name.slice(0, 32).padEnd(32)} ${hit.slug}`,
  );
  fs.writeFileSync(OUT, `${JSON.stringify(out, null, 1)}\n`);
}

fs.writeFileSync(OUT, `${JSON.stringify(out, null, 1)}\n`);
const by = out.reduce<Record<string, number>>((a, r) => {
  a[String(r.verdict)] = (a[String(r.verdict)] ?? 0) + 1;
  return a;
}, {});
console.log('\n', by);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
