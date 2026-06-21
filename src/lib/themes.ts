// The palette registry. Values mirror the color tokens in globals.css — the two
// must stay in sync. `dark` drives the sun/moon toggle (which flips the core
// Slate ↔ Onyx pair); `canvas`/`accent` are the two swatch dots shown in the
// palette popover.

export type ThemeName = "slate" | "onyx" | "aura" | "cyberpunk" | "anime";

export interface ThemeMeta {
  name: ThemeName;
  label: string;
  dark: boolean;
  /** Swatch preview: page background. */
  canvas: string;
  /** Swatch preview: accent. */
  accent: string;
}

export const THEMES: ThemeMeta[] = [
  { name: "slate", label: "Slate", dark: false, canvas: "#f6f7f9", accent: "#5b54e6" },
  { name: "onyx", label: "Onyx", dark: true, canvas: "#0a0b0f", accent: "#a99bff" },
  { name: "aura", label: "Aura", dark: true, canvas: "#0c0a14", accent: "#c4a8ff" },
  {
    name: "cyberpunk",
    label: "Cyberpunk",
    dark: true,
    canvas: "#080611",
    accent: "#ff2e9a",
  },
  { name: "anime", label: "Anime", dark: false, canvas: "#f2f7ff", accent: "#e0367a" },
];

export const DEFAULT_THEME: ThemeName = "slate";
export const THEME_STORAGE_KEY = "dd-theme";

export function isThemeName(value: unknown): value is ThemeName {
  return THEMES.some((theme) => theme.name === value);
}
