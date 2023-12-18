import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'

const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)
const grid = input.map(line => line.split(' ').slice(0, 2))
const colors = input.map(line => line.split(' ').slice(2)).flat()

const dir = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1]
}

let seen1 = []
const vertices = new Set()

const traverse = (arr, seen, vertices) => {
    let r = 0
    let c = 0
    let v = 0
    for (let i = 0; i < arr.length; i++) {
        const [dr, dc] = dir[arr[i][0]]
        r += (dr * Number(arr[i][1]))
        c += (dc * Number(arr[i][1]))
        seen.push(Number(arr[i][1]))
        vertices.add([r, c])
    }
}

traverse(grid, seen1, vertices)
const vertex = [...vertices]

seen1 = seen1.reduce((a, b) => a + b)

const shoelace = (arr) => {
    let a = 0
    let b = 0
    for (let i = 0; i < arr.length; i++) {
        if (i !== arr.length - 1) {
            a += (arr[i][1] * arr[i + 1][0])
            b += (arr[i][0] * arr[i + 1][1])
        }
        if (i === arr.length - 1) {
            a += (arr[i][1] * arr[0][0])
            b += (arr[i][0] * arr[0][1])
        }
    }
    return 0.5 * Math.abs(a - b)
}

const area = shoelace(vertex)

const picks = (seen, area) => {
    const perimeter = seen
    const interior = area - (perimeter / 2) + 1
    return perimeter + interior
}

console.log(picks(seen1, area), 'part one')

const dirMap = {
    '0': 'R',
    '1': 'D',
    '2': 'L',
    '3': 'U'
}

const hexToDecimal = hex => parseInt(hex, 16)

const instructions = colors.map(v => {
    const direction = dirMap[v[7]]
    const steps = hexToDecimal(v.slice(2, 7)).toString()
    return [direction, steps]
})

let seen2 = []
const vertices2 = new Set()

traverse(instructions, seen2, vertices2)

seen2 = seen2.reduce((a, b) => a + b)

const vertex2 = [...vertices2]
const area2 = shoelace(vertex2)

console.log(picks(seen2, area2), 'part two')




