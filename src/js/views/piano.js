import { pubsub } from "../models/pubsub.js";
import { state } from "../models/state.js";
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

let piano;
const initPiano = () => {

  const pianoOptions = {
    startOctave: 0,
    endOctave: 9,
    keyPressStyle: "vivid",
  };9
  piano = new Instrument(
    document.getElementById("piano_container"),
    pianoOptions
  );
  piano.create();
  updatePiano(state);
}

function formatNoteName(state, index) {
  const intervalIndex = [...document.querySelectorAll("select[data-parameter='interval']")][index]
    .selectedIndex;
    const note = intervalIndex+Math.floor(state.transpose/180*6) >= 0 ? `${
    noteNames[intervalIndex+Math.floor(state.transpose/180*6)] + (parseInt(state.notes[index].octave) + 4)}`
    : intervalIndex+12+Math.floor(state.transpose/180*6) != 0 ? `${
    noteNames[intervalIndex+12+Math.floor(state.transpose/180*6)] + (parseInt(state.notes[index].octave) + 3)}` : `${noteNames[0] + (parseInt(state.notes[index].octave) + 4)}`
  return note;
}

const prevNotes = new Set();
function updatePiano(state) {
  prevNotes.forEach((note) => piano.keyUp(note));

  state.notes.forEach((note, index) => {
    const noteName = formatNoteName(state, index);
    prevNotes.add(noteName);
    piano.keyDown(noteName);
  });
}

  

export {initPiano, updatePiano}