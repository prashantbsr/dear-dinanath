import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { site } from "@/lib/site";
import ChantCard from "@/components/ChantCard";

export default function HomePage() {
  const groups = getPostsByCategory();
  const total = getAllPosts().length;
  const chantWord = total === 1 ? "chant" : "chants";

  return (
    <>
      <section className="mx-auto max-w-2xl text-center">
        <p
          className="chant text-3xl text-saffron-soft sm:text-4xl"
          lang="sa"
          aria-hidden="true"
        >
          {site.nameDevanagari}
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {site.name}
        </h1>

        <p className="mt-4 text-lg text-muted sm:text-xl">{site.tagline}</p>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">
          Sit with each hymn at your own pace. Read the Devanagari with its svara
          tone marks, follow the transliteration, and learn the meaning word by
          word until the chant settles into memory.
        </p>

        <p className="mt-8 text-sm text-muted">
          {total} {chantWord} to study, gathered with care.
        </p>
      </section>

      <div className="mt-20 space-y-16">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2
              id={`cat-${group.category}`}
              className="text-xl font-semibold text-ink"
            >
              {group.category}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
