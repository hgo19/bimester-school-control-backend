import { type BimesterResultInput, type BimesterResultOutput, type BimesterResultRepository } from '../../src/interfaces'

export class BimesterRepositoryStub implements BimesterResultRepository {
  async delete (id: string): Promise<void> { }

  async getByBimester (bimester: string): Promise<BimesterResultOutput[] | null> {
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

  async hasBimesterRegistered (bimester: string, discipline: string): Promise<boolean> {
    return false
  }

  async findOne (id: number): Promise<BimesterResultOutput | null> {
    return await new Promise(resolve => {
      resolve({
        id: id.toString(),
        bimester: 'PRIMEIRO',
        discipline: 'Geografia',
        grade: 5,
        createdAt: '2023-09-14 10:30:00'
      })
    })
  }

  async create (input: BimesterResultInput): Promise<BimesterResultOutput> {
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
