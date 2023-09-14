import { BiemonthlyResult } from '../../src/entity/biemonthly-result'
import { InvalidParams } from '../../src/expections/invalid-param'
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

    expect(() => { sut.create(input) }).toThrow(new InvalidParams("Bimester must be one of following: 'PRIMEIRO', 'SEGUNDO', 'TERCEIRO', 'QUARTO'"))
  })
})
