import type { ManifestRecord } from '@/lib/tds';
import { specLabel } from '@/lib/tds-labels';

interface SpecTableProps {
  rec: ManifestRecord;
}

const FIELD_ORDER = [
  'classification',
  'coverage',
  'joint_width',
  'pack_size',
  'pot_life',
  'open_time',
  'adjustment_time',
  'set_time',
  'grouting_time',
  'colours',
  'mixing_ratio',
  'bond_strength',
  'water_resistance',
  'application_temperature',
  'consistency',
  'storage_shelf_life',
  'emicode',
];

export function SpecTable({ rec }: SpecTableProps) {
  const entries = FIELD_ORDER.filter((f) => rec.specs[f]).map(
    (f) => [f, rec.specs[f]] as const
  );
  const extras = Object.keys(rec.specs).filter((f) => !FIELD_ORDER.includes(f));
  for (const f of extras) entries.push([f, rec.specs[f]]);
  if (entries.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-t-2 border-[#161925]">
        <caption className="sr-only">
          {rec.name} technical specifications from the manufacturer TDS
        </caption>
        <tbody className="divide-y divide-[#161925]/10">
          {entries.map(([field, value]) => (
            <tr key={field}>
              <th
                scope="row"
                className="text-left align-top py-4 pr-6 w-1/3 min-w-[150px] text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500"
              >
                {specLabel(field)}
              </th>
              <td className="py-4 text-[#161925] leading-relaxed tabular-nums">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
