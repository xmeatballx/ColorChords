import {deleteButton} from './deletebutton.js'

let styles = {
  note: "note w-full h-max p-3 md:flex md:flex-row",
  controls: "controls w-full",
  interval:
    "param interval text-base text-mid 2xl:text-2xl font-semibold transition ease-in-out m-0 p-1 w-full mb-2 shadow-sm border border-light rounded focus:border-blue-600 focus:outline-none",
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

let intervals = {
  "Fundamental": 1,
  "Minor Second": 1.067,
  "Major Second": 1.125,
  "Minor Third": 1.2,
  "Major Third": 1.25,
  "Perfect Fourth": 1.333,
  "Tritone": 1.414,
  "Perfect Fifth": 1.5,
  "Minor Sixth": 1.6,
  "Major Sixth": 1.666,
  "Minor Seventh": 1.777,
  "Major Seventh": 1.875,
}

export const noteUI = (noteData, index) => {
  const fragment = document.createDocumentFragment();

  const noteItem = document.createElement("li");
  noteItem.className = styles.note;
  noteItem.setAttribute("data-index", index);

  const controlsContainer = document.createElement("div");
  controlsContainer.className = styles.controls;

   const intervalContainer = document.createElement("div");

  const interval = document.createElement("select");
  interval.name = "interval";
  interval.className = styles.interval;
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
  colorPreview.className = styles.colorPreview;
  colorPreview.style.background = `rgb(${noteData.color[0]}, ${noteData.color[1]}, ${noteData.color[2]}})`;

  controlsContainer.appendChild(colorPreview);

  const octaveContainer = document.createElement("div");
  octaveContainer.className = styles.octaveContainer;

  const octaveLabel = document.createElement("label");
  octaveLabel.for = "octave";
  octaveLabel.className = styles.octaveLabel;
  octaveLabel.textContent = "Octave";
  octaveContainer.appendChild(octaveLabel);

  const octaveValue = document.createElement("div");
  octaveValue.className = styles.octaveValue;
  octaveValue.textContent = noteData.octave;
  octaveContainer.appendChild(octaveValue);

  const octave = document.createElement("input");
  octave.type = "range";
  octave.name = "octave";
  octave.className = styles.octave;
  octave.min = -4;
  octave.max = 4;
  octave.value = noteData.octave;
  octave.setAttribute("data-index", index);
  octave.setAttribute("data-parameter", "octave");
  octaveContainer.appendChild(octave);

  controlsContainer.appendChild(octaveContainer);

  const velocityContainer = document.createElement("div");
  velocityContainer.className = styles.octaveContainer;

  const velocityLabel = document.createElement("label");
  velocityLabel.for = "velocity";
  velocityLabel.className = styles.velocityLabel;
  velocityLabel.textContent = "Velocity";
  velocityContainer.appendChild(velocityLabel);

  const velocityValue = document.createElement("div");
  velocityValue.className = styles.velocityValue;
  velocityValue.textContent = noteData.velocity * 100 + "%";
  velocityContainer.appendChild(velocityValue);

  const velocity = document.createElement("input");
  velocity.type = "range";
  velocity.name = "velocity";
  velocity.className = styles.velocity;
  velocity.min = 0.;
  velocity.max = 1.;
  velocity.step = 0.01;
  velocity.value = noteData.velocity;
  velocity.setAttribute("data-index", index);
  velocity.setAttribute("data-parameter", "velocity");
  velocityContainer.appendChild(velocity);

  controlsContainer.appendChild(velocityContainer);
  controlsContainer.appendChild(deleteButton(index));
  noteItem.appendChild(controlsContainer);

  fragment.append(noteItem);


  return fragment;
}