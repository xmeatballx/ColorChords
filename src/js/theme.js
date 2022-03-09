export class Theme {
  constructor() {
    this.darkMode = false;
    this.root = document.querySelector(".root");
    this.switcher = document.querySelector(".switch");
    this.icon = document.querySelector(".icon");
    this.mask = document.querySelector(".mask");
  }
  toggleDark() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      this.root.style.setProperty("--bg-main", "var(--gray-900)");
      this.root.style.setProperty("--bg-focus", "var(--gray-800)");
      this.root.style.setProperty("--mid", "var(--gray-600)");
      this.root.style.setProperty("--high-contrast", "var(--gray-100)");
      this.root.style.setProperty("--light", "var(--gray-500");
    } else {
      this.root.style.setProperty("--bg-main", "var(--gray-100)");
      this.root.style.setProperty("--bg-focus", "var(--gray-500)");
      this.root.style.setProperty("--mid", "var(--gray-800)");
      this.root.style.setProperty("--high-contrast", "var(--gray-900)");
      this.root.style.setProperty("--light", "var(--gray-400");
    }
    this.switcher.classList.toggle("switch-left");
    this.switcher.classList.toggle("switch-right");
    this.mask.classList.toggle("nomask");
    this.icon.classList.toggle("sun");
  }
}
