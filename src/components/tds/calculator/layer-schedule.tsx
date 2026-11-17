import type { LayerSchedule } from '@/lib/calc-types';

/**
 * A resin floor is a schedule, not a rate.
 *
 * Mapefloor I 300 SL is three to five named layers, several of which are other
 * products, each with its own consumption. Presenting one of those rates as
 * "the" rate is how the old calculator came to show 0.3 kg/m2 for a system
 * whose own sheet goes to 3.7: the 0.3 was the primer. So the schedule is
 * printed as the sheet prints it, with this product's own layers marked, and
 * no total is invented across layers that are not all ours to supply.
 */
export function LayerScheduleTable({ cfg, name }: { cfg: LayerSchedule; name: string }) {
  return (
    <div className="border border-[#161925]/12 bg-[#FAFAF8] p-6 sm:p-8">
      <p className="label-sh text-[#161925]/65">As published in the data sheet</p>
      <p className="mt-3 max-w-[62ch] font-manrope text-base leading-relaxed text-[#161925]">
        {name} is applied as a system of layers, and each layer has its own consumption rate. There
        is no single figure to multiply an area by, so the schedule is reproduced here as the sheet
        states it. Ask us and we will price the whole build up.
      </p>
      <dl className="mt-6">
        {cfg.layers.map((l) => (
          <div
            key={l.name}
            className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-[#161925]/15 py-3.5"
          >
            <dt className="min-w-0 font-manrope text-sm text-[#161925]">
              {l.name}
              {!l.thisProduct && (
                <span className="ml-2 font-manrope text-xs text-[#161925]/65">another product</span>
              )}
            </dt>
            <dd className="spec-sh shrink-0 text-[#161925]">{l.rate}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 font-manrope text-xs leading-relaxed text-[#161925]/65">
        Taken from the {name} data sheet: {cfg.source}.
      </p>
    </div>
  );
}
