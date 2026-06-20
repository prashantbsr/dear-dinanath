import Link from "next/link";

import { site } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * Sticky site header: a thin leaf-toned strip. Brass granthi + wordmark on the
 * left, quiet navigation, the source link, and the theme toggle on the right.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <div className="shell flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 rounded-sm font-display text-lg tracking-tight text-ink"
        >
          <span aria-hidden="true" className="granthi shrink-0" />
          <span className="whitespace-nowrap">{site.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-1 text-muted sm:gap-1.5"
        >
          <Link
            href="/"
            className="rounded-sm px-2.5 py-1.5 text-sm transition-colors hover:text-ink"
          >
            Chants
          </Link>
          <Link
            href="/about"
            className="rounded-sm px-2.5 py-1.5 text-sm transition-colors hover:text-ink"
          >
            About
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm transition-colors hover:text-ink"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.22.72-.5l-.01-1.94c-2.92.63-3.54-1.25-3.54-1.25-.48-1.21-1.17-1.53-1.17-1.53-.95-.65.07-.64.07-.64 1.06.07 1.61 1.09 1.61 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.66-1.4-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.07a9.98 9.98 0 0 1 5.24 0c2-1.35 2.88-1.07 2.88-1.07.57 1.45.21 2.52.1 2.79.67.74 1.08 1.67 1.08 2.82 0 4.02-2.46 4.9-4.8 5.16.38.33.71.97.71 1.96l-.01 2.9c0 .29.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z" />
            </svg>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
