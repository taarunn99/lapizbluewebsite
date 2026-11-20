import type { BrandConfig, ProductLineFAQ } from "@/data/brandConfigs";
import {
  SITE,
  BRANCHES,
  branchNode,
  breadcrumbNode,
  faqPageNode,
  organizationNode,
  standalone,
  webPageNode,
} from "@/lib/org-schema";

/**
 * Structured data for a brand hub page.
 *
 * One script per node, as the pages have always rendered it, so the block
 * count the SEO guard watches never goes down. The business facts come from
 * org-schema, so a brand page and the homepage now describe the same company
 * at the same address.
 */
export function generateBrandJsonLd(brand: BrandConfig, slug: string, faqs?: ProductLineFAQ[]) {
  const url = `${SITE}/brands/${slug}`;
  const breadcrumbId = `${url}#breadcrumb`;

  const breadcrumb = standalone(
    breadcrumbNode(breadcrumbId, [
      { name: "Home", item: SITE },
      { name: "Brands", item: `${SITE}/brands` },
      { name: brand.name, item: url },
    ]),
  );

  const organization = standalone(
    organizationNode({ brand: { name: brand.name, url: brand.website } }),
  );

  // The Dubai head office carries the two branches as departments, so one
  // node gives every address, phone and map without three scripts.
  const dubai = BRANCHES[0];
  const localBusiness = standalone({
    ...branchNode(dubai),
    department: BRANCHES.slice(1).map(branchNode),
  });

  const webPage = standalone(
    webPageNode({
      url,
      name: brand.seoTitle ?? `${brand.name} Products | Lapiz Blue UAE`,
      description: brand.metaDescription,
      image: brand.hero?.src ? `${SITE}${brand.hero.src}` : undefined,
      breadcrumbId,
    }),
  );

  const schemas: Record<string, unknown>[] = [breadcrumb, organization, localBusiness, webPage];

  if (faqs && faqs.length > 0) {
    schemas.push(standalone(faqPageNode(`${url}#faq`, faqs)));
  }

  return schemas;
}
