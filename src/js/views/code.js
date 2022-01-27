import { intervals } from "../models/constants";

export const code = (state) => {
    const fragment = document.createDocumentFragment();
    const codeContainerRGB = document.createElement("p");
    codeContainerRGB.className = "shrink-0 w-11/12 text-sm text-mid px-6 py-3 md:m-12 bg-adobe-gray-800";
    codeContainerRGB.setAttribute("id", "rgb");


    const codeBoxRGB = document.createElement("code");
    
    codeBoxRGB.setAttribute('style', 'white-space: pre;');
    codeBoxRGB.style.color = "darkorange";
    const prefix = document.createTextNode(":root {");
    const suffix = document.createTextNode("\r\n}");
    codeBoxRGB.appendChild(prefix);

    const varName = document.createElement("span");
    varName.style.color = "lightblue";

    const varValue = document.createElement("span");
    varValue.style.color = "orange";

    
    const cssVarsRGB = state.notes.map( note => {
        const fragment = document.createDocumentFragment();
        const rgbColor = [note.color[0], note.color[1], note.color[2]];
        const colorRGB = rgbColor.join(", ");
        const name = varName.cloneNode();
        name.textContent = `\r\n  --${getKeyByValue(intervals,parseFloat(note.interval)).replace(" ", "").toLowerCase()}: `
        const value = varValue.cloneNode();
        value.textContent =`rgb(${colorRGB});`
        fragment.appendChild(name);
        fragment.appendChild(value);
        return fragment;
    })
    cssVarsRGB.forEach(cssVar => codeBoxRGB.appendChild(cssVar));
    codeBoxRGB.appendChild(suffix);

    const codeContainerHSL = codeContainerRGB.cloneNode();
    codeContainerHSL.className = "shrink-0 w-11/12 text-sm text-mid px-6 py-3 md:m-12 bg-adobe-gray-800";
    codeContainerHSL.setAttribute("id", "hsl");

    const codeBoxHSL = codeBoxRGB.cloneNode();

    codeBoxHSL.appendChild(prefix.cloneNode());

    const cssVarsHSL = state.notes.map( note => {
        const fragment = document.createDocumentFragment();
        const colorHSL = rgbToHsl(note.color[0],note.color[1],note.color[2]).join(", ");
        const name = varName.cloneNode();
        name.textContent = `\r\n  --${getKeyByValue(intervals,parseFloat(note.interval)).replace(" ", "").toLowerCase()}: `
        const value = varValue.cloneNode();
        value.textContent =`hsl(${colorHSL});`
        fragment.appendChild(name);
        fragment.appendChild(value);
        return fragment;
    })
    cssVarsHSL.forEach(cssVar => codeBoxHSL.appendChild(cssVar));
    codeBoxHSL.appendChild(suffix.cloneNode());

    const codeContainerHex = codeContainerRGB.cloneNode();
    codeContainerHex.className = "shrink-0 w-11/12 text-sm text-mid px-6 py-3 md:m-12 bg-adobe-gray-800";
    codeContainerHex.setAttribute("id", "hex");

    const codeBoxHex = codeBoxRGB.cloneNode();
    codeBoxHex.appendChild(prefix.cloneNode());

    const cssVarsHex = state.notes.map( note => {
        const fragment = document.createDocumentFragment();
        const colorHex = rgbToHex(note.color[0],note.color[1],note.color[2]);
        const name = varName.cloneNode();
        name.textContent = `\r\n  --${getKeyByValue(intervals,parseFloat(note.interval)).replace(" ", "").toLowerCase()}: `
        const value = varValue.cloneNode();
        value.textContent =`${colorHex};`
        fragment.appendChild(name);
        fragment.appendChild(value);
        return fragment;
    })
    cssVarsHex.forEach(cssVar => codeBoxHex.appendChild(cssVar));
    codeBoxHex.appendChild(suffix.cloneNode());

    codeContainerRGB.appendChild(codeBoxRGB);
    codeContainerHSL.appendChild(codeBoxHSL);
    codeContainerHex.appendChild(codeBoxHex)

    fragment.append(codeContainerRGB);
    fragment.append(codeContainerHSL);
    fragment.append(codeContainerHex);

    return fragment;
};


function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h.toPrecision(2), s.toPrecision(2), l.toPrecision(2)];
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}