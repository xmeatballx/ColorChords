import { pubsub } from "../models/pubsub.js";
import { state } from "../models/state.js";
import { Instrument } from "piano-chart";

export const initPiano = () => {
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
    return `${
      noteNames[intervalIndex] + (parseInt(state.notes[index].octave) + 4)
    }`;
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

  updatePiano(state);

  pubsub.subscribe("note added", updatePiano);
  pubsub.subscribe("controls changed", updatePiano);
}