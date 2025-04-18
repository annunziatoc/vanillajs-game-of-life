import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
<div class="grid-container"> </div>
`
const grid = document.querySelector('.grid-container')
// MODEL

//model of cell state in an object
const dataModel = (rowIndex, cellIndex) => ({
    rowIndex: rowIndex, cellIndex: cellIndex, isAlive: false
})

//array in memory
const arr = Array.from({length: 15}, (_, rowIndex) => Array.from({length: 60}, (_, cellIndex) => dataModel(rowIndex, cellIndex)))

//VIEW

const isAliveArray = []
//gen a random alive cell
function generateAliveGridCell () {
    const randRowInt = Math.floor(Math.random() * 15)
    const randCellInt = Math.floor(Math.random() * 60)
    isAliveArray.push([randRowInt, randCellInt])
    return `${randRowInt}-${randCellInt}`
}

//create divs, rows and cells
//decorate them and append them to each other creating a 2d matrix
arr.forEach((row, rowIdx) => {
    const rowContainer = document.createElement('div')
    rowContainer.className = (`row-container flex`)

    grid.appendChild(rowContainer)

    row.forEach((cell, cellIdx) => {
        const cellDiv = document.createElement('div')
        cellDiv.className = (`cell border h-4 w-4 ${cell.isAlive ? 'bg-green-500' : ''}`)
        cellDiv.dataset.id = `${rowIdx}-${cellIdx}`

        //append alive cell to the dom
        const randInt = generateAliveGridCell()
        cellDiv

        rowContainer.appendChild(cellDiv)
    })
})

console.log(grid)

