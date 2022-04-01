function checkActive(activeNote, note) {
  return activeNote[0] === note[0] && activeNote[1] === note[1];
}
class Keyboard {
  constructor() {
    this.keyNames = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j'];
    this.activeKeys = [];
    this.inputOctave = 4;
  }

  useKeyboardInput(e) {
    const selectedNote = this.keyToNoteData(e.key);
    if (this.isActive(selectedNote)) return;
    if (e.key === 'x' || e.key === 'z') this.useOctave(e.key);
    if (this.keyNames.includes(e.key)) this.activeKeys.push(selectedNote);
  }

  disposeKeyboardInput(e) {
    if (this.keyNames.includes(e.key)) {
      const removalIndex = this.activeKeys.findIndex((key) => key === this.keyToNoteData(e.key));
      this.activeKeys.splice(removalIndex, 1);
    }
  }

  useOctave(key) {
    if (key === 'z') {
      this.inputOctave -= 1;
    } else {
      this.inputOctave += 1;
    }
  }

  keyToNoteData(key) {
    const noteNum = this.keyNames.indexOf(key);
    return [noteNum, this.inputOctave];
  }

  isActive(note) {
    const isActiveBoolean = this.activeKeys.some((activeNote) => checkActive(activeNote, note));
    return isActiveBoolean;
  }
}
export { Keyboard };
