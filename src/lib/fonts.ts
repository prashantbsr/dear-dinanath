// Self-hosted, build-time-optimised fonts via next/font. Next subsets each font,
// emits woff2, preloads them, and exposes CSS variables consumed in globals.css.
// No layout shift, no runtime requests to Google. See design.md §3.

import {
  Bricolage_Grotesque,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Tiro_Devanagari_Sanskrit,
} from "next/font/google";

// Display / titling. An expressive contemporary grotesque for the wordmark,
// page and chant titles, and section + notes headings.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-bricolage",
});

// Text / UI. The whole English layer — body, translation, UI labels, and the
// IAST transliteration (italic). Full IAST diacritic coverage
// (ā ī ū ṛ ṝ ḷ ṅ ñ ṭ ḍ ṇ ś ṣ ḥ ṃ).
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-plex-sans",
});

// Mono labels. Eyebrows, group headings, the citation line, the size readout,
// and the svara-key label.
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

// Devanagari + Vedic script. Tiro Devanagari Sanskrit is purpose-built for
// Sanskrit: it carries the Vedic svara (tone) marks U+0951 ॑ and U+0952 ॒ and
// shapes traditional conjuncts correctly. This face is load-bearing and must not
// be swapped for one without full Vedic accent support.
export const tiroDeva = Tiro_Devanagari_Sanskrit({
  subsets: ["devanagari"],
  weight: ["400"],
  display: "swap",
  variable: "--font-tiro-deva",
  preload: true,
});
