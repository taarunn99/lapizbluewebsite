import { Cormorant_Garamond } from "next/font/google";

/**
 * The four Kalinga Stone line pages are set in the gcbuae.com family:
 * Cormorant Garamond for the headlines, Manrope (already loaded by the root
 * layout) for the body. The serif loads once here, scoped to this segment,
 * and is exposed as --font-cormorant on the wrapper. The root layout stays
 * untouched.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-cormorant",
});

export default function KalingaLineLayout({ children }: { children: React.ReactNode }) {
  return <div className={cormorant.variable}>{children}</div>;
}
