import { type BimesterResultRepository } from '../interfaces'

export class RemoveResult {
  private readonly _repository: BimesterResultRepository
  constructor (repository: BimesterResultRepository) {
    this._repository = repository
  }

  async execute (id: string): Promise<boolean> {
    const isDeleted = await this._repository.delete(id)
    return isDeleted
  }
}
