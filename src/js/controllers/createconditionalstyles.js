export const createConditionalStyles = (styles, state) => {
    return Object.keys(styles).reduce( (result, key) => {
    result[key] = styles[key];
    switch(state.tab) {
        case "notes":
            break;

        case "colors": 
            if (key != "colorPreviewOnly" & key != "controls") {
                result[key] = styles.hidden
                key == "colorPreview" ? result[key] = styles.colorPreviewOnly : 
                key == "note" ? result[key] = styles.color : "";
            }
            break;

    }
    return result; 
  }, {})
}