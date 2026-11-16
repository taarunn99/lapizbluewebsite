'use client';

import { useId, useMemo, useState } from 'react';
import type { ConsumptionModel, ManifestRecord } from '@/lib/tds';

interface Props {
  rec: ManifestRecord;
  model: ConsumptionModel;
}

const WHATSAPP = '971502814338';

/**
 * How much to order.
 *
 * Every number shown here is derived from the rate the manufacturer prints in
 * its own data sheet, carried on the record as `specs.coverage`. Nothing is
 * assumed. Where a sheet gives a range, the result is a range, because
 * pretending to a single figure would be a false precision that costs someone
 * a short delivery. Where a sheet gives a rate per millimetre, thickness is
 * asked for rather than guessed.
 *
 * The page only renders this when consumptionModel() found a real rate, so
 * this component never has to invent one.
 */
export function ConsumptionCalculator({ rec, model }: Props) {
  const uid = useId();
  const [area, setArea] = useState('50');
  const [waste, setWaste] = useState('10');
  const [thickness, setThickness] = useState(
    model.thickness ? String(model.thickness.min) : '1',
  );

  const result = useMemo(() => {
    const a = parseFloat(area);
    const w = parseFloat(waste);
    const t = parseFloat(thickness);
    if (!Number.isFinite(a) || a <= 0) return null;
    const wastage = Number.isFinite(w) && w >= 0 ? w : 0;
    const mult = model.kind === 'per_mm' ? (Number.isFinite(t) && t > 0 ? t : 0) : 1;
    if (mult === 0) return null;

    const low = model.min * a * mult * (1 + wastage / 100);
    const high = model.max * a * mult * (1 + wastage / 100);
    const packs = model.pack
      ? { low: Math.ceil(low / model.pack.value), high: Math.ceil(high / model.pack.value) }
      : null;
    return { low, high, packs };
  }, [area, waste, thickness, model]);

  const fmt = (n: number) => (n >= 100 ? Math.round(n).toString() : n.toFixed(1));
  const unitLabel = model.unit === 'litre' ? 'litres' : 'kg';

  const quantityLine = result
    ? result.packs
      ? `${result.packs.low === result.packs.high ? result.packs.low : `${result.packs.low} to ${result.packs.high}`} x ${model.pack!.value} ${model.pack!.unit}`
      : `${fmt(result.low)} ${unitLabel}`
    : '';

  const waUrl =
    `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=` +
    encodeURIComponent(
      `Hi Lapiz Blue, I need a quote for ${rec.name}. Area ${area} m2` +
        (model.kind === 'per_mm' ? `, thickness ${thickness} mm` : '') +
        (quantityLine ? `, roughly ${quantityLine}.` : '.'),
    );

  return (
    <div className="border border-[#161925]/12 bg-[#FAFAF8]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr]">
        {/* Inputs */}
        <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#161925]/12">
          <div className="space-y-5">
            <div>
              <label
                htmlFor={`${uid}-area`}
                className="block font-manrope text-sm font-semibold text-[#161925]"
              >
                Area to cover
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id={`${uid}-area`}
                  type="number"
                  inputMode="decimal"
                  min="1"
                  step="1"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full border border-[#161925]/20 bg-white px-3 py-2.5 font-manrope text-base text-[#161925] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#406E8E] focus:border-[#406E8E]"
                />
                <span className="font-manrope text-sm text-[#161925]/60 shrink-0">m²</span>
              </div>
            </div>

            {model.kind === 'per_mm' && (
              <div>
                <label
                  htmlFor={`${uid}-thickness`}
                  className="block font-manrope text-sm font-semibold text-[#161925]"
                >
                  Thickness
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    id={`${uid}-thickness`}
                    type="number"
                    inputMode="decimal"
                    min={model.thickness?.min ?? 0.5}
                    max={model.thickness?.max}
                    step="0.5"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full border border-[#161925]/20 bg-white px-3 py-2.5 font-manrope text-base text-[#161925] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#406E8E] focus:border-[#406E8E]"
                  />
                  <span className="font-manrope text-sm text-[#161925]/60 shrink-0">mm</span>
                </div>
                {model.thickness && (
                  <p className="mt-1.5 font-manrope text-xs text-[#161925]/55">
                    Data sheet states {model.thickness.min} to {model.thickness.max} mm.
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor={`${uid}-waste`}
                className="block font-manrope text-sm font-semibold text-[#161925]"
              >
                Wastage allowance
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id={`${uid}-waste`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="50"
                  step="5"
                  value={waste}
                  onChange={(e) => setWaste(e.target.value)}
                  className="w-full border border-[#161925]/20 bg-white px-3 py-2.5 font-manrope text-base text-[#161925] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#406E8E] focus:border-[#406E8E]"
                />
                <span className="font-manrope text-sm text-[#161925]/60 shrink-0">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <p className="font-manrope text-[11px] uppercase tracking-[0.18em] text-[#161925]/50">
              You will need
            </p>
            {result ? (
              <>
                <p
                  className="mt-3 font-outfit font-bold text-[#161925] tabular-nums tracking-tight leading-none text-4xl sm:text-5xl"
                  aria-live="polite"
                >
                  {fmt(result.low)}
                  {result.high !== result.low && (
                    <span className="text-[#161925]/55"> to {fmt(result.high)}</span>
                  )}
                  <span className="ml-2 font-manrope text-base font-semibold text-[#161925]/55">
                    {unitLabel}
                  </span>
                </p>

                {result.packs && model.pack && (
                  <p className="mt-4 font-manrope text-lg text-[#161925]">
                    <span className="font-semibold tabular-nums">
                      {result.packs.low}
                      {result.packs.high !== result.packs.low && ` to ${result.packs.high}`}
                    </span>{' '}
                    {result.packs.high === 1 ? 'pack' : 'packs'} of {model.pack.value}{' '}
                    {model.pack.unit}
                  </p>
                )}
              </>
            ) : (
              <p className="mt-3 font-manrope text-base text-[#161925]/60">
                Enter an area to see the quantity.
              </p>
            )}
          </div>

          <div className="mt-6">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 bg-[#23395B] px-6 py-3.5 font-manrope font-semibold text-white transition-colors hover:bg-[#1a2a45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E]"
            >
              Send this quantity for a quote
            </a>
            <p className="mt-4 font-manrope text-xs leading-relaxed text-[#161925]/55">
              Worked from the rate in the {rec.name} data sheet: {model.source}. Real
              consumption moves with substrate flatness, trowel size and site conditions, so
              treat this as a starting quantity and confirm before ordering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
