import { Controller } from "./controller";

const controller = new Controller();

const themeToggle = document.querySelector(".toggle");
themeToggle.onclick = (e) => this.theme.toggleDark(e);

const pianoKeys = document.querySelectorAll("section#piano svg > g > path");
[...pianoKeys].forEach((key) =>
  key.addEventListener("mousedown", controller.handleInput(key))
);
