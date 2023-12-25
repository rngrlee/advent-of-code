import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'

const input = fs.readFileSync(file, 'utf8').split(/\r?\n/).map(line => line.replace(' @ ', ', ').split(/,\s+/))

const numInput = input.map((line) => {
    return line.map(num => Number(num))
})

const std = numInput.map(line => {
    const a = line[4]
    const b = -line[3]
    const c = line[4] * line[0] - line[3] * line[1]
    return [a, b, c]
})

const bot = test ? 7 : 200000000000000
const top = test ? 27 : 400000000000000

let total = 0

for (let i = 0; i < std.length; i++) {
    for (let j = i + 1; j < std.length; j++) {
        const [a1, b1, c1] = std[i]
        const [a2, b2, c2] = std[j]
        if (a1 * b2 === a2 * b1) {
            continue
        }
        const x = (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1)
        const y = (c2 * a1 - c1 * a2) / (a1 * b2 - a2 * b1)
        if (x >= bot && x <= top && y >= bot && y <= top) {
            if ((x - numInput[i][0]) * (numInput[i][3]) >= 0 && (y - numInput[i][1]) * (numInput[i][4]) >= 0 
            && (x - numInput[j][0]) * (numInput[j][3]) >= 0 && (y - numInput[j][1]) * (numInput[j][4]) >= 0) {
                total++
            }
        }
    }
}

console.log(total, 'part one')