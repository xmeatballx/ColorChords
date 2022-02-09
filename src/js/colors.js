function Colors() {
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

  Colors.prototype.add = function (e) {
    const color = getColorByKey(e);
    this.colors.push(color);
  };

  Colors.prototype.remove = function (key) {
    const index = findColorIndexByKey(key);
    this.colors.splice(index, 1);
  };

  Colors.prototype.getColorStyleRule = function (key) {
    console.log(key, this.colors[findColorIndexByKey(key)]);
    return createHslStyleRule(this.colors[findColorIndexByKey(key)]);
  };

  Colors.prototype.getColorStyleRuleByIndex = function (index) {
    return createHslStyleRule(this.colors[index]);
  };

  Colors.prototype.getAllColors = function () {
    return this.colors;
  };

  const getColorByKey = (e) => {
    const rect = e.target.getBoundingClientRect();
    const hue = this.intervals[e.target.classList[0]] * 360;
    const saturation = ((e.clientY - rect.top) / rect.height).toFixed(2) * 100;
    let value = e.target.getAttribute("data-octave");
    value = (value / 8) * 100;
    return [hue, saturation, value];
  };

  const findColorIndexByKey = (key) => {
    const hue = this.intervals[key.classList[0]] * 360;
    let value = key.getAttribute("data-octave");
    value = (value / 8) * 100;
    return this.colors
      .map((color, index) => {
        return color[0] == hue && color[2] == value ? index : null;
      })
      .filter((result) => result != null);
  };

  function createHslStyleRule(color) {
    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
  }
}

export { Colors };
