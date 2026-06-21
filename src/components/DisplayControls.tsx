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

/** A small mono eyebrow that introduces a control group. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow shrink-0">{children}</span>;
}

/**
 * A toolbar toggle button. The pressed state is a filled, accent-bordered chip
 * (a clear shape + weight change, not color alone); the rest are quiet outline
 * buttons. Used for both the mutually-exclusive script segments and the
 * independent show toggles.
 */
function ToolbarButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "inline-flex min-h-9.5 items-center rounded-lg border px-2.75 text-[0.82rem] transition-colors",
        active
          ? "border-accent bg-accent-soft font-semibold text-accent"
          : "border-line font-medium text-muted hover:border-accent hover:text-ink",
      ].join(" ")}
    >
      {label}
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
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9.5 min-w-9.5 items-center justify-center rounded-lg border border-line text-sm font-semibold text-ink transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line"
    >
      {label}
    </button>
  );
}

/**
 * The reader's control strip: one thin sticky toolbar, stuck flush beneath the
 * header (same canvas + hairline grammar, so it reads as part of the header
 * rather than a floating box). Three labeled groups — script, what to show, and
 * text size — laid out as toolbar buttons that wrap to stacked rows on mobile
 * with their labels kept.
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
      className="sticky z-30 border-b border-line bg-canvas"
      style={{ top: "var(--header-h)", transition: "background-color 0.4s ease" }}
    >
      <div className="flex flex-wrap items-center gap-x-[clamp(1rem,3vw,2rem)] gap-y-2.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <GroupLabel>Script</GroupLabel>
          <div className="flex items-center gap-1.5">
            <ToolbarButton
              label="Accented"
              active={isAccented}
              onClick={() => onScriptModeChange("accented")}
            />
            <ToolbarButton
              label="Plain"
              active={!isAccented}
              onClick={() => onScriptModeChange("plain")}
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <GroupLabel>Show</GroupLabel>
          <div className="flex flex-wrap items-center gap-1.5">
            <ToolbarButton
              label="Transliteration"
              active={showTransliteration}
              onClick={onToggleTransliteration}
            />
            <ToolbarButton
              label="Meaning"
              active={showTranslation}
              onClick={onToggleTranslation}
            />
            <ToolbarButton
              label="Words"
              active={showWords}
              onClick={onToggleWords}
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <GroupLabel>Size</GroupLabel>
          <div className="flex items-center gap-1.5">
            <StepButton
              label="A−"
              ariaLabel="Decrease chant size"
              onClick={onDecreaseFontScale}
              disabled={fontScale <= 0.85}
            />
            <span
              aria-live="polite"
              className="min-w-10.5 text-center font-mono text-[0.72rem] tabular-nums text-ink"
            >
              {Math.round(fontScale * 100)}%
            </span>
            <StepButton
              label="A+"
              ariaLabel="Increase chant size"
              onClick={onIncreaseFontScale}
              disabled={fontScale >= 1.6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
