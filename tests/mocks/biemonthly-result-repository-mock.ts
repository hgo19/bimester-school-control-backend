import { type BiemonthlyResultInput, type BiemonthlyResultOutput, type BiemonthlyResultRepository } from '../../src/protocols/'

export class BiemonthlyRepositoryStub implements BiemonthlyResultRepository {
  async create (input: BiemonthlyResultInput): Promise<BiemonthlyResultOutput> {
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
