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
    <article>
      <Link
        href="/"
        className="eyebrow inline-flex items-center gap-1.5 transition-colors hover:text-accent"
      >
        <span aria-hidden="true">&larr;</span>
        All chants
      </Link>

      <header className="mt-7 max-w-[62ch]">
        <h1 className="font-display text-[clamp(1.9rem,1.4rem+2.4vw,3rem)] leading-[1.12] tracking-tight text-ink">
          {post.title}
        </h1>

        {meta.length > 0 && <CitationLine items={meta} />}

        <p className="mt-5 text-[1.075rem] leading-relaxed text-muted">
          {post.description}
        </p>
      </header>

      <div className="mt-9">
        <ChantReader post={post} />
      </div>

      {notesHtml && (
        <section
          className="notes mt-14 max-w-[62ch] rounded-sm border-t border-line bg-surface px-5 py-6 sm:px-7 sm:py-7"
          dangerouslySetInnerHTML={{ __html: notesHtml }}
        />
      )}
    </article>
  );
}
