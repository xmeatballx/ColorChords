function isRoot(element) {
  return element.classList.contains('chord_picker-roots');
}

class Chords {
  constructor() {
    this.active = { root: '', type: '' };
    this.visible = false;
    this.chordContainer = document.querySelector('section.chord_picker');
    this.chordElements = [...document.querySelectorAll('section.chord_picker > ul > li')];
    this.roots = this.chordElements.filter((el) => isRoot(el.parentElement));
    this.chordTypes = this.chordElements.filter((el) => !isRoot(el.parentElement));
  }

  toggleChordVisibility() {
    this.visible = !this.visible;
    this.chordContainer.style.display = this.visible ? 'grid' : 'none';
  }

  paintUI(chordElement, index) {
    const ref = chordElement;
    if (isRoot(ref.parentElement)) {
      const hue = Math.round((index / this.chordElements.length) * 300);
      ref.style.backgroundColor = `hsl(${hue}, 100%, 50%`;
    }
  }

  highlightInUI(e) {
    const currentRow = isRoot(e.currentTarget.parentElement) ? this.roots : this.chordTypes;
    currentRow.forEach((chordRoot) => {
      if (chordRoot !== e.currentTarget) {
        chordRoot.classList.remove('chord-active');
      }
    });
    e.currentTarget.classList.toggle('chord-active');
  }

  getChord(option, index) {
    this.setActive(option, index);
    if (this.active.length < 2) return null;
    const chordIntervals = this.getChordIntervals();
    const offset = this.active.root;
    const transposedChord = chordIntervals.map((interval) => interval + offset);
    return transposedChord;
  }

  getChordIntervals() {
    let intervals = [];
    switch (this.active.type) {
      case 'M': {
        intervals = [1, 5, 8];
        break;
      }
      case 'm': {
        intervals = [1, 4, 8];
        break;
      }
      case '+': {
        intervals = [1, 4, 7];
        break;
      }
      case '°': {
        intervals = [1, 5, 7];
        break;
      }
      case 'M6': {
        intervals = [1, 5, 8, 10];
        break;
      }
      case 'm6': {
        intervals = [1, 4, 8, 9];
        break;
      }
      case 'M7': {
        intervals = [1, 5, 8, 12];
        break;
      }
      case 'm7': {
        intervals = [1, 4, 8, 11];
        break;
      }
      case 'M9': {
        intervals = [1, 5, 8, 12, 15];
        break;
      }
      case 'm9': {
        intervals = [1, 4, 8, 12, 15];
        break;
      }
      default: {
        intervals = [1];
        break;
      }
    }
    return intervals;
  }

  setActive(option, index) {
    if (isRoot(option.parentElement)) {
      this.active.root = index;
    } else {
      // this regex removes newlines and spaces from the text content
      this.active.type = option.textContent.replace(/\r?\n|\r/g, '').replace(/\r?\s|\r/g, '');
    }
  }
}

export { Chords };
