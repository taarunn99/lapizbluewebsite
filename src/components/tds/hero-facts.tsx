import type { ManifestRecord } from '@/lib/tds';
import { specLabel } from '@/lib/tds-labels';

const HERO_BY_CATEGORY: Record<ManifestRecord['category'], string[]> = {
  tile_adhesive: ['classification', 'coverage', 'pack_size'],
  epoxy_grout: ['classification', 'joint_width', 'pack_size'],
  cementitious_grout: ['classification', 'joint_width', 'pack_size'],
  repair_mortar: ['classification', 'coverage', 'pack_size'],
  resilient_adhesive: ['coverage', 'pack_size', 'open_time'],
};

interface HeroFactsProps {
  rec: ManifestRecord;
  primaryColor: string;
}

export function HeroFacts({ rec, primaryColor }: HeroFactsProps) {
  const facts = HERO_BY_CATEGORY[rec.category]
    .map((field) => ({
      field,
      value: field === 'classification' ? rec.classification || rec.specs[field] : rec.specs[field],
    }))
    .filter((f) => f.value);
  if (facts.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {facts.map((f) => (
        <div
          key={f.field}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
        >
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
            {specLabel(f.field)}
          </dt>
          <dd className="text-sm font-semibold leading-snug" style={{ color: primaryColor }}>
            {f.field === 'coverage' && f.value.length > 90
              ? `${f.value.slice(0, 90).replace(/[,;. ]+[^,;. ]*$/, '')}...`
              : f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
