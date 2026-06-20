// A scholarly citation line — source, deity, category, level — like the
// apparatus on a manuscript leaf, used on the chant page and on index cards.
//
// Whitespace is spelled with escapes on purpose: each value keeps its own words
// together (so "Rigveda 2.23.1" never splits across lines) by swapping its
// spaces for non-breaking spaces, and the separator binds its middle dot to the
// preceding value ( ) while leaving a normal, breakable space ( )
// before the next — so the line only ever wraps between items.

const NBSP = "\u00A0";
const SEPARATOR = "\u00A0\u00B7\u0020";

interface CitationLineProps {
  items: string[];
  className?: string;
}

export default function CitationLine({ items, className }: CitationLineProps) {
  return (
    <p className={["eyebrow", className].filter(Boolean).join(" ")}>
      {items.map((value, index) => (
        <span key={value}>
          {index > 0 && (
            <span aria-hidden="true" className="text-accent-soft">
              {SEPARATOR}
            </span>
          )}
          {value.replace(/\u0020/g, NBSP)}
        </span>
      ))}
    </p>
  );
}
