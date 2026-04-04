import type { BrandPageContent } from "./types";
import { latcreteContent } from "./laticrete";
import { weberContent } from "./weber";
import { akzonobelContent } from "./akzonobel";
import { kerakollContent } from "./kerakoll";
import { pidilitePumaContent } from "./pidilite-puma";
import { filaContent } from "./fila";
import { kalingaStoneContent } from "./kalinga-stone";

const brandContentMap: Record<string, BrandPageContent> = {
  laticrete: latcreteContent,
  weber: weberContent,
  akzonobel: akzonobelContent,
  kerakoll: kerakollContent,
  "pidilite-puma": pidilitePumaContent,
  fila: filaContent,
  "kalinga-stone": kalingaStoneContent,
};

export function getBrandPageContent(slug: string): BrandPageContent | undefined {
  return brandContentMap[slug];
}
