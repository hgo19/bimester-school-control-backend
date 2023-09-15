import { ListAllResults } from '../../src/services/list-all-results'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-mock'

describe('ListAllResults Service', () => {
  beforeEach(() => {
    jest.resetAllMocks() // Redefine todos os mocks antes de cada teste
  })

  test('1. should calls the repository getAll method and returns all list of results', async () => {
    // System under test
    const repository = new BimesterRepositoryStub()
    const sut = new ListAllResults(repository)
    const getAllSpy = jest.spyOn(repository, 'getAll')

    const response = await sut.execute()

    expect(getAllSpy).toHaveBeenCalled()
    expect(response).toEqual([{
      id: '1',
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5,
      createdAt: '2023-09-14 10:30:00'
    }])
  })
})
