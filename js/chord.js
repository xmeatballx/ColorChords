/* eslint-disable no-undef, no-unused-vars */
class Chord {
  constructor(notes) {
    this.notes = notes;
  }

  draw(wheel) {
    this.notes.forEach((interval) => {
      push();
      translate(width / 2 + 10, height / 2 + 10);
      strokeWeight(2.5);
      stroke(255);
      fill(
        wheel.get(
          wheel.width / 2 + interval.point.x,
          wheel.height / 2 + interval.point.y
        )
      );
      // fill(0);
      // rect(0, 0, 30);
      ellipse(interval.point.x, interval.point.y, 50);
      pop();
    });
  }

  activeColors(wheel) {
    const colors = this.notes.map((interval) => {
      return wheel.get(
        width / 2 + interval.point.x,
        height / 2 + interval.point.y
      );
    });
    return colors;
  }
}
