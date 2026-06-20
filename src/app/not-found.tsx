import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page seems to have wandered off.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center text-center">
      <section className="flex flex-col items-center gap-6">
        <p aria-hidden="true" className="chant text-5xl text-accent" lang="sa">
          ॐ
        </p>
        <h1 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
          This page seems to have wandered off.
        </h1>
        <p className="max-w-md text-muted">
          The verse you were looking for is not here. Perhaps it was moved, or
          perhaps it was never written down. Either way, the chants are waiting.
        </p>
        <Link
          href="/"
          className="rounded-sm border border-line bg-surface px-5 py-2.5 text-sm text-accent transition-colors hover:bg-surface-2 hover:text-ink"
        >
          Return to the chants
        </Link>
      </section>
    </div>
  );
}
