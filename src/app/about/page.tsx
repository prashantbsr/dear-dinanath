import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: ${site.tagline}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <article className="flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p aria-hidden="true" className="chant text-2xl text-saffron">
            {site.nameDevanagari}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            About {site.name}
          </h1>
          <p className="text-muted">{site.tagline}</p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-tight">
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
          <h2 className="text-xl font-semibold tracking-tight">Why it exists</h2>
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
      </article>
    </div>
  );
}
