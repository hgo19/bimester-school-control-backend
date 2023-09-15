import { BimesterResult } from '../../src/entity/bimester-result'
import { CreateResult } from '../../src/services/create-result'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-mock'
import { type BimesterResultRepository, type BimesterResultInput } from '../../src/protocols/'

interface SutTypes {
  repository: BimesterResultRepository
  entity: BimesterResult
  sut: CreateResult
}

const makeSut = (): SutTypes => {
  const repository = new BimesterRepositoryStub()
  const entity = new BimesterResult()
  const sut = new CreateResult(entity, repository)

  return {
    repository,
    entity,
    sut
  }
}

describe('CreateResult Service', () => {
  beforeEach(() => {
    jest.resetAllMocks() // Redefine todos os mocks antes de cada teste
  })

  test('1. should calls create method of BimesterResult entity with right values', async () => {
    // System under test
    const { sut, entity } = makeSut()
    const createBimesterResultSpy = jest.spyOn(entity, 'create')
    const input: BimesterResultInput = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5
    }

    await sut.execute(input)
    expect(createBimesterResultSpy).toHaveBeenCalledWith(input)
  })

  test('2. should calls create method of BimesterResult repository with right values', async () => {
    // System under test
    const { sut, repository } = makeSut()
    const repositoryCreateSpy = jest.spyOn(repository, 'create')
    const input: BimesterResultInput = {
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

    const input: BimesterResultInput = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5
    }

    await expect(sut.execute(input)).rejects.toThrow()
  })

  test('4. should throws if in one bimester has already a discipline', async () => {
    // System under test
    const { sut, repository } = makeSut()
    const isThereAlreadySpy = jest.spyOn(repository, 'isThereAlready')
    isThereAlreadySpy.mockImplementation(async () => { return await new Promise(resolve => { resolve(true) }) })

    const input: BimesterResultInput = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5
    }

    await expect(sut.execute(input)).rejects.toThrow()
  })

  test('5. should return the right object on success', async () => {
    // System under test
    const { sut } = makeSut()
    const input: BimesterResultInput = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5
    }

    const expectedOutput = {
      id: '1',
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5,
      createdAt: '2023-09-14 10:30:00'
    }

    const response = await sut.execute(input)

    expect(response).toEqual(expectedOutput)
  })
})
