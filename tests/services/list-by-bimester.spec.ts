import { ListByBimester } from '../../src/services/list-by-bimester'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-stub'

describe('ListByBimester Service', () => {
  beforeEach(() => {
    jest.resetAllMocks() // Redefine todos os mocks antes de cada teste
  })

  test('1. should calls the repository getAll method and returns all list of results', async () => {
    // System under test
    const repository = new BimesterRepositoryStub()
    const sut = new ListByBimester(repository)
    const getByBimester = jest.spyOn(repository, 'getByBimester')
    const bimester = 'PRIMEIRO'

    const response = await sut.execute(bimester)

    expect(getByBimester).toHaveBeenCalledWith(bimester)
    expect(response).toEqual([{
      id: '1',
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5,
      createdAt: '2023-09-14 10:30:00',
      updatedAt: '2023-09-14 10:30:00'
    }])
  })

  test('2. should throws an error if none of entities where found in db', async () => {
    // System under test
    const repository = new BimesterRepositoryStub()
    const sut = new ListByBimester(repository)
    jest.spyOn(repository, 'getByBimester').mockImplementation(async () => { return await new Promise(resolve => { resolve(null) }) })
    const bimester = 'invalid_bimester'

    await expect(sut.execute(bimester)).rejects.toThrow()
  })
})
