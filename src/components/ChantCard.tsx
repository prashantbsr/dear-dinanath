import Link from "next/link";
import type { Post } from "@/lib/types";

interface ChantCardProps {
  post: Post;
}

/**
 * Presentational card for a single chant. Renders as one tappable block that
 * links to the chant's reader page. Shows a few orienting chips, the title, a
 * short description, and a quiet one line peek of the opening Devanagari.
 */
export default function ChantCard({ post }: ChantCardProps) {
  const firstVerse = post.verses[0];
  const peekSource = firstVerse?.plain ?? firstVerse?.devanagari ?? "";
  const peek = peekSource.split("\n")[0]?.trim() ?? "";

  return (
    <Link
      href={`/chants/${post.slug}/`}
      className="group block rounded-2xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-saffron"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
          {post.category}
        </span>
        {post.deity ? (
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
            {post.deity}
          </span>
        ) : null}
        {post.difficulty ? (
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted capitalize">
            {post.difficulty}
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 text-lg font-semibold text-ink">{post.title}</h3>

      <p className="mt-1.5 line-clamp-2 text-sm text-muted">
        {post.description}
      </p>

      {peek ? (
        <p className="chant mt-3 truncate text-saffron-soft" lang="sa">
          {peek}
        </p>
      ) : null}
    </Link>
  );
}
