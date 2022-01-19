import { pubsub } from "../models/pubsub.js";
import { state } from "../models/state.js";
import { attachListeners } from "../controllers/controlhandler.js";
import { noteUI } from "./noteui.js";
import { transposeControl } from "./transpose.js"
import { addNoteButton } from "./addbutton"

function renderListTemplate(state) {

  const noteList = state.notes.map((note, index) => {
    return noteUI(note, index);
  })

  const container = document.querySelector(".controls-container");
  container.innerHTML =
    transposeControl(state) + noteList.join("") + "</ul>" + addNoteButton;

  const list = document.querySelector(".notes");
  list.scrollTop = list.lastChild.offsetTop;

  attachListeners();
}

export { renderListTemplate };
