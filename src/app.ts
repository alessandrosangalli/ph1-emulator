import { PH1Emulator } from './ph1-emulator'
import { TxtReader } from './txt-reader'
import readline from 'readline'

const fileReader = new TxtReader()
const ph1Emulator = new PH1Emulator(fileReader)

async function startEmulator (inputFile: string): Promise<void> {
  await ph1Emulator.setFile(inputFile)
  const result = ph1Emulator.execute()
  const accumulator = ph1Emulator.getAccumulator()
  const programCounter = ph1Emulator.getProgramCounter()
  console.log(`Input file: ${inputFile}`)
  console.log('')
  for (const line of result) {
    const operator = line.operator === undefined ? '' : line.operator
    const value = line.value === undefined ? '' : ph1Emulator.numberToHex(line.value)
    const comment = line.comment === undefined ? '' : line.comment

    console.log(`${operator} ${value} ${comment}`)
  }
  console.log('')
  console.log(`${result.length} instructions executed`)
  console.log('')
  console.log('Registers:')
  console.log(`AC ${ph1Emulator.numberToHex(accumulator)}`)
  console.log(`PC ${ph1Emulator.numberToHex(programCounter)}`)
  console.log('')
  let modifiedEntries = ''
  for (const address in ph1Emulator.inputData) {
    if (ph1Emulator.inputData[address].modified) {
      const hexValue = ph1Emulator.numberToHex(ph1Emulator.inputData[address].value)
      const hexAddress = ph1Emulator.numberToHex(parseInt(address))
      modifiedEntries += `${hexAddress} ${hexValue} \n`
    }
  }
  console.log('Memory:')
  console.log(modifiedEntries.toString() === '' ? 'No changes' : modifiedEntries.toString())
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Digite o caminho do arquivo de entrada: ', (inputFile) => {
  startEmulator(inputFile)
    .catch(err => console.log(err))
  rl.close()
})
