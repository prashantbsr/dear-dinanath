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

interface TextToggleProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

/**
 * A flat text toggle. The active state is marked by a 1px accent underline (the
 * same hairline grammar as the binding thread) plus an ink-weight shift — never
 * a filled pill, and never color alone.
 */
function TextToggle({ label, active, onClick }: TextToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "relative inline-flex min-h-11 items-center rounded-sm px-1 text-sm transition-colors",
        active ? "text-ink" : "text-muted hover:text-ink",
      ].join(" ")}
    >
      {label}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-1 bottom-2.25 h-px transition-colors",
          active ? "bg-accent" : "bg-transparent",
        ].join(" ")}
      />
    </button>
  );
}

/** A small eyebrow label that introduces a control group. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow text-[0.72rem]">{children}</span>;
}

/**
 * The reader's control strip: one thin leaf-toned band, sticky just beneath the
 * header. Three quiet groups — script, what to show, and text size.
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
      className="sticky z-20 border-b border-line bg-surface"
      style={{ top: "var(--header-h)" }}
    >
      <div className="flex flex-wrap items-center gap-x-7 gap-y-1 py-1.5">
        <div className="flex items-center gap-2">
          <GroupLabel>Script</GroupLabel>
          <TextToggle
            label="Accented"
            active={isAccented}
            onClick={() => onScriptModeChange("accented")}
          />
          <TextToggle
            label="Plain"
            active={!isAccented}
            onClick={() => onScriptModeChange("plain")}
          />
        </div>

        <div className="flex items-center gap-2">
          <GroupLabel>Show</GroupLabel>
          <TextToggle
            label="Transliteration"
            active={showTransliteration}
            onClick={onToggleTransliteration}
          />
          <TextToggle
            label="Meaning"
            active={showTranslation}
            onClick={onToggleTranslation}
          />
          <TextToggle
            label="Words"
            active={showWords}
            onClick={onToggleWords}
          />
        </div>

        <div className="flex items-center gap-1.5 sm:ml-auto">
          <GroupLabel>Size</GroupLabel>
          <button
            type="button"
            aria-label="Decrease text size"
            onClick={onDecreaseFontScale}
            disabled={fontScale <= 0.85}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm font-display text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            A
          </button>
          <span
            aria-hidden="true"
            className="w-9 text-center text-xs tabular-nums text-muted"
          >
            {Math.round(fontScale * 100)}%
          </span>
          <button
            type="button"
            aria-label="Increase text size"
            onClick={onIncreaseFontScale}
            disabled={fontScale >= 1.6}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm font-display text-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            A
          </button>
        </div>
      </div>
    </div>
  );
}
