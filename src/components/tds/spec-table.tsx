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
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm bg-white">
      <table className="w-full text-sm">
        <caption className="sr-only">{rec.name} technical specifications from the manufacturer TDS</caption>
        <tbody>
          {entries.map(([field, value], i) => (
            <tr key={field} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <th
                scope="row"
                className="text-left align-top font-semibold text-[#23395B] px-4 sm:px-6 py-3 w-1/3 min-w-[140px]"
              >
                {specLabel(field)}
              </th>
              <td className="px-4 sm:px-6 py-3 text-gray-700">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
