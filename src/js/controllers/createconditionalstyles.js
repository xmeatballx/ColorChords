import { code } from "../views/code";

let prevTab;
export const createConditionalStyles = (styles, state) => {
    return Object.keys(styles).reduce( (result, key) => {
    result[key] = styles[key];
    console.log(prevTab)
    if (state.tab != "notes" && state.tab != "code") {
            if (key != "colorPreviewOnly" & key != "controls") {
                result[key] = styles.hidden
                key == "colorPreview" ? result[key] = styles.colorPreviewOnly : 
                key == "note" ? result[key] = styles.color : "";
            }
        }
    return result; 
}, {})
}