// Self-hosted, build-time-optimised fonts via next/font. Next subsets each font,
// emits woff2, preloads them, and exposes CSS variables consumed in globals.css.
// No layout shift, no runtime requests to Google.

import { Inter, Noto_Serif_Devanagari } from "next/font/google";

// UI / Latin text.
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Devanagari + Vedic script. The "devanagari" subset covers the Devanagari
// Unicode block, including the svara (tone) marks U+0951 and U+0952 used for
// Vedic accentuation.
export const notoDeva = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-deva",
  preload: true,
});
