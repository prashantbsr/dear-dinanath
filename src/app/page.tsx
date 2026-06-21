import { getPostsByCategory } from "@/lib/posts";
import ChantCard from "@/components/ChantCard";

export default function HomePage() {
  const groups = getPostsByCategory();

  return (
    <>
      {/* Soft accent glow in the corner — fixed and full-bleed, purely
          decorative. Sits below the header (top = --header-h) so it isn't
          clipped to the reading column. Hidden on small screens, where the
          narrow layout leaves no room for it to read as anything but a smudge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-(--header-h) -z-10 hidden h-[62vh] w-[min(50vw,520px)] sm:block"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 62%)",
        }}
      />

      <section className="relative flex min-h-[34vh] flex-col justify-center py-8 sm:min-h-[40vh]">
        <h1 className="glow-text max-w-[14ch] font-display text-[clamp(3rem,13vw,6rem)] font-bold leading-[0.92] tracking-[-0.04em] text-ink">
          Learn it <span className="text-accent">first.</span>
        </h1>
        <span
          aria-hidden="true"
          className="mt-7 block h-0.5 w-14 rounded-full bg-accent opacity-80"
        />
      </section>

      <div className="mt-8 sm:mt-12">
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
