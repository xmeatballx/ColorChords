function Piano() {
  flagAccidentals();
  const root = document.querySelector(".root");
  const lightColor = getComputedStyle(root).getPropertyValue("--bg-main");
  const darkColor = getComputedStyle(root).getPropertyValue("--mid");

  Piano.prototype.keyDown = function (key, color) {
    key.style.fill = color;
    key.setAttribute("data-active", "true");
  };

  Piano.prototype.keyUp = function (key) {
    key.style.fill =
      key.classList.contains("accidental") == true ? darkColor : lightColor;
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
}

export { Piano };
