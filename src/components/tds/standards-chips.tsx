import type { ManifestRecord } from '@/lib/tds';
import { STANDARD_BY_CATEGORY } from '@/lib/tds-faq';

/**
 * The standards this product is tested to, above the data table.
 *
 * A specifier reads the class before the figures, because the class is what
 * goes in the specification and the figures are what prove it. Showing them
 * together at the head of the table saves hunting for a classification buried
 * in a row halfway down.
 *
 * Nothing is inferred. The standard comes from the product's category and the
 * class from the record, so a product with neither simply has no chips.
 */
export function StandardsChips({ rec }: { rec: ManifestRecord }) {
  const standard = STANDARD_BY_CATEGORY[rec.category];
  const chips: string[] = [];

  if (rec.classification) chips.push(rec.classification);
  // The sentinel the FAQ builder uses when a category has no named standard.
  if (standard && !standard.startsWith('the manufacturer')) chips.push(standard);
  if (rec.specs.emicode) chips.push(`EMICODE ${rec.specs.emicode}`);

  if (chips.length === 0) return null;

  return (
    <ul className="mb-10 flex flex-wrap gap-2.5">
      {chips.map((chip) => (
        <li
          key={chip}
          className="spec-sh rounded-full border border-[#161925]/15 px-4 py-2 text-[#161925]"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}
