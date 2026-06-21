import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { site } from "@/lib/site";
import ChantCard from "@/components/ChantCard";

export default function HomePage() {
  const groups = getPostsByCategory();
  const total = getAllPosts().length;
  const chantWord = total === 1 ? "chant" : "chants";

  return (
    <>
      <section className="relative">
        {/* Soft accent glow behind the intro — purely decorative. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 right-0 -z-10 h-80 w-[min(60vw,22.5rem)]"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 62%)",
          }}
        />

        <p
          className="glow-text chant text-[0.95rem] leading-none text-accent"
          lang="sa"
          aria-hidden="true"
        >
          {site.nameDevanagari}
        </p>

        <h1 className="glow-text mt-4 max-w-[20ch] text-balance font-display text-[clamp(1.875rem,7vw,2.75rem)] font-semibold leading-[1.04] tracking-tight text-ink">
          A quiet place to learn Sanskrit &amp; Vedic chants.
        </h1>

        <p className="mt-4.5 max-w-[34rem] text-[clamp(0.875rem,3.6vw,0.97rem)] leading-relaxed text-muted">
          Sit with one hymn and study it at your own pace — read the Devanagari
          with its tone marks, follow a transliteration, and understand it word by
          word, until the chant settles into memory.
        </p>

        <p className="eyebrow mt-5.5">
          {total} {chantWord} to study
        </p>
      </section>

      <div className="mt-12">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2
              id={`cat-${group.category}`}
              className="eyebrow border-t border-line pb-1 pt-5.5"
            >
              {group.category}
            </h2>
            <div>
              {group.posts.map((post) => (
                <ChantCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
