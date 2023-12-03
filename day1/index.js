import fs from 'fs';

function partOne(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().split(/\r?\n/)
    console.log(lines)
    const values = lines
    .map((line) => {
        let first = line.split('').find(value => !Number.isNaN(Number(value)))
        let last = line.split('').findLast(value => !Number.isNaN(Number(value)))
        return Number(first + last)
    })

    return values.reduce((a, b) => a + b)
}

// console.log(partOne('./input.txt'))

const firstNumRegExp = new RegExp(
    ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    .join('|')
    )

const lastNumRegExp = new RegExp(
    ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    .join('|').split('').reverse().join('')
    )

const numberMap = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

const reverseNumberMap = {
    eno: '1',
    owt: '2',
    eerht: '3',
    ruof: '4',
    evif: '5',
    xis: '6',
    neves: '7',
    thgie: '8',
    enin: '9'
}

function partTwo(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().split(/\r?\n/)
    const values = lines
    .map((line) => {
        let firstNumIndex = line
            .split('')
            .findIndex(value => !Number.isNaN(Number(value)))
        let firstWordMatch = line.match(firstNumRegExp)
        let firstWordIndex = firstWordMatch?.index
        let firstIndex = firstNumIndex < firstWordIndex
            ? (firstNumIndex > -1 ? firstNumIndex : firstWordIndex)
            : (firstWordIndex > - 1? firstWordIndex: firstNumIndex)
        let lastNumIndex = line
            .split('')
            .reverse()
            .findIndex(value => !Number.isNaN(Number(value)))
        let lastWordMatch = line.split('').reverse().join('').match(lastNumRegExp)
        let lastWordIndex = lastWordMatch?.index
        let lastIndex = lastNumIndex < lastWordIndex
            ? (lastNumIndex > -1 ? lastNumIndex : lastWordIndex)
            : (lastWordIndex > - 1? lastWordIndex: lastNumIndex)
        let first = !Number.isNaN(Number(line[firstIndex]))
            ? line[firstIndex]
            : numberMap[firstWordMatch[0]]
        let last = !Number.isNaN(Number(line.split('').reverse()[lastIndex]))
            ? line.split('').reverse()[lastIndex]
            : reverseNumberMap[lastWordMatch[0]]
        return Number(first + last)
    })
    return values.reduce((a, b) => a + b)
}

console.log(partTwo('./input.txt'))