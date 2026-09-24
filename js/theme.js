(function () {
  const root = document.documentElement;
  const STORAGE_KEY = "theme";

  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (_) {
      /* ignore storage errors (private mode, etc.) */
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    const isLight = theme === "light";
    const icon = toggle.querySelector("i");
    if (icon) icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
    toggle.setAttribute("aria-pressed", String(isLight));
    toggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme",
    );
  }

  function toggleTheme() {
    const current =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(current);
    try {
      localStorage.setItem(STORAGE_KEY, current);
    } catch (_) {
      /* ignore storage errors */
    }
  }

  applyTheme(getInitialTheme());

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.addEventListener("click", toggleTheme);
  });
})();