"use client";

import { useEffect, useRef, useState } from "react";

import {
  DEFAULT_THEME,
  isThemeName,
  THEME_STORAGE_KEY,
  THEMES,
  type ThemeName,
} from "@/lib/themes";

/**
 * The two theme affordances in the header: a swatch button that opens a popover
 * of all five palettes, and a sun/moon button that flips the core Slate ↔ Onyx
 * pair. Both write `data-theme` on <html> and persist the choice to localStorage
 * (read back before paint by ThemeScript, so there is no flash on reload).
 *
 * Before mount we render fixed-size inert placeholders so the server and client
 * markup match (no hydration mismatch) and the header layout never shifts.
 */
export default function ThemeControls() {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<ThemeName>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (isThemeName(current)) setThemeState(current);
    setMounted(true);
  }, []);

  // Close the popover on Escape or an outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  function setTheme(next: ThemeName) {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the in-page choice still holds.
    }
  }

  const isDark = THEMES.find((t) => t.name === theme)?.dark ?? false;

  if (!mounted) {
    return (
      <div aria-hidden="true" className="flex items-center gap-2">
        <span className="inline-flex h-9.5 w-9.5 rounded-lg border border-line" />
        <span className="inline-flex h-9.5 w-9.5 rounded-lg border border-line" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Palette swatch + popover */}
      <div className="relative" ref={popoverRef}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Choose theme palette"
          className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-lg border border-line transition-colors hover:border-accent"
        >
          <span
            aria-hidden="true"
            className="glow-text inline-block h-3.75 w-3.75 rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--secondary))",
            }}
          />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 top-12 z-50 w-46 rounded-xl border border-line bg-surface p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
          >
            <p className="eyebrow px-2.5 pb-2 pt-1.5">Theme</p>
            {THEMES.map((palette) => {
              const active = palette.name === theme;
              return (
                <button
                  key={palette.name}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setTheme(palette.name);
                    setOpen(false);
                  }}
                  className={[
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                    active ? "bg-surface-2" : "hover:bg-surface-2",
                  ].join(" ")}
                >
                  <span aria-hidden="true" className="inline-flex">
                    <span
                      className="h-3.25 w-3.25 rounded-full border border-line"
                      style={{ background: palette.canvas }}
                    />
                    <span
                      className="-ml-1.5 h-3.25 w-3.25 rounded-full"
                      style={{ background: palette.accent }}
                    />
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink">
                    {palette.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      "w-3.5 text-center text-xs text-accent",
                      active ? "visible" : "invisible",
                    ].join(" ")}
                  >
                    ✓
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Light/dark (Slate ↔ Onyx) toggle */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? "slate" : "onyx")}
        aria-pressed={isDark}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-accent"
      >
        {isDark ? (
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        ) : (
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
          </svg>
        )}
      </button>
    </div>
  );
}
