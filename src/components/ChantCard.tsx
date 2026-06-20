import Link from "next/link";
import type { Post } from "@/lib/types";
import CitationLine from "@/components/CitationLine";

interface ChantCardProps {
  post: Post;
}

/**
 * A chant on the index, rendered as a leaf-row rather than a heavy card: a brass
 * granthi marks it, the title is the display voice, a citation line and short
 * description orient the reader, and a one-line Devanagari peek shows the opening.
 */
export default function ChantCard({ post }: ChantCardProps) {
  const firstVerse = post.verses[0];
  const peekSource = firstVerse?.plain ?? firstVerse?.devanagari ?? "";
  const peek = peekSource.split("\n")[0]?.trim() ?? "";
  const meta = [post.deity, post.category, post.difficulty].filter(
    Boolean,
  ) as string[];

  return (
    <Link
      href={`/chants/${post.slug}/`}
      className="group grid grid-cols-[0.5rem_minmax(0,1fr)] items-start gap-x-4 rounded-sm px-2 py-5 transition-colors hover:bg-surface-2"
    >
      <span aria-hidden="true" className="granthi mt-2.5" />
      <div className="min-w-0">
        <h3 className="font-display text-xl leading-snug text-ink transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        {meta.length > 0 && <CitationLine items={meta} className="mt-1.5" />}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {post.description}
        </p>
        {peek && (
          <p className="chant mt-2.5 truncate text-accent" lang="sa">
            {peek}
          </p>
        )}
      </div>
    </Link>
  );
}
