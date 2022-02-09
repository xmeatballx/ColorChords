import { Theme } from "./theme";
import { Colors } from "./colors";
import { Piano } from "./piano";
import { Palette } from "./palette";

function Controller() {
  const theme = new Theme();
  const piano = new Piano();
  const colors = new Colors();
  const palette = new Palette();

  Controller.prototype.handleInput = function () {
    const themeToggle = document.querySelector(".toggle");
    themeToggle.onclick = (e) => theme.toggleDark(e);

    const pianoKeys = document.querySelectorAll("section#piano svg > g > path");
    [...pianoKeys].forEach((key) => {
      key.addEventListener("mousedown", function (e) {
        const active = e.target.getAttribute("data-active");
        if (active == "false") {
          colors.add(e);
          piano.keyDown(e.target, colors.getColorStyleRule(e.target));
        } else {
          piano.keyUp(e.target);
          colors.remove(e.target);
        }
        palette.render(colors);
      });
    });
  };
}
export { Controller };
