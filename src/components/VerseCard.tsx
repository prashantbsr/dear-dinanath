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
 * One verse, separated from the next by whitespace and a single top hairline — no
 * card, no shadow. A Devanagari folio numeral anchors it in the left gutter; the
 * Devanagari is the hero (chant scale × the reader's --scale, line-height held at
 * 2.05 so the svara marks never clip). The apparatus — IAST, translation, word
 * glosses — reveals on demand, aligned to one shared left edge.
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

  return (
    <article className="flex gap-[clamp(0.75rem,3vw,1.25rem)] border-t border-line py-[clamp(1.25rem,4vw,1.875rem)]">
      {/* Gutter: the Devanagari folio numeral. */}
      <div className="w-6.5 shrink-0 pt-1.5">
        <span
          aria-hidden="true"
          lang="sa"
          className="chant text-lg leading-none text-muted opacity-70"
        >
          {toDevanagari(index + 1)}
        </span>
        <span className="sr-only">Verse {index + 1}</span>
      </div>

      {/* Content: the hero Devanagari and the revealed apparatus. */}
      <div className="min-w-0 flex-1">
        <p
          className="chant chant-display whitespace-pre-line font-medium text-ink"
          style={{ "--scale": fontScale } as React.CSSProperties}
          lang="sa"
        >
          {devanagari}
        </p>

        {showTransliteration && (
          <div className="reveal mt-[clamp(1rem,3vw,1.25rem)] max-w-[62ch]">
            <p className="whitespace-pre-line font-text text-[clamp(0.84rem,3.4vw,0.94rem)] italic leading-relaxed text-muted">
              {verse.transliteration}
            </p>
            {verse.phonetic && (
              <p className="mt-1.5 whitespace-pre-line font-mono text-[0.78rem] leading-relaxed text-muted opacity-75">
                {verse.phonetic}
              </p>
            )}
          </div>
        )}

        {showTranslation && (
          <p className="reveal mt-[clamp(0.875rem,3vw,1.125rem)] max-w-[62ch] text-[clamp(0.84rem,3.4vw,0.94rem)] leading-relaxed text-ink">
            {verse.translation}
          </p>
        )}

        {showWords && verse.words && verse.words.length > 0 && (
          <dl className="reveal mt-[clamp(1rem,3vw,1.25rem)] grid grid-cols-[repeat(auto-fit,minmax(15.625rem,1fr))] gap-1.75">
            {verse.words.map((entry, wordIndex) => (
              <div
                key={`${entry.word}-${wordIndex}`}
                className="flex items-baseline gap-2.5 rounded-lg bg-surface-2 px-3 py-2.25"
              >
                <dt
                  className="chant shrink-0 text-base leading-none text-ink"
                  lang="sa"
                >
                  {entry.word}
                </dt>
                <dd className="text-[0.78rem] leading-snug text-muted">
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
