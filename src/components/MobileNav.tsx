"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { site } from "@/lib/site";
import {
  DEFAULT_THEME,
  isThemeName,
  THEME_STORAGE_KEY,
  THEMES,
  type ThemeName,
} from "@/lib/themes";

/**
 * The entire header toolbar, collapsed behind one hamburger for narrow screens:
 * the nav links, the GitHub source link, and a compact palette picker all live
 * inside the dropdown. On `sm` and up the header shows the toolbar inline and
 * this stays hidden. Closes on Escape, an outside click, or a link tap.
 *
 * The palette picker writes `data-theme` on <html> and persists to localStorage
 * directly (mirroring ThemeControls); both read the current theme from the DOM
 * on mount, so the marks stay tracker-free and there is no flash on reload.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (isThemeName(current)) setTheme(current);
  }, []);

  // Close on Escape or an outside click while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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

  function chooseTheme(next: ThemeName) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the in-page choice still holds.
    }
  }

  const linkClass =
    "block rounded-lg px-2.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2";

  return (
    <div className="relative sm:hidden" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-accent"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-60 rounded-xl border border-line bg-surface p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
          <nav aria-label="Primary">
            <Link href="/" onClick={() => setOpen(false)} className={linkClass}>
              Chants
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              About
            </Link>
          </nav>

          <div className="my-1.5 border-t border-line" />

          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Source on GitHub
          </a>

          <div className="my-1.5 border-t border-line" />

          <div className="px-2.5 py-1.5">
            <p className="eyebrow pb-2.5">Theme</p>
            <div className="flex items-center gap-2.5">
              {THEMES.map((palette) => {
                const active = palette.name === theme;
                return (
                  <button
                    key={palette.name}
                    type="button"
                    onClick={() => chooseTheme(palette.name)}
                    aria-label={`${palette.label} theme`}
                    aria-pressed={active}
                    title={palette.label}
                    className={[
                      "h-7 w-7 rounded-full border transition-transform",
                      active
                        ? "scale-110 border-accent"
                        : "border-line hover:scale-105",
                    ].join(" ")}
                    style={{
                      background: `linear-gradient(135deg, ${palette.canvas} 50%, ${palette.accent} 50%)`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
