// src/utils/fonts.ts
import { Manrope, Outfit, Dancing_Script } from "next/font/google";
import localFont from "next/font/local";

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  variable: "--font-outfit",
});

export const dancing = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-dancing",
});

export const horizon = localFont({
  src: "../../public/fonts/Horizon.otf",
  display: "swap",
  variable: "--font-horizon",
});
