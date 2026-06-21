import Link from "next/link";
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

export default async function ChantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return (
    <article className="relative -mt-10 pb-[clamp(6rem,13vw,8rem)] sm:-mt-14">
      {/* Soft secondary glow in the corner — fixed and full-bleed, purely
          decorative. Sits below the header (top = --header-h) so it isn't clipped
          to the reading column. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-(--header-h) -z-10 h-[60vh] w-[min(48vw,480px)]"
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

        <p className="mt-4.5 text-[clamp(0.84rem,3.5vw,0.94rem)] leading-relaxed text-muted">
          {post.description}
        </p>
      </header>

      <div className="mt-7">
        <ChantReader post={post} />
      </div>
    </article>
  );
}
