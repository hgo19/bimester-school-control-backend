import { EntityNotFoundError } from '../exceptions/entity-not-found'
import { type BimesterResultRepository } from '../interfaces'

export class RemoveResult {
  private readonly _repository: BimesterResultRepository
  constructor (repository: BimesterResultRepository) {
    this._repository = repository
  }

  async execute (id: string): Promise<void> {
    const resultInDb = await this._repository.findOne(Number(id))
    if (resultInDb === null) {
      throw new EntityNotFoundError("There isn't any disciplines with this Id in Db.")
    }
    await this._repository.delete(id)
  }
}
