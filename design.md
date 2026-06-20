# Design System — Dear Dinanath

> A quiet study at dawn: unhurried, reverent, free of clutter.

This is the single source of truth for how Dear Dinanath looks and feels. Every
color, type, and spacing decision below is implemented as a token in
[`src/app/globals.css`](src/app/globals.css) and consumed through Tailwind v4
utilities. Change a value here and in `globals.css` together — never hard-code a
color or size in a component.

---

## 1. Concept — the Pothi (palm-leaf manuscript)

The page is **one continuous leaf, not a stack of cards.** Vedic recitation
lives on three registers — *udatta* (॑, above the line), the syllable on the
baseline, and *anudatta* (॒, below the line) — and the design treats that
vertical breathing room as sacred: it is the whole reason the chant line-height
is so generous.

Everything is held quiet so one idea can carry the identity:

- **Signature — the Binding Thread.** A palm-leaf manuscript (*pothi*) is bound
  by a single cord threaded through a hole on the left of every leaf. We draw
  that cord: a continuous 1px vertical hairline runs down the left gutter of the
  reader, and a small brass **granthi** (a rotated-square knot, ◆) marks each
  verse beside its **Devanagari folio numeral** (१, २, ३…). The thread is the
  one memorable element; the rest of the page is unruled.
- **One serif voice.** A *pothi* has no separate "UI" hand — scribe, gloss, and
  rubric are one hand. So all English is set in one contemplative serif, never a
  geometric UI sans. This is the biggest departure from the old design.
- **The subject's own pigments.** Toasted palm-leaf ochre, oxidized kumkum
  maroon for emphasis, brass for the single precious touch, a quiet leaf-green
  for one cool note. Saffron is present but demoted — it is a pigment here, not a
  brand splash.

### Two deliberate robustness edits (vs. the original concept exploration)

The concept was pressure-tested with a four-direction design panel. Two of the
winning direction's flourishes were **rejected for robustness** — this project
values "minimalism with robustness" over fragile cleverness:

1. **No horizontal thread masked behind the glyphs.** Verses wrap to multiple
   *pada* lines and Devanagari carries marks above *and* below the baseline, so a
   single baseline rule faded under the glyphs is fragile and ambiguous. The
   thread is instead **vertical, in the left gutter** — which is also the more
   authentic form (the binding cord runs vertically through the stack of leaves).
2. **No per-character recoloring of svara marks.** ॑ and ॒ are *combining*
   characters; wrapping them in spans to tint them breaks Devanagari shaping. The
   three-register idea is carried by line-height, the accented/plain toggle, and
   an explicit **svara key** instead. Baseline glyphs stay pure ink.

---

## 2. Color tokens

Light is the **default** theme. Dark is an explicit opt-in (`.dark` on `<html>`).
First-time visitors always get light, regardless of OS setting.

| Token         | Role                                                            | Light       | Dark        |
| ------------- | -------------------------------------------------------------- | ----------- | ----------- |
| `canvas`      | the leaf — page background                                      | `#efe6cf`   | `#171109`   |
| `surface`     | barely-lifted leaf — control strip, notes block, footer        | `#f6f0df`   | `#1f1810`   |
| `surface-2`   | recessed fill — word-gloss cells, hover wash base              | `#e6dabb`   | `#2a2015`   |
| `ink`         | primary text                                                    | `#2a2014`   | `#ece1c8`   |
| `muted`       | metadata, IAST, gloss meanings (only ≥ 0.9rem)                 | `#6c5d44`   | `#a8967a`   |
| `line`        | the thread and every hairline                                  | `#cdbd98`   | `#3a2e1e`   |
| `accent`      | kumkum maroon — links, active state, granthi, selection        | `#8a3324`   | `#cf6b4a`   |
| `accent-soft` | burnt saffron — hover washes + faint citation separators       | `#b9714b`   | `#9a5236`   |
| `gold`        | brass — granthi knot fill only, never text                     | `#9a7411`   | `#d7a93b`   |
| `secondary`   | leaf-green — the svara-key marks (the page's one cool note)     | `#5c6b3a`   | `#9aa86a`   |
| `ring`        | focus ring (= accent)                                           | `#8a3324`   | `#cf6b4a`   |

**Contrast (WCAG):** ink on canvas ≈ 9.8:1 (light) / 13:1 (dark); muted on
canvas ≈ 4.8:1 / 5.6:1 (AA for normal text — never use muted below 0.9rem,
promote to ink); accent text ≈ 5.6:1 / 6.2:1 (AA). **Gold never carries text**
(fails AA) — knot fill only. State is never color-only: the active control uses
an underline + a green dot in addition to the ink/muted shift.

---

## 3. Typography

Three roles, deliberately paired. All faces are self-hosted at build time via
`next/font/google` (zero runtime third-party requests — a privacy value).

| Role     | Face                       | Used for                                                       |
| -------- | -------------------------- | ------------------------------------------------------------- |
| Display  | **Marcellus** (400)        | chant title, site wordmark, section + notes headings           |
| Text     | **Spectral** (400/500/600) | everything else English: body, translation, IAST, UI labels   |
| Chant    | **Noto Serif Devanagari**  | all Devanagari + the svara marks (fixed — carries ॑ ॒)         |

*Why Marcellus + Spectral.* Marcellus is a Roman-inscriptional titling face — it
reads as "copied onto a title leaf," not "typed into an app," and its narrow
incised caps sit calmly above Devanagari. Spectral is engineered for sustained
on-screen reading and has full IAST diacritic coverage (ā ṇ ṛ ṣ ḥ ṃ). One serif
hand for the whole English layer removes the old "techy" Inter tell.

*Italic* is reserved for **IAST transliteration only** — it marks the romanized
line as "a reading of" the Devanagari. Translation, notes, and UI stay upright.

### Type scale (role / size / weight / tracking)

```
title        clamp(1.9rem, 1.4rem + 2.4vw, 3rem)   Marcellus 400   +0.01em   lh 1.12
section      1.25rem                                 Marcellus 400             lh 1.3
eyebrow      0.78rem  uppercase                      Spectral 500    +0.14em   (source-line, "About this chant")
chant        clamp(1.55rem, 1.05rem + 2.4vw, 2.5rem) Noto Serif Dev 500       lh 2.1   (× fontScale)
translation  1.075rem                                Spectral 400              lh 1.78   ink
iast         1.05rem  italic                         Spectral 400              lh 1.7    muted
gloss-deva   1.15rem                                 Noto Serif Dev 500        ink
gloss-mean   0.9rem                                  Spectral 400              lh 1.5    muted
prose        1rem                                    Spectral 400              lh 1.75
ui-label     0.78rem                                 Spectral 500    +0.06em   muted (ink active)
folio        0.95rem                                 Noto Serif Dev 400        muted     (१ २ ३)
```

---

## 4. Space, shape, elevation, motion

- **Spacing** — 4px base. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96. Verse-to-verse
  gap 48px. Apparatus rows 12px apart, 16px below the verse.
- **Measure** — one shared container, `--measure` (= 54rem), centered, with the
  same horizontal padding on header, main, and footer so all three left edges
  align (the old `max-w-4xl` main vs `max-w-3xl` header mismatch is gone). Inside
  the reader, prose/apparatus are held to ~62ch; the Devanagari verse may run the
  full column so long *pada* lines never break awkwardly. A `--thread-gutter`
  (clamp 2.25rem → 3.25rem) on the left holds the thread, granthi, and folio.
- **Radius** — near-flat, like a leaf. `--radius` = 2px for the rare interactive
  surface; focus ring 4px. **No rounded cards.** The granthi is a rotated square
  (no radius).
- **Elevation** — **shadowless.** Surfaces separate from canvas by tone + a
  single 1px hairline, never a drop-shadow. The verse is not a surface at all —
  it sits on the canvas, separated by whitespace and the thread. Only the control
  strip, notes block, and footer use `surface`.
- **Motion** — almost none, all diegetic and all gated by
  `prefers-reduced-motion`. (1) The thread draws in once on load (scaleY from the
  top, 400ms). (2) Apparatus rows fade + rise 8px on reveal (180ms). (3) Theme
  cross-fades 200ms. Font-size steps are **instant** (precise, like adjusting a
  lens). No hover bounce, no scroll-jacking.

---

## 5. Components

- **Site header** — thin `surface` strip, 1px bottom hairline. Left: brass ◆ +
  "Dear Dinanath" wordmark (Marcellus). Right: a quiet "Chants/About" text nav +
  GitHub icon + theme toggle. No shadow.
- **Display controls** — ONE thin sticky `surface` strip with a 1px bottom
  hairline (sticky offset matched exactly to the header height — no negative-
  margin hack). Three labeled groups: **SCRIPT** (accented · plain), **REVEAL**
  (IAST · meaning · words), **SIZE** (A− A+). Active = ink + a 1px accent
  underline (a non-color cue); inactive = muted. No filled pills. Toggle hit
  areas are 44px tall; the size steppers 40px. Wraps to stacked rows on mobile
  with the group labels kept.
- **Svara key** — shown once, when accented mode is on: `◌॑ udatta (raised) ·
  ◌॒ anudatta (lowered)`, marks in the chant face, labels in Spectral muted. Real
  text. Teaches the three registers explicitly.
- **Verse leaf** — no card. Left `--thread-gutter` carries the continuous
  thread; a brass granthi ◆ + Devanagari folio numeral anchor the verse. Devanagari
  is the hero (chant scale × fontScale, lh 2.1 so marks never clip). Below it,
  indented to one shared left anchor: IAST (Spectral italic muted), translation
  (Spectral ink), and word glosses (two-column `surface-2` rows on wide, stacked
  on mobile).
- **Prose notes** — the only `surface` panel in the article: 1px top hairline,
  Marcellus headings, Spectral prose, accent links. Headed by an eyebrow label.
- **Chant card (home)** — a leaf-row, not a heavy card: brass ◆, Marcellus title,
  eyebrow source-line, a one-line Devanagari peek. Hairline-separated rows, no
  shadow; hover lifts the title muted → ink with a faint accent-soft wash.
- **Footer** — thin `surface` strip, 1px top hairline. Wordmark + a one-line
  svara legend echo (`॑ above · ॒ below`) + quiet links.
- **Theme toggle** — single icon button (sun in light / crescent in dark), 2px
  radius, accent-soft hover wash, accent focus ring.

---

## 6. Accessibility floor (always)

- WCAG AA text contrast (verified in §2); state never conveyed by color alone.
- Visible keyboard focus everywhere: 2px `ring`, offset 2px.
- `prefers-reduced-motion: reduce` collapses every transition to instant.
- Real buttons/links, semantic landmarks, `aria-pressed` on toggles.
- Layout reserves a full register above and below the chant line so svara marks
  never clip, even at the 1.6× max text size.
