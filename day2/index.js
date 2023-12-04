import fs from 'fs'

const allCubes = {
    red: 12,
    green: 13,
    blue: 14
}

function partOne(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().split(/\r?\n/)
    const values = lines
    .map((line) => {
        const numIndex = line.match(/\s/).index + 1
        const num = line.substring(numIndex).match(/\d+/)[0]
        const startIndex = line.match(/:/).index + 2
        const shortLine = line.substring(startIndex)
        const shortArr = shortLine.split(/[\s,;]+/)
        const numbersArr = shortArr.filter((item) => !Number.isNaN(Number(item)))
        const colorsArr = shortArr.filter((item) => item.match(/red|green|blue/))
        let state = true
        for (let i = 0; i < colorsArr.length; i++) {
            if (allCubes[colorsArr[i]] >= numbersArr[i]) {
                continue
            } else {
                state = false
                break
            }
        }
        if (state) {
            return Number(num)
        } else {
            return 0
        } 
    })

    console.log(values)
    return values.reduce((a, b) => a + b)
}

// console.log(partOne('./input.txt'))

function splitter() {
    const lines = fs.readFileSync('./input.txt', 'utf-8').trim().split(/\r?\n/)
    const array = []
    const values = lines.map((line) => {
        const startIndex = line.match(/:/).index + 2
        const shortLine = line.substring(startIndex)
        array.push(shortLine)
    })
    return array
}


function matcher() {
    const redValues = splitter().map((line) => {
        const matched = line.match(/\d+\sred/g).join(' ').match(/\d+/g)
        const numArr = matched.map((arr) => Number(arr))
        return numArr
    })
    const redMax = redValues.map((arr) => Math.max(...arr))

    const greenValues = splitter().map((line) => {
        const matched = line.match(/\d+\sgreen/g).join(' ').match(/\d+/g)
        const numArr = matched.map((arr) => Number(arr))
        return numArr
    })
    const greenMax = greenValues.map((arr) => Math.max(...arr))

    const blueValues = splitter().map((line) => {
        const matched = line.match(/\d+\sblue/g).join(' ').match(/\d+/g)
        const numArr = matched.map((arr) => Number(arr))
        return numArr
    })
    const blueMax = blueValues.map((arr) => Math.max(...arr))

    let powers = 0

    for (let i = 0; i < redMax.length; i++) {
        powers += (redMax[i] * greenMax[i] * blueMax[i])
    }
    console.log(powers)
    return powers
}

matcher()