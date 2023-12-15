import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'

const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)
const grid = input.map(row => row.split(''))

// console.log(grid)

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 'O') {
            for (let i = y - 1; i >= 0; i--) {
                if (grid[i][x] === '#' || grid[i][x] === 'O') {
                    grid[y][x] = '.'
                    grid[i + 1][x] = 'O'
                    break
                }
                if (i === 0) {
                    grid[y][x] = '.'
                    grid[i][x] = 'O'
                    break
                }
            }
        }
    }
}

// console.log(grid)

let sum = 0

for (let y = grid.length - 1; y >= 0; y--) {
    for (let x = 0 ; x < grid[y].length; x++) {
        if (grid[y][x] === 'O') {
            sum += grid.length - y
        }
    }
}

console.log(sum, 'part one')
