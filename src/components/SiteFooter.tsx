import { site } from "@/lib/site";

/**
 * Quiet footer: a thin strip with a single top hairline holding the wordmark
 * and the license note with a source link.
 */
export default function SiteFooter() {
  return (
    <footer
      className="border-t border-line bg-canvas"
      style={{ transition: "background-color 0.4s ease" }}
    >
      <div className="shell flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5 py-7 text-sm text-muted">
        <span className="flex items-baseline gap-2">
          <span className="font-display text-sm font-bold text-ink">
            {site.name}
          </span>
          <span
            aria-hidden="true"
            lang="sa"
            className="chant text-xs leading-none text-accent opacity-70"
          >
            {site.nameDevanagari}
          </span>
        </span>

        <p className="text-xs leading-relaxed">
          Open source under the MIT license ·{" "}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 transition-colors hover:text-ink"
          >
            View the source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
