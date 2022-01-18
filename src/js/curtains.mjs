import { Curtains, Plane, RenderTarget } from "curtainsjs";
import { state } from "./state.mjs";

window.addEventListener("load", () => {
  const curtains = new Curtains({
    container: "main-canvas",
    watchScroll: false,
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

  const renderTarget = new RenderTarget(curtains, {
    maxWidth: 512,
  });
  
  const previewCurtains = new Curtains({ container: "preview-canvas"}) 

  const params2 = {
    vertexShaderID: "plane-vs", // our vertex shader ID
    fragmentShaderID: "color-fs", // our fragment shader ID
    uniforms: state.shaderUniforms,
  };


  const offscreenPlane = document.getElementsByClassName("offscreen-plane")[0];
  const colorPlane = new Plane(previewCurtains, document.getElementsByClassName("offscreen-plane")[0], params2)
  // colorPlane.setRenderTarget(renderTarget)

  colorPlane.onRender(() => {
    colorPlane.uniforms.noteAngles.value = state.shaderUniforms.noteAngles.value;
    colorPlane.uniforms.noteOctaves.value = state.shaderUniforms.noteOctaves.value;
    colorPlane.uniforms.noteVelocities.value =
      state.shaderUniforms.noteVelocities.value;
    colorPlane.uniforms.numNotes.value = state.shaderUniforms.numNotes.value; // update our time uniform value
    colorPlane.uniforms.mobile.value = state.shaderUniforms.mobile.value;
    // console.log(plane.uniforms);
  });




  console.log(renderTarget.getTexture())
  colorPlane.onAfterRender(() => {
    const canvas = document.querySelectorAll("canvas")[1];
    const context = canvas.getContext('webgl2');
    const format = context.getParameter(context.IMPLEMENTATION_COLOR_READ_FORMAT);
    const type = context.getParameter(context.IMPLEMENTATION_COLOR_READ_TYPE);
    const buf = new Uint8Array(4)
    state.notes.forEach((note,i) => {
      const x = context.drawingBufferWidth / state.notes.length + ((context.drawingBufferWidth/state.notes.length)*i)-1;
      const y = 1;
      context.readPixels(x, y, 1, 1, format, type, buf)
      note.color = Array.from(buf)
      const colorPreviews = document.querySelectorAll(".color_preview");
      colorPreviews[i].style.backgroundColor = `rgb(${note.color[0]} ${note.color[1]} ${note.color[2]})`
      // console.log(state.notes)
    })
  })
});
