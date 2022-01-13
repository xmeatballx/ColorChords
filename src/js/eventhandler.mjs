import {state} from './state.mjs'
import {pubsub} from './pubsub.mjs'

function attachListeners() {
    const params = document.querySelectorAll(".param");

    Array.from(params).forEach(param => {
        param.addEventListener("change", e => useParam(e))
    })
    const themeToggle = document.querySelector(".toggle");
    themeToggle.addEventListener("click", e => useTheme(e));
}

function useParam(e) {
    const index = e.target.getAttribute("data-index");
    const parameter = e.target.getAttribute("data-parameter");
    const value = e.target.value;
console.log(value)
    if (parameter == "velocity" || parameter == "octave" || parameter == "interval") {
        state.notes[index][parameter] = value;
        pubsub.publish("controls changed", state);
    }
    if (parameter == "transpose") {
        state.transpose = value;
        pubsub.publish("controls changed", state)
    }
}


function useTheme(e) {
    const parameter = e.target.getAttribute("data-parameter");
    if (parameter == "theme") {
        state.theme = value;
        pubsub.publish("theme changed", state)
    }
}

export {attachListeners};

