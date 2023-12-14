import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'

const openedFile = fs.readFileSync(file, 'utf8')
const input = openedFile.split(/\r?\n/)

const patterns = []
let startIndex = 0

input.forEach((line, index) => {
    if (line === '') {
        patterns.push(input.slice(startIndex, index))
        startIndex = index + 1
    }
    if (index === input.length - 1) patterns.push(input.slice(startIndex, index + 1))
})

// console.log(patterns)

const horizontalSum = []

const reflectionFinder = (arr, sum) => {
    for (let i = 0; i < arr.length; i++) {
        let left = []
        let right = []
        for (let j = 0; j < arr[i].length - 1; j++) {
            if (arr[i][j] === arr[i][j + 1]) {
                left = arr[i].slice(0, j + 1).reverse()
                right = arr[i].slice(j + 1)
                let counter = 0
                const shorterArray = Math.min(left.length, right.length)
                for (let k = 0; k < shorterArray; k++) {
                    if (left[k] === right[k]) counter++
                }
                if (counter === shorterArray) {
                    sum.push(left.length)
                    break
                }
            }
        }
    }
}


reflectionFinder(patterns, horizontalSum)
console.log(horizontalSum, 'horizontal')

const transposedPatterns = []

for (let i = 0; i < patterns.length; i++) {
    const transposed = []
    let line = []
    let index = 0
    do {
        for (let j = 0; j < patterns[i].length; j++) {
        line.push(patterns[i][j][index])
        }
        index++
        transposed.push(line.join(''))
        line = []
    } while (index < patterns[i][0].length)
    transposedPatterns.push(transposed)
}

const verticalSum = []

reflectionFinder(transposedPatterns, verticalSum)
console.log(verticalSum, 'vertical')

const partOne = () => {
    const a = horizontalSum.reduce((a, b) => a + b) * 100
    const b = verticalSum.reduce((a, b) => a + b)

    return a + b
}

console.log(partOne(), 'part one')

const horizontalSum2 = []
const verticalSum2 = []

const reflectionFinder2 = (arr, sum) => {
    for (let i = 0; i < arr.length; i++) {
        let left = []
        let right = []
        for (let j = 0; j < arr[i].length - 1; j++) {
            left = arr[i].slice(0, j + 1).reverse()
            right = arr[i].slice(j + 1)
            left = left.slice(0, right.length)
            right = right.slice(0, left.length)
            let counter = 0
            for (let k = 0; k < left.length; k++) {
                for (let l = 0; l < left[0].length; l++) {
                    if (left[k][l] !== right[k][l]) counter++
                }
            }
            if (counter === 1) {
                sum.push(j + 1)
                break
            }
        }
    }
}

reflectionFinder2(patterns, horizontalSum2)
console.log(horizontalSum2, ' horizontal2')

reflectionFinder2(transposedPatterns, verticalSum2)
console.log(verticalSum2, 'vertical2')

const partTwo = () => {
    const a = horizontalSum2.length > 0 ? horizontalSum2.reduce((a, b) => a + b) * 100 : 0
    const b = verticalSum2.length > 0 ? verticalSum2.reduce((a, b) => a + b) : 0

    return a + b
}

console.log(partTwo(), 'part two')