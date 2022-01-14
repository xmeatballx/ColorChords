import { state } from "./state.mjs";
import { pubsub } from "./pubsub.mjs";

function attachListeners() {
  const params = document.querySelectorAll(".param");

  [...params].forEach((param) => {
    param.addEventListener("input", (e) => useParam(e));
  });
  const themeToggle = document.querySelector(".toggle");
  themeToggle.addEventListener("click", (e) => useTheme(e));

  [...params].forEach((slider) => {
    slider.addEventListener("input", (e) => updateControlsUI(e));
  });
}

function useParam(e) {
  const index = e.target.getAttribute("data-index");
  const parameter = e.target.getAttribute("data-parameter");
  const value = e.target.value;
  console.log(value);
  if (
    parameter == "velocity" ||
    parameter == "octave" ||
    parameter == "interval"
  ) {
    state.notes[index][parameter] = value;
    pubsub.publish("controls changed", state);
  }
  if (parameter == "transpose") {
    state.transpose = value;
    pubsub.publish("controls changed", state);
  }
}

function useTheme(e) {
  const parameter = e.target.getAttribute("data-parameter");
  if (parameter == "theme") {
    state.theme = value;
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
    valueDisplays[index * 2 + 2].textContent = value * 100 + "%";
}

export { attachListeners };
