"use client";

import type { BrandConfig } from "@/data/brandConfigs";

interface BrandProductNavMobileProps {
  brand: BrandConfig;
  currentProductLine?: string;
  basePath?: string; // '/brands' or '/tools'
}

/**
 * Mobile-optimized dropdown version for smaller screens
 * Client component for interactivity
 */
export function BrandProductNavMobile({
  brand,
  currentProductLine,
  basePath = "/brands",
}: BrandProductNavMobileProps) {
  return (
    <div className="sticky top-4 z-40 mx-auto w-full max-w-md px-4">
      <div
        className="rounded-2xl border border-white/20 bg-white/80 p-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/80"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        <select
          className="w-full rounded-xl border-none bg-transparent px-4 py-3 text-sm font-medium text-gray-700 outline-none dark:text-gray-300"
          value={currentProductLine || brand.productLines[0]?.slug}
          onChange={(e) => {
            window.location.href = `${basePath}/${brand.slug}/${e.target.value}`;
          }}
          style={{ color: brand.theme.primary }}
        >
          {brand.productLines.map((productLine) => (
            <option key={productLine.slug} value={productLine.slug}>
              {productLine.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
