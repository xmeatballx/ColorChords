export class Piano {
  constructor() {
    this.octaves = [...document.querySelectorAll("#piano > svg")];
    this.keys = [...document.querySelectorAll("#piano path")];
    flagAccidentals();
  }

  keyDown(key, color) {
    key.style.fill = color;
    key.setAttribute("data-active", "true");
  }

  keyUp(key) {
    key.style.fill =
      key.classList.contains("accidental") == true
        ? "var(--mid)"
        : "var(--bg-main)";
    key.setAttribute("data-active", "false");
  }

  clear() {
    [...this.keys].forEach((key) => this.keyUp(key));
  }
}

function flagAccidentals() {
  const accidentals = document.querySelectorAll(
    "#piano path:nth-child(2), #piano path:nth-child(4), #piano path:nth-child(7), #piano path:nth-child(9), #piano path:nth-child(11)"
  );
  [...accidentals].forEach((accidental) =>
    accidental.classList.add("accidental")
  );
}
