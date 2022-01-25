import { state } from "../models/state";
import {pubsub} from "../models/pubsub";

const attachTabListener = [...document.querySelectorAll(".tabicons>a")].forEach(icon => {
    icon.addEventListener("click", useTab);
})

function useTab(e) {
    const tab = e.currentTarget.getAttribute("data-tab");
    state.tab = tab;
    pubsub.publish("tab changed", state);
}
export {attachTabListener};