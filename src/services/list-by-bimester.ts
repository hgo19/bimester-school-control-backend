import { type BimesterResultOutput, type BimesterResultRepository } from '../interfaces'

export class ListByBimester {
  private readonly _repository
  constructor (repository: BimesterResultRepository) {
    this._repository = repository
  }

  async execute (bimester: string): Promise<BimesterResultOutput[]> {
    const results = await this._repository.getByBimester(bimester)
    return results
  }
}
