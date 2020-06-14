export interface OutputDataInterface extends Array<{ operator: string, value?: number }> {
  [index: number]: { operator: string, value?: number }
}