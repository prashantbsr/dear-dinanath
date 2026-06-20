"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/lib/types";
import DisplayControls from "@/components/DisplayControls";
import VerseCard from "@/components/VerseCard";

interface ChantReaderProps {
  post: Post;
}

type ScriptMode = "accented" | "plain";

interface Prefs {
  scriptMode: ScriptMode;
  showTransliteration: boolean;
  showTranslation: boolean;
  showWords: boolean;
  fontScale: number;
}

const STORAGE_KEY = "ddn:prefs";

const DEFAULT_PREFS: Prefs = {
  scriptMode: "accented",
  showTransliteration: true,
  showTranslation: true,
  showWords: false,
  fontScale: 1,
};

const FONT_MIN = 0.85;
const FONT_MAX = 1.6;
const FONT_STEP = 0.1;

/** Round to one decimal so repeated steps stay clean (e.g. 1.1, not 1.10000001). */
function clampFontScale(value: number): number {
  const clamped = Math.min(FONT_MAX, Math.max(FONT_MIN, value));
  return Math.round(clamped * 10) / 10;
}

/**
 * The interactive heart of a chant page. It owns the reader's display
 * preferences, restores them from localStorage after mount (so the first paint
 * matches the server and avoids a hydration mismatch), and persists any change.
 */
export default function ChantReader({ post }: ChantReaderProps) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [mounted, setMounted] = useState(false);

  // Load saved preferences once, after the initial render with defaults.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Prefs>;
        setPrefs((current) => ({
          ...current,
          ...saved,
          fontScale:
            typeof saved.fontScale === "number"
              ? clampFontScale(saved.fontScale)
              : current.fontScale,
        }));
      }
    } catch {
      // Ignore unreadable or malformed storage; defaults remain.
    }
    setMounted(true);
  }, []);

  // Persist on every change, but only after we have hydrated from storage.
  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Storage may be unavailable (private mode); fail quietly.
    }
  }, [prefs, mounted]);

  const setScriptMode = (scriptMode: ScriptMode) =>
    setPrefs((current) => ({ ...current, scriptMode }));

  const toggleTransliteration = () =>
    setPrefs((current) => ({
      ...current,
      showTransliteration: !current.showTransliteration,
    }));

  const toggleTranslation = () =>
    setPrefs((current) => ({
      ...current,
      showTranslation: !current.showTranslation,
    }));

  const toggleWords = () =>
    setPrefs((current) => ({ ...current, showWords: !current.showWords }));

  const decreaseFontScale = () =>
    setPrefs((current) => ({
      ...current,
      fontScale: clampFontScale(current.fontScale - FONT_STEP),
    }));

  const increaseFontScale = () =>
    setPrefs((current) => ({
      ...current,
      fontScale: clampFontScale(current.fontScale + FONT_STEP),
    }));

  return (
    <div>
      <DisplayControls
        scriptMode={prefs.scriptMode}
        showTransliteration={prefs.showTransliteration}
        showTranslation={prefs.showTranslation}
        showWords={prefs.showWords}
        fontScale={prefs.fontScale}
        onScriptModeChange={setScriptMode}
        onToggleTransliteration={toggleTransliteration}
        onToggleTranslation={toggleTranslation}
        onToggleWords={toggleWords}
        onDecreaseFontScale={decreaseFontScale}
        onIncreaseFontScale={increaseFontScale}
      />

      <div className="space-y-6">
        {post.verses.map((verse, index) => (
          <VerseCard
            key={index}
            verse={verse}
            index={index}
            scriptMode={prefs.scriptMode}
            showTransliteration={prefs.showTransliteration}
            showTranslation={prefs.showTranslation}
            showWords={prefs.showWords}
            fontScale={prefs.fontScale}
          />
        ))}
      </div>
    </div>
  );
}
