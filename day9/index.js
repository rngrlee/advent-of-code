import fs from 'fs'

const test = true
const file = test ? './example1.txt' : './input.txt'

const readFile = fs.readFileSync(file, 'utf8').split(/\r?\n/)
const input = readFile.map((line) => {
    return line.split(/\s+/).map(Number)
})
const input2 = readFile.map((line) => {
    return line.split(/\s+/).map(Number)
}).map(line => line.reverse())

const allZero = (item) => item === 0

const partOne = (arr) => {
    const newNums = []
    for (let i = 0; i < arr.length; i++) {
        let notAllZero = true
        let currArr = arr[i]
        let lastArr = [arr[i][arr[i].length - 1]]
        do {
            let diffArr = []
            for (let j = 0; j < currArr.length - 1; j++) {
                diffArr.push(currArr[j + 1] - currArr[j])
            }
            currArr = diffArr
            lastArr.push(diffArr[diffArr.length - 1])
            if (diffArr.every(allZero)) {
                newNums.push(lastArr.reduce((a, b) => a + b))
                notAllZero = false
            }
        } while (notAllZero)
    }
    return newNums.reduce((a, b) => a + b)
}

console.log(partOne(input), 'part one')
console.log(partOne(input2), 'part two')