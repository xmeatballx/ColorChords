import { state } from "../models/state";
import {pubsub} from "../models/pubsub";
import { code } from "../views/code";

const attachTabListener = [...document.querySelectorAll(".tabicons>a")].forEach(icon => {
    icon.addEventListener("click", useTab);
})

function useTab(e) {
    const tab = e.currentTarget.getAttribute("data-tab");
    state.tab = tab;
    pubsub.publish("tab changed", state);
}

function showCode(state) {
    const codeView = document.querySelector(".code");
    const currCode = document.querySelectorAll(".code>p");
    const codeOpts = document.querySelectorAll("li>a>h2");
    console.log(codeOpts);
    [...codeOpts].forEach(option => {
        option.getAttribute("data-selected") == true ? option.classList.add("selected"): "";
        option.addEventListener("click", (e) => {
            const otherSiblings = [...codeOpts].filter((option) => option != e.target)
            otherSiblings.forEach(sibling => sibling.classList.remove("selected"));
            e.target.classList.add("selected");
            
        })
    })
    
    if (state.tab=="code") {
        codeView.style.display = "block";
        [...currCode].forEach(codeBlock => codeBlock ? codeView.removeChild(codeBlock) : "")
        codeView.appendChild(code(state));
    } else {
        codeView.style.display = "none";
    }
}

export {attachTabListener, showCode};