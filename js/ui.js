/* eslint-disable no-undef, no-unused-vars */
let numNotes = 0;
const notesList = document.querySelector(".notes");

notesList.appendChild(createNoteElement());

const addIntervalIcon = document.querySelector(".add_interval_button");
addIntervalIcon.addEventListener("mouseup", () => {
  numNotes++;
  notesList.appendChild(createNoteElement());
});

const removeIntervalIcon = document.querySelector(".remove_interval_button");
removeIntervalIcon.addEventListener("mouseup", () => {
  numNotes--;
  notesList.removeChild(notesList.lastChild);
});

function createNoteElement() {
  const intervalSelect = document.createElement("select");
  intervalSelect.classList.add("param");
  intervalSelect.setAttribute("id", `interval${numNotes}`);
  let intervalNames = Object.keys(intervals).reverse();
  intervalNames.forEach((interval) => {
    const intervalOption = document.createElement("option");
    intervalOption.value = interval;
    const intervalText = document.createTextNode(interval);
    intervalOption.appendChild(intervalText);

    intervalSelect.appendChild(intervalOption);
  });

  let inputContainer = document.createElement("div");
  inputContainer.classList.add("input_container");

  const octaveContainer = inputContainer.cloneNode();

  let octave = document.createElement("input");
  octave.type = "text";
  octave.setAttribute("id", `octave${numNotes}`);
  octave.classList.add("param");
  octave.value = 0;
  let plusIcon = document.createElement("i");
  plusIcon.classList.add("fas");
  plusIcon.classList.add("fa-plus");

  let minusIcon = document.createElement("i");
  minusIcon.classList.add("fas");
  minusIcon.classList.add("fa-minus");

  let octaveUp = plusIcon.cloneNode();
  octaveUp.addEventListener("click", (e) => handlePlusIcon(e, octave));
  let octaveDown = minusIcon.cloneNode();
  octaveDown.setAttribute("context", "octave");
  octaveDown.addEventListener("click", (e) => handleMinusIcon(e, octave));
  octaveContainer.appendChild(octave);
  octaveContainer.appendChild(octaveDown);
  octaveContainer.appendChild(octaveUp);

  const saturationContainer = inputContainer.cloneNode();

  let saturation = document.createElement("input");
  saturation.setAttribute("id", `saturation${numNotes}`);
  saturation.classList.add("param");
  saturation.value = "100";
  saturationContainer.appendChild(saturation);

  const saturationUp = plusIcon.cloneNode();
  saturationUp.addEventListener("click", (e) => handlePlusIcon(e, saturation));
  const saturationDown = minusIcon.cloneNode();
  saturationDown.addEventListener("click", (e) =>
    handleMinusIcon(e, saturation)
  );
  saturationContainer.appendChild(saturationDown);
  saturationContainer.appendChild(saturationUp);

  let color = document.createElement("div");
  color.classList.add("color_preview");
  color.setAttribute("id", `color${numNotes}`);

  const noteElement = document.createElement("li");
  noteElement.appendChild(intervalSelect);
  noteElement.appendChild(octaveContainer);
  noteElement.appendChild(saturationContainer);
  noteElement.appendChild(color);
  return noteElement;
}

function handlePlusIcon(e, input) {
  input.setAttribute("value", input.value++);
  var changeEvent = document.createEvent("HTMLEvents");
  changeEvent.initEvent("change", false, false);
  input.dispatchEvent(changeEvent);
}

function handleMinusIcon(e, input) {
  input.setAttribute("value", input.value--);
  var changeEvent = document.createEvent("HTMLEvents");
  changeEvent.initEvent("change", false, false);
  input.dispatchEvent(changeEvent);
}
