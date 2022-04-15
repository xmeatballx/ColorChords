export class CodeView {
  constructor() {
    this.textElement = document.querySelector('#code');
    this.isOpen = false;
  }

  update(colors) {
    clearChildren(this.textElement);
    const selector = document.createElement('span');
    const closingBrace = document.createElement('span');
    selector.textContent = ':root {';
    closingBrace.textContent = '}';
    this.textElement.appendChild(selector);
    colors.map((color) => {
      const codeString = document.createElement('span');
      codeString.classList.add('property');
      const name = color.name.value.toLowerCase().replace(/ /g, '_');
      const rule = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%);`;
      codeString.textContent = `\n--${name}: ${rule}`;
      this.textElement.appendChild(codeString);
    });
    this.textElement.appendChild(closingBrace);
  }
}

function clearChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
