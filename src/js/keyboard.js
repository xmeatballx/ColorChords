export class Keyboard {
  constructor() {
    this.keyNames = [
      "a",
      "w",
      "s",
      "e",
      "d",
      "f",
      "t",
      "g",
      "y",
      "h",
      "u",
      "j",
    ];
    this.activeKeys = [];
    this.inputOctave = 4;
  }

  useKeyboardInput(e) {
    const selectedNote = this.keyCodeToNoteData(e.key);
    if (this.isActive(selectedNote)) return;
    if (e.key == "x" || e.key == "z") this.useOctave(e.key);
    if (this.keyNames.includes(e.key)) this.activeKeys.push(selectedNote);
  }

  disposeKeyboardInput(e) {
    if (this.keyNames.includes(e.key)) {
      const indexOfRemoval = this.activeKeys.findIndex(
        (key) => key == this.keyCodeToNoteData(e.key)
      );
      this.activeKeys.splice(indexOfRemoval, 1);
    }
  }

  useOctave(key) {
    key == "z" ? this.inputOctave-- : this.inputOctave++;
  }

  keyCodeToNoteData(key) {
    const noteNum = this.keyNames.indexOf(key);
    return [noteNum, this.inputOctave];
  }

  isActive(note) {
    return this.activeKeys.some(
      (activeNote) => activeNote[0] == note[0] && activeNote[1] == note[1]
    );
  }
}
