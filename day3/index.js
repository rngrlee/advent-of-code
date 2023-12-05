import fs from 'fs'
const test = false
const file = test ? './example1.txt' : './input.txt'
const input = fs.readFileSync(file, 'utf8')
const inputArr = input.split(/\r?\n/)

// console.log(inputArr)

const getNumLength = (str, index) => {
    if (isNaN(str[index + 1])) return 1
    return 1 + getNumLength(str, index + 1)
}

const adjacentToSymbol = (arr, y, x, length) => {
    const digitsAndPeriod = '0123456789.'
    for (let i = y - 1; i < y + 2; i++) {
        for (let j = x - 1; j < x + length + 1; j++) {
            if (!digitsAndPeriod.includes(arr[i]?.[j] ?? '.')) return true
        }
    }
    return false
}

const partOne = (arr) => {
    let sum = 0
    const digits = '0123456789'
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            if (digits.includes(arr[y][x])) {
                const length = getNumLength(arr[y], x)
                if (adjacentToSymbol(arr, y, x, length)) {
                    sum += +arr[y].slice(x, x + length)
                }
                x += length - 1
            }
        }
    }
    return sum
}

// console.log(partOne(inputArr))

const getStartEndIndex = (str, index) => {
    const digits = '0123456789'
    let startIndex = index
    let endIndex = index
    while(digits.includes(str[startIndex - 1])) {
        startIndex--
    }
    while(digits.includes(str[endIndex + 1])) {
        endIndex++
    }
    return {startIndex, endIndex}
}

const getGearRatio = (arr, y, x) => {
    const digits = '0123456789'
    const partNumbers = []
    for (let i = y - 1; i < y + 2; i++) {
        for (let j = x - 1; j < x + 2; j++) {
            if (digits.includes(arr[i]?.[j] ?? '.')) {
                if (partNumbers.length === 2) return 0
                const {startIndex, endIndex} = getStartEndIndex(arr[i], j)
                const newNumber = +arr[i].slice(startIndex, endIndex + 1)
                partNumbers.push(newNumber)
                j = endIndex
            }
        }
    }
    if (partNumbers.length < 2) return 0
    return partNumbers[0] * partNumbers[1]
}

const partTwo = (arr) => {
    let sum = 0;
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            if (arr[y][x] === '*') {
                sum += getGearRatio(arr, y, x)
            }
        }
    }
    return sum
}

console.log(partTwo(inputArr))