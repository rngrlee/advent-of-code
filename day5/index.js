import fs from 'fs'
const test = false
const file = test ? './example.txt' : './input.txt'
const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)

// output range start, input range start, length of range

const seeds = input[0].slice(7).trim().split(/\s+/).map(Number) // array of seed nums
const seedToSoilMap = []
const soilToFertMap = []
const fertToWaterMap = []
const waterToLightMap = []
const lightToTempMap = []
const tempToHumMap = []
const humToLocMap = []

let startIndex = 0
let endIndex = 0

input.forEach((line, index) => {
    if (line === 'seed-to-soil map:') {
        startIndex = index + 1
    }
    if (line === 'soil-to-fertilizer map:') {
        endIndex = index - 1
        seedToSoilMap.push(...input.slice(startIndex, endIndex))
        startIndex = index + 1
    }
    if (line === 'fertilizer-to-water map:') {
        endIndex = index - 1
        soilToFertMap.push(...input.slice(startIndex, endIndex))
        startIndex = index + 1
    }
    if (line === 'water-to-light map:') {
        endIndex = index - 1
        fertToWaterMap.push(...input.slice(startIndex, endIndex))
        startIndex = index + 1
    }
    if (line === 'light-to-temperature map:') {
        endIndex = index - 1
        waterToLightMap.push(...input.slice(startIndex, endIndex))
        startIndex = index + 1
    }
    if (line === 'temperature-to-humidity map:') {
        endIndex = index - 1
        lightToTempMap.push(...input.slice(startIndex, endIndex))
        startIndex = index + 1
    }
    if (line === 'humidity-to-location map:') {
        endIndex = index - 1
        tempToHumMap.push(...input.slice(startIndex, endIndex))
        startIndex = index + 1
        endIndex = input.length
        humToLocMap.push(...input.slice(startIndex, endIndex))
    }
})

const converter = (arr, seeds) => {
    const parameters = [] // input start, input end, difference to output, eg. [98, 99, -48]
    arr.forEach((line) => {
        const [output, input, length] = line.split(/\s+/).map(Number)
        parameters.push([input, input + length - 1, output - input])
    })

    // console.log(parameters, 'parameters')
    const correspondingArr = []
    for (let i = 0; i < seeds.length; i++) {
        let added = false
        for (let j = 0; j < parameters.length; j++) {
            if (seeds[i] >= parameters[j][0] && seeds[i] <= parameters[j][1]) {
                correspondingArr.push(seeds[i] + parameters[j][2])
                added = true
            }
        }
        if (added) {
            continue
        } else {
            correspondingArr.push(seeds[i])
            added = false
        }
    }
    return correspondingArr
}


const partOne = () => {
    const seedToSoilResult = converter(seedToSoilMap, seeds)
    const soilToFertResult = converter(soilToFertMap, seedToSoilResult)
    const fertToWaterResult = converter(fertToWaterMap, soilToFertResult)
    const waterToLightResult = converter(waterToLightMap, fertToWaterResult)
    const lightToTempResult = converter(lightToTempMap, waterToLightResult)
    const tempToHumResult = converter(tempToHumMap, lightToTempResult)
    const humToLocResult = converter(humToLocMap, tempToHumResult)

    return Math.min(...humToLocResult)
}

console.log(partOne(), 'part one')
