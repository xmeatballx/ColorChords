export const deleteButton = (index) => {
    return `<a href="#" class="delete" data-index=${index}>
          <img class="delete-icon mx-auto" src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png" data-index=${index}/>
    </a>`
}