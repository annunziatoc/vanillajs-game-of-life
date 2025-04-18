import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
<div class="h-screen w-screen flex justify-center items-start pt-[10%] bg-cyan-950">
<div class="grid-container bg-gray-400"> </div>
</div>
`
const grid = document.querySelector('.grid-container')
// MODEL

//model of cell state in an object
const dataModel = (rowIndex, cellIndex) => ({
    rowIndex: rowIndex, cellIndex: cellIndex, isAlive: false
})

//array in memory
const arr = Array.from({length: 15}, (_, rowIndex) => Array.from({length: 40}, (_, cellIndex) => dataModel(rowIndex, cellIndex)))

//VIEW

//IS ALIVE ARRAY
const isAliveSet = new Set()

//gen a random alive cell
function generateAliveGridCell() {
    const randRowInt = Math.floor(Math.random() * 15)
    const randCellInt = Math.floor(Math.random() * 60)
    const cellId = `${randRowInt}-${randCellInt}`
    if (isAliveSet.has(cellId)) {
        if (isAliveSet.size < 100) {
            return generateAliveGridCell()
        } else return
    } else {
        isAliveSet.add(cellId)
        return cellId
    }
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
        cellDiv.dataset.isAlive = cell.isAlive

        rowContainer.appendChild(cellDiv)
    })
})

console.log(grid)


function genBoard() {

    for (let i = 0; i < 100; i++) {
        //gen a valid row-int string literal
        const randRowCellId = generateAliveGridCell()
        if (randRowCellId === undefined) break
        //grab a ref to the dom where: dataset.id === row-int string literal
        //this is the model to view connection
        const cell = document.querySelector(`[data-id='${randRowCellId}']`)
        if (!cell) continue
        //set is alive
        cell.dataset.isAlive = 'true'
        //change the bg
        cell.classList.add(`${cell.dataset.isAlive ? 'bg-green-400' : ''}`)
    }
}

genBoard()

const transform = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 0], [0, 1],
    [1, -1], [1, 0], [1, 1]
]

