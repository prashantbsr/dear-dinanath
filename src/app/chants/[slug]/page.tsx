import Link from "next/link";
import { marked } from "marked";
import type { Metadata } from "next";
import { getPost, getPostSlugs } from "@/lib/posts";
import ChantReader from "@/components/ChantReader";

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

interface ChipProps {
  label: string;
  value: string;
}

/** A small inset chip for a single piece of chant metadata. */
function Chip({ label, value }: ChipProps) {
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-ink">{value}</span>
    </span>
  );
}

export default async function ChantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const notesHtml = post.body ? await marked.parse(post.body) : null;

  return (
    <article>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-saffron"
      >
        <span aria-hidden="true">&larr;</span>
        All chants
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          <Chip label="Category" value={post.category} />
          {post.deity && <Chip label="Deity" value={post.deity} />}
          {post.source && <Chip label="Source" value={post.source} />}
          {post.difficulty && <Chip label="Level" value={post.difficulty} />}
        </div>

        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          {post.description}
        </p>
      </header>

      <div className="mt-8">
        <ChantReader post={post} />
      </div>

      {notesHtml && (
        <section
          className="notes mt-12 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: notesHtml }}
        />
      )}
    </article>
  );
}
