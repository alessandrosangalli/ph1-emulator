import { PH1Emulator } from './ph1-emulator'
import { TxtReader } from './txt-reader'

const fileReader = new TxtReader()
const ph1Emulator = new PH1Emulator(fileReader)
const numberToHex = (number: number): string => {
  let hex = number.toString(16).toUpperCase()
  const padding = 2

  while (hex.length < padding) {
    hex = `0${hex}`
  }

  return hex
}

async function startEmulator (): Promise<void> {
  const inputFile: string = './src/teste.txt'
  await ph1Emulator.setFile(inputFile)
  const result = ph1Emulator.execute()
  const accumulator = ph1Emulator.getAccumulator()
  const programCounter = ph1Emulator.getProgramCounter()
  console.log(`Input file: ${inputFile}`)
  console.log('')
  for (const line of result) {
    const operator = line.operator === undefined ? '' : line.operator
    const value = line.value === undefined ? '' : numberToHex(line.value)

    console.log(`${operator} ${value}`)
  }
  console.log('')
  console.log(`${result.length} instructions executed`)
  console.log('')
  console.log('Registers:')
  console.log(`AC ${numberToHex(accumulator)}`)
  console.log(`PC ${numberToHex(programCounter)}`)
  console.log('')
  let modifiedEntries = ''
  for (const address in ph1Emulator.inputData) {
    if (ph1Emulator.inputData[address].modified) {
      const hexValue = numberToHex(ph1Emulator.inputData[address].value)
      const hexAddress = numberToHex(parseInt(address))
      modifiedEntries += `${hexAddress} ${hexValue}`
    }
  }
  console.log('Memory:')
  console.log(modifiedEntries.toString())
}

startEmulator()
  .catch(err => console.log(err))
