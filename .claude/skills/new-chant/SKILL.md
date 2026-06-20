---
name: new-chant
description: Scaffold a new chant file under posts/<slug>.md with all front-matter fields and a verse stub. Use when the user asks to add a new chant, create a chant file, or start a new posts/ entry.
disable-model-invocation: true
---

Scaffold a new chant file. Argument: the chant slug (lowercase kebab-case, no diacritics). If `$ARGUMENTS` is empty, ask the user for the slug first.

## Steps

1. Confirm the slug:
   - lowercase kebab-case, ASCII letters and `-` only
   - the file `posts/<slug>.md` does not already exist
   - if either check fails, stop and ask the user
2. Ask the user for:
   - Display **title** (e.g. "Ganapati Vandana")
   - **category** (e.g. "Vandana", "Stotra")
   - **source** — printed scriptural reference (e.g. "Rigveda 2.23.1"). This is **required** by team policy even though the type marks it optional. Do not proceed without one.
   - Optional: deity, difficulty (`beginner` / `intermediate` / `advanced`), order
3. Write the file to `posts/<slug>.md` using the template below. Use the slug they confirmed; do not invent the verse content — leave the stubs for the user to fill in. Never auto-generate Devanagari, transliteration, or translations. The user (or a cited printed source) is the authority.
4. Remind the user that:
   - The Vedic svara marks (`U+0951` ॑ udatta, `U+0952` ॒ anudatta) must be transcribed from the cited source exactly.
   - `slug` in front matter must match the filename.

## Template

```markdown
---
title: <TITLE>
slug: <SLUG>
category: <CATEGORY>
deity: <DEITY or remove this line>
source: <PRINTED SOURCE — REQUIRED>
difficulty: <beginner|intermediate|advanced or remove>
order: <NUMBER or remove>
description: >-
  <One- or two-sentence summary used on listings and metadata.>
verses:
  - devanagari: |
      <Devanagari with svara marks — copy faithfully from the cited source>
    plain: |
      <Optional: same line(s) without svara marks>
    transliteration: |
      <IAST transliteration>
    phonetic: |
      <Optional: simple phonetic spelling for newcomers>
    translation: >-
      <English translation>
    words:
      - { word: <devanagari word>, meaning: "<gloss>" }
---

## About this chant

<Optional prose notes that render below the verses.>
```

After writing, do not run typecheck/lint — there's no code change. Just tell the user the file is ready to fill in.
