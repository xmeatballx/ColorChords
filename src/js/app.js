import { Controller } from "./controller";
import css from "../css/main.css";

const controller = new Controller();

const themeToggle = document.querySelector(".toggle");
themeToggle.onclick = (e) => theme.toggleDark(e);

const pianoKeys = document.querySelectorAll("section#piano svg > g > path");
[...pianoKeys].forEach((key) =>
  key.addEventListener("mousedown", (e) => controller.handleInput(e))
);
