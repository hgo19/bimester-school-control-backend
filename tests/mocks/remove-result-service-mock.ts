import { RemoveResult } from '../../src/services/remove-result'

export class RemoveResultStub extends RemoveResult {
  async execute (id: string): Promise<boolean> {
    return await new Promise(resolve => {
      resolve(true)
    })
  }
}
