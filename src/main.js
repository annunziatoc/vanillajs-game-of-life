import './style.css'

const app = document.querySelector('#app')


app.innerHTML = `

<div class="bg-gray-400 w-screen h-screen flex justify-center items-center px-10">
<div class="primary flex flex-wrap w-[720px]"> 

</div>
</div>

 `
const createCell = (rowIndex, cellIndex) => {
    return {
        index: rowIndex * 30 + cellIndex,
        row: rowIndex,
        cell: cellIndex,
        isAlive: false,
    }
}


const arr = Array.from({length: 30}, (_, rowIndex) =>
    Array.from({length: 30}, (_,cellIndex) => createCell(rowIndex, cellIndex)))

const primary = document.querySelector('.primary')
arr.forEach((row) => {
    row.forEach((cell) => {
        const div = document.createElement('div')
        div.className = 'h-3 w-3 border bg-green-500'
        div.dataset.index = cell.index
        div.dataset.row = cell.row
        div.dataset.cell = cell.cell
        primary.appendChild(div)
    })
})

console.log(app)

