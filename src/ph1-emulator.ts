import { FileReader } from './interface/file-reader'
import { InputDataInterface } from './interface/input-data-interface'
import { OutputDataInterface } from './interface/output-data-interface'

export class PH1Emulator {
  private accumulator: number = 0
  private programCounter: number = 0
  public inputData: InputDataInterface = []
  private readonly reader: FileReader

  constructor (reader: FileReader) {
    this.reader = reader
  }

  public async setFile (fileName: string): Promise<void> {
    const lines = await this.reader.getLines(fileName)
    const inputData = []
    for (const line of lines) {
      const data = line.split(' ')
      inputData.push({ address: data[0], value: data[1] })
    }
    this.setInputData(inputData)
  }

  private setInputData (inputData: Array<{ address: string, value: string}>): void {
    let data: { address: string, value: string }
    for (data of inputData) {
      this.inputData[this.hexToNumber(data.address)] = { modified: false, value: this.hexToNumber(data.value) }
    }
  }

  public getAccumulator = (): number => {
    return this.accumulator
  }

  public getProgramCounter = (): number => {
    return this.programCounter
  }

  public execute = (): OutputDataInterface => {
    const outputData: OutputDataInterface = []
    while (true) {
      if (this.inputData[this.programCounter].value === this.hexToNumber('00')) {
        outputData.push({ operator: 'NOP' })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('10')) {
        this.programCounter++
        this.accumulator = this.inputData[this.inputData[this.programCounter].value].value
        outputData.push({ operator: 'LDR', value: this.inputData[this.programCounter].value })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('b0')) {
        this.programCounter++
        this.programCounter = this.inputData[this.programCounter].value
        outputData.push({ operator: 'JMP', value: this.inputData[this.programCounter].value })
        continue
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('c0')) {
        this.programCounter++
        outputData.push({ operator: 'JEQ', value: this.inputData[this.programCounter].value })
        if (this.accumulator === 0) {
          this.programCounter = this.inputData[this.programCounter].value
          continue
        }
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('d0')) {
        this.programCounter++
        outputData.push({ operator: 'JG', value: this.inputData[this.programCounter].value })
        if (this.accumulator > 0 && this.accumulator < 128) {
          this.programCounter = this.inputData[this.programCounter].value
          continue
        }
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('e0')) {
        this.programCounter++
        outputData.push({ operator: 'JL', value: this.inputData[this.programCounter].value })
        if (this.accumulator > 127) {
          this.programCounter = this.inputData[this.programCounter].value
          continue
        }
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('f0')) {
        this.programCounter++
        outputData.push({ operator: 'HLT' })
        break
      }
      this.programCounter++
    }

    return outputData
  }

  private hexToNumber (hex: string): number {
    return Buffer.from(hex, 'hex')[0]
  }
}
