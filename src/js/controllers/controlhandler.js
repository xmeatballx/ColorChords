import { pubsub } from '../models/pubsub'
import { state } from '../models/state'
import { note } from '../models/factories'


export function attachListeners() {
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
      color: [255, 255, 255],
    })
  );
  pubsub.publish("note added", state);
}