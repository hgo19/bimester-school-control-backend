import { type BimesterResultOutput, type BimesterResultRepository } from '../protocols'

export class ListAllResults {
  private readonly _repository
  constructor (repository: BimesterResultRepository) {
    this._repository = repository
  }

  async execute (): Promise<BimesterResultOutput[]> {
    const allResults = await this._repository.getAll()
    return allResults
  }
}
