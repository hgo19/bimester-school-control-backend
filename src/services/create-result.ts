import { type BiemonthlyResult } from '../entity/biemonthly-result'
import { type BiemonthlyResultInput } from '../protocols/biemonthly-result-input'
import { type BiemonthlyResultRepository } from '../protocols/biemonthly-result-repository'

export class CreateResult {
  private readonly _entity: BiemonthlyResult
  private readonly _repository: BiemonthlyResultRepository

  constructor (entity: BiemonthlyResult, repository: BiemonthlyResultRepository) {
    this._entity = entity
    this._repository = repository
  }

  async execute (input: BiemonthlyResultInput): Promise<void> {
    this._entity.create(input)
    const createdEntity = {
      bimester: this._entity.bimester,
      discipline: this._entity.discipline,
      grade: this._entity.grade
    }

    await this._repository.create(createdEntity)
  }
}
