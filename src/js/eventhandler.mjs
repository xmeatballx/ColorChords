import { state } from "./state.mjs";
import { pubsub } from "./pubsub.mjs";
import { note } from "./factories.mjs";
// import { plane } from "./curtains.mjs";

  const themeToggle = document.querySelector(".toggle");
  themeToggle.addEventListener("click", (e) => useTheme(e));
function attachListeners() {
  const params = document.querySelectorAll(".param");

  [...params].forEach((param) => {
    param.addEventListener("input", (e) => useParam(e));
  });


  [...params].forEach((slider) => {
    slider.addEventListener("input", (e) => updateControlsUI(e));
  });

  const addColorButton = document.querySelector(".add_interval_button");
  addColorButton.addEventListener("click", addNote);
}

function useParam(e) {
  const index = e.target.getAttribute("data-index");
  const parameter = e.target.getAttribute("data-parameter");
  const value = e.target.value;
  if (
    parameter == "velocity" ||
    parameter == "octave" ||
    parameter == "interval"
  ) {
    state.notes[index][parameter] = parseFloat(value,10);
    pubsub.publish("controls changed", state);
  }
  if (parameter == "transpose") {
    state.transpose = value;
    pubsub.publish("controls changed", state);
  }
}

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

function updateControlsUI(e) {
  const index = e.target.getAttribute("data-index");
  const parameter = e.target.getAttribute("data-parameter");
  const value = e.target.value;
  const valueDisplays = document.querySelectorAll(".slider_value");
  if (parameter == "transpose") valueDisplays[0].textContent = value;
  if (parameter == "octave") valueDisplays[index * 2 + 1].textContent = value;
  if (parameter == "velocity")
    valueDisplays[index * 2 + 2].textContent = Math.floor(value * 100) + "%";
  
}

function addNote(e) {
  const intervalSelect = document.querySelector(".interval");
  state.notes.push(
    new note({
      interval: intervalSelect.children[state.notes.length % 12].value,
      octave: 0,
      velocity: 1,
      color: [0, 0, 255],
    })
  );
  pubsub.publish("note added", state);
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

export { attachListeners, toggleDarkTheme };
