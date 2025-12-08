import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BrandConfig } from "@/data/brandConfigs";
import { BrandProductNavMobile } from "./brand-product-nav-mobile";

interface BrandProductNavProps {
  brand: BrandConfig;
  currentProductLine?: string;
  className?: string;
}

/**
 * Static pill-shaped glassy navigation for brand product lines
 * Server-rendered, SEO-friendly, mobile-optimized
 */
export function BrandProductNav({
  brand,
  currentProductLine,
  className,
}: BrandProductNavProps) {
  return (
    <nav
      className={cn(
        "sticky top-4 z-40 mx-auto w-full max-w-fit px-4 py-3",
        className
      )}
      aria-label="Product line navigation"
    >
      <div
        className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/80"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        {brand.productLines.map((productLine) => {
          const isActive = currentProductLine === productLine.slug;

          return (
            <Link
              key={productLine.slug}
              href={`/brands/${brand.slug}/${productLine.slug}`}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                "hover:scale-105",
                isActive
                  ? "bg-[#1E6BA8] text-white shadow-md"
                  : "text-gray-700 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-white/10"
              )}
            >
              <span className="relative z-10">{productLine.name}</span>

              {/* Active indicator gradient */}
              {isActive && (
                <span
                  className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-[#406E8E] to-transparent opacity-50"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/**
 * Responsive wrapper that shows desktop nav on large screens,
 * dropdown on mobile
 */
export function BrandProductNavResponsive({
  brand,
  currentProductLine,
  className,
}: BrandProductNavProps) {
  return (
    <>
      {/* Desktop: Pill-shaped nav */}
      <div className="hidden lg:block">
        <BrandProductNav
          brand={brand}
          currentProductLine={currentProductLine}
          className={className}
        />
      </div>

      {/* Mobile: Dropdown */}
      <div className="block lg:hidden">
        <BrandProductNavMobile
          brand={brand}
          currentProductLine={currentProductLine}
        />
      </div>
    </>
  );
}
