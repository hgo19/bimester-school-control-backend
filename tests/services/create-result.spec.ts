import { BiemonthlyResult } from '../../src/entity/biemonthly-result'
import { type BiemonthlyResultInput } from '../../src/protocols/biemonthly-result-input'
import { CreateResult } from '../../src/services/create-result'

describe('CreateResult Service', () => {
  test('1. should create and BiemonthlyResult entity with the right values', () => {
    // System under test
    const biemonthlyResult = new BiemonthlyResult()
    const sut = new CreateResult(biemonthlyResult)
    const createBiemonthlyResultSpy = jest.spyOn(biemonthlyResult, 'create')
    const input: BiemonthlyResultInput = {
      bimester: 'PRIMEIRO',
      discipline: 'Geografia',
      grade: 5
    }

    sut.execute(input)
    expect(createBiemonthlyResultSpy).toHaveBeenCalledWith(input)
  })
})
