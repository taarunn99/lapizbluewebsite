import type { BrandHubCopy } from "./types";
import { mapeiHub } from "./mapei";
import { kerakollHub } from "./kerakoll";
import { weberHub } from "./weber";
import { laticreteHub } from "./laticrete";
import { pidilitePumaHub } from "./pidilite-puma";
import { profilpasHub } from "./profilpas";
import { akzonobelHub } from "./akzonobel";
import { filaHub } from "./fila";
import { kalingaStoneHub } from "./kalinga-stone";

const hubs: Record<string, BrandHubCopy> = {
  mapei: mapeiHub,
  kerakoll: kerakollHub,
  weber: weberHub,
  laticrete: laticreteHub,
  "pidilite-puma": pidilitePumaHub,
  profilpas: profilpasHub,
  akzonobel: akzonobelHub,
  fila: filaHub,
  "kalinga-stone": kalingaStoneHub,
};

export function getBrandHub(slug: string): BrandHubCopy | undefined {
  return hubs[slug];
}

export const brandHubSlugs = Object.keys(hubs);
