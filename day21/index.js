import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'

const input = fs.readFileSync(file, 'utf8').split(/\r?\n/).map(line => line.split(''))

const startPos = () => {
    for (const [r, row] of input.entries()) {
        for (const [c, col] of row.entries()) {
            if (col === 'S') return [r, c]
        }
    }
}

const [sr, sc] = startPos()

const ans = new Set()
const seen = new Set(`${sr}-${sc}`)
const q = [[sr, sc, 64]]

while (q.length > 0) {
    const [r, c, s] = q.shift()

    if (s % 2 === 0) {
        ans.add(`${r}-${c}`)
    }
    if (s === 0) {
        continue
    }

    for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
        if (nr < 0 || nr >= input.length || nc < 0 || nc >= input[0].length || input[nr][nc] === '#' || seen.has(`${nr}-${nc}`)) {
            continue
        }
        seen.add(`${nr}-${nc}`)
        q.push([nr, nc, s - 1])
    }
}

console.log(ans.size, 'part one')

