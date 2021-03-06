function flagAccidentals() {
  const cSharp = document.querySelectorAll('#piano path:nth-child(2)');
  const eFlat = document.querySelectorAll('#piano path:nth-child(4)');
  const fSharp = document.querySelectorAll('#piano path:nth-child(7)');
  const aFlat = document.querySelectorAll('#piano path:nth-child(9)');
  const bFlat = document.querySelectorAll('#piano path:nth-child(11)');
  const accidentals = document.querySelectorAll(
    '#piano path:nth-child(2), #piano path:nth-child(4), #piano path:nth-child(7), #piano path:nth-child(9), #piano path:nth-child(11)'
  );
  [...accidentals].forEach((accidental) => accidental.classList.add('accidental'));
}

class Piano {
  constructor() {
    this.octaves = [...document.querySelectorAll('#piano > svg')];
    this.keys = [...document.querySelectorAll('#piano path')];
    flagAccidentals();
  }

  keyDown(key, color) {
    this.ref = key;
    this.ref.style.fill = color;
    this.ref.setAttribute('data-active', 'true');
  }

  keyUp(key) {
    this.ref = key;
    this.ref.style.fill = key.classList.contains('accidental') === true ? 'var(--mid)' : 'var(--bg-main)';
    this.ref.setAttribute('data-active', 'false');
  }

  clear() {
    [...this.keys].forEach((key) => this.keyUp(key));
  }
}
export { Piano };
