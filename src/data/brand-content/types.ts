import type { ProductLineFAQ } from "@/data/brandConfigs";

export interface BrandKeyProduct {
  name: string;
  description: string;
}

export interface BrandApplication {
  sector: string;
  description: string;
}

export interface BrandPageContent {
  faqs: ProductLineFAQ[];
  keyProducts: BrandKeyProduct[];
  applications: BrandApplication[];
  certifications?: string[];
  branches?: Array<{ city: string; address: string }>;
  trustSignals?: Array<{ title: string; description: string }>;
  customSections?: Array<{ id: string; title: string; content: string }>;
}
