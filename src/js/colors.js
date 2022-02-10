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
    return createHslStyleRule(this.colors[findColorIndexByKey(key)]);
  };

  Colors.prototype.getColorStyleRuleByIndex = function (index) {
    return createHslStyleRule(this.colors[index]);
  };

  Colors.prototype.getColor = function (e) {
    return getColorByKey(e);
  }

  Colors.prototype.getAllColors = function () {
    return this.colors;
  };

  const getColorByKey = (e) => {
    const rect = e.target.getBoundingClientRect();
    const hue = this.intervals[e.target.classList[0]] * 360;
    const saturation = ((e.clientY - rect.top) / rect.height).toFixed(2);
    let value = e.target.getAttribute("data-octave");
    value = (value / 8);
    return [hue, saturation, value];
  };

  const findColorIndexByKey = (key) => {
    const hue = this.intervals[key.classList[0]] * 360;
    let value = key.getAttribute("data-octave");
    value = (value / 8);
    var result = this.colors.map((color, index) => {
        return color[0] == hue && color[2] == value ? index : null;
      })
    result = result.filter((result) => result != null);
      return result;
    };

  function createHslStyleRule(color) {
    return `hsl(${color[0]}, ${color[1]*100}%, ${color[2]*100}%)`;
  }
}

function HSLtoRGB(color) 
{
  const h = color[0];
  const s = color[1];
  const l = color[2];
   let a=s*Math.min(l,1-l);
   let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
   return [f(0)*255,Math.round(f(8)*255),f(4)*255];
} 

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function RGBtoHex(color) {
  const r = Math.round(color[0]);
  const g = Math.round(color[1]);
  const b = Math.round(color[2]);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export { Colors, HSLtoRGB, RGBtoHex };
