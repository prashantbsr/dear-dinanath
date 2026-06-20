// Single source of truth for site-wide identity and links.
// Update `github` and `url` to your own before deploying.

export const site = {
  name: "Dear Dinanath",
  /** Devanagari rendering of the name, used as a quiet accent in the brand. */
  nameDevanagari: "दीनानाथ",
  tagline: "A quiet place to learn Sanskrit and Vedic chants.",
  description:
    "Learn to chant Sanskrit and Vedic hymns with accurate Devanagari, svara tone marks, transliteration, and word by word meaning. Fast, static, and open source.",
  url: "https://deardinanath.pages.dev",
  github: "https://github.com/prashant-bsr/dear-dinanath",
  locale: "en",
} as const;

export type Site = typeof site;
