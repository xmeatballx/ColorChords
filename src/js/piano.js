function Piano() {
  const root = document.querySelector(".root");
  this.lightColor = getComputedStyle(root).getPropertyValue("--bg-main");
  this.darkColor = getComputedStyle(root).getPropertyValue("--mid");
}

Piano.prototype.init = function () {
  flagAccidentals();
};

Piano.prototype.keyDown = function (key, color) {
  key.style.fill = color;
  key.setAttribute("data-active", "true");
};

Piano.prototype.keyUp = function (key) {
  key.style.fill =
    key.classList.contains("accidental") == true
      ? this.darkColor
      : this.lightColor;
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

export { Piano };
