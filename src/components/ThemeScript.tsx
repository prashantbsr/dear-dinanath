// Runs before paint to set the theme class on <html>, preventing a flash of the
// wrong theme. Server component that emits a tiny synchronous inline script.

/**
 * The script reads the saved preference from localStorage. If it is "dark", or
 * if no preference is stored and the OS prefers a dark color scheme, it adds the
 * "dark" class to the document element. All of it is wrapped in try/catch so a
 * blocked storage API never breaks the page.
 */
const themeScript = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
