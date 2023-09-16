import { EntityNotFoundError } from '../exceptions/entity-not-found'
import { type BimesterResultOutput, type BimesterResultRepository } from '../interfaces'

export class ListByBimester {
  private readonly _repository
  constructor (repository: BimesterResultRepository) {
    this._repository = repository
  }

  async execute (bimester: string): Promise<BimesterResultOutput[]> {
    const results = await this._repository.getByBimester(bimester)
    console.log(results)

    if (results === null || results.length <= 0) {
      throw new EntityNotFoundError("There isn't any disciplines of this bimester in Db.")
    }
    return results
  }
}
