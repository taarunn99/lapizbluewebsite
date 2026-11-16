import type { ManifestRecord } from '@/lib/tds';
import { coverageRange, packFigure, consumptionModel } from '@/lib/tds';

/**
 * The four figures a specifier checks first, on one bar directly under the
 * product name: what class it is, how much it covers, what it comes in, and
 * what colours it is made in.
 *
 * A cell is omitted when the data sheet does not state it, rather than shown
 * empty or filled with a dash. Fewer honest figures beat four padded ones.
 */
export function KeySpecsBar({ rec }: { rec: ManifestRecord }) {
  const pack = packFigure(rec);
  const model = consumptionModel(rec);
  const coverage = coverageRange(rec);

  const cells: { label: string; value: string; unit?: string }[] = [];

  if (rec.classification) cells.push({ label: 'Class', value: rec.classification });

  if (model) {
    const range = model.max > model.min ? `${model.min.toFixed(1)} to ${model.max.toFixed(1)}` : model.min.toFixed(2).replace(/0$/, '');
    cells.push({
      label: 'Consumption',
      value: range,
      unit: model.unit === 'litre' ? (model.kind === 'per_mm' ? 'L/m² per mm' : 'L/m²') : model.kind === 'per_mm' ? 'kg/m² per mm' : 'kg/m²',
    });
  } else if (coverage) {
    cells.push({ label: 'Coverage', value: coverage, unit: 'kg/m²' });
  }

  if (pack) cells.push({ label: 'Pack', value: pack.value, unit: pack.unit });
  else if (rec.specs.pack_size) cells.push({ label: 'Pack', value: rec.specs.pack_size });

  if (rec.specs.colours) cells.push({ label: 'Colour', value: rec.specs.colours });
  else if (rec.specs.thickness) cells.push({ label: 'Thickness', value: rec.specs.thickness });
  else if (rec.specs.components) cells.push({ label: 'Supplied', value: rec.specs.components });

  if (cells.length === 0) return null;

  return (
    <dl
      className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#161925]/12 border-y border-[#161925]/12"
      aria-label="Key specification"
    >
      {cells.map((c) => (
        <div key={c.label} className="bg-white px-5 py-5 sm:px-6 sm:py-6">
          <dt className="font-manrope text-[11px] uppercase tracking-[0.18em] text-[#161925]/50">
            {c.label}
          </dt>
          {/* break-words because a pack size can be one unbroken token, and
              "15CMX20MT" at this size is wider than a half width cell on a
              320px screen, which pushed the whole page sideways. */}
          <dd className="mt-2 font-outfit font-bold text-[#161925] leading-none text-2xl sm:text-3xl tabular-nums break-words">
            {c.value}
            {c.unit ? (
              <span className="ml-1.5 font-manrope text-sm font-semibold text-[#161925]/55 tracking-normal">
                {c.unit}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
