export const deleteButton = (index) => {
    const button = document.createElement("a");
    button.href = "#";
    button.classList.add("delete");
    button.setAttribute("data-index", index);

    const buttonIcon = document.createElement("img");
    buttonIcon.src = "https://img.icons8.com/material-outlined/24/000000/trash--v1.png";
    buttonIcon.alt = "delete a note"
    buttonIcon.className = "delete-icon mx-auto";
    buttonIcon.setAttribute("data-index", index);

    button.appendChild(buttonIcon);

    return button;
}