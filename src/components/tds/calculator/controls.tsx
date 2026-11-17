'use client';

import type { ReactNode } from 'react';

/**
 * The furniture every calculator shares.
 *
 * The owner's requirement is that a page learned once is a page learned for
 * all four hundred of them, so the frame never changes: the same two columns,
 * the same label style, the same segmented buttons. What changes is which
 * controls appear inside it, because sizing a sealant joint and sizing a
 * screed are not the same sum and pretending they are is what made every
 * calculator on the site a multiplication box.
 */

const FIELD =
  'w-full border border-[#161925]/20 bg-white px-3 py-2.5 font-manrope text-base text-[#161925] tabular-nums focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)]';

export function Field({
  id,
  label,
  unit,
  value,
  onChange,
  min,
  max,
  step = 1,
  hint,
}: {
  id: string;
  label: string;
  unit?: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-manrope text-sm font-semibold text-[#161925]">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ''}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={FIELD}
        />
        {unit && <span className="font-manrope text-sm text-[#161925]/65 shrink-0">{unit}</span>}
      </div>
      {hint && <p className="mt-1.5 font-manrope text-xs text-[#161925]/65">{hint}</p>}
    </div>
  );
}

/**
 * The choice control. A trowel number, a TKB class, a dilution, a joint
 * profile: all of them are one of a published few, so they are buttons and
 * not a dropdown. A salesperson can see every option the sheet offers without
 * opening anything, which is the point of putting the sheet on a web page.
 */
export function Choice({
  label,
  options,
  value,
  onChange,
  hint,
}: {
  label: string;
  options: { label: string; hint?: string }[];
  value: number;
  onChange: (n: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <p className="font-manrope text-sm font-semibold text-[#161925]">{label}</p>
      <div className="mt-2 grid gap-1.5" role="group" aria-label={label}>
        {options.map((o, n) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={value === n}
            onClick={() => onChange(n)}
            className={`flex items-baseline justify-between gap-3 border px-3 py-2 text-left font-manrope text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] ${
              value === n
                ? 'border-[var(--brand)] bg-[var(--brand)] font-semibold text-white'
                : 'border-[#161925]/20 bg-white text-[#161925] hover:border-[var(--brand)]'
            }`}
          >
            <span>{o.label}</span>
            {o.hint && (
              <span
                className={`shrink-0 font-manrope text-xs ${value === n ? 'text-white/80' : 'text-[#161925]/65'}`}
              >
                {o.hint}
              </span>
            )}
          </button>
        ))}
      </div>
      {hint && <p className="mt-1.5 font-manrope text-xs text-[#161925]/65">{hint}</p>}
    </div>
  );
}

/** A small whole number, where typing would be slower than tapping. */
export function Stepper({
  label,
  value,
  onChange,
  min,
  max,
  hint,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  hint?: string;
}) {
  const steps = Array.from({ length: max - min + 1 }, (_, n) => min + n);
  return (
    <div>
      <p className="font-manrope text-sm font-semibold text-[#161925]">{label}</p>
      <div className="mt-2 flex gap-1.5" role="group" aria-label={label}>
        {steps.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={value === s}
            onClick={() => onChange(s)}
            className={`flex-1 border px-3 py-2 font-manrope text-sm tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] ${
              value === s
                ? 'border-[var(--brand)] bg-[var(--brand)] font-semibold text-white'
                : 'border-[#161925]/20 bg-white text-[#161925] hover:border-[var(--brand)]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {hint && <p className="mt-1.5 font-manrope text-xs text-[#161925]/65">{hint}</p>}
    </div>
  );
}

export function Group({ children }: { children: ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}
