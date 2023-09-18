import { type BimesterResult } from '../entity/bimester-result'
import { DisciplineAlreadyExistError } from '../exceptions/discipline-already-exist'
import { type BimesterResultOutput, type BimesterResultInput, type BimesterResultRepository } from '../interfaces/'

export class CreateResult {
  private readonly _entity: BimesterResult
  private readonly _repository: BimesterResultRepository

  constructor (entity: BimesterResult, repository: BimesterResultRepository) {
    this._entity = entity
    this._repository = repository
  }

  async execute (input: BimesterResultInput): Promise<BimesterResultOutput> {
    const bimesterToUpper = input.bimester.toUpperCase()
    this._entity.create({ bimester: bimesterToUpper, discipline: input.discipline, grade: input.grade })
    const createdEntity = {
      bimester: this._entity.bimester,
      discipline: this._entity.discipline,
      grade: this._entity.grade
    }
    const hasBimesterRegistered = await this._repository.hasBimesterRegistered(createdEntity.bimester, createdEntity.discipline)
    if (hasBimesterRegistered) {
      throw new DisciplineAlreadyExistError('There is already a discipline for this bimester in the database.')
    }

    return await this._repository.create(createdEntity)
  }
}
