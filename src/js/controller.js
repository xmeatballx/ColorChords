import { Theme } from './theme';
import { Colors } from './colors';
import { Piano } from './piano';
import { Palette } from './palette';
import { Params } from './params';
import { Chords } from './chords';
import { Keyboard } from './keyboard';

function alreadyActive(key) {
  const active = key.getAttribute('data-active');
  // console.log(active, active == 'true');
  return active == 'true';
}

function getNote(noteNum, octave) {
  return document.querySelector(`#piano path:nth-of-type(${noteNum})[data-octave="${octave}"]`);
}

class Controller {
  constructor() {
    this.theme = new Theme();
    this.piano = new Piano();
    this.colors = new Colors();
    this.palette = new Palette();
    this.params = new Params();
    this.chords = new Chords();
    this.keyboard = new Keyboard();
    this.actives = [];
    this.mouseIsDown = false;
    this.shiftIsDown = false;
    this.mouseEventThrottleActive = true;
  }

  handleTheme() {
    const themeToggle = document.querySelector('.toggle');
    themeToggle.onclick = (e) => this.theme.toggleDark(e);
  }

  handleParams() {
    const holdSwitch = document.querySelector('.hold');
    const octaveUp = document.querySelector('.octave-up');
    const octaveDown = document.querySelector('.octave-down');
    const chords = document.querySelector('.chords');

    // holdSwitch.addEventListener('click', (e) => this.useHold(e));
    octaveUp.addEventListener('click', (e) => this.params.useOctave(e, this.piano.octaves));
    octaveDown.addEventListener('click', (e) => this.params.useOctave(e, this.piano.octaves));
    chords.addEventListener('click', (e) => this.handleChords(e));
  }

  handleKeyBoardInput() {
    document.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      if (e.shiftKey) this.shiftIsDown = true;
      this.useKeyboardInput(e);
      this.palette.render(this.colors);
    });

    document.addEventListener('keyup', (e) => {
      const noteData = this.keyboard.keyToNoteData(e.key);
      const note = getNote(noteData[0] + 1, noteData[1]);
      if (e.key === 'Shift') this.shiftIsDown = false;
      if (!this.params.hold) {
        this.keyboard.disposeKeyboardInput(e);
        this.disposeNote(note);
        this.palette.render(this.colors);
      }
    });
  }

  handleSort(e) {
    this.colors.move(e.oldIndex, e.newIndex);
  }

  useKeyboardInput(e) {
    const noteData = this.keyboard.keyToNoteData(e.key);
    const note = getNote(noteData[0] + 1, noteData[1]);
    this.keyboard.useKeyboardInput(e);
    if (this.keyboard.keyNames.includes(e.key)) {
      if (this.params.hold) {
        if (!alreadyActive(note)) {
          this.useNote(note, {});
        } else {
          this.disposeNote(note);
        }
      } else {
        this.useNote(note, {});
      }
    }
  }

  handleChords() {
    this.chords.toggleChordVisibility();
    this.chords.chordElements.forEach((chordElement, index) => {
      this.chords.paintUI(chordElement, index);
      chordElement.addEventListener('click', (e) => this.handleChordSelection(e, chordElement, index));
    });
  }

  handleChordSelection(e, chordElement, index) {
    const chord = this.chords.getChord(chordElement, index);
    this.chords.highlightInUI(e);
    if (chord.root === '' || chord.type === '') return;

    this.piano.clear();
    this.colors.clear();
    this.actives.length = 0;

    this.playChord(chord);
  }

  useHold(e) {
    this.params.handleHold(e);
    [...this.actives].forEach((note) => {
      this.disposeNote(note);
    });
    this.palette.render(this.colors);
  }

  playChord(chord) {
    chord.forEach((interval) => {
      const noteNum = ((interval - 1) % 12) + 1;
      const octave = interval > 12 ? 5 : 4;
      const note = getNote(noteNum, octave);
      const color = this.colors.getColorByKey(note, {});
      this.piano.keyDown(note, this.colors.getColorStyleRule(color));
      this.colors.add(note, {});
      this.actives.push(note);
    });
    this.palette.render(this.colors);
  }

  handlePianoInput() {
    [...this.piano.keys].forEach((key) => {
      key.addEventListener('mousedown', (e) => this.handlePianoTouchStart(e));

      key.addEventListener('touchstart', (e) => this.handlePianoTouchStart(e));

      key.addEventListener('mouseup', (e) => this.handlePianoTouchEnd(e));

      key.addEventListener('mousemove', (e) => this.handlePianoTouchMove(e));

      key.addEventListener('touchmove', (e) => this.handlePianoTouchMove(e));
    });
  }

  handlePianoTouchStart(e) {
    e.preventDefault();
    this.mouseIsDown = true;
    this.usePianoInput(e);
    this.palette.scrollToEnd();
  }

  handlePianoTouchMove(e) {
    e.preventDefault();
    if (!this.mouseIsDown || !alreadyActive(e.target)) return;
    this.throttleMouseMoveEvent(this.handleMouseMoved, e);
  }

  handlePianoTouchEnd(e) {
    this.mouseIsDown = false;
    this.disposePianoInput(e);
  }

  usePianoInput(e) {
    if (!alreadyActive(e.target) || this.shiftIsDown) {
      this.useNote(e.target, e);
    } else {
      this.disposeNote(e.target);
    }
    this.palette.render(this.colors);
  }

  disposePianoInput(e) {
    if (this.params.hold) return;
    this.disposeNote(e.target);
    this.palette.render(this.colors);
  }

  handleMouseMoved(e) {
    this.actives.length = 0;
    this.useNote(e.target, e);
    this.palette.render(this.colors);
  }

  throttleMouseMoveEvent(callback, args) {
    if (!this.mouseEventThrottleActive) return;
    this.mouseEventThrottleActive = false;
    callback.call(this, args);
    // eslint-disable-next-line no-return-assign
    setTimeout(() => (this.mouseEventThrottleActive = true), 200);
  }

  useNote(note, noteEvent) {
    if (this.actives.length < 10) {
      const color = this.colors.getColorByKey(note, noteEvent);
      if (!this.shiftIsDown && !alreadyActive(note)) {
        this.colors.add(note, noteEvent);
      } else {
        this.colors.update(note, noteEvent);
      }
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
export { Controller };
