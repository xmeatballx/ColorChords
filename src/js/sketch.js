/* eslint-disable no-undef, no-unused-vars */
// import * as p5 from "p5";
import colorwheel from "../assets/colorwheel.png";

let radius = 400;
let preview, wheel;
let notes = [];
let chord;
let x = 25;
let y = 25;
let w, h;

const canvasContainer = document.querySelector("#canvas");
let windowResizing = false;

let params = Array.from(document.getElementsByClassName("param"));

/* eslint-disable no-undef, no-unused-vars */

const sketch = (p) => {
  class Interval {
    constructor(interval, octave, radius, saturation, rotation) {
      this.interval = interval;
      this.octave = octave;
      this.radius = radius;
      this.saturation = saturation;
      this.rotation = rotation;
      this.point = p.createVector(0, 0);
      this.point.x =
        p.sin(p.TWO_PI * this.interval + this.rotation) *
        this.radius *
        this.saturation;
      this.point.y =
        p.cos(p.TWO_PI * this.interval + this.rotation) *
        this.radius *
        this.saturation;
    }

    applyRotation(rotation, p) {
      this.rotation = rotation;
      this.point.x =
        p.sin(p.TWO_PI * this.interval + this.rotation) *
        this.radius *
        this.saturation;
      this.point.y =
        p.cos(p.TWO_PI * this.interval + this.rotation) *
        this.radius *
        this.saturation;
    }

    activeColor(wheel, p) {
      const color = wheel.get(
        p.int(wheel.width / 2 + this.point.x),
        p.int(wheel.height / 2 + this.point.y)
      );
      let temp = color.map((channel, index) => {
        return index < 3
          ? Math.max(Math.min(channel + 255 * (this.octave / 4), 255), 0)
          : 255;
      });
      return temp;
    }
  }

  class Chord {
    constructor(notes) {
      this.notes = notes;
    }

    draw(wheel, p) {
      this.notes.forEach((interval, index) => {
        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.strokeWeight(2.5);
        p.stroke(255);
        p.fill(interval.activeColor(wheel, p));
        p.ellipse(interval.point.x, interval.point.y, 50);
        p.pop();
      });
    }
  }
  p.preload = function () {
    wheel = p.loadImage(colorwheel);
  };

  p.setup = () => {
    p.createCanvas(
      canvasContainer.clientWidth * 0.5 + 50,
      canvasContainer.clientWidth * 0.5 + 50
    );
    radius = p.height / 2 - 26;
    w = p.width - 50;
    h = p.height - 50;
    wheel.resize(w, h);

    p.rectMode(p.CENTER);

    params.forEach((param, index) => {
      //refactor this it's awful
      const numNotes = document.querySelector("ul").children.length;
      const groupIndex = Math.floor(index / (params.length / numNotes));
      const interval = document.querySelector(`#interval${groupIndex}`);
      chord = new Chord(notes);
      notes[groupIndex] = new Interval(interval.value, 0, radius, 1, 0);
      updateParams();
      setPreviewColor(groupIndex);

      const intervalAdd = document.querySelector(".plus_container .fa-plus");
      intervalAdd.onclick = () => {
        params = Array.from(document.getElementsByClassName("param"));
        updateParams();
        chord = new Chord(notes);
      };

      const intervalRemove = document.querySelector(
        ".plus_container .fa-minus"
      );
      intervalRemove.onclick = () => {
        params = Array.from(document.getElementsByClassName("param"));
        updateParams();
        notes.splice(notes.length - 1);
        chord = new Chord(notes);
      };

      const rotation = document.querySelector(".slider");
      rotation.oninput = (e) => {
        notes.forEach((note, index) => {
          note.applyRotation(p.radians(e.target.value), p);
          setPreviewColor(index);
        });
        chord = new Chord(notes);
      };

      chord = new Chord(notes);
    });
  };

  p.draw = () => {
    p.background(24, 24, 27);
    p.push();
    p.text("Resizing...", p.width / 2, p.height / 2);
    p.pop();
    p.push();
    // p.translate(p.width / 2 - radius - 25, 0);
    p.image(wheel, x, y, w, h);
    p.pop();
    chord.draw(wheel, p);
  };

  let resizeTimer;
  p.windowResized = function () {
    p.resizeCanvas(
      canvasContainer.clientWidth * 0.5 + 50,
      canvasContainer.clientWidth * 0.5 + 50
    );
    // p.push();
    // p.pop();
    w = p.width - 50;
    h = p.height - 50;
    wheel.resize(w, h);
    // clearTimeout(resizeTimer);
    notes.forEach((note) => {
      note.radius = p.height / 2 - 26;
      note.applyRotation(0, p);
    });
    chord = new Chord(notes);
    chord.draw(wheel, p);
    // resizeTimer = setTimeout(() => {
    // }, 250);
  };
  function setPreviewColor(groupIndex) {
    const color = document.querySelector(`#color${groupIndex}`);
    const activeColor = notes[groupIndex].activeColor(wheel, p);
    color.style.backgroundColor = `rgba(${activeColor[0]}, ${activeColor[1]}, ${
      activeColor[2]
    }, ${activeColor[3] / 255})`;
  }
  function updateParams() {
    params.forEach((param, index) => {
      const numNotes = document.querySelector("ul").children.length;
      const groupIndex = Math.floor(index / (params.length / numNotes));
      const interval = document.querySelector(`#interval${groupIndex}`);
      const saturation = document.querySelector(`#saturation${groupIndex}`);
      const octave = document.querySelector(`#octave${groupIndex}`);
      const rotation = document.querySelector("#rotation");

      notes[groupIndex] = new Interval(
        interval.value,
        octave.value,
        radius,
        saturation.value / 100,
        p.radians(rotation.value)
      );

      setPreviewColor(groupIndex);
      // chord.draw(wheel);

      param.addEventListener("input", (e) => {
        notes[groupIndex] = new Interval(
          interval.value,
          octave.value,
          radius,
          saturation.value / 100,
          p.radians(rotation.value)
        );

        setPreviewColor(groupIndex);

        chord.draw(wheel, p);
      });
    });
  }
};

new p5(sketch, document.querySelector("#canvas"));
