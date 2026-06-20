// Content model for a chant. Each chant lives as one Markdown file in /posts
// with YAML front matter. Verses are authored as structured front matter so the
// reader UI can toggle script, transliteration, and meaning independently.

export type Difficulty = "beginner" | "intermediate" | "advanced";

/** A single Sanskrit word paired with its gloss, for word-by-word study. */
export interface Word {
  word: string;
  meaning: string;
}

/** One verse (shloka / mantra) with its parallel representations. */
export interface Verse {
  /** Devanagari with Vedic svara (tone) marks. */
  devanagari: string;
  /** Plain Devanagari without svara marks, for first reading. */
  plain?: string;
  /** Scholarly IAST transliteration. */
  transliteration: string;
  /** Simplified phonetic spelling for absolute beginners. */
  phonetic?: string;
  /** English translation of the verse. */
  translation: string;
  /** Optional word-by-word glosses. */
  words?: Word[];
}

/** Front matter metadata describing the chant. */
export interface PostMeta {
  title: string;
  slug: string;
  category: string;
  deity?: string;
  source?: string;
  description: string;
  difficulty?: Difficulty;
  order?: number;
}

/** A fully parsed chant: metadata + verses + optional prose notes. */
export interface Post extends PostMeta {
  verses: Verse[];
  /** Markdown notes that follow the front matter, if any. */
  body?: string;
}
