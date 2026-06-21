import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: ${site.tagline}`,
};

export default function AboutPage() {
  return (
    <div className="max-w-[62ch]">
      <article className="flex flex-col gap-9">
        <header className="flex flex-col gap-3">
          <p
            aria-hidden="true"
            lang="sa"
            className="glow-text chant text-[0.95rem] leading-none text-accent"
          >
            {site.nameDevanagari}
          </p>
          <h1 className="glow-text font-display text-[clamp(1.875rem,7vw,2.625rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            About {site.name}
          </h1>
          <p className="text-muted">{site.tagline}</p>
        </header>

        <section className="flex flex-col gap-2.5">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
            A quiet place to learn
          </h2>
          <p className="text-muted">
            {site.name} is a small, calm library of Sanskrit and Vedic chants.
            It is for anyone who wants to learn to recite these hymns with care:
            students beginning their study, householders keeping a daily
            practice, and the simply curious who want to read along and
            understand what the words mean.
          </p>
          <p className="text-muted">
            There is no account to create and nothing to buy. You open a chant,
            you read, you listen to the shape of the syllables in your own
            voice, and you return whenever you like.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">Why it exists</h2>
          <p className="text-muted">
            Chants are easy to find and surprisingly hard to learn well. Many
            sources drop the svara tone marks, blur the transliteration, or
            leave out the meaning entirely, so you end up memorizing sounds
            without understanding them.
          </p>
          <p className="text-muted">
            This project tries to do the opposite. Every chant is presented with
            accurate Devanagari, the Vedic svara (tone) marks shown clearly
            above and below the line, a careful transliteration, and a plain
            translation. Where it helps, individual words are glossed so the
            sense of a verse is never a mystery.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
            How the content works
          </h2>
          <p className="text-muted">
            Each chant is a single Markdown file in the project&rsquo;s posts
            folder. Its front matter holds the title, source, deity, and
            difficulty, and the body holds the verses and any notes. When the
            site is built, every one of those files becomes a static page, so
            what you read is exactly what a contributor wrote, with nothing
            generated in between.
          </p>
          <p className="text-muted">
            The whole project is open source. If you would like to add a chant,
            improve a translation, or fix a stray mark, the repository is on{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 transition-colors hover:text-ink"
            >
              GitHub
            </a>
            , and contributions are warmly welcome.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
            The technology
          </h2>
          <p className="text-muted">
            {site.name} is built with Next.js and exported as fully static HTML.
            There is no server doing work while you read, which keeps every page
            fast and friendly to slow connections. The fonts, including the
            serif Devanagari that carries the chants, are self-hosted and
            optimized so text appears quickly and renders the tone marks
            correctly.
          </p>
          <p className="text-muted">
            Because it is static, the site is comfortable to use offline once
            visited, and it runs without trackers, analytics, or advertising of
            any kind. Nothing about your reading is recorded.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
            A note on accuracy
          </h2>
          <p className="text-muted">
            Sanskrit is precise, and accents matter. If you notice an error in
            the Devanagari, the svara marks, the transliteration, or a meaning,
            please tell us. Opening an issue on{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 transition-colors hover:text-ink"
            >
              GitHub
            </a>{" "}
            is the surest way to have a correction reviewed and folded in. Every
            careful eye makes these chants a little more trustworthy for the next
            person.
          </p>
        </section>
      </article>
    </div>
  );
}
