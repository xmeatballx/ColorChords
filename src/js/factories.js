const note = function ({ interval, octave, velocity, color }) {
  this.interval = interval;
  this.octave = octave;
  this.velocity = velocity;
  this.color = color;
};

export { note };
