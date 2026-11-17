'use client';

import { useId, useMemo, useState } from 'react';
import { AddToQuote } from '@/components/quote/add-to-quote.client';
import type { CalcConfig } from '@/lib/calc-types';
import { compute, depthFor, initialInputs, type CalcInputs } from '@/lib/calculator';
import type { ManifestRecord } from '@/lib/tds';
import { TDS_WHATSAPP_NUMBER } from '@/lib/site-constants';
import { Choice, Field, Group, Stepper } from './controls';

interface Props {
  rec: ManifestRecord;
  cfg: CalcConfig;
  brandName: string;
}

const WASTAGE_STEPS = [5, 10, 15] as const;

/**
 * How much you need.
 *
 * The headline figure is the data sheet figure and nothing else, at the
 * thickness, trowel, coats or joint the reader has chosen. No site allowance
 * is folded into it, because a number that quietly carries someone else's
 * assumption cannot be checked against the sheet, and being checkable against
 * the sheet is why this page exists. Wastage is a separate, explicit toggle,
 * off by default, shown as its own line beside the sheet figure.
 *
 * The controls come from the product's own published table, so a tiler sees
 * trowel numbers, a waterproofer sees coats and a grouter sees tile sizes.
 * The frame around them is identical on all four hundred pages.
 */
export function ConsumptionCalculator({ rec, cfg, brandName }: Props) {
  const uid = useId();
  const [inputs, setInputs] = useState<CalcInputs>(() => initialInputs(cfg));
  const [addWastage, setAddWastage] = useState(false);
  const [wastage, setWastage] = useState<number>(10);

  const set = <K extends keyof CalcInputs>(k: K) => (v: number) =>
    setInputs((s) => ({ ...s, [k]: v }));

  // Width and depth are not independent: the sheet pairs a depth with every
  // width, so moving the width moves the depth to the paired figure.
  const setJointWidth = (w: number) =>
    setInputs((s) =>
      cfg.model === 'linear_joint' ? { ...s, jointWidth: w, jointDepth: depthFor(cfg, w) } : s,
    );

  const result = useMemo(() => compute(cfg, inputs), [cfg, inputs]);
  const factor = addWastage ? 1 + wastage / 100 : 1;

  const fmt = (n: number) =>
    n >= 100 ? Math.round(n).toLocaleString('en-GB') : n >= 10 ? n.toFixed(1) : n.toFixed(2);
  const range = (lo: number, hi: number) => (hi > lo + 1e-9 ? `${fmt(lo)} to ${fmt(hi)}` : fmt(lo));
  const unitWord = result?.unit === 'litre' ? 'litres' : (result?.unit ?? '');

  const packsLow = result?.packsLow != null ? Math.ceil(result.packsLow * factor) : null;
  const packsHigh = result?.packsHigh != null ? Math.ceil(result.packsHigh * factor) : null;
  const packSpan =
    packsLow != null && packsHigh != null && packsHigh > packsLow
      ? `${packsLow} to ${packsHigh}`
      : String(packsLow ?? '');

  const orderLine = !result
    ? ''
    : packsLow != null
      ? `${packSpan} x ${result.packLabel}`
      : `${range(result.low * factor, result.high * factor)} ${unitWord}`;

  const waUrl =
    `https://api.whatsapp.com/send?phone=${TDS_WHATSAPP_NUMBER}&text=` +
    encodeURIComponent(
      `Hi Lapiz Blue, I need a quote for ${rec.name}. ` +
        (result?.workings.join('. ') ?? '') +
        (addWastage ? `. Including ${wastage} percent wastage` : '') +
        (orderLine ? `. Roughly ${orderLine}.` : '.'),
    );

  return (
    <div className="border border-[#161925]/12 bg-[#FAFAF8]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr]">
        <div className="border-b border-[#161925]/12 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <Group>
            {cfg.model === 'linear_joint' ? (
              <>
                <Field
                  id={`${uid}-m`}
                  label="Length of joint"
                  unit="m"
                  value={inputs.metres}
                  onChange={set('metres')}
                  min={1}
                />
                {cfg.profiles.length > 1 && (
                  <Choice
                    label="Joint shape"
                    options={cfg.profiles.map((p) => ({ label: p.label }))}
                    value={inputs.profile}
                    onChange={set('profile')}
                  />
                )}
                <Field
                  id={`${uid}-jw`}
                  label="Joint width"
                  unit="mm"
                  value={inputs.jointWidth}
                  onChange={setJointWidth}
                  min={1}
                />
                <Field
                  id={`${uid}-jd`}
                  label="Joint depth"
                  unit="mm"
                  value={inputs.jointDepth}
                  onChange={set('jointDepth')}
                  min={1}
                  hint={`The sheet pairs ${depthFor(cfg, inputs.jointWidth)} mm deep with a ${inputs.jointWidth} mm joint.`}
                />
              </>
            ) : (
              <Field
                id={`${uid}-area`}
                label="Area to cover"
                unit="m²"
                value={inputs.area}
                onChange={set('area')}
                min={1}
              />
            )}

            {cfg.model === 'tiered_area' && (
              <>
                {cfg.tiers.length > 1 && (
                  <Choice
                    label={cfg.tiers[0].hint ? 'Trowel or method' : 'How it is being applied'}
                    options={cfg.tiers.map((t) => ({
                      label: t.label,
                      hint: t.hint ?? `${t.min}${t.max > t.min ? ` to ${t.max}` : ''} ${cfg.unit}/m²`,
                    }))}
                    value={inputs.tier}
                    onChange={set('tier')}
                  />
                )}
                {cfg.coats && (
                  <Stepper
                    label={cfg.coats.label}
                    value={inputs.coats}
                    onChange={set('coats')}
                    min={cfg.coats.min}
                    max={Math.max(cfg.coats.max, cfg.coats.min + 1)}
                    hint={`The sheet calls for ${cfg.coats.min === cfg.coats.max ? cfg.coats.min : `${cfg.coats.min} to ${cfg.coats.max}`}.`}
                  />
                )}
                {cfg.orientation && cfg.orientation.length > 1 && (
                  <Choice
                    label="Wall or floor"
                    options={cfg.orientation.map((o) => ({ label: o.label }))}
                    value={inputs.orientation}
                    onChange={set('orientation')}
                  />
                )}
              </>
            )}

            {cfg.model === 'thickness_area' && (
              <Field
                id={`${uid}-t`}
                label="Thickness"
                unit="mm"
                value={inputs.thickness}
                onChange={set('thickness')}
                min={cfg.thickness.min}
                max={cfg.thickness.max}
                step={0.5}
                hint={`The sheet states ${cfg.thickness.min} to ${cfg.thickness.max} mm.`}
              />
            )}

            {cfg.model === 'joint_volume' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    id={`${uid}-tl`}
                    label="Tile length"
                    unit="mm"
                    value={inputs.tileL}
                    onChange={set('tileL')}
                    min={10}
                  />
                  <Field
                    id={`${uid}-tw`}
                    label="Tile width"
                    unit="mm"
                    value={inputs.tileW}
                    onChange={set('tileW')}
                    min={10}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    id={`${uid}-tt`}
                    label="Tile thickness"
                    unit="mm"
                    value={inputs.tileT}
                    onChange={set('tileT')}
                    min={1}
                    step={0.5}
                  />
                  <Field
                    id={`${uid}-j`}
                    label="Joint width"
                    unit="mm"
                    value={inputs.joint}
                    onChange={set('joint')}
                    min={1}
                    step={0.5}
                  />
                </div>
                <p className="font-manrope text-xs leading-relaxed text-[#161925]/65">
                  The tile thickness is the depth of the joint, which is why a 20 mm slab takes
                  twice the grout of a 10 mm tile at the same joint width.
                </p>
              </>
            )}

            {cfg.model === 'gap_volume' && (
              <Field
                id={`${uid}-g`}
                label="Gap to fill"
                unit="mm"
                value={inputs.gapMm}
                onChange={set('gapMm')}
                min={1}
                hint="Measured depth of the void under the base plate."
              />
            )}

            <div className="pt-1">
              <button
                type="button"
                role="switch"
                aria-checked={addWastage}
                onClick={() => setAddWastage((v) => !v)}
                className="flex w-full items-center justify-between gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-ink)]"
              >
                <span className="font-manrope text-sm font-semibold text-[#161925]">
                  Add a wastage allowance
                </span>
                <span
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                    addWastage ? 'bg-[var(--brand-ink)]' : 'bg-[#161925]/20'
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
                      className={`flex-1 border px-3 py-2 font-manrope text-sm tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-ink)] ${
                        wastage === step
                          ? 'border-[var(--brand-ink)] bg-[var(--brand-ink)] font-semibold text-white'
                          : 'border-[#161925]/20 bg-white text-[#161925] hover:border-[var(--brand-ink)]'
                      }`}
                    >
                      {step}%
                    </button>
                  ))}
                </div>
              )}
              {'includesWastage' in cfg && cfg.includesWastage && (
                <p className="mt-2 font-manrope text-xs leading-relaxed text-[#161925]/65">
                  This manufacturer states its table already allows for normal site wastage, so
                  adding more here is on top of theirs.
                </p>
              )}
            </div>
          </Group>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="label-sh text-[#161925]/65">As published in the data sheet</p>

            {result ? (
              <>
                <p
                  className="mt-3 font-outfit text-4xl font-bold leading-none tracking-tight text-[#161925] tabular-nums sm:text-5xl"
                  aria-live="polite"
                >
                  {range(result.low, result.high)}
                  <span className="ml-2 font-manrope text-base font-semibold text-[#161925]/65">
                    {unitWord}
                  </span>
                </p>

                <ul className="mt-4 space-y-1">
                  {result.workings.map((w) => (
                    <li key={w} className="spec-sh text-[#161925]/65">
                      {w}
                    </li>
                  ))}
                </ul>

                {addWastage && (
                  <p className="mt-4 font-manrope text-lg text-[#161925]">
                    <span className="text-[#161925]/65">Plus {wastage}% wastage: </span>
                    <span className="font-semibold tabular-nums">
                      {range(result.low * factor, result.high * factor)} {unitWord}
                    </span>
                  </p>
                )}

                {packsLow != null && (
                  <>
                    <p className="mt-4 border-t border-[#161925]/12 pt-4 font-manrope text-lg text-[#161925]">
                      Order <span className="font-semibold tabular-nums">{packSpan}</span>{' '}
                      {packsHigh === 1 ? 'pack' : 'packs'} of {result.packLabel}
                      {addWastage ? ', wastage included' : ''}
                    </p>
                    <AddToQuote
                      className="mt-5"
                      item={{
                        brand: rec.brand,
                        brandName,
                        productLine: rec.product_line,
                        slug: rec.slug,
                        name: rec.name,
                        pack: result.packLabel ?? '',
                      }}
                      quantity={packsHigh ?? packsLow}
                      label={`Add ${packsHigh ?? packsLow} x ${result.packLabel} to quote list`}
                    />
                  </>
                )}
              </>
            ) : (
              <p className="mt-3 font-manrope text-base text-[#161925]/60">
                Enter a figure to see the quantity.
              </p>
            )}
          </div>

          <div className="mt-6">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 bg-[var(--brand-ink)] px-6 py-3.5 font-manrope font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-ink)]"
            >
              Send this quantity for a quote
            </a>
            <p className="mt-4 font-manrope text-xs leading-relaxed text-[#161925]/65">
              Taken from the {rec.name} data sheet: {'source' in cfg ? cfg.source : ''}. No site
              allowance is added unless you turn one on.
              {'caveat' in cfg && cfg.caveat ? ` ${cfg.caveat}` : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
