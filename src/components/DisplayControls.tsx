type ScriptMode = "accented" | "plain";

interface DisplayControlsProps {
  scriptMode: ScriptMode;
  showTransliteration: boolean;
  showTranslation: boolean;
  showWords: boolean;
  onScriptModeChange: (mode: ScriptMode) => void;
  onToggleTransliteration: () => void;
  onToggleTranslation: () => void;
  onToggleWords: () => void;
}

interface ToggleChipProps {
  label: string;
  pressed: boolean;
  onClick: () => void;
}

/** A pill toggle whose pressed state is reflected for assistive technology. */
function ToggleChip({ label, pressed, onClick }: ToggleChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={[
        "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        pressed
          ? "border-saffron bg-saffron text-canvas"
          : "border-line bg-surface text-muted hover:text-ink",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

/**
 * The sticky control bar for the reader. It governs script and the visibility
 * of transliteration, meaning, and word glosses.
 */
export default function DisplayControls({
  scriptMode,
  showTransliteration,
  showTranslation,
  showWords,
  onScriptModeChange,
  onToggleTransliteration,
  onToggleTranslation,
  onToggleWords,
}: DisplayControlsProps) {
  const isAccented = scriptMode === "accented";

  return (
    <div className="sticky top-16 z-20 -mx-4 mb-8 border-b border-line bg-canvas/80 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div
          role="group"
          aria-label="Script"
          className="inline-flex rounded-full border border-line bg-surface-2 p-1"
        >
          <button
            type="button"
            aria-pressed={isAccented}
            onClick={() => onScriptModeChange("accented")}
            className={[
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              isAccented ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink",
            ].join(" ")}
          >
            Accented
          </button>
          <button
            type="button"
            aria-pressed={!isAccented}
            onClick={() => onScriptModeChange("plain")}
            className={[
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              !isAccented ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink",
            ].join(" ")}
          >
            Plain
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ToggleChip
            label="Transliteration"
            pressed={showTransliteration}
            onClick={onToggleTransliteration}
          />
          <ToggleChip
            label="Meaning"
            pressed={showTranslation}
            onClick={onToggleTranslation}
          />
          <ToggleChip
            label="Words"
            pressed={showWords}
            onClick={onToggleWords}
          />
        </div>
      </div>
    </div>
  );
}
