import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'
const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)

const up = 0
const left = 0
const down = input.length - 1
const right = input[0].length - 1

const slash = { u: 'r', d: 'l', l: 'd', r: 'u' }
const backslash = { u: 'l', d: 'r', l: 'u', r: 'd' }
const dash = { u: ['l', 'r'], d: ['l', 'r'], l: ['l'], r: ['r'] }
const pipe = { u: ['u'], d: ['d'], l: ['u', 'd'], r: ['u', 'd'] }

let part1 = 0
let part2 = 0

const traverseBeam = (dir, pos) => {

    const seen = new Set()
    let arr = []
    const traverse = (dir, pos) => {

        if (dir === 'u') pos[0]--
        if (dir === 'd') pos[0]++
        if (dir === 'l') pos[1]--
        if (dir === 'r') pos[1]++

        if (pos[0] < up || pos[0] > down || pos[1] < left || pos[1] > right) return

        seen.add(pos.toString());

        if (arr.includes(pos.toString() + '_' + dir)) return
        arr.push(pos.toString() + '_' + dir)

        let char = input[pos[0]][pos[1]]
        if (char == '.') traverse(dir, [...pos])
        if (char == '\\') traverse(backslash[dir], [...pos])
        if (char == '/') traverse(slash[dir], [...pos])
        if (char == '-') for (let x of dash[dir]) traverse(x, [...pos])
        if (char == '|') for (let x of pipe[dir]) traverse(x, [...pos])

        return
    }

    traverse(dir, pos)

    part1 = part1 || seen.size
    part2 = Math.max(part2, seen.size)

    return
}

traverseBeam('r', [0, -1])

for (let i = 0; i < down; i++) {
    console.clear()
    console.log('trying LR ' + (i + 1) + '/' + (down + 1))
    traverseBeam('r', [i, -1])
    traverseBeam('l', [i, right + 1])
}
for (let i = 0; i < right; i++) {
    console.clear()
    console.log('trying UD ' + (i + 1) + '/' + (right + 1))
    traverseBeam('d', [-1, i])
    traverseBeam('u', [down + 1, i])
}
console.clear()

console.log(part1, 'part 1')
console.log(part2, 'part 2')