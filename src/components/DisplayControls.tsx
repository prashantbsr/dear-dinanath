type ScriptMode = "accented" | "plain";

interface DisplayControlsProps {
  scriptMode: ScriptMode;
  showTransliteration: boolean;
  showTranslation: boolean;
  showWords: boolean;
  fontScale: number;
  onScriptModeChange: (mode: ScriptMode) => void;
  onToggleTransliteration: () => void;
  onToggleTranslation: () => void;
  onToggleWords: () => void;
  onDecreaseFontScale: () => void;
  onIncreaseFontScale: () => void;
}

/**
 * An icon-only toggle. The pressed state is a filled, accent-bordered chip (a
 * clear shape + color change); the rest are quiet, borderless, muted glyphs.
 */
function IconButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      onClick={onClick}
      className={[
        "inline-flex h-7.5 w-8.5 items-center justify-center rounded-md border transition-colors",
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-transparent text-muted hover:text-ink",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/** A square stepper button for the text-size control. */
function StepButton({
  label,
  ariaLabel,
  onClick,
  disabled,
}: {
  label: string;
  ariaLabel: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-7.5 w-8.5 items-center justify-center rounded-md border border-transparent text-sm font-semibold text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-muted"
    >
      {label}
    </button>
  );
}

/**
 * The reader's control strip: a single minimal, icon-based toolbar that floats
 * centered at the bottom of the viewport over the verses, on a translucent,
 * blurred panel. Script is a one-tap accent toggle; transliteration, meaning, and
 * words are icon toggles; size is a quiet A−/A+ stepper. Rendered only on the
 * reader, so it owns the bottom-of-screen reach zone.
 */
export default function DisplayControls({
  scriptMode,
  showTransliteration,
  showTranslation,
  showWords,
  fontScale,
  onScriptModeChange,
  onToggleTransliteration,
  onToggleTranslation,
  onToggleWords,
  onDecreaseFontScale,
  onIncreaseFontScale,
}: DisplayControlsProps) {
  const isAccented = scriptMode === "accented";

  return (
    <div
      role="toolbar"
      aria-label="Reading controls"
      className="fixed bottom-[clamp(14px,3vw,22px)] left-1/2 z-70 flex -translate-x-1/2 items-center gap-1 rounded-[9px] border border-line p-1.5 shadow-[0_10px_34px_-14px_rgb(0_0_0/0.4)]"
      style={{
        background: "color-mix(in srgb, var(--canvas) 80%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "background-color 0.4s ease",
      }}
    >
      <IconButton
        label="Vedic accent marks"
        active={isAccented}
        onClick={() => onScriptModeChange(isAccented ? "plain" : "accented")}
      >
        {/* Two svara carets above a baseline. */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12l3-4 3 4" />
          <path d="M13 12l3-4 3 4" />
          <path d="M4 18h16" />
        </svg>
      </IconButton>

      <IconButton
        label="Transliteration"
        active={showTransliteration}
        onClick={onToggleTransliteration}
      >
        {/* Translate glyph. */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
        </svg>
      </IconButton>

      <IconButton
        label="Meaning"
        active={showTranslation}
        onClick={onToggleTranslation}
      >
        {/* Lines of text. */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h10" />
        </svg>
      </IconButton>

      <IconButton label="Word by word" active={showWords} onClick={onToggleWords}>
        {/* 2×2 grid. */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="7" height="7" rx="1.2" />
          <rect x="13" y="4" width="7" height="7" rx="1.2" />
          <rect x="4" y="13" width="7" height="7" rx="1.2" />
          <rect x="13" y="13" width="7" height="7" rx="1.2" />
        </svg>
      </IconButton>

      <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-line" />

      <StepButton
        label="A−"
        ariaLabel="Decrease chant size"
        onClick={onDecreaseFontScale}
        disabled={fontScale <= 0.85}
      />
      <StepButton
        label="A+"
        ariaLabel="Increase chant size"
        onClick={onIncreaseFontScale}
        disabled={fontScale >= 1.6}
      />
    </div>
  );
}
