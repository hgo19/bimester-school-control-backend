import { type BimesterResultOutput, type BimesterResultRepository } from '../interfaces'

export class ListAllResults {
  private readonly _repository
  constructor (repository: BimesterResultRepository) {
    this._repository = repository
  }

  async execute (): Promise<BimesterResultOutput[]> {
    const results = await this._repository.getAllResults()
    return results
  }
}
