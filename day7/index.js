import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'
const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)
const inputArr = input.map((line) => {
    return line.split(/\s+/)
})
// console.log(inputArr)

const exp = inputArr.map((line) => {
    return [...line[0].split(''), Number(line[1])]
})

// console.log(exp, 'exp')

const categorizer = (arr) => {
    let final = []
    for (let i = 0; i < arr.length; i++) {
        let cardArr = []
        let cardCount = []
        for (let j = 0; j < 5 ; j++) {
            if (!cardArr.includes(arr[i][j])) {
                cardArr.push(arr[i][j])
                cardCount.push(1)
                continue
            } 
            const index = cardArr.indexOf(arr[i][j])
            cardCount[index]++
        }
        const reduced = cardCount.reduce((a, b) => a * b)
        // console.log(reduced, 'reduced')
        if (reduced === 5) final.push([...arr[i], 7])
        if (reduced === 4 && cardArr.length === 2) final.push([...arr[i], 6])
        if (reduced === 6 && cardArr.length === 2) final.push([...arr[i], 5])
        if (reduced === 3 && cardArr.length === 3) final.push([...arr[i], 4])
        if (reduced === 4 && cardArr.length === 3) final.push([...arr[i], 3])
        if (reduced === 2) final.push([...arr[i], 2])
        if (reduced === 1) final.push([...arr[i], 1])
    }
    return final
}

const sortedArr = categorizer(exp)
const highCard = sortedArr.filter((item) => item[6] === 1)
const onePair = sortedArr.filter((item) => item[6] === 2)
const twoPair = sortedArr.filter((item) => item[6] === 3)
const threeKind = sortedArr.filter((item) => item[6] === 4)
const fullHouse = sortedArr.filter((item) => item[6] === 5)
const fourKind = sortedArr.filter((item) => item[6] === 6)
const fiveKind = sortedArr.filter((item) => item[6] === 7)

const numMap = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
}

const ranker = (arr) => {
    if (arr.length < 2) return arr
    let pivot = arr[arr.length - 1]
    let left = []
    let right = []
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < 5; j++) {
            if (numMap[arr[i][j]] > numMap[pivot[j]]) {
                right.push(arr[i])
                break
            }
            if (numMap[arr[i][j]] === numMap[pivot[j]]) {
                continue
            }
            else {
                left.push(arr[i])
                break
            }
        }
    }
    return [...ranker(left), pivot, ...ranker(right)]
}

// console.log(twoPair, 'twoPair')
// console.log(ranker(twoPair), 'twoPair sorted')
// console.log(ranker(threeKind), 'threekind sorted')

// console.log(sortedArr)

const partOne = () => {
    const highCardSorted = ranker(highCard)
    const onePairSorted = ranker(onePair)
    const twoPairSorted = ranker(twoPair)
    const threeKindSorted = ranker(threeKind)
    const fullHouseSorted = ranker(fullHouse)
    const fourKindSorted = ranker(fourKind)
    const fiveKindSorted = ranker(fiveKind)

    const fullSortedArr = [
        ...highCardSorted,
        ...onePairSorted,
        ...twoPairSorted,
        ...threeKindSorted,
        ...fullHouseSorted,
        ...fourKindSorted,
        ...fiveKindSorted
    ]

    let rank = 1
    const bidArr = []

    for (let i = 0; i < fullSortedArr.length; i++) {
        bidArr.push(fullSortedArr[i][5] * rank)
        rank++
    }

    return bidArr.reduce((a, b) => a + b)

}

console.log(partOne())