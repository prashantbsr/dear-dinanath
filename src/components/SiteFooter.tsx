import { site } from "@/lib/site";

/**
 * Quiet leaf-toned footer. A wordmark, a one-line svara legend that echoes the
 * signature once, the license + source, and a short note on the project's spirit.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell flex flex-col gap-3 py-10 text-sm text-muted">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <span className="flex items-center gap-2.5 font-display text-base text-ink">
            <span aria-hidden="true" className="granthi shrink-0" />
            {site.name}
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="font-devanagari text-secondary">
              ◌॑
            </span>
            <span>udātta above</span>
            <span aria-hidden="true" className="text-line">
              ·
            </span>
            <span aria-hidden="true" className="font-devanagari text-secondary">
              ◌॒
            </span>
            <span>anudātta below</span>
          </span>
        </div>
        <p>
          Open source under the MIT license.{" "}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 transition-colors hover:text-ink"
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
