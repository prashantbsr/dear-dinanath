// Runs before paint to set the palette on <html data-theme>, preventing a flash
// of the wrong theme. Server component that emits a tiny synchronous inline
// script.

/**
 * First-time visitors always get the light default (Slate), regardless of the OS
 * setting. A previously chosen palette is restored from localStorage. Everything
 * is wrapped in try/catch so a blocked storage API never breaks the page, and the
 * value is validated against the known palettes so a stale/garbage entry falls
 * back to Slate.
 */
const themeScript = `(function () {
  var palettes = ["slate", "onyx", "aura", "cyberpunk", "anime"];
  try {
    var saved = localStorage.getItem("dd-theme");
    document.documentElement.dataset.theme =
      palettes.indexOf(saved) !== -1 ? saved : "slate";
  } catch (e) {
    document.documentElement.dataset.theme = "slate";
  }
})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
