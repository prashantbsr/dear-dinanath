import { site } from "@/lib/site";

/**
 * Quiet site footer: a brand line, the license, a link to the source, and a
 * short note on the spirit of the project. No dynamic year.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-5 py-10 text-sm text-muted">
        <p>
          <span className="font-medium text-ink">{site.name}</span>{" "}
          <span aria-hidden="true" className="font-devanagari text-saffron">
            {site.nameDevanagari}
          </span>
        </p>
        <p>
          Open source under the MIT license.{" "}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            View the source on GitHub
          </a>
          .
        </p>
        <p>Built to be read quietly, with no trackers and no noise.</p>
      </div>
    </footer>
  );
}
