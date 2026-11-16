import type { ManifestRecord } from '@/lib/tds';

/**
 * What the person on site needs once the product has been chosen: what it
 * arrives in, how it is mixed, and how long it keeps.
 *
 * Each block renders only when the record carries the field. A storekeeper
 * reading "Storage: not stated" learns nothing, so the block is simply absent
 * instead.
 */
export function OnSite({ rec }: { rec: ManifestRecord }) {
  const blocks: { title: string; body: string }[] = [];

  if (rec.specs.pack_size) {
    blocks.push({
      title: 'We stock',
      body: `${rec.specs.pack_size}. Other pack sizes can usually be brought in on a project order, so tell us the quantity before you assume what is available.`,
    });
  }

  if (rec.specs.form) blocks.push({ title: 'Supplied as', body: rec.specs.form });

  if (rec.specs.mixing_ratio) {
    blocks.push({
      title: 'Mixing',
      body: `${rec.specs.mixing_ratio.replace(/\.$/, '')}. Mix mechanically to a uniform lump free consistency, and follow any standing time the data sheet gives before remixing. Do not add extra water to recover workability, which lowers strength.`,
    });
  } else if (rec.specs.components) {
    blocks.push({
      title: 'Mixing',
      body: `${rec.specs.components}. Mix the full contents in the ratio the data sheet states; part mixing a reactive product changes the ratio and the cure.`,
    });
  }

  if (rec.specs.pot_life) {
    blocks.push({
      title: 'Working time',
      body: `${rec.specs.pot_life}. Mix only what can be placed inside it. UAE summer temperatures shorten every working time printed on a sheet.`,
    });
  }

  if (rec.specs.storage_shelf_life) {
    blocks.push({
      title: 'Storage',
      body: `${rec.specs.storage_shelf_life} in unopened packaging, stored dry and out of direct sun. Heat and humidity both shorten it.`,
    });
  }

  if (rec.specs.cleaning_agent) {
    blocks.push({
      title: 'Cleaning',
      body: `${rec.specs.cleaning_agent}. Clean tools before the material hardens; once cured it comes off by mechanical means only.`,
    });
  }

  if (blocks.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
      {blocks.map((b) => (
        <div key={b.title}>
          <h3 className="font-manrope text-[11px] uppercase tracking-[0.18em] text-[#161925]/50">
            {b.title}
          </h3>
          <p className="mt-3 font-manrope text-base leading-[1.7] text-[#161925]/85">{b.body}</p>
        </div>
      ))}
    </div>
  );
}
