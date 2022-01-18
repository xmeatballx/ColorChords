import { state } from "./state.mjs";
import { pubsub } from "./pubsub.mjs";
import { renderListTemplate } from "./renderlist.mjs";
import { toggleDarkTheme, updateShaderUniforms } from "./eventhandler.mjs";
import { note } from "./factories.mjs";

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
updateShaderUniforms();

state.notes.forEach(note, index => {
  const colorPreviews = document.querySelectorAll(".color_preview");
  colorPreviews[index].style.backgroundColor = `rgb(${note.color[0]} ${note.color[1]} ${note.color[2]})`
  console.log(note.color)
})

pubsub.subscribe("note added", renderListTemplate);
pubsub.subscribe("note deleted", renderListTemplate);
pubsub.subscribe("note added", updateShaderUniforms);
pubsub.subscribe("controls changed", updateShaderUniforms);
pubsub.subscribe("theme changed", toggleDarkTheme);
