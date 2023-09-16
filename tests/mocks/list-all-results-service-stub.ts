import { type BimesterResultOutput } from '../../src/interfaces'
import { ListAllResults } from '../../src/services/list-all-results'

export class ListAllResultStub extends ListAllResults {
  async execute (): Promise<BimesterResultOutput[]> {
    return await new Promise(resolve => {
      resolve([{
        id: '1',
        bimester: 'PRIMEIRO',
        discipline: 'Geografia',
        grade: 5,
        createdAt: '2023-09-14 10:30:00',
        updatedAt: '2023-09-14 10:30:00'
      }])
    })
  }
}
