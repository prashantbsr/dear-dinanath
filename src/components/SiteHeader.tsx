import Link from "next/link";

import { site } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * Sticky site header: brand on the left, primary navigation and the theme
 * toggle on the right. Kept calm and uncluttered.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-3">
        <Link
          href="/"
          className="flex items-baseline gap-2 rounded-md font-semibold tracking-tight text-ink"
        >
          <span>{site.name}</span>
          <span
            aria-hidden="true"
            className="font-devanagari text-sm text-saffron"
          >
            {site.nameDevanagari}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-1 text-sm text-muted sm:gap-2"
        >
          <Link
            href="/"
            className="rounded-md px-2.5 py-1.5 transition-colors hover:text-ink"
          >
            Chants
          </Link>
          <Link
            href="/about"
            className="rounded-md px-2.5 py-1.5 transition-colors hover:text-ink"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
