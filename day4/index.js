import fs from 'fs'
const test = false
const file = test ? './example1.txt' : './input.txt'
const input = fs.readFileSync(file, 'utf8')
const inputArr = input.split(/\r?\n/)

let winningNums = []
let ourNums = []

// console.log(inputArr)

const splitArr = inputArr.map((line) => {
    const index = line.match(/:/).index + 2
    const shortStr = line.substring(index).trim()
    const dividedArr = shortStr.split('|')
    return dividedArr
    })

// console.log(splitArr)

splitArr.forEach((line) => {
    winningNums.push(line[0].trim())
    ourNums.push(line[1].trim())
})


// console.log(winningNums, ourNums)

const winArr = winningNums.map((line) => {
    return line.split(/\s+/)
})

const ourArr = ourNums.map((line) => {
    return line.split(/\s+/)
})
// console.log(winArr, ourArr)

const partOne = () => {
    let sum = 0
    for (let i = 0; i < ourArr.length; i++){
        let power = -1
        for (let j = 0; j < ourArr[i].length; j++) {
            if (winArr[i].includes(ourArr[i][j])) power++
        }
        if (power > -1) sum += 2 ** power
    }
    return sum
}

// console.log(partOne())

let partTwo = 0

const cardCount = new Array(inputArr.length).fill(1)

// console.log(cardCount)

inputArr.forEach((line, index) => {
    const [, winning, ours] = line.split(/[:|]/g)
    const winningNumbers = winning.trim().split(/\s+/).map(Number)
    const ourNumbers = ours.trim().split(/\s+/).map(Number)
    const numOfMatches = ourNumbers.filter((num) => winningNumbers.includes(num)).length

    if (numOfMatches) {
        for (let i = index + 1; i <= index + numOfMatches; i++) {
            cardCount[i] += cardCount[index]
        }
    }
})

partTwo = cardCount.reduce((a, b) => a + b)

console.log(partTwo)