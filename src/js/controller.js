import { Theme } from "./theme";
import { Colors } from "./colors";
import { Piano } from "./piano";
import { Palette } from "./palette";
import { Params } from "./params";
import { Chords } from "./chords";

export class Controller {
  constructor() {
    this.theme = new Theme();
    this.piano = new Piano();
    this.colors = new Colors();
    this.palette = new Palette();
    this.params = new Params();
    this.chords = new Chords();
    this.actives = [];
    this.mouseIsDown = false;
    this.mouseEventThrottleActive = true;
  }
  handleTheme() {
    const themeToggle = document.querySelector(".toggle");
    themeToggle.onclick = (e) => this.theme.toggleDark(e);
  }
  handleParams() {
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
  }
  useHold(e) {
    this.params.handleHold(e);
    [...this.actives].forEach((note) => {
      this.disposeNote(note);
    });
    this.palette.render(this.colors);
  }
  handleChords() {
    this.chords.showChords();
    this.chords.chordElements.forEach((chordElement, index) => {
      this.chords.paintUI(chordElement, index);
      chordElement.addEventListener("click", (e) => {
        const chord = this.chords.getChord(chordElement, index);
        this.chords.highlightInUI(e);
        if (chord.root == "" || chord.type == "") return;

        // refactor this to a method in piano called clear
        [...this.piano.keys].forEach((key) => this.piano.keyUp(key));

        this.colors.clear();
        this.actives.length = 0;

        // refactor this to playChord function
        chord.forEach((interval) => {
          const noteNum = ((interval - 1) % 12) + 1,
            octave = interval > 12 ? 5 : 4,
            note = document.querySelector(
              `#piano path:nth-of-type(${noteNum})[data-octave="${octave}"]`
            ),
            color = this.colors.getColorByKey(note, {});
          this.piano.keyDown(note, this.colors.getColorStyleRule(color));
          this.colors.add({ target: note });
          this.actives.push(note);
        });
        this.palette.render(this.colors);
      });
    });
  }
  //
  //
  // REFACTOR THESE SO THAT EACH LISTENER CALLS A SIMPLE NAMED FUNCTION
  //
  //
  //  vvvv
  handlePianoInput() {
    [...this.piano.keys].forEach((key) => {
      key.addEventListener("mousedown", (e) => {
        this.mouseIsDown = true;
        this.usePianoInput(e);
        this.palette.scrollToEnd();
      });

      key.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.mouseIsDown = true;
        this.usePianoInput(e);
        this.palette.scrollToEnd();
      });

      key.addEventListener("mouseup", (e) => {
        this.mouseIsDown = false;
        this.disposePianoInput(e);
      });

      key.addEventListener("mousemove", (e) => {
        if (!this.mouseIsDown || !alreadyActive(e.target)) return;
        this.throttleMouseMoveEvent(this.handleMouseMoved, e);
      });

      key.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (!this.mouseIsDown || !alreadyActive(e.target)) return;
        this.throttleMouseMoveEvent(this.handleMouseMoved, e);
      });
    });
  }
  usePianoInput(e) {
    !alreadyActive(e.target)
      ? this.useNote(e.target, e)
      : this.disposeNote(e.target);
    this.palette.render(this.colors);
  }
  disposePianoInput(e) {
    if (this.params.hold) return;
    this.disposeNote(e.target);
    this.palette.render(this.colors);
  }
  handleMouseMoved(e) {
    this.actives.length = 0;
    this.colors.remove(e.target);
    this.useNote(e.target, e);
    this.palette.render(this.colors);
  }
  throttleMouseMoveEvent(callback, args) {
    if (!this.mouseEventThrottleActive) return;
    this.mouseEventThrottleActive = false;
    callback.call(this, args);
    setTimeout(() => (this.mouseEventThrottleActive = true), 200);
  }
  useNote(note, noteEvent) {
    if (this.actives.length < 10) {
      const color = this.colors.getColorByKey(note, noteEvent);
      this.colors.add(noteEvent);
      this.piano.keyDown(note, this.colors.getColorStyleRule(color));
      this.actives.push(note);
    }
  }
  disposeNote(note) {
    this.piano.keyUp(note);
    this.colors.remove(note);
    this.actives.splice(this.colors.indexOf(note), 1);
  }
}

function alreadyActive(key) {
  const active = key.getAttribute("data-active");
  return active == "false" ? false : true;
}
