This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js 16 (App Router, static export) site for studying Sanskrit and Vedic chants. React 19, TypeScript strict, Tailwind v4 (CSS-first, no config). Chants live as YAML-front-matter Markdown files in `posts/`. See @README.md for the public overview and @CONTRIBUTING.md for the full content model.

## Verify after edits

After any edit to `.ts` / `.tsx`, run both before reporting done:

```
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
```

The full content model is enforced by TypeScript — type errors usually mean a real problem with a chant or component, not a config issue. Do not silence them with `any` or `// @ts-expect-error`.

## Dev server quirks

- Port **1992** is hardcoded in `dev`, `preview`, and `start`. Don't pass `-p` or change it.
- `output: "export"` is set in `next.config.mjs`. No SSR, no route handlers, no `dynamic = "force-dynamic"`. Everything must be statically buildable.
- For non-root GitHub Pages project deploys: `NEXT_PUBLIC_BASE_PATH="/repo-name" npm run build`. Leave empty for a user site or custom domain.

## Chant content rules

`posts/<slug>.md` is the only source of chant data — see README.md "Adding a chant" and CONTRIBUTING.md for field shapes.

- **`slug` must match the filename** (without `.md`), lowercase kebab-case, no diacritics.
- **Vedic svara marks are load-bearing.** Preserve `U+0951` ॑ (udatta) and `U+0952` ॒ (anudatta) exactly as authored. Never strip, substitute, or "clean up" Devanagari. If unsure whether a mark is correct, leave it.
- **Every chant edit or addition must cite a printed `source`** in the front matter (e.g. `Rigveda 2.23.1`). The `source` field is typed as optional, but team policy treats it as required. Do not add or modify tone marks without a cited source.
- `devanagari`, `transliteration`, and `translation` are required per verse; `plain`, `phonetic`, and `words` are optional and should only be added if accurate.



## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and publishes `out/` to GitHub Pages. There is no staging environment — verify locally with `npm run build` before pushing changes that affect routing, base path, or static export.


## Code style

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

- 2-space indent, LF line endings, UTF-8 (enforced by `.editorconfig`).
- TypeScript strict mode. Path alias `@/` resolves to `src/`.
- Tailwind v4 — no `tailwind.config.*`; utilities are picked up automatically via PostCSS.
- Self-hosted fonts via `next/font` in `src/lib/fonts.ts`. Do not introduce Google Fonts or other third-party font loads — the site must stay tracker-free and offline-friendly.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
