const TWO_PI = Math.PI * 2;

export let state = {
  transpose: 0,
  notes: [
    {
      interval: 1,
      octave: 0,
      velocity: 1.0,
      color: [255, 0, 0],
    },
    {
      interval: 1.15,
      octave: 0,
      velocity: 0.8,
      color: [137, 215, 220],
    },
  ],
  shaderUniforms: {},
  theme: "light",
};

state.shaderUniforms = {
  wheelRadius: {
    name: "wheelRadius",
    type: "1f",
    value: 0.9,
  },
  noteRadius: {
    name: "noteRadius",
    type: "1f",
    value: 0.1,
  },
  noteAngles: {
    name: "angles",
    type: "1fv",
    value: state.notes.map(
      (note) => TWO_PI * note.interval + state.transpose * Math.PI * 180
    ),
  },
  noteVelocities: {
    name: "velocities",
    type: "1fv",
    value: state.notes.map((note) => note.velocity),
  },
  noteOctaves: {
    name: "octaves",
    type: "1fv",
    value: state.notes.map((note) => note.octave / 4),
  },
  numNotes: {
    name: "numNotes",
    type: "int",
    value: state.notes.length,
  },
};
