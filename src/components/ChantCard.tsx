import Link from "next/link";
import type { Post } from "@/lib/types";

interface ChantCardProps {
  post: Post;
}

/**
 * A chant on the index, rendered as a low-chrome list row rather than a heavy
 * card: the title in the display voice, the short description, and a one-line
 * Devanagari peek of the opening. Hover lifts the row with a faint surface wash.
 */
export default function ChantCard({ post }: ChantCardProps) {
  const firstVerse = post.verses[0];
  const peekSource = firstVerse?.plain ?? firstVerse?.devanagari ?? "";
  const peek = peekSource.split("\n")[0]?.trim() ?? "";

  return (
    <Link
      href={`/chants/${post.slug}/`}
      className="group flex items-start gap-4 rounded-md border-b border-line px-3.5 py-4.5 transition-colors hover:bg-surface-2"
    >
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[clamp(1.0625rem,4.6vw,1.1875rem)] font-semibold tracking-tight text-ink">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-muted">
          {post.description}
        </p>
        {peek && (
          <p
            className="chant mt-2.5 truncate text-base leading-relaxed text-ink opacity-[0.78]"
            lang="sa"
          >
            {peek}
          </p>
        )}
      </div>
      <span
        aria-hidden="true"
        className="shrink-0 pt-0.5 text-lg text-muted transition-colors group-hover:text-accent"
      >
        →
      </span>
    </Link>
  );
}
