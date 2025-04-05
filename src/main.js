import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `

<div class="bg-gray-400 w-screen h-screen flex justify-center items-center px-10">
<div class="primary flex flex-wrap w-[720px]"> 

</div>
</div>

 `
const primary = document.querySelector('.primary')

const arr = Array.from({length: 30}, (_, rowIndex) => Array.from({length: 30}, (colIndex) => {
}))

arr.forEach((row) => {
    row.forEach(() => {
        const div = document.createElement('div')
        div.className = 'h-3 w-3 border bg-green-500'
        primary.appendChild(div)
    })
})

console.log(app)

