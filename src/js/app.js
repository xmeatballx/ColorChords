import { state } from "./state.js";
import { pubsub } from "./pubsub.js";
import { renderListTemplate } from "./renderlist.js";
import { toggleDarkTheme } from "./eventhandler.js";
import { note } from "./factories.js";
import { drawCanvas } from "./canvas.js";
import { initPiano } from "./piano.js";

state.notes.push(
  new note({ interval: 1, octave: 0, velocity: 1, color: [255, 0, 0] })
);
state.notes.push(
  new note({
    interval: 1.067,
    octave: 0,
    velocity: 0.8,
    color: [137, 215, 220],
  })
);

renderListTemplate(state);
window.onload = (() => {
  drawCanvas();
})
initPiano();


pubsub.subscribe("note added", renderListTemplate);
pubsub.subscribe("note deleted", renderListTemplate);
pubsub.subscribe("note added", drawCanvas);
pubsub.subscribe("note deleted", drawCanvas);
pubsub.subscribe("controls changed", drawCanvas)
pubsub.subscribe("theme changed", toggleDarkTheme);
