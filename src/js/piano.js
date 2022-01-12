import { list } from "postcss";
import { Instrument } from "../../node_modules/piano-chart/piano-chart.esm.js";

const piano = new Instrument(document.getElementById("piano_container"), {
  startOctave: 0,
  endOctave: 9,
  keyPressStyle: "vivid",
});
piano.create();
// piano.keyDown("C4");

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

const activeNotes = [];
activeNotes.push(createNote(0));
drawNotes(activeNotes);

let numNotes = 0;

const addIcon = document.querySelector(".add_interval_button");
addIcon.addEventListener("mouseup", () => {
  numNotes++;
  activeNotes.push(createNote(numNotes));
  drawNotes(activeNotes);

  const intervals = document.querySelectorAll(`select.param`);
  [...intervals].forEach((interval) => {
    interval.addEventListener("change", (e) => {
      const index = e.target.attributes.id.value.replace("interval", "");
      removeNoteFromActive(index);
      activeNotes.push(createNote(index));
      drawNotes(activeNotes);
    });
  });

  const octaves = document.querySelectorAll(`input.octave`);
  [...octaves].forEach((octave) => {
    octave.addEventListener("input", (e) => {
      const index = e.target.attributes.id.value.replace("octave", "");
      removeNoteFromActive(index);
      activeNotes.push(createNote(index));
      drawNotes(activeNotes);
    });
  });
});

// const removeIcon = document.querySelector(".remove_interval_button");
// removeIcon.addEventListener("mouseup", () => {
//   activeNotes.splice(numNotes, 1);
//   drawNotes(activeNotes);
//   numNotes--;
// });

function createNote(index) {
  let noteName = ["", 0];

  let interval = document.querySelector(`#interval${index}`);
  noteName[0] = noteNames[interval.selectedIndex];

  const octave = document.querySelector(`#octave${index}`);
  noteName[1] = parseInt(octave.value) + 4;

  noteName[2] = index;

  return noteName;
}

// octave.addEventListener("input", (e) => {
//   drawNotes();
// });

function drawNotes(notes) {
  piano.destroy();
  piano.create();

  notes.forEach((note, index) => {
    piano.keyDown(note[0] + note[1]);
  });
}

function removeNoteFromActive(index) {
  const matches = [];
  const match = activeNotes.find((matchItem) => matchItem[2] == index);
  matches.push(match);
  activeNotes.splice(activeNotes.indexOf(match), 1);
}
