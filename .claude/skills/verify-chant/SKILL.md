---
name: verify-chant
description: Validate a chant file in posts/ against the team's content rules — front matter present and correct, slug matches filename, Vedic svara codepoints sane, each verse has required fields. Use when the user asks to verify, validate, or lint a chant file.
disable-model-invocation: true
---

Validate one or more chant files. Argument: a path (or glob) under `posts/`. If `$ARGUMENTS` is empty, default to `posts/*.md`.

Run each check below and report results as a tidy checklist per file (✓ / ✗ with the offending line). At the end, summarize how many passed and how many failed. Do **not** mutate the file — this is a read-only audit. If the user wants fixes, offer to make them after the report.

## Checks per file

### 1. Front matter — required fields

Parse the YAML front matter. Fail if any of these are missing or empty:
- `title` (string)
- `slug` (string, lowercase kebab-case, ASCII letters/digits/`-` only)
- `category` (string)
- `description` (string)
- `source` (string — **team policy requires this even though the type marks it optional**)
- `verses` (non-empty array)

### 2. Slug ↔ filename

`slug` must equal the filename without the `.md` extension. Report a mismatch as a fail.

### 3. Front matter — optional fields, when present

- `difficulty` ∈ {`beginner`, `intermediate`, `advanced`}
- `order` is a number
- `deity` is a string

### 4. Verses — required per-verse fields

For each entry in `verses`:
- `devanagari` (non-empty string)
- `transliteration` (non-empty string)
- `translation` (non-empty string)

`plain`, `phonetic`, and `words` are optional. If `words` is present, each entry must have both `word` and `meaning`.

### 5. Vedic svara codepoint sanity

Inspect every `devanagari` value:
- The expected accent marks are `U+0951` ॑ (udatta) and `U+0952` ॒ (anudatta). Report each occurrence count per verse (informational, not a failure).
- **Fail** if any of these confusables appear inside a `devanagari` value: ASCII apostrophe `'`, backtick `` ` ``, the Unicode combining acute `U+0301`, or Latin letters `[A-Za-z]`. These almost always indicate a transliteration leaked into the Devanagari field.
- **Warn** if `devanagari` is identical to `plain` (i.e. no svara marks present at all) — that may be intentional for non-Vedic chants, but flag it for human review.

### 6. Transliteration sanity

`transliteration` must contain at least one IAST diacritic character (any of: `ā ī ū ṛ ṝ ḷ ṅ ñ ṭ ḍ ṇ ś ṣ ḥ ṃ` or their uppercase forms). A purely ASCII string is almost certainly the `phonetic` field misplaced — flag as a fail.

## Output

After listing per-file results, print one summary line:

```
verify-chant: <N> file(s) checked, <P> passed, <F> failed, <W> warning(s).
```

If anything failed, exit by telling the user which files need attention and offer to help fix them.
