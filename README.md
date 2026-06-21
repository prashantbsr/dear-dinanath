<div align="center">

# Dear Dinanath

### दीनानाथ

[![License: MIT](https://img.shields.io/badge/License-MIT-A0522D.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-E67E22.svg)](CONTRIBUTING.md)

</div>

> [!CAUTION]
> At moment you will find many contradictions in the running app in contrast to the concept. This project is just scaffolded, and I will make more improvements soon.

---
A static web app for make it easier for new generation to learn shlokas and chants.

(Atleast something must pass on!)

### PURPOSE:
- To make it easier for new generation to learn vedic chants.
- Figure out and experiment with mental models to make the memorisation easier.

### STRICTLY AVOIDED:
- Anything that's boring.
- Literal long meanings as part of the primary UI.
- Anything in UI UX that's cringe like language learning apps.
- Gamification of learning.
- Use of non-mainstream hindi and sanskrit terminology.

### THINGS OF FOCUS:
- Be bibliographically correct.
- Devanagri should be correct.
- UI UX should be extremely good.
- Make the memorisation easier.

UI UX:
- Add only the stuff as primary that is really needed to kickstart and facilitate the memorisation.
- Add the entry to rabbit hole as a tertiary thing. Rabiit hole is the genuine stuff.
- There is no secondary thing. There needs to be a lot of gap between the memorisation and going to rabbit hole.


I myself have read lots of sanatan scriptures end to end (the Gita Press ones).
My observation is, if you are not genuinely painstakingly curious, you will not finish a book. It becomes too boring. Specially when you don't like devanagri (i really love devanagri).

A lots of yound people want to learn the vedic shlokas and chanting. But they don't want to go to the boring sites or learn them in the traditional way, where you are taught a lots of things before starting chanting.

I believe that first we need to figure out to make the chants memorise directly without any pre work. After that, let it up to the person if he wants to go inside the rabbit hole of the amazing stuff.




## ✨ Features

- **Accurate Devanagari** with Vedic svara (tone) marks, rendered with generous line height so the stacked accent marks are never clipped.
- **Self-hosted, optimized fonts** via `next/font`, subset at build time for fast, layout-stable loading and no third-party font requests.
- **Transliteration and word-by-word meaning** so every verse can be studied syllable by syllable.
- **Adjustable text size** plus toggles for script, transliteration, and meaning, so you see exactly what you want.
- **Light and dark themes** with no flash of the wrong theme on load.
- **Fully static and fast**, offline-friendly, with no trackers and no analytics.
- **Accessible and keyboard-friendly**, with semantic landmarks, real buttons and links, and full keyboard operability.

## 🧰 Tech stack

- **Next.js 16** (App Router, static export)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first, no config file)
- **gray-matter** for front matter parsing
- **marked** for rendering markdown notes

## 🚀 Getting started

### Prerequisites

- **Node.js 20.9 or newer**

### Install

```bash
git clone https://github.com/prashant-bsr/dear-dinanath.git
cd dear-dinanath
npm install
```

### Develop

```bash
npm run dev
```

This starts the development server at [http://localhost:1992](http://localhost:1992).

### Build

```bash
npm run build
```

This emits the static site to the `out/` directory, ready to deploy to any static host.

### Preview the build

```bash
npm run preview
```

This serves the built `out/` directory at [http://localhost:1992](http://localhost:1992).

(Yes. 1992. IYKYK.).

> The app always runs on **port 1992**, in development, preview, and start.

## 🗂️ Project structure

```text
dear-dinanath/
├── posts/                # Chants as markdown files (front matter + verses)
│   └── ganapati-vandana.md
├── public/               # Static assets (favicon, etc.)
│   └── favicon.svg
├── src/
│   ├── app/              # App Router pages, layout, and globals.css
│   │   └── globals.css
│   ├── components/       # UI components (header, footer, chant views, toggles)
│   └── lib/              # Content and config helpers
│       ├── types.ts      # Post, Verse, and Word interfaces
│       ├── posts.ts      # Read and parse chants from posts/
│       ├── site.ts       # Site metadata
│       └── fonts.ts      # Self-hosted next/font setup
├── next.config.mjs       # Static export config (output: export)
├── postcss.config.mjs    # Tailwind CSS v4 via PostCSS
├── tsconfig.json         # TypeScript (strict) and the @/ path alias
└── package.json
```

## 📜 Adding a chant

A chant is a single markdown file in `posts/`. It has YAML front matter describing the chant, a `verses` array holding the verse data, and an optional markdown body for study notes. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full walkthrough.

```markdown
---
title: Ganapati Vandana
slug: ganapati-vandana
category: Vandana
deity: Ganapati
source: Rigveda 2.23.1
difficulty: beginner
order: 1
description: The Rigvedic invocation to Ganapati, lord of the hosts.
verses:
  - devanagari: |
      ग॒णानां॑ त्वा ग॒णप॑तिं हवामहे ...
    plain: |
      गणानां त्वा गणपतिं हवामहे ...
    transliteration: |
      gaṇānāṃ tvā gaṇapatiṃ havāmahe ...
    phonetic: |
      gananam tva ganapatim havamahe ...
    translation: We invoke you, O Ganapati, lord of the hosts ...
    words:
      - { word: गणानाम्, meaning: "of the ganas (hosts)" }
      - { word: त्वा, meaning: "you" }
---

## About this chant

Optional markdown notes that render below the verses.
```

### Content model

**Front matter fields**

| Field | Required | Description |
| --- | --- | --- |
| `title` | yes | Display title of the chant. |
| `slug` | yes | URL slug (matches the file name). |
| `category` | yes | Grouping label, for example `Vandana`. |
| `deity` | no | The deity invoked, for example `Ganapati`. |
| `source` | no | Scriptural source, for example `Rigveda 2.23.1`. |
| `description` | yes | Short summary used on listings and for metadata. |
| `difficulty` | no | One of `beginner`, `intermediate`, or `advanced`. |
| `order` | no | Sort order within a category. |
| `verses` | yes | Array of verse objects (see below). |

**Verse fields**

| Field | Required | Description |
| --- | --- | --- |
| `devanagari` | yes | Devanagari text with svara (tone) marks. |
| `plain` | no | Devanagari without the accent marks. |
| `transliteration` | yes | IAST transliteration. |
| `phonetic` | no | Simple phonetic spelling for newcomers. |
| `translation` | yes | English translation of the verse. |
| `words` | no | Array of `{ word, meaning }` for word-by-word study. |

## 🌐 Deployment

Because the app is a fully static export, the `out/` directory works on **GitHub Pages**, **Netlify**, **Cloudflare Pages**, or any static host. Just build and publish `out/`.

An included **GitHub Actions** workflow builds and deploys the site automatically. When hosting on a **GitHub Pages project site** (served from a subpath like `/dear-dinanath`), set the `NEXT_PUBLIC_BASE_PATH` environment variable to that subpath so links and assets resolve correctly. Leave it empty for a user site or a custom domain.

```bash
NEXT_PUBLIC_BASE_PATH="/dear-dinanath" npm run build
```

## 🤝 Contributing

Contributions are warmly welcome, whether you are fixing a typo, refining a translation, or adding a new chant. Please read [CONTRIBUTING.md](CONTRIBUTING.md) to get started, and take special care with the accuracy of the Devanagari and the svara marks.

## 📄 License

Released under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- **Noto Serif Devanagari**, used under the [SIL Open Font License](https://openfontlicense.org), for its faithful rendering of Devanagari and Vedic accents.
- The living **Sanskrit tradition** and the teachers, reciters, and scholars who have carried these chants across generations.
