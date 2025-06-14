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
function generateAliveGridCellId() {
    if (isAliveSet.size >= 100) { //early return if the set is full
        return undefined
    }

    //generate a new id
    const randRowInt = Math.floor(Math.random() * 15)
    const randCellInt = Math.floor(Math.random() * 40)
    const cellId = `${randRowInt}-${randCellInt}`

    //if it already includes the newly generated id we try again
    if (isAliveSet.has(cellId)) {
        return generateAliveGridCellId()
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

    while (true) {
        const cellId = generateAliveGridCellId() //gen til we return undefined
        if (cellId === undefined) break //reached 100 limit

        const cell = document.querySelector(`[data-id='${cellId}']`)
        if (!cell) continue //just making sure were not setting props on non-existent cells
        cell.dataset.isAlive = 'true'
        cell.classList.add('bg-green-400')
    }
}


genBoard()


function sortSetIds(pairs) {
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


isAliveSet = new Set(sortSetIds(isAliveSet))


const transform = {
    NW: [-1, -1], N: [-1, 0], NE: [-1, 1], W: [0, -1], E: [0, 1], SW: [1, -1], S: [1, 0], SE: [1, 1]
}




function checkNeighbors(targetCell) {

    const cell = document.querySelector(`[data-id='${targetCell}']`)
    const [x,y] = cell.dataset.id.split('-').map((x) => Number(x))

    let aliveCount = 0
    for(let neighbor in transform) {
        const tf = [x + transform[neighbor][0], y + transform[neighbor][1]]
        const div = document.querySelector(`[data-id="${tf[0]}-${tf[1]}"]`)
        if(div && div.dataset.isAlive === "true") {
           aliveCount ++
        }
    }
    return aliveCount
}

function theGameOfLife() {


    document.querySelectorAll('.cell').forEach((cell) => {
        const nbrs = checkNeighbors(cell.dataset.id)

        if(cell.dataset.isAlive === 'true'&& !(nbrs === 2 || nbrs === 3)) {
            cell.dataset.isAlive = 'false'
            cell.classList.remove('bg-green-400')
        }

        if(cell.dataset.isAlive === 'false' && nbrs === 3) {
            cell.dataset.isAlive = 'true'
            cell.classList.add('bg-green-400')
        }

    })
}

let generation  = 0
const gameInterval = setInterval(() => {
    theGameOfLife()
    generation++
    if(generation >= 100) {
        clearInterval(gameInterval)
    }
}, 100)








