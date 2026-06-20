import type { Verse } from "@/lib/types";

interface VerseCardProps {
  verse: Verse;
  index: number;
  scriptMode: "accented" | "plain";
  showTransliteration: boolean;
  showTranslation: boolean;
  fontScale: number;
}

/**
 * A single verse rendered as a calm study card. The Devanagari is the hero,
 * with transliteration and translation revealed on demand.
 */
export default function VerseCard({
  verse,
  index,
  scriptMode,
  showTransliteration,
  showTranslation,
  fontScale,
}: VerseCardProps) {
  const devanagari =
    scriptMode === "plain" ? verse.plain ?? verse.devanagari : verse.devanagari;

  // Scale the shared --chant-display-size token (defined in globals.css) by the
  // reader's chosen text size. This keeps the responsive clamp in one place.
  const chantStyle = {
    fontSize: `calc(var(--chant-display-size) * ${fontScale})`,
  };

  return (
    <article className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <p className="text-sm font-medium tracking-wide text-saffron">
        {index + 1}
      </p>

      <p
        className="chant chant-display mt-3 whitespace-pre-line text-ink"
        style={chantStyle}
      >
        {devanagari}
      </p>

      {showTransliteration && (
        <div className="mt-5 space-y-2">
          <p className="whitespace-pre-line italic text-muted">
            {verse.transliteration}
          </p>
          {verse.phonetic && (
            <p className="whitespace-pre-line text-sm text-muted">
              {verse.phonetic}
            </p>
          )}
        </div>
      )}

      {showTranslation && (
        <p className="mt-5 leading-relaxed text-ink">{verse.translation}</p>
      )}
    </article>
  );
}
