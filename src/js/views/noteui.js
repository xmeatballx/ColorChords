import { createConditionalStyles } from '../controllers/createconditionalstyles.js';
import { state } from '../models/state.js';
import {deleteButton} from './deletebutton.js';
import { intervals } from "../models/constants"

let styles = {
  note: "note w-full h-max px-3 mb-3 md:flex md:flex-row",
  color: "note w-full h-min mb-0 px-3 md:flex md:flex-row",
  controls: "controls w-full",
  interval:
    "param interval text-base text-mid 2xl:text-2xl font-semibold transition ease-in-out m-0 p-1 w-full mb-2 shadow-sm border border-light rounded focus:border-blue-600 focus:outline-none",
  colorPreview: "color_preview w-full h-6",
  colorPreviewOnly: "color_preview w-full h-32 border-2 border-bg-main",
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
  deleteButton: "delete",
  hidden: "hidden",
};

export const noteUI = (noteData, index) => {
  let conditionalStyles = createConditionalStyles(styles, state);

  const fragment = document.createDocumentFragment();

  const noteItem = document.createElement("li");
  noteItem.className = conditionalStyles.note;
  noteItem.setAttribute("data-index", index);

  const controlsContainer = document.createElement("div");
  controlsContainer.className = conditionalStyles.controls;

   const intervalContainer = document.createElement("div");

  const interval = document.createElement("select");
  interval.name = "interval";
  interval.className = conditionalStyles.interval;
  interval.setAttribute("data-index", index);
  interval.setAttribute("data-parameter", "interval");

  for (const intervalProp in intervals) {
    const opt = document.createElement("option");
    opt.value = intervals[intervalProp];
    opt.classList.add("text-sm");
    opt.textContent = intervalProp;
    interval.appendChild(opt);
  }

  interval.value = noteData.interval;

  intervalContainer.appendChild(interval);
  controlsContainer.appendChild(intervalContainer);

  const colorPreview = document.createElement("div");
  colorPreview.className = conditionalStyles.colorPreview;
  colorPreview.style.backgroundColor = `rgb(${noteData.color[0]}, ${noteData.color[1]}, ${noteData.color[2]}})`;

  controlsContainer.appendChild(colorPreview);

  const octaveContainer = document.createElement("div");
  octaveContainer.className = conditionalStyles.octaveContainer;

  const octaveLabel = document.createElement("label");
  octaveLabel.for = "octave";
  octaveLabel.className = conditionalStyles.octaveLabel;
  octaveLabel.textContent = "Octave";
  octaveContainer.appendChild(octaveLabel);

  const octaveValue = document.createElement("div");
  octaveValue.className = conditionalStyles.octaveValue;
  octaveValue.textContent = noteData.octave;
  octaveContainer.appendChild(octaveValue);

  const octave = document.createElement("input");
  octave.type = "range";
  octave.name = "octave";
  octave.className = conditionalStyles.octave;
  octave.min = -4;
  octave.max = 4;
  octave.value = noteData.octave;
  octave.setAttribute("data-index", index);
  octave.setAttribute("data-parameter", "octave");
  octaveContainer.appendChild(octave);

  controlsContainer.appendChild(octaveContainer);

  const velocityContainer = document.createElement("div");
  velocityContainer.className = conditionalStyles.octaveContainer;

  const velocityLabel = document.createElement("label");
  velocityLabel.for = "velocity";
  velocityLabel.className = conditionalStyles.velocityLabel;
  velocityLabel.textContent = "Velocity";
  velocityContainer.appendChild(velocityLabel);

  const velocityValue = document.createElement("div");
  velocityValue.className = conditionalStyles.velocityValue;
  velocityValue.textContent = noteData.velocity * 100 + "%";
  velocityContainer.appendChild(velocityValue);

  const velocity = document.createElement("input");
  velocity.type = "range";
  velocity.name = "velocity";
  velocity.className = conditionalStyles.velocity;
  velocity.min = 0.;
  velocity.max = 1.;
  velocity.step = 0.01;
  velocity.value = noteData.velocity;
  velocity.setAttribute("data-index", index);
  velocity.setAttribute("data-parameter", "velocity");
  velocityContainer.appendChild(velocity);

  controlsContainer.appendChild(velocityContainer);
  controlsContainer.appendChild(deleteButton(index,conditionalStyles.deleteButton));
  noteItem.appendChild(controlsContainer);

  fragment.append(noteItem);


  return fragment;
}