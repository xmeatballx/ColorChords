function Palette() {
  Palette.prototype.render = function (colors) {
    const colorSection = document.querySelector("section:first-child");
    while (colorSection.firstChild) {
      colorSection.removeChild(colorSection.firstChild);
    }
    const colorBlock = document.createElement("div");
    colorBlock.classList = "flex-grow h-full";
    colors.getAllColors().forEach((color, index) => {
      colorBlock.style.backgroundColor = colors.getColorStyleRuleByIndex(index);
      colorSection.appendChild(colorBlock.cloneNode());
    });
  };
}

export { Palette };
