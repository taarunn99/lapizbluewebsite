/**
 * Which products have a 3D pack render, and what shape their pack is.
 *
 * Generated alongside the posters by scripts/generate-pack-3d-posters.mjs. A
 * product only appears here once its poster has been rendered and looked at,
 * so the absence of an entry is the signal to keep the flat pack shot.
 */
import packs from '@/data/pack3d.json';

export type PackForm = 'bag' | 'bucket' | 'kit';

export interface Pack3DEntry {
  form: PackForm;
  poster: string;
}

const INDEX = packs as Record<string, Pack3DEntry>;

/** Only Pidilite Puma has renders today, so the brand is part of the key. */
export function pack3DFor(brand: string, slug: string): Pack3DEntry | null {
  if (brand !== 'pidilite-puma') return null;
  return INDEX[slug] ?? null;
}
