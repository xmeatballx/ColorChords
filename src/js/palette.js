export const Palette = function () {
  this.colorSection = document.querySelector("section:first-child");
  this.colorBlock = document.createElement("div");
  this.colorBlock.classList =
    "flex-grow h-full flex flex-col gap-4 justify-center items-center p-2/4";
};

Palette.prototype.render = function (colors) {
  clearChildren(this.colorSection);

  getColorInfo(colors)
    .then((response) => parseColorInfo(response))
    .then((data) => {
      data.map((prop) => this.paintUI(prop));
    });
};

Palette.prototype.paintUI = function (color) {
  clearChildren(this.colorBlock);

  this.colorBlock.appendChild(colorName(color));
  this.colorBlock.appendChild(colorInfo("hsl", color));
  this.colorBlock.appendChild(colorInfo("rgb", color));
  this.colorBlock.appendChild(colorInfo("hex", color));

  this.colorBlock.style.backgroundColor = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
  this.colorSection.appendChild(this.colorBlock.cloneNode(true));
};

function getColorInfo(colors) {
  return Promise.all(
    colors.getAllColors().map((color) => {
      const h = Math.round(color[0]);
      const s = Math.round(color[1] * 100) + "%";
      const l = Math.round(color[2] * 100) + "%";
      return fetch(
        `https://www.thecolorapi.com/id?hsl=${h},${s},${l}&format=json`
      );
    })
  );
}

function parseColorInfo(response) {
  return Promise.all(response.map((r) => r.json()));
}

function colorName(color) {
  const colorName = document.createElement("h2");
  colorName.className =
    "text-xl font-bold min-w-36 text-lighter text-shadow border-b-2 border-b-lighter";
  colorName.textContent = color.name.value;
  return colorName;
}

function colorInfo(mode, color) {
  const colorInfo = document.createElement("ul");
  colorInfo.className =
    "flex flex-col w-36 font-bold text-xl text-lighter text-shadow";

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
