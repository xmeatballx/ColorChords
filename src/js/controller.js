import { Theme } from "./theme";
import { Colors } from "./colors";
import { Piano } from "./piano";
import { Palette } from "./palette";
import { Params } from "./params";

export const Controller = function () {
  this.theme = new Theme();
  this.piano = new Piano();
  this.colors = new Colors();
  this.palette = new Palette();
  this.params = new Params();
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
  chords.addEventListener("click", (e) => this.handleChords(e));
};

Controller.prototype.useHold = function (e) {
  this.params.handleHold(e);
  [...this.actives].forEach((note) => {
    this.disposeNote(note);
  });
  this.palette.render(this.colors);
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
    this.colors.add(noteEvent);
    this.piano.keyDown(note, this.colors.getColorStyleRule(note));
    this.actives.push(note);
  }
};

Controller.prototype.disposeNote = function (note) {
  this.piano.keyUp(note);
  this.colors.remove(note);
  this.actives.splice(this.colors.indexOf(note), 1);
  console.log(this.colors);
};

function alreadyActive(key) {
  const active = key.getAttribute("data-active");
  return active == "false" ? false : true;
}
