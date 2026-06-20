# Contributing to Dear Dinanath

Thank you for helping grow this quiet library of Sanskrit and Vedic chants. The most valuable contribution you can make is adding a new chant, carefully transcribed and lovingly verified. This guide walks you through it from start to finish. No prior experience with the codebase is needed.

## What a chant is

Every chant is a single Markdown file living in the `posts/` directory:

```
posts/<slug>.md
```

The file has two parts: a block of YAML front matter (the structured data between the `---` lines at the top) and, optionally, a body of Markdown notes below it. The front matter is where the chant itself lives.

## The slug convention

The slug is the file name (without `.md`) and also the URL of the chant. Choose it with care, because it is meant to last.

- Use lowercase letters only.
- Separate words with single hyphens (kebab-case).
- Keep it descriptive and recognizable, transliterating the title.
- Avoid diacritics, spaces, and punctuation.

For example, the Aditya Hridaya Stotram becomes:

```
posts/aditya-hridaya-stotram.md
```

The `slug` field inside the front matter must match the file name exactly.

## Front matter template

Copy this template into your new file and fill it in. Every field is documented in the comments. Fields marked optional may be omitted entirely if they do not apply.

```yaml
---
title: "Aditya Hridaya Stotram"        # Human readable title, shown as the heading.
slug: "aditya-hridaya-stotram"         # Must match the file name. Lowercase kebab-case.
category: "Stotram"                     # Grouping on the index, e.g. Stotram, Suktam, Mantra, Upanishad.
deity: "Surya"                          # Optional. The deity the chant is addressed to.
source: "Ramayana, Yuddha Kanda"       # Optional. Where the text comes from, for trust and study.
order: 1                                 # Optional. A number to order chants within a category (ascending).
difficulty: "beginner"                  # Optional. One of: beginner, intermediate, advanced.
description: "A hymn to the Sun, taught to Rama before battle."  # One short sentence for previews and metadata.
verses:                                  # The heart of the file. A list of verses, each an item below.
  - devanagari: "ॐ नमो॒ भग॑वते"          # The verse with Vedic svara marks (udatta U+0951 ॑, anudatta U+0952 ॒).
    plain: "ॐ नमो भगवते"                 # The same verse without any svara marks, for plain reading.
    transliteration: "oṃ namo bhagavate" # IAST transliteration with proper diacritics.
    phonetic: "om namo bhagavate"        # Optional. A simple, approximate reading for newcomers.
    translation: "Om, salutations to the Lord."  # A faithful English translation.
    words:                               # Optional. A glossary for this verse, word by word.
      - word: "नमः"                      # The word in Devanagari (or transliteration).
        meaning: "salutation, obeisance" # Its meaning in English.
      - word: "भगवते"
        meaning: "to the Lord, the blessed one"
  # Add more verses by repeating the block above.
---

Optional Markdown notes go here, below the closing front matter line. Use this
space for context, the story behind the chant, or guidance on how it is recited.
```

### A note on the svara marks

Vedic chanting depends on tone, and the tone is written with two combining marks:

- Udatta (raised tone): U+0951, rendered as ॑
- Anudatta (lowered tone): U+0952, rendered as ॒

Place these in the `devanagari` field exactly as they appear in your source. The `plain` field should hold the very same text with these marks removed, so readers can choose between the marked and unmarked forms. The site renders the marked Devanagari with generous line spacing so the stacked tone marks are never clipped.

## A word on accuracy

These are sacred texts, and people will learn from what you write. Please verify three things against a reliable, printed or scholarly source before you submit:

1. The Devanagari spelling of every word.
2. The placement of the svara marks.
3. The meaning, both the per word glossary and the translation.

If you are unsure, it is better to omit a field than to guess. Corrections to existing chants are just as welcome as new ones. We would rather be slow and correct than quick and wrong.

## Working locally

You will need Node.js installed. Then:

```bash
npm install        # Install dependencies (run once).
npm run dev        # Start the development server.
```

Open http://localhost:1992 in your browser. Your new chant will appear in the index and at `/<slug>`. Read it aloud, check the layout, confirm the svara marks render cleanly, and proofread the translation.

When everything looks right, open a pull request with your new file. Describe the chant and cite the source you verified it against. We will read it with care and gratitude.

Welcome, and thank you for your patience and devotion to getting the details right.
