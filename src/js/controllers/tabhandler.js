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

function switchTab(state) {
    console.log(state.tab)
    switch(state.tab) {
        default:
            hideCode();
            hideInfo();
            break;
        
        case "code":
            hideInfo();
            showCode(state);
            break;

        case "info":
            hideCode();
            showInfo();
            break;
    }
}

function showCode(state) {
    const codeView = document.querySelector(".code");
    const codeCarousel = document.querySelector(".code_carousel")
    const currCode = document.querySelectorAll(".code p");
    const codeOpts = document.querySelectorAll("li>a>h2");
    if (state.tab == "code") {
    [...codeOpts].forEach(option => {
        option.addEventListener("click", (e) => {
            e.target.getAttribute("data-parameter") == "rgb" 
            ? document.getElementById("rgb").scrollIntoView({inline: "center", block: "center"})
            : e.target.getAttribute("data-parameter") == "hsl" 
            ? document.getElementById("hsl").scrollIntoView({inline: "center", block: "center"})
            : document.getElementById("hex").scrollIntoView({inline: "center", block: "center"})
            const otherSiblings = [...codeOpts].filter((option) => option != e.target)
            otherSiblings.forEach(sibling => sibling.classList.remove("selected"));
            e.target.classList.add("selected");
            
        })
    })


    codeView.style.display = "block";
    [...currCode].forEach(codeBlock => {
        console.log(codeBlock)
        codeBlock ? codeCarousel.removeChild(codeBlock) : ""
    })
    codeCarousel.appendChild(code(state));
    }
}

function hideCode() {
    const codeView = document.querySelector(".code");
    codeView.style.display = "none"
}

const info = document.querySelector(".info")
function showInfo(state) {
        info.style.display = "block";
}

function hideInfo() {
    info.style.display = "none";
}

export {attachTabListener, showCode, switchTab};