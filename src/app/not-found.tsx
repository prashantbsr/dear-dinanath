import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page seems to have wandered off.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-[34rem] flex-col items-center justify-center py-12 text-center">
      <p
        aria-hidden="true"
        lang="sa"
        className="glow-text chant text-[clamp(3.25rem,16vw,5.25rem)] leading-none text-accent"
      >
        ॐ
      </p>
      <h1 className="glow-text mt-6 font-display text-[clamp(1.5rem,6vw,2rem)] font-semibold tracking-tight text-ink">
        This page seems to have wandered off.
      </h1>
      <p className="mt-3.5 max-w-md leading-relaxed text-muted">
        No matter — the chants are still here, waiting quietly. Let&rsquo;s return
        to them.
      </p>
      <Link
        href="/"
        className="glow-text mt-7 inline-flex min-h-11 items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-[filter] hover:brightness-110"
      >
        Back to the chants
      </Link>
    </div>
  );
}
