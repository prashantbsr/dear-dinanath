import type { Verse } from "@/lib/types";

interface VerseCardProps {
  verse: Verse;
  index: number;
  scriptMode: "accented" | "plain";
  showTransliteration: boolean;
  showTranslation: boolean;
  showWords: boolean;
  fontScale: number;
}

const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

/** Render an integer with Devanagari numerals (e.g. 12 → १२) for the folio mark. */
function toDevanagari(value: number): string {
  return String(value)
    .split("")
    .map((digit) => DEVANAGARI_DIGITS[Number(digit)] ?? digit)
    .join("");
}

/**
 * A single verse rendered as a leaf, not a card. The left gutter carries the
 * binding thread: a brass granthi knot and the Devanagari folio numeral anchor
 * the verse. The Devanagari is the hero, with transliteration, translation, and
 * word glosses revealed on demand and aligned to one shared left edge.
 */
export default function VerseCard({
  verse,
  index,
  scriptMode,
  showTransliteration,
  showTranslation,
  showWords,
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
    <article className="grid grid-cols-[var(--thread-gutter)_minmax(0,1fr)]">
      {/* Gutter: the granthi knot + folio numeral, sitting on the thread. */}
      <div className="flex flex-col items-center gap-2 pt-3">
        <span aria-hidden="true" className="granthi" />
        <span aria-hidden="true" className="chant text-[0.95rem] leading-none text-muted">
          {toDevanagari(index + 1)}
        </span>
        <span className="sr-only">Verse {index + 1}</span>
      </div>

      {/* Content: the hero Devanagari and the revealed apparatus. */}
      <div className="min-w-0">
        <p
          className="chant chant-display whitespace-pre-line text-ink"
          style={chantStyle}
          lang="sa"
        >
          {devanagari}
        </p>

        {showTransliteration && (
          <div className="reveal mt-5 max-w-[62ch] space-y-2">
            <p className="whitespace-pre-line text-[1.05rem] italic leading-relaxed text-muted">
              {verse.transliteration}
            </p>
            {verse.phonetic && (
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted">
                {verse.phonetic}
              </p>
            )}
          </div>
        )}

        {showTranslation && (
          <p className="reveal mt-5 max-w-[62ch] text-[1.075rem] leading-relaxed text-ink">
            {verse.translation}
          </p>
        )}

        {showWords && verse.words && verse.words.length > 0 && (
          <dl className="reveal mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {verse.words.map((entry, wordIndex) => (
              <div
                key={`${entry.word}-${wordIndex}`}
                className="rounded-sm bg-surface-2 px-3.5 py-2.5"
              >
                <dt className="chant text-[1.15rem] leading-snug text-ink" lang="sa">
                  {entry.word}
                </dt>
                <dd className="mt-0.5 text-sm leading-snug text-muted">
                  {entry.meaning}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}
