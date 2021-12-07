/* eslint-disable no-undef, no-unused-vars */
class Interval {
  constructor(interval, octave, radius, saturation, rotation) {
    this.interval = interval;
    this.octave = octave;
    this.radius = radius;
    this.saturation = saturation;
    this.rotation = rotation;
    this.point = createVector(0, 0);
    this.point.x =
      sin(TWO_PI * this.interval + this.rotation) *
      this.radius *
      this.saturation;
    this.point.y =
      cos(TWO_PI * this.interval + this.rotation) *
      this.radius *
      this.saturation;
  }

  applyRotation(rotation) {
    this.rotation = rotation;
    console.log(rotation);
    this.point.x =
      sin(TWO_PI * this.interval + this.rotation) *
      this.radius *
      this.saturation;
    this.point.y =
      cos(TWO_PI * this.interval + this.rotation) *
      this.radius *
      this.saturation;
  }
}
