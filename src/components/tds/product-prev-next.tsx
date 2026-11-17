import Link from 'next/link';
import type { ManifestRecord } from '@/lib/tds';
import { getShippable, tdsHref } from '@/lib/tds';

/**
 * Step through the product line one product at a time.
 *
 * Someone comparing two adhesives should not have to go back to the line page
 * between each one. Ordering is alphabetical and stable, so the position of a
 * product does not move when another is added.
 */
export function ProductPrevNext({ rec }: { rec: ManifestRecord }) {
  const siblings = getShippable(rec.brand, rec.product_line).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const index = siblings.findIndex((s) => s.slug === rec.slug);
  if (index === -1 || siblings.length < 2) return null;

  const prev = siblings[index - 1];
  const nextOne = siblings[index + 1];

  return (
    <nav
      aria-label="Previous and next product"
      className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#161925]/12 border-y border-[#161925]/12 print:hidden"
    >
      {prev ? (
        <Link
          href={tdsHref(prev)}
          className="group bg-white px-6 py-7 transition-colors hover:bg-[#F6F8FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#406E8E]"
        >
          <span className="font-manrope text-[11px] uppercase tracking-[0.18em] text-[#161925]/65">
            Previous
          </span>
          <span className="mt-2 block font-outfit font-bold text-xl text-[#161925] group-hover:text-[#23395B]">
            {prev.name}
          </span>
        </Link>
      ) : (
        <span className="bg-white px-6 py-7" />
      )}

      {nextOne ? (
        <Link
          href={tdsHref(nextOne)}
          className="group bg-white px-6 py-7 sm:text-right transition-colors hover:bg-[#F6F8FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#406E8E]"
        >
          <span className="font-manrope text-[11px] uppercase tracking-[0.18em] text-[#161925]/65">
            Next
          </span>
          <span className="mt-2 block font-outfit font-bold text-xl text-[#161925] group-hover:text-[#23395B]">
            {nextOne.name}
          </span>
        </Link>
      ) : (
        <span className="bg-white px-6 py-7" />
      )}
    </nav>
  );
}
