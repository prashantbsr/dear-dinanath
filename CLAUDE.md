# CLAUDE.md

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

## Code style

- 2-space indent, LF line endings, UTF-8 (enforced by `.editorconfig`).
- TypeScript strict mode. Path alias `@/` resolves to `src/`.
- Tailwind v4 — no `tailwind.config.*`; utilities are picked up automatically via PostCSS.
- Self-hosted fonts via `next/font` in `src/lib/fonts.ts`. Do not introduce Google Fonts or other third-party font loads — the site must stay tracker-free and offline-friendly.

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and publishes `out/` to GitHub Pages. There is no staging environment — verify locally with `npm run build` before pushing changes that affect routing, base path, or static export.
