import { BiemonthlyResult } from '../../src/entity/biemonthly-result'
import { CreateResult } from '../../src/services/create-result'
import { BiemonthlyRepositoryStub } from '../mocks/biemonthly-result-repository-mock'
import { type BiemonthlyResultRepository, type BiemonthlyResultInput } from '../../src/protocols/'

interface SutTypes {
  repository: BiemonthlyResultRepository
  entity: BiemonthlyResult
  sut: CreateResult
}

const makeSut = (): SutTypes => {
  const repository = new BiemonthlyRepositoryStub()
  const entity = new BiemonthlyResult()
  const sut = new CreateResult(entity, repository)

  return {
    repository,
    entity,
    sut
  }
}

describe('CreateResult Service', () => {
  test('1. should calls create method of BiemonthlyResult entity with right values', async () => {
    // System under test
    const { sut, entity } = makeSut()
    const createBiemonthlyResultSpy = jest.spyOn(entity, 'create')
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
    const { sut, repository } = makeSut()
    const repositoryCreateSpy = jest.spyOn(repository, 'create')
    const input: BiemonthlyResultInput = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5
    }

    await sut.execute(input)

    expect(repositoryCreateSpy).toHaveBeenCalledWith(input)
  })

  test('3. should throws if repository throws', async () => {
    // System under test
    const { sut, repository } = makeSut()
    const repositoryCreateSpy = jest.spyOn(repository, 'create')
    repositoryCreateSpy.mockImplementation(() => { throw new Error() })

    const input: BiemonthlyResultInput = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5
    }

    await expect(sut.execute(input)).rejects.toThrow()
  })
})
