import { BiemonthlyResult } from '../../src/entity/biemonthly-result'
import { type BiemonthlyResultInput } from '../../src/protocols/biemonthly-result-input'

describe('BiemonthlyResult Entity', () => {
  test("1. should throw an error if the bimester input isn't the right", () => {
    // System under test
    const sut = new BiemonthlyResult()
    const input: BiemonthlyResultInput = {
      bimester: 'QUINTO',
      discipline: 'Geografia',
      grade: 5
    }

    expect(() => { sut.create(input) }).toThrow()
  })
})
