import type { TdsCategory } from '@/lib/tds';

// Light serializable item passed from server pages into the client marquee
// and range drawer.
export interface RangeItem {
  name: string;
  href: string;
  image: string;
  classification: string;
  category: TdsCategory;
  categoryLabel: string;
}

export interface RangeGroup {
  category: TdsCategory;
  label: string;
  dot: string;
}
