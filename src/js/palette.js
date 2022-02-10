import { HSLtoRGB, RGBtoHex } from "./colors";

function Palette() {
  const colorSection = document.querySelector("section:first-child");
  const colorBlock = document.createElement("div");
  Palette.prototype.render = function (colors) {
    clearChildren(colorSection);
    colorBlock.classList = "flex-grow h-full grid items-center justify-center ";

    Promise.all(
      colors
        .getAllColors()
        .map((color, index) =>
          fetch(
            `https://www.thecolorapi.com/id?hsl=${Math.round(color[0])},${
              Math.round(color[1] * 100) + "%"
            },${Math.round(color[2] * 100) + "%"}&format=json`
          )
        )
    ).then((response) => {
      console.log(response);
      Promise.all(response.map((r) => r.json())).then((props) => {
        props.map((prop, index) => {
          console.log(prop.hsl);
          paintUI(colors, prop, index);
        });
      });
    });
  };

  function paintUI(colors, color, index) {
    clearChildren(colorBlock);
    const colorInfoHSL = document.createElement("ul");
    colorInfoHSL.className =
      "grid justify-center items-center w-max m-auto font-bold text-main text-shadow";
    clearChildren(colorInfoHSL);

    const colorInfoRGB = document.createElement("ul");
    colorInfoRGB.className =
      "grid w-max m-auto font-bold text-main text-shadow";
    clearChildren(colorInfoRGB);

    const colorInfoHex = document.createElement("p");
    colorInfoHex.className = "w-max font-bold text-main text-shadow";

    const colorName = document.createElement("h2");
    colorName.className = "font-bold text-main text-shadow text-center";
    colorName.textContent = color.name.value;

    const hueItem = document.createElement("li");
    hueItem.className = "text-main text-shadow";
    hueItem.textContent = `H: ` + color.hsl.h;

    const saturationItem = document.createElement("li");
    saturationItem.textContent = "S:   " + color.hsl.s;

    const valueItem = document.createElement("li");
    valueItem.textContent = "L:   " + color.hsl.l;

    const rItem = document.createElement("li");
    rItem.textContent = "R:   " + color.rgb.r;

    const gItem = document.createElement("li");
    gItem.textContent = "G:   " + color.rgb.g;

    const bItem = document.createElement("li");
    bItem.textContent = "B:   " + color.rgb.b;

    const hexItem = document.createTextNode("Hex: " + color.hex.value);
    colorInfoHSL.appendChild(hueItem);
    colorInfoHSL.appendChild(saturationItem);
    colorInfoHSL.appendChild(valueItem);
    colorInfoRGB.appendChild(rItem);
    colorInfoRGB.appendChild(gItem);
    colorInfoRGB.appendChild(bItem);
    colorInfoHex.appendChild(hexItem);

    colorBlock.appendChild(colorName);
    colorBlock.appendChild(colorInfoHSL);
    colorBlock.appendChild(colorInfoRGB);
    colorBlock.appendChild(colorInfoHex);

    colorBlock.style.backgroundColor = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    colorSection.appendChild(colorBlock.cloneNode(true));
  }

  function clearChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}

export { Palette };
