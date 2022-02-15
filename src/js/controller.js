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
};

Controller.prototype.handleInput = function () {
  const pianoKeys = document.querySelectorAll("section#piano svg > g > path");
  [...pianoKeys].forEach((key) =>
    key.addEventListener("mousedown", (e) =>
      !alreadyActive(e.target) ? this.useNote(e) : this.disposeNote(e.target)
    )
  );
};

Controller.prototype.handleTheme = function () {
  const themeToggle = document.querySelector(".toggle");
  themeToggle.onclick = (e) => this.theme.toggleDark(e);
};

Controller.prototype.useNote = function (noteEvent) {
  if (this.actives.length < 10) {
    const note = noteEvent.target;
    this.colors.add(noteEvent);
    this.piano.keyDown(note, this.colors.getColorStyleRule(note));
    this.actives.push(note);
    this.palette.render(this.colors);
  }
};

Controller.prototype.disposeNote = function (note) {
  this.piano.keyUp(note);
  this.colors.remove(note);
  this.actives.splice(0, 1);
  this.palette.render(this.colors);
};

function alreadyActive(key) {
  const active = key.getAttribute("data-active");
  return active == "false" ? false : true;
}
