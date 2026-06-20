// Runs before paint to set the theme class on <html>, preventing a flash of the
// wrong theme. Server component that emits a tiny synchronous inline script.

/**
 * Light is the default theme for everyone on a first visit, regardless of the OS
 * setting. Dark is an explicit opt-in: we add the "dark" class only when the
 * visitor has previously chosen it. All of it is wrapped in try/catch so a
 * blocked storage API never breaks the page.
 */
const themeScript = `(function () {
  try {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
