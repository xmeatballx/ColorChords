let styles = `add_interval_button p-3 border border-mid mx-auto rounded text-mid 2xl:text-2xl font-medium justify-self-center self-end mb-3`

export const addNoteButton = () => {
    const button = document.createElement("button");
    button.className = styles;
    button.textContent = "Add Color";
    return button;
};