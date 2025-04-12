const app = document.querySelector('#app')

app.innerHTML = `
<div class="grid-container">

</div>
`

//model

const createObj = (rowIndex, cellIndex) => {
    return {
        row: rowIndex, cell: cellIndex
    }
}

const arr = Array.from({length: 60}, (_, rowIndex) => Array.from({length: 20}, (_, cellIndex) => createObj(rowIndex, cellIndex)))

// view

const grid = document.querySelector('.grid-container')

arr.forEach((row, rowIndex) => {
    const rowContainer = document.createElement('div')
    rowContainer.setAttribute('data-row', JSON.stringify(rowIndex))
    rowContainer.classList.add('row-container')
    grid.appendChild(rowContainer)
    row.forEach((_, cellIndex) => {
        const cellElement = document.createElement('div')
        cellElement.setAttribute('data-cell', JSON.stringify(cellIndex))
        rowContainer.appendChild(cellElement)
    })
})

console.log(arr)