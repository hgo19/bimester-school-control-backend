import { BiemonthlyResult } from '../../src/entity/biemonthly-result'
import { type BiemonthlyResultInput } from '../../src/protocols/biemonthly-result-input'
import { type BiemonthlyResultOutput } from '../../src/protocols/biemonthly-result-output'
import { type BiemonthlyResultRepository } from '../../src/protocols/biemonthly-result-repository'
import { CreateResult } from '../../src/services/create-result'

describe('CreateResult Service', () => {
  test('1. should calls create method of BiemonthlyResult entity with right values', async () => {
    // System under test
    class RepositoryStub implements BiemonthlyResultRepository {
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
    const biemonthlyResult = new BiemonthlyResult()
    const repositoryStub = new RepositoryStub()
    const sut = new CreateResult(biemonthlyResult, repositoryStub)
    const createBiemonthlyResultSpy = jest.spyOn(biemonthlyResult, 'create')
    const input: BiemonthlyResultInput = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5
    }

    await sut.execute(input)
    expect(createBiemonthlyResultSpy).toHaveBeenCalledWith(input)
  })

  test('2. should calls create method of BiemonthlyResult repository with right values', async () => {
    // System under test
    class RepositoryStub implements BiemonthlyResultRepository {
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
    const biemonthlyResult = new BiemonthlyResult()
    const repositoryStub = new RepositoryStub()
    const sut = new CreateResult(biemonthlyResult, repositoryStub)
    const repositoryStubSpy = jest.spyOn(repositoryStub, 'create')
    const input: BiemonthlyResultInput = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5
    }

    await sut.execute(input)

    expect(repositoryStubSpy).toHaveBeenCalledWith(input)
  })
})
