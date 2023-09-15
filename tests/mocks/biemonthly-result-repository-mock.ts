import { type BiemonthlyResultInput } from '../../src/protocols/biemonthly-result-input'
import { type BiemonthlyResultOutput } from '../../src/protocols/biemonthly-result-output'
import { type BiemonthlyResultRepository } from '../../src/protocols/biemonthly-result-repository'

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
