import { Curtains, Plane } from "curtainsjs";
import { state } from "./state.mjs";

window.addEventListener("load", () => {
  const curtains = new Curtains({
    container: "canvas",
  });

  const planeElement = document.getElementsByClassName("plane")[0];

  const params = {
    vertexShaderID: "plane-vs", // our vertex shader ID
    fragmentShaderID: "plane-fs", // our fragment shader ID
    uniforms: state.shaderUniforms,
  };

  const plane = new Plane(curtains, planeElement, params);
  plane.onRender(() => {
    plane.uniforms.noteAngles.value = state.shaderUniforms.noteAngles.value;
    plane.uniforms.noteOctaves.value = state.shaderUniforms.noteOctaves.value;
    plane.uniforms.noteVelocities.value =
      state.shaderUniforms.noteVelocities.value;
    plane.uniforms.numNotes.value = state.shaderUniforms.numNotes.value; // update our time uniform value
    plane.uniforms.mobile.value = state.shaderUniforms.mobile.value;
    // console.log(plane.uniforms);
  });
});

// export { plane };
