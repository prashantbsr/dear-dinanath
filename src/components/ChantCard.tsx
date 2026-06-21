import Link from "next/link";
import type { Post } from "@/lib/types";

interface ChantCardProps {
  post: Post;
}

/**
 * A chant on the index, rendered as a low-chrome list row rather than a heavy
 * card: the title in the display voice with a difficulty chip, a quiet metadata
 * line, the short description, and a one-line Devanagari peek of the opening.
 * Hover lifts the row with a faint surface wash.
 */
export default function ChantCard({ post }: ChantCardProps) {
  const firstVerse = post.verses[0];
  const peekSource = firstVerse?.plain ?? firstVerse?.devanagari ?? "";
  const peek = peekSource.split("\n")[0]?.trim() ?? "";
  const meta = [post.deity, post.source].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/chants/${post.slug}/`}
      className="group flex items-start gap-4 rounded-md border-b border-line px-3.5 py-4.5 transition-colors hover:bg-surface-2"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <h3 className="font-display text-[clamp(1.0625rem,4.6vw,1.1875rem)] font-semibold tracking-tight text-ink">
            {post.title}
          </h3>
          {post.difficulty && (
            <span className="rounded-md bg-accent-soft px-1.75 py-0.5 font-mono text-[0.6rem] tracking-wide text-accent">
              {post.difficulty}
            </span>
          )}
        </div>
        {meta && <p className="mt-1.5 text-[0.78rem] text-muted">{meta}</p>}
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
