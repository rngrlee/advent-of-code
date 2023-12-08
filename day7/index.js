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

// console.log(partOne())

const categorizer2 = (arr) => {
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
        if (cardArr.includes('J') && cardArr.length > 1) {
            const jIndex = cardArr.indexOf('J')
            const newCardCount = cardCount.toSpliced(jIndex, 1, 0)
            const maxIndex = newCardCount.indexOf(Math.max(...newCardCount))
            cardCount[maxIndex] += cardCount[jIndex]
            cardCount.splice(jIndex, 1)
            cardArr.splice(jIndex, 1)
        }
        // console.log(cardArr, 'cardArr')
        // console.log(cardCount, 'cardCount')
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

const sortedArr2 = categorizer2(exp)

console.log(sortedArr2, 'sortedArr2')
const highCard2 = sortedArr2.filter((item) => item[6] === 1)
const onePair2 = sortedArr2.filter((item) => item[6] === 2)
const twoPair2 = sortedArr2.filter((item) => item[6] === 3)
const threeKind2 = sortedArr2.filter((item) => item[6] === 4)
const fullHouse2 = sortedArr2.filter((item) => item[6] === 5)
const fourKind2 = sortedArr2.filter((item) => item[6] === 6)
const fiveKind2 = sortedArr2.filter((item) => item[6] === 7)

const numMap2 = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 1,
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

const ranker2 = (arr) => {
    if (arr.length < 2) return arr
    let pivot = arr[arr.length - 1]
    let left = []
    let right = []
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < 5; j++) {
            if (numMap2[arr[i][j]] > numMap2[pivot[j]]) {
                right.push(arr[i])
                break
            }
            if (numMap2[arr[i][j]] === numMap2[pivot[j]]) {
                continue
            }
            else {
                left.push(arr[i])
                break
            }
        }
    }
    return [...ranker2(left), pivot, ...ranker2(right)]
}

const partTwo = () => {
    const highCardSorted2 = ranker2(highCard2)
    const onePairSorted2 = ranker2(onePair2)
    const twoPairSorted2 = ranker2(twoPair2)
    const threeKindSorted2 = ranker2(threeKind2)
    const fullHouseSorted2 = ranker2(fullHouse2)
    const fourKindSorted2 = ranker2(fourKind2)
    const fiveKindSorted2 = ranker2(fiveKind2)

    const fullSortedArr = [
        ...highCardSorted2,
        ...onePairSorted2,
        ...twoPairSorted2,
        ...threeKindSorted2,
        ...fullHouseSorted2,
        ...fourKindSorted2,
        ...fiveKindSorted2
    ]

    let rank = 1
    const bidArr = []

    for (let i = 0; i < fullSortedArr.length; i++) {
        bidArr.push(fullSortedArr[i][5] * rank)
        rank++
    }

    return bidArr.reduce((a, b) => a + b)

}

console.log(partTwo(), 'part two')