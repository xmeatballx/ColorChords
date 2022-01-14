import { pubsub } from "./pubsub.mjs";
import { state } from "./state.mjs";
import { Instrument } from "piano-chart";

const noteNames = [
  "C",
  "C#",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "Bb",
  "B",
];

const pianoOptions = {
  startOctave: 0,
  endOctave: 9,
  keyPressStyle: "vivid",
};
const piano = new Instrument(
  document.getElementById("piano_container"),
  pianoOptions
);
piano.create();

function formatNoteName(state, index) {
  const intervalIndex = [...document.querySelectorAll(".interval")][index]
    .selectedIndex;
  //   console.log(noteNames[intervalIndex], state.notes[index].octave);
  return `${
    noteNames[intervalIndex] + (parseInt(state.notes[index].octave) + 4)
  }`;
}

const prevNotes = new Set();
function updatePiano(state) {
  console.log(prevNotes);
  prevNotes.forEach((note) => piano.keyUp(note));

  state.notes.forEach((note, index) => {
    const noteName = formatNoteName(state, index);
    prevNotes.add(noteName);
    piano.keyDown(noteName);
  });
}

updatePiano(state);

pubsub.subscribe("controls changed", updatePiano);
