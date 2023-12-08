import fs from 'fs'

const test = false
const firstFile = false
const file = test ? (firstFile ? './example1.txt': './example2.txt') : './input.txt'
const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)

const directions = input[0].replaceAll('L', '1').replaceAll('R', '2')
const map = input.slice(2).map((line) => {
    return line.slice(0, line.length - 1).split(/,?\s+=?\s?\(?,?/)
})

// console.log(directions)
// console.log(map)

const partOne = (directions, map) => {
    let solved = false
    let start = 'AAA'
    let numSteps = 0
    do {
        for (let i = 0; i < directions.length; i++) {
            for (let j = 0; j < map.length; j++) {
                if (start === map[j][0]) {
                    start = map[j][directions[i]]
                    numSteps++
                    break
                }
                if (start === 'ZZZ') {
                    solved = true
                    break
                }
            }
        }
    } while (!solved)
    return numSteps
}

// console.log(partOne(directions, map), 'partOne')

const counter = (str) => {
    let counter = []
    for (let i = 0; i < map.length; i++) {
        if (map[i][0].slice(2) === str) {
            counter.push(map[i][0])
        }
    }
    return counter
}
const startingArr = counter('A')
console.log(startingArr, 'A counter')

const partTwoHelper = (directions, map, string) => {
    let solved = false
    let start = string
    let numSteps = 0
    do {
        for (let i = 0; i < directions.length; i++) {
            for (let j = 0; j < map.length; j++) {
                if (start === map[j][0]) {
                    start = map[j][directions[i]]
                    numSteps++
                    break
                }
                if (start.slice(2) === 'Z') {
                    solved = true
                    break
                }
            }
        }
    } while (!solved)
    return numSteps
}

const stepsTaken1 = partTwoHelper(directions, map, startingArr[0])
const stepsTaken2 = partTwoHelper(directions, map, startingArr[2])
const stepsTaken3 = partTwoHelper(directions, map, startingArr[1])
const stepsTaken4 = partTwoHelper(directions, map, startingArr[3])
const stepsTaken5 = partTwoHelper(directions, map, startingArr[4])
const stepsTaken6 = partTwoHelper(directions, map, startingArr[5])

const stepsTakenArr = [stepsTaken1, stepsTaken2, stepsTaken3, stepsTaken4, stepsTaken5, stepsTaken6]

console.log(stepsTaken1)
console.log(stepsTaken2)
console.log(stepsTaken3)
console.log(stepsTaken4)
console.log(stepsTaken5)
console.log(stepsTaken6)

const calculateLCM = (...arr) => {
    const gcd2 = (a, b) => {
       // Greatest common divisor of 2 integers
       if(!b) return b===0 ? a : NaN;
          return gcd2(b, a%b);
    };
    const lcm2 = (a, b) => {
       // Least common multiple of 2 integers
       return a * b / gcd2(a, b);
    }
    // Least common multiple of a list of integers
    let n = 1;
    for(let i = 0; i < arr.length; ++i){
       n = lcm2(arr[i], n);
    }
    return n;
 };

 console.log(calculateLCM(...stepsTakenArr), 'part two steps taken');