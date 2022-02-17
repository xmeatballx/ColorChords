export const Params = function () {
  this.octave = 0;
  this.hold = true;
};

Params.prototype.handleHold = function () {
  e.currentTarget.children[0].children[0].classList.toggle("hold_switch-off");
  this.hold = !this.hold;
  [...this.actives].forEach((note) => {
    this.disposeNote(note);
  });
};

Params.prototype.incrementOctave = function () {
  this.octave++;
};

Params.prototype.decrementOctave = function () {
  this.octave--;
};
