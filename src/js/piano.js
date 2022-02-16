export const Piano = function () {
  flagAccidentals();
};

Piano.prototype.keyDown = function (key, color) {
  key.style.fill = color;
  key.setAttribute("data-active", "true");
};

Piano.prototype.keyUp = function (key) {
  key.style.fill =
    key.classList.contains("accidental") == true
      ? "var(--mid)"
      : "var(--bg-main)";
  key.setAttribute("data-active", "false");
};

function flagAccidentals() {
  const accidentals = document.querySelectorAll(
    "#piano path:nth-child(2), #piano path:nth-child(4), #piano path:nth-child(7), #piano path:nth-child(9), #piano path:nth-child(11)"
  );
  [...accidentals].forEach((accidental) =>
    accidental.classList.add("accidental")
  );
}
