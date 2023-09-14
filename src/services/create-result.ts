import { type BiemonthlyResult } from '../entity/biemonthly-result'
import { type BiemonthlyResultInput } from '../protocols/biemonthly-result-input'

export class CreateResult {
  private readonly _entity: BiemonthlyResult

  constructor (entity: BiemonthlyResult) {
    this._entity = entity
  }

  execute (input: BiemonthlyResultInput): void {
    this._entity.create(input)
  }
}
