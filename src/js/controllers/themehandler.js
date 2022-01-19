import { pubsub } from '../models/pubsub'
import { state } from '../models/state'

const themeToggle = document.querySelector(".toggle");
  themeToggle.addEventListener("click", (e) => useTheme(e));

let darkMode = false;
function useTheme(e) {
  const parameter = e.currentTarget.getAttribute("data-parameter");
  if (parameter == "theme") {
    darkMode = !darkMode;
    if (darkMode == true) {
      state.theme = "dark";
    } else {
      state.theme = "light";
    }
    pubsub.publish("theme changed", state);
  }
}

function toggleDarkTheme() {
  const root = document.querySelector(".root");
  const switcher = document.querySelector(".switch");
  const icon = document.querySelector(".icon");
  const mask = document.querySelector(".mask");

  if (state.theme == "dark") {
    root.style.setProperty("--bg-main", "var(--gray-900)");
    root.style.setProperty("--bg-focus", "var(--gray-800)");
    root.style.setProperty("--mid", "var(--gray-500)");
    root.style.setProperty("--high-contrast", "var(--gray-100)");
  } else {
    root.style.setProperty("--bg-main", "var(--gray-100)");
    root.style.setProperty("--bg-focus", "var(--gray-500)");
    root.style.setProperty("--mid", "var(--gray-900)");
    root.style.setProperty("--high-contrast", "var(--gray-800)");
  }
  switcher.classList.toggle("switch-left");
  switcher.classList.toggle("switch-right");
  mask.classList.toggle("nomask");
  icon.classList.toggle("sun");
}

export { toggleDarkTheme }