import { pubsub } from "../models/pubsub.js";
import { state } from "../models/state.js";
import { attachListeners } from "../controllers/controlhandler.js";

let styles = {
  rotationContainer:
    "param rotation flex flex-wrap justify-between w-full mx-auto p-3 mb-3",
  rotationLabel: "text-sm text-mid 2xl:text-2xl",
  rotationValue: "slider_value text-sm text-mid 2xl:text-2xl",
  rotation: "param slider light w-full mt-3",
  noteList:
    "notes md:overflow-y-scroll md:scrollbar md:scrollbar-thin md:h-full w-full mb-3",
  note: "note w-full h-max p-3 md:flex md:flex-row",
  controls: "controls w-full",
  interval:
    "param interval text-base text-mid 2xl:text-2xl font-semibold transition ease-in-out m-0 p-1 w-full mb-2 shadow-sm border border-light rounded focus:text-light focus:border-blue-600 focus:outline-none",
  colorPreview: "color_preview w-full h-6",
  octaveContainer: "flex flex-wrap mt-1 justify-between w-full",
  octaveLabel: "text-sm text-mid 2xl:text-2xl",
  octaveValue: "slider_value text-sm text-mid 2xl:text-2xl",
  octave:
    "param octave slider light mt-3 form-range w-full p-0 focus:outline-none focus:ring-0 focus:shadow-none",
  velocityContainer: "flex flex-wrap mt-1 justify-between w-full",
  velocityLabel: "text-sm text-mid 2xl:text-2xl",
  velocityValue: "slider_value text-sm text-mid 2xl:text-2xl",
  velocity:
    "param saturation slider light mt-3 mb-3 form-range w-full p-0 focus:outline-none focus:ring-0 focus:shadow-none",
  colorPreview2:
    "color_preview hidden w-2/4 flex-grow ml-3 border-2 border-light",
};

function renderListTemplate(state) {
  const transposeControl = `
    <hr />
          
    <div
      class="${styles.rotationContainer}"
    >
      <label for="rotation" class="${styles.rotationLabel}">Transpose</label>
      <div class="${styles.rotationValue}">${state.transpose}</div>
      <input
        type="range"
        min="-180"
        max="180"
        value="${state.transpose}"
        class="${styles.rotation}"
        name="rotation"
        id="rotation"
        data-parameter="transpose"
      />
    </div>
    <hr />
    <ul
      class="${styles.noteList}"
      id="notes"
    > 
  `;

  const listItems = state.notes.map((note, index) => {
    return `
    
    <li class="${styles.note}" data-index=${index}>
			<div class="${styles.controls}">
				<div class="interval-wrapper">
					<select name="interval" class="${
            styles.interval
          }" data-index=${index} data-parameter="interval">
						<option value="1" ${
              note.interval == 1 ? "selected" : ""
            } class="text-sm">Fundamental</option>
						<option value="1.067" ${
              note.interval == 1.067 ? "selected" : ""
            } class="text-sm">Minor Second</option>
						<option value="1.125" ${
              note.interval == 1.125 ? "selected" : ""
            } class="text-sm">Major Second</option>
						<option value="1.200" ${
              note.interval == 1.2 ? "selected" : ""
            } class="text-sm">Minor Third</option>
						<option value="1.250" ${
              note.interval == 1.25 ? "selected" : ""
            } class="text-sm">Major Third</option>
						<option value="1.333" ${
              note.interval == 1.333 ? "selected" : ""
            } class="text-sm">Perfect Fourth</option>
						<option value="1.414" ${
              note.interval == 1.414 ? "selected" : ""
            } class="text-sm">Tritone</option>
						<option value="1.500" ${
              note.interval == 1.5 ? "selected" : ""
            } class="text-sm">Perfect Fifth</option>
						<option value="1.600" ${
              note.interval == 1.6 ? "selected" : ""
            } class="text-sm">Minor Sixth</option>
						<option value="1.666" ${
              note.interval == 1.666 ? "selected" : ""
            } class="text-sm">Major Sixth</option>
						<option value="1.777" ${
              note.interval == 1.777 ? "selected" : ""
            } class="text-sm">Minor Seventh</option>
						<option value="1.875" ${
              note.interval == 1.875 ? "selected" : ""
            }class="text-sm">Major Seventh</option>
					</select>
				</div>
				<div class="${styles.colorPreview}" style="background: rgb(${note.color[0]} ${
      note.color[1]
    } ${note.color[2]})"></div>
				<div class="${styles.octaveContainer}">
					<label for="octave" class="${styles.octaveLabel}">Octave</label>
					<div class="${styles.octaveValue}">${note.octave}</div>
					<input type="range" name="octave" class="${
            styles.octave
          }" min="-4" max="4" value=${
      note.octave
    } data-index=${index} data-parameter="octave"/>
				</div>
				<div class="${styles.velocityContainer}">
					<label for="velocity" class="${styles.velocityLabel}">Velocity</label>
					<div class="${styles.velocityValue}">${note.velocity * 100}%</div>
					<input type="range" name="velocity" class="${
            styles.velocity
          }" min=0.0 max=1.0 value=${
      note.velocity
    } step="0.01" data-index=${index} data-parameter="velocity"/>
				</div>
			</div>
		</li>`;
  });

  const addNoteButton = `
    <button class="add_interval_button p-3 border border-mid mx-auto rounded text-mid 2xl:text-2xl font-medium justify-self-end self-end mb-3">
    Add Color
    </button>
  `;

  const container = document.querySelector(".controls-container");
  container.innerHTML =
    transposeControl + listItems.join("") + "</ul>" + addNoteButton;

  const list = document.querySelector(".notes");
  list.scrollTop = list.lastChild.offsetTop;

  attachListeners();
}

export { renderListTemplate };
