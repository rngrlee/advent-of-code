import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'
const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)
const inputArr = input.map((line) => {
    return line.split(/\s+/)
})

// console.log(inputArr)

const partOne = (arr) => {
    const margins = []
    for (let i = 1; i < arr[0].length; i++) {
        let counter = 0
        for (let j = 1; j < arr[0][i]; j++) {
            if (j * (arr[0][i] - j) > arr[1][i]) {
                counter++
            }
        }
        margins.push(counter)
    }
    return margins.reduce((a, b) => a * b)
}

console.log(partOne(inputArr), 'part one')

const newInput = inputArr.map((line) => {
    return line.join('').split(':')
})

// console.log(newInput)

const partTwo = () => {
    return partOne(newInput)
}

console.log(partTwo(), 'part two')