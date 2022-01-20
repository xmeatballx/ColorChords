export const useColor = (state) => {
    const colorPreviews = document.querySelectorAll(".color_preview");
    colorPreviews.forEach((preview, i) => {
        const col = state.notes[i].color;
        preview.style.backgroundColor = `rgb(${col[0]}, ${col[1]}, ${col[2]})`;
    })
}  