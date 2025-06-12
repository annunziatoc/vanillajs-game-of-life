import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
<div class="h-screen w-screen flex justify-center items-start pt-[10%] bg-cyan-950">
    <div class="grid-container bg-gray-400"> </div>
</div>
`
const grid = document.querySelector('.grid-container')
// MODEL

// model of cell state in an object
const dataModel = (rowIndex, cellIndex) => ({
    rowIndex: rowIndex, cellIndex: cellIndex, isAlive: false
})

// array in memory
const arr = Array.from({length: 15},
    (_, rowIndex) => Array.from({length: 40},
        (_, cellIndex) => dataModel(rowIndex, cellIndex)))

// VIEW

// IS ALIVE ARRAY
let isAliveSet = new Set()

// gen a random alive cell
function generateAliveGridCell() {
    if (isAliveSet.size >= 100) { //early return if the set is full
        return undefined
    }

    //generate a new id
    const randRowInt = Math.floor(Math.random() * 15)
    const randCellInt = Math.floor(Math.random() * 40)
    const cellId = `${randRowInt}-${randCellInt}`

    //if it already includes the newly generated id we try again
    if (isAliveSet.has(cellId)) {
        return generateAliveGridCell()
    } else {
        isAliveSet.add(cellId)
        return cellId
    }
}

// create divs, rows and cells
// decorate them and append them to each other creating a 2d matrix
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

// console.log(grid)


function genBoard() {

    for (let i = 0; i < 100; i++) {
        // gen a valid row-int string literal
        const randRowCellId = generateAliveGridCell() //gen til we return undefined
        if (randRowCellId === undefined) break
        // grab a ref to the dom where: dataset.id === row-int string literal
        // this is the model to view connection
        const cell = document.querySelector(`[data-id='${randRowCellId}']`)
        if (!cell) continue
        // set is alive
        cell.dataset.isAlive = 'true'
        // change the bg
        cell.classList.add(`${cell.dataset.isAlive ? 'bg-green-400' : ''}`)
    }
}


genBoard()

const transform = {
    NW: [-1, -1], N: [-1, 0], NE: [-1, 1], W: [0, -1], E: [0, 1], SW: [1, -1], S: [1, 0], SE: [1, 1]
}


function sortRowColPairs(pairs) {
    return [...pairs].sort((a, b) => {
        const [aRow, aCell] = a.split('-').map((value) => parseInt(value, 10))
        const [bRow, bCell] = b.split('-').map((value) => parseInt(value, 10))
        const rowDiff = aRow - bRow
        if (rowDiff === 0) {
            return aCell - bCell
        }
        return rowDiff
    })
}

isAliveSet = new Set(sortRowColPairs(isAliveSet))


function transformPair(set, direction, location) {

    const loc = location.split('-').map((value) => parseInt(value))
    const tf = transform[direction]
    const output = loc.map((value, index) => {
        return value + tf[index]
    })

    console.log(output)


}

transformPair(isAliveSet, 'E', '1-1')

//test





