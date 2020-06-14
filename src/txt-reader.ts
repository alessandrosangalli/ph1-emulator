import fs from 'fs'
import readline from 'readline'
import { FileReader } from './interface/file-reader'

export class TxtReader implements FileReader {
  public async getLines (filePath: string): Promise<string[]> {
    const fileStream = fs.createReadStream(filePath)
    const lines = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    const linesToReturn = []
    for await (const line of lines) {
      linesToReturn.push(line)
    }
    return linesToReturn
  }
}
