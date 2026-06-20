"use client";

import { useEffect, useState } from "react";

/**
 * Toggles the "dark" class on <html> and persists the choice to localStorage.
 * Before mount we render a fixed-size placeholder so the server and client
 * markup match (no hydration mismatch) and the header layout never shifts.
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (e) {
      // Ignore storage being unavailable (private mode, blocked, etc.).
    }
  }

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 shrink-0 rounded-sm"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      {isDark ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.25" />
          <path d="M12 2.5v2.5M12 19v2.5M4.5 4.5l1.8 1.8M17.7 17.7l1.8 1.8M2.5 12H5M19 12h2.5M4.5 19.5l1.8-1.8M17.7 6.3l1.8-1.8" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a7 7 0 1 0 10.7 10.7Z" />
        </svg>
      )}
    </button>
  );
}
