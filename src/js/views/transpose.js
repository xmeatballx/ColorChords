const styles = {
    rotationContainer: "param rotation flex flex-wrap justify-between w-full mx-auto p-3 mb-3",
    rotationLabel: "text-sm text-mid 2xl:text-2xl",
    rotationValue: "slider_value text-sm text-mid 2xl:text-2xl",
    rotation: "param slider light w-full mt-3",
}

export const transposeControl = (state) => {
    const fragment = document.createDocumentFragment();

    const divider = document.createElement("hr");
    fragment.append(divider);

    const rotationContainer = document.createElement("div");
    rotationContainer.className = styles.rotationContainer;

    const rotationLabel = document.createElement("label");
    rotationLabel.for = "rotation";
    rotationLabel.className = styles.rotationLabel;
    rotationLabel.textContent = "Transpose";
    rotationContainer.appendChild(rotationLabel);

    const rotationValue = document.createElement("div");
    rotationValue.className = styles.rotationValue;
    rotationValue.textContent = state.transpose;
    rotationContainer.appendChild(rotationValue);

    const rotation = document.createElement("input");
    rotation.type = "range";
    rotation.min = -180;
    rotation.max = 180;
    rotation.step = 180/6;
    rotation.value = state.transpose;
    rotation.className = styles.rotation;
    rotation.name = "rotation";
    rotation.setAttribute("id", "rotation");
    rotation.setAttribute("data-parameter", "transpose");
    rotationContainer.appendChild(rotation);

    fragment.append(rotationContainer);
    
    fragment.appendChild(divider.cloneNode())

    return fragment;
};