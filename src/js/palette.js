export class Palette {
  constructor() {
    this.colorSection = document.querySelector("section:first-child");
    this.colorBlock = document.createElement("div");
    this.colorBlock.classList =
      "flex-auto h-full flex flex-col gap-4 justify-center px-4";
    this.draggingElement = undefined;
    this.cache = [];
  }

  render(colors) {
    this.getColorInfo(colors)
      .then((response) => parseColorInfo(response))
      .then((data) => {
        this.cache = data;
        clearChildren(this.colorSection);
        data.map((prop) => this.paintUI(prop));
      });
  }
  paintUI(color) {
    console.log(color);
    clearChildren(this.colorBlock);
    this.colorBlock.style.backgroundColor = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    this.colorBlock.appendChild(colorName(color));
    this.colorBlock.appendChild(colorInfo("hsl", color));
    this.colorBlock.appendChild(colorInfo("rgb", color));
    this.colorBlock.appendChild(colorInfo("hex", color));

    this.colorSection.appendChild(this.colorBlock.cloneNode(true));
  }

  scrollToEnd() {
    if (this.colorSection.lastChild === null) return;
    setTimeout(
      () =>
        this.colorSection.scrollTo(this.colorSection.lastChild.offsetLeft, 0),
      100
    );
  }

  getColorInfo(colors) {
    return Promise.all(
      colors.getAllColors().map((color, index) => {
        const cachedColor = this.cache[index]
          ? [
              this.cache[index].hsl.h,
              this.cache[index].hsl.s / 100,
              this.cache[index].hsl.l / 100,
            ]
          : "";
        if (
          color[0] == cachedColor[0] &&
          color[1] == cachedColor[1] &&
          color[2] == cachedColor[2]
        ) {
          return this.cache[index];
        }
        const h = Math.round(color[0]);
        const s = Math.round(color[1] * 100) + "%";
        const l = Math.round(color[2] * 100) + "%";
        return fetch(
          `https://www.thecolorapi.com/id?hsl=${h},${s},${l}&format=json`
        );
      })
    );
  }
}

function parseColorInfo(response) {
  return Promise.all(response.map((r) => (r.status ? r.json() : r)));
}

function colorName(color) {
  const colorName = document.createElement("h2");
  colorName.className =
    "text-base md:text-xl font-bold w-max md:min-w-36 text-lighter text-shadow border-b-2 border-b-lighter";
  colorName.textContent = color.name.value;
  return colorName;
}

function colorInfo(mode, color) {
  const colorInfo = document.createElement("ul");
  colorInfo.className =
    "flex flex-col w-36 font-bold text-sm md:text-xl text-lighter text-shadow";

  switch (mode) {
    case "hsl":
      colorInfo.appendChild(listItem("H: ", color.hsl.h));
      colorInfo.appendChild(listItem("S: ", color.hsl.s));
      colorInfo.appendChild(listItem("L: ", color.hsl.l));
      break;

    case "rgb":
      colorInfo.appendChild(listItem("R: ", color.rgb.r));
      colorInfo.appendChild(listItem("G: ", color.rgb.g));
      colorInfo.appendChild(listItem("B: ", color.rgb.b));
      break;

    case "hex":
      colorInfo.appendChild(listItem("Hex: ", color.hex.value));
      break;
  }

  return colorInfo;
}

function listItem(prefix, value) {
  const listItem = document.createElement("li");
  listItem.className = "text-lighter text-shadow";
  listItem.textContent = prefix + value;
  return listItem;
}

function clearChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
