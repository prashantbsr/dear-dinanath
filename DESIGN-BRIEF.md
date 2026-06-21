# Design Brief — "Dear Dinanath" (Sanskrit / Vedic chant study site)

**Read this whole document before designing.** It is self-contained: you do not
have access to the codebase. Everything you need — the product, the content, the
exact screens, every interactive state, the data, and the constraints — is here.

---

## 0. TL;DR — what I'm asking you to do

Design and build an **interactive, clickable UI prototype** for a small website
where people learn to chant Sanskrit / Vedic hymns. It is a calm, text-first
*reading and study* tool, not a media app.

- Deliver it as a **single self-contained artifact** (React in one file, or
  HTML+CSS+JS in one file) that I can open and click through.
- It must cover **every screen and every interactive state** listed in §6–§8.
- All interactions must actually work: theme toggle, the reader's show/hide
  toggles, the script switch, and the text-size stepper.
- Use the **sample content in §5** so the screens look real.
- The output will be **re-implemented by me in a real Next.js + React +
  Tailwind v4 codebase**, so keep it implementable (see §3 constraints) and
  expose your design decisions as **named tokens** (see §9 + §10) so I can port
  them 1:1.

There is an existing implementation I'm replacing because the visual design
isn't working. **You own the visual language** — concept, palette, type pairing,
layout, motion. §9 gives you the *feeling* to hit and the hard guardrails; the
look itself is yours to define. The **functional spec (§4–§8) and the Sanskrit
correctness rules (§11) are fixed** and must not change.

---

## 1. The product

**Dinanath** is a free, open-source website for learning to chant Sanskrit
and Vedic hymns accurately.

- **Tagline:** "A quiet place to learn Sanskrit and Vedic chants."
- **Audience:** anyone learning to chant — from absolute beginners who can't read
  Devanagari, to serious students who want the Vedic tone marks exactly right.
- **The core job:** let a person sit with one hymn and study it at their own
  pace — read the Devanagari (with its tone marks), follow a transliteration,
  and understand the meaning word by word, until the chant settles into memory.
- **Tone:** unhurried, reverent, uncluttered. "A quiet study at dawn." This is a
  place to *concentrate*, not to be entertained or converted. No gamification, no
  social features, no ads, no popups, no hero imagery of deities.

It is content-driven: each hymn ("chant") is one structured document. There is
no login, no backend, no user accounts — it's a static site.

---

## 2. Why the design matters here (domain primer — read this)

Chanting accuracy depends on details a typical designer would flatten. Please
internalize these; they drive real layout decisions.

- **Devanagari** is the script Sanskrit is written in (e.g. `गणपतिं`). It needs a
  proper Devanagari serif font; Latin fonts can't render it.
- **Svara (tone) marks** are the heart of *Vedic* chant. Vedic recitation moves
  across **three pitch registers**, and two of them are written as small marks
  **above and below** the syllable:
  - **udātta** (raised tone) — a mark **above** the line: `◌॑`
  - **anudātta** (lowered tone) — a mark **below** the line: `◌॒`
  - (the third, *svarita*, sits on the baseline)
  - **Design consequence:** chant lines need **generous line-height** so these
    above/below marks never clip or collide with the next line. This is
    non-negotiable, and it must still hold at the largest text size. Treat the
    vertical breathing room around a chant line as load-bearing, not decorative.
- **IAST** is the scholarly romanized transliteration with diacritics
  (e.g. `gaṇapatiṃ`, `śṛṇvann`, `ūtibhiḥ`). Your **Latin text font must include
  these diacritics**: ā ī ū ṛ ṝ ḷ ṅ ñ ṭ ḍ ṇ ś ṣ ḥ ṃ. Verify before you commit
  to a typeface.
- **Plain vs accented Devanagari:** the same verse exists in two forms — *plain*
  (no svara marks, easier first read) and *accented* (with the svara marks, for
  studying the tones). The reader can switch between them.
- A few terms you'll see: **shloka / mantra / verse** = one unit of the hymn;
  **pada** = a metrical line within a verse; **Vandana** = an invocation;
  **Suktam / Stotram / Shanti Mantra** = categories of hymns.

You do **not** need to understand the meaning of any Sanskrit — just respect the
structure and never let styling break the script (see §11).

---

## 3. Technical constraints that bound your design

I will port your design into this stack, so please stay within it:

- **Next.js (App Router) static export + React + TypeScript.** No server at
  runtime — everything is prerendered HTML/CSS/JS. No backend calls.
- **Tailwind v4, CSS-first** (design tokens declared as CSS custom properties,
  consumed via utilities). So: express your system as **tokens** (color/space/
  type/radius), not one-off magic numbers.
- **Fonts:** self-hosted at build time via `next/font/google`. So please pick
  fonts that are **available on Google Fonts** (or are common system fonts).
  Name exactly which families + weights you use. Avoid paid/exotic fonts.
- **No heavy dependencies.** No animation libraries, no UI kits, no icon fonts.
  Inline SVG for the few icons. Everything must be expressible in plain
  CSS / Tailwind utilities.
- **Light + dark themes**, class-based (`.dark` on `<html>`). You must provide
  values for **both** themes for every color token.
- **Performance & privacy are features:** fast, static, no third-party runtime
  requests. Keep motion cheap (CSS only) and assets minimal.
- **Accessibility AA is a floor, not a nice-to-have** (see §12).

---

## 4. Behavior model (FIXED — the functional truth)

This is the exact interactive behavior. Style it however you like; do not change
what it does.

### 4.1 Theme

- Two themes: **light (default)** and **dark**.
- **First-time visitors always get light**, regardless of OS setting. Dark is an
  **explicit opt-in** only.
- A **theme toggle** button switches them; the choice persists across visits
  (stored locally) and applies instantly with **no flash of the wrong theme** on
  load.
- The toggle is a single icon button: a sun (when in light, i.e. "switch to
  dark") / a crescent moon (when in dark). It needs an accessible label that
  reflects the action, and `aria-pressed`.

### 4.2 Reader display preferences (the heart of the app)

On a chant page, the reader controls how much apparatus is shown. **All of these
persist locally and restore on the next visit.** Defaults:

| Preference            | Type            | Default     | Range / values            |
| --------------------- | --------------- | ----------- | ------------------------- |
| `scriptMode`          | enum            | `accented`  | `accented` \| `plain`     |
| `showTransliteration` | boolean         | `true`      | on / off                  |
| `showTranslation`     | boolean         | `true`      | on / off                  |
| `showWords`           | boolean         | `false`     | on / off                  |
| `fontScale`           | number          | `1.0`       | `0.85`–`1.6`, step `0.1`  |

- **`scriptMode`** — `accented` shows Devanagari **with** svara marks; `plain`
  shows it **without**. (If a verse has no separate plain form, plain falls back
  to the accented text.)
- **`showTransliteration`** — show/hide the IAST line (and the optional simple
  phonetic line) under each verse.
- **`showTranslation`** — show/hide the English meaning under each verse.
- **`showWords`** — show/hide the word-by-word glosses for each verse.
- **`fontScale`** — A− / A+ steppers that **scale the Devanagari chant text**
  (the hero line) from 85% to 160% in 10% steps. Show the current value as a
  percentage (e.g. "120%"). A− is disabled at 85%, A+ disabled at 160%. Steps
  are **instant** (no animation — like adjusting a lens). The English apparatus
  size stays fixed; only the chant scales.
- When `scriptMode = accented`, a one-line **svara key** legend is shown once
  above the verses, teaching the two marks (see §7.3). It is hidden in plain
  mode.

### 4.3 Persistence summary

- Theme choice → persists.
- The five reader preferences above → persist together.
- Nothing else has state. No routing state, no filters, no search (v1).

---

## 5. The content model + real sample data

Each chant is one document with metadata + an ordered list of verses + optional
prose notes. **Use this exact shape.** Build your screens with the real sample
below so they look authentic.

### 5.1 Schema

```
Chant {
  title:        string            // e.g. "Ganapati Vandana"
  slug:         string            // url id, e.g. "ganapati-vandana"
  category:     string            // groups chants on the index, e.g. "Vandana"
  deity?:       string            // e.g. "Ganapati"            (optional)
  source?:      string            // e.g. "Rigveda 2.23.1"      (optional)
  description:  string            // 1–2 sentence summary
  difficulty?:  "beginner" | "intermediate" | "advanced"   (optional)
  verses:       Verse[]           // ordered
  notes?:       string (markdown) // optional prose after the verses
}

Verse {
  devanagari:       string   // Devanagari WITH svara marks (multi-line; \n between padas)
  plain?:           string   // Devanagari WITHOUT svara marks (optional)
  transliteration:  string   // IAST, italic line(s)
  phonetic?:        string   // simplified ascii phonetics for beginners (optional)
  translation:      string   // English meaning
  words?:           { word: string; meaning: string }[]   // word-by-word glosses (optional)
}
```

Notes:
- A verse can be **multiple lines** (padas). Devanagari padas traditionally end
  with `।` (single danda) or `॥` (double danda). Preserve line breaks.
- `words[].word` is Devanagari; `words[].meaning` is English.
- `notes` is markdown (headings, paragraphs, ordered/unordered lists, bold,
  links). Render it as quiet prose at the bottom of the chant page.

### 5.2 Real sample chant (use this verbatim on the reader screen)

```yaml
title: Ganapati Vandana
slug: ganapati-vandana
category: Vandana
deity: Ganapati
source: Rigveda 2.23.1
difficulty: beginner
description: >
  The Rigvedic invocation to Ganapati, lord of the hosts, traditionally chanted
  before any recitation or ceremony to invoke auspiciousness and remove obstacles.
verses:
  - devanagari: |
      ग॒णानां॑ त्वा ग॒णप॑तिं हवामहे क॒विं क॑वी॒नामु॑प॒मश्र॑वस्तमम् ।
      ज्ये॒ष्ठ॒राजं॒ ब्रह्म॑णां ब्रह्मणस्पत॒ आ नः॑ शृ॒ण्वन्नू॒तिभिः॑ सीद॒ साद॑नम् ॥
    plain: |
      गणानां त्वा गणपतिं हवामहे कविं कवीनामुपमश्रवस्तमम् ।
      ज्येष्ठराजं ब्रह्मणां ब्रह्मणस्पत आ नः शृण्वन्नूतिभिः सीद सादनम् ॥
    transliteration: |
      gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnām upamaśravastamam |
      jyeṣṭharājaṃ brahmaṇāṃ brahmaṇaspata ā naḥ śṛṇvann ūtibhiḥ sīda sādanam ||
    phonetic: |
      gananam tva ganapatim havamahe, kavim kavinam upama-shravas-tamam;
      jyeshtha-rajam brahmanam brahmanaspata, aa nah shrinvann utibhih sida sadanam.
    translation: >
      We invoke you, O Ganapati, lord of the hosts, the seer among seers, most
      renowned, the supreme king of sacred prayers. O Brahmanaspati, hearing us,
      come with your protections and be seated at our place of worship.
    words:
      - { word: गणानाम्,        meaning: "of the ganas (hosts, attendant multitudes)" }
      - { word: त्वा,           meaning: "you" }
      - { word: गणपतिम्,        meaning: "Ganapati, the lord of the ganas" }
      - { word: हवामहे,         meaning: "we invoke, we call upon" }
      - { word: कविम्,          meaning: "the seer, the wise one" }
      - { word: कवीनाम्,        meaning: "among the seers" }
      - { word: उपमश्रवस्तमम्,  meaning: "of unequalled fame, most renowned" }
      - { word: ज्येष्ठराजम्,   meaning: "the eldest king, the supreme ruler" }
      - { word: ब्रह्मणाम्,     meaning: "of the sacred prayers" }
      - { word: ब्रह्मणस्पते,   meaning: "O Brahmanaspati, lord of sacred speech" }
      - { word: आ,             meaning: "hither, come" }
      - { word: नः,            meaning: "to us, our" }
      - { word: शृण्वन्,        meaning: "hearing, listening" }
      - { word: ऊतिभिः,        meaning: "with your protections and helps" }
      - { word: सीद,           meaning: "be seated, sit" }
      - { word: सादनम्,        meaning: "at the seat, the place of worship" }
notes: |
  ## About this chant
  This verse (Rigveda 2.23.1) is one of the most widely chanted invocations to
  Ganapati, here addressed as **Brahmanaspati**, the lord of sacred speech.

  ### How to practise
  1. Read the plain Devanagari first to learn the syllables.
  2. Switch on the accented (svara) view to study the Vedic tone marks.
  3. Chant slowly, one word at a time, then join the words into the full verse.
```

> For a realistic reader, **duplicate this verse 2–3 times** so the page shows
> multiple verses with the left-gutter numbering (१, २, ३…). That's fine for the
> prototype.

### 5.3 Sample index data (use these rows on the home page)

The home page groups chants **by `category`**. One real entry + illustrative
placeholders so you can design the grouped list:

| Category      | Title              | Deity / Source             | Difficulty   |
| ------------- | ------------------ | -------------------------- | ------------ |
| Vandana       | Ganapati Vandana   | Ganapati · Rigveda 2.23.1  | beginner     |
| Vandana       | Guru Vandana       | —                          | beginner     |
| Shanti Mantra | Saha Nāvavatu      | Taittirīya Upaniṣad        | beginner     |
| Shanti Mantra | Asato Mā Sad Gamaya| Bṛhadāraṇyaka Upaniṣad     | intermediate |
| Suktam        | Puruṣa Sūktam      | Rigveda 10.90              | advanced     |
| Suktam        | Śrī Sūktam         | Lakṣmī                     | advanced     |

Each index row should also be able to show a **one-line Devanagari "peek"** of
the chant's opening (e.g. `गणानां त्वा गणपतिं हवामहे…`).

---

## 6. Screens / information architecture

There are four screens. Every page shares a **header** (§8.1) and **footer**
(§8.2), and one shared centered content column so all left edges align.

| Route               | Screen          | Purpose                                            |
| ------------------- | --------------- | -------------------------------------------------- |
| `/`                 | Home / Index    | Browse all chants, grouped by category             |
| `/chants/{slug}`    | Chant Reader    | Study one chant (the core screen)                  |
| `/about`            | About           | What the project is, why, how content works        |
| `/(404)`            | Not Found       | Friendly wandered-off page back to the chants       |

### 6.1 Home / Index

- A short, centered intro block: the site name (you may show a small Devanagari
  accent of it, `दीनानाथ`, decoratively — `aria-hidden`), the tagline, a 1–2
  sentence description, and a quiet count line ("6 chants to study").
- Then chants **grouped by category**, each group with a heading, listed as
  scannable rows/cards. Each entry links to its reader page and shows: title,
  an orienting metadata line (deity / source / difficulty), the short
  description, and optionally the one-line Devanagari peek.
- Design the entry as a calm, **low-chrome list item**, not a busy card with
  shadows. Hover/focus should feel light.

### 6.2 Chant Reader (`/chants/{slug}`) — the core screen

Top to bottom:

1. A back link to "All chants".
2. **Header block:** the chant **title** (the big display moment of the page), a
   **metadata / citation line** (source · deity · category · difficulty — only
   the fields that exist, joined cleanly), and the **description**.
3. **The display controls strip** (§7.1) — sticky.
4. **Svara key** (§7.3) — only when `scriptMode = accented`. 
5. **The verses** (§7.2), in order, each numbered, with the apparatus shown
   per the current preferences.
6. **Prose notes** (§7.4), if present.

### 6.3 About

A simple long-form reading page (single column, comfortable measure): a header
with the site name + tagline, then a few short sections (e.g. "A quiet place to
learn", "Why it exists", "How the content works", "The technology", "A note on
accuracy"), with a couple of links to the GitHub repo. Pure typography. You can
lorem-fill the body, but keep the section structure.

### 6.4 Not Found (404)

Centered, calm: a small auspicious mark (e.g. `ॐ`, `aria-hidden`), a friendly
line ("This page seems to have wandered off."), a sentence of reassurance, and a
button back to the chants.

---

## 7. Reader components (specs)

### 7.1 Display controls strip

- One **thin sticky strip** that sticks **directly beneath the site header**
  (its sticky offset = the header's height; they must not overlap or gap).
- Three labeled groups:
  - **SCRIPT:** `Accented` · `Plain` (mutually exclusive)
  - **SHOW:** `Transliteration` · `Meaning` · `Words` (independent toggles)
  - **SIZE:** `A−` `[120%]` `A+`
- **Active vs inactive state must NOT be color-only** (accessibility). Use a
  clear non-color cue (e.g. weight shift + an underline/marker) in addition to
  any color change. No big filled pills.
- Touch targets: toggles **≥44px tall**, size steppers **≥40px**.
- On mobile it **wraps to stacked rows**, keeping the group labels visible.

### 7.2 Verse

For each verse, in order:

- A **verse number** in the left gutter (show it in Devanagari numerals — १, २,
  ३ — with an `sr-only` "Verse 1" for screen readers).
- The **Devanagari** line(s) — this is the **hero**: largest, most prominent,
  generous line-height (svara marks must never clip), `lang="sa"`. Scales with
  `fontScale`. Preserve line breaks between padas.
- Then, only if their toggles are on, each on its own row, aligned to a shared
  left edge under the Devanagari:
  - **IAST transliteration** — visually distinct as "a reading of" the script
    (convention: *italic*). Plus the optional simple phonetic line beneath it,
    quieter.
  - **Translation** — the English meaning, comfortable reading size.
  - **Word-by-word glosses** — a list of {Devanagari word → English meaning}
    pairs. On wide screens this can be two columns; stacked on mobile. Each pair
    should read as a tidy unit.
- When a row appears (toggled on), a small, cheap reveal animation is welcome
  (fade + slight rise), gated by reduced-motion. Optional.

### 7.3 Svara key (legend)

Shown once above the verses **only in accented mode**. Real text, e.g.:

> `◌॑` udātta — raised · `◌॒` anudātta — lowered

Marks rendered in the Devanagari font; labels in your text font, quiet.

### 7.4 Prose notes

If the chant has `notes`, render the markdown as quiet prose at the bottom,
visually set apart from the verses (e.g. a subtle separation/onset). Headings in
your display face; links in the accent color.

---

## 8. Global components

### 8.1 Site header

- A **thin sticky strip** with a 1px bottom hairline. Left: the wordmark "Dear
  Dinanath" (your display face), optionally with a small Devanagari accent.
  Right: a quiet text nav (`Chants` · `About`), a **GitHub** icon link (inline
  SVG), and the **theme toggle** (§4.1).
- No drop shadow. Keep it calm. Define its height as a token — the controls
  strip depends on it.

### 8.2 Site footer

- A thin strip with a 1px top hairline. The wordmark, the license note
  ("Open source under the MIT license" + a "View the source on GitHub" link),
  and a one-line svara legend echo (`॑ above · ॒ below`). Quiet, muted.

### 8.3 Theme toggle

Single icon button: sun (in light) / crescent (in dark). 2px-ish radius, a
gentle hover, a visible focus ring, `aria-pressed`, action-describing
`aria-label`. Before hydration it can render as an inert placeholder of the same
size (to avoid layout shift / hydration mismatch) — you don't need to model
that, just keep the footprint stable.

---

## 9. Design direction (yours to own) + guardrails

**The feeling to hit:** a quiet study at dawn — unhurried, reverent, legible,
free of clutter. The content is sacred-adjacent and the user is concentrating.
The design should feel like a considered *reading instrument*, not a consumer
app or a flashy "spiritual" landing page.

**You have full creative control over:** the concept/metaphor, the color
palette (within the role system in §10), the type pairing, layout, density,
the shape of list items, iconography, and the (minimal) motion.

**Hard guardrails (do not cross):**

- **Text-first, image-light.** No deity photography, no stock spirituality, no
  background images behind text. Typography and space do the work.
- **Calm, not loud.** Restrained accent use; one accent color doing the
  emphasis, not a rainbow. No neon, no heavy gradients, no glassmorphism.
- **Low chrome.** Prefer hairlines + tone + whitespace over heavy borders and
  drop shadows. Rounded-everything "card UI" is the wrong register here.
- **Readability over cleverness.** The Devanagari and the translation must be
  effortless to read. Generous measure for prose (~60–70ch), generous
  line-height for the chant.
- **Motion is almost nothing** and always purposeful; everything must collapse
  to instant under `prefers-reduced-motion`.
- **Two full themes.** Dark mode must be genuinely comfortable for long reading,
  not just inverted.

**Anti-patterns to avoid:** busy cards with shadows; a geometric "techy" UI sans
for everything; color as the only state indicator; tiny low-contrast metadata;
decorative svara marks that clip; centered long paragraphs.

---

## 10. Token system to deliver (so I can port it)

Please express your design as these tokens and **give a value per theme** for
every color. (Values below are *illustrative placeholders* from the old build —
**replace them with your own**; I include them only to show the shape and the
role each token plays.)

### 10.1 Color roles (provide light + dark values for each)

| Token         | Role                                                          |
| ------------- | ------------------------------------------------------------ |
| `canvas`      | page background                                              |
| `surface`     | slightly lifted surface (control strip, notes, footer)      |
| `surface-2`   | recessed fill (e.g. word-gloss cells, hover wash base)      |
| `ink`         | primary text                                                |
| `muted`       | secondary text — metadata, IAST, gloss meanings             |
| `line`        | hairlines / borders                                         |
| `accent`      | links, active state, emphasis                               |
| `accent-soft` | secondary accent / hover wash                               |
| `secondary`   | one cool secondary note (used e.g. on the svara key marks)  |
| `ring`        | focus ring                                                  |
| *(optional)*  | any extra you need (e.g. a single "precious" metal note)    |

Constraints on the palette:
- **`muted` text must pass WCAG AA** on `canvas` (≥4.5:1) at the sizes it's used.
  Don't use muted for text below ~0.9rem; promote to `ink`.
- **`accent` as text must pass AA** on `canvas`.
- If any token is too light to carry text (a metallic/decorative color), it must
  be used as **fill/ornament only**, never for text.

### 10.2 Type roles (name the actual families + weights)

Provide a concrete typeface (Google-Fonts-available) and the scale for each:

| Role          | Used for                                              |
| ------------- | ---------------------------------------------------- |
| Display       | chant title, wordmark, section + notes headings      |
| Text          | everything else English (body, translation, IAST, UI)|
| Devanagari    | all Devanagari + svara marks (must carry ॑ ॒)         |

- The **Devanagari face must support the Devanagari Unicode block incl. the
  Vedic svara marks U+0951 (॑) and U+0952 (॒)**. `Noto Serif Devanagari` is a
  safe choice; name your pick.
- The **Text face must include full IAST diacritics** (see §2).
- Give a **type scale**: title, section heading, eyebrow/label, chant (the
  scalable hero), translation, IAST (italic), gloss word, gloss meaning, prose,
  UI label, folio numeral — each with size, weight, tracking, line-height.

### 10.3 Other tokens

- **Spacing scale** (suggest a 4px base) and the key gaps (verse-to-verse,
  apparatus row spacing).
- **Radius** scale (this design wants near-flat; name the values).
- **Shared measure** (content column max-width) and the prose measure (~62ch).
- **Header height** (the controls strip sticks below it).
- **Chant display size** as a single responsive token that `fontScale`
  multiplies.
- **Motion** durations/easings for: any reveal, the theme cross-fade, and a note
  that font-size steps are instant.

---

## 11. Sanskrit correctness rules (NON-NEGOTIABLE)

These protect the content; violating them makes the site wrong, not just ugly.

1. **Never clip svara marks.** Reserve a full register above and below every
   chant line (generous line-height), and it must still hold at the **1.6× max
   text size**.
2. **Do not recolor or wrap individual svara marks.** ॑ and ॒ are *combining*
   characters; splitting them into spans to tint them **breaks Devanagari
   shaping**. If you want to teach the marks, do it via the separate **svara
   key** and via the accented/plain toggle — keep the actual chant glyphs one
   solid ink color.
3. **Devanagari only in the Devanagari font.** Never let it fall back to a Latin
   font. Always mark it `lang="sa"`.
4. **Preserve line breaks** between padas in both the Devanagari and the IAST.
5. **IAST is italic; translation/notes/UI are upright.** Italic specifically
   signals "transliteration."
6. **Decorative Devanagari** (the wordmark accent, the `ॐ` on 404) must be
   `aria-hidden` so screen readers don't mispronounce it; meaningful Devanagari
   stays exposed with `lang="sa"`.

---

## 12. Accessibility floor (always)

- WCAG **AA** text contrast in both themes (see §10.1).
- **State is never conveyed by color alone** (toggles need a shape/weight cue).
- **Visible keyboard focus** on every interactive element (a clear focus ring,
  offset).
- Real semantic elements: `<button>`/`<a>`, landmarks (`header`/`main`/
  `footer`/`nav`), `aria-pressed` on toggles, accessible labels on icon-only
  controls.
- `prefers-reduced-motion: reduce` collapses **every** transition/animation to
  instant.
- Honors text zoom; layout reflows cleanly; touch targets ≥44px for primary
  toggles.

---

## 13. Responsive

- **Mobile-first.** Single column throughout.
- The **controls strip wraps to stacked rows** on narrow screens, group labels
  retained.
- **Word glosses**: two columns on wide, single column on mobile.
- The chant line should hold long padas gracefully — allow it the full content
  width; wrap rather than overflow.
- Sticky header + sticky controls must behave on mobile (no overlap, no jump).

---

## 14. Deliverable & acceptance checklist

**Form:** one self-contained, runnable artifact (single-file React or
HTML/CSS/JS). Standard CSS/Tailwind-expressible styling only. Inline SVG icons.
Google-Fonts / system fonts only. Include a short **token legend** (the §10
values you chose, light + dark) so I can lift them straight into Tailwind.

**It must demonstrate ALL of these states (this is how "no doubt" is verified):**

- [ ] Home / index, in **light** and **dark**, showing category groups + rows.
- [ ] Chant reader with the §5.2 sample (≥2 verses), in light and dark.
- [ ] Reader with **Accented** script (svara marks visible + svara key shown).
- [ ] Reader with **Plain** script (no marks, svara key hidden).
- [ ] Each SHOW toggle **on and off**: Transliteration, Meaning, Words —
      including the "all off" state (Devanagari only) and "all on" state.
- [ ] Font size at **min (85%, A− disabled)**, **default (100%)**, and
      **max (160%, A+ disabled)**, proving marks don't clip at max.
- [ ] Working **theme toggle** (sun/moon, no flash, persists conceptually).
- [ ] Prose notes block rendered.
- [ ] About page and 404 page.
- [ ] Header + footer on every screen; controls strip sticky under the header.
- [ ] Mobile layout for the reader (stacked controls, single-column glosses).
- [ ] Visible focus states and a note confirming reduced-motion behavior.

**Hand back to me:** the artifact + the token legend (§10) + the exact font
families/weights + any notes on decisions you made where this brief left a
choice open. I'll re-implement it in the real codebase.

---

*End of brief. If anything here is ambiguous, prefer the calmer, more legible,
more accessible option — and note the assumption in your handoff.*
