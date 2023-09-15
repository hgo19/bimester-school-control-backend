import { type BimesterResultRepository } from '../protocols'

export class RemoveResult {
  private readonly _repository: BimesterResultRepository
  constructor (repository: BimesterResultRepository) {
    this._repository = repository
  }

  async execute (id: string): Promise<void> {
    await this._repository.delete(id)
  }
}
