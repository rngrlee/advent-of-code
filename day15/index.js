import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'

const input = fs.readFileSync(file, 'utf8').split(',')

const hash = (str) => {
    let sum = 0
        for (let i = 0; i < str.length; i++) {
            sum += str[i].charCodeAt(0)
            sum *= 17
            sum %= 256
        }
    return sum
}

const partOne = () => {
    return input.map((str) => {
        return hash(str)
    }).reduce((a, b) => a + b)
}

console.log(partOne(), 'part one')

const boxes = Array.from({ length: 256 }, () => [])
const focalLengths = new Map()

const lensSlotter = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes('-')) {
            let [label, ] = arr[i].split('-')
            let index = hash(label)
            boxes[index] = boxes[index].filter(lens => lens != label)
        } else {
            let [label, length] = arr[i].split('=')
            length = Number(length)
            let index = hash(label)
            if (!boxes[index].includes(label)) {
                boxes[index].push(label)
            }
            focalLengths.set(label, length)
        }
    }
}

lensSlotter(input)

const partTwo = () => {
    let total = 0

    for (const [boxNumber, box] of boxes.entries()) {
        for (const [lensSlot, label] of box.entries()) {
            total += (boxNumber + 1) * (lensSlot + 1) * focalLengths.get(label)
        }
    }
    return total
}

console.log(partTwo(), 'part two')

