'use client';

import { useId, useMemo, useState } from 'react';
import type { ConsumptionModel, ManifestRecord } from '@/lib/tds';
import { TDS_WHATSAPP_NUMBER } from '@/lib/site-constants';

interface Props {
  rec: ManifestRecord;
  model: ConsumptionModel;
}

const WASTAGE_STEPS = [5, 10, 15] as const;

/**
 * How much you need.
 *
 * The headline figure is the data sheet figure and nothing else: area times
 * the rate the manufacturer publishes, at the thickness the manufacturer
 * publishes. No site allowance is folded into it, because a number that
 * quietly carries someone else's assumption cannot be checked against the
 * sheet, and this page exists to be checkable.
 *
 * Wastage is a separate, explicit toggle. Off by default, so what you see
 * first is exactly what the sheet says. Turn it on and the allowance is shown
 * as its own line beside the sheet figure, never blended into it.
 *
 * The page only renders this when consumptionModel() found a real published
 * rate, so nothing here is ever invented.
 */
export function ConsumptionCalculator({ rec, model }: Props) {
  const uid = useId();
  const [area, setArea] = useState('50');
  const [addWastage, setAddWastage] = useState(false);
  const [wastage, setWastage] = useState<number>(10);
  const [thickness, setThickness] = useState(
    model.thickness ? String(model.thickness.min) : '1',
  );

  const result = useMemo(() => {
    const a = parseFloat(area);
    const t = parseFloat(thickness);
    if (!Number.isFinite(a) || a <= 0) return null;
    const mult = model.kind === 'per_mm' ? (Number.isFinite(t) && t > 0 ? t : 0) : 1;
    if (mult === 0) return null;

    // The sheet figure. Untouched by any allowance.
    const sheetLow = model.min * a * mult;
    const sheetHigh = model.max * a * mult;
    const factor = addWastage ? 1 + wastage / 100 : 1;

    const packs = (kg: number) => (model.pack ? Math.ceil(kg / model.pack.value) : null);

    return {
      sheetLow,
      sheetHigh,
      withLow: sheetLow * factor,
      withHigh: sheetHigh * factor,
      packsLow: packs(sheetLow * factor),
      packsHigh: packs(sheetHigh * factor),
    };
  }, [area, thickness, addWastage, wastage, model]);

  const fmt = (n: number) => (n >= 100 ? Math.round(n).toLocaleString('en-GB') : n.toFixed(1));
  const unitLabel = model.unit === 'litre' ? 'litres' : 'kg';
  const range = (lo: number, hi: number) => (hi > lo ? `${fmt(lo)} to ${fmt(hi)}` : fmt(lo));

  const orderLine = result
    ? result.packsLow !== null
      ? `${result.packsHigh! > result.packsLow ? `${result.packsLow} to ${result.packsHigh}` : result.packsLow} x ${model.pack!.value} ${model.pack!.unit}`
      : `${range(result.withLow, result.withHigh)} ${unitLabel}`
    : '';

  const waUrl =
    `https://api.whatsapp.com/send?phone=${TDS_WHATSAPP_NUMBER}&text=` +
    encodeURIComponent(
      `Hi Lapiz Blue, I need a quote for ${rec.name}. Area ${area} m2` +
        (model.kind === 'per_mm' ? `, thickness ${thickness} mm` : '') +
        (addWastage ? `, including ${wastage} percent wastage` : '') +
        (orderLine ? `, roughly ${orderLine}.` : '.'),
    );

  const field =
    'w-full border border-[#161925]/20 bg-white px-3 py-2.5 font-manrope text-base text-[#161925] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#406E8E] focus:border-[#406E8E]';

  return (
    <div className="border border-[#161925]/12 bg-[#FAFAF8]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr]">
        {/* Inputs */}
        <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#161925]/12">
          <div className="space-y-5">
            <div>
              <label htmlFor={`${uid}-area`} className="block font-manrope text-sm font-semibold text-[#161925]">
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
                  className={field}
                />
                <span className="font-manrope text-sm text-[#161925]/60 shrink-0">m²</span>
              </div>
            </div>

            {model.kind === 'per_mm' && (
              <div>
                <label htmlFor={`${uid}-thickness`} className="block font-manrope text-sm font-semibold text-[#161925]">
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
                    className={field}
                  />
                  <span className="font-manrope text-sm text-[#161925]/60 shrink-0">mm</span>
                </div>
                {model.thickness && (
                  <p className="mt-1.5 font-manrope text-xs text-[#161925]/65">
                    Data sheet states {model.thickness.min} to {model.thickness.max} mm.
                  </p>
                )}
              </div>
            )}

            {/* Wastage, explicitly opt in */}
            <div className="pt-1">
              <button
                type="button"
                role="switch"
                aria-checked={addWastage}
                onClick={() => setAddWastage((v) => !v)}
                className="flex w-full items-center justify-between gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E]"
              >
                <span className="font-manrope text-sm font-semibold text-[#161925]">
                  Add a wastage allowance
                </span>
                <span
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                    addWastage ? 'bg-[#23395B]' : 'bg-[#161925]/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      addWastage ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </span>
              </button>

              {addWastage && (
                <div className="mt-3 flex gap-2" role="group" aria-label="Wastage allowance">
                  {WASTAGE_STEPS.map((step) => (
                    <button
                      key={step}
                      type="button"
                      aria-pressed={wastage === step}
                      onClick={() => setWastage(step)}
                      className={`flex-1 border px-3 py-2 font-manrope text-sm tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#406E8E] ${
                        wastage === step
                          ? 'border-[#23395B] bg-[#23395B] text-white font-semibold'
                          : 'border-[#161925]/20 bg-white text-[#161925] hover:border-[#406E8E]'
                      }`}
                    >
                      {step}%
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <p className="font-manrope text-[11px] uppercase tracking-[0.18em] text-[#161925]/65">
              As published in the data sheet
            </p>

            {result ? (
              <>
                <p
                  className="mt-3 font-outfit font-bold text-[#161925] tabular-nums tracking-tight leading-none text-4xl sm:text-5xl"
                  aria-live="polite"
                >
                  {range(result.sheetLow, result.sheetHigh)}
                  <span className="ml-2 font-manrope text-base font-semibold text-[#161925]/65">
                    {unitLabel}
                  </span>
                </p>

                {addWastage && (
                  <p className="mt-4 font-manrope text-lg text-[#161925]">
                    <span className="text-[#161925]/65">Plus {wastage}% wastage: </span>
                    <span className="font-semibold tabular-nums">
                      {range(result.withLow, result.withHigh)} {unitLabel}
                    </span>
                  </p>
                )}

                {result.packsLow !== null && model.pack && (
                  <p className="mt-4 border-t border-[#161925]/12 pt-4 font-manrope text-lg text-[#161925]">
                    Order{' '}
                    <span className="font-semibold tabular-nums">
                      {result.packsHigh! > result.packsLow ? `${result.packsLow} to ${result.packsHigh}` : result.packsLow}
                    </span>{' '}
                    {result.packsHigh === 1 ? 'pack' : 'packs'} of {model.pack.value} {model.pack.unit}
                    {addWastage ? ', wastage included' : ''}
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
            <p className="mt-4 font-manrope text-xs leading-relaxed text-[#161925]/65">
              Calculated from the rate printed in the {rec.name} data sheet: {model.source}. The
              figure above is the data sheet figure, with no site allowance added. Use the toggle
              if you want one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
