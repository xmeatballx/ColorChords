function Palette() {
  this.colorSection = document.querySelector("section:first-child");
  this.colorBlock = document.createElement("div");
}

Palette.prototype.render = function (colors) {
  clearChildren(this.colorSection);
  this.colorBlock.classList =
    "flex-grow h-full grid items-center justify-center";

  getColorInfo(colors)
    .then((response) => parseColorInfo(response))
    .then((data) => useColorInfo(data));
};

function getColorInfo(colors) {
  return Promise.all(
    colors.getAllColors().map((color) => {
      const h = Math.round(color[0]);
      const s = Math.round(color[1] * 100) + "%";
      const l = Math.round(color[2] * 100) + "%";
      fetch(`https://www.thecolorapi.com/id?hsl=${h},${s},${l}&format=json`);
    })
  );
}

function parseColorInfo(response) {
  return Promise.all(response.map((r) => r.json()));
}

function useColorInfo(props) {
  props.map((prop, index) => {
    paintUI(colors, prop, index);
  });
}

function paintUI(color) {
  clearChildren(colorBlock);

  colorBlock.appendChild(colorName(color));
  colorBlock.appendChild(colorInfo("hsl", color));
  colorBlock.appendChild(colorInfoRGB("rgb", color));
  colorBlock.appendChild(colorInfoHex("hex", color));

  colorBlock.style.backgroundColor = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
  colorSection.appendChild(colorBlock.cloneNode(true));
}

function colorName(color) {
  const colorName = document.createElement("h2");
  colorName.className = "font-bold text-main text-shadow text-center";
  colorName.textContent = color.name.value;
  return colorName;
}

function colorInfo(mode, color) {
  const colorInfo = document.createElement("ul");
  colorInfo.className =
    "grid justify-center items-center w-max m-auto font-bold text-main text-shadow";

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
      colorInfo.appendChild("Hex: ", color.hex.value);
  }

  return colorInfo;
}

function colorInfoRGB(color) {
  const colorInfoRGB = document.createElement("ul");
  colorInfoRGB.className = "grid w-max m-auto font-bold text-main text-shadow";
  clearChildren(colorInfoRGB);

  const rItem = document.createElement("li");
  rItem.textContent = "R:   " + color.rgb.r;

  const gItem = document.createElement("li");
  gItem.textContent = "G:   " + color.rgb.g;

  const bItem = document.createElement("li");
  bItem.textContent = "B:   " + color.rgb.b;

  colorInfoRGB.appendChild(rItem);
  colorInfoRGB.appendChild(gItem);
  colorInfoRGB.appendChild(bItem);

  return colorInfoRGB;
}

function colorInfoHex(color) {
  const colorInfoHex = document.createElement("p");
  colorInfoHex.className = "w-max font-bold text-main text-shadow";

  const hexItem = document.createTextNode("Hex: " + color.hex.value);

  colorInfoHex.appendChild(hexItem);

  return colorInfoHex;
}

function listItem(prefix, value) {
  const listItem = document.createElement("li");
  listItem.className = "text-main text-shadow";
  listItem.textContent = prefix + value;
  return listItem;
}

function clearChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export { Palette };
