const themeToggle = document.querySelector(".toggle");
  themeToggle.onclick = (e) => useTheme(e);

let darkMode = false;
function useTheme(e) {
  const parameter = e.currentTarget.getAttribute("data-parameter");
  if (parameter == "theme") {
    darkMode = !darkMode;
    toggleDarkTheme(darkMode);
  }
}

function toggleDarkTheme(darkMode) {
  const root = document.querySelector(".root");
  const switcher = document.querySelector(".switch");
  const icon = document.querySelector(".icon");
  const mask = document.querySelector(".mask");

  if (darkMode) {
    root.style.setProperty("--bg-main", "var(--gray-900)");
    root.style.setProperty("--bg-focus", "var(--gray-800)");
    root.style.setProperty("--mid", "var(--gray-500)");
    root.style.setProperty("--high-contrast", "var(--gray-100)");
  } else {
    root.style.setProperty("--bg-main", "var(--gray-100)");
    root.style.setProperty("--bg-focus", "var(--gray-500)");
    root.style.setProperty("--mid", "var(--gray-900)");
    root.style.setProperty("--high-contrast", "var(--gray-900)");
  }
  switcher.classList.toggle("switch-left");
  switcher.classList.toggle("switch-right");
  mask.classList.toggle("nomask");
  icon.classList.toggle("sun");
}

let colors = [];

function Piano() {
  const keys = document.querySelectorAll("section#piano svg > g > path");

  Piano.prototype.init = function () {
    keys.forEach((key) => {
      key.addEventListener("click", (e) => {
        const active = e.target.getAttribute("data-active");
        if (active == "false") {
          keyDown(e);
          updateUI();
        } else {
          keyUp(e);
          updateUI();
        }
        });
      });
      flagAccidentals();
  };

  const intervals = {
  "C": 0,
  "C#": 0.067,
  "D": 0.125,
  "Eb": 0.2,
  "E": 0.25,
  "F": 0.333,
  "F#": 0.414,
  "G": 0.5,
  "Ab": 0.6,
  "A": 0.666,
  "Bb": 0.777,
  "B": 0.875
};
  function keyDown(e) {
    var rect = e.target.getBoundingClientRect();
    const hue = intervals[e.target.classList[0]] * 360;
    const saturation = ((e.clientY - rect.top) / rect.height).toFixed(2) * 100;
    let value = e.target.getAttribute("data-octave");
    value = value/8*100;
    const color = [hue, saturation, value];
    e.target.style.fill = `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`; 
    colors.push(color)
    e.target.setAttribute("data-active", "true");
  }

  function keyUp(e) {
    const hue = intervals[e.target.classList[0]] * 360;
    let value = e.target.getAttribute("data-octave");
    value = value/8*100;
    const indexToRemove = colors.map((color, index) => {
      return color[0] == hue && color[2] == value ? index : null;
    }).filter(result => result != null);
    colors.splice(indexToRemove,1);
    e.target.style.fill = e.target.classList.contains("accidental")? "black" : "white";
    e.target.setAttribute("data-active", "false");
  }

  function flagAccidentals() {
    const accidentals = document.querySelectorAll("path:nth-child(2), path:nth-child(4), path:nth-child(7), path:nth-child(9), path:nth-child(11)");
    [...accidentals].forEach(accidental => accidental.classList.add("accidental"))
  }
}

const piano = new Piano();
piano.init();

function updateUI() {
  const colorSection = document.querySelector("section:first-child");
	while (colorSection.firstChild) { 
		colorSection.removeChild(colorSection.firstChild); 
	} 
  const colorBlock = document.createElement("div");
  colorBlock.classList = "flex-grow h-full"
  colors.forEach(color => {
    colorBlock.style.backgroundColor = createHSL(color);
    colorSection.appendChild(colorBlock.cloneNode());
  })
}

function createHSL(color) {
    return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`
}