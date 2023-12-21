import fs from 'fs'

const test = false
const file = test ? './example.txt' : './input.txt'

const modDest = {}
const modState = {}
const modType = {}
const modPulse = {}
const modSent = {}
const modInputs = {}

modDest.button = 'broadcaster'

const input = fs.readFileSync(file, 'utf8').split(/\r?\n/)

input.map(line => {
    let [mod, dest] = line.split('->')
    let module = mod.trim()
    if ('%&'.includes(module[0])) {
        let type = module.slice(0, 1)
        module = module.slice(1)
        modType[module] = type
    }
    const destinations = dest.trim().split(/\s?,\s/)
    modDest[module] = destinations
    modState[module] = 'off'
    modPulse[module] = 'low'
    modSent[module] = 'low'
})

const modDestArr = []
for (const [key, value] of Object.entries(modDest)) {
    modDestArr.push([key, value])
}

for (let i = 0; i < modDestArr.length; i++) {
    const curr = modDestArr[i][0]
    const inputs = modDestArr.filter(v => v[1].includes(curr)).map(v => v[0])
    modInputs[curr] = inputs
}

const processPulse = (module, type) => {
    let pulseSent = ''
    if (modType[module] === '%' && type === 'high') {
        return ''
    }
    if (modType[module] === '%' && type === 'low') {
        if (modState[module] === 'off') {
            pulseSent = 'high'
            modState[module] = 'on'
            modSent[module] = 'high'
            return pulseSent
        } if (modState[module] === 'on') {
            pulseSent = 'low'
            modState[module] = 'off'
            modSent[module] = 'low'
            return pulseSent
        }
    }
    if (modType[module] === '&') {
        const inputs = modInputs[module]
        for (const input of inputs) {
            if (modSent[input] === 'low') {
                pulseSent = 'high'
            }
        } if (pulseSent === '') {
            pulseSent = 'low'
        }
    } 
    if (module === 'button') {
        pulseSent = 'low'
    }
    if (module === 'broadcaster') {
        pulseSent = 'low'
    }
    if (modType[module] === '' && module !== 'button' && module !== 'broadcaster') {
        pulseSent = type
    }
    return pulseSent
}

const pressButton = (numClicks) => {
    let numLow = 0
    let numHigh = 0
    let previous = ''
    for (let i = 0; i < numClicks; i++) {
        const q = [['broadcaster', 'low']]
        while (q.length > 0) {
            const [currentModule, pulseType] = q.shift()
            if (pulseType === 'low') {
                numLow++
            }
            if (pulseType === 'high') {
                numHigh++
            } 
            if (currentModule === 'output') {
                continue
            }
            const processed = processPulse(currentModule, pulseType)
            const destinations = modDest[currentModule]
            if (!Array.isArray(destinations)) {
                if (processed) {
                    q.push([destinations, processed])
                }
            } else {
                for (const dest of destinations) {
                    if (processed) {
                        q.push([dest, processed])
                    }
                }
            }
            if (processed !== '' && previous !== currentModule) {
                modSent[currentModule] = processed
            }
            previous = currentModule
        }
    }
    return [numLow, numHigh]
}

const [low, high] = pressButton(1000)

const partOne = () => {
    return low * high
}

console.log(partOne(), 'part one')

