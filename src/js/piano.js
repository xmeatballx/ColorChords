import { Colors } from "./colors";

function Piano() {
  flagAccidentals();

  Piano.prototype.keyDown = function (key, color) {
    console.log(key, color);
    key.style.fill = color;
    key.setAttribute("data-active", "true");
  };

  Piano.prototype.keyUp = function (key) {
    key.style.fill =
      key.classList.contains("accidental") == true ? "black" : "white";
    key.setAttribute("data-active", "false");
  };

  function flagAccidentals() {
    const accidentals = document.querySelectorAll(
      "path:nth-child(2), path:nth-child(4), path:nth-child(7), path:nth-child(9), path:nth-child(11)"
    );
    [...accidentals].forEach((accidental) =>
      accidental.classList.add("accidental")
    );
  }
}

export { Piano };
