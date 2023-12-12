import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'

const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)

// console.log(input)

const isEmptyCol = new Array(input[0].length).fill(true)
const isEmptyRow = new Array(input.length).fill(true)

const galaxies = []

const expansionFactor = 999999 // 1 for part 1, 999999 for part 2

input.forEach((row, y) => {
    row.split('').forEach((item, x) => {
        if (item === '#') {
            galaxies.push({ x, y })
            isEmptyCol[x] = false
            isEmptyRow[y] = false
        }
    })
})

const colsToAdd = []
const rowsToAdd = []

isEmptyCol.forEach((val, col) => { if (val) colsToAdd.push(col) })
isEmptyRow.forEach((val, row) => { if (val) rowsToAdd.push(row) })

galaxies.forEach((galaxy) => {
    let expansionX = colsToAdd.filter(v => v < galaxy.x).length
    let expansionY = rowsToAdd.filter(v => v < galaxy.y).length
    galaxy.x += (expansionX * expansionFactor)
    galaxy.y += (expansionY * expansionFactor)
})

const sumOfDistances = (galaxies) => {
    let sum = 0
    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            let distance = Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y)
            sum += distance
        }
    }
    return sum
}

console.log(sumOfDistances(galaxies), 'part two')