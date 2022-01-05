/* eslint-disable no-undef, no-unused-vars */
let numNotes = 0;
const listItems = document.querySelector("#notes");
const notesList = [...listItems.children].filter(
  (item, index) => index % 2 == 1
);
const note = document.querySelector(".note");
initIntervals();
setTimeout(() => {
  addPreviewColor();
}, 500);

const rotation = document.querySelector(".rotation");
rotation.addEventListener("input", (e) => addPreviewColor());

const root = document.querySelector(".content-container");
const addIntervalIcon = document.querySelector(".add_interval_button");
addIntervalIcon.addEventListener("mouseup", () => {
  numNotes++;
  const hr = document.createElement("hr");
  hr.classList.add("w-full");
  const newNote = note.cloneNode(true);
  newNote.children[0].children[0].value =
    newNote.children[0].children[0].children[numNotes % 12].value;
  listItems.appendChild(hr);
  listItems.appendChild(newNote);
  notesList.push(newNote);
  initIntervals();
  addPreviewColor();

  const allParams = document.querySelectorAll(".param");
  [...allParams].forEach((param) => {
    param.addEventListener("change", (e) => addPreviewColor());
  });

  console.log(numNotes);
  document.querySelector(`#note${numNotes}`).scrollIntoView();
});

const removeIntervalIcon = document.querySelector(".remove_interval_button");
removeIntervalIcon.addEventListener("mouseup", () => {
  numNotes--;
  notesList.length -= 1;
  listItems.removeChild(listItems.lastChild);
  listItems.removeChild(listItems.lastChild);
  removePreviewColor();
  document.querySelector(`#note${numNotes}`).scrollIntoView();
});

function initIntervals() {
  notesList.forEach((noteElement, index) => {
    noteElement.setAttribute("id", `note${index}`);
    const intervalPicker = noteElement.children[0].children[0];
    const octaveRange = noteElement.children[0].children[2].children[2];
    const octaveValueDisplay = noteElement.children[0].children[2].children[1];
    const saturationRange = noteElement.children[0].children[3].children[2];
    const saturationValueDisplay =
      noteElement.children[0].children[3].children[1];
    intervalPicker.setAttribute("id", `interval${index}`);
    octaveRange.setAttribute("id", `octave${index}`);
    saturationRange.setAttribute("id", `saturation${index}`);
    noteElement.children[0].children[1].setAttribute("id", `color${index}`);
    noteElement.children[1].setAttribute("id", `color2${index}`);
    octaveRange.addEventListener("input", (e) => {
      octaveValueDisplay.textContent =
        e.target.value > 0 ? `+${e.target.value}` : e.target.value;
    });

    saturationRange.addEventListener("input", (e) => {
      saturationValueDisplay.textContent = `${e.target.value}%`;
    });
  });
}

const colorContainer = document.querySelector(".preview_container");
function addPreviewColor() {
  setTimeout(() => {
    while (colorContainer.firstChild) {
      colorContainer.removeChild(colorContainer.firstChild);
    }
    notesList.forEach((note, index) => {
      let colorElement = document.querySelector(`#color${index}`);
      let color = colorElement.style.backgroundColor;
      let preview = document.createElement("div");
      preview.style.flex = "auto";
      preview.style.backgroundColor = color;
      colorContainer.appendChild(preview);
    });
  }, 200);
}

function removePreviewColor() {
  colorContainer.removeChild(colorContainer.lastChild);
}
