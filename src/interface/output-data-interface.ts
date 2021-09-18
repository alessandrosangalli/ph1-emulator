export interface OutputDataInterface extends Array<{ operator: string, value?: number, comment?: string}> {
  [index: number]: { operator: string, value?: number, comment?: string }
}
