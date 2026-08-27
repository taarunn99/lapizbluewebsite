import type { ManifestRecord } from '@/lib/tds';
import { consumptionTiers } from '@/lib/tds';

interface ConsumptionScaleProps {
  rec: ManifestRecord;
}

// Consumption as a figure: one bar per trowel tier stated in the TDS, scaled
// to the highest kg per square metre value. Numbers first, sentences never.
export function ConsumptionScale({ rec }: ConsumptionScaleProps) {
  const tiers = consumptionTiers(rec);
  if (tiers.length < 2) return null;
  const maxVal = Math.max(
    ...tiers.map((t) => Math.max(...t.value.split('-').map((v) => parseFloat(v))))
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#161925]/10 border border-[#161925]/10">
      {tiers.map((tier) => {
        const high = Math.max(...tier.value.split('-').map((v) => parseFloat(v)));
        const pct = Math.max(18, Math.round((high / maxVal) * 100));
        return (
          <div key={tier.trowel} className="bg-[#FAFAF8] p-6 flex flex-col justify-end min-h-[180px]">
            <div
              className="w-full bg-[#23395B]/10 border-t-2 border-[#23395B] mb-4"
              style={{ height: `${pct * 0.9}px` }}
              aria-hidden="true"
            />
            <p className="text-3xl font-bold text-[#161925] tabular-nums tracking-tight">
              {tier.value}
              <span className="text-sm font-semibold text-gray-400 ml-1">kg/m²</span>
            </p>
            <p className="mt-1 text-sm text-gray-600">{tier.label}</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 mt-1">
              Trowel {tier.trowel}
            </p>
          </div>
        );
      })}
    </div>
  );
}
