const note = function ({ interval, octave, velocity, color }) {
  this.interval = interval;
  this.octave = octave;
  this.velocity = velocity;
  this.color = color;
};

const shaderUniforms = function ({
  uResolution,
  wheelRadius,
  noteRadius,
  noteAngles,
  noteVelocities,
  noteOctaves,
  numNotes,
  mobile,
}) {
  this.uResolution = { name: "uResolution", type: "2f", value: uResolution };
  this.wheelRadius = { name: "wheelRadius", type: "1f", value: wheelRadius };
  this.noteRadius = { name: "noteRadius", type: "1f", value: noteRadius };
  this.noteAngles = { name: "noteAngles", type: "1fv", value: noteAngles };
  this.noteVelocities = {
    name: "noteVelocities",
    type: "1fv",
    value: noteVelocities,
  };
  this.noteOctaves = { name: "noteOctaves", type: "1fv", value: noteOctaves };
  this.numNotes = { name: "numNotes", type: "1f", value: numNotes };
  this.mobile = { name: "mobile", type: "1f", value: mobile };
};

export { note, shaderUniforms };
