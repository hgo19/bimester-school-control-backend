import { RemoveResult } from '../../src/services/remove-result'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-stub'

describe('RemoveResult Service', () => {
  test('1. should calls findOne method repository with the right value', async () => {
    // System under test
    const repo = new BimesterRepositoryStub()
    const sut = new RemoveResult(repo)
    const findOneSpy = jest.spyOn(repo, 'findOne')

    await sut.execute('1')

    expect(findOneSpy).toHaveBeenCalledWith(1)
  })

  test("2. should throws an error if an object isn't found in db", async () => {
    // System under test
    const repo = new BimesterRepositoryStub()
    const sut = new RemoveResult(repo)

    jest.spyOn(repo, 'findOne').mockImplementation(async () => { return await new Promise(resolve => { resolve(null) }) })

    await expect(sut.execute('1')).rejects.toThrow()
  })

  test('3. should calls delete method repository with the right value', async () => {
    // System under test
    const repo = new BimesterRepositoryStub()
    const sut = new RemoveResult(repo)
    const deleteSpy = jest.spyOn(repo, 'delete')

    await sut.execute('1')

    expect(deleteSpy).toHaveBeenCalledWith('1')
  })

  test('3. should throws if repository throws', async () => {
    // System under test
    const repo = new BimesterRepositoryStub()
    const sut = new RemoveResult(repo)
    jest.spyOn(repo, 'delete').mockImplementation(() => { throw new Error() })

    await expect(sut.execute('invalid_id')).rejects.toThrow()
  })
})
