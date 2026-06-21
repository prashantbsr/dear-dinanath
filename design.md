# Design System — Dear Dinanath

> A quiet study at dawn: unhurried, reverent, legible, free of clutter — a
> considered reading instrument, not a consumer app.

This is the single source of truth for how Dear Dinanath looks and feels. Every
color, type, and spacing decision below is implemented as a token in
[`src/app/globals.css`](src/app/globals.css) and consumed through Tailwind v4
utilities. Change a value here and in `globals.css` together — never hard-code a
color or size in a component.

---

## 1. Concept — a modern reading instrument

The page is **one centered reading column**, not a stack of cards. The chant is
the hero; everything else is quiet apparatus around it. Three ideas carry the
identity:

- **Type does the work.** An expressive grotesque display face
  (Bricolage Grotesque) for titles and the wordmark, a calm humanist sans
  (IBM Plex Sans) for the whole English reading layer, and a mono (IBM Plex Mono)
  for small structural labels — eyebrows, citations, the size readout. The
  Devanagari is set in **Tiro Devanagari Sanskrit**, a face purpose-built for
  Sanskrit with full Vedic-accent support.
- **Low chrome.** Hairlines, tone, and whitespace separate things — never drop
  shadows or heavy rounded "card UI". List rows, not cards. The verse is not a
  surface at all; it sits on the canvas, separated by space and a single top rule.
- **Restrained color, with room to play.** One accent does the emphasis. The
  palette is themeable: a calm default plus four alternates, switchable from the
  header. Two of the dark palettes add a soft luminous **glow** to the title and
  marks; the others resolve glow to `none`.

The chant line's generous, **constant** line-height (2.05) is load-bearing, not
decorative: Vedic recitation lives on three registers — *udatta* (॑, above the
line), the syllable on the baseline, and *anudatta* (॒, below) — and that
vertical breathing room is what keeps the stacked tone marks from clipping, even
at the largest text size.

---

## 2. Color tokens — five palettes

Color is delivered as **eleven role tokens**, given a value per palette. Palette
selection is driven by `data-theme` on `<html>`, set before paint by
[`ThemeScript`](src/components/ThemeScript.tsx) so there is never a flash of the
wrong theme. **Slate (light) is the default** for everyone on a first visit;
dark is an explicit opt-in. The sun/moon button flips the core **Slate ↔ Onyx**
pair; a swatch popover offers all five.

| Token         | Role                                                        | Slate (light) | Onyx (dark) | Aura (dark) | Cyberpunk (dark) | Anime (light) |
| ------------- | ---------------------------------------------------------- | ------------- | ----------- | ----------- | ---------------- | ------------- |
| `canvas`      | page background                                            | `#f6f7f9`     | `#0a0b0f`   | `#0c0a14`   | `#080611`        | `#f2f7ff`     |
| `surface`     | lifted surface — control strip, svara key, word cells      | `#ffffff`     | `#13151c`   | `#15111f`   | `#110a20`        | `#ffffff`     |
| `surface-2`   | recessed fill — gloss cells, hover wash                    | `#eef0f4`     | `#1a1d26`   | `#1d1730`   | `#190e2e`        | `#eaf2ff`     |
| `ink`         | primary text                                               | `#10131a`     | `#eef0f5`   | `#f1ecff`   | `#f6f0ff`        | `#1b2440`     |
| `muted`       | metadata, IAST, gloss meanings (≥ 0.9rem only)             | `#566071`     | `#9aa3b6`   | `#a69fc6`   | `#b39ad8`        | `#5a6488`     |
| `line`        | every hairline / border                                    | `#e4e7ec`     | `#222632`   | `#2a2142`   | `#2c1846`        | `#dde7f7`     |
| `accent`      | links, active state, emphasis, chips                       | `#5b54e6`     | `#a99bff`   | `#c4a8ff`   | `#ff2e9a`        | `#e0367a`     |
| `accent-soft` | chip fill, hover wash, selection                           | `#ecebfb`     | `#1d1b2e`   | `#211a36`   | `#2a0f24`        | `#ffe1ee`     |
| `secondary`   | the one cool note — svara-key marks, footer echo (ornament)| `#0e8f8e`     | `#5fe6d0`   | `#7af0ff`   | `#16f0ff`        | `#2f7bef`     |
| `ring`        | focus ring (= accent)                                      | `#5b54e6`     | `#a99bff`   | `#c4a8ff`   | `#ff2e9a`        | `#e0367a`     |
| `glow`        | optional text-shadow on title / wordmark / marks           | `none`        | `none`      | accent 38%  | accent 62%       | `none`        |

**Contrast (WCAG):** `muted` and `accent` (as text) pass AA on `canvas` in every
palette — never use `muted` below ~0.9rem; promote to `ink`. `secondary` is used
as **ornament/mark fill only** (svara key, footer echo), never body text. State
is never color-only: active toolbar controls become a **filled `accent-soft`
chip with an accent border + a 700 weight shift** (a shape change, not just a
color shift), while inactive controls stay quiet outline buttons. The palette registry is mirrored in
[`src/lib/themes.ts`](src/lib/themes.ts) (label, dark flag, swatch colors) — keep
it in sync with the tokens here.

---

## 3. Typography

Four faces, all self-hosted at build time via `next/font/google` (zero runtime
third-party requests — a privacy value). See [`src/lib/fonts.ts`](src/lib/fonts.ts).

| Role       | Face                          | Weights                | Used for                                                   |
| ---------- | ----------------------------- | ---------------------- | ---------------------------------------------------------- |
| Display    | **Bricolage Grotesque**       | 600, 700               | wordmark, page + chant titles, section + notes headings    |
| Text / UI  | **IBM Plex Sans**             | 400/500/600 + *italic* | body, translation, UI; **italic is reserved for IAST**     |
| Mono       | **IBM Plex Mono**             | 400/500/600            | eyebrows, group labels, citation line, size readout, svara |
| Devanagari | **Tiro Devanagari Sanskrit**  | 400                    | ALL Devanagari incl. svara marks ॑ ॒ (`lang="sa"`)         |

*Italic* signals "a reading of" — it marks the IAST transliteration only;
translation, notes, and UI stay upright. IBM Plex Sans covers the full IAST
diacritic set (ā ī ū ṛ ṝ ḷ ṅ ñ ṭ ḍ ṇ ś ṣ ḥ ṃ).

### Type scale (role / size / weight / tracking / line-height)

```
chant title  clamp(2rem, 8.5vw, 2.875rem)   Bricolage 600   -0.03em  lh 1.0
home h1      clamp(1.875rem, 7vw, 2.75rem)   Bricolage 600   -0.025em lh 1.04
section/notes h2  1.25–1.45rem               Bricolage 600   -0.02em  lh 1.2
eyebrow/label  0.7rem  UPPER                 Plex Mono 500    +0.16em  (mono)
chant (hero) calc(var(--chant-base) × --scale)  Tiro 400/500          lh 2.05 (constant)
translation  clamp(0.84rem, 3.4vw, 0.94rem)  Plex Sans 400            lh ~1.68  ink
IAST (italic) clamp(0.84rem, 3.4vw, 0.94rem) Plex Sans 400 italic     lh 1.7    muted
phonetic     0.78rem                          Plex Mono 400            muted (opacity)
gloss word   1rem                             Tiro 400                 ink
gloss meaning 0.78rem                          Plex Sans 400           muted
prose        0.95rem                          Plex Sans 400            lh 1.72
UI label     0.84rem                          Plex Sans 500/700        muted (ink active)
folio numeral 1.125rem                         Tiro 400                 muted (१ २ ३)
```

**`fontScale`** = `0.85 → 1.6`, step `0.1`, multiplies only `--chant-base` (via
the `--scale` custom property set per verse). The chant line-height stays a
constant unitless 2.05 so the svara register scales proportionally and never
clips — verified at 1.6×. The English apparatus size is fixed. Steps are
**instant** (no transition).

---

## 4. Space, shape, elevation, motion

- **Spacing** — 4px base. Verse-to-verse: `clamp(1.25rem, 4vw, 1.875rem)` block
  padding + a single 1px top rule. Apparatus rows: `clamp(1rem, 3vw, 1.25rem)`
  gaps. Word glosses: `grid auto-fit minmax(15.625rem, 1fr)` — two columns wide,
  one column on mobile.
- **Measure** — one shared container, `--measure` (= 64rem), centered, with the
  same horizontal padding on header, main, and footer so all left edges align. It
  is wide enough to use a desktop screen (no cramped narrow strip), while
  prose/apparatus is still held to ~62ch and the Devanagari verse may run the full
  column so long *pada* lines wrap rather than break awkwardly.
- **Radius** — near-flat: `lg` (≈ 0.5rem) for the rare interactive surface
  (buttons, chips, gloss cells), `xl`/`2xl` for the svara key and palette popover.
  No rounded-everything card UI.
- **Elevation** — **shadowless**, except the palette popover (a true overlay
  menu) which uses a single soft drop shadow. Surfaces separate from canvas by
  tone + a 1px hairline. The header is a flat `canvas` strip with a bottom
  hairline; the control strip and footer use `surface`/`canvas` with hairlines.
- **Header height** is the token `--header-h` (3.5rem). The reader's controls
  strip sticks at `top: var(--header-h)` so it sits flush beneath the header with
  no overlap or gap.
- **Motion** — almost none, all gated by `prefers-reduced-motion`. (1) Apparatus
  rows fade + rise 6px on reveal (`0.28s ease`). (2) Theme cross-fades `0.4s ease`
  on background/color. (3) Font-size steps are **instant**. No hover bounce, no
  scroll-jacking. Two dark palettes add a static `glow` text-shadow (no animation).
- **Decoration** — a single soft radial-gradient wash (accent on home, secondary
  on the reader) sits behind the hero, `aria-hidden`, pointer-events-none. No
  imagery, no background photos.
- **Persistence** — `localStorage`: `dd-theme` (the palette) + the reader's five
  prefs (`scriptMode`, `showTransliteration`, `showTranslation`, `showWords`,
  `fontScale`). First visit = Slate (light); dark is explicit opt-in.

---

## 5. Components

- **Site header** — flat `canvas` strip, 1px bottom hairline, no shadow. Left:
  wordmark (Bricolage) + a small Devanagari accent of the name (`दीनानाथ`,
  `aria-hidden`, accent-tinted). Right: a quiet Chants/About nav, a GitHub icon,
  the **palette swatch** (opens a popover of all five themes), and the **sun/moon**
  toggle (flips Slate ↔ Onyx). All in [`ThemeControls`](src/components/ThemeControls.tsx).
- **Display controls** — ONE thin sticky toolbar on `canvas` with a 1px bottom
  hairline, stuck at `top: var(--header-h)` so it reads as part of the header, not
  a floating box. Three mono-labeled groups: **SCRIPT** (Accented · Plain),
  **SHOW** (Transliteration · Meaning · Words), **SIZE** (A− [%] A+), each a row
  of toolbar buttons. Active = filled `accent-soft` chip + accent border + weight
  700; inactive = quiet outline button (shape change, never color alone). Buttons
  are ~38px tall; steppers 38px square. Wraps to stacked rows on mobile with the
  group labels kept.
- **Svara key** — shown once, only in accented mode: a bordered `surface` pill
  with a mono label and `◌॑ udatta — raised · ◌॒ anudatta — lowered`, marks in the
  chant face tinted with `secondary`, labels in the text face. Real text.
- **Verse** — no card. A Devanagari folio numeral (१, २, ३…, `sr-only` "Verse n")
  sits in the left gutter; the Devanagari is the hero (chant scale × `--scale`,
  lh 2.05). Below, aligned to one shared left edge: IAST (Plex Sans italic, muted),
  an optional phonetic line (mono, quieter), translation (Plex Sans, ink), and
  word glosses (`surface-2` cells, two-column on wide). Apparatus reveals on toggle.
- **Prose notes** — separated from the verses by a 2px top rule; Bricolage
  headings, Plex Sans prose, accent links.
- **Chant row (home)** — a low-chrome list row, not a card: Bricolage title + a
  mono difficulty chip on `accent-soft`, a quiet metadata line, the description,
  and a one-line Devanagari peek. Hairline-separated; hover adds a faint
  `surface-2` wash and tints the trailing → accent.
- **Footer** — flat `canvas` strip, 1px top hairline. Wordmark + Devanagari
  accent, the MIT/source line, and a one-line svara legend echo (`॑ above · ॒
  below`, marks in `secondary`).
- **Theme controls** — swatch button (gradient accent→secondary dot) opening a
  5-row palette popover (Escape / outside-click closes), plus the sun/moon
  toggle. Both write `data-theme` + persist; bordered icon buttons, accent focus
  ring, `aria-pressed` / `aria-checked`.

---

## 6. Accessibility floor (always)

- WCAG AA text contrast in every palette (verified in §2); state never conveyed
  by color alone (weight + underline cue on toggles).
- Visible keyboard focus everywhere: 2px `ring`, offset 3px.
- `prefers-reduced-motion: reduce` collapses every transition/animation to instant.
- Real buttons/links, semantic landmarks, `aria-pressed`/`aria-checked` on
  toggles, accessible labels on every icon-only control.
- Devanagari marks `lang="sa"`; decorative Devanagari (wordmark accent, the `ॐ`
  on 404) is `aria-hidden`. Tone marks are never recolored or split into spans
  (that would break Devanagari shaping) — the glyphs stay one solid `ink`.
- Layout reserves a full register above and below the chant line so svara marks
  never clip, even at the 1.6× max text size.
