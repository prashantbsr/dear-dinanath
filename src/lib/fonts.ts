// Self-hosted, build-time-optimised fonts via next/font. Next subsets each font,
// emits woff2, preloads them, and exposes CSS variables consumed in globals.css.
// No layout shift, no runtime requests to Google. See design.md §3.

import { Marcellus, Spectral, Noto_Serif_Devanagari } from "next/font/google";

// Display / titling. A Roman-inscriptional capital face for the chant title and
// wordmark — "copied onto a title leaf", not "typed into an app". Single weight.
export const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-marcellus",
});

// Text. One contemplative serif for the entire English layer — body, translation,
// IAST (italic), UI labels. Engineered for on-screen reading, full IAST diacritic
// coverage (ā ṇ ṛ ṣ ḥ ṃ).
export const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-spectral",
});

// Devanagari + Vedic script. The "devanagari" subset covers the Devanagari
// Unicode block, including the svara (tone) marks U+0951 and U+0952 used for
// Vedic accentuation. This face is load-bearing and must not be swapped.
export const notoDeva = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-noto-deva",
  preload: true,
});
