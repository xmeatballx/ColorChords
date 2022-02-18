export const Params = function () {
  this.octave = 0;
  this.hold = true;
};

Params.prototype.useOctave = function (e, octaves) {
  const visibleOctaves = octaves.filter((octave) => {
    const displayStyleRule = window
      .getComputedStyle(octave)
      .getPropertyValue("display");
    return displayStyleRule == "block";
  });
  const availableOctaves = Math.floor((6 - visibleOctaves.length) / 2);

  if (e.target.classList.contains("octave-up")) {
    if (this.octave >= availableOctaves) return;
    this.incrementOctave();
    visibleOctaves[0].style.display = "none";
    octaves[
      octaves.indexOf(visibleOctaves[visibleOctaves.length - 1]) + 1
    ].style.display = "block";
  } else {
    if (this.octave <= -availableOctaves) return;
    this.decrementOctave();
    visibleOctaves[visibleOctaves.length - 1].style.display = "none";
    octaves[octaves.indexOf(visibleOctaves[0]) - 1].style.display = "block";
  }
};

Params.prototype.handleHold = function (e) {
  e.currentTarget.children[0].children[0].classList.toggle("hold_switch-off");
  this.hold = !this.hold;
};

Params.prototype.incrementOctave = function () {
  this.octave++;
};

Params.prototype.decrementOctave = function () {
  this.octave--;
};
