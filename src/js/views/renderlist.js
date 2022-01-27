import { attachListeners } from "../controllers/controlhandler.js";
import { noteUI } from "./noteui.js";
import { transposeControl } from "./transpose.js"
import { addNoteButton } from "./addbutton"

function renderListTemplate(state) {
  const container = document.querySelector(".controls-container");
  while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

  container.appendChild(transposeControl(state))
  
  const noteList = document.createElement("ul");
  noteList.className = "notes pt-3 mb-8 md:overflow-y-scroll md:scrollbar md:scrollbar-thin md:h-full w-full";
  noteList.setAttribute("id", "notes");
  state.notes.forEach((note, index) => {
    noteList.appendChild(noteUI(note, index));
  })
  
  container.appendChild(noteList);
  container.appendChild(addNoteButton())
  noteList.scrollTop = noteList.scrollHeight;

  attachListeners();
}

export { renderListTemplate };
