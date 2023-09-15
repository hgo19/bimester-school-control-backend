import { type BimesterResultInput, type BimesterResultOutput } from '../../src/interfaces'
import { CreateResult } from '../../src/services/create-result'

export class CreateResultStub extends CreateResult {
  async execute (input: BimesterResultInput): Promise<BimesterResultOutput> {
    return await new Promise(resolve => {
      resolve({
        id: '1',
        bimester: 'PRIMEIRO',
        discipline: 'Geografia',
        grade: 5,
        createdAt: '2023-09-14 10:30:00'
      })
    })
  }
}
