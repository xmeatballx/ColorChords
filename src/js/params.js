class Params {
  constructor() {
    this.octave = 0;
    this.hold = true;
    this.allOctaves = [];
    this.visibleOctaves = [];
    this.availableOctaves = 0;
  }

  handleHold(e) {
    const holdSwitchElement = e.currentTarget.children[0].children[0];
    holdSwitchElement.classList.toggle('hold_switch-off');
    this.hold = !this.hold;
  }

  useOctave(e, octaves) {
    this.allOctaves = octaves;
    this.visibleOctaves = this.getVisibleOctaves(octaves);
    this.availableOctaves = Math.floor((6 - this.visibleOctaves.length) / 2);

    if (e.target.classList.contains('octave-up')) {
      if (this.octave >= this.availableOctaves) return;
      this.incrementOctave();
    } else {
      if (this.octave <= -this.availableOctaves) return;
      this.decrementOctave();
    }
  }

  getVisibleOctaves() {
    return this.allOctaves.filter((octave) => {
      const displayStyleRule = window.getComputedStyle(octave).getPropertyValue('display');
      return displayStyleRule === 'block';
    });
  }

  incrementOctave() {
    this.octave += 1;
    this.visibleOctaves[0].style.display = 'none';
    const highestVisibleOctave = this.visibleOctaves.pop();
    const nextOctaveIndex = this.allOctaves.indexOf(highestVisibleOctave) + 1;
    const nextOctave = this.allOctaves[nextOctaveIndex];
    nextOctave.style.display = 'block';
  }

  decrementOctave() {
    this.octave -= 1;
    const highestVisibleOctave = this.visibleOctaves.pop();
    highestVisibleOctave.style.display = 'none';
    const precedingOctaveIndex = this.allOctaves.indexOf(this.visibleOctaves[0]) - 1;
    const precedingOctave = this.allOctaves[precedingOctaveIndex];
    precedingOctave.style.display = 'block';
  }
}

export { Params };
