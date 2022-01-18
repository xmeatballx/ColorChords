export let state = {
  transpose: 0,
  notes: [],
  shaderUniforms: {},
  theme: "light",
};

// state.shaderUniforms = {
//   wheelRadius: {
//     name: "wheelRadius",
//     type: "1f",
//     value: 0.9,
//   },
//   noteRadius: {
//     name: "noteRadius",
//     type: "1f",
//     value: 0.1,
//   },
//   noteAngles: {
//     name: "angles",
//     type: "1fv",
//     value: state.notes.map(
//       (note) => TWO_PI * note.interval + state.transpose * Math.PI * 180
//     ),
//   },
//   noteVelocities: {
//     name: "velocities",
//     type: "1fv",
//     value: state.notes.map((note) => note.velocity),
//   },
//   noteOctaves: {
//     name: "octaves",
//     type: "1fv",
//     value: state.notes.map((note) => note.octave / 4),
//   },
// };
