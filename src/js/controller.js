import { Theme } from "./theme";
import { Colors } from "./colors";
import { Piano } from "./piano";
import { Palette } from "./palette";

export const Controller = function () {
  this.theme = new Theme();
  this.piano = new Piano();
  this.colors = new Colors();
  this.palette = new Palette();
  this.actives = [];
  this.hold = true;
};

Controller.prototype.handleTheme = function () {
  const themeToggle = document.querySelector(".toggle");
  themeToggle.onclick = (e) => this.theme.toggleDark(e);
};

Controller.prototype.handleParams = function () {
  const holdSwitch = document.querySelector(".hold");
  const octaveUp = document.querySelector(".octave-up");
  const octaveDown = document.querySelector(".octave-down");

  holdSwitch.addEventListener("click", (e) => this.handleHold(e));
  octaveUp.addEventListener("click", (e) => "");
};

Controller.prototype.handleHold = function (e) {
  e.currentTarget.children[0].children[0].classList.toggle("hold_switch-off");
  this.hold = !this.hold;
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
      !this.hold ? this.disposeNote(e.target) : "";
      this.palette.render(this.colors);
    });
  });
};

Controller.prototype.useNote = function (noteEvent) {
  if (this.actives.length < 10) {
    const note = noteEvent.target;
    this.colors.add(noteEvent);
    this.piano.keyDown(note, this.colors.getColorStyleRule(note));
    this.actives.push(note);
    // this.palette.render(this.colors);
  }
};

Controller.prototype.disposeNote = function (note) {
  this.piano.keyUp(note);
  this.colors.remove(note);
  this.actives.splice(this.colors.indexOf(note), 1);
  // this.palette.render(this.colors);
};

function alreadyActive(key) {
  const active = key.getAttribute("data-active");
  return active == "false" ? false : true;
}
