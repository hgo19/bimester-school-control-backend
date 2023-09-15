import { RemoveResult } from '../../src/services/remove-result'
import { BimesterRepositoryStub } from '../mocks/bimester-result-repository-mock'

describe('RemoveResult Service', () => {
  test('1. should calls repository with the right value', async () => {
    // System under test
    const repo = new BimesterRepositoryStub()
    const sut = new RemoveResult(repo)
    const delteSpy = jest.spyOn(repo, 'delete')

    await sut.execute('1')

    expect(delteSpy).toHaveBeenCalledWith('1')
  })
})
