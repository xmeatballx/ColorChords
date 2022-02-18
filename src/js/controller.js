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
  this.mouseIsDown = false;
  this.mouseEventThrottleActive = true;
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
  [...this.piano.keys].forEach((key) => {
    key.addEventListener("mousedown", (e) => {
      this.mouseIsDown = true;
      !alreadyActive(e.target)
        ? this.useNote(e.target, e)
        : this.disposeNote(e.target);
      this.palette.render(this.colors);
    });

    key.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.mouseIsDown = true;
      !alreadyActive(e.target)
        ? this.useNote(e.target, e)
        : this.disposeNote(e.target);
      this.palette.render(this.colors);
    });

    key.addEventListener("mouseup", (e) => {
      this.mouseIsDown = false;
      if (this.params.hold == false) {
        this.disposeNote(e.target);
        this.palette.render(this.colors);
      }
    });

    key.addEventListener("mousemove", (e) => {
      if (!this.mouseIsDown) return;
      this.throttleMouseMoveEvent(this.handleMouseMoved, e);
    });

    key.addEventListener("touchmove", (e) => {
      e.preventDefault();
      console.log(e.target.getAttribute("data-active"));
      if (!this.mouseIsDown || !alreadyActive(e.target)) return;
      this.throttleMouseMoveEvent(this.handleMouseMoved, e);
    });

    key.addEventListener("touchstart", (e) => {
      console.log(e.target.getAttribute("data-active"));

      if (!this.params.hold) {
        !alreadyActive(e.target)
          ? this.useNote(e.target, e)
          : this.disposeNote(e.target);

        this.palette.render(this.colors);
      }
    });
  });
};

Controller.prototype.handleMouseMoved = function (e) {
  const moveEvent = e;
  const element = e.target;
  this.actives.length = 0;
  this.colors.remove(element);
  this.useNote(e.target, moveEvent);
  console.log(this.colors.colors);
  this.palette.render(this.colors);
};

Controller.prototype.throttleMouseMoveEvent = function (callback, args) {
  if (!this.mouseEventThrottleActive) return;
  this.mouseEventThrottleActive = false;
  callback.call(this, args);
  setTimeout(() => (this.mouseEventThrottleActive = true), 200);
};

Controller.prototype.useNote = function (note, noteEvent) {
  if (this.actives.length < 10) {
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
