const styles = {
    rotationContainer: "param rotation flex flex-wrap justify-between w-full mx-auto p-3 mb-3",
    rotationLabel: "text-sm text-mid 2xl:text-2xl",
    rotationValue: "slider_value text-sm text-mid 2xl:text-2xl",
    rotation: "param slider light w-full mt-3",
    noteList:
    "notes md:overflow-y-scroll md:scrollbar md:scrollbar-thin md:h-full w-full mb-3",
}

export const transposeControl = (state) => {
    return`
    <hr />
          
    <div
      class="${styles.rotationContainer}"
    >
      <label for="rotation" class="${styles.rotationLabel}">Transpose</label>
      <div class="${styles.rotationValue}">${state.transpose}</div>
      <input
        type="range"
        min="-180"
        max="180"
        step="${180/6}"
        value="${state.transpose}"
        class="${styles.rotation}"
        name="rotation"
        id="rotation"
        data-parameter="transpose"
      />
    </div>
    <hr />
    <ul
      class="${styles.noteList}"
      id="notes"
    > 
  `
};