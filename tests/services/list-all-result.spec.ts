import { ListAllResults } from '../../src/services/list-all-results'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-stub'

describe('ListAllResults Service', () => {
  beforeEach(() => {
    jest.resetAllMocks() // Redefine todos os mocks antes de cada teste
  })

  test('1. should calls the repository getAll method and returns all list of results', async () => {
    // System under test
    const repository = new BimesterRepositoryStub()
    const sut = new ListAllResults(repository)
    const getAllResults = jest.spyOn(repository, 'getAllResults')

    const response = await sut.execute()

    expect(getAllResults).toHaveBeenCalled()
    expect(response).toEqual([{
      id: '1',
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5,
      createdAt: '2023-09-14 10:30:00',
      updatedAt: '2023-09-14 10:30:00'
    }])
  })

  test('2. should returns an empty array if none of results were found in db', async () => {
    // System under test
    const repository = new BimesterRepositoryStub()
    const sut = new ListAllResults(repository)
    jest.spyOn(repository, 'getAllResults').mockImplementation(async () => { return await new Promise(resolve => { resolve([]) }) })

    const response = await sut.execute()

    expect(response).toEqual([])
  })
})
