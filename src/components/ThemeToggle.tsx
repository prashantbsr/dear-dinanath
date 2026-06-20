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
        className="inline-flex h-9 w-9 shrink-0 rounded-lg"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-xs font-medium text-muted transition-colors hover:text-ink hover:border-saffron-soft"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
