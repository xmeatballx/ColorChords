/* eslint-disable no-undef, no-unused-vars */
let inc = 0;
let step = 360;
const radius = 150;
const previewRadius = 50;
let preview, wheel;
let notes = [];
let chord;

const canvasContainer = document.querySelector("#canvas");
let windowResizing = false;

let params = Array.from(document.getElementsByClassName("param"));

function setup() {
  const canvas = createCanvas(windowWidth, 375);
  canvas.parent("canvas");

  rectMode(CENTER);

  wheel = createGraphics(radius * 2 + 20, radius * 2 + 20);
  wheel.colorMode(HSB, 360);
  drawWheel(wheel);

  background(255);
  push();
  translate(width / 2 - radius, height / 2 - radius);
  image(wheel, 0, 0);
  pop();

  params.forEach((param, index) => {
    //refactor this it's awful
    const numNotes = document.querySelector("ul").children.length;
    const groupIndex = Math.floor(index / (params.length / numNotes));
    const interval = document.querySelector(`#interval${groupIndex}`);
    notes[groupIndex] = new Interval(
      intervals[interval.value],
      0,
      radius,
      1,
      0
    );
    updateParams();
    setPreviewColor(groupIndex);

    const intervalAddorRemove = Array.from(
      document.querySelector(".plus_container").children
    );
    intervalAddorRemove.forEach((button) => {
      button.onclick = () => {
        params = Array.from(document.getElementsByClassName("param"));
        updateParams();
        chord = new Chord(notes);
      };
    });

    const rotation = document.querySelector(".slider");
    rotation.oninput = (e) => {
      notes.forEach((note, index) => {
        note.applyRotation(radians(e.target.value));
        setPreviewColor(index);
      });
      chord = new Chord(notes);
    };

    chord = new Chord(notes);
  });
}

// updateParams();

function draw() {
  background(255);
  push();
  text("Resizing...", width / 2, height / 2);
  pop();
  push();
  translate(width / 2 - radius, height / 2 - radius);
  image(wheel, 0, 0);
  pop();
  chord.draw(wheel);
}

function updateParams() {
  params.forEach((param, index) => {
    param.addEventListener("change", (e) => {
      const numNotes = document.querySelector("ul").children.length;
      const groupIndex = Math.floor(index / (params.length / numNotes));
      // console.log(groupIndex);
      const interval = document.querySelector(`#interval${groupIndex}`);
      const saturation = document.querySelector(`#saturation${groupIndex}`);
      const rotation = document.querySelector("#rotation");

      notes[groupIndex] = new Interval(
        intervals[interval.value],
        0,
        radius,
        saturation.value / 100,
        radians(rotation.value)
      );

      const color = document.querySelector(`#color${groupIndex}`);
      const activeColors = wheel.get(
        wheel.width / 2 + notes[groupIndex].point.x,
        wheel.height / 2 + notes[groupIndex].point.y
      );
      color.style.backgroundColor = `rgba(${activeColors[0]}, ${
        activeColors[1]
      }, ${activeColors[2]}, ${activeColors[3] / 255})`;

      setPreviewColor(groupIndex);

      chord.draw(wheel);
      // console.log(chord);
    });
  });
}

// This Redraws the Canvas when resized
let resizeTimer;
windowResized = function () {
  background(255);
  wheel.background(0, 0, 360);
  push();
  fill(0);
  textSize(72);
  text("Resizing...", width / 2, height / 2);
  pop();
  resizeCanvas(canvasContainer.clientWidth, canvasContainer.clientHeight);
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    drawWheel(wheel);
    background(255);
    push();
    translate(width / 2 - radius, height / 2 - radius);
    image(wheel, 0, 0);
    pop();
    chord.draw(wheel);
  }, 250);
};

function setPreviewColor(groupIndex) {
  const color = document.querySelector(`#color${groupIndex}`);
  const activeColors = wheel.get(
    wheel.width / 2 + notes[groupIndex].point.x,
    wheel.height / 2 + notes[groupIndex].point.y
  );
  color.style.backgroundColor = `rgba(${activeColors[0]}, ${activeColors[1]}, ${
    activeColors[2]
  }, ${activeColors[3] / 255})`;
}

function drawWheel(g) {
  g.background(0, 0, 360);
  for (let i = 0; i <= step * PI; i += 0.5) {
    g.push();
    g.translate(wheel.width / 2, wheel.height / 2);
    g.rotate(radians(i / PI));
    drawLine(g, i / PI);
    g.pop();
  }
}

function drawLine(g, hue) {
  for (let i = 0; i < radius; i++) {
    let saturation = map(i, 0, radius, 360, 0);
    g.stroke(hue, saturation, 360);
    g.point(0, radius - i);
  }
}

function drawPreview() {
  preview.strokeWeight(3);
  preview.stroke(255);
  preview.fill(wheel.get(mouseX, mouseY));
  preview.ellipse(previewRadius / 2, previewRadius / 2, previewRadius - 2);
  if (dist(mouseX, mouseY, width / 2, height / 2) < radius) {
    image(preview, mouseX - previewRadius / 2, mouseY - previewRadius);
  }
}
