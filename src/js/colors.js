export class Colors {
  constructor() {
    this.colors = [];
    this.intervals = {
      C: 0,
      "C#": 0.067,
      D: 0.125,
      Eb: 0.2,
      E: 0.25,
      F: 0.333,
      "F#": 0.414,
      G: 0.5,
      Ab: 0.6,
      A: 0.666,
      Bb: 0.777,
      B: 0.875,
    };
  }
  add(e) {
    const color = this.getColorByKey(e.target, e);
    this.colors.push(color);
  }
  remove(key) {
    const index = this.indexOf(key);

    this.colors.splice(index, 1);
  }
  getColorStyleRule(color) {
    return `hsl(${color[0]}, ${color[1] * 100}%, ${color[2] * 100}%)`;
  }
  getAllColors() {
    return this.colors;
  }
  indexOf(key) {
    const hue = this.intervals[key.classList[0]] * 360;
    let value = key.getAttribute("data-octave");
    value = value / 8;
    return this.colors.findIndex(
      (color) => color[0] == hue && color[2] == value
    );
  }
  getColorByKey(key, e) {
    const rect = key.getBoundingClientRect();
    const hue = this.intervals[key.classList[0]] * 360;
    const saturation = e.touches
      ? ((e.touches[0].clientY - rect.top) / rect.height).toFixed(2)
      : e.clientY
      ? ((e.clientY - rect.top) / rect.height).toFixed(2)
      : 1;
    let value = key.getAttribute("data-octave");
    value = value / 8;
    return [
      hue,
      parseFloat(saturation).toFixed(2),
      parseFloat(value).toFixed(2),
    ];
  }
  clear() {
    this.colors.length = 0;
  }
}
