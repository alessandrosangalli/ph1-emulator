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
        outputData.push({ operator: 'LDR', value: this.inputData[this.programCounter].value, comment: `; AC <- MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('20')) {
        this.programCounter++
        this.inputData[this.inputData[this.programCounter].value] = { value: this.accumulator, modified: true }
        outputData.push({ operator: 'STR', value: this.inputData[this.programCounter].value, comment: `; MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}] <- STR` })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('30')) {
        this.programCounter++
        this.accumulator += this.inputData[this.inputData[this.programCounter].value].value
        outputData.push({ operator: 'ADD', value: this.inputData[this.programCounter].value, comment: `; AC <- AC + MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('40')) {
        this.programCounter++
        this.accumulator -= this.inputData[this.inputData[this.programCounter].value].value
        outputData.push({ operator: 'SUB', value: this.inputData[this.programCounter].value, comment: `; AC <- AC - MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('50')) {
        this.programCounter++
        this.accumulator *= this.inputData[this.inputData[this.programCounter].value].value
        outputData.push({ operator: 'MUL', value: this.inputData[this.programCounter].value, comment: `; AC <- AC * MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('60')) {
        this.programCounter++
        this.accumulator /= this.inputData[this.inputData[this.programCounter].value].value
        outputData.push({ operator: 'DIV', value: this.inputData[this.programCounter].value, comment: `; AC <- AC / MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('70')) {
        this.accumulator = (~this.accumulator) & 0xff
        outputData.push({ operator: 'NOT', comment: '; AC <- !AC' })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('80')) {
        this.programCounter++
        this.accumulator = (this.accumulator & this.inputData[this.inputData[this.programCounter].value].value)
        outputData.push({ operator: 'AND', value: this.inputData[this.programCounter].value, comment: `; AC <- AC & MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('90')) {
        this.programCounter++
        this.accumulator = (this.accumulator | this.inputData[this.inputData[this.programCounter].value].value)
        outputData.push({ operator: 'OR', value: this.inputData[this.programCounter].value, comment: `; AC <- AC | MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('a0')) {
        this.programCounter++
        this.accumulator = (this.accumulator ^ this.inputData[this.inputData[this.programCounter].value].value)
        outputData.push({ operator: 'XOR', value: this.inputData[this.programCounter].value, comment: `; AC <- AC ^ MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('b0')) {
        this.programCounter++
        this.programCounter = this.inputData[this.programCounter].value
        outputData.push({ operator: 'JMP', value: this.inputData[this.programCounter].value, comment: `; PC <- MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
        continue
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('c0')) {
        this.programCounter++
        outputData.push({ operator: 'JEQ', value: this.inputData[this.programCounter].value, comment: `; PC <- MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
        if (this.accumulator === 0) {
          this.programCounter = this.inputData[this.programCounter].value
          continue
        }
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('d0')) {
        this.programCounter++
        outputData.push({ operator: 'JG', value: this.inputData[this.programCounter].value, comment: `; PC <- MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
        if (this.accumulator > 0 && this.accumulator < 128) {
          this.programCounter = this.inputData[this.programCounter].value
          continue
        }
      } else if (this.inputData[this.programCounter].value === this.hexToNumber('e0')) {
        this.programCounter++
        outputData.push({ operator: 'JL', value: this.inputData[this.programCounter].value, comment: `; PC <- MEM[${this.hexToNumber(this.inputData[this.programCounter].value.toString())}]` })
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
