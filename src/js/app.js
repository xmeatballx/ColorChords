import { state } from "./models/state.js";
import { pubsub } from "./models/pubsub.js";
import { renderListTemplate } from "./views/renderlist.js";
import { toggleDarkTheme } from "./controllers/themehandler.js";
import { note } from "./models/factories.js";
import { drawCanvas } from "./views/canvas.js";
import { initPiano, updatePiano } from "./views/piano.js";
import { useColor } from './controllers/colorhandler';

state.notes.push(
  new note({ interval: 1, octave: 0, velocity: 1, color: [] })
);
state.notes.push(
  new note({
    interval: 1.067,
    octave: 0,
    velocity: 0.8,
    color: [],
  })
);

renderListTemplate(state);
window.onload = (() => {
  drawCanvas();
  useColor(state);
  initPiano();
})


pubsub.subscribe("note added", renderListTemplate);
pubsub.subscribe("note deleted", renderListTemplate);
pubsub.subscribe("note added", drawCanvas);
pubsub.subscribe("note deleted", drawCanvas);
pubsub.subscribe("note added", updatePiano);
pubsub.subscribe("note deleted", updatePiano);
pubsub.subscribe("controls changed", updatePiano);
pubsub.subscribe("controls changed", drawCanvas)
pubsub.subscribe("theme changed", toggleDarkTheme);
pubsub.subscribe("color changed", useColor);
