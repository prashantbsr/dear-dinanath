import { site } from "@/lib/site";

export default function HomePage() {
  return (
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
    </section>
  );
}
