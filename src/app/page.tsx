import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { site } from "@/lib/site";
import ChantCard from "@/components/ChantCard";

export default function HomePage() {
  const groups = getPostsByCategory();
  const total = getAllPosts().length;
  const chantWord = total === 1 ? "chant" : "chants";

  return (
    <>
      <section className="mx-auto max-w-[46ch] text-center">
        <p
          className="chant text-3xl text-accent sm:text-4xl"
          lang="sa"
          aria-hidden="true"
        >
          {site.nameDevanagari}
        </p>

        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {site.name}
        </h1>

        <p className="mt-4 text-lg text-muted sm:text-xl">{site.tagline}</p>

        <p className="mx-auto mt-6 text-base leading-relaxed text-muted">
          Sit with each hymn at your own pace. Read the Devanagari with its svara
          tone marks, follow the transliteration, and learn the meaning word by
          word until the chant settles into memory.
        </p>

        <p className="eyebrow mt-8">
          {total} {chantWord} to study
        </p>
      </section>

      <div className="mt-16 space-y-14">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2
              id={`cat-${group.category}`}
              className="eyebrow border-b border-line pb-2.5"
            >
              {group.category}
            </h2>
            <div className="mt-2 divide-y divide-line">
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
