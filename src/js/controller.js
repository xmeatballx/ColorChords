import { Theme } from "./theme";
import { Colors } from "./colors";
import { Piano } from "./piano";
import { Palette } from "./palette";

function Controller() {
  this.theme = new Theme();
  this.piano = new Piano();
  this.colors = new Colors();
  this.palette = new Palette();
}

Controller.prototype.handleInput = function (e) {
  if (!alreadyActive(e.target)) {
    this.useNote(e);
  } else {
    this.disposeNote(e.target);
  }
  this.palette.render(this.colors);
};

Controller.prototype.useNote = function (noteEvent) {
  const note = noteEvent.taget;
  this.colors.add(noteEvent);
  this.piano.keyDown(note, this.colors.getColorStyleRule(note));
};

Controller.prototype.disposeNote = function (note) {
  this.piano.keyUp(note);
  this.colors.remove(note);
};

function alreadyActive(key) {
  const active = key.getAttribute("data-active");
  return active == "false" ? false : true;
}

export { Controller };
