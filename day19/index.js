import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'

const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)

const workflow = input
    .slice(0, input.findIndex(v => v === ''))
    .map(line => {
        const name = line.match(/^\w+/)[0]
        const steps = line.match(/\{[0-9a-zA-Z><:,]+/)[0].slice(1).split(',')
        return [name, ...steps]
    })

const parts = input
    .slice(input.findIndex(v => v === '') + 1)
    .map(line => line.slice(1, line.length - 1).split(','))
    .map(line => line.join('').split(/\w=/).slice(1))

const start = workflow.findIndex(v => v[0] === 'in')

const partsSorter = () => {
    const stateArr = []
    for (let i = 0; i < parts.length; i++) {
        let j = 1
        let state = ''
        let cwf = start
        do {
            if (workflow[cwf][j].includes(':')) {
                const letter = workflow[cwf][j].match(/\w/)[0]
                const sign = workflow[cwf][j].match(/[><]/)[0]
                const limit = Number(workflow[cwf][j].match(/\d+/)[0])
                const outcome = workflow[cwf][j].match(/:\w+/)[0].slice(1)
                let num = 0
                if (letter === 'x') num = Number(parts[i][0])
                if (letter === 'm') num = Number(parts[i][1])
                if (letter === 'a') num = Number(parts[i][2])
                if (letter === 's') num = Number(parts[i][3])
                if (sign === '>' && outcome.length > 1) {
                    if (num > limit) {
                        cwf = workflow.findIndex(v => v[0] === outcome)
                        j = 1
                    }
                    if (num <= limit) j++
                }
                if (sign === '<' && outcome.length > 1) {
                    if (num < limit) {
                        cwf = workflow.findIndex(v => v[0] === outcome)
                        j = 1
                    } 
                    if (num >= limit) j++
                }
                if (sign === '>' && outcome.length === 1) {
                    if (num > limit) {
                        state = outcome
                        break
                    } j++
                }
                if (sign === '<' && outcome.length === 1) {
                    if (num < limit) {
                        state = outcome
                        break
                    } j++
                }
            }
            if (workflow[cwf][j].length <= 3) {
                const dest = workflow[cwf][j].match(/\w+/)[0]
                if (dest.length === 1) {
                    if (dest === 'A') {
                        state = 'A'
                        break
                    } else {
                        state = 'R'
                        break
                    }
                }
                if (dest.length >= 2) {
                    cwf = workflow.findIndex(v => v[0] === dest)
                    j = 1
                }
            }
        } while (state === '')
        stateArr.push(state)
    }
    return stateArr
}

const states = partsSorter()

const partOne = () => {
    const sums = []
    for (let i = 0; i < parts.length; i++) {
        if (states[i] === 'A') sums.push(parts[i].map(Number).reduce((a, b) => a + b))
    }
    return sums.reduce((a, b) => a + b)
}

console.log(partOne(), 'part one')