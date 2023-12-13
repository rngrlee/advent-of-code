import fs from 'fs'

const test = true
const file = test ? './example.txt' : './input.txt'

const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)

const springs = []
const nums = []

input.forEach((line) => {
    springs.push(line.split(/\s+/)[0].split(''))
    nums.push(line.split(/\s+/)[1].split(','))
})

// console.log(springs, 'springs')
// console.log(nums, 'nums')

const counter = (spring) => {
    let counter = 0
    let broken = []
    for (let i = 0; i < spring.length; i++) {
        if (spring[i] === '#') {
            counter++
        }
        if (spring[i] === '.' ) {
            if (counter > 0) broken.push(counter)
            counter = 0
        }
    }
    if (counter > 0) broken.push(counter)
    return broken
}

const checkEqualArrs = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false
    }
    for (let i = 0; i < arr1.length; i++) {
        if (Number(arr1[i]) !== Number(arr2[i])) {
            return false
        }
    }
    return true
}

let sum = 0

const makeCombos = (arr, index, n) => {
    if (index === arr.length) {
        if (checkEqualArrs(counter(arr), nums[n])) {
            sum++
        }
        return
    }
    if (arr[index] === '?') {
        arr[index] = '.'
        makeCombos([...arr], index + 1, n)
        arr[index] = '#'
        makeCombos([...arr], index + 1, n)
        arr[index] = '?'
    } else {
        makeCombos(arr, index + 1, n)
    }
}

// springs.forEach((spring, i) => {
//     makeCombos(spring, 0, i)
// })

const springs2 = []
const nums2 = []

input.forEach((line) => {
    springs2.push((line.split(/\s+/)[0] + '?').repeat(5).split(''))
    nums2.push((line.split(/\s+/)[1] + ',').repeat(5).split(',').slice(0, -1))
})

console.log(springs2, 'springs2')
console.log(nums2, 'nums2')

springs2.forEach((spring, i) => {
    makeCombos(spring, 0, i)
})

console.log(sum)