import './style.css'

const app = document.querySelector('#app')


app.innerHTML = `

<div class="bg-gray-400 w-screen h-screen flex justify-center items-center px-10">
<div class="grid flex flex-col"> 

</div>
</div>

 `

//DATA MODEL
const createCell = (rowIndex, cellIndex) => {
    return {
        index: rowIndex * 60 + cellIndex, row: rowIndex, cell: cellIndex, isAlive: false,
    }
}

//track what indices are alive
let currentAlive = []


//gen an array in memory

let arr = Array.from({length: 15}, (_, rowIndex) => Array.from({length: 60}, (_, cellIndex) => createCell(rowIndex, cellIndex)))



//VIEW
//fill the array with divs
//each grid has rows
const grid = document.querySelector('.grid')
arr.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div')
    rowDiv.className = 'rowDiv flex'
    rowDiv.dataset.index = rowIndex.toString()
    grid.appendChild(rowDiv)

//each row is comprised of cells
// link model and views
    row.forEach((cell) => {
        const cellDiv = document.createElement('div')
        cellDiv.className = `h-3 w-3 border bg-teal-500`
        cellDiv.dataset.index = cell.index
        cellDiv.dataset.row = cell.row
        cellDiv.dataset.cell = cell.cell
        cellDiv.dataset.isAlive = cell.isAlive
        rowDiv.appendChild(cellDiv)
    })
})

function genInitialBoard() {

    function randInt() {
        return Math.floor(Math.random() * 899)
    }

    for (let i = 0; i < 5; i++) {
        const randCell = document.querySelector(`[data-index="${randInt().toString()}"]`)
        randCell.classList.remove('bg-teal-500')
        randCell.classList.add('bg-red-500')
        randCell.dataset.isAlive = true.toString()
        currentAlive.push(randCell.getAttribute('data-index'))

    }
}

genInitialBoard()

function addMask (currentAlive) {
    console.log("Current alive cells", currentAlive)

    currentAlive.forEach((aliveIndex) => {
        const nextIndex = Number(aliveIndex) + 1
        console.log(`Looking for the cell with data-index ${nextIndex}`)
        const nextCell = document.querySelector(`[data-index="${nextIndex}"]`)

        if(nextCell) {
            nextCell.dataset.isAlive = true.toString()
            nextCell.classList.remove('bg-teal-500')
            nextCell.classList.add('bg-red-500')
        }

    })
}


addMask(currentAlive)

// const mask = [
//     [1,0], [],[],
//     [],[0,0],[],
//     [],[],[]
// ]
