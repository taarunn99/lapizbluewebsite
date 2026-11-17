import type { ManifestRecord } from '@/lib/tds';
import { coverageRange, packFigure } from '@/lib/tds';
import { calcConfig, headlineRate } from '@/lib/calculator';

/**
 * The figures a specifier checks first, directly under the product.
 *
 * A description list rather than a table, because these are name and value
 * pairs and not a grid of data: the label column is a fixed 8.5rem so every
 * value starts on the same vertical line on every product page, which is what
 * makes two pages comparable at a glance.
 *
 * A row is omitted when the data sheet does not state it, rather than shown
 * empty or filled with a dash. Four honest figures beat six padded ones, and
 * the missing ones are tracked in the gap report instead.
 */
export function KeySpecsBar({ rec }: { rec: ManifestRecord }) {
  const pack = packFigure(rec);
  const headline = headlineRate(calcConfig(rec.brand, rec.slug) ?? { model: 'none', reason: '' });
  const coverage = coverageRange(rec);

  const rows: { label: string; value: string }[] = [];

  if (rec.classification) rows.push({ label: 'Class', value: rec.classification });

  // The same figure the calculator further down the page works from, spanning
  // the whole published table rather than its cheapest row.
  if (headline) {
    rows.push(headline);
  } else if (coverage) {
    rows.push({ label: 'Coverage', value: `${coverage} kg/m²` });
  }

  if (pack) rows.push({ label: 'Pack we stock', value: `${pack.value} ${pack.unit}` });
  else if (rec.specs.pack_size) rows.push({ label: 'Pack we stock', value: rec.specs.pack_size });

  if (rec.specs.colours) rows.push({ label: 'Colour', value: rec.specs.colours });
  else if (rec.specs.thickness) rows.push({ label: 'Thickness', value: rec.specs.thickness });
  else if (rec.specs.components) rows.push({ label: 'Supplied', value: rec.specs.components });

  if (rows.length === 0) return null;

  return (
    <dl className="mt-10 border-t border-[#161925]/15" aria-label="Key specification">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[7rem_1fr] sm:grid-cols-[8.5rem_1fr] items-baseline gap-4 border-b border-[#161925]/15 py-3.5"
        >
          <dt className="label-sh text-[#161925]/70">{row.label}</dt>
          {/* min-w-0 as well as break-words: a grid item defaults to a minimum
              of its longest unbreakable run, so a value like
              "transparent/opalescent" widens the track and pushes the page
              sideways before the wrapping rule ever gets a say. */}
          <dd className="spec-sh min-w-0 break-words text-[#161925]">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
