function Theme() {
  this.darkMode = false;

  Theme.prototype.toggleDark = function (darkMode) {
    this.darkMode = !this.darkMode;
    const root = document.querySelector(".root");
    const switcher = document.querySelector(".switch");
    const icon = document.querySelector(".icon");
    const mask = document.querySelector(".mask");

    if (this.darkMode) {
      root.style.setProperty("--bg-main", "var(--gray-900)");
      root.style.setProperty("--bg-focus", "var(--gray-800)");
      root.style.setProperty("--mid", "var(--gray-600)");
      root.style.setProperty("--high-contrast", "var(--gray-100)");
      root.style.setProperty("--light", "var(--gray-500")
    } else {
      root.style.setProperty("--bg-main", "var(--gray-100)");
      root.style.setProperty("--bg-focus", "var(--gray-500)");
      root.style.setProperty("--mid", "var(--gray-800)");
      root.style.setProperty("--high-contrast", "var(--gray-900)");
      root.style.setProperty("--light", "var(--gray-400")
    }
    switcher.classList.toggle("switch-left");
    switcher.classList.toggle("switch-right");
    mask.classList.toggle("nomask");
    icon.classList.toggle("sun");
  };
}

export { Theme };
