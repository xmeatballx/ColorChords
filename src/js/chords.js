export const Chords = function () {
  this.active = { root: "", type: "" };
  this.visible = false;
  this.chordContainer = document.querySelector("section.chord_picker");
  this.chordElements = [
    ...document.querySelectorAll("section.chord_picker > ul > li"),
  ];
};

Chords.prototype.showChords = function (e) {
  this.visible = !this.visible;
  this.chordContainer.style.display = this.visible ? "grid" : "none";
};

Chords.prototype.paintUI = function (chordElement, index) {
  if (!isRoot(chordElement)) {
    return;
  } else {
    const hue = Math.round(
      (index / chordElement.parentElement.children.length) * 300
    );
    chordElement.style.backgroundColor = `hsl(${hue}, 100%, 50%`;
  }
};

Chords.prototype.highlightInUI = function (e) {
  [...e.currentTarget.parentElement.children].forEach((chordRoot) => {
    chordRoot == e.currentTarget
      ? ""
      : chordRoot.classList.remove("chord-active");
  });
  e.currentTarget.classList.toggle("chord-active");
};

function isRoot(option) {
  return option.parentElement.classList.contains("chord_picker-roots");
}

Chords.prototype.getChord = function (option, index) {
  this.setActive(option, index);
  if (this.active.length < 2) return;
  let chordIntervals = [];
  switch (this.active.type) {
    default: {
      chordIntervals = [1];
      break;
    }
    case "M": {
      chordIntervals = [1, 5, 8];
      break;
    }
    case "m": {
      chordIntervals = [1, 4, 8];
      break;
    }
    case "+": {
      chordIntervals = [1, 4, 7];
      break;
    }
    case "°": {
      chordIntervals = [1, 5, 7];
      break;
    }
    case "M6": {
      chordIntervals = [1, 5, 8, 10];
      break;
    }
    case "m6": {
      chordIntervals = [1, 4, 8, 9];
      break;
    }
    case "M7": {
      chordIntervals = [1, 5, 8, 12];
      break;
    }
    case "m7": {
      chordIntervals = [1, 4, 8, 11];
      break;
    }
    case "M9": {
      chordIntervals = [1, 5, 8, 12, 15];
      break;
    }
    case "m9": {
      chordIntervals = [1, 4, 8, 12, 15];
      break;
    }
  }
  const offset = this.active.root;
  let transposedChord = chordIntervals.map((interval) => interval + offset);
  return transposedChord;
};

Chords.prototype.setActive = function (option, index) {
  isRoot(option)
    ? (this.active.root = index)
    : (this.active.type = option.textContent
        .replace(/\r?\n|\r/g, "")
        .replace(/\r?\s|\r/g, ""));
};
