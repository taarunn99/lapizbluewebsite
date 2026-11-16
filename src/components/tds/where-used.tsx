import type { ManifestRecord } from '@/lib/tds';

/**
 * Where the product is used, and where it is the wrong choice.
 *
 * The second list is the one that saves money. Most product failures on site
 * are not application errors, they are the wrong product specified for the
 * condition, and a manufacturer's own sheet rarely says plainly what its
 * product should not be used for.
 *
 * Every exclusion below is derived from the record's own classification or
 * composition, never guessed. A product whose data does not support an
 * exclusion simply shows none.
 */
function exclusionsFor(rec: ManifestRecord): string[] {
  const out: string[] = [];
  const cls = (rec.classification || '').toUpperCase();
  const type = `${rec.specs.product_type ?? ''} ${rec.description}`.toLowerCase();

  // Tile adhesive classes. C1 bonds by suction, which porcelain does not give.
  if (/^C1/.test(cls)) {
    out.push('Under porcelain or any tile with very low water absorption, which needs a C2 adhesive');
    out.push('For large format tiles, where a deformable C2 S1 or S2 adhesive is required');
    out.push('On facades or substrates that move, which need a deformable adhesive');
  }
  if (/^C2/.test(cls) && !/S[12]/.test(cls)) {
    out.push('On heated screeds or substrates that move, where an S1 or S2 deformable grade is required');
  }

  // Polyvinyl acetate re emulsifies, so it is an internal dry product.
  if (/\bpva\b/.test(type)) {
    out.push('Externally or anywhere permanently damp, because PVA re emulsifies in water');
    out.push('As a bonding agent under a structural repair, where an SBR product is required');
  }

  // Gypsum softens in water.
  if (/gypsum/.test(type)) {
    out.push('On external walls, where a cementitious plaster is required');
    out.push('In bathrooms, kitchens or any permanently wet area');
  }

  // Microcement and decorative finishes are not membranes.
  if (rec.category === 'microcement' || /microcement|decorative finish/.test(type)) {
    out.push('As a waterproofing layer, because it is a finish and needs a membrane beneath it in wet areas');
    out.push('Over a substrate that is unsound, moving or uneven, which will telegraph through the finish');
  }

  // Unsanded grouts shrink in a wide joint; sanded grouts can mark soft tile.
  if (rec.category === 'cementitious_grout' && /unsanded/.test(type)) {
    out.push('In joints wider than the data sheet allows, where a sanded grout is required');
  }
  if (rec.category === 'cementitious_grout' && /sanded/.test(type) && !/unsanded/.test(type)) {
    out.push('On polished or soft tile faces without testing first, because sanded grout can scratch');
  }

  // Cementitious grout erodes under chemical cleaning regimes.
  if (rec.category === 'cementitious_grout') {
    out.push('Where the joint meets chemicals or constant water, which calls for an epoxy grout');
  }

  // Aromatic polyurethanes are not light stable.
  if (/aromatic/.test(type)) {
    out.push('As a final exposed coat, because an aromatic polyurethane is not UV stable and needs a top coat');
  }

  // Rigid repair and grout materials under vibration.
  if (rec.category === 'precision_grout' && !/epoxy/.test(type)) {
    out.push('Under dynamically loaded or vibrating machinery, where an epoxy grout is required');
  }

  return out;
}

export function WhereUsed({ rec }: { rec: ManifestRecord }) {
  const exclusions = exclusionsFor(rec);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-10 lg:gap-16">
      <div className="lg:order-2">
        {rec.applications.length > 0 ? (
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {rec.applications.map((app, i) => (
              <li key={app} className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-[#161925]/10 pb-4">
                <span className="font-manrope text-xs font-semibold tabular-nums text-[#406E8E] pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-manrope text-base leading-[1.7] text-[#161925]/85">{app}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="font-manrope text-base text-[#161925]/60">
            Application detail is in the technical data sheet.
          </p>
        )}
      </div>

      {exclusions.length > 0 ? (
        <div className="lg:order-1">
          <h3 className="font-outfit font-bold text-xl text-[#161925]">
            Where it is not the right product
          </h3>
          <ul className="mt-5 space-y-3 list-disc pl-5 marker:text-[#161925]/35">
            {exclusions.map((x) => (
              <li key={x} className="font-manrope text-base leading-[1.7] text-[#161925]/85">
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-manrope text-sm leading-relaxed text-[#161925]/65 max-w-[62ch]">
            Drawn from this product&apos;s own classification. If your situation is close to one of
            these, send us the detail and we will specify an alternative.
          </p>
        </div>
      ) : null}
    </div>
  );
}
