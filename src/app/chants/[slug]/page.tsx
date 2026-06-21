import Link from "next/link";
import { marked } from "marked";
import type { Metadata } from "next";
import { getPost, getPostSlugs } from "@/lib/posts";
import ChantReader from "@/components/ChantReader";
import CitationLine from "@/components/CitationLine";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function ChantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const notesHtml = post.body ? await marked.parse(post.body) : null;

  const meta = [post.source, post.deity, post.category, post.difficulty].filter(
    Boolean,
  ) as string[];

  return (
    <article className="relative">
      {/* Soft secondary glow behind the title — purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-0 -z-10 h-72 w-[min(55vw,20rem)]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--secondary) 12%, transparent), transparent 62%)",
        }}
      />

      <Link
        href="/"
        className="eyebrow inline-flex items-center gap-1.5 normal-case tracking-normal transition-colors hover:text-accent"
      >
        <span aria-hidden="true">&larr;</span>
        All chants
      </Link>

      <header className="mt-3.5 max-w-[62ch]">
        <h1 className="glow-text font-display text-[clamp(2rem,8.5vw,2.875rem)] font-semibold leading-none tracking-tight text-ink">
          {post.title}
        </h1>

        {meta.length > 0 && <CitationLine items={meta} className="mt-3.5" />}

        <p className="mt-3.5 text-[clamp(0.84rem,3.5vw,0.94rem)] leading-relaxed text-muted">
          {post.description}
        </p>
      </header>

      <div className="mt-7">
        <ChantReader post={post} />
      </div>

      {notesHtml && (
        <section
          className="notes mt-[clamp(1.875rem,6vw,2.875rem)] max-w-[62ch] border-t-2 border-line pt-[clamp(1.625rem,5vw,2.25rem)]"
          dangerouslySetInnerHTML={{ __html: notesHtml }}
        />
      )}
    </article>
  );
}
