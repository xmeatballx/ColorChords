import { Controller } from "./controller";
import Sortable from "sortablejs";
import css from "../css/main.css";

const controller = new Controller();
controller.handleTheme();
controller.handleParams();
controller.handlePianoInput();
controller.handleKeyBoardInput();

const sortableContainer = document.getElementById("palette");
console.log(sortableContainer);
new Sortable(sortableContainer, {
  animation: 150,
  onUpdate: (e) => controller.handleSort(e),
});
