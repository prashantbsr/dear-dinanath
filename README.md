<div align="center">

# Dear Dinanath

### दीनानाथ

**A quiet place to learn Sanskrit and Vedic chants.**

[![License: MIT](https://img.shields.io/badge/License-MIT-A0522D.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-E67E22.svg)](CONTRIBUTING.md)

</div>

---

Dear Dinanath is a calm, fast, fully static web app for learning Sanskrit and Vedic chants. It presents each chant in accurate Devanagari with the traditional svara (tone) marks, alongside transliteration and word-by-word meaning, so you can read, study, and chant at your own pace. It is built to feel like a quiet study at dawn: unhurried, reverent, and free of clutter. 🪔

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

> The app always runs on **port 1992**, in development, preview, and start.

## 📄 License

Released under the [MIT License](LICENSE).
