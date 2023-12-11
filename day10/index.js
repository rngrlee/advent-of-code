import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'
const readFile = fs.readFileSync(file, 'utf8').split(/\r?\n/)
const input = readFile.map(line => line.split(''))

// console.log(input)

const findAnimal = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 'S') return [i, j]
        }
    }
}

const startingPoint = findAnimal(input)
console.log(startingPoint)

const possibleDirections = (arr) => {
    const startY = startingPoint[0]
    const startX = startingPoint[1]
    const directions = [false, false, false, false] // UDLR
    if ('|7F'.includes(arr[startY - 1][startX])) directions[0] = true
    if ('|LJ'.includes(arr[startY + 1][startX])) directions[1] = true
    if ('-LF'.includes(arr[startY][startX - 1])) directions[2] = true
    if ('-J7'.includes(arr[startY][startX + 1])) directions[3] = true

    return directions
}

// console.log(possibleDirections(input), 'directions')

const partOne = (arr) => {
    let found = false
    let steps = 0
    let yPos = 57
    let xPos = 65
    let previous = ''
    let current = 'S'
    let next = 0
    let direction = 'U'
    do {
        if (current === 'S') {
            if (direction === 'R') {
                xPos++
                next = arr[yPos][xPos]
            }
            if (direction === 'L') {
                xPos--
                next = arr[yPos][xPos]
            }
            if (direction === 'U') {
                yPos--
                next = arr[yPos][xPos]
            }
            if (direction === 'D') {
                yPos++
                next = arr[yPos][xPos]
            }
        }
        if (current === '-') {
            if (direction === 'R') {
                xPos++
                next = arr[yPos][xPos]
            }
            if (direction === 'L') {
                xPos--
                next = arr[yPos][xPos]
            }
        }
        if (current === '|') {
            if (direction === 'U') {
                yPos--
                next = arr[yPos][xPos]
            }
            if (direction === 'D') {
                yPos++
                next = arr[yPos][xPos]
            }
        }
        if (current === 'L') {
            if (direction === 'L') {
                yPos--
                direction = 'U'
                next = arr[yPos][xPos]
            }
            if (direction === 'D') {
                xPos++
                direction = 'R'
                next = arr[yPos][xPos]
            }
        }
        if (current === 'F') {
            if (direction === 'L') {
                yPos++
                direction = 'D'
                next = arr[yPos][xPos]
            }
            if (direction === 'U') {
                xPos++
                direction = 'R'
                next = arr[yPos][xPos]
            }
        }
        if (current === 'J') {
            if (direction === 'R') {
                yPos--
                direction = 'U'
                next = arr[yPos][xPos]
            }
            if (direction === 'D') {
                xPos--
                direction = 'L'
                next = arr[yPos][xPos]
            }
        }
        if (current === '7') {
            if (direction === 'R') {
                yPos++
                direction = 'D'
                next = arr[yPos][xPos]
            }
            if (direction === 'U') {
                xPos--
                direction = 'L'
                next = arr[yPos][xPos]
            }
        }
        if (current === 'S' && previous === 'L' && direction === 'U') {
            steps++
            found = true
            break
        }
        steps++
        previous = current
        current = next
    } while (!found)
    return Math.floor(steps / 2)
}

// console.log(partOne(input))

const isInLoop = (arr) => {
    let found = false
    let steps = 0
    let yPos = 57
    let xPos = 65
    let previous = ''
    let current = 'S'
    let next = 0
    let direction = 'U'
    let loopPositions = [[57, 65]]
    do {
        if (current === 'S') {
            if (direction === 'R') {
                xPos++
                next = arr[yPos][xPos]
            }
            if (direction === 'L') {
                xPos--
                next = arr[yPos][xPos]
            }
            if (direction === 'U') {
                yPos--
                next = arr[yPos][xPos]
            }
            if (direction === 'D') {
                yPos++
                next = arr[yPos][xPos]
            }
        }
        if (current === '-') {
            if (direction === 'R') {
                xPos++
                next = arr[yPos][xPos]
            }
            if (direction === 'L') {
                xPos--
                next = arr[yPos][xPos]
            }
        }
        if (current === '|') {
            if (direction === 'U') {
                yPos--
                next = arr[yPos][xPos]
            }
            if (direction === 'D') {
                yPos++
                next = arr[yPos][xPos]
            }
        }
        if (current === 'L') {
            if (direction === 'L') {
                yPos--
                direction = 'U'
                next = arr[yPos][xPos]
            }
            if (direction === 'D') {
                xPos++
                direction = 'R'
                next = arr[yPos][xPos]
            }
        }
        if (current === 'F') {
            if (direction === 'L') {
                yPos++
                direction = 'D'
                next = arr[yPos][xPos]
            }
            if (direction === 'U') {
                xPos++
                direction = 'R'
                next = arr[yPos][xPos]
            }
        }
        if (current === 'J') {
            if (direction === 'R') {
                yPos--
                direction = 'U'
                next = arr[yPos][xPos]
            }
            if (direction === 'D') {
                xPos--
                direction = 'L'
                next = arr[yPos][xPos]
            }
        }
        if (current === '7') {
            if (direction === 'R') {
                yPos++
                direction = 'D'
                next = arr[yPos][xPos]
            }
            if (direction === 'U') {
                xPos--
                direction = 'L'
                next = arr[yPos][xPos]
            }
        }
        if (current === 'S' && previous === 'L' && direction === 'U') {
            steps++
            found = true
            break
        }
        steps++
        loopPositions.push([yPos, xPos])
        previous = current
        current = next
    } while (!found)
    return loopPositions
}

const loopPos = isInLoop(input)
console.log(loopPos)