import { state } from "./state.mjs";
import { pubsub } from "./pubsub.mjs";
import { renderListTemplate } from "./renderlist.mjs";
import { toggleDarkTheme, updateShaderUniforms } from "./eventhandler.mjs";
import { note } from "./factories.mjs";
import { drawCanvas } from "./canvas.mjs";

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
drawCanvas();


pubsub.subscribe("note added", renderListTemplate);
pubsub.subscribe("note deleted", renderListTemplate);
pubsub.subscribe("note added", drawCanvas);
pubsub.subscribe("note deleted", drawCanvas);
pubsub.subscribe("controls changed", drawCanvas)
pubsub.subscribe("theme changed", toggleDarkTheme);
