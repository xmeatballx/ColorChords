/* eslint-disable no-undef, no-unused-vars */
let numNotes = 0;
const notesList = document.querySelector("#notes");
const note = document.querySelector(".note");
initIntervals();
setTimeout(() => {
  addPreviewColor();
}, 500);

const rotation = document.querySelector(".rotation");
rotation.addEventListener("input", (e) => addPreviewColor());

const addIntervalIcon = document.querySelector(".add_interval_button");
addIntervalIcon.addEventListener("mouseup", () => {
  numNotes++;
  const newNote = note.cloneNode(true);
  newNote.children[0].value = newNote.children[0].children[numNotes % 12].value;
  notesList.appendChild(newNote);
  initIntervals();
  addPreviewColor();

  const allParams = document.querySelectorAll(".param");
  [...allParams].forEach((param) => {
    param.addEventListener("change", (e) => addPreviewColor());
  });

  notesList.scrollTop = document.querySelector(`#note${numNotes}`).offsetTop;
});

const removeIntervalIcon = document.querySelector(".remove_interval_button");
removeIntervalIcon.addEventListener("mouseup", () => {
  numNotes--;
  notesList.removeChild(notesList.lastChild);
  removePreviewColor();
  notesList.scrollTop =
    document.querySelector(`#note${numNotes}`).offsetTop - 1;
});

function initIntervals() {
  [...notesList.children].forEach((noteElement, index) => {
    noteElement.setAttribute("id", `note${index}`);
    const intervalPicker = notesList.children[index].children[0];
    const octaveRange = notesList.children[index].children[2].children[2];
    const octaveValueDisplay =
      notesList.children[index].children[2].children[1];
    const saturationRange = notesList.children[index].children[3].children[2];
    const saturationValueDisplay =
      notesList.children[index].children[3].children[1];
    intervalPicker.setAttribute("id", `interval${index}`);
    octaveRange.setAttribute("id", `octave${index}`);
    saturationRange.setAttribute("id", `saturation${index}`);
    noteElement.children[1].setAttribute("id", `color${index}`);

    octaveRange.addEventListener("input", (e) => {
      octaveValueDisplay.textContent =
        e.target.value > 0 ? `+${e.target.value}` : e.target.value;
    });

    saturationRange.addEventListener("input", (e) => {
      saturationValueDisplay.textContent = `${e.target.value}%`;
    });
  });
}

function addPreviewColor() {
  setTimeout(() => {
    const colorContainer = document.querySelector(".preview_container");
    // console.log(colorContainer);
    while (colorContainer.firstChild) {
      colorContainer.removeChild(colorContainer.firstChild);
    }
    [...notesList.children].forEach((note, index) => {
      let colorElement = document.querySelector(`#color${index}`);
      let color = colorElement.style.backgroundColor;
      console.log(color);
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
