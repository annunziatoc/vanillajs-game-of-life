import './style.css'

const app = document.querySelector('#app')


app.innerHTML = `

<div class="bg-gray-400 w-screen h-screen flex justify-center items-center px-10">
<div class="grid flex flex-col"> 

</div>
</div>

 `
const createCell = (rowIndex, cellIndex) => {
    return {
        index: rowIndex * 60 + cellIndex,
        row: rowIndex,
        cell: cellIndex,
        isAlive: false,
    }
}

let arr = Array.from({length: 15}, (_, rowIndex) => Array.from({length: 60}, (_, cellIndex) => createCell(rowIndex, cellIndex)))

const grid = document.querySelector('.grid')
arr.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div')
    rowDiv.className = 'rowDiv flex'
    rowDiv.dataset.index = rowIndex.toString()
    grid.appendChild(rowDiv)

    row.forEach((cell) => {
        const cellDiv = document.createElement('div')
        cellDiv.className = `h-3 w-3 border bg-black-500`
        cellDiv.dataset.index = cell.index
        cellDiv.dataset.row = cell.row
        cellDiv.dataset.cell = cell.cell
        cellDiv.dataset.isAlive = cell.isAlive
        rowDiv.appendChild(cellDiv)
    })
})

arr[0][0].isAlive = true
const cell = document.querySelector(`[data-row="0"][data-cell="0"]`)
cell.dataset.isAlive = "true"

if(Boolean(cell.dataset.isAlive)) {
    cell.classList.remove('bg-black-500')
    cell.classList.add('bg-green-500')
}

console.log(app)



