import { Theme } from "./theme";
import { Colors } from "./colors";
import { Piano } from "./piano";
import { Palette } from "./palette";
import { Params } from "./params";
import { Chords } from "./chords";

export const Controller = function () {
  this.theme = new Theme();
  this.piano = new Piano();
  this.colors = new Colors();
  this.palette = new Palette();
  this.params = new Params();
  this.chords = new Chords();
  this.actives = [];
};

Controller.prototype.handleTheme = function () {
  const themeToggle = document.querySelector(".toggle");
  themeToggle.onclick = (e) => this.theme.toggleDark(e);
};

Controller.prototype.handleParams = function () {
  const holdSwitch = document.querySelector(".hold");
  const octaveUp = document.querySelector(".octave-up");
  const octaveDown = document.querySelector(".octave-down");
  const chords = document.querySelector(".chords");

  holdSwitch.addEventListener("click", (e) => this.useHold(e));
  octaveUp.addEventListener("click", (e) =>
    this.params.useOctave(e, this.piano.octaves)
  );
  octaveDown.addEventListener("click", (e) =>
    this.params.useOctave(e, this.piano.octaves)
  );
  chords.addEventListener("click", (e) => {
    this.handleChords(e);
  });
};

Controller.prototype.useHold = function (e) {
  this.params.handleHold(e);
  [...this.actives].forEach((note) => {
    this.disposeNote(note);
  });
  this.palette.render(this.colors);
};

Controller.prototype.handleChords = function () {
  this.chords.showChords();
  this.chords.chordElements.forEach((chordElement, index) => {
    this.chords.paintUI(chordElement, index);
    chordElement.addEventListener("click", (e) => {
      this.chords.highlightInUI(e);
      const chord = this.chords.getChord(chordElement, index);
      if (chord.root == "" || chord.type == "") return;
      [...this.piano.keys].forEach((key) => this.piano.keyUp(key));
      this.colors.clear();
      this.actives.length = 0;
      chord.forEach((interval) => {
        const noteNum = ((interval - 1) % 12) + 1;
        const octave = interval > 12 ? 5 : 4;
        console.log(noteNum, octave);
        const note = document.querySelector(
          `#piano path:nth-of-type(${noteNum})[data-octave="${octave}"]`
        );
        const color = this.colors.getColorByKey(note, {});
        this.piano.keyDown(note, this.colors.getColorStyleRule(color));
        this.colors.add({ target: note });
        this.actives.push(note);
      });
      this.palette.render(this.colors);
    });
  });
};

Controller.prototype.handlePianoInput = function () {
  const pianoKeys = document.querySelectorAll("section#piano svg > g > path");
  [...pianoKeys].forEach((key) => {
    key.addEventListener("mousedown", (e) => {
      !alreadyActive(e.target) ? this.useNote(e) : this.disposeNote(e.target);
      this.palette.render(this.colors);
    });

    key.addEventListener("mouseup", (e) => {
      if (this.params.hold == false) {
        this.disposeNote(e.target);
        this.palette.render(this.colors);
      }
    });

    key.addEventListener("touchstart", (e) => {
      if (!this.params.hold) {
        !alreadyActive(e.target) ? this.useNote(e) : this.disposeNote(e.target);
        this.palette.render(this.colors);
      }
    });
  });
};

Controller.prototype.useNote = function (noteEvent) {
  if (this.actives.length < 10) {
    const note = noteEvent.target;
    const color = this.colors.getColorByKey(note, noteEvent);
    this.colors.add(noteEvent);
    this.piano.keyDown(note, this.colors.getColorStyleRule(color));
    this.actives.push(note);
  }
};

Controller.prototype.disposeNote = function (note) {
  this.piano.keyUp(note);
  this.colors.remove(note);
  this.actives.splice(this.colors.indexOf(note), 1);
};

function alreadyActive(key) {
  const active = key.getAttribute("data-active");
  return active == "false" ? false : true;
}
